import { jumpToPageTop } from "./pageScroll";

export type SiteLanguage = "ko" | "en" | "ja";

export const LANGUAGE_STORAGE_KEY = "seoulind-language";
export const SITE_URL = "https://www.seoulind.co.kr";
export const NAVIGATE_EVENT = "site:navigate";

const SITE_LANGUAGES: SiteLanguage[] = ["ko", "en", "ja"];
const HTML_LANG: Record<SiteLanguage, string> = { ko: "ko-KR", en: "en", ja: "ja-JP" };

export function isSiteLanguage(value: unknown): value is SiteLanguage {
  return typeof value === "string" && (SITE_LANGUAGES as string[]).includes(value);
}

export function isHistoryMode(): boolean {
  if (typeof window === "undefined") return true;
  return window.location.protocol !== "file:";
}

export function getStoredLanguage(): SiteLanguage {
  if (typeof window === "undefined") return "ko";
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isSiteLanguage(stored) ? stored : "ko";
  } catch {
    return "ko";
  }
}

function cleanRoute(route: string): string {
  return route
    .replace(/^#/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .split("?")[0]
    .split("#")[0];
}

/** Splits a raw path ("/en/products/steering" or "en/products/steering") into an optional language prefix and route. */
function splitPath(rawPath: string): { language: SiteLanguage | null; route: string } {
  const path = cleanRoute(rawPath);
  if (!path) return { language: null, route: "" };
  const [first, ...rest] = path.split("/");
  if (isSiteLanguage(first)) {
    return { language: first, route: rest.join("/") };
  }
  return { language: null, route: path };
}

function joinPath(route: string, language: SiteLanguage): string {
  const clean = cleanRoute(route);
  const prefix = language === "ko" ? "" : `/${language}`;
  const path = clean ? `/${clean}` : "";
  return `${prefix}${path}` || "/";
}

export function buildHref(route: string, language?: SiteLanguage): string {
  const resolvedLanguage = language ?? currentLanguage();
  const path = joinPath(route, resolvedLanguage);
  if (!isHistoryMode()) return `#${path}`;
  return path;
}

function readRawLocation(): { rawPath: string; search: string; legacyHash: boolean } {
  if (typeof window === "undefined") return { rawPath: "/", search: "", legacyHash: false };
  const { pathname, hash, search } = window.location;
  if (!isHistoryMode()) {
    return { rawPath: hash.replace(/^#/, "") || "/", search: "", legacyHash: false };
  }
  if (/^#\//.test(hash)) {
    return { rawPath: hash.replace(/^#/, ""), search, legacyHash: true };
  }
  return { rawPath: pathname || "/", search, legacyHash: false };
}

function replaceUrl(route: string, language: SiteLanguage, search = "") {
  if (typeof window === "undefined") return;
  const path = joinPath(route, language);
  if (isHistoryMode()) {
    window.history.replaceState(window.history.state, "", `${path}${search}`);
  } else {
    const nextHash = `#${path}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(window.history.state, "", nextHash);
    }
  }
}

let currentLanguageCache: SiteLanguage | null = null;

function currentLanguage(): SiteLanguage {
  if (currentLanguageCache) return currentLanguageCache;
  const { rawPath } = readRawLocation();
  const { language } = splitPath(rawPath);
  return language ?? getStoredLanguage();
}

function applyDocumentLang(language: SiteLanguage) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = HTML_LANG[language];
}

export function parseLocation(): { language: SiteLanguage; route: string } {
  const { rawPath, search, legacyHash } = readRawLocation();
  const parsed = splitPath(rawPath);
  const language = parsed.language ?? getStoredLanguage();

  // Legacy "#/x" in history mode, or a prefix-less URL while stored language is en/ja: normalise the URL.
  if (legacyHash || (parsed.language === null && language !== "ko")) {
    replaceUrl(parsed.route, language, search);
  }

  currentLanguageCache = language;
  if (parsed.language !== null) persistLanguage(language);
  applyDocumentLang(language);
  return { language, route: parsed.route };
}

function dispatchNavigate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

export function navigate(route: string, options: { language?: SiteLanguage; replace?: boolean } = {}): void {
  if (typeof window === "undefined") return;
  const language = options.language ?? currentLanguage();
  const path = joinPath(route, language);
  currentLanguageCache = language;

  if (isHistoryMode()) {
    const current = `${window.location.pathname}`;
    if (options.replace) {
      window.history.replaceState(null, "", path);
    } else if (current !== path || /^#\//.test(window.location.hash)) {
      window.history.pushState(null, "", path);
    }
  } else {
    const nextHash = `#${path}`;
    if (options.replace) {
      window.history.replaceState(null, "", nextHash);
    } else if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
  }

  applyDocumentLang(language);
  dispatchNavigate();
  jumpToPageTop();
}

function persistLanguage(language: SiteLanguage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    /* storage unavailable */
  }
}

export function setSiteLanguage(language: SiteLanguage): void {
  if (typeof window === "undefined") return;
  persistLanguage(language);
  const { rawPath, search } = readRawLocation();
  const { route } = splitPath(rawPath);
  currentLanguageCache = language;
  applyDocumentLang(language);
  replaceUrl(route, language, search);
  dispatchNavigate();
}

export function subscribeToLocation(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("popstate", handler);
  window.addEventListener("hashchange", handler);
  window.addEventListener(NAVIGATE_EVENT, handler);
  return () => {
    window.removeEventListener("popstate", handler);
    window.removeEventListener("hashchange", handler);
    window.removeEventListener(NAVIGATE_EVENT, handler);
  };
}

export function isInternalLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute("href");
  if (!href) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  if (href.startsWith("#/")) return true;
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) return false;
  if (typeof window !== "undefined" && anchor.origin && anchor.origin !== window.location.origin) return false;
  return true;
}

/** Extracts { route, language } from an internal href ("/en/products/steering" or legacy "#/products/steering"). */
export function parseInternalHref(href: string): { route: string; language: SiteLanguage | null } {
  const { language, route } = splitPath(href.replace(/^#/, ""));
  return { language, route };
}
