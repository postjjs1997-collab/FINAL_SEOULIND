type IconProps = {
  name:
    | "search"
    | "menu"
    | "close"
    | "quote"
    | "chat"
    | "headset"
    | "pin"
    | "shop"
    | "up"
    | "plus"
    | "arrow"
    | "leaf"
    | "shield"
    | "chart";
  className?: string;
};

const paths: Record<IconProps["name"], string[]> = {
  search: ["M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z", "m16.5 16.5 5 5"],
  menu: ["M4 7h18", "M4 13h18", "M4 19h18"],
  close: ["M6 6l14 14", "M20 6 6 20"],
  quote: ["M5 6h14v10H8l-3 4V6Z", "M8 9h8", "M8 12h5"],
  chat: ["M5 5h14v11H9l-4 4V5Z", "M8 9h8", "M8 12h6"],
  headset: ["M4 13a8 8 0 0 1 16 0", "M4 13v4h4v-5H4Z", "M20 13v4h-4v-5h4Z", "M15 21h-3a4 4 0 0 1-4-4"],
  pin: ["M12 21s7-5.5 7-12A7 7 0 1 0 5 9c0 6.5 7 12 7 12Z", "M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  shop: ["M5 10h14l-1 10H6L5 10Z", "M8 10V7a4 4 0 0 1 8 0v3", "M4 10l2-5h12l2 5"],
  up: ["M12 20V5", "M6 11l6-6 6 6"],
  plus: ["M12 5v14", "M5 12h14"],
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  leaf: ["M5 19c8 0 14-6 14-14C11 5 5 11 5 19Z", "M5 19c3.5-5.5 7.5-8.5 14-14"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-5"],
  chart: ["M4 19V5", "M4 19h16", "M8 16v-5", "M12 16V8", "M16 16v-8"],
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths[name].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
