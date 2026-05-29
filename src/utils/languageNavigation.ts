import { languages, type LanguageCode } from "../data/brainall";

type LenisController = {
  scrollTo?: (target: number, options?: { duration?: number; force?: boolean; immediate?: boolean }) => void;
};

function jumpToPageTop() {
  const win = window as Window & { __seoulindLenis?: LenisController };
  win.__seoulindLenis?.scrollTo?.(0, { duration: 0, force: true, immediate: true });
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

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
