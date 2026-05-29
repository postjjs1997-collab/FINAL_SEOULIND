import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "./gsap";

export function useLenisScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFinePointer) return;

    const lenis = new Lenis({
      anchors: true,
      autoRaf: false,
      duration: 1.48,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      lerp: 0.072,
      smoothWheel: true,
      wheelMultiplier: 0.52,
      touchMultiplier: 0.82,
    });
    const win = window as Window & { __seoulindLenis?: typeof lenis };
    win.__seoulindLenis = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      window.cancelAnimationFrame(frameId);
      if (win.__seoulindLenis === lenis) {
        delete win.__seoulindLenis;
      }
      lenis.destroy();
    };
  }, [enabled]);
}
