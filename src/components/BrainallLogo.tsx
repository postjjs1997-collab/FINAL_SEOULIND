import { useId } from "react";

type BrainallLogoProps = {
  className?: string;
  markOnly?: boolean;
};

type SeoulIndustrySymbolProps = {
  className?: string;
  animated?: boolean;
  role?: "img";
  ariaLabel?: string;
};

const ciGapRects = [
  { x: 33.8, width: 5 },
  { x: 41.8, width: 3 },
  { x: 49.8, width: 3 },
  { x: 60.8, width: 3 },
  { x: 68.8, width: 3 },
  { x: 74.8, width: 5 },
];

export function SeoulIndustrySymbol({ className = "brainall-logo__symbol", animated = false, role, ariaLabel }: SeoulIndustrySymbolProps) {
  const reactId = useId().replace(/:/g, "");
  const maskId = `seoul-ci-logo-mask-${reactId}`;
  const envelopeClipId = `seoul-ci-logo-envelope-${reactId}`;
  const topClipId = `seoul-ci-logo-top-${reactId}`;
  const bottomClipId = `seoul-ci-logo-bottom-${reactId}`;

  if (animated) {
    return (
      <svg className={className} viewBox="0 0 113.6 100" role={role} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} focusable="false">
        <defs>
          <clipPath id={envelopeClipId}>
            <circle cx="63.6" cy="50" r="50" />
            <circle cx="50" cy="50" r="50" />
          </clipPath>
          <clipPath id={topClipId}>
            <path d="M 0 0 H 113.6 V 46 H 96 V 50.8 H 0 Z" />
          </clipPath>
          <clipPath id={bottomClipId}>
            <path d="M 0 55 H 18 V 49.2 H 113.6 V 100 H 0 Z" />
          </clipPath>
        </defs>
        <circle className="ci-logo-intro__origin-circle" cx="56.8" cy="50" r="50" />
        <g className="ci-logo-intro__split-mark">
          <circle className="ci-logo-intro__half ci-logo-intro__half--top" cx="63.6" cy="50" r="50" clipPath={`url(#${topClipId})`} />
          <circle className="ci-logo-intro__half ci-logo-intro__half--bottom" cx="50" cy="50" r="50" clipPath={`url(#${bottomClipId})`} />
        </g>
        <g clipPath={`url(#${envelopeClipId})`}>
          <g className="ci-logo-intro__slashes" transform="rotate(25 56.8 50)">
            {ciGapRects.map((gap, index) => (
              <rect x={gap.x} y="-18" width={gap.width} height="138" key={`ci-gap-${index}`} />
            ))}
          </g>
        </g>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 113.6 100" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={topClipId}>
          <path d="M 0 0 H 113.6 V 46 H 96 V 50.8 H 0 Z" />
        </clipPath>
        <clipPath id={bottomClipId}>
          <path d="M 0 55 H 18 V 49.2 H 113.6 V 100 H 0 Z" />
        </clipPath>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="113.6" height="100">
          <rect x="0" y="0" width="113.6" height="100" fill="black" />
          <circle cx="63.6" cy="50" r="50" fill="white" clipPath={`url(#${topClipId})`} />
          <circle cx="50" cy="50" r="50" fill="white" clipPath={`url(#${bottomClipId})`} />
          <g fill="black" transform="rotate(25 56.8 50)">
            {ciGapRects.map((gap, index) => (
              <rect x={gap.x} y="-18" width={gap.width} height="138" key={`ci-mask-gap-${index}`} />
            ))}
          </g>
        </mask>
      </defs>
      <rect x="0" y="0" width="113.6" height="100" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
}

export default function BrainallLogo({ className = "", markOnly = false }: BrainallLogoProps) {
  const logoClassName = ["brainall-logo", markOnly ? "brainall-logo--mark-only" : "", className].filter(Boolean).join(" ");

  return (
    <span className={logoClassName} aria-label="Seoul Industry">
      <SeoulIndustrySymbol />
    </span>
  );
}
