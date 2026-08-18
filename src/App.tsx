import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState } from "react";
import DesignTweaks from "./components/DesignTweaks";
import NotFoundPage from "./components/NotFoundPage";
import { getPageConfig } from "./data/pageConfig";
import { menuRoutes, resolveMenuRoute } from "./data/navigation";
import { keepPageAtTopAfterRouteChange } from "./utils/pageScroll";
import { applyHead, setRobots } from "./utils/seoHead";
import {
  isInternalLink,
  navigate,
  parseInternalHref,
  parseLocation,
  subscribeToLocation,
  type SiteLanguage,
} from "./utils/siteRouter";

const RenewalPage = lazy(() => import("./components/RenewalPage"));
const RenewalSubPage = lazy(() => import("./components/RenewalSubPage"));
const RenewalNoticePage = lazy(() => import("./components/RenewalNoticePage"));

type SiteCopy = { title: string; description: string; noticesTitle: string; noticesDescription: string; notFoundTitle: string; privacyTitle: string; privacyDescription: string };

const siteCopy: Record<SiteLanguage, SiteCopy> = {
  ko: {
    title: "서울산업 | 자동차 부품 정밀가공",
    description:
      "서울산업은 1985년 설립 이후 자동차용 샤프트, 기어, 스플라인, 하우징을 생산해 온 정밀가공 전문 기업입니다. Steering·Powertrain·Driveline 부품을 개발부터 양산까지 OEM 기준으로 공급합니다.",
    noticesTitle: "공지사항",
    noticesDescription: "제품, 생산, 품질, 채용 등 서울산업의 주요 소식을 확인하실 수 있습니다.",
    notFoundTitle: "페이지를 찾을 수 없습니다",
    privacyTitle: "개인정보처리방침",
    privacyDescription: "서울산업 홈페이지 문의 접수 시 수집하는 개인정보의 항목, 이용 목적, 보유 기간과 정보주체의 권리를 안내합니다.",
  },
  en: {
    title: "Seoul Industry | Precision Automotive Components",
    description:
      "Seoul Industry has manufactured precision-machined automotive shafts, gears, splines and housings since 1985, supplying steering, powertrain and driveline components from development to OEM mass production.",
    noticesTitle: "News & Notices",
    noticesDescription: "The latest news from Seoul Industry, including product, manufacturing, quality and recruitment updates.",
    notFoundTitle: "Page not found",
    privacyTitle: "Privacy Policy",
    privacyDescription: "How Seoul Industry collects, uses and retains personal data submitted through website inquiries, and the rights of data subjects.",
  },
  ja: {
    title: "ソウル産業 | 自動車部品の精密加工",
    description:
      "ソウル産業は1985年の設立以来、自動車用シャフト、ギア、スプライン、ハウジングを製造してきた精密加工の専門メーカーです。ステアリング・パワートレイン・ドライブライン部品を開発から量産までOEM基準で供給しています。",
    noticesTitle: "お知らせ",
    noticesDescription: "製品、生産、品質、採用など、ソウル産業の最新情報をご案内します。",
    notFoundTitle: "ページが見つかりません",
    privacyTitle: "個人情報保護方針",
    privacyDescription: "ソウル産業ウェブサイトのお問い合わせで取得する個人情報の項目、利用目的、保有期間および情報主体の権利をご案内します。",
  },
};

const brandSuffix: Record<SiteLanguage, string> = { ko: "서울산업", en: "Seoul Industry", ja: "ソウル産業" };

function pageTitle(title: string, language: SiteLanguage) {
  return `${title} | ${brandSuffix[language]}`;
}

const fallback = <div style={{ minHeight: "100svh", background: "#151515" }} />;

export default function App() {
  const [location, setLocation] = useState(parseLocation);
  const { language, route } = location;

  const sync = useCallback(() => setLocation(parseLocation()), []);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const unsubscribe = subscribeToLocation(sync);

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || !isInternalLink(link)) return;
      const href = link.getAttribute("href") ?? "";
      const parsed = parseInternalHref(href);
      event.preventDefault();
      navigate(parsed.route, parsed.language ? { language: parsed.language } : undefined);
    };

    document.addEventListener("click", onDocumentClick);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      unsubscribe();
      document.removeEventListener("click", onDocumentClick);
    };
  }, [sync]);

  useLayoutEffect(() => keepPageAtTopAfterRouteChange(), [route]);

  const resolvedRoute = resolveMenuRoute(route);
  const copy = siteCopy[language];

  const isHome = route === "" || route === "renewal";
  const isNotices = resolvedRoute === "company/notices" || resolvedRoute.startsWith("company/notices/");
  const isNewsAdmin = route === "news/admin" || route.startsWith("news/admin/");
  const isRenewalSub = route.startsWith("renewal/");
  const isMenuRoute = menuRoutes.includes(route);
  const isLegacyNews = !isNotices && !isNewsAdmin && route.startsWith("news");
  const isLegacyTechnology = route.startsWith("technology");
  const isNotFound = !isHome && !isNotices && !isNewsAdmin && !isRenewalSub && !isMenuRoute && !isLegacyNews && !isLegacyTechnology;

  useEffect(() => {
    if (isLegacyNews) {
      navigate("company/notices", { replace: true });
    } else if (isLegacyTechnology) {
      navigate("manufacturing/process", { replace: true });
    }
  }, [isLegacyNews, isLegacyTechnology]);

  useEffect(() => {
    if (isLegacyNews || isLegacyTechnology) return;

    if (isHome) {
      applyHead({ title: copy.title, description: copy.description, route: "", language });
    } else if (isNotices || isNewsAdmin) {
      applyHead({
        title: pageTitle(copy.noticesTitle, language),
        description: copy.noticesDescription,
        route: isNewsAdmin ? "company/notices/admin" : resolvedRoute,
        language,
      });
    } else if (resolvedRoute === "legal/privacy") {
      applyHead({ title: pageTitle(copy.privacyTitle, language), description: copy.privacyDescription, route: resolvedRoute, language });
    } else if (isRenewalSub || isMenuRoute) {
      const config = getPageConfig(resolvedRoute, language);
      applyHead({
        title: pageTitle(config.title, language),
        description: config.lead || config.heroCopy || copy.description,
        route: resolvedRoute,
        language,
      });
    } else {
      applyHead({ title: pageTitle(copy.notFoundTitle, language), description: copy.description, route, language });
    }

    setRobots(isNotFound || isNewsAdmin ? "noindex" : null);
  }, [
    copy,
    isHome,
    isLegacyNews,
    isLegacyTechnology,
    isMenuRoute,
    isNewsAdmin,
    isNotFound,
    isNotices,
    isRenewalSub,
    language,
    resolvedRoute,
    route,
  ]);

  let page;

  if (isHome) {
    page = <RenewalPage />;
  } else if (isNotices) {
    page = <RenewalNoticePage route={resolvedRoute} />;
  } else if (isNewsAdmin) {
    page = <RenewalNoticePage route="company/notices/admin" />;
  } else if (isRenewalSub || isMenuRoute) {
    page = <RenewalSubPage route={resolvedRoute} />;
  } else if (isLegacyNews || isLegacyTechnology) {
    page = null;
  } else {
    page = <NotFoundPage language={language} />;
  }

  return (
    <>
      <Suspense key={language} fallback={fallback}>
        {page}
      </Suspense>
      {import.meta.env.DEV ? <DesignTweaks /> : null}
    </>
  );
}
