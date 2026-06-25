export type SiteMenuItem = {
  label: string;
  href: string;
};

export type SiteMenuGroup = SiteMenuItem & {
  children: SiteMenuItem[];
};

export const siteMenuGroups: SiteMenuGroup[] = [
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
];

export const menuRoutes = siteMenuGroups.flatMap((group) =>
  group.children.map((child) => child.href.replace(/^#\//, "")),
);

export function findMenuByRoute(route: string) {
  const cleanRoute = route.replace(/^#\/?/, "");

  for (const group of siteMenuGroups) {
    const activeChild = group.children.find((child) => child.href.replace(/^#\//, "") === cleanRoute);
    if (activeChild) return { group, child: activeChild };
  }

  return {
    group: siteMenuGroups[0],
    child: siteMenuGroups[0].children[0],
  };
}
