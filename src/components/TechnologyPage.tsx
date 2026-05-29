import { useEffect, useMemo, useState } from "react";
import BrainallLogo from "./BrainallLogo";
import Icon from "./Icons";
import { defaultLanguage, isLanguageCode, languages, siteContent, type Highlight, type LanguageCode, type Solution } from "../data/siteContent";

type TechnologyPageProps = {
  route: string;
};

type TechnologyPageCopy = {
  home: string;
  news: string;
  index: string;
  eyebrow: string;
  overview: string;
  managedItems: string;
  processTags: string;
  nextCapability: string;
};

const technologyPageCopy: Record<LanguageCode, TechnologyPageCopy> = {
  ko: {
    home: "홈",
    news: "공지사항",
    index: "기술 항목",
    eyebrow: "Technology Detail",
    overview: "개요",
    managedItems: "관리 항목",
    processTags: "핵심 키워드",
    nextCapability: "다음 역량 보기",
  },
  en: {
    home: "Home",
    news: "News",
    index: "Capabilities",
    eyebrow: "Technology Detail",
    overview: "Overview",
    managedItems: "Managed Items",
    processTags: "Key Terms",
    nextCapability: "Next Capability",
  },
  ja: {
    home: "ホーム",
    news: "お知らせ",
    index: "技術項目",
    eyebrow: "Technology Detail",
    overview: "概要",
    managedItems: "管理項目",
    processTags: "キーワード",
    nextCapability: "次の技術を見る",
  },
};

function getInitialLanguage() {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = window.localStorage.getItem("seoulind-language");
  return isLanguageCode(stored) ? stored : defaultLanguage;
}

function getVideoType(src: string) {
  const clean = src.split("?")[0] ?? src;
  return clean.endsWith(".webm") ? "video/webm" : "video/mp4";
}

function splitTitle(title: string) {
  return title.split("\n").filter(Boolean);
}

function detailsFor(solution: Solution | undefined, highlight: Highlight, emptyFallback: string) {
  if (solution?.details?.length) return solution.details;
  return [highlight.copy, solution?.copy ?? emptyFallback].filter(Boolean);
}

export default function TechnologyPage({ route }: TechnologyPageProps) {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const content = siteContent[language];
  const copy = technologyPageCopy[language];
  const slug = route.split("/")[1] || content.highlights[0]?.id;

  const activeIndex = useMemo(() => {
    const index = content.highlights.findIndex((item) => item.id === slug);
    return index >= 0 ? index : 0;
  }, [content.highlights, slug]);

  const highlight = content.highlights[activeIndex] ?? content.highlights[0];
  const solution = content.solutions.find((item) => item.id === highlight.id) ?? content.solutions[activeIndex];
  const nextHighlight = content.highlights[(activeIndex + 1) % content.highlights.length] ?? highlight;
  const detailItems = detailsFor(solution, highlight, copy.overview);

  useEffect(() => {
    const option = languages.find((item) => item.code === language);
    document.documentElement.lang = option?.htmlLang ?? language;
    window.localStorage.setItem("seoulind-language", language);
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  return (
    <div className="technology-page">
      <header className="notice-topbar">
        <a className="notice-topbar__brand" href="#/" aria-label="seoulind home">
          <BrainallLogo />
        </a>
        <nav className="notice-topbar__nav" aria-label="Technology page navigation">
          <a href="#/">{copy.home}</a>
          <a href="#/news">{copy.news}</a>
        </nav>
        <div className="notice-language" aria-label="Language">
          {languages.map((item) => (
            <button className={item.code === language ? "is-active" : ""} type="button" key={item.code} onClick={() => setLanguage(item.code)}>
              {item.shortLabel}
            </button>
          ))}
        </div>
      </header>

      <main className="technology-shell">
        <section className="technology-hero">
          <div className="technology-hero__copy">
            <span>{copy.eyebrow}</span>
            <h1>
              {splitTitle(highlight.title).map((line) => (
                <strong key={line}>{line}</strong>
              ))}
            </h1>
            <p>{highlight.copy}</p>
          </div>

          <figure className="technology-hero__media">
            {highlight.video ? (
              <video autoPlay muted playsInline loop poster={highlight.image}>
                <source src={highlight.video} type={getVideoType(highlight.video)} />
              </video>
            ) : (
              <img src={highlight.image} alt="" loading="eager" />
            )}
          </figure>
        </section>

        <section className="technology-layout">
          <aside className="technology-menu">
            <span>{copy.index}</span>
            {content.highlights.map((item, index) => (
              <a className={item.id === highlight.id ? "is-active" : ""} href={`#/technology/${item.id}`} key={item.id}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{splitTitle(item.title).join(" ")}</strong>
              </a>
            ))}
          </aside>

          <article className="technology-article">
            <section>
              <span>{copy.overview}</span>
              <h2>{solution?.title ?? splitTitle(highlight.title).join(" ")}</h2>
              <p>{solution?.copy ?? highlight.copy}</p>
            </section>

            <section>
              <span>{copy.managedItems}</span>
              <ul>
                {detailItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {!!solution?.tags?.length && (
              <section>
                <span>{copy.processTags}</span>
                <div className="technology-tags">
                  {solution.tags.map((tag) => (
                    <b key={tag}>{tag}</b>
                  ))}
                </div>
              </section>
            )}

            <a className="technology-next" href={`#/technology/${nextHighlight.id}`}>
              {copy.nextCapability}
              <Icon name="arrow" />
            </a>
          </article>
        </section>
      </main>
    </div>
  );
}
