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

const ciSlashRects = [
  { x: 31.6, width: 5 },
  { x: 42.9, width: 5 },
  { x: 54.2, width: 8 },
  { x: 68, width: 5 },
  { x: 79.3, width: 5 },
];

export function SeoulIndustrySymbol({ className = "brainall-logo__symbol", animated = false, role, ariaLabel }: SeoulIndustrySymbolProps) {
  const reactId = useId().replace(/:/g, "");
  const maskId = `seoul-ci-logo-mask-${reactId}`;
  const topClipId = `seoul-ci-logo-top-${reactId}`;
  const bottomClipId = `seoul-ci-logo-bottom-${reactId}`;

  if (animated) {
    return (
      <svg className={className} viewBox="0 0 113.6 100" role={role} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : true} focusable="false">
        <defs>
          <clipPath id={topClipId}>
            <path d="M 0 0 H 113.6 V 46 H 96 V 50 H 0 Z" />
          </clipPath>
          <clipPath id={bottomClipId}>
            <path d="M 0 55 H 18 V 50 H 113.6 V 100 H 0 Z" />
          </clipPath>
        </defs>
        <circle className="ci-logo-intro__origin-circle" cx="56.8" cy="50" r="50" />
        <g className="ci-logo-intro__split-mark">
          <circle className="ci-logo-intro__half ci-logo-intro__half--top" cx="63.6" cy="50" r="50" clipPath={`url(#${topClipId})`} />
          <circle className="ci-logo-intro__half ci-logo-intro__half--bottom" cx="50" cy="50" r="50" clipPath={`url(#${bottomClipId})`} />
        </g>
        <g className="ci-logo-intro__slashes" transform="rotate(25 56.8 50)">
          {ciSlashRects.map((slash, index) => (
            <rect x={slash.x} y="-18" width={slash.width} height="138" rx={slash.width / 2} key={`ci-slash-${index}`} />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 113.6 100" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={topClipId}>
          <path d="M 0 0 H 113.6 V 46 H 96 V 50 H 0 Z" />
        </clipPath>
        <clipPath id={bottomClipId}>
          <path d="M 0 55 H 18 V 50 H 113.6 V 100 H 0 Z" />
        </clipPath>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="113.6" height="100">
          <rect x="0" y="0" width="113.6" height="100" fill="black" />
          <circle cx="63.6" cy="50" r="50" fill="white" clipPath={`url(#${topClipId})`} />
          <circle cx="50" cy="50" r="50" fill="white" clipPath={`url(#${bottomClipId})`} />
          <g fill="black" transform="rotate(25 56.8 50)">
            {ciSlashRects.map((slash, index) => (
              <rect x={slash.x} y="-18" width={slash.width} height="138" rx={slash.width / 2} key={`ci-mask-slash-${index}`} />
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
