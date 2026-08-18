import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import BrainallLogo from "./BrainallLogo";
import Icon from "./Icons";
import { getSiteMenuGroups, resolveMenuRoute, type NavigationLanguage, type SiteMenuGroup } from "../data/navigation";
import { buildHref, setSiteLanguage } from "../utils/siteRouter";
import "../styles/renewal-shell.css";

export type RenewalLanguage = NavigationLanguage;

type RenewalShellProps = {
  language: RenewalLanguage;
  onLanguageChange: (language: RenewalLanguage) => void;
  currentRoute?: string;
};

const MAIN_CONTENT_ID = "main-content";
const CONTACT_ROUTE = "support/contact";
const PRIVACY_ROUTE = "legal/privacy";
const COMPANY_TEL = { display: "+82-31-366-1141", href: "tel:+82313661141" };
const COMPANY_FAX = { display: "+82-31-366-1150" };
const COMPANY_EMAIL = "admin@seoulind.co.kr";
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const shellCopy: Record<
  RenewalLanguage,
  {
    menuLabel: string;
    closeLabel: string;
    languageLabel: string;
    home: string;
    mainNav: string;
    skipToContent: string;
    contact: string;
    backToTop: string;
    footerNav: string;
    office: string;
    company: string;
    address: string;
    tel: string;
    fax: string;
    email: string;
    privacy: string;
    legalNav: string;
  }
> = {
  ko: {
    menuLabel: "메뉴 열기",
    closeLabel: "메뉴 닫기",
    languageLabel: "언어 선택",
    home: "서울산업 홈페이지",
    mainNav: "주요 메뉴",
    skipToContent: "본문으로 건너뛰기",
    contact: "문의하기",
    backToTop: "맨 위로 이동",
    footerNav: "하단 메뉴",
    office: "본사·공장",
    company: "서울산업(주) · 대표이사 김을식",
    address: "경기도 화성시 양감면 요당길320번길 51",
    tel: "TEL",
    fax: "FAX",
    email: "E-MAIL",
    privacy: "개인정보처리방침",
    legalNav: "법적 고지",
  },
  en: {
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    languageLabel: "Language",
    home: "Seoul Industry home",
    mainNav: "Primary navigation",
    skipToContent: "Skip to content",
    contact: "Contact",
    backToTop: "Back to top",
    footerNav: "Footer navigation",
    office: "Head Office & Factory",
    company: "Seoul Industry Co., Ltd. · CEO Eul-Sik Kim",
    address: "51, Yodang-gil 320beon-gil, Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Republic of Korea",
    tel: "TEL",
    fax: "FAX",
    email: "E-MAIL",
    privacy: "Privacy Policy",
    legalNav: "Legal",
  },
  ja: {
    menuLabel: "メニューを開く",
    closeLabel: "メニューを閉じる",
    languageLabel: "言語選択",
    home: "ソウル産業ホーム",
    mainNav: "メインメニュー",
    skipToContent: "本文へスキップ",
    contact: "お問い合わせ",
    backToTop: "ページ上部へ戻る",
    footerNav: "フッターメニュー",
    office: "本社・工場",
    company: "ソウル産業株式会社 · 代表取締役 金乙植",
    address: "51, Yodang-gil 320beon-gil, Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Republic of Korea",
    tel: "TEL",
    fax: "FAX",
    email: "E-MAIL",
    privacy: "個人情報保護方針",
    legalNav: "法的情報",
  },
};

