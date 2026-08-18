export type SiteMenuItem = {
  label: string;
  href: string;
};

export type SiteMenuGroup = SiteMenuItem & {
  children: SiteMenuItem[];
};

export type NavigationLanguage = "ko" | "en" | "ja";

export const siteMenuGroupsByLanguage: Record<NavigationLanguage, SiteMenuGroup[]> = {
  ko: [
    {
      label: "기업정보",
      href: "/company/overview",
      children: [
        { label: "회사개요", href: "/company/overview" },
        { label: "CEO 인사말", href: "/company/ceo" },
        { label: "회사 연혁", href: "/company/history" },
        { label: "찾아오시는 길", href: "/company/location" },
        { label: "공지사항", href: "/company/notices" },
        { label: "문의하기", href: "/support/contact" },
      ],
    },
    {
      label: "제품정보",
      href: "/products/steering",
      children: [
        { label: "STEERING", href: "/products/steering" },
        { label: "POWERTRAIN", href: "/products/powertrain" },
        { label: "DRIVELINE", href: "/products/driveline" },
        { label: "ELECTRIFIED POWERTRAIN", href: "/products/electric-vehicle" },
        { label: "MACHINED ALUMINUM COMPONENTS", href: "/products/balance-shaft-module" },
        { label: "DEFENSE", href: "/products/defense" },
      ],
    },
    {
      label: "생산기술",
      href: "/manufacturing/process",
      children: [
        { label: "생산 공정", href: "/manufacturing/process" },
        { label: "보유 설비·자동화", href: "/manufacturing/equipment" },
        { label: "검사 기술", href: "/manufacturing/inspection" },
      ],
    },
    {
      label: "품질보증",
      href: "/quality/policy",
      children: [
        { label: "품질 방침", href: "/quality/policy" },
        { label: "품질 시스템", href: "/quality/system" },
        { label: "예방 품질 활동", href: "/quality/preventive" },
      ],
    },
    {
      label: "연구개발",
      href: "/rnd/parts-development",
      children: [{ label: "부품 개발", href: "/rnd/parts-development" }],
    },
    {
      label: "채용정보",
      href: "/recruit/information",
      children: [
        { label: "채용정보", href: "/recruit/information" },
        { label: "복지 제도", href: "/recruit/benefits" },
      ],
    },
    {
      label: "ESG 정보",
      href: "/esg/information",
      children: [{ label: "ESG 정보", href: "/esg/information" }],
    },
    {
      label: "지속가능경영정책",
      href: "/sustainability/policy",
      children: [{ label: "지속가능경영정책", href: "/sustainability/policy" }],
    },
  ],
  en: [
    {
      label: "Company",
      href: "/company/overview",
      children: [
        { label: "Overview", href: "/company/overview" },
        { label: "CEO Message", href: "/company/ceo" },
        { label: "History", href: "/company/history" },
        { label: "Location", href: "/company/location" },
        { label: "Notices", href: "/company/notices" },
        { label: "Contact", href: "/support/contact" },
      ],
    },
    {
      label: "Products",
      href: "/products/steering",
      children: [
        { label: "STEERING", href: "/products/steering" },
        { label: "POWERTRAIN", href: "/products/powertrain" },
        { label: "DRIVELINE", href: "/products/driveline" },
        { label: "ELECTRIFIED POWERTRAIN", href: "/products/electric-vehicle" },
        { label: "MACHINED ALUMINUM COMPONENTS", href: "/products/balance-shaft-module" },
        { label: "DEFENSE", href: "/products/defense" },
      ],
    },
    {
      label: "Manufacturing",
      href: "/manufacturing/process",
      children: [
        { label: "Production Process", href: "/manufacturing/process" },
        { label: "Equipment & Automation", href: "/manufacturing/equipment" },
        { label: "Inspection Technology", href: "/manufacturing/inspection" },
      ],
    },
    {
      label: "Quality",
      href: "/quality/policy",
      children: [
        { label: "Quality Policy", href: "/quality/policy" },
        { label: "Quality System", href: "/quality/system" },
        { label: "Preventive Quality", href: "/quality/preventive" },
      ],
    },
    {
      label: "R&D",
      href: "/rnd/parts-development",
      children: [{ label: "Parts Development", href: "/rnd/parts-development" }],
    },
    {
      label: "Careers",
      href: "/recruit/information",
      children: [
        { label: "Recruitment", href: "/recruit/information" },
        { label: "Benefits", href: "/recruit/benefits" },
      ],
    },
    {
      label: "ESG",
      href: "/esg/information",
      children: [{ label: "ESG Information", href: "/esg/information" }],
    },
    {
      label: "Sustainability Policy",
      href: "/sustainability/policy",
      children: [{ label: "Sustainability Policy", href: "/sustainability/policy" }],
    },
  ],
  ja: [
    {
      label: "企業情報",
      href: "/company/overview",
      children: [
        { label: "会社概要", href: "/company/overview" },
        { label: "CEOメッセージ", href: "/company/ceo" },
        { label: "会社沿革", href: "/company/history" },
        { label: "アクセス", href: "/company/location" },
        { label: "お知らせ", href: "/company/notices" },
        { label: "お問い合わせ", href: "/support/contact" },
      ],
    },
    {
      label: "製品情報",
      href: "/products/steering",
      children: [
        { label: "STEERING", href: "/products/steering" },
        { label: "POWERTRAIN", href: "/products/powertrain" },
        { label: "DRIVELINE", href: "/products/driveline" },
        { label: "ELECTRIFIED POWERTRAIN", href: "/products/electric-vehicle" },
        { label: "MACHINED ALUMINUM COMPONENTS", href: "/products/balance-shaft-module" },
        { label: "DEFENSE", href: "/products/defense" },
      ],
    },
    {
      label: "生産技術",
      href: "/manufacturing/process",
      children: [
        { label: "生産工程", href: "/manufacturing/process" },
        { label: "保有設備・自動化", href: "/manufacturing/equipment" },
        { label: "検査技術", href: "/manufacturing/inspection" },
      ],
    },
    {
      label: "品質保証",
      href: "/quality/policy",
      children: [
        { label: "品質方針", href: "/quality/policy" },
        { label: "品質システム", href: "/quality/system" },
        { label: "未然防止活動", href: "/quality/preventive" },
      ],
    },
    {
      label: "研究開発",
      href: "/rnd/parts-development",
      children: [{ label: "部品開発", href: "/rnd/parts-development" }],
    },
    {
      label: "採用情報",
      href: "/recruit/information",
      children: [
        { label: "採用情報", href: "/recruit/information" },
        { label: "福利厚生", href: "/recruit/benefits" },
      ],
    },
    {
      label: "ESG情報",
      href: "/esg/information",
      children: [{ label: "ESG情報", href: "/esg/information" }],
    },
    {
      label: "サステナビリティ経営方針",
      href: "/sustainability/policy",
      children: [{ label: "サステナビリティ経営方針", href: "/sustainability/policy" }],
    },
  ],
};

