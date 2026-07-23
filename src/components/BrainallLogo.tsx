import { useId } from "react";
import seoulIndustrySymbolMask from "../../assets/seoul-industry-symbol-mask.png";

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
            <rect x="0" y="0" width="113.6" height="50.8" />
          </clipPath>
          <clipPath id={bottomClipId}>
            <rect x="0" y="49.2" width="113.6" height="50.8" />
          </clipPath>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="113.6" height="100">
            <image href={seoulIndustrySymbolMask} x="0" y="0" width="113.6" height="100" preserveAspectRatio="none" />
          </mask>
        </defs>
        <circle className="ci-logo-intro__origin-circle" cx="56.8" cy="50" r="50" />
        <g className="ci-logo-intro__split-mark">
          <rect className="ci-logo-intro__half ci-logo-intro__half--top" x="0" y="0" width="113.6" height="100" clipPath={`url(#${topClipId})`} mask={`url(#${maskId})`} />
          <rect className="ci-logo-intro__half ci-logo-intro__half--bottom" x="0" y="0" width="113.6" height="100" clipPath={`url(#${bottomClipId})`} mask={`url(#${maskId})`} />
        </g>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 113.6 100" aria-hidden="true" focusable="false">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="113.6" height="100">
          <image href={seoulIndustrySymbolMask} x="0" y="0" width="113.6" height="100" preserveAspectRatio="none" />
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
