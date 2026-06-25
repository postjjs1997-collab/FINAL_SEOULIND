import { useEffect, useState } from "react";
import BrainallPage from "./components/BrainallPage";
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

  if (route.startsWith("news")) {
    return <NewsPage route={route} />;
  }

  if (route.startsWith("technology")) {
    return <TechnologyPage route={route} />;
  }

  if (menuRoutes.includes(route)) {
    return <MenuPage route={route} />;
  }

  return <BrainallPage />;
}
