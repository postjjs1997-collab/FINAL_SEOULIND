import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import balanceModuleImage from "../../housing.png";
import drivelineImage from "../../driveline.png";
import electricVehicleImage from "../../electric vehicle.png";
import steeringImage from "../../steering.png";
import BrainallLogo, { SeoulIndustrySymbol } from "./BrainallLogo";
import Header from "./Header";
import Icon from "./Icons";
import {
  defaultLanguage,
  globalVideo,
  isLanguageCode,
  languages,
  showcaseVideos,
  siteContent,
  type GlobalAchievement,
  type HistoryEra,
  type Highlight,
  type LanguageCode,
  type LatestPart,
  type MediaItem,
  type PartnerLogo,
  type SiteContent,
  type ShowcaseVideo,
  type EsgPillar,
} from "../data/siteContent";
import { getNoticePosts, noticePostsToMediaItems } from "../data/notices";
import { gsap, ScrollTrigger } from "../motion/gsap";
import { motionConfig } from "../motion/config";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useLenisScroll } from "../motion/useLenisScroll";

function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = barRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" ref={barRef} />
    </div>
  );
}

const latestProductLineup: Record<LanguageCode, { title: string; parts: LatestPart[] }> = {
  ko: {
    title: "LATEST PRODUCT\nLINE UP",
    parts: [
      {
        index: "01",
        category: "PRODUCT",
        title: "Balance Module",
        copy: "회전 안정성, 진동 제어, 반복 가공 품질을 고려한 밸런스 모듈 부품입니다.",
        image: balanceModuleImage,
        accent: "#f36f21",
      },
      {
        index: "02",
        category: "PRODUCT",
        title: "Driveline",
        copy: "동력 전달, 조립 안정성, 내구 표면 품질을 기준으로 가공한 드라이브라인 부품입니다.",
        image: drivelineImage,
        accent: "#f7a13a",
      },
      {
        index: "03",
        category: "PRODUCT",
        title: "Electric Vehicle",
        copy: "전기차 플랫폼의 조립 조건, 정밀도, 장기 내구성을 고려한 EV 부품입니다.",
        image: electricVehicleImage,
        accent: "#d94f1d",
      },
      {
        index: "04",
        category: "PRODUCT",
        title: "Steering",
        copy: "응답성, 정렬, 안전 품질 기준을 지원하는 조향 계열 부품입니다.",
        image: steeringImage,
        accent: "#f08a2a",
      },
    ],
  },
  en: {
    title: "LATEST PRODUCT\nLINE UP",
    parts: [
      {
        index: "01",
        category: "PRODUCT",
        title: "Balance Module",
        copy: "Balance module components engineered for stable rotation, vibration control, and repeatable machining quality.",
        image: balanceModuleImage,
        accent: "#f36f21",
      },
      {
        index: "02",
        category: "PRODUCT",
        title: "Driveline",
        copy: "Driveline components built around power delivery, assembly stability, and durable surface quality.",
        image: drivelineImage,
        accent: "#f7a13a",
      },
      {
        index: "03",
        category: "PRODUCT",
        title: "Electric Vehicle",
        copy: "Electric vehicle parts machined for platform-specific assembly, precision, and long-cycle durability.",
        image: electricVehicleImage,
        accent: "#d94f1d",
      },
      {
        index: "04",
        category: "PRODUCT",
        title: "Steering",
        copy: "Steering-line components built for crisp steering response, precise alignment, and safety-critical quality.",
        image: steeringImage,
        accent: "#f08a2a",
      },
    ],
  },
  ja: {
    title: "LATEST PRODUCT\nLINE UP",
    parts: [
      {
        index: "01",
        category: "製品",
        title: "バランスモジュール",
        copy: "回転安定性、振動制御、安定した加工品質を支えるバランスモジュール部品です。",
        image: balanceModuleImage,
        accent: "#f36f21",
      },
      {
        index: "02",
        category: "製品",
        title: "ドライブライン",
        copy: "動力伝達と組立安定性を考慮したドライブライン精密部品です。",
        image: drivelineImage,
        accent: "#f7a13a",
      },
      {
        index: "03",
        category: "製品",
        title: "電気自動車",
        copy: "EVプラットフォームの組立条件、精度、長期耐久性を考慮した部品です。",
        image: electricVehicleImage,
        accent: "#d94f1d",
      },
      {
        index: "04",
        category: "製品",
        title: "ステアリング",
        copy: "応答性、アライメント、安全品質基準を支えるステアリング系部品です。",
        image: steeringImage,
        accent: "#f08a2a",
      },
    ],
  },
};

function useInView<T extends HTMLElement>(threshold = 0.2, rootMargin = "0px 0px 35% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView((current) => (current === entry.isIntersecting ? current : entry.isIntersecting));
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView] as const;
}

