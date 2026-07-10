import { useId } from "react";

type BrainallLogoProps = {
  className?: string;
  markOnly?: boolean;
};

export default function BrainallLogo({ className = "", markOnly = false }: BrainallLogoProps) {
  const reactId = useId().replace(/:/g, "");
  const maskId = `seoul-ci-logo-mask-${reactId}`;
  const topClipId = `seoul-ci-logo-top-${reactId}`;
  const bottomClipId = `seoul-ci-logo-bottom-${reactId}`;
  const logoClassName = ["brainall-logo", markOnly ? "brainall-logo--mark-only" : "", className].filter(Boolean).join(" ");

  return (
    <span className={logoClassName} aria-label="Seoul Industry">
      <svg className="brainall-logo__symbol" viewBox="0 0 113.6 100" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={topClipId}>
            <rect x="0" y="0" width="113.6" height="50" />
          </clipPath>
          <clipPath id={bottomClipId}>
            <rect x="0" y="50" width="113.6" height="50" />
          </clipPath>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="113.6" height="100">
            <rect x="0" y="0" width="113.6" height="100" fill="black" />
            <circle cx="63.6" cy="50" r="50" fill="white" clipPath={`url(#${topClipId})`} />
            <circle cx="50" cy="50" r="50" fill="white" clipPath={`url(#${bottomClipId})`} />
            <g fill="black" transform="rotate(25 56.8 50)">
              <rect x="31.6" y="-18" width="5" height="138" rx="2.5" />
              <rect x="42.9" y="-18" width="5" height="138" rx="2.5" />
              <rect x="54.2" y="-18" width="8" height="138" rx="4" />
              <rect x="68" y="-18" width="5" height="138" rx="2.5" />
              <rect x="79.3" y="-18" width="5" height="138" rx="2.5" />
            </g>
          </mask>
        </defs>
        <rect x="0" y="0" width="113.6" height="100" fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    </span>
  );
}
