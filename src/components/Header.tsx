import { useEffect, useLayoutEffect, useState } from "react";
import BrainallLogo from "./BrainallLogo";
import Icon from "./Icons";
import { languages, type LanguageCode, type SiteContent } from "../data/brainall";
import { gsap } from "../motion/gsap";
import { applyLanguageAndRestartHome } from "../utils/languageNavigation";

type HeaderNavChild = {
  label: string;
  href: string;
};

type HeaderNavGroup = {
  label: string;
  href: string;
  children: HeaderNavChild[];
};

type HeaderProps = {
  content: SiteContent;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
};

const headerNavGroups: Record<LanguageCode, HeaderNavGroup[]> = {
  ko: [
    {
      label: "회사소개",
      href: "#data",
      children: [
        { label: "제조 기반", href: "#data" },
        { label: "회사연혁", href: "#history" },
        { label: "글로벌 고객사", href: "#partners" },
      ],
    },
    {
      label: "지속가능경영",
      href: "#esg-management",
      children: [
        { label: "ESG 방향", href: "#esg-management" },
        { label: "환경", href: "#esg-management" },
        { label: "사회", href: "#esg-management" },
        { label: "거버넌스", href: "#esg-management" },
      ],
    },
    {
      label: "고객지원",
      href: "#media",
      children: [
        { label: "공지사항", href: "#/news" },
        { label: "News", href: "#media" },
        { label: "관리자", href: "#/news/admin" },
      ],
    },
  ],
  en: [
    {
      label: "Company",
      href: "#data",
      children: [
        { label: "Manufacturing Base", href: "#data" },
        { label: "History", href: "#history" },
        { label: "Global Customers", href: "#partners" },
      ],
    },
    {
      label: "Sustainability",
      href: "#esg-management",
      children: [
        { label: "ESG Direction", href: "#esg-management" },
        { label: "Environmental", href: "#esg-management" },
        { label: "Social", href: "#esg-management" },
        { label: "Governance", href: "#esg-management" },
      ],
    },
    {
      label: "Support",
      href: "#media",
      children: [
        { label: "Notice", href: "#/news" },
        { label: "News", href: "#media" },
        { label: "Admin", href: "#/news/admin" },
      ],
    },
  ],
  ja: [
    {
      label: "会社紹介",
      href: "#data",
      children: [
        { label: "製造基盤", href: "#data" },
        { label: "沿革", href: "#history" },
        { label: "グローバル顧客", href: "#partners" },
      ],
    },
    {
      label: "サステナビリティ",
      href: "#esg-management",
      children: [
        { label: "ESG方針", href: "#esg-management" },
        { label: "環境", href: "#esg-management" },
        { label: "社会", href: "#esg-management" },
        { label: "ガバナンス", href: "#esg-management" },
      ],
    },
    {
      label: "サポート",
      href: "#media",
      children: [
        { label: "お知らせ", href: "#/news" },
        { label: "ニュース", href: "#media" },
        { label: "管理者", href: "#/news/admin" },
      ],
    },
  ],
};

export default function Header({ content, language, onLanguageChange }: HeaderProps) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { header, searchTags } = content;
  const menuGroups = headerNavGroups[language] ?? headerNavGroups.ko;
  const handleLanguageChange = (nextLanguage: LanguageCode) => {
    setMobileOpen(false);
    setSearchOpen(false);
    applyLanguageAndRestartHome(nextLanguage, onLanguageChange);
  };

  useEffect(() => {
    let lastY = window.scrollY;

    const update = () => {
      const nextY = window.scrollY;
      setSolid(nextY > 100 || searchOpen);
      setHidden(nextY > 150 && nextY > lastY + 4 && !searchOpen && !mobileOpen);
      lastY = nextY;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keyup", onKey);
    return () => window.removeEventListener("keyup", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-overlay-open", mobileOpen || searchOpen);
    return () => document.documentElement.classList.remove("is-overlay-open");
  }, [mobileOpen, searchOpen]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".site-header", { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out", delay: 0.12 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        className={`site-header ${solid ? "site-header--solid" : ""} ${hidden ? "site-header--hidden" : ""}`}
      >
        <a className="site-header__brand" href="#/" aria-label={header.homeLabel}>
          <BrainallLogo />
        </a>

        <nav className="site-nav" aria-label={header.navLabel}>
          {menuGroups.map((group) => (
            <div className="site-nav__group" key={group.label}>
              <a className="site-nav__item" href={group.href}>
                {group.label}
              </a>
              <div className="site-nav__dropdown">
                {group.children.map((child) => (
                  <a href={child.href} key={child.label}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="site-header__actions">
          <div className="language-switcher" role="group" aria-label={header.languageLabel}>
            {languages.map((item) => (
              <button
                className={language === item.code ? "is-active" : ""}
                type="button"
                key={item.code}
                onClick={() => {
                  handleLanguageChange(item.code);
                }}
                aria-label={item.ariaLabel}
                aria-pressed={language === item.code}
              >
                {item.shortLabel}
              </button>
            ))}
          </div>
          <button className="header-icon" type="button" onClick={() => setSearchOpen(true)} aria-label={header.openSearch}>
            <Icon name="search" />
          </button>
          <button className="header-icon header-icon--menu" type="button" onClick={() => setMobileOpen(true)} aria-label={header.openMenu}>
            <Icon name="menu" />
          </button>
        </div>

      </header>

      <div className={`mobile-drawer ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <button className="drawer-close" type="button" onClick={() => setMobileOpen(false)} aria-label={header.closeMenu}>
          <Icon name="close" />
        </button>
        <BrainallLogo className="mobile-drawer__logo" />
        <div className="mobile-language-switcher" role="group" aria-label={header.languageLabel}>
          {languages.map((item) => (
            <button
              className={language === item.code ? "is-active" : ""}
              type="button"
              key={item.code}
              onClick={() => handleLanguageChange(item.code)}
              aria-pressed={language === item.code}
            >
              {item.label}
            </button>
          ))}
        </div>
        <nav className="mobile-drawer__nav" aria-label={header.mobileNavLabel}>
          {menuGroups.map((group) => (
            <div className="mobile-drawer__group" key={group.label}>
              <a href={group.href} onClick={() => setMobileOpen(false)}>
                <span>{group.label}</span>
              </a>
              <div className="mobile-drawer__subnav">
                {group.children.map((child) => (
                  <a href={child.href} key={child.label} onClick={() => setMobileOpen(false)}>
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className={`search-overlay ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <button className="drawer-close" type="button" onClick={() => setSearchOpen(false)} aria-label={header.closeSearch}>
          <Icon name="close" />
        </button>
        <div className="search-overlay__panel">
          <h2>{header.searchTitle}</h2>
          <p>{header.searchDescription}</p>
          <label>
            <span>{header.searchLabel}</span>
            <input autoFocus={searchOpen} placeholder={header.searchPlaceholder} />
          </label>
          <div className="search-tags" aria-label={header.searchTagsLabel}>
            {searchTags.map((tag) => (
              <button type="button" key={tag}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
