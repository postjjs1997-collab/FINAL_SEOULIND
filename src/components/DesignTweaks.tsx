import { useEffect, useMemo, useState } from "react";
import { parseLocation, subscribeToLocation } from "../utils/siteRouter";

// Keep in sync with --tweak-font-size in src/styles/globals.css (site type scale: ~16px x 1.34).
const BASE_FONT_PX = 21.38;

type TweakValues = {
  fontFamily: string;
  fontScale: number;
  headingScale: number;
  menuHeroHeight: number;
  sectionSpacing: number;
  orange: string;
  paper: string;
  ink: string;
};

const TWEAK_STORAGE_KEY = "seoulind-design-tweaks";
const TWEAK_ENABLED_KEY = "seoulind-design-tweaks-enabled";
const TEXT_STORAGE_KEY = "seoulind-text-tweaks";
const TEXT_EDIT_KEY = "seoulind-text-edit-enabled";

const defaultTweaks: TweakValues = {
  fontFamily: '"Pretendard", sans-serif',
  fontScale: 1,
  headingScale: 1,
  menuHeroHeight: 1,
  sectionSpacing: 1,
  orange: "#e9631a",
  paper: "#fffaf4",
  ink: "#11100f",
};

const fontOptions = [
  { label: "Pretendard", value: '"Pretendard", sans-serif' },
  { label: "Noto Sans KR", value: '"Noto Sans KR", "Pretendard", sans-serif' },
  { label: "맑은 고딕", value: '"Malgun Gothic", "Pretendard", sans-serif' },
  { label: "System UI", value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { label: "Serif", value: '"Noto Serif KR", Georgia, serif' },
];

const editableSelector = [
  ".brainall-page h1",
  ".brainall-page h2",
  ".brainall-page h3",
  ".brainall-page p",
  ".brainall-page strong",
  ".menu-page h1",
  ".menu-page h2",
  ".menu-page h3",
  ".menu-page p",
  ".menu-page strong",
  ".menu-page span",
  ".renewal-page h1",
  ".renewal-page h2",
  ".renewal-page h3",
  ".renewal-page p",
  ".renewal-page strong",
  ".renewal-page span",
].join(",");

function shouldEnableTweaks() {
  if (typeof window === "undefined") return false;

  const hashQueryIndex = window.location.hash.indexOf("?");
  const queryStrings = [
    window.location.search,
    hashQueryIndex >= 0 ? window.location.hash.slice(hashQueryIndex) : "",
  ].filter(Boolean);
  const flag = queryStrings
    .map((queryString) => new URLSearchParams(queryString))
    .map((params) => params.get("tweak") ?? params.get("tweaks") ?? params.get("edit"))
    .find((value): value is string => value !== null);

  if (flag === "0" || flag === "false" || flag === "off") {
    window.localStorage.removeItem(TWEAK_ENABLED_KEY);
    return false;
  }

  if (flag) {
    window.localStorage.setItem(TWEAK_ENABLED_KEY, "1");
    return true;
  }

  return window.localStorage.getItem(TWEAK_ENABLED_KEY) === "1";
}

function loadTweaks(): TweakValues {
  if (typeof window === "undefined") return defaultTweaks;

  try {
    const saved = JSON.parse(window.localStorage.getItem(TWEAK_STORAGE_KEY) || "{}") as Partial<TweakValues>;
    return { ...defaultTweaks, ...saved };
  } catch {
    return defaultTweaks;
  }
}

function getRouteKey() {
  if (typeof window === "undefined") return "home";
  return parseLocation().route || "home";
}

function loadTextTweaks(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(window.localStorage.getItem(TEXT_STORAGE_KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function saveTextTweak(key: string, value: string) {
  const current = loadTextTweaks();
  current[key] = value;
  window.localStorage.setItem(TEXT_STORAGE_KEY, JSON.stringify(current));
}

function applyTweaks(values: TweakValues) {
  const root = document.documentElement;
  root.style.setProperty("--tweak-font-family", values.fontFamily);
  root.style.setProperty("--tweak-font-scale", String(values.fontScale));
  root.style.setProperty("--tweak-font-size", `${BASE_FONT_PX * values.fontScale}px`);
  root.style.setProperty("--tweak-heading-scale", String(values.headingScale));
  root.style.setProperty("--tweak-menu-hero-height-scale", String(values.menuHeroHeight));
  root.style.setProperty("--tweak-section-spacing-scale", String(values.sectionSpacing));
  root.style.setProperty("--color-orange", values.orange);
  root.style.setProperty("--color-blue", values.orange);
  root.style.setProperty("--color-paper", values.paper);
  root.style.setProperty("--color-ink-strong", values.ink);
}

function bindTextEditing(enabled: boolean) {
  const textTweaks = loadTextTweaks();
  const routeKey = getRouteKey();
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(editableSelector)).filter(
    (node) =>
      !node.closest(".design-tweaks, .site-header, .menu-location, .menu-depth-nav") &&
      Boolean(node.textContent?.trim()),
  );

  document.documentElement.classList.toggle("is-design-text-editing", enabled);

  nodes.forEach((node, index) => {
    const key = `${routeKey}:${index}`;
    if (textTweaks[key] && node.innerText !== textTweaks[key]) {
      node.innerText = textTweaks[key];
    }

    if (!enabled) {
      node.removeAttribute("contenteditable");
      node.removeAttribute("data-tweak-editable");
      node.removeAttribute("data-tweak-key");
      node.onblur = null;
      return;
    }

    node.setAttribute("contenteditable", "true");
    node.setAttribute("data-tweak-editable", "true");
    node.setAttribute("data-tweak-key", key);
    node.onblur = () => saveTextTweak(key, node.innerText);
  });
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="design-tweaks__field">
      <span>
        {label}
        <b>{Math.round(value * 100)}%</b>
      </span>
      <input min={min} max={max} step={step} type="range" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

export default function DesignTweaks() {
  const [enabled, setEnabled] = useState(shouldEnableTweaks);
  const [open, setOpen] = useState(true);
  const [textEdit, setTextEdit] = useState(() => typeof window !== "undefined" && window.localStorage.getItem(TEXT_EDIT_KEY) === "1");
  const [values, setValues] = useState<TweakValues>(loadTweaks);
  const exportPayload = useMemo(() => JSON.stringify(values, null, 2), [values]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "e")) return;

      event.preventDefault();
      setEnabled((current) => {
        const next = !current;
        window.localStorage.setItem(TWEAK_ENABLED_KEY, next ? "1" : "0");
        return next;
      });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    applyTweaks(values);
    window.localStorage.setItem(TWEAK_STORAGE_KEY, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    if (!enabled) {
      bindTextEditing(false);
      return;
    }

    const sync = () => window.setTimeout(() => bindTextEditing(textEdit), 80);
    sync();
    return subscribeToLocation(sync);
  }, [enabled, textEdit]);

  useEffect(() => {
    if (!enabled) return;

    window.localStorage.setItem(TEXT_EDIT_KEY, textEdit ? "1" : "0");
    bindTextEditing(textEdit);
  }, [enabled, textEdit]);

  if (!enabled) return null;

  const update = <K extends keyof TweakValues>(key: K, value: TweakValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const reset = () => {
    setValues(defaultTweaks);
    window.localStorage.removeItem(TEXT_STORAGE_KEY);
    window.localStorage.removeItem(TEXT_EDIT_KEY);
    setTextEdit(false);
    window.setTimeout(() => window.location.reload(), 80);
  };

  const copySettings = async () => {
    await navigator.clipboard?.writeText(exportPayload).catch(() => undefined);
  };

  return (
    <aside className={`design-tweaks${open ? " is-open" : ""}`} aria-label="디자인 편집 패널">
      <button className="design-tweaks__toggle" type="button" onClick={() => setOpen((current) => !current)}>
        TWEAK
      </button>
      {open ? (
        <div className="design-tweaks__panel">
          <div className="design-tweaks__head">
            <strong>디자인 편집</strong>
            <button type="button" onClick={() => setOpen(false)} aria-label="패널 닫기">
              ×
            </button>
          </div>

          <label className="design-tweaks__field">
            <span>폰트</span>
            <select value={values.fontFamily} onChange={(event) => update("fontFamily", event.target.value)}>
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </label>

          <RangeControl label="전체 글자" value={values.fontScale} min={0.86} max={1.18} step={0.01} onChange={(value) => update("fontScale", value)} />
          <RangeControl label="제목 크기" value={values.headingScale} min={0.82} max={1.22} step={0.01} onChange={(value) => update("headingScale", value)} />
          <RangeControl label="메뉴 상단 높이" value={values.menuHeroHeight} min={0.72} max={1.35} step={0.01} onChange={(value) => update("menuHeroHeight", value)} />
          <RangeControl label="섹션 여백" value={values.sectionSpacing} min={0.72} max={1.28} step={0.01} onChange={(value) => update("sectionSpacing", value)} />

          <div className="design-tweaks__colors">
            <label>
              <span>포인트</span>
              <input type="color" value={values.orange} onChange={(event) => update("orange", event.target.value)} />
            </label>
            <label>
              <span>배경</span>
              <input type="color" value={values.paper} onChange={(event) => update("paper", event.target.value)} />
            </label>
            <label>
              <span>글자</span>
              <input type="color" value={values.ink} onChange={(event) => update("ink", event.target.value)} />
            </label>
          </div>

          <label className="design-tweaks__check">
            <input type="checkbox" checked={textEdit} onChange={(event) => setTextEdit(event.target.checked)} />
            <span>화면 글씨 직접 수정</span>
          </label>

          <div className="design-tweaks__actions">
            <button type="button" onClick={copySettings}>
              설정 복사
            </button>
            <button type="button" onClick={reset}>
              초기화
            </button>
          </div>
          <p className="design-tweaks__hint">주소에 ?tweak=1을 붙이면 열립니다. Ctrl+Shift+E로 켜고 끌 수 있습니다.</p>
        </div>
      ) : null}
    </aside>
  );
}