/** Converts a navigation href ("#/products/steering" or "/products/steering") to a root-relative link for the current language. */
export function toRenewalHref(href: string, language?: RenewalLanguage) {
  const route = href.replace(/^#\/?/, "").replace(/^\/+/, "");
  return buildHref(route, language);
}

export function getRenewalMenuGroups(language: RenewalLanguage) {
  return getSiteMenuGroups(language).map((group) => ({
    ...group,
    href: toRenewalHref(group.href, language),
    children: group.children.map((child) => ({ ...child, href: toRenewalHref(child.href, language) })),
  }));
}

function routeBelongsToGroup(route: string, group: SiteMenuGroup) {
  const cleanRoute = resolveMenuRoute(route);
  return group.children.some((child) => resolveMenuRoute(child.href) === cleanRoute);
}

function productGroupClass(href: string) {
  if (href.includes("products/defense")) return "is-defense";
  if (href.includes("products/electric-vehicle")) return "is-electrified";
  if (href.includes("products/balance-shaft-module")) return "is-aluminum";
  if (href.includes("products/")) return "is-core-product";
  return "";
}

function findMainContent() {
  return document.getElementById(MAIN_CONTENT_ID) ?? document.querySelector<HTMLElement>("main");
}

export function RenewalSiteHeader({ language, onLanguageChange, currentRoute = "" }: RenewalShellProps) {
  const [solid, setSolid] = useState(currentRoute.length > 0);
  const [open, setOpen] = useState(false);
  const copy = shellCopy[language];
  const menuGroups = useMemo(() => getRenewalMenuGroups(language), [language]);
  const sourceGroups = useMemo(() => getSiteMenuGroups(language), [language]);
  const homeHref = buildHref("", language);
  const contactHref = buildHref(CONTACT_ROUTE, language);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  const handleLanguageChange = useCallback(
    (code: RenewalLanguage) => {
      if (code === language) return;
      setSiteLanguage(code);
      onLanguageChange(code);
    },
    [language, onLanguageChange],
  );

  const handleSkipToContent = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = findMainContent();
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    const update = () => setSolid(currentRoute.length > 0 || window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [currentRoute]);

  useEffect(() => {
    setOpen(false);
  }, [currentRoute]);

  // The page <main> is rendered by each page component; the shell tags it so the skip link has a stable target.
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (main && !main.id) main.id = MAIN_CONTENT_ID;
  }, [currentRoute, language]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-renewal-menu-open", open);
    if (!open) {
      return () => document.documentElement.classList.remove("is-renewal-menu-open");
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      // Keep keyboard focus inside the drawer while it is open.
      if (event.key !== "Tab" || !drawerRef.current) return;
      const drawer = drawerRef.current;
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !drawer.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !drawer.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("is-renewal-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Move focus into the drawer when it opens and return it to the toggle when it closes.
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus({ preventScroll: true });
      return;
    }
    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <>
      <a className="renewal-skip-link" href={`#${MAIN_CONTENT_ID}`} onClick={handleSkipToContent}>
        {copy.skipToContent}
      </a>

      <header className={`renewal-header ${solid ? "is-solid" : ""}`}>
        <a className="renewal-header__brand" href={homeHref} aria-label={copy.home}>
          <span className="renewal-header__brand-symbol" aria-hidden="true">
            <BrainallLogo markOnly />
          </span>
          <span className="renewal-header__wordmark">Seoul Industry Co., Ltd.</span>
        </a>

        <nav className="renewal-nav" aria-label={copy.mainNav}>
          {menuGroups.map((group, index) => {
            const active = routeBelongsToGroup(currentRoute, sourceGroups[index]);
            const directGroup = group.children.length === 1 && group.children[0].href === group.href;
            return (
              <div className={`renewal-nav__group ${active ? "is-active" : ""}`} key={group.label}>
                <a href={group.href}>{group.label}</a>
                {!directGroup && (
                  <div className="renewal-nav__dropdown">
                    {group.children.map((child) => (
                      <a className={productGroupClass(child.href)} href={child.href} key={child.label}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="renewal-header__actions">
          <a className="renewal-header__contact" href={contactHref} aria-label={copy.contact}>
            <Icon name="chat" className="renewal-header__contact-glyph" />
            <span>{copy.contact}</span>
            <Icon name="arrow" className="renewal-header__contact-arrow" />
          </a>
          <div className="renewal-language" role="group" aria-label={copy.languageLabel}>
            {(["ko", "en", "ja"] as RenewalLanguage[]).map((code) => (
              <button
                type="button"
                className={language === code ? "is-active" : ""}
                aria-pressed={language === code}
                onClick={() => handleLanguageChange(code)}
                key={code}
              >
                {code === "ko" ? "KR" : code === "ja" ? "JP" : "EN"}
              </button>
            ))}
          </div>
          <button
            className="renewal-menu-button"
            type="button"
            onClick={() => setOpen(true)}
            aria-label={copy.menuLabel}
            aria-expanded={open}
            aria-controls="renewal-drawer"
            ref={menuButtonRef}
          >
            <Icon name="menu" />
            <span className="renewal-menu-button__label">MENU</span>
          </button>
        </div>
      </header>

      <aside
        id="renewal-drawer"
        className={`renewal-drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label={copy.mainNav}
        inert={!open}
        ref={drawerRef}
      >
        <div className="renewal-drawer__top">
          <a href={homeHref} onClick={() => setOpen(false)} aria-label={copy.home}>
            <BrainallLogo markOnly />
          </a>
          <button type="button" onClick={() => setOpen(false)} aria-label={copy.closeLabel} ref={closeButtonRef}>
            <Icon name="close" />
          </button>
        </div>
        <nav>
          {menuGroups.map((group, index) => {
            const directGroup = group.children.length === 1 && group.children[0].href === group.href;
            return (
              <div className={`renewal-drawer__group ${directGroup ? "is-direct" : ""}`} key={group.label}>
                <a href={group.href} onClick={() => setOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{group.label}</strong>
                </a>
                {!directGroup && (
                  <div>
                    {group.children.map((child) => (
                      <a className={productGroupClass(child.href)} href={child.href} onClick={() => setOpen(false)} key={child.label}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <a className="renewal-drawer__contact" href={contactHref} onClick={() => setOpen(false)}>
          <span>{copy.contact}</span>
          <Icon name="arrow" />
        </a>
        <div className="renewal-drawer__languages" role="group" aria-label={copy.languageLabel}>
          {(["ko", "en", "ja"] as RenewalLanguage[]).map((code) => (
            <button
              type="button"
              className={language === code ? "is-active" : ""}
              aria-pressed={language === code}
              onClick={() => {
                handleLanguageChange(code);
                setOpen(false);
              }}
              key={code}
            >
              {code === "ko" ? "KOREAN" : code === "en" ? "ENGLISH" : "JAPANESE"}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

export function RenewalSiteFooter({ language }: { language: RenewalLanguage }) {
  const copy = shellCopy[language];
  const menuGroups = getRenewalMenuGroups(language);
  const year = new Date().getFullYear();

  return (
    <footer className="renewal-footer">
      <div className="renewal-footer__top">
        <div>
          <BrainallLogo markOnly />
          <strong>OEM Supplier of Precision Automotive Components</strong>
        </div>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={copy.backToTop}>
          <Icon name="up" />
        </button>
      </div>
      <div className="renewal-footer__bottom">
        <div className="renewal-footer__contact">
          <span>{copy.office}</span>
          <p className="renewal-footer__company">{copy.company}</p>
          <p className="renewal-footer__address">{copy.address}</p>
          <ul className="renewal-footer__lines">
            <li>
              <span>{copy.tel}</span>
              <a href={COMPANY_TEL.href}>{COMPANY_TEL.display}</a>
            </li>
            <li>
              <span>{copy.fax}</span>
              <span>{COMPANY_FAX.display}</span>
            </li>
            <li>
              <span>{copy.email}</span>
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </li>
          </ul>
        </div>
        <nav aria-label={copy.footerNav}>
          {menuGroups.map((group) => (
            <a href={group.href} key={group.label}>
              {group.label}
            </a>
          ))}
        </nav>
        <div className="renewal-footer__legal">
          <nav aria-label={copy.legalNav}>
            <a href={buildHref(PRIVACY_ROUTE, language)}>{copy.privacy}</a>
            <a href={buildHref(CONTACT_ROUTE, language)}>{copy.contact}</a>
          </nav>
          <small>© {year} SEOUL INDUSTRY CO., LTD.</small>
        </div>
      </div>
    </footer>
  );
}