function useSectionProgress<T extends HTMLElement>(
  ref: { current: T | null },
  options: { startVh?: number; endVh?: number } = {},
) {
  const [progress, setProgress] = useState(0);
  const { startVh = 0.86, endVh = 0.42 } = options;

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * startVh;
      const end = viewportHeight * endVh;
      const raw = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const next = raw > 0.985 ? 1 : raw < 0.015 ? 0 : raw;

      setProgress((current) => (Math.abs(current - next) > 0.012 ? next : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [endVh, ref, startVh]);

  return progress;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function useScrollSteps<T extends HTMLElement>(ref: { current: T | null }, count: number, bias = 0.0001) {
  const [state, setState] = useState({ index: 0, progress: 0, stepProgress: 0 });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const node = ref.current;
      if (!node || count <= 1) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const head = Math.max(0, Number(node.dataset.scrollHeadVh ?? 0)) * viewportHeight;
      const tail = Math.max(0, Number(node.dataset.scrollTailVh ?? 0)) * viewportHeight;
      const scrollable = Math.max(1, node.offsetHeight - viewportHeight - head - tail);
      const raw = Math.min(1, Math.max(0, (-rect.top - head) / scrollable));
      const stepValue = raw * (count - 1);
      const index = Math.min(count - 1, Math.max(0, Math.floor(stepValue + bias)));
      const stepProgress = index >= count - 1 ? 1 : Math.min(1, Math.max(0, stepValue - index));
      const next = { index, progress: raw, stepProgress };

      setState((current) =>
        current.index !== next.index || Math.abs(current.progress - next.progress) > 0.012 || Math.abs(current.stepProgress - next.stepProgress) > 0.012
          ? next
          : current,
      );
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [bias, count, ref]);

  return state;
}

function scrollToStep<T extends HTMLElement>(ref: { current: T | null }, index: number, count: number) {
  const node = ref.current;
  if (!node || count <= 1) return;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const sectionTop = window.scrollY + node.getBoundingClientRect().top;
  const head = Math.max(0, Number(node.dataset.scrollHeadVh ?? 0)) * viewportHeight;
  const tail = Math.max(0, Number(node.dataset.scrollTailVh ?? 0)) * viewportHeight;
  const scrollable = Math.max(1, node.offsetHeight - viewportHeight - head - tail);
  const target = sectionTop + head + (scrollable * index) / (count - 1);

  window.scrollTo({ top: target, behavior: "smooth" });
}

function ScrollComposeText({ text }: { text: string }) {
  let visibleIndex = 0;

  return (
    <span className="scroll-compose-text" aria-hidden="true">
      {text.split("\n").map((line, lineIndex) => (
        <span className="scroll-compose-line" key={`compose-line-${lineIndex}`}>
          <span className="scroll-compose-line__inner">
            {line.split(/(\s+)/).map((token, tokenIndex) => {
              if (/^\s+$/.test(token)) {
                return <span className="scroll-compose-space" key={`compose-space-${lineIndex}-${tokenIndex}`} aria-hidden="true" />;
              }

              return (
                <span className="scroll-compose-word" key={`compose-word-${lineIndex}-${tokenIndex}-${token}`}>
                  {token.split("").map((char, charIndex) => {
                    const currentIndex = visibleIndex;
                    visibleIndex += 1;

                    return (
                      <span
                        className="scroll-compose-char"
                        style={{ "--compose-index": currentIndex } as CSSProperties}
                        key={`compose-char-${lineIndex}-${tokenIndex}-${charIndex}-${char}`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </span>
  );
}

function AnimatedLineText({ text, className = "" }: { text: string; className?: string }) {
  let visibleIndex = 0;

  return (
    <span className={`line-reveal-text ${className}`.trim()} aria-label={text}>
      {text.split("\n").map((line, lineIndex) => (
        <span className="line-reveal-line" aria-hidden="true" key={`line-reveal-line-${lineIndex}`}>
          {Array.from(line).map((char, charIndex) => {
            const currentIndex = visibleIndex;
            visibleIndex += 1;

            return (
              <span
                className="line-reveal-char"
                style={
                  {
                    "--line-reveal-index": currentIndex,
                    "--line-reveal-delay": `${currentIndex * 18}ms`,
                  } as CSSProperties
                }
                key={`line-reveal-char-${lineIndex}-${charIndex}-${char}`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function HistoryAnimatedText({ text, className }: { text: string; className?: string }) {
  let wordIndex = 0;
  const tokens = text.split(/(\n|\s+)/);

  return (
    <span className={["history-animated-text", className].filter(Boolean).join(" ")} aria-label={text}>
      {tokens.map((token, tokenIndex) => {
        if (!token) return null;

        if (token === "\n") {
          return <br aria-hidden="true" key={`history-break-${tokenIndex}`} />;
        }

        if (/^\s+$/.test(token)) {
          return <span className="history-word history-word--space" aria-hidden="true" key={`history-space-${tokenIndex}`} />;
        }

        const currentIndex = wordIndex;
        wordIndex += 1;

        return (
          <span
            className="history-word"
            aria-hidden="true"
            style={{ "--history-word-index": currentIndex, "--history-word-delay": `${currentIndex * 42}ms` } as CSSProperties}
            key={`history-word-${token}-${tokenIndex}`}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
}

function HighlightMedia({ item, active, eager }: { item: Highlight; active: boolean; eager: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const playActiveVideo = () => {
    const video = videoRef.current;
    if (!video || !active || reduceMotion) return;
    void video.play().catch(() => undefined);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active || reduceMotion) {
      video.pause();
      return;
    }

    playActiveVideo();
  }, [active, reduceMotion]);

  if (!item.video || reduceMotion) {
    return <img className="highlight-image__media" src={item.image} alt="" loading={eager ? "eager" : "lazy"} />;
  }

  const videoType = item.video.endsWith(".webm") ? "video/webm" : "video/mp4";

  return (
    <video
      ref={videoRef}
      className="highlight-image__media"
      autoPlay={active}
      muted
      playsInline
      loop
      preload={active || eager ? "auto" : "metadata"}
      poster={item.image}
      aria-hidden="true"
      onCanPlay={playActiveVideo}
      onLoadedMetadata={playActiveVideo}
    >
      <source src={item.video} type={videoType} />
    </video>
  );
}

const highlightIntroHoldVh = 0.25;
const highlightEndHoldVh = 1.7;
const esgEndHoldVh = 0.75;

const logoIntroCopy: Record<LanguageCode, { wordmark: string; ariaLabel: string }> = {
  ko: { wordmark: "서울산업", ariaLabel: "서울산업 CI 인트로" },
  en: { wordmark: "Seoul Industry", ariaLabel: "Seoul Industry CI intro" },
  ja: { wordmark: "ソウル産業", ariaLabel: "ソウル産業 CIイントロ" },
};

function LogoIntro({ language }: { language: LanguageCode }) {
  const reduceMotion = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(reduceMotion);
  const [exiting, setExiting] = useState(false);
  const copy = logoIntroCopy[language] ?? logoIntroCopy.ko;

  useEffect(() => {
    if (reduceMotion || hidden) return;

    document.documentElement.classList.add("is-ci-intro-active");
    document.documentElement.classList.remove("is-ci-intro-revealed");

    const revealTimer = window.setTimeout(() => {
      setExiting(true);
      document.documentElement.classList.remove("is-ci-intro-active");
      document.documentElement.classList.add("is-ci-intro-revealed");
      window.dispatchEvent(new CustomEvent("seoulind-ci-intro-complete"));
    }, 3000);

    const hideTimer = window.setTimeout(() => {
      setHidden(true);
      document.documentElement.classList.remove("is-ci-intro-revealed");
    }, 3780);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.classList.remove("is-ci-intro-active", "is-ci-intro-revealed");
    };
  }, [hidden, reduceMotion]);

  if (hidden) return null;

  return (
    <section className={`ci-logo-intro ${exiting ? "is-exiting" : ""}`} aria-label={copy.ariaLabel} aria-hidden="true" data-language={language}>
      <div className="ci-logo-intro__brand">
        <SeoulIndustrySymbol className="ci-logo-intro__mark" animated role="img" ariaLabel="Seoul Industry symbol" />
        <strong className="ci-logo-intro__wordmark">{copy.wordmark}</strong>
      </div>
    </section>
  );
}

function HighlightSlider({
  highlights,
  buttonLabel,
  ariaLabel,
  itemAria,
}: {
  highlights: Highlight[];
  buttonLabel: string;
  ariaLabel: string;
  itemAria: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const visibleHighlights = highlights.filter((item) => item.id !== "development");
  const { index: active, stepProgress } = useScrollSteps(ref, visibleHighlights.length, motionConfig.highlight.scrollStepBias);
  const pointerStart = useRef<number | null>(null);
  const [sectionActive, setSectionActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.classList.add("is-copy-ready");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionActive((current) => (current === entry.isIntersecting ? current : entry.isIntersecting));
      },
      { rootMargin: "260px 0px 260px 0px", threshold: 0.04 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (visibleHighlights.length === 0) return null;

  const moveTo = (index: number) => {
    scrollToStep(ref, Math.min(visibleHighlights.length - 1, Math.max(0, index)), visibleHighlights.length);
  };

  return (
    <section
      className="highlight-section"
      id="brand"
      ref={ref}
      data-scene="pinned"
      data-scroll-head-vh={highlightIntroHoldVh}
      data-scroll-tail-vh={highlightEndHoldVh}
      style={
        {
          "--highlight-count": visibleHighlights.length,
          "--highlight-scroll-length": visibleHighlights.length + highlightIntroHoldVh + highlightEndHoldVh,
        } as CSSProperties
      }
    >
      <span className="highlight-bg-dim" aria-hidden="true" />
      <div className="highlight-stage">
        <div className="highlight-entry-visual" aria-hidden="true">
          <HighlightMedia item={visibleHighlights[0]} active={sectionActive && active === 0} eager={sectionActive} />
        </div>

        <div className="highlight-copy">
          {visibleHighlights.map((item, index) => (
            <article className={`highlight-copy__item ${index === active ? "is-active" : ""}`} key={item.title}>
              <span className="highlight-copy__index">{String(index + 1).padStart(2, "0")}</span>
              <h2>
                <AnimatedLineText text={item.title} className="line-reveal-text--headline" />
              </h2>
              <p>
                <AnimatedLineText text={item.copy} className="line-reveal-text--body" />
              </p>
              <a className="blue-button" href={`#/technology/${item.id}`}>
                {buttonLabel}
                <Icon name="plus" />
              </a>
            </article>
          ))}

          <div className="highlight-pagination" aria-label={ariaLabel}>
            {visibleHighlights.map((item, index) => (
              <button
                className={index === active ? "is-active" : ""}
                type="button"
                key={item.title}
                onClick={() => moveTo(index)}
                aria-label={`${index + 1} ${itemAria}`}
              >
                <span
                  style={
                    {
                      transform: `scaleX(${index < active ? 1 : index === active ? Math.max(stepProgress, 0.12) : 0})`,
                    } as CSSProperties
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div
          className="highlight-image-stack"
          onPointerDown={(event) => {
            pointerStart.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (pointerStart.current === null) return;
            const distance = event.clientX - pointerStart.current;
            pointerStart.current = null;
            if (Math.abs(distance) < 36) return;
            moveTo(active + (distance < 0 ? 1 : -1));
          }}
        >
          {visibleHighlights.map((item, index) => (
            <figure className={`highlight-image ${index === active ? "is-active" : ""} highlight-image--${item.visual}`} key={item.title}>
              <HighlightMedia item={item} active={sectionActive && index === active} eager={sectionActive && index === 0} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandMarquee({ text }: { text: string }) {
  const marqueeItems = Array.from({ length: 4 });

  return (
    <section className="brand-marquee" aria-label={text} data-reveal data-scene="marquee">
      <div className="brand-marquee__track" aria-hidden="true">
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <div className="brand-marquee__group" key={`marquee-group-${groupIndex}`}>
            {marqueeItems.map((_, index) => (
              <span className="brand-marquee__item" key={`marquee-item-${groupIndex}-${index}`}>
                <span className="brand-marquee__text">{text}</span>
                <BrainallLogo className="brand-marquee__logo" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function LatestLineupVideo({
  videos,
  active,
  eager,
  scrollVideoIndex = 0,
}: {
  videos: ShowcaseVideo[];
  active: boolean;
  eager: boolean;
  scrollVideoIndex?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const safeVideos = videos.length > 0 ? videos : [showcaseVideos.products[0]];
  const requestedVideoIndex = Math.min(safeVideos.length - 1, Math.max(0, scrollVideoIndex));
  const currentVideoIndex = ((videoIndex % safeVideos.length) + safeVideos.length) % safeVideos.length;
  const video = safeVideos[currentVideoIndex] ?? safeVideos[0];
  const playActiveVideo = () => {
    const node = videoRef.current;
    if (!node || !active || reduceMotion) return;
    void node.play().catch(() => undefined);
  };

  useEffect(() => {
    if (active) setVideoIndex(requestedVideoIndex);
  }, [active, requestedVideoIndex]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    if (!active || reduceMotion) {
      node.pause();
      return;
    }

    playActiveVideo();
  }, [active, reduceMotion, video.src]);

  const moveToNextVideo = () => {
    if (safeVideos.length <= 1) return;
    setVideoIndex((current) => (current + 1) % safeVideos.length);
  };

  if (reduceMotion) {
    return <img src={video.poster} alt="" loading={eager ? "eager" : "lazy"} />;
  }

  return (
    <>
      <video
        ref={videoRef}
        key={video.src}
        autoPlay={active}
        muted
        playsInline
        loop={safeVideos.length <= 1}
        preload={active || eager ? "auto" : "metadata"}
        poster={video.poster}
        aria-hidden="true"
        onCanPlay={playActiveVideo}
        onLoadedMetadata={playActiveVideo}
        onEnded={moveToNextVideo}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        <source src={video.src} type={video.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
      {safeVideos.length > 1 && (
        <div className="latest-lineup-clips" aria-hidden="true">
          <span>
            CLIP {String(currentVideoIndex + 1).padStart(2, "0")} / {String(safeVideos.length).padStart(2, "0")}
          </span>
          <div>
            {safeVideos.map((item, index) => (
              <i className={index === currentVideoIndex ? "is-active" : ""} key={`${item.src}-${index}`} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function LatestPartsSection({ copy, parts }: { copy: SiteContent["latest"]; parts: LatestPart[] }) {
  const [ref, inView] = useInView<HTMLElement>(0.04, "0px 0px -8% 0px");
  const partCount = parts.length;
  const titleText = copy.title;
  const videoLineups: ShowcaseVideo[][] = [
    [showcaseVideos.heroBackground, showcaseVideos.heroFocus, showcaseVideos.latest[4], showcaseVideos.products[5], showcaseVideos.latest[0]],
    [showcaseVideos.latest[3], showcaseVideos.latest[5], showcaseVideos.products[4]],
    [showcaseVideos.products[1], showcaseVideos.latest[1]],
    [showcaseVideos.latest[2], showcaseVideos.products[2]],
  ];
  const clipCounts = parts.map((_, index) => Math.max(1, videoLineups[index % videoLineups.length]?.length ?? 1));
  const productClipStarts = clipCounts.reduce<number[]>((starts, count, index) => {
    starts[index] = index === 0 ? 0 : (starts[index - 1] ?? 0) + (clipCounts[index - 1] ?? 1);
    return starts;
  }, []);
  const totalClipCount = Math.max(1, clipCounts.reduce((sum, count) => sum + count, 0));
  const scrollState = useScrollSteps(ref, totalClipCount, 0.004);
  const globalClipIndex = Math.min(totalClipCount - 1, Math.max(0, scrollState.index));
  let active = 0;
  let activeClipIndex = 0;
  let activeClipStart = 0;

  for (let index = 0; index < partCount; index += 1) {
    const start = productClipStarts[index] ?? 0;
    const count = clipCounts[index] ?? 1;
    if (globalClipIndex >= start && globalClipIndex < start + count) {
      active = index;
      activeClipIndex = globalClipIndex - start;
      activeClipStart = start;
      break;
    }
  }

  const activeClipCount = clipCounts[active] ?? 1;
  const stepValue = scrollState.progress * Math.max(1, totalClipCount - 1);
  const activePartProgress =
    activeClipCount <= 1 ? 0 : Math.min(1, Math.max(0, (stepValue - activeClipStart) / Math.max(1, activeClipCount - 1)));
  const activePart = parts[active] ?? parts[0];
  const progressPercent = totalClipCount > 1 ? Math.min(100, Math.max(0, scrollState.progress * 100)) : 100;

  if (partCount === 0) return null;

  const getStateClass = (index: number) => {
    const offset = index - active;
    if (offset === 0) return "is-active";
    if (offset === 1) return "is-next";
    if (offset === 2) return "is-next2";
    if (offset === -1) return "is-prev";
    if (offset === -2) return "is-prev2";
    return "is-hidden";
  };

  const scrollToProduct = (index: number) => {
    const target = Math.min(partCount - 1, Math.max(0, index));
    scrollToStep(ref, productClipStarts[target] ?? 0, totalClipCount);
  };

  const moveSlide = (direction: -1 | 1) => scrollToProduct(active + direction);

  return (
    <section
      className={`latest-parts ${inView ? "is-inview" : ""}`}
      id="lineup"
      data-scene="carousel"
      data-scroll-tail-vh="0.62"
      ref={ref}
      style={
        {
          "--latest-scroll-height": `${Math.max(totalClipCount, partCount, 1) * 48}svh`,
          "--latest-progress": `${progressPercent}%`,
          "--latest-step-progress": activePartProgress,
          "--active-accent": activePart?.accent ?? "#e9631a",
        } as CSSProperties
      }
    >
      <div className="latest-parts__inner">
        <div className="latest-parts__layout">
          <aside className="latest-parts__gallery" aria-label="Product lineup still images">
            <div className="latest-parts__head">
              <span>PRODUCT LINE UP</span>
              <h2 aria-label={copy.title.replace(/\n/g, " ")}>
                <ScrollComposeText text={titleText} />
              </h2>
            </div>

            <div className="latest-parts__controls" aria-label="Product lineup controls">
              <div className="latest-parts__progress" aria-hidden="true">
                <i style={{ width: `${progressPercent}%` }} />
              </div>
              <button className="latest-parts__nav latest-parts__nav--prev" type="button" onClick={() => moveSlide(-1)} aria-label="Previous product" disabled={active === 0}>
                <Icon name="arrow" />
              </button>
              <button className="latest-parts__nav" type="button" onClick={() => moveSlide(1)} aria-label="Next product" disabled={active === partCount - 1}>
                <Icon name="arrow" />
              </button>
            </div>

            <div className="latest-parts__image-board">
              <div className="latest-parts__image-grid" aria-hidden="true">
                {parts.map((part, index) => (
                  <button
                    className={`latest-lineup-thumb ${getStateClass(index)}`}
                    key={part.title}
                    type="button"
                    onClick={() => scrollToProduct(index)}
                    aria-label={part.title}
                    aria-pressed={index === active}
                    style={{ "--part-accent": part.accent, "--thumb-index": index } as CSSProperties}
                  >
                    <img src={part.image} alt="" loading="lazy" decoding="async" />
                    <span>{part.title}</span>
                  </button>
                ))}
              </div>

              <div className="latest-parts__gallery-meta">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <strong>{activePart.title}</strong>
              </div>
            </div>
          </aside>

          <div className="latest-parts__video-stage" aria-live="polite">
            <div className="latest-parts__stage-glow" aria-hidden="true" />
            <div className="latest-parts__video-stack">
              {parts.map((part, index) => {
                const videos = videoLineups[index % videoLineups.length] ?? [showcaseVideos.products[0]];

                return (
                  <article className={`latest-video-card ${getStateClass(index)}`} key={part.title} style={{ "--part-accent": part.accent } as CSSProperties}>
                    <div className="latest-video-card__media">
                      <LatestLineupVideo videos={videos} active={inView && index === active} eager={inView && index === active} scrollVideoIndex={index === active ? activeClipIndex : 0} />
                    </div>
                    <div className="latest-video-card__copy">
                      <span>{part.category}</span>
                      <strong>{part.title}</strong>
                      <p>{part.copy}</p>
                    </div>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatRollingValue(value: string, progress: number) {
  const match = value.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
  if (!match) return value;

  const [, prefix, numeric, suffix] = match;
  const normalized = numeric.replace(/,/g, "");
  const decimalPlaces = normalized.includes(".") ? normalized.split(".")[1].length : 0;
  const target = Number(normalized);

  if (!Number.isFinite(target)) return value;

  const eased = 1 - Math.pow(1 - progress, 2.2);
  const current = progress >= 0.995 ? target : target * eased;
  const formatted = decimalPlaces > 0 ? current.toFixed(decimalPlaces) : String(Math.round(current));

  return `${prefix}${formatted}${suffix}`;
}

function RollingStatNumber({ value, progress }: { value: string; progress: number }) {
  const displayValue = formatRollingValue(value, progress);

  return (
    <span className="rolling-number" aria-label={value}>
      {displayValue.split("").map((char, index) => {
        if (!/\d/.test(char)) {
          return (
            <span className="rolling-symbol" aria-hidden="true" key={`symbol-${index}`}>
              {char}
            </span>
          );
        }

        return (
          <span
            className="rolling-digit rolling-digit--reel"
            aria-hidden="true"
            key={`digit-${index}`}
            style={
              {
                "--digit": Number(char),
                "--roll-delay": `${Math.min(index * 18, 110)}ms`,
              } as CSSProperties
            }
          >
            <span className="rolling-digit__wheel">
              {Array.from({ length: 10 }).map((_, digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

function CountUpStat({ value, label, progress }: { value: string; label: string; progress: number }) {
  return (
    <article className="stat-card" data-reveal>
      <strong>
        <RollingStatNumber progress={progress} value={value} />
      </strong>
      <span>{label}</span>
    </article>
  );
}

type MenuCardCopy = {
  label: string;
  value: string;
  copy: string;
};

type MenuStepCopy = {
  eyebrow: string;
  title: string;
  copy: string;
};

type CorporateMenuCopy = {
  company: {
    eyebrow: string;
    english: string;
    title: string;
    lead: string;
    body: string;
    cards: MenuCardCopy[];
  };
  rnd: {
    eyebrow: string;
    english: string;
    title: string;
    lead: string;
    body: string;
    steps: MenuStepCopy[];
  };
  sustainability: {
    eyebrow: string;
    english: string;
    title: string;
    lead: string;
    body: string;
    cards: MenuStepCopy[];
  };
  support: {
    eyebrow: string;
    english: string;
    title: string;
    lead: string;
    body: string;
    links: Array<{ label: string; href: string; copy: string }>;
  };
};

const corporateMenuCopy: Record<LanguageCode, CorporateMenuCopy> = {
  ko: {
    company: {
      eyebrow: "ABOUT US",
      english: "Company",
      title: "정밀가공의 기준,\n서울산업",
      lead: "1985년부터 자동차 부품 OEM 제조 흐름을 한 기준 안에서 관리해 온 정밀가공 파트너입니다.",
      body: "개발 대응, 공정 안정화, 품질 확인, 납기 대응까지 고객사의 양산 계획과 같은 속도로 움직이며 반복 생산의 신뢰도를 높입니다.",
      cards: [
        { label: "설립", value: "1985", copy: "자동차 부품 정밀가공 기반 설립" },
        { label: "제품군", value: "5", copy: "BSM, EV, Steering, Powertrain, Driveline" },
        { label: "대응", value: "1", copy: "개발에서 양산까지 이어지는 제조 파트너" },
      ],
    },
    rnd: {
      eyebrow: "Research & Development",
      english: "R&D",
      title: "도면에서 양산 조건까지\n한 번에 연결하는 연구개발",
      lead: "고객 도면과 요구 조건을 공정 언어로 바꾸고, 시제품 제작과 검사 기준을 빠르게 연결합니다.",
      body: "기업부설 연구개발 흐름은 단순 설계 검토에 머물지 않고, 실제 가공 조건과 반복 생산 기준까지 이어지도록 구성했습니다.",
      steps: [
        { eyebrow: "01 / Drawing Review", title: "개발 대응", copy: "초기 도면, 변경 이력, 조립 조건을 정리해 양산 전 검증 기준을 먼저 세웁니다." },
        { eyebrow: "02 / Process Lock", title: "정밀가공 조건화", copy: "장비, 공구, 치수 관리 조건을 표준화해 반복 생산에서 흔들림을 줄입니다." },
        { eyebrow: "03 / Quality Feedback", title: "검사 데이터 연결", copy: "치수와 형상 데이터를 공정 기준으로 되돌려 다음 생산 조건을 보정합니다." },
      ],
    },
    sustainability: {
      eyebrow: "SUSTAINABILITY",
      english: "ESG",
      title: "지속가능한 제조를 위한\n서울산업의 책임",
      lead: "환경, 안전, 투명한 운영 기준을 제조 현장의 언어로 실행합니다.",
      body: "정밀가공 기업에게 지속가능성은 별도의 선언이 아니라 자원 사용, 작업 안전, 품질 기록을 매일 같은 기준으로 남기는 일입니다.",
      cards: [
        { eyebrow: "ENVIRONMENTAL", title: "환경과 함께하는 정밀가공", copy: "에너지 사용 절감, 공정 효율화, 환경 기준 준수를 제조 흐름 안에서 관리합니다." },
        { eyebrow: "SOCIAL", title: "안전한 제조 현장", copy: "작업자의 숙련도와 안전 기준을 기반으로 안정적인 품질 대응을 지속합니다." },
        { eyebrow: "GOVERNANCE", title: "투명한 기준과 기록", copy: "도면, 공정, 검사, 납기 정보를 한 기준 안에서 확인하고 기록합니다." },
      ],
    },
    support: {
      eyebrow: "COMMUNITY",
      english: "Customer Support",
      title: "고객지원",
      lead: "공지, 뉴스, 문의 흐름을 한 곳에서 확인할 수 있도록 정리했습니다.",
      body: "관리자에서 등록한 공지와 뉴스는 메인과 목록 페이지에 바로 반영되며, 고객 문의는 필요한 정보 중심으로 빠르게 이어지도록 구성했습니다.",
      links: [
        { label: "공지사항", href: "#/news", copy: "운영 공지와 주요 안내 확인" },
        { label: "News", href: "#media", copy: "서울산업 소식과 제조 업데이트" },
        { label: "관리자", href: "#/news/admin", copy: "게시글 등록 및 수정" },
      ],
    },
  },
  en: {
    company: {
      eyebrow: "ABOUT US",
      english: "Company",
      title: "Seoul Industry,\nBuilt on Precision",
      lead: "Since 1985, Seoul Industry has managed automotive OEM machining through one consistent manufacturing standard.",
      body: "From development through process control, inspection, and delivery, we move at the pace of our customers' production plans.",
      cards: [
        { label: "Founded", value: "1985", copy: "Precision machining base for automotive parts" },
        { label: "Product Groups", value: "5", copy: "BSM, EV, Steering, Powertrain, Driveline" },
        { label: "Flow", value: "1", copy: "One partner from development to production" },
      ],
    },
    rnd: {
      eyebrow: "Research & Development",
      english: "R&D",
      title: "Connecting drawings\nto production conditions",
      lead: "Customer drawings and requirements are converted into process language, prototypes, and inspection standards.",
      body: "The R&D flow is connected to real machining conditions and repeat-production criteria.",
      steps: [
        { eyebrow: "01 / Drawing Review", title: "Development Support", copy: "We lock in drawing revisions and assembly conditions before production sign-off." },
        { eyebrow: "02 / Process Lock", title: "Machining Conditions", copy: "Equipment, tools, and dimensional controls are standardized for repeat production." },
        { eyebrow: "03 / Quality Feedback", title: "Inspection Data", copy: "Dimensional and geometric data feed back into the next production condition." },
      ],
    },
    sustainability: {
      eyebrow: "SUSTAINABILITY",
      english: "ESG",
      title: "Responsible manufacturing\nfor sustainable OEM supply",
      lead: "Environmental care, safety, and transparent operations are handled in the language of the manufacturing floor.",
      body: "For a precision machining company, sustainability means recording resource use, workplace safety, and quality decisions every day.",
      cards: [
        { eyebrow: "ENVIRONMENTAL", title: "Responsible Machining", copy: "Energy use, process efficiency, and environmental standards are managed within the manufacturing flow." },
        { eyebrow: "SOCIAL", title: "Safe Workplace", copy: "Skilled operators and safety standards keep quality steady and reliable." },
        { eyebrow: "GOVERNANCE", title: "Transparent Records", copy: "Drawings, processes, inspection, and delivery are checked under one standard." },
      ],
    },
    support: {
      eyebrow: "COMMUNITY",
      english: "Customer Support",
      title: "Customer Support",
      lead: "Notices, news, and contact paths are organized in one place.",
      body: "Posts saved in the admin area are reflected on the main page and news list immediately.",
      links: [
        { label: "Notice", href: "#/news", copy: "Operational notices and announcements" },
        { label: "News", href: "#media", copy: "Seoul Industry updates" },
        { label: "Admin", href: "#/news/admin", copy: "Create and edit posts" },
      ],
    },
  },
  ja: {
    company: {
      eyebrow: "ABOUT US",
      english: "Company",
      title: "精密加工を基盤にした\nソウル産業",
      lead: "1985年から、自動車部品OEMの加工フローを一貫した製造基準で管理してきました。",
      body: "開発対応、工程安定化、検査、納期対応まで、顧客の量産計画と同じ速度で動き、反復生産の信頼性を高めます。",
      cards: [
        { label: "設立", value: "1985", copy: "自動車部品の精密加工を基盤に設立" },
        { label: "製品群", value: "5", copy: "BSM, EV, Steering, Powertrain, Driveline" },
        { label: "対応", value: "1", copy: "開発から量産までつながる製造パートナー" },
      ],
    },
    rnd: {
      eyebrow: "Research & Development",
      english: "R&D",
      title: "図面から量産条件まで\n一つにつなぐ研究開発",
      lead: "顧客図面と要求条件を工程の言葉に置き換え、試作品と検査基準へすばやくつなぎます。",
      body: "企業付設研究所の流れは設計検討だけで終わらず、実際の加工条件と反復生産基準までつながるよう構成しています。",
      steps: [
        { eyebrow: "01 / Drawing Review", title: "開発対応", copy: "初期図面、変更履歴、組立条件を整理し、量産前の検証基準を先に立てます。" },
        { eyebrow: "02 / Process Lock", title: "加工条件化", copy: "設備、工具、寸法管理条件を標準化し、反復生産でのばらつきを抑えます。" },
        { eyebrow: "03 / Quality Feedback", title: "検査データ連携", copy: "寸法と形状データを工程基準へ戻し、次の生産条件を補正します。" },
      ],
    },
    sustainability: {
      eyebrow: "SUSTAINABILITY",
      english: "ESG",
      title: "持続可能な製造に向けた\nソウル産業の責任",
      lead: "環境、安全、透明な運営基準を製造現場の言葉で実行します。",
      body: "精密加工企業にとって持続可能性とは、資源使用、作業安全、品質記録を毎日同じ基準で残すことです。",
      cards: [
        { eyebrow: "ENVIRONMENTAL", title: "環境とともに進む精密加工", copy: "エネルギー使用の削減、工程効率化、環境基準の遵守を製造フローの中で管理します。" },
        { eyebrow: "SOCIAL", title: "安全な製造現場", copy: "作業者の熟練度と安全基準を基盤に、安定した品質対応を続けます。" },
        { eyebrow: "GOVERNANCE", title: "透明な基準と記録", copy: "図面、工程、検査、納期情報を一つの基準で確認し記録します。" },
      ],
    },
    support: {
      eyebrow: "COMMUNITY",
      english: "Customer Support",
      title: "カスタマーサポート",
      lead: "お知らせ、ニュース、問い合わせの流れを一か所で確認できるよう整理しました。",
      body: "管理画面で保存したお知らせとニュースは、メインページとニュース一覧にすぐ反映されます。",
      links: [
        { label: "お知らせ", href: "#/news", copy: "運営案内と主要なお知らせを確認" },
        { label: "News", href: "#media", copy: "ソウル産業のニュースと製造アップデート" },
        { label: "管理者", href: "#/news/admin", copy: "投稿の登録と修正" },
      ],
    },
  },
};

const dataStatOverrides: Record<LanguageCode, Partial<GlobalAchievement>[]> = {
  ko: [
    {},
    { value: "47" },
    {},
    { value: "300,000+", label: "월간 양산 부품 수" },
    { value: "30+", label: "개발부터 양산까지 이어 온 누적 파트너십" },
  ],
  en: [
    {},
    { value: "47" },
    {},
    { value: "300,000+", label: "Parts shipped per month" },
    { value: "30+", label: "Partnerships from development to production" },
  ],
  ja: [
    {},
    { value: "47" },
    {},
    { value: "300,000+", label: "月間の量産部品数" },
    { value: "30+", label: "開発から量産まで続く累積パートナーシップ" },
  ],
};

type DataCapabilityItem = {
  index: string;
  title: string;
  copy: string;
};

const dataCapabilityPanel: Record<LanguageCode, { label: string; flow: string; items: DataCapabilityItem[] }> = {
  ko: {
    label: "MANUFACTURING BASE",
    flow: "도면 검토 / 공정 세팅 / 품질 확인 / 양산 공급",
    items: [
      { index: "01", title: "개발 대응", copy: "도면 조건과 고객 요구사항을 먼저 정리해 양산 전 기준을 고정합니다." },
      { index: "02", title: "공정 안정화", copy: "가공 조건, 검사 기준, 설비 이력을 연결해 반복 생산의 흔들림을 줄입니다." },
      { index: "03", title: "양산 공급", copy: "납기, 포장, 출하 흐름을 고객 생산 계획에 맞춰 관리합니다." },
    ],
  },
  en: {
    label: "MANUFACTURING BASE",
    flow: "Drawing Review / Process Lock / Quality Check / Mass Production",
    items: [
      { index: "01", title: "Development Response", copy: "We align drawing conditions and customer requirements before mass production." },
      { index: "02", title: "Process Stability", copy: "Machining conditions, inspection standards, and equipment history are managed together." },
      { index: "03", title: "Mass Supply", copy: "Delivery, packaging, and shipment flow follow each customer's production plan." },
    ],
  },
  ja: {
    label: "MANUFACTURING BASE",
    flow: "図面検討 / 工程設定 / 品質確認 / 量産供給",
    items: [
      { index: "01", title: "開発対応", copy: "図面条件と顧客要求を先に整理し、量産前の基準を固定します。" },
      { index: "02", title: "工程安定化", copy: "加工条件、検査基準、設備履歴をつなげて反復生産のぶれを抑えます。" },
      { index: "03", title: "量産供給", copy: "納期、梱包、出荷の流れを顧客の生産計画に合わせて管理します。" },
    ],
  },
};

function DataSection({ copy, stats, language }: { copy: SiteContent["dataHeading"]; stats: GlobalAchievement[]; language: LanguageCode }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);
  const displayStats = stats.map((stat, index) => ({ ...stat, ...(dataStatOverrides[language]?.[index] ?? {}) }));
  const capability = dataCapabilityPanel[language];
  const titleText = language === "ja" ? copy.title.replace("を軸にした", "を軸にした\n") : copy.title;

  return (
    <section className="data-section" id="data" ref={ref} data-scene="metrics" data-language={language}>
      <div className="data-section__copy" data-reveal>
        <h2 aria-label={copy.title}>
          <ScrollComposeText text={titleText} />
        </h2>
        <p>{copy.copy}</p>
        <div className="data-section__capability" aria-label={capability.label}>
          <span className="data-section__capability-label">{capability.label}</span>
          <strong>{capability.flow}</strong>
          <div>
            {capability.items.map((item) => (
              <article key={item.index}>
                <b>{item.index}</b>
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="data-orbit" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="stats-grid">
        {displayStats.map((stat) => (
          <CountUpStat progress={progress} key={`${stat.value}-${stat.label}`} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}

function HistorySection({ copy, eras, language }: { copy: SiteContent["historyHeading"]; eras: HistoryEra[]; language: LanguageCode }) {
  const [ref, inView] = useInView<HTMLElement>(0.12, "0px 0px -18% 0px");
  const chronologicalEras = [...eras].sort((a, b) => getEraStartYear(a.period) - getEraStartYear(b.period));
  const titleText = language === "ja" ? copy.title.replace("製造基盤", "製造基盤\n") : copy.title;

  return (
    <section className={`history-section${inView ? " is-inview" : ""}`} id="history" data-scene="timeline" data-language={language} ref={ref}>
      <div className="history-section__inner">
        <div className="history-section__intro">
          <span>{copy.eyebrow}</span>
          <strong>
            <HistoryAnimatedText text={copy.since} className="history-animated-text--since" />
          </strong>
          <h2>
            <HistoryAnimatedText text={titleText} />
          </h2>
          <p>{copy.copy}</p>
        </div>

        <div className="history-timeline">
          {chronologicalEras.map((era, index) => (
            <HistoryEraRow era={era} index={index} key={era.period} />
          ))}
        </div>
      </div>
    </section>
  );
}

function getEraStartYear(period: string) {
  return Number(period.match(/\d{4}/)?.[0] ?? 0);
}

function HistoryEraRow({ era, index }: { era: HistoryEra; index: number }) {
  const [ref, inView] = useInView<HTMLElement>(0.28, "0px 0px -34% 0px");

  return (
    <article
      className={`history-era${inView ? " is-visible" : ""}`}
      ref={ref}
      style={{ "--history-era-index": index } as CSSProperties}
    >
      <div className="history-era__marker">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="history-era__head">
        <time>
          <HistoryAnimatedText text={era.period} />
        </time>
        <h3>
          <HistoryAnimatedText text={era.title} />
        </h3>
        <p>{era.summary}</p>
      </div>
      <div className="history-era__body">
        <ul>
          {era.items.map((item, itemIndex) => (
            <li
              style={{ "--history-item-index": itemIndex, "--history-item-delay": `${220 + itemIndex * 64}ms` } as CSSProperties}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="history-era__partners" aria-label={`${era.period} partners and milestones`}>
          {era.partners.map((partner, partnerIndex) => (
            <b
              style={
                { "--history-partner-index": partnerIndex, "--history-partner-delay": `${340 + partnerIndex * 48}ms` } as CSSProperties
              }
              key={partner}
            >
              {partner}
            </b>
          ))}
        </div>
      </div>
    </article>
  );
}

const partnerHomepageByMark: Record<string, string> = {
  DAUCH: "https://www.dauch.com/",
  SPARTAN: "https://spartanlmp.com/",
  TRW: "https://aftermarket.zf.com/en/aftermarket-portal/our-brands/trw/",
  MOBIS: "https://www.mobis.com/",
  NEXTEER: "https://www.nexteer.com/",
  KDAC: "https://www.hansaemobility.com/",
  GKN: "https://www.gknautomotive.com/",
  MPT: "https://www.munciepower.com/",
  MAGNA: "https://www.magna.com/",
};

function getPartnerHomepage(partner: Pick<PartnerLogo, "mark" | "name">) {
  const mark = partner.mark.toUpperCase();
  const name = partner.name.toUpperCase();
  const key = Object.keys(partnerHomepageByMark).find((candidate) => mark.includes(candidate) || name.includes(candidate));
  return key ? partnerHomepageByMark[key] : undefined;
}

function PartnerRows({ partners }: { partners: PartnerLogo[] }) {
  const row = [...partners, ...partners];
  return (
    <div className="partner-rail">
      <div className="partner-rail__track">
        {row.map((partner, index) => (
          <a className="partner-logo" href={getPartnerHomepage(partner)} target="_blank" rel="noreferrer" key={`${partner.name}-${index}`} aria-label={`${partner.name} 홈페이지 새 창으로 열기`}>
            {partner.logoSrc ? (
              <img className="partner-logo__image" src={partner.logoSrc} alt={partner.name} loading="lazy" />
            ) : (
              <strong>{partner.mark}</strong>
            )}
            <small>{partner.role}</small>
          </a>
        ))}
      </div>
    </div>
  );
}

function GlobalInViewVideo() {
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLVideoElement>(0.18, "380px 0px 380px 0px");

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (inView && !reduceMotion) {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [inView, reduceMotion, ref]);

  if (reduceMotion) {
    return <img src={globalVideo.poster} alt="" loading="lazy" />;
  }

  return (
    <video ref={ref} muted playsInline loop preload="metadata" poster={globalVideo.poster}>
      <source src={globalVideo.webm} type="video/webm" />
      <source src={globalVideo.mov} type="video/quicktime" />
    </video>
  );
}

function GlobalSection({ copy, partners, language }: { copy: SiteContent["global"]; partners: PartnerLogo[]; language: LanguageCode }) {
  return (
    <section className="global-section" id="partners" data-scene="network" data-language={language}>
      <div className="global-section__copy">
        <p>{copy.copy}</p>
        <h2 className="global-fill-line">
          {copy.lines.map((line) => (
            <span className="fill-line" key={line}>
              {line}
            </span>
          ))}
        </h2>
      </div>
      <div className="global-video-wrap" aria-hidden="true">
        <GlobalInViewVideo />
      </div>
      <strong className="global-year">2026</strong>
      <h3>{copy.networkTitle}</h3>
      <PartnerRows partners={partners} />
    </section>
  );
}

const governanceAccent = "#b85a24";

function getEsgAccent(item?: Pick<EsgPillar, "keyword" | "accent">) {
  if (!item) return "#e9631a";
  return item.keyword === "GOVERNANCE" ? governanceAccent : item.accent;
}

function EsgSection({ copy, pillars }: { copy: SiteContent["esgHeading"]; pillars: EsgPillar[] }) {
  const ref = useRef<HTMLElement>(null);
  const scrollState = useScrollSteps(ref, Math.max(2, pillars.length + 1), 0.0001);
  const active = Math.min(pillars.length - 1, Math.max(0, scrollState.index));
  const stepProgress = scrollState.index >= pillars.length ? 1 : scrollState.stepProgress;
  const activeItem = pillars[active] ?? pillars[0];
  const entryItem = pillars[0];
  const activeAccent = getEsgAccent(activeItem);
  const entryAccent = getEsgAccent(entryItem);
  const activeStepProgress = stepProgress;
  const esgProgress = pillars.length <= 1 ? 1 : scrollState.progress;
  const titleText = copy.title.replace("지속가능한 제조를 위한 서울산업의 책임", "지속가능한 제조를 위한\n서울산업의 책임");

  return (
    <section
      className="esg-section"
      id="esg-management"
      ref={ref}
      data-scene="esg"
      data-scroll-tail-vh={esgEndHoldVh}
      style={
        {
          "--esg-count": pillars.length,
          "--esg-scroll-length": pillars.length + 1 + esgEndHoldVh,
          "--esg-progress": `${esgProgress * 100}%`,
          "--esg-progress-ratio": esgProgress,
          "--esg-bg-shift": `${(esgProgress - 0.5) * 46}px`,
          "--esg-step-progress": activeStepProgress,
          "--pillar-accent": activeAccent,
        } as CSSProperties
      }
    >
      <div className="esg-sticky">
        {entryItem && (
          <div className="esg-entry-visual" aria-hidden="true" style={{ "--pillar-accent": entryAccent } as CSSProperties}>
            <img src={entryItem.image} alt="" loading="eager" />
            <span className="esg-entry-visual__shade" />
            <div className="esg-entry-visual__copy">
              <span>{entryItem.eyebrow}</span>
              <strong>{entryItem.keyword}</strong>
            </div>
          </div>
        )}

        <div className="esg-topline" data-reveal>
          <span>{copy.eyebrow}</span>
        </div>

        <div className="esg-layout">
          <div className="esg-copy">
            <h2 aria-label={titleText.replace(/\n/g, " ")}>
              <ScrollComposeText text={titleText} />
            </h2>
            <div className="esg-keywords" aria-label={copy.title}>
              <strong className="esg-keyword is-active" key={activeItem.keyword} style={{ "--pillar-accent": activeAccent } as CSSProperties}>
                {activeItem.keyword}
              </strong>
            </div>
            <div className="esg-detail" key={activeItem.keyword} style={{ "--esg-step-progress": activeStepProgress } as CSSProperties}>
              <strong>{activeItem.title}</strong>
              <ul>
                {activeItem.bullets.map((bullet, bulletIndex) => {
                  const bulletProgress = clamp01((activeStepProgress - bulletIndex * 0.1) / 0.44);

                  return (
                    <li
                      key={bullet}
                      style={
                        {
                          "--bullet-opacity": 0.56 + bulletProgress * 0.44,
                          "--bullet-y": `${(1 - bulletProgress) * 7}px`,
                        } as CSSProperties
                      }
                    >
                      {bullet}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="esg-card-stage" aria-live="polite">
            {pillars.map((item, index) => {
              const itemAccent = getEsgAccent(item);
              const isCurrent = index === active;
              const isFinalActive = active >= pillars.length - 1;
              const finalSettleProgress = isFinalActive ? stepProgress : 1;
              const offset = isFinalActive ? index - active + (1 - finalSettleProgress) : index - active - stepProgress;
              const boundedOffset = Math.max(-1.16, Math.min(1.16, offset));
              const distance = Math.abs(boundedOffset);
              const currentEntrance = isCurrent && isFinalActive ? finalSettleProgress : 1;
              const cardCopyProgress = isCurrent && isFinalActive ? clamp01((finalSettleProgress - 0.18) / 0.52) : isCurrent ? 1 : 0;
              const cardOpacity = isCurrent ? 0.68 + currentEntrance * 0.32 : Math.max(0.14, 0.42 - distance * 0.16);
              const cardScale = isCurrent ? 1 - Math.min(distance * 0.026, 0.035) : 0.96 - Math.min(distance * 0.014, 0.018);
              const cardImageScale = 1.04 + Math.min(distance * 0.018, 0.032);

              return (
                <article
                  className={`esg-card ${isCurrent ? "is-active" : ""}`}
                  key={item.keyword}
                  aria-hidden={!isCurrent}
                  style={
                    {
                      "--pillar-accent": itemAccent,
                      "--card-x": `${boundedOffset * 16}px`,
                      "--card-y": `${boundedOffset * 58}px`,
                      "--card-rotate": `${boundedOffset * -1.6}deg`,
                      "--card-scale": cardScale,
                      "--card-image-scale": cardImageScale,
                      "--card-opacity": cardOpacity,
                      "--card-copy-opacity": cardCopyProgress,
                      "--card-copy-y": `${isCurrent ? distance * 8 + (1 - cardCopyProgress) * 16 : 18}px`,
                      "--card-z": isCurrent ? 40 : Math.max(1, Math.round(22 - distance * 8)),
                    } as CSSProperties
                  }
                >
                  <img src={item.image} alt="" loading={index <= 1 ? "eager" : "lazy"} />
                  <span className="esg-card__shade" aria-hidden="true" />
                  <div className="esg-card__copy">
                    <span>{item.eyebrow}</span>
                    <strong>{item.keyword}</strong>
                    <p>{item.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="esg-progress" aria-hidden="true">
          <span />
          <div className="esg-progress__markers">
            {pillars.map((item, index) => (
              <i className={index <= active ? "is-passed" : ""} key={item.keyword} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaSection({ copy, items }: { copy: SiteContent["mediaHeading"]; items: Array<MediaItem & { id?: string }> }) {
  const listRef = useRef<HTMLDivElement>(null);
  const scrollCards = (direction: -1 | 1) => {
    const node = listRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <section className="media-section" id="media" data-scene="list">
      <div className="media-section__head" data-reveal>
        <div>
          <h2 aria-label={copy.title}>
            <ScrollComposeText text={copy.title} />
          </h2>
        </div>
        <div className="media-section__controls" aria-label="News controls">
          <button type="button" onClick={() => scrollCards(-1)} aria-label="Previous news">
            <Icon name="arrow" />
          </button>
          <button type="button" onClick={() => scrollCards(1)} aria-label="Next news">
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div className="media-list" ref={listRef}>
        {items.map((item) => (
          <a className="media-row" data-reveal href={item.id ? `#/news/${item.id}` : "#/news"} key={`${item.date}-${item.title}`}>
            <div className="media-row__top">
              <span>{item.kicker ?? "NEWS"}</span>
              <b>{item.type}</b>
            </div>
            <div className="media-row__body">
              <strong>{item.title}</strong>
              <time>{item.date.replaceAll("-", ".")}.</time>
            </div>
            <figure className={item.image ? undefined : "is-logo"}>
              {item.image ? <img src={item.image} alt="" loading="lazy" /> : <BrainallLogo className="news-logo-placeholder" />}
            </figure>
          </a>
        ))}
      </div>
      <a className="media-section__view" href="#/news">
        View
        <Icon name="arrow" />
      </a>
    </section>
  );
}

const footerDetails: Record<
  LanguageCode,
  {
    eyebrow: string;
    statement: string;
    inquiryLabel: string;
    phone: string;
    hours: string;
    quickTitle: string;
    quickLinks: Array<{ label: string; href: string }>;
    infoTitle: string;
    infoRows: Array<{ label: string; value: string }>;
    familyTitle: string;
    familyLinks: Array<{ label: string; href: string }>;
    policyLinks: Array<{ label: string; href: string }>;
    chips: string[];
  }
> = {
  ko: {
    eyebrow: "SEOUL INDUSTRY",
    statement: "도면 검토부터 양산 공급까지, 서울산업이 자동차 부품 OEM 생산을 끝까지 책임집니다.",
    inquiryLabel: "OEM 개발 및 양산 문의",
    phone: "031-366-1141",
    hours: "평일 08:30 - 17:30",
    quickTitle: "바로가기",
    quickLinks: [
      { label: "제조 기반", href: "#solution" },
      { label: "제품 라인업", href: "#lineup" },
      { label: "ESG 기준", href: "#esg-management" },
    ],
    infoTitle: "회사 정보",
    infoRows: [
      { label: "본사/공장", value: "경기도 화성시, Korea" },
      { label: "대표번호", value: "031-366-1141" },
      { label: "주요 분야", value: "자동차 부품 정밀가공 · OEM 양산 공급" },
    ],
    familyTitle: "Family Site",
    familyLinks: [
      { label: "Manufacturing Flow", href: "#solution" },
      { label: "OEM Network", href: "#partners" },
      { label: "Newsroom", href: "#/news" },
    ],
    policyLinks: [
      { label: "공지사항", href: "#/news" },
      { label: "개인정보처리방침", href: "#media" },
      { label: "윤리경영", href: "#esg-management" },
    ],
    chips: ["SINCE 1985", "IATF / ISO", "300,000+ PARTS / MONTH"],
  },
  en: {
    eyebrow: "SEOUL INDUSTRY",
    statement: "From the first drawing to full production, Seoul Industry stands behind every OEM part it ships.",
    inquiryLabel: "OEM development and production inquiry",
    phone: "+82-31-366-1141",
    hours: "Weekdays 08:30 - 17:30 KST",
    quickTitle: "Navigate",
    quickLinks: [
      { label: "Manufacturing", href: "#solution" },
      { label: "Products", href: "#lineup" },
      { label: "ESG Standards", href: "#esg-management" },
    ],
    infoTitle: "Company",
    infoRows: [
      { label: "Base", value: "Hwaseong, Gyeonggi-do, Korea" },
      { label: "Tel", value: "+82-31-366-1141" },
      { label: "Focus", value: "Automotive precision machining · OEM supply" },
    ],
    familyTitle: "Family Site",
    familyLinks: [
      { label: "Manufacturing Flow", href: "#solution" },
      { label: "OEM Network", href: "#partners" },
      { label: "Newsroom", href: "#/news" },
    ],
    policyLinks: [
      { label: "Notice", href: "#/news" },
      { label: "Privacy Policy", href: "#media" },
      { label: "Ethics", href: "#esg-management" },
    ],
    chips: ["SINCE 1985", "IATF / ISO", "300,000+ PARTS / MONTH"],
  },
  ja: {
    eyebrow: "SEOUL INDUSTRY",
    statement: "図面の検討から量産供給まで。ソウル産業は、自動車部品OEMの品質を最後まで造り込みます。",
    inquiryLabel: "OEM開発・量産のお問い合わせ",
    phone: "+82-31-366-1141",
    hours: "平日 08:30 - 17:30 KST",
    quickTitle: "クイックリンク",
    quickLinks: [
      { label: "製造基盤", href: "#solution" },
      { label: "製品ラインアップ", href: "#lineup" },
      { label: "ESG基準", href: "#esg-management" },
    ],
    infoTitle: "会社情報",
    infoRows: [
      { label: "拠点", value: "京畿道華城市, Korea" },
      { label: "TEL", value: "+82-31-366-1141" },
      { label: "主要分野", value: "自動車部品精密加工 · OEM量産供給" },
    ],
    familyTitle: "Family Site",
    familyLinks: [
      { label: "Manufacturing Flow", href: "#solution" },
      { label: "OEM Network", href: "#partners" },
      { label: "Newsroom", href: "#/news" },
    ],
    policyLinks: [
      { label: "お知らせ", href: "#/news" },
      { label: "個人情報保護方針", href: "#media" },
      { label: "倫理経営", href: "#esg-management" },
    ],
    chips: ["SINCE 1985", "IATF / ISO", "300,000+ PARTS / MONTH"],
  },
};

function Footer({ copy, language }: { copy: SiteContent["footer"]; language: LanguageCode }) {
  const details = footerDetails[language] ?? footerDetails.ko;

  return (
    <footer className="brainall-footer">
      <div className="brainall-footer__main">
        <div className="brainall-footer__brand">
          <BrainallLogo />
          <span>{details.eyebrow}</span>
          <p>{details.statement}</p>
          <div className="brainall-footer__chips" aria-label={copy.tagline}>
            {details.chips.map((chip) => (
              <b key={chip}>{chip}</b>
            ))}
          </div>
        </div>

        <div className="brainall-footer__inquiry">
          <span>{details.inquiryLabel}</span>
          <a href={`tel:${details.phone.replace(/[^+\d]/g, "")}`}>{details.phone}</a>
          <p>{details.hours}</p>
        </div>
      </div>

      <div className="brainall-footer__grid">
        <nav className="brainall-footer__nav" aria-label={details.quickTitle}>
          <strong>{details.quickTitle}</strong>
          {details.quickLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="brainall-footer__info">
          <strong>{details.infoTitle}</strong>
          <dl>
            {details.infoRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <details className="brainall-footer__family">
          <summary>{details.familyTitle}</summary>
          <div>
            {details.familyLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </div>
        </details>
      </div>

      <div className="brainall-footer__bottom">
        <span>{copy.address}</span>
        <nav aria-label="Footer policy">
          {details.policyLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <p>©2026 SEOUL INDUSTRY. ALL RIGHTS RESERVED.</p>
        <a className="brainall-footer__top" href="#" aria-label="Back to top">
          <Icon name="up" />
        </a>
      </div>
    </footer>
  );
}

export default function BrainallPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const stored = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(stored) ? stored : defaultLanguage;
  });
  const content = siteContent[language];
  const latestLineup = latestProductLineup[language] ?? latestProductLineup.ko;
  const [noticePosts, setNoticePosts] = useState(() => getNoticePosts());
  const mediaItems = noticePostsToMediaItems(noticePosts, language).slice(0, 5);

  useLenisScroll(!reduceMotion);

  useEffect(() => {
    const option = languages.find((item) => item.code === language);
    document.documentElement.lang = option?.htmlLang ?? language;
    window.localStorage.setItem("seoulind-language", language);
  }, [language]);

  useEffect(() => {
    const syncNoticePosts = () => setNoticePosts(getNoticePosts());

    window.addEventListener("storage", syncNoticePosts);
    window.addEventListener("seoulind-notices-updated", syncNoticePosts);

    return () => {
      window.removeEventListener("storage", syncNoticePosts);
      window.removeEventListener("seoulind-notices-updated", syncNoticePosts);
    };
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const early = window.setTimeout(refresh, 300);
    const afterMedia = window.setTimeout(refresh, 1400);
    const media = Array.from(rootRef.current?.querySelectorAll("img, video") ?? []);

    window.addEventListener("load", refresh);
    media.forEach((item) => {
      item.addEventListener("load", refresh);
      item.addEventListener("loadedmetadata", refresh);
    });
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.clearTimeout(early);
      window.clearTimeout(afterMedia);
      window.removeEventListener("load", refresh);
      media.forEach((item) => {
        item.removeEventListener("load", refresh);
        item.removeEventListener("loadedmetadata", refresh);
      });
    };
  }, [language]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.set(".global-fill-line .fill-line", { backgroundSize: "0% 100%" });

      gsap.to(".highlight-bg-dim", {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".highlight-section", start: "top center", end: "top top", scrub: true },
      });

      gsap.to(".highlight-copy", {
        color: "#fff2e5",
        ease: "none",
        scrollTrigger: { trigger: ".highlight-section", start: "top center", end: "top top", scrub: true },
      });

      const highlightSection = root.querySelector<HTMLElement>(".highlight-section");
      highlightSection?.classList.add("is-copy-ready");

      gsap.set(".highlight-entry-visual", {
        autoAlpha: 0,
        clipPath: "inset(0px 0px 0px 0px round 0px)",
        filter: "blur(0px)",
        scale: 1,
      });
      gsap.set(".highlight-copy", { autoAlpha: 1, x: 0, filter: "blur(0px)" });
      gsap.set(".highlight-image-stack", { autoAlpha: 1, x: 0, scale: 1, filter: "blur(0px)" });

      gsap.fromTo(
        ".highlight-stage",
        { autoAlpha: 0, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".highlight-section",
            start: "top 94%",
            end: "top 58%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".scroll-compose-text").forEach((block) => {
        const chars = gsap.utils.toArray<HTMLElement>(block.querySelectorAll(".scroll-compose-char"));
        if (!chars.length) return;

        const trigger = block.closest<HTMLElement>("[data-scene]") ?? block;

        gsap.fromTo(
          block,
          { scale: 1.025, xPercent: -0.5 },
          {
            scale: 1,
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "top 35%",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          chars,
          { autoAlpha: 0, y: 0, yPercent: 72, rotateX: -8 },
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            rotateX: 0,
            stagger: { each: 0.012, from: "start" },
            ease: "power3.out",
            scrollTrigger: {
              trigger,
              start: "top 88%",
              end: "top 40%",
              scrub: 0.85,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: motionConfig.reveal.y },
          {
            autoAlpha: 1,
            y: 0,
            duration: motionConfig.reveal.duration,
            ease: motionConfig.reveal.ease,
            scrollTrigger: {
              trigger: el,
              start: motionConfig.reveal.start,
              end: motionConfig.reveal.end,
              scrub: motionConfig.reveal.scrub,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".latest-parts").forEach((section) => {
        const gallery = section.querySelector<HTMLElement>(".latest-parts__gallery");
        const board = section.querySelector<HTMLElement>(".latest-parts__image-board");
        const controls = section.querySelector<HTMLElement>(".latest-parts__controls");
        const stage = section.querySelector<HTMLElement>(".latest-parts__video-stage");
        const stack = section.querySelector<HTMLElement>(".latest-parts__video-stack");
        const glow = section.querySelector<HTMLElement>(".latest-parts__stage-glow");

        if (board) {
          gsap.fromTo(
            board,
            {
              clipPath: "inset(0 100% 0 0)",
              x: -48,
              filter: "blur(16px) saturate(0.62)",
            },
            {
              clipPath: "inset(0 0% 0 0)",
              x: 0,
              filter: "blur(0px) saturate(1)",
              duration: 1.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }

        if (stack) {
          gsap.fromTo(
            stack,
            {
              clipPath: "inset(0 0 0 100%)",
              x: 78,
              rotateY: -6,
              filter: "blur(16px) saturate(0.68)",
            },
            {
              clipPath: "inset(0 0 0 0%)",
              x: 0,
              rotateY: 0,
              filter: "blur(0px) saturate(1)",
              duration: 1.12,
              ease: "expo.out",
              scrollTrigger: {
                trigger: section,
                start: "top 66%",
                once: true,
              },
            },
          );
        }

        if (controls) {
          gsap.fromTo(
            controls,
            { autoAlpha: 0, x: -24, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            },
          );
        }

        if (glow) {
          gsap.fromTo(
            glow,
            { autoAlpha: 0, scale: 0.52 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.18,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 66%",
                once: true,
              },
            },
          );
        }

        if (gallery && stage) {
          gsap.to(gallery, {
            y: 34,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(stage, {
            y: -44,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      gsap.utils
        .toArray<HTMLElement>(".global-section__copy")
        .forEach((target) => {
          const trigger = target.closest<HTMLElement>("[data-scene]") ?? target;
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: motionConfig.scene.y },
            {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top 128%",
                end: "top 98%",
                scrub: true,
              },
            },
          );
        });

      gsap.utils.toArray<HTMLElement>(".global-video-wrap, .data-orbit").forEach((target) => {
        const trigger = target.closest<HTMLElement>("[data-scene]") ?? target;
        gsap.to(target, {
          y: motionConfig.scene.parallaxY,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".media-row",
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: motionConfig.scene.stagger,
          ease: "none",
          scrollTrigger: {
            trigger: ".media-list",
            start: "top 110%",
            end: "top 78%",
            scrub: true,
          },
        },
      );

      mm.add("(min-width: 861px)", () => {
        const esgSection = root.querySelector<HTMLElement>(".esg-section");
        const esgSticky = root.querySelector<HTMLElement>(".esg-sticky");
        const esgEntry = root.querySelector<HTMLElement>(".esg-entry-visual");
        const esgEntryImage = root.querySelector<HTMLElement>(".esg-entry-visual img");
        const esgEntryCopy = root.querySelector<HTMLElement>(".esg-entry-visual__copy");
        const esgTargetCard = root.querySelector<HTMLElement>(".esg-card-stage .esg-card:first-child");

        if (esgSection && esgSticky && esgEntry && esgEntryImage && esgEntryCopy && esgTargetCard) {
          const getTarget = () => {
            const stickyRect = esgSticky.getBoundingClientRect();
            const cardRect = esgTargetCard.getBoundingClientRect();

            return {
              x: Math.max(0, cardRect.left - stickyRect.left),
              y: Math.max(0, cardRect.top - stickyRect.top),
              width: cardRect.width,
              height: cardRect.height,
            };
          };

          gsap.set(esgEntry, {
            autoAlpha: 1,
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: 0,
            scale: 1,
          });
          gsap.set(esgEntryImage, { scale: 1.08 });
          gsap.set(esgEntryCopy, { autoAlpha: 1, y: 0 });

          const esgEntryTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: esgSection,
              start: "top top",
              end: "+=82%",
              scrub: 0.95,
              invalidateOnRefresh: true,
            },
            defaults: { ease: "power2.inOut" },
          });

          esgEntryTimeline
            .to(
              esgEntry,
              {
                left: () => getTarget().x,
                top: () => getTarget().y,
                width: () => getTarget().width,
                height: () => getTarget().height,
                borderRadius: 8,
                duration: 1,
              },
              0,
            )
            .to(esgEntryImage, { scale: 1, duration: 1 }, 0)
            .to(esgEntryCopy, { autoAlpha: 0, y: 24, duration: 0.36, ease: "power2.out" }, 0.54)
            .to(esgEntry, { autoAlpha: 0, duration: 0.14, ease: "none" }, 0.96);
        }

      });

      gsap.to(".global-fill-line .fill-line", {
        backgroundSize: "100% 100%",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".global-section",
          start: "top bottom+=720",
          end: "top 82%",
          scrub: true,
        },
      });

      const year = root.querySelector<HTMLElement>(".global-year");
      const yearState = { value: motionConfig.globalYear.from };
      if (year) {
        gsap.to(yearState, {
          value: motionConfig.globalYear.to,
          ease: "none",
          scrollTrigger: { trigger: ".global-section", start: "top 65%", end: "center center", scrub: true },
          onUpdate: () => {
            year.textContent = String(Math.round(yearState.value));
          },
        });
      }

      return () => {
        mm.revert();
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, [language, reduceMotion]);

  return (
    <div className="brainall-page" ref={rootRef}>
      <LogoIntro language={language} />
      <Header content={content} language={language} onLanguageChange={setLanguage} />
      <ScrollProgress />
      <main>
        <HighlightSlider
          highlights={content.highlights}
          buttonLabel={content.highlightButton}
          ariaLabel={content.highlightAria}
          itemAria={content.highlightItemAria}
        />
        <BrandMarquee text={content.brandMarquee} />
        <LatestPartsSection copy={{ ...content.latest, title: latestLineup.title }} parts={latestLineup.parts} />
        <DataSection copy={content.dataHeading} stats={content.stats} language={language} />
        <HistorySection copy={content.historyHeading} eras={content.historyEras} language={language} />
        <GlobalSection copy={content.global} partners={content.partnerLogos} language={language} />
        <EsgSection copy={content.esgHeading} pillars={content.esgPillars} />
        <MediaSection copy={content.mediaHeading} items={mediaItems} />
      </main>
      <Footer copy={content.footer} language={language} />
    </div>
  );
}
