import seoulIndustryMark from "../../assets/seoulind-mark.png";

type BrainallLogoProps = {
  className?: string;
  markOnly?: boolean;
};

export default function BrainallLogo({ className = "", markOnly = false }: BrainallLogoProps) {
  const logoClassName = ["brainall-logo", markOnly ? "brainall-logo--mark-only" : "", className].filter(Boolean).join(" ");

  return (
    <span className={logoClassName} aria-label="Seoul Industry">
      <img className="brainall-logo__image" src={seoulIndustryMark} alt="" draggable="false" />
    </span>
  );
}
