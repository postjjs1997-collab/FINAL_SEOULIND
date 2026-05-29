import { useEffect, useState } from "react";
export function usePrefersReducedMotion() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShouldReduce(motionQuery.matches);

    update();
    motionQuery.addEventListener("change", update);

    return () => {
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return shouldReduce;
}
