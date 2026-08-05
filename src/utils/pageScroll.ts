type LenisController = {
  scrollTo?: (
    target: number,
    options?: { duration?: number; force?: boolean; immediate?: boolean },
  ) => void;
};

export function jumpToPageTop() {
  if (typeof window === "undefined") return;

  const win = window as Window & { __seoulindLenis?: LenisController };
  win.__seoulindLenis?.scrollTo?.(0, {
    duration: 0,
    force: true,
    immediate: true,
  });
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function keepPageAtTopAfterRouteChange() {
  jumpToPageTop();

  const frameId = window.requestAnimationFrame(jumpToPageTop);
  const timeoutId = window.setTimeout(jumpToPageTop, 80);

  return () => {
    window.cancelAnimationFrame(frameId);
    window.clearTimeout(timeoutId);
  };
}
