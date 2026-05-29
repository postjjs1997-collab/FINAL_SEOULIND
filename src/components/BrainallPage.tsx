import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import balanceModuleImage from "../../housing.png";
import drivelineImage from "../../driveline.png";
import electricVehicleImage from "../../electric vehicle.png";
import steeringImage from "../../steering.png";
import preloaderVideo from "../../start.mp4";
import BrainallLogo from "./BrainallLogo";
import Header from "./Header";
import Icon from "./Icons";
import {
  defaultLanguage,
  globalVideo,
  heroVisual,
  isLanguageCode,
  languages,
  showcaseVideos,
  siteContent,
  type ClientPartner,
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
} from "../data/brainall";
import { getNoticePosts, noticePostsToMediaItems } from "../data/notices";
import { gsap, ScrollTrigger } from "../motion/gsap";
import { motionConfig } from "../motion/config";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import { useLenisScroll } from "../motion/useLenisScroll";

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
        copy: "Steering components supporting response, alignment, and safety-critical quality requirements.",
        image: steeringImage,
        accent: "#f08a2a",
      },
    ],
  },
  ja: {
    title: "最新製品\nラインアップ",
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
        setInView(entry.isIntersecting);
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

      setProgress((current) => (Math.abs(current - next) > 0.002 ? next : current));
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
      const tail = Math.max(0, Number(node.dataset.scrollTailVh ?? 0)) * viewportHeight;
      const scrollable = Math.max(1, node.offsetHeight - viewportHeight - tail);
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      const stepValue = raw * (count - 1);
      const index = Math.min(count - 1, Math.max(0, Math.floor(stepValue + bias)));
      const stepProgress = index >= count - 1 ? 1 : Math.min(1, Math.max(0, stepValue - index));
      const next = { index, progress: raw, stepProgress };

      setState((current) =>
        current.index !== next.index || Math.abs(current.progress - next.progress) > 0.003 || Math.abs(current.stepProgress - next.stepProgress) > 0.003
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
  const tail = Math.max(0, Number(node.dataset.scrollTailVh ?? 0)) * viewportHeight;
  const scrollable = Math.max(1, node.offsetHeight - viewportHeight - tail);
  const target = sectionTop + (scrollable * index) / (count - 1);

  window.scrollTo({ top: target, behavior: "smooth" });
}

function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span className="ch" key={`${char}-${index}`} style={{ "--ch-index": index } as CSSProperties}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

type HeroSolutionCopyContent = {
  line1: Array<{ text: string; accent?: "start" | "solution" }>;
  line2: Array<{ text: string; accent?: "start" | "solution" }>;
  body: Array<{ text: string; accent?: "partner" }>;
};

const heroSolutionCopy: Record<LanguageCode, HeroSolutionCopyContent> = {
  ko: {
    line1: [{ text: "모든 움직임의 " }, { text: "시작", accent: "start" }, { text: "," }],
    line2: [{ text: "미래를 향한 " }, { text: "솔루션", accent: "solution" }],
    body: [{ text: "정밀 기술로 완성도를 높이는 자동차 부품의 " }, { text: "BEST PARTNER", accent: "partner" }],
  },
  en: {
    line1: [{ text: "Where Every Motion " }, { text: "Starts", accent: "start" }, { text: "," }],
    line2: [{ text: "Future-Ready " }, { text: "Solutions", accent: "solution" }],
    body: [{ text: "Your " }, { text: "BEST PARTNER", accent: "partner" }, { text: " in precision automotive component manufacturing." }],
  },
  ja: {
    line1: [{ text: "すべての動きが" }, { text: "始まる", accent: "start" }, { text: "場所、" }],
    line2: [{ text: "未来へ向かう" }, { text: "ソリューション", accent: "solution" }],
    body: [{ text: "精密技術で自動車部品の完成度を高める " }, { text: "BEST PARTNER", accent: "partner" }, { text: "。" }],
  },
};

function HeroSolutionSegment({ segment }: { segment: HeroSolutionCopyContent["line1"][number] | HeroSolutionCopyContent["body"][number] }) {
  if (!segment.accent) return <SplitChars text={segment.text} />;

  return (
    <span className={`hero-solution-copy__accent hero-solution-copy__accent--${segment.accent}`}>
      <SplitChars text={segment.text} />
    </span>
  );
}

function HeroBrandTitle() {
  const lines = [
    [
      { text: "Your" },
      { text: "Trusted", accent: true },
      { text: "Partner", accent: true },
    ],
    [{ text: "In" }, { text: "Automotive" }, { text: "OEM" }, { text: "Parts." }],
  ];

  return (
    <h1 className="hero-brand-title" aria-label="Your Trusted Partner in Automotive OEM Parts.">
      {lines.map((line, lineIndex) => (
        <span className="hero-brand-line" key={`hero-brand-line-${lineIndex}`}>
          {line.map((word) => (
            <span className={`hero-brand-word ${word.accent ? "hero-brand-word--accent" : ""}`} key={`${lineIndex}-${word.text}`}>
              <span className="hero-brand-word__inner">{word.text}</span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function HeroSolutionCopy({ language }: { language: LanguageCode }) {
  const copy = heroSolutionCopy[language] ?? heroSolutionCopy.ko;
  const headline = `${copy.line1.map((segment) => segment.text).join("")} ${copy.line2.map((segment) => segment.text).join("")}`;
  const body = copy.body.map((segment) => segment.text).join("");

  return (
    <div className="hero-solution-copy" data-language={language} aria-label={`${headline} ${body}`}>
      <p className="hero-solution-copy__headline" aria-hidden="true">
        <span className="hero-solution-copy__line">
          {copy.line1.map((segment, index) => (
            <HeroSolutionSegment segment={segment} key={`line1-${index}`} />
          ))}
        </span>
        <span className="hero-solution-copy__line hero-solution-copy__line--second">
          {copy.line2.map((segment, index) => (
            <HeroSolutionSegment segment={segment} key={`line2-${index}`} />
          ))}
        </span>
      </p>
      <p className="hero-solution-copy__body" aria-hidden="true">
        {copy.body.map((segment, index) => (
          <HeroSolutionSegment segment={segment} key={`body-${index}`} />
        ))}
      </p>
    </div>
  );
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

function HistoryAnimatedText({ text, className }: { text: string; className?: string }) {
  let visibleIndex = 0;
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

        return (
          <span className="history-word" aria-hidden="true" key={`history-word-${token}-${tokenIndex}`}>
            {Array.from(token).map((char, charIndexInToken) => {
              const charIndex = visibleIndex;
              visibleIndex += 1;

              return (
                <span
                  className="history-char"
                  style={{ "--history-char-index": charIndex, "--history-char-delay": `${charIndex * 10}ms` } as CSSProperties}
                  key={`history-char-${tokenIndex}-${charIndexInToken}-${char}`}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function HighlightMedia({ item, active, eager }: { item: Highlight; active: boolean; eager: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!active || reduceMotion) {
      video.pause();
      return;
    }

    void video.play().catch(() => undefined);
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
    >
      <source src={item.video} type={videoType} />
    </video>
  );
}

const highlightEndHoldVh = 0.9;
const esgEndHoldVh = 0.75;

function Preloader({ copy }: { copy: SiteContent["preloader"] }) {
  const reduceMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0);
  const [exiting, setExiting] = useState(reduceMotion);
  const [hidden, setHidden] = useState(reduceMotion);

  useEffect(() => {
    if (hidden) return;
    document.documentElement.classList.add("is-preloading");
    return () => {
      document.documentElement.classList.remove("is-preloading");
    };
  }, [hidden]);

  useEffect(() => {
    if (reduceMotion) return;

    const startedAt = performance.now();
    const duration = 7000;
    let frame = 0;
    let isComplete = false;
    const timers = new Set<number>();

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
    };

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.playbackRate = 1;
      void video.play().catch(() => undefined);
    }

    const revealHome = () => {
      document.documentElement.classList.remove("is-preloading");
      window.dispatchEvent(new CustomEvent("seoulind-preloader-reveal"));
    };

    const complete = () => {
      if (isComplete) return;
      isComplete = true;
      setProgress(100);
      setExiting(true);
      if (video) video.pause();
      schedule(revealHome, 360);
      schedule(() => setHidden(true), 1450);
    };

    const tick = () => {
      const elapsed = Math.max(0, performance.now() - startedAt);
      const ratio = Math.min(1, elapsed / duration);
      const next = Math.min(100, Math.floor(ratio * 100));
      setProgress(next);

      if (ratio < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      complete();
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [reduceMotion]);

  if (hidden) return null;

  const activeWord = copy.words[Math.min(copy.words.length - 1, Math.floor((progress / 101) * copy.words.length))];

  return (
    <div className={`site-preloader ${exiting ? "is-exiting" : ""}`} style={{ "--preloader-progress": `${progress}%` } as CSSProperties} aria-hidden="true">
      {!reduceMotion && (
        <video ref={videoRef} className="site-preloader__video" muted playsInline preload="auto">
          <source src={preloaderVideo} type="video/mp4" />
        </video>
      )}
      <div className="site-preloader__percent">{progress}%</div>
      <div className="site-preloader__copy">
        <span>{copy.prefix}</span>
        <strong key={activeWord}>{activeWord}</strong>
      </div>
      <div className="site-preloader__bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

function Hero({ copy, language }: { copy: SiteContent["hero"]; language: LanguageCode }) {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroWords = { left: "SEOUL", right: "IND." };
  const heroStyle = {
    "--hero-scroll-height": `${motionConfig.hero.scrollLengthVh}svh`,
    "--hero-mobile-scroll-height": `${motionConfig.hero.mobileScrollLengthVh}svh`,
  } as CSSProperties;

  useEffect(() => {
    if (reduceMotion) return;
    const video = heroVideoRef.current;
    if (!video) return;

    const holdFrameAt = 0;
    const setHoldFrame = () => {
      video.pause();
      video.loop = false;
      video.playbackRate = 1;
      if (Number.isFinite(video.duration) && video.duration > holdFrameAt && Math.abs(video.currentTime - holdFrameAt) > 0.02) {
        video.currentTime = holdFrameAt;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) video.pause();
    };

    if (video.readyState >= 1) setHoldFrame();
    else video.addEventListener("loadedmetadata", setHoldFrame, { once: true });

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      video.removeEventListener("loadedmetadata", setHoldFrame);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const updateHeadlights = () => {
      frame = 0;
      const scrolled = Math.max(0, -section.getBoundingClientRect().top);
      const visible = scrolled < 2;

      section.querySelectorAll<HTMLElement>(".hero-headlight").forEach((light) => {
        light.style.opacity = visible ? "0.92" : "0";
        light.style.visibility = visible ? "visible" : "hidden";
      });
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeadlights);
    };

    updateHeadlights();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduceMotion]);

  return (
    <section ref={sectionRef} className="brain-hero visual-sect" id="top" style={heroStyle}>
      <div className="brain-hero__sticky scroll-area">
        <div className="brain-hero__bg" aria-hidden="true" />

        <div className="hero-title-stage">
          <HeroBrandTitle />

          <div className="hero-auto-title">
            <p className="hero-label hero-label--top">
              <span>{copy.leftLabel}</span>
            </p>
            <h1 className="hero-auto-line" aria-label={`${heroWords.left} ${heroWords.right}`}>
              <span className="hero-auto-word hero-auto-word--auto" aria-hidden="true">
                <SplitChars text={heroWords.left} />
              </span>
              <span className="hero-auto-word hero-auto-word--parts" aria-hidden="true">
                <SplitChars text={heroWords.right} />
              </span>
            </h1>
            <p className="hero-label hero-label--bottom">
              <span>{copy.rightLabel}</span>
            </p>
          </div>
        </div>

        <div className="brain-box" aria-hidden="true">
          <div className="brain-video-box">
            {reduceMotion ? (
              <img className="brain-video" src={heroVisual.poster} alt={heroVisual.label} loading="eager" />
            ) : (
              <video
                ref={heroVideoRef}
                className="brain-video"
                muted
                playsInline
                preload="auto"
                poster={heroVisual.poster}
              >
                <source src={heroVisual.webm} type="video/webm" />
                <source src={heroVisual.src} type="video/mp4" />
              </video>
            )}
            <span className="hero-headlight hero-headlight--left" aria-hidden="true" />
            <span className="hero-headlight hero-headlight--right" aria-hidden="true" />
          </div>
        </div>

        <HeroSolutionCopy language={language} />

        <p className="brain-hero__subtit">{copy.subtitle}</p>

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
      data-scroll-tail-vh={highlightEndHoldVh}
      style={
        {
          "--highlight-count": visibleHighlights.length,
          "--highlight-scroll-length": visibleHighlights.length + highlightEndHoldVh,
        } as CSSProperties
      }
    >
      <span className="highlight-bg-dim" aria-hidden="true" />
      <div className="highlight-stage">
        <div className="highlight-copy">
          {visibleHighlights.map((item, index) => (
            <article className={`highlight-copy__item ${index === active ? "is-active" : ""}`} key={item.title}>
              <span className="highlight-copy__index">{String(index + 1).padStart(2, "0")}</span>
              <h2>
                {item.title.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
              <p>{item.copy}</p>
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
              <HighlightMedia item={item} active={index === active} eager={index <= 1} />
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

    void node.play().catch(() => undefined);
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
          "--latest-scroll-height": `${Math.max(totalClipCount, partCount, 1) * 56}svh`,
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
          </aside>

          <div className="latest-parts__video-stage" aria-live="polite">
            <div className="latest-parts__stage-glow" aria-hidden="true" />
            <div className="latest-parts__video-stack">
              {parts.map((part, index) => {
                const videos = videoLineups[index % videoLineups.length] ?? [showcaseVideos.products[0]];

                return (
                  <article className={`latest-video-card ${getStateClass(index)}`} key={part.title} style={{ "--part-accent": part.accent } as CSSProperties}>
                    <div className="latest-video-card__media">
                      <LatestLineupVideo videos={videos} active={index === active} eager={index <= 1} scrollVideoIndex={index === active ? activeClipIndex : 0} />
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
      body: "From development response to process stabilization, inspection, and delivery, the company moves at the pace of customer production plans.",
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
        { eyebrow: "01 / Drawing Review", title: "Development Response", copy: "Drawing revisions and assembly conditions are organized before production validation." },
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
        { eyebrow: "SOCIAL", title: "Safe Workplace", copy: "Skilled operators and safety standards support stable quality response." },
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
    { value: "300,000+", label: "월간 양산 대응 부품 규모" },
    { value: "30+", label: "개발부터 양산까지 연결된 누적 파트너십" },
  ],
  en: [
    {},
    { value: "47" },
    {},
    { value: "300,000+", label: "Monthly mass-production response scale" },
    { value: "30+", label: "Accumulated partnerships from development to production" },
  ],
  ja: [
    {},
    { value: "47" },
    {},
    { value: "300,000+", label: "月間量産対応部品規模" },
    { value: "30+", label: "開発から量産までつながる累積パートナーシップ" },
  ],
};

function DataSection({ copy, stats, language }: { copy: SiteContent["dataHeading"]; stats: GlobalAchievement[]; language: LanguageCode }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);
  const displayStats = stats.map((stat, index) => ({ ...stat, ...(dataStatOverrides[language]?.[index] ?? {}) }));

  return (
    <section className="data-section" id="data" ref={ref} data-scene="metrics">
      <div className="data-section__copy" data-reveal>
        <h2 aria-label={copy.title}>
          <ScrollComposeText text={copy.title} />
        </h2>
        <p>{copy.copy}</p>
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

function HistorySection({ copy, eras }: { copy: SiteContent["historyHeading"]; eras: HistoryEra[] }) {
  const [ref, inView] = useInView<HTMLElement>(0.12, "0px 0px -18% 0px");
  const chronologicalEras = [...eras].sort((a, b) => getEraStartYear(a.period) - getEraStartYear(b.period));

  return (
    <section className={`history-section${inView ? " is-inview" : ""}`} id="history" data-scene="timeline" ref={ref}>
      <div className="history-section__inner">
        <div className="history-section__intro">
          <span>{copy.eyebrow}</span>
          <strong>
            <HistoryAnimatedText text={copy.since} className="history-animated-text--since" />
          </strong>
          <h2>
            <HistoryAnimatedText text={copy.title} />
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

function PartnerRows({ partners }: { partners: PartnerLogo[] }) {
  const row = [...partners, ...partners];
  return (
    <div className="partner-rail">
      <div className="partner-rail__track">
        {row.map((partner, index) => (
          <span className="partner-logo" key={`${partner.name}-a-${index}`}>
            {partner.logoSrc ? (
              <img className="partner-logo__image" src={partner.logoSrc} alt={partner.name} loading="lazy" />
            ) : (
              <strong>{partner.mark}</strong>
            )}
            <small>{partner.role}</small>
          </span>
        ))}
      </div>
      <div className="partner-rail__track partner-rail__track--reverse">
        {row.map((partner, index) => (
          <span className="partner-logo" key={`${partner.name}-b-${index}`}>
            {partner.logoSrc ? (
              <img className="partner-logo__image" src={partner.logoSrc} alt={partner.name} loading="lazy" />
            ) : (
              <strong>{partner.mark}</strong>
            )}
            <small>{partner.region}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function GlobalSection({ copy, partners }: { copy: SiteContent["global"]; partners: PartnerLogo[] }) {
  return (
    <section className="global-section" id="partners" data-scene="network">
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
        <video autoPlay muted playsInline loop>
          <source src={globalVideo.webm} type="video/webm" />
          <source src={globalVideo.mov} type="video/quicktime" />
        </video>
      </div>
      <strong className="global-year">2026</strong>
      <h3>{copy.networkTitle}</h3>
      <PartnerRows partners={partners} />
    </section>
  );
}

function GlobalAchievementSection({ copy, achievements }: { copy: SiteContent["achievementsHeading"]; achievements: GlobalAchievement[] }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref, { startVh: 0.92, endVh: 0.08 });

  return (
    <section className="global-achievement-section" ref={ref} data-scene="metrics">
      <div className="global-achievement__head" data-reveal>
        <h2 aria-label={copy.titleLines.join(" ")}>
          <ScrollComposeText text={copy.titleLines.join("\n")} />
        </h2>
      </div>

      <div className="global-achievement__grid">
        {achievements.map((item) => (
          <article className="global-achievement-card" data-reveal key={item.label}>
            <span>{item.label}</span>
            <strong>
              <RollingStatNumber progress={progress} value={item.value} />
            </strong>
            <small>{item.unit}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

const clientStatementAccentWords = new Set(["SEOUL", "INDUSTRY", "PARTNERSHIPS"]);

function ClientCollabStatement({ statement, progress }: { statement: string; progress: number }) {
  const tokens = statement.split(/(\s+)/);
  const wordCount = tokens.filter((token) => !/^\s+$/.test(token)).length;
  const introWordCount = 2;
  const revealableCount = Math.max(1, wordCount - introWordCount);
  let wordIndex = -1;

  return (
    <p className="client-collab__statement">
      {tokens.map((token, index) => {
        if (/^\s+$/.test(token)) return token;

        wordIndex += 1;
        const normalized = token.replace(/[^a-z0-9]/gi, "").toUpperCase();
        const accented = clientStatementAccentWords.has(normalized);
        const introWord = wordIndex < introWordCount;
        const revealOrder = introWord ? 0 : (wordIndex - introWordCount) / revealableCount;
        const revealStart = 0.08 + revealOrder * 0.58;
        const revealProgress = introWord ? 1 : clamp01((progress - revealStart) / 0.2);
        const fillProgress = accented ? (introWord ? 1 : clamp01((progress - revealStart - 0.04) / 0.2)) : 0;
        const wordStyle = {
          "--client-word-opacity": revealProgress,
          "--client-word-y": `${(1 - revealProgress) * 112}%`,
          "--client-word-blur": `${(1 - revealProgress) * 5}px`,
          "--client-word-fill": `${(1 - fillProgress) * 100}%`,
        } as CSSProperties;
        const wordClassName = [
          "client-collab__word",
          accented ? "client-collab__word--accent" : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (!accented) {
          return (
            <span className={wordClassName} data-word={normalized} key={`${token}-${index}`}>
              <span className="client-collab__word-inner" style={wordStyle}>
                {token}
              </span>
            </span>
          );
        }

        return (
          <span className={wordClassName} data-word={normalized} key={`${token}-${index}`}>
            <span className="client-collab__word-inner" style={wordStyle}>
              <span className="client-collab__word-base">{token}</span>
              <span className="client-collab__word-fill" aria-hidden="true">
                {token}
              </span>
            </span>
          </span>
        );
      })}
    </p>
  );
}

function ClientCollabSection({ statement, clients }: { statement: string; clients: ClientPartner[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress: statementProgress } = useScrollSteps(sectionRef, Math.max(2, clients.length), 0.0001);

  return (
    <section className="client-collab" id="client-collab" data-scene="dark" ref={sectionRef}>
      <div className="client-collab__split">
        <div className="client-collab__text">
          <ClientCollabStatement statement={statement} progress={statementProgress} />
        </div>

        <div className="client-collab__stage">
          <div className="client-collab__rail">
            {clients.map((client, index) => (
              <article className="client-card" key={client.index}>
                <div className="client-card__bar">
                  <span>{client.index}</span>
                  <span>{client.year}</span>
                </div>
                <div className="client-card__media">
                  <img src={client.image} alt="" loading={index <= 1 ? "eager" : "lazy"} />
                  <strong className="client-card__logo">{client.mark}</strong>
                </div>
                <div className="client-card__meta">
                  <strong>{client.name}</strong>
                  <span>{client.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EsgSection({ copy, pillars }: { copy: SiteContent["esgHeading"]; pillars: EsgPillar[] }) {
  const ref = useRef<HTMLElement>(null);
  const scrollState = useScrollSteps(ref, Math.max(2, pillars.length + 1), 0.0001);
  const active = Math.min(pillars.length - 1, Math.max(0, scrollState.index));
  const stepProgress = scrollState.index >= pillars.length ? 1 : scrollState.stepProgress;
  const activeItem = pillars[active] ?? pillars[0];
  const entryItem = pillars[0];
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
          "--pillar-accent": activeItem.accent,
        } as CSSProperties
      }
    >
      <div className="esg-sticky">
        {entryItem && (
          <div className="esg-entry-visual" aria-hidden="true" style={{ "--pillar-accent": entryItem.accent } as CSSProperties}>
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
          <p>{copy.copy}</p>
        </div>

        <div className="esg-layout">
          <div className="esg-copy">
            <h2 aria-label={titleText.replace(/\n/g, " ")}>
              <ScrollComposeText text={titleText} />
            </h2>
            <div className="esg-keywords" aria-label={copy.title}>
              <strong className="esg-keyword is-active" key={activeItem.keyword} style={{ "--pillar-accent": activeItem.accent } as CSSProperties}>
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
                      "--pillar-accent": item.accent,
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
              {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span className="news-logo-placeholder">SEOULIND</span>}
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
    statement: "도면 검토에서 양산 공급까지, 서울산업은 자동차 부품 OEM 생산의 마지막 기준까지 함께 관리합니다.",
    inquiryLabel: "OEM 개발 및 양산 문의",
    phone: "031-366-1141",
    hours: "평일 08:30 - 17:30",
    quickTitle: "바로가기",
    quickLinks: [
      { label: "제조 기반", href: "#solution" },
      { label: "제품 라인업", href: "#lineup" },
      { label: "글로벌 고객사", href: "#client-collab" },
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
    statement: "From drawing review to mass production, Seoul Industry manages the final standards behind reliable automotive OEM supply.",
    inquiryLabel: "OEM development and production inquiry",
    phone: "+82-31-366-1141",
    hours: "Weekdays 08:30 - 17:30 KST",
    quickTitle: "Navigate",
    quickLinks: [
      { label: "Manufacturing", href: "#solution" },
      { label: "Products", href: "#lineup" },
      { label: "Global Customers", href: "#client-collab" },
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
    statement: "図面検討から量産供給まで、ソウル産業は自動車部品OEM供給の最後の基準まで管理します。",
    inquiryLabel: "OEM開発・量産のお問い合わせ",
    phone: "+82-31-366-1141",
    hours: "平日 08:30 - 17:30 KST",
    quickTitle: "クイックリンク",
    quickLinks: [
      { label: "製造基盤", href: "#solution" },
      { label: "製品ラインアップ", href: "#lineup" },
      { label: "グローバル顧客", href: "#client-collab" },
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

      gsap.set(".hero-brand-word__inner", { yPercent: 112, autoAlpha: 0, filter: "blur(8px)" });
      gsap.set(".hero-auto-title", { autoAlpha: 0 });
      gsap.set(".hero-auto-title .ch, .hero-auto-title .hero-label span", { yPercent: 112, autoAlpha: 0 });
      gsap.set(".brain-video-box", { autoAlpha: 0, y: 50, scale: 0.96 });
      gsap.set(".brain-hero__subtit", { autoAlpha: 0, y: 28, x: 0, xPercent: 0 });
      gsap.set(".hero-solution-copy", { autoAlpha: 0 });
      gsap.set(".hero-solution-copy .ch", { y: "1.18em", autoAlpha: 0, filter: "blur(6px)" });
      gsap.set(".global-fill-line .fill-line", { backgroundSize: "0% 100%" });

      const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      intro
        .to(".hero-brand-word__inner", {
          yPercent: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: motionConfig.hero.introDuration + 0.18,
          stagger: { each: 0.12, from: "start" },
          delay: 0.08,
        })
        .to(".brain-video-box", { autoAlpha: 1, y: 0, scale: 1, duration: 1.08, ease: "power3.out" }, ">-0.42");

      let heroIntroStarted = false;
      let heroIntroFallback = 0;
      const playHeroIntro = () => {
        if (heroIntroStarted) return;
        heroIntroStarted = true;
        window.clearTimeout(heroIntroFallback);
        intro.play(0);
      };
      if (document.documentElement.classList.contains("is-preloading") || root.querySelector(".site-preloader")) {
        window.addEventListener("seoulind-preloader-reveal", playHeroIntro, { once: true });
        heroIntroFallback = window.setTimeout(playHeroIntro, 8400);
      } else {
        playHeroIntro();
      }

      const subtitleTravelX = (rightPaddingRatio: number) => {
        const subtitle = root.querySelector<HTMLElement>(".brain-hero__subtit");
        if (!subtitle) return 0;
        const rect = subtitle.getBoundingClientRect();
        const rightPadding = Math.max(16, window.innerWidth * rightPaddingRatio);
        return Math.max(0, window.innerWidth - rect.left - rect.width - rightPadding);
      };

      const viewportPosition = (value: string, axis: "x" | "y") => {
        const size = axis === "x" ? window.innerWidth : window.innerHeight;
        const trimmed = value.trim();
        if (trimmed.endsWith("%")) return (Number.parseFloat(trimmed) / 100) * size;
        if (trimmed.endsWith("vw")) return (Number.parseFloat(trimmed) / 100) * window.innerWidth;
        if (trimmed.endsWith("vh")) return (Number.parseFloat(trimmed) / 100) * window.innerHeight;
        return Number.parseFloat(trimmed) || 0;
      };

      const brainTravelTo = (target: string, axis: "x" | "y") => {
        const box = root.querySelector<HTMLElement>(".brain-video-box");
        if (!box) return 0;
        const style = window.getComputedStyle(box);
        const current = Number.parseFloat(axis === "x" ? style.left : style.top) || 0;
        return viewportPosition(target, axis) - current;
      };

      const createVisualTimeline = (options: {
        subtitXPercent: number;
        subtitRightPaddingRatio: number;
        brainLeft: string;
        brainTop: string;
      }) => {
        const heroAutoCharCount = root.querySelectorAll(".hero-auto-title .hero-auto-word .ch").length;
        const subtitleMoveStart = 1.16;
        const subtitleMoveDuration = 0.92;
        const subtitleArriveAt = subtitleMoveStart + subtitleMoveDuration;
        const brandColorDuration = 0.62;
        const brandColorStagger = Math.max(
          0,
          (subtitleMoveDuration - brandColorDuration) / Math.max(1, heroAutoCharCount - 1),
        );
        const heroExitStart = subtitleArriveAt + 1.26;
        const heroTravelDuration = 1.44;
        const solutionCharCount = root.querySelectorAll(".hero-solution-copy .ch").length;
        const solutionRevealStart = heroExitStart + 0.64;
        const solutionRevealDuration = 0.42;
        const solutionRevealStagger = solutionCharCount > 82 ? 0.0025 : 0.004;
        const solutionFadeStart =
          solutionRevealStart + solutionRevealDuration + Math.max(0, solutionCharCount - 1) * solutionRevealStagger + 0.78;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".brain-hero",
            start: "top+=100 top",
            end: "bottom bottom",
            scrub: motionConfig.hero.scrub,
            invalidateOnRefresh: true,
          },
        });

        tl.set(".hero-brand-word__inner, .hero-auto-title .ch", { transition: "none" })
          .set(".hero-auto-title .ch", { backgroundPosition: "100% 50%", textShadow: "0 0 0 rgba(233, 99, 26, 0)" }, 0)
          .set(".brain-video-box", { autoAlpha: 1 }, 0.01)
          .to(".hero-brand-title", { yPercent: -112, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 0.68)
          .set(".hero-auto-title", { autoAlpha: 1 }, 0.78)
          .to(
            ".hero-auto-title .ch",
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.58,
              stagger: { each: 0.014, from: "start" },
              ease: "power4.out",
            },
            0.78,
          )
          .to(
            ".hero-auto-title .hero-label span",
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.44,
              stagger: motionConfig.hero.labelStagger,
              ease: "power3.out",
            },
            0.86,
          )
          .to(
            ".hero-auto-title .ch",
            {
              backgroundPosition: "0% 50%",
              textShadow: "0 18px 58px rgba(233, 99, 26, 0.22)",
              duration: brandColorDuration,
              stagger: { each: brandColorStagger, from: "start" },
              ease: "none",
            },
            subtitleMoveStart,
          )
          .to(".brain-hero__subtit", { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out" }, 0.92)
          .fromTo(
            ".brain-hero__subtit",
            { x: 0, xPercent: 0 },
            { x: () => subtitleTravelX(options.subtitRightPaddingRatio), xPercent: 0, duration: subtitleMoveDuration, ease: "none" },
            subtitleMoveStart,
          )
          .to(".hero-auto-title", { y: "-100vh", opacity: 0, duration: heroTravelDuration, ease: "none" }, heroExitStart)
          .to(
            ".brain-video-box",
            {
              x: () => brainTravelTo(options.brainLeft, "x"),
              y: () => brainTravelTo(options.brainTop, "y"),
              scale: motionConfig.hero.brainTravelScale,
              force3D: true,
              autoRound: false,
              duration: heroTravelDuration,
              ease: "none",
            },
            heroExitStart,
          )
          .set(".hero-solution-copy", { autoAlpha: 1 }, solutionRevealStart - 0.08)
          .to(
            ".hero-solution-copy .ch",
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: solutionRevealDuration,
              stagger: { each: solutionRevealStagger, from: "start" },
              ease: "power4.out",
            },
            solutionRevealStart,
          )
          .to(".hero-solution-copy", { y: -28, autoAlpha: 0, duration: 0.52, ease: "power2.in" }, solutionFadeStart)
          .to(".brain-video-box", { y: () => brainTravelTo("26%", "y"), force3D: true, autoRound: false, duration: 0.8, ease: "none" }, ">")
          .to(".brain-hero__subtit", { y: "-100vh", opacity: 0, duration: 1.2 }, "<")
          .to(".brain-hero__bg", { "--bg-overlay-opacity": 1, duration: 0.36, ease: "none" }, ">-0.36");

        const heroVideo = root.querySelector<HTMLVideoElement>(".brain-video-box video");
        let lastHeroVideoTime = -1;
        let targetHeroVideoTime = 0;
        let displayedHeroVideoTime = 0;
        let videoFrame = 0;
        const stopHeroVideoFrame = () => {
          if (!videoFrame) return;
          window.cancelAnimationFrame(videoFrame);
          videoFrame = 0;
        };
        const renderHeroVideoFrame = () => {
          videoFrame = 0;
          if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0.1) return;

          const distance = targetHeroVideoTime - displayedHeroVideoTime;
          displayedHeroVideoTime += distance * 0.34;
          if (Math.abs(distance) < 0.018) {
            displayedHeroVideoTime = targetHeroVideoTime;
          }

          heroVideo.pause();
          if (Math.abs(displayedHeroVideoTime - lastHeroVideoTime) >= 0.045) {
            lastHeroVideoTime = displayedHeroVideoTime;
            heroVideo.currentTime = displayedHeroVideoTime;
          }

          if (Math.abs(targetHeroVideoTime - displayedHeroVideoTime) > 0.02) {
            videoFrame = window.requestAnimationFrame(renderHeroVideoFrame);
          }
        };
        const syncHeroVideo = () => {
          if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0.1) return;

          const holdAt = 0;
          const scrubStart = heroExitStart;
          const scrubEnd = Math.max(scrubStart + 0.4, tl.duration() - 0.4);
          const progress = Math.min(1, Math.max(0, (tl.time() - scrubStart) / Math.max(0.001, scrubEnd - scrubStart)));
          targetHeroVideoTime = holdAt + progress * Math.max(0, heroVideo.duration - holdAt - 0.05);

          if (!videoFrame) {
            videoFrame = window.requestAnimationFrame(renderHeroVideoFrame);
          }
        };

        tl.eventCallback("onUpdate", syncHeroVideo);
        if (heroVideo) {
          if (heroVideo.readyState >= 1) syncHeroVideo();
          else heroVideo.addEventListener("loadedmetadata", syncHeroVideo, { once: true });
        }

        return () => {
          stopHeroVideoFrame();
          heroVideo?.removeEventListener("loadedmetadata", syncHeroVideo);
        };
      };

      mm.add("(min-width: 861px)", () =>
        createVisualTimeline({
          subtitXPercent: motionConfig.hero.subtitXPercentDesktop,
          subtitRightPaddingRatio: 0.045,
          brainLeft: motionConfig.hero.brainDesktopLeft,
          brainTop: motionConfig.hero.brainDesktopTop,
        }),
      );

      mm.add("(max-width: 860px)", () =>
        createVisualTimeline({
          subtitXPercent: motionConfig.hero.subtitXPercentMobile,
          subtitRightPaddingRatio: 0.04,
          brainLeft: motionConfig.hero.brainMobileLeft,
          brainTop: motionConfig.hero.brainMobileTop,
        }),
      );

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

      gsap.utils.toArray<HTMLElement>(".scroll-compose-text").forEach((block) => {
        const chars = gsap.utils.toArray<HTMLElement>(block.querySelectorAll(".scroll-compose-char"));
        if (!chars.length) return;

        const trigger = block.closest<HTMLElement>("[data-scene]") ?? block;

        gsap.fromTo(
          block,
          { scale: 1.08, xPercent: -1.6 },
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
          { autoAlpha: 0, y: 0, yPercent: 112, rotateX: -24, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            stagger: { each: 0.018, from: "start" },
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
          { autoAlpha: 0, y: motionConfig.reveal.y, filter: `blur(${motionConfig.reveal.blur}px)` },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
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

      gsap.utils
        .toArray<HTMLElement>(".global-section__copy, .client-collab__text")
        .forEach((target) => {
          const trigger = target.closest<HTMLElement>("[data-scene]") ?? target;
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: motionConfig.scene.y, filter: `blur(${motionConfig.scene.blur}px)` },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
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
        { clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" },
        {
          clipPath: "inset(0 0 0% 0)",
          filter: "blur(0px)",
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

        const clientRail = root.querySelector<HTMLElement>(".client-collab__rail");
        const clientStage = root.querySelector<HTMLElement>(".client-collab__stage");
        if (clientRail && clientStage) {
          gsap.set(clientRail, { x: 0 });
          gsap.to(clientRail, {
            x: () => {
              const distance = clientRail.scrollWidth - clientStage.clientWidth;
              return -Math.max(0, distance);
            },
            ease: "none",
            scrollTrigger: {
              trigger: ".client-collab",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        gsap.set(".client-collab__statement", { xPercent: 0 });
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
        window.clearTimeout(heroIntroFallback);
        window.removeEventListener("seoulind-preloader-reveal", playHeroIntro);
        mm.revert();
      };
    }, root);

    return () => ctx.revert();
  }, [language, reduceMotion]);

  return (
    <div className="brainall-page" ref={rootRef}>
      <Preloader copy={content.preloader} />
      <Header content={content} language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero copy={content.hero} language={language} />
        <HighlightSlider
          highlights={content.highlights}
          buttonLabel={content.highlightButton}
          ariaLabel={content.highlightAria}
          itemAria={content.highlightItemAria}
        />
        <BrandMarquee text={content.brandMarquee} />
        <LatestPartsSection copy={{ ...content.latest, title: latestLineup.title }} parts={latestLineup.parts} />
        <DataSection copy={content.dataHeading} stats={content.stats} language={language} />
        <HistorySection copy={content.historyHeading} eras={content.historyEras} />
        <GlobalSection copy={content.global} partners={content.partnerLogos} />
        <GlobalAchievementSection copy={content.achievementsHeading} achievements={content.globalAchievements} />
        <ClientCollabSection statement={content.clientCollabStatement} clients={content.clientPartners} />
        <EsgSection copy={content.esgHeading} pillars={content.esgPillars} />
        <MediaSection copy={content.mediaHeading} items={mediaItems} />
      </main>
      <Footer copy={content.footer} language={language} />
    </div>
  );
}
