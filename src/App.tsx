import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import DesignTweaks from "./components/DesignTweaks";
import NewsPage from "./components/NewsPage";
import TechnologyPage from "./components/TechnologyPage";
import { menuRoutes, resolveMenuRoute } from "./data/navigation";
import { jumpToPageTop, keepPageAtTopAfterRouteChange } from "./utils/pageScroll";

const RenewalPage = lazy(() => import("./components/RenewalPage"));
const RenewalSubPage = lazy(() => import("./components/RenewalSubPage"));

function getRoute() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#\/?/, "");
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const syncRoute = () => {
      jumpToPageTop();
      setRoute(getRoute());
    };
    const resetInternalLink = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>('a[href^="#/"]') : null;
      if (link) jumpToPageTop();
    };

    window.addEventListener("hashchange", syncRoute);
    document.addEventListener("click", resetInternalLink, true);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("hashchange", syncRoute);
      document.removeEventListener("click", resetInternalLink, true);
    };
  }, []);

  useLayoutEffect(() => keepPageAtTopAfterRouteChange(), [route]);

  let page;

  if (route === "" || route === "renewal") {
    page = (
      <Suspense fallback={<div style={{ minHeight: "100svh", background: "#151515" }} />}>
        <RenewalPage />
      </Suspense>
    );
  } else if (route.startsWith("renewal/")) {
    page = (
      <Suspense fallback={<div style={{ minHeight: "100svh", background: "#151515" }} />}>
        <RenewalSubPage route={resolveMenuRoute(route)} />
      </Suspense>
    );
  } else if (menuRoutes.includes(route)) {
    page = (
      <Suspense fallback={<div style={{ minHeight: "100svh", background: "#151515" }} />}>
        <RenewalSubPage route={resolveMenuRoute(route)} />
      </Suspense>
    );
  } else if (route.startsWith("news")) {
    page = <NewsPage route={route} />;
  } else if (route.startsWith("technology")) {
    page = <TechnologyPage route={route} />;
  } else {
    page = (
      <Suspense fallback={<div style={{ minHeight: "100svh", background: "#151515" }} />}>
        <RenewalPage />
      </Suspense>
    );
  }

  return (
    <>
      {page}
      <DesignTweaks />
    </>
  );
}
