import { useEffect } from "react";
import { buildHref, type SiteLanguage } from "../utils/siteRouter";
import "../styles/not-found.css";

type NotFoundPageProps = {
  language: SiteLanguage;
};

type NotFoundCopy = {
  eyebrow: string;
  title: string;
  message: string;
  home: string;
  products: string;
  contact: string;
};

const notFoundCopy: Record<SiteLanguage, NotFoundCopy> = {
  ko: {
    eyebrow: "404",
    title: "페이지를 찾을 수 없습니다",
    message: "주소가 변경되었거나 더 이상 제공되지 않는 페이지입니다. 아래 메뉴에서 원하시는 정보를 확인해 주세요.",
    home: "홈으로",
    products: "제품 보기",
    contact: "문의하기",
  },
  en: {
    eyebrow: "404",
    title: "Page not found",
    message: "This page has moved or is no longer available. Use the links below to continue.",
    home: "Home",
    products: "Products",
    contact: "Contact",
  },
  ja: {
    eyebrow: "404",
    title: "ページが見つかりません",
    message: "URLが変更されたか、現在は提供されていないページです。以下のリンクからご覧ください。",
    home: "ホームへ",
    products: "製品を見る",
    contact: "お問い合わせ",
  },
};

export default function NotFoundPage({ language }: NotFoundPageProps) {
  const copy = notFoundCopy[language] ?? notFoundCopy.ko;

  useEffect(() => {
    document.body.classList.add("renewal-active");
    return () => {
      document.body.classList.remove("renewal-active");
    };
  }, []);

  return (
    <main className="renewal-page not-found" aria-labelledby="not-found-title">
      <div className="not-found__inner">
        <span className="not-found__eyebrow">{copy.eyebrow}</span>
        <h1 id="not-found-title" className="not-found__title">
          {copy.title}
        </h1>
        <p className="not-found__message">{copy.message}</p>
        <nav className="not-found__links" aria-label={copy.title}>
          <a className="not-found__link not-found__link--primary" href={buildHref("", language)}>
            {copy.home}
          </a>
          <a className="not-found__link" href={buildHref("products/steering", language)}>
            {copy.products}
          </a>
          <a className="not-found__link" href={buildHref("support/contact", language)}>
            {copy.contact}
          </a>
        </nav>
        <span className="not-found__line" aria-hidden="true">
          <span />
        </span>
      </div>
    </main>
  );
}
