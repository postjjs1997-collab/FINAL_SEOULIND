import { useEffect, useMemo, useState } from "react";
import BrainallLogo from "./BrainallLogo";
import Icon from "./Icons";
import { getSiteMenuGroups, resolveMenuRoute, type NavigationLanguage, type SiteMenuGroup } from "../data/navigation";

export type RenewalLanguage = NavigationLanguage;

type RenewalShellProps = {
  language: RenewalLanguage;
  onLanguageChange: (language: RenewalLanguage) => void;
  currentRoute?: string;
};

const shellCopy: Record<
  RenewalLanguage,
  {
    menuLabel: string;
    closeLabel: string;
    languageLabel: string;
    footerNav: string;
    office: string;
    address: string;
    copyright: string;
  }
> = {
  ko: {
    menuLabel: "메뉴 열기",
    closeLabel: "메뉴 닫기",
    languageLabel: "언어 선택",
    footerNav: "하단 메뉴",
    office: "본사·공장",
    address: "경기도 화성시 양감면 요당길 320번길 51",
    copyright: "© SEOUL INDUSTRY CO., LTD.",
  },
  en: {
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    languageLabel: "Language",
    footerNav: "Footer navigation",
    office: "Head Office · Factory",
    address: "51, Yodang-gil 320beon-gil, Yanggam-myeon, Hwaseong-si, Korea",
    copyright: "© SEOUL INDUSTRY CO., LTD.",
  },
  ja: {
    menuLabel: "メニューを開く",
    closeLabel: "メニューを閉じる",
    languageLabel: "言語選択",
    footerNav: "フッターメニュー",
    office: "本社・工場",
    address: "韓国 京畿道 華城市 楊甘面 ヨダンギル320番ギル51",
    copyright: "© SEOUL INDUSTRY CO., LTD.",
  },
};

export function toRenewalHref(href: string) {
  const route = href.replace(/^#\/?/, "");
  return `#/${route}`;
}

export function getRenewalMenuGroups(language: RenewalLanguage) {
  return getSiteMenuGroups(language).map((group) => ({
    ...group,
    href: toRenewalHref(group.href),
    children: group.children.map((child) => ({ ...child, href: toRenewalHref(child.href) })),
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

export function RenewalSiteHeader({ language, onLanguageChange, currentRoute = "" }: RenewalShellProps) {
  const [solid, setSolid] = useState(currentRoute.length > 0);
  const [open, setOpen] = useState(false);
  const copy = shellCopy[language];
  const menuGroups = useMemo(() => getRenewalMenuGroups(language), [language]);
  const sourceGroups = useMemo(() => getSiteMenuGroups(language), [language]);

  useEffect(() => {
    const update = () => setSolid(currentRoute.length > 0 || window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [currentRoute]);

  useEffect(() => {
    setOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-renewal-menu-open", open);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("is-renewal-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`renewal-header ${solid ? "is-solid" : ""}`}>
        <a className="renewal-header__brand" href="#/" aria-label="Seoul Industry home">
          <span className="renewal-header__brand-symbol" aria-hidden="true">
            <BrainallLogo markOnly />
          </span>
          <span className="renewal-header__wordmark">Seoul Industry Co., Ltd.</span>
        </a>

        <nav className="renewal-nav" aria-label="Renewal navigation">
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
          <div className="renewal-language" role="group" aria-label={copy.languageLabel}>
            {(["ko", "en", "ja"] as RenewalLanguage[]).map((code) => (
              <button type="button" className={language === code ? "is-active" : ""} onClick={() => onLanguageChange(code)} key={code}>
                {code === "ko" ? "KR" : code === "ja" ? "JP" : "EN"}
              </button>
            ))}
          </div>
          <button className="renewal-menu-button" type="button" onClick={() => setOpen(true)} aria-label={copy.menuLabel}>
            <Icon name="menu" />
            <span className="renewal-menu-button__label">MENU</span>
          </button>
        </div>
      </header>

      <aside className={`renewal-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="renewal-drawer__top">
          <a href="#/" onClick={() => setOpen(false)} aria-label="Seoul Industry home">
            <BrainallLogo markOnly />
          </a>
          <button type="button" onClick={() => setOpen(false)} aria-label={copy.closeLabel}>
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
        <div className="renewal-drawer__languages">
          {(["ko", "en", "ja"] as RenewalLanguage[]).map((code) => (
            <button
              type="button"
              className={language === code ? "is-active" : ""}
              onClick={() => {
                onLanguageChange(code);
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

  return (
    <footer className="renewal-footer">
      <div className="renewal-footer__top">
        <div>
          <BrainallLogo markOnly />
          <strong>Precision Automotive Components OEM</strong>
        </div>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <Icon name="up" />
        </button>
      </div>
      <div className="renewal-footer__bottom">
        <div>
          <span>{copy.office}</span>
          <p>{copy.address}</p>
          <a href="tel:+82313661141">+82 31 366 1141</a>
        </div>
        <nav aria-label={copy.footerNav}>
          {menuGroups.map((group) => (
            <a href={group.href} key={group.label}>
              {group.label}
            </a>
          ))}
        </nav>
        <small>{copy.copyright}</small>
      </div>
    </footer>
  );
}
