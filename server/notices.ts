import { get, put } from "@vercel/blob";

export type StoredNoticeTranslation = {
  title: string;
  summary: string;
  body: string;
};

export type StoredNotice = {
  id: string;
  category: "notice" | "products" | "quality" | "manufacturing" | "resources";
  date: string;
  image?: string;
  pinned: boolean;
  published: boolean;
  translations: Record<"ko" | "en" | "ja", StoredNoticeTranslation>;
};

// v2 intentionally starts from the three Seoul Industry posts bundled with the site.
// The previous blob contained unrelated placeholder posts and must not override them.
const dataPath = "notices/notices-v2.json";
const categories = new Set(["notice", "products", "quality", "manufacturing", "resources"]);

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
function cleanImage(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const trimmed = value.trim().slice(0, 2048);
  if (
    trimmed.startsWith("/assets/") &&
    !trimmed.startsWith("//") &&
    !trimmed.includes("\\") &&
    !trimmed.includes("..")
  ) {
    return trimmed;
  }
  try {
    const url = new URL(trimmed);
    return ["https:", "http:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function cleanTranslation(value: unknown): StoredNoticeTranslation {
  const translation = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    title: cleanText(translation.title, 180),
    summary: cleanText(translation.summary, 500),
    body: cleanText(translation.body, 12000),
  };
}

export function sanitizeNotices(value: unknown): StoredNotice[] {
  if (!Array.isArray(value)) throw new Error("Invalid notice payload");
  if (value.length > 100) throw new Error("Too many notices");

  return value.map((entry, index) => {
    const post = entry && typeof entry === "object" ? (entry as Record<string, unknown>) : {};
    const translations = post.translations && typeof post.translations === "object" ? (post.translations as Record<string, unknown>) : {};
    const category = typeof post.category === "string" && categories.has(post.category) ? post.category : "notice";
    const date = typeof post.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(post.date) ? post.date : new Date().toISOString().slice(0, 10);

    return {
      id: cleanText(post.id, 120) || `notice-${Date.now()}-${index}`,
      category: category as StoredNotice["category"],
      date,
      image: cleanImage(post.image),
      pinned: post.pinned === true,
      published: post.published !== false,
      translations: {
        ko: cleanTranslation(translations.ko),
        en: cleanTranslation(translations.en),
        ja: cleanTranslation(translations.ja),
      },
    };
  });
}

export async function readStoredNotices() {
  try {
    const result = await get(dataPath, { access: "public", useCache: false });
    if (!result || result.statusCode !== 200) return null;
    const parsed = await new Response(result.stream).json();
    return sanitizeNotices(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/not found|404/i.test(message)) return null;
    throw error;
  }
}

export async function writeStoredNotices(value: unknown) {
  const posts = sanitizeNotices(value);
  await put(dataPath, JSON.stringify(posts), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
    contentType: "application/json; charset=utf-8",
  });
  return posts;
}
