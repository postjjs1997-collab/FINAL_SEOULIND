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
      duration: 1.28,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.62,
      touchMultiplier: 0.9,
    });
    const win = window as Window & { __seoulindLenis?: typeof lenis };
    win.__seoulindLenis = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
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
