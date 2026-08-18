import { buildHref, SITE_URL, type SiteLanguage } from "./siteRouter";

const OG_LOCALE: Record<SiteLanguage, string> = { ko: "ko_KR", en: "en_US", ja: "ja_JP" };
const HREFLANG: Record<SiteLanguage, string> = { ko: "ko-KR", en: "en", ja: "ja-JP" };
const ALL_LANGUAGES: SiteLanguage[] = ["ko", "en", "ja"];

function ensureMeta(attribute: "name" | "property", key: string): HTMLMetaElement {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  return element;
}

function ensureLink(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }
  return element;
}

export function absoluteUrl(route: string, language: SiteLanguage): string {
  const path = buildHref(route, language);
  // Under file:// buildHref returns a hash form; canonical URLs must always be path form.
  const cleanPath = path.startsWith("#") ? path.slice(1) : path;
  return `${SITE_URL}${cleanPath === "/" ? "/" : cleanPath}`;
}

export function setRobots(content: string | null): void {
  if (typeof document === "undefined") return;
  const existing = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (content === null) {
    existing?.remove();
    return;
  }
  ensureMeta("name", "robots").setAttribute("content", content);
}

export function applyHead(input: { title: string; description: string; route: string; language: SiteLanguage }): void {
  if (typeof document === "undefined") return;
  const { title, description, route, language } = input;
  const url = absoluteUrl(route, language);

  document.title = title;
  ensureMeta("name", "description").setAttribute("content", description);
  ensureMeta("property", "og:title").setAttribute("content", title);
  ensureMeta("property", "og:description").setAttribute("content", description);
  ensureMeta("property", "og:url").setAttribute("content", url);
  ensureMeta("property", "og:locale").setAttribute("content", OG_LOCALE[language]);
  ensureMeta("name", "twitter:title").setAttribute("content", title);
  ensureMeta("name", "twitter:description").setAttribute("content", description);
  ensureLink("canonical").setAttribute("href", url);

  for (const alt of ALL_LANGUAGES) {
    ensureLink("alternate", HREFLANG[alt]).setAttribute("href", absoluteUrl(route, alt));
  }
  ensureLink("alternate", "x-default").setAttribute("href", absoluteUrl(route, "ko"));

}
