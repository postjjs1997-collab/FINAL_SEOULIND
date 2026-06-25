import { useEffect, useState } from "react";
import BrainallPage from "./components/BrainallPage";
import DesignTweaks from "./components/DesignTweaks";
import MenuPage from "./components/MenuPage";
import NewsPage from "./components/NewsPage";
import TechnologyPage from "./components/TechnologyPage";
import { menuRoutes } from "./data/navigation";

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

  if (route.startsWith("news")) {
    page = <NewsPage route={route} />;
  } else if (route.startsWith("technology")) {
    page = <TechnologyPage route={route} />;
  } else if (menuRoutes.includes(route)) {
    page = <MenuPage route={route} />;
  } else {
    page = <BrainallPage />;
  }

  return (
    <>
      {page}
      <DesignTweaks />
    </>
  );
}
