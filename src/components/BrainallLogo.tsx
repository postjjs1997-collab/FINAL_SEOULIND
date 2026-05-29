type BrainallLogoProps = {
  className?: string;
  markOnly?: boolean;
};

export default function BrainallLogo({ className = "", markOnly = false }: BrainallLogoProps) {
  return (
    <span className={`brainall-logo ${markOnly ? "brainall-logo--mark-only" : ""} ${className}`.trim()} aria-label="Seoul Industry">
      <span className="brainall-logo__emblem" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      {!markOnly && <span className="brainall-logo__word">SEOUL IND.</span>}
    </span>
  );
}