export const routeAliases: Record<string, string> = {
  "company/greeting": "company/ceo",
  "company/certificates": "quality/system",
  "sustainability/environmental": "esg/information",
  "sustainability/governance": "sustainability/policy",
  "sustainability/esg-report": "sustainability/policy",
  "products/automotive": "products/steering",
  "products/industrial": "products/etc",
  "products/defense": "products/etc",
  "support/news": "company/notices",
  "recruit/guide": "recruit/information",
  "recruit/jobs": "recruit/information",
};

export const siteMenuGroups = siteMenuGroupsByLanguage.ko;

export function getSiteMenuGroups(language: NavigationLanguage = "ko") {
  return siteMenuGroupsByLanguage[language] ?? siteMenuGroupsByLanguage.ko;
}

export function resolveMenuRoute(route: string) {
  const cleanRoute = route
    .replace(/^#\/?/, "")
    .replace(/^\/+/, "")
    .replace(/^renewal\/?/, "")
    .replace(/\/$/, "");
  return routeAliases[cleanRoute] ?? cleanRoute;
}

/** Strips a legacy "#/" or root-relative "/" prefix from a navigation href. */
const canonicalMenuRoutes = siteMenuGroups.flatMap((group) =>
  group.children.map((child) => child.href.replace(/^(#\/|\/)/, "")),
);

/** Routes that are reachable but intentionally kept out of the menu (footer / legal links). */
export const hiddenRoutes = ["legal/privacy"];

export const menuRoutes = [
  ...new Set([...canonicalMenuRoutes, ...hiddenRoutes, ...Object.keys(routeAliases), ...Object.values(routeAliases)]),
];

export function findMenuByRoute(route: string, language: NavigationLanguage = "ko") {
  const cleanRoute = resolveMenuRoute(route);
  const groups = getSiteMenuGroups(language);

  for (const group of groups) {
    const activeChild = group.children.find((child) => resolveMenuRoute(child.href) === cleanRoute);
    if (activeChild) return { group, child: activeChild };
  }

  if (cleanRoute === "products/etc") {
    const productGroup = groups.find((group) => group.href.startsWith("/products/"));
    if (productGroup) {
      return {
        group: productGroup,
        child: { label: "DEFENSE", href: "/products/defense" },
      };
    }
  }

  return {
    group: groups[0],
    child: groups[0].children[0],
  };
}
