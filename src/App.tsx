import { lazy, Suspense, useEffect, useState } from "react";
import DesignTweaks from "./components/DesignTweaks";
import NewsPage from "./components/NewsPage";
import TechnologyPage from "./components/TechnologyPage";
import { menuRoutes, resolveMenuRoute } from "./data/navigation";

const RenewalPage = lazy(() => import("./components/RenewalPage"));
const RenewalSubPage = lazy(() => import("./components/RenewalSubPage"));

function getRoute() {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#\/?/, "");
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

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
