import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";

type NetworkInformationLike = EventTarget & {
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

export type ViewportLoopVideoProps = {
  src: string;
  poster: string;
  className?: string;
  "aria-label"?: string;
  objectFit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
};

function getConnection(): NetworkInformationLike | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as NavigatorWithConnection).connection;
}

function useSaveDataPreference() {
  const [saveData, setSaveData] = useState(() => Boolean(getConnection()?.saveData));

  useEffect(() => {
    const connection = getConnection();
    if (!connection) return;

    const update = () => setSaveData(Boolean(connection.saveData));
    update();
    connection.addEventListener("change", update);

    return () => connection.removeEventListener("change", update);
  }, []);

  return saveData;
}

export function ViewportLoopVideo({
  src,
  poster,
  className,
  "aria-label": ariaLabel,
  objectFit,
  objectPosition,
}: ViewportLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const saveData = useSaveDataPreference();
  const posterOnly = reducedMotion || saveData;
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const [hasError, setHasError] = useState(false);
  const mediaStyle: CSSProperties | undefined =
    objectFit || objectPosition ? { objectFit, objectPosition } : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || posterOnly) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        preloadObserver.disconnect();
      },
      { rootMargin: "480px 0px" },
    );
    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.08));
      },
      { threshold: [0, 0.08, 0.25] },
    );

    preloadObserver.observe(video);
    playbackObserver.observe(video);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [posterOnly]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const syncPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldLoad && isVisible && pageVisible && !posterOnly && !hasError) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [hasError, isVisible, pageVisible, posterOnly, shouldLoad]);

  useEffect(() => {
    syncPlayback();
  }, [syncPlayback]);

  if (posterOnly || hasError) {
    return (
      <img
        className={className}
        src={poster}
        alt={ariaLabel ?? ""}
        loading="lazy"
        decoding="async"
        style={mediaStyle}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      src={shouldLoad ? src : undefined}
      poster={poster}
      aria-label={ariaLabel}
      autoPlay={false}
      muted
      loop
      playsInline
      preload="none"
      style={mediaStyle}
      onCanPlay={syncPlayback}
      onError={() => setHasError(true)}
    />
  );
}

export default ViewportLoopVideo;
