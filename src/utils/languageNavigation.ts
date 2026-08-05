import { languages, type LanguageCode } from "../data/brainall";
import { jumpToPageTop } from "./pageScroll";

export function applyLanguageAndRestartHome(language: LanguageCode, onLanguageChange: (language: LanguageCode) => void) {
  if (typeof window === "undefined") {
    onLanguageChange(language);
    return;
  }

  const option = languages.find((item) => item.code === language);
  document.documentElement.lang = option?.htmlLang ?? language;
  window.localStorage.setItem("seoulind-language", language);
  onLanguageChange(language);

  if (window.location.hash !== "#/") {
    window.location.hash = "#/";
  }

  jumpToPageTop();
  window.requestAnimationFrame(jumpToPageTop);
  window.setTimeout(jumpToPageTop, 80);
  window.setTimeout(jumpToPageTop, 300);
}
