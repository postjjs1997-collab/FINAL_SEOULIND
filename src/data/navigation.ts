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
      label: "회사소개",
      href: "#/company/greeting",
      children: [
        { label: "인사말", href: "#/company/greeting" },
        { label: "회사연혁", href: "#/company/history" },
        { label: "인증서", href: "#/company/certificates" },
      ],
    },
    {
      label: "지속가능경영",
      href: "#/sustainability/environmental",
      children: [
        { label: "Environmental", href: "#/sustainability/environmental" },
        { label: "Governance", href: "#/sustainability/governance" },
        { label: "ESG보고서", href: "#/sustainability/esg-report" },
      ],
    },
    {
      label: "제품소개",
      href: "#/products/automotive",
      children: [
        { label: "자동차", href: "#/products/automotive" },
        { label: "산업기계", href: "#/products/industrial" },
      ],
    },
    {
      label: "고객지원",
      href: "#/support/news",
      children: [
        { label: "News", href: "#/support/news" },
        { label: "문의하기", href: "#/support/contact" },
      ],
    },
    {
      label: "인재채용",
      href: "#/recruit/guide",
      children: [
        { label: "채용안내", href: "#/recruit/guide" },
        { label: "채용공고", href: "#/recruit/jobs" },
      ],
    },
  ],
  en: [
    {
      label: "Company",
      href: "#/company/greeting",
      children: [
        { label: "Greeting", href: "#/company/greeting" },
        { label: "History", href: "#/company/history" },
        { label: "Certificates", href: "#/company/certificates" },
      ],
    },
    {
      label: "Sustainability",
      href: "#/sustainability/environmental",
      children: [
        { label: "Environmental", href: "#/sustainability/environmental" },
        { label: "Governance", href: "#/sustainability/governance" },
        { label: "ESG Report", href: "#/sustainability/esg-report" },
      ],
    },
    {
      label: "Products",
      href: "#/products/automotive",
      children: [
        { label: "Automotive", href: "#/products/automotive" },
        { label: "Industrial Machinery", href: "#/products/industrial" },
      ],
    },
    {
      label: "Support",
      href: "#/support/news",
      children: [
        { label: "News", href: "#/support/news" },
        { label: "Contact", href: "#/support/contact" },
      ],
    },
    {
      label: "Recruitment",
      href: "#/recruit/guide",
      children: [
        { label: "Careers", href: "#/recruit/guide" },
        { label: "Job Openings", href: "#/recruit/jobs" },
      ],
    },
  ],
  ja: [
    {
      label: "会社紹介",
      href: "#/company/greeting",
      children: [
        { label: "ご挨拶", href: "#/company/greeting" },
        { label: "会社沿革", href: "#/company/history" },
        { label: "認証書", href: "#/company/certificates" },
      ],
    },
    {
      label: "持続可能経営",
      href: "#/sustainability/environmental",
      children: [
        { label: "Environmental", href: "#/sustainability/environmental" },
        { label: "Governance", href: "#/sustainability/governance" },
        { label: "ESGレポート", href: "#/sustainability/esg-report" },
      ],
    },
    {
      label: "製品紹介",
      href: "#/products/automotive",
      children: [
        { label: "自動車", href: "#/products/automotive" },
        { label: "産業機械", href: "#/products/industrial" },
      ],
    },
    {
      label: "お客様サポート",
      href: "#/support/news",
      children: [
        { label: "News", href: "#/support/news" },
        { label: "お問い合わせ", href: "#/support/contact" },
      ],
    },
    {
      label: "採用情報",
      href: "#/recruit/guide",
      children: [
        { label: "採用案内", href: "#/recruit/guide" },
        { label: "採用公告", href: "#/recruit/jobs" },
      ],
    },
  ],
};

export const siteMenuGroups = siteMenuGroupsByLanguage.ko;

export function getSiteMenuGroups(language: NavigationLanguage = "ko") {
  return siteMenuGroupsByLanguage[language] ?? siteMenuGroupsByLanguage.ko;
}

export const menuRoutes = siteMenuGroups.flatMap((group) =>
  group.children.map((child) => child.href.replace(/^#\//, "")),
);

export function findMenuByRoute(route: string, language: NavigationLanguage = "ko") {
  const cleanRoute = route.replace(/^#\/?/, "");
  const groups = getSiteMenuGroups(language);

  for (const group of groups) {
    const activeChild = group.children.find((child) => child.href.replace(/^#\//, "") === cleanRoute);
    if (activeChild) return { group, child: activeChild };
  }

  return {
    group: groups[0],
    child: groups[0].children[0],
  };
}
