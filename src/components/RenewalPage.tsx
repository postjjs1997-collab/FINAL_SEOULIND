import { useEffect, useMemo, useRef, useState } from "react";
import balanceModuleImage from "../../housing.png";
import drivelineImage from "../../driveline.png";
import electricVehicleImage from "../../electric vehicle.png";
import steeringImage from "../../steering.png";
import heroVideo from "../../assets/hero3.mp4";
import heroPoster from "../../assets/hero3-poster.jpg";
import machiningVideo from "../../machining.mp4";
import qualityVideo from "../../assets/process-videos/inspection-00-04.mp4";
import qualityPoster from "../../assets/process-videos/inspection-00-04.jpg";
import supplyVideo from "../../assets/process-videos/global-supply-08-14.mp4";
import supplyPoster from "../../assets/process-videos/global-supply-08-14.jpg";
import machiningPoster from "../../assets/clients/client-dauch.jpg";
import housingPoster from "../../assets/video-posters/housing1.jpg";
import steeringPoster from "../../assets/video-posters/steering1.jpg";
import evPoster from "../../assets/video-posters/electric-vehicle2.jpg";
import Icon from "./Icons";
import { RenewalSiteFooter, RenewalSiteHeader } from "./RenewalShell";
import { useLenisScroll } from "../motion/useLenisScroll";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import "../styles/renewal.css";

type RenewalLanguage = "ko" | "en" | "ja";

type RenewalCopy = {
  nav: Array<{ label: string; target: string; children: Array<{ label: string; target: string }> }>;
  contact: string;
  menuLabel: string;
  closeLabel: string;
  hero: Array<{ eyebrow: string; title: string[]; copy: string }>;
  prev: string;
  next: string;
  process: {
    eyebrow: string;
    title: string[];
    items: Array<{ kicker: string; title: string; copy: string; detail: string }>;
  };
  company: {
    eyebrow: string;
    title: string[];
    copy: string;
    link: string;
  };
  products: {
    eyebrow: string;
    title: string;
    link: string;
    items: Array<{ title: string; category: string; copy: string }>;
  };
  principles: {
    eyebrow: string;
    title: string[];
    link: string;
    items: Array<{ title: string; copy: string }>;
  };
  news: {
    eyebrow: string;
    title: string;
    link: string;
    items: Array<{ category: string; title: string; date: string }>;
  };
  closing: {
    eyebrow: string;
    title: string[];
    copy: string;
    link: string;
  };
  footer: {
    tagline: string;
    office: string;
    address: string;
    phone: string;
    copyright: string;
  };
};

const renewalCopy: Record<RenewalLanguage, RenewalCopy> = {
  ko: {
    nav: [
      {
        label: "회사소개",
        target: "renewal-company",
        children: [
          { label: "서울산업 소개", target: "renewal-company" },
          { label: "제조 철학", target: "renewal-principles" },
        ],
      },
      {
        label: "기술·품질",
        target: "renewal-process",
        children: [
          { label: "정밀가공", target: "renewal-process" },
          { label: "검사·양산", target: "renewal-process" },
        ],
      },
      {
        label: "제품소개",
        target: "renewal-products",
        children: [
          { label: "자동차 부품", target: "renewal-products" },
          { label: "제품 라인업", target: "renewal-products" },
        ],
      },
      {
        label: "고객지원",
        target: "renewal-news",
        children: [
          { label: "새소식", target: "renewal-news" },
          { label: "문의하기", target: "renewal-contact" },
        ],
      },
    ],
    contact: "CONTACT",
    menuLabel: "메뉴 열기",
    closeLabel: "메뉴 닫기",
    hero: [
      {
        eyebrow: "PRECISION AUTOMOTIVE COMPONENTS",
        title: ["정밀함을 가공하다,", "신뢰를 움직이다"],
        copy: "도면 검토부터 양산 공급까지, 서울산업은 자동차 핵심 부품의 완성도를 높입니다.",
      },
      {
        eyebrow: "QUALITY IN EVERY MICRON",
        title: ["측정 가능한 품질,", "흔들리지 않는 기준"],
        copy: "가공 조건과 검사 데이터를 연결해 반복 생산에서도 같은 품질을 지킵니다.",
      },
      {
        eyebrow: "OEM MANUFACTURING PARTNER",
        title: ["개발에서 양산까지,", "끊김 없는 OEM"],
        copy: "개발 일정, 생산 부하, 검사와 출하를 하나의 제조 흐름으로 관리합니다.",
      },
    ],
    prev: "이전 장면",
    next: "다음 장면",
    process: {
      eyebrow: "MANUFACTURING FLOW",
      title: ["자동차 부품의 완성도를", "만드는 다섯 개의 장면"],
      items: [
        {
          kicker: "DRAWING TO PROCESS",
          title: "정밀가공",
          copy: "부품별 도면 조건을 설비와 공정 언어로 바꾸고 반복 정밀도를 안정화합니다.",
          detail: "전용 가공 조건 · CNC 표준화 · 치수 편차 관리",
        },
        {
          kicker: "QUALITY INSPECTION",
          title: "정밀검사",
          copy: "치수와 형상, 조립 기준을 LOT 단위로 확인하고 생산 조건과 함께 추적합니다.",
          detail: "치수 검사 · 형상 측정 · 검사 이력",
        },
        {
          kicker: "AUTOMATED PRODUCTION",
          title: "공정자동화",
          copy: "설비와 이송 흐름을 연결해 작업 편차를 줄이고 안정적인 생산 리듬을 만듭니다.",
          detail: "자동 이송 · 공정 연계 · 생산성 관리",
        },
        {
          kicker: "DATA-DRIVEN QUALITY",
          title: "품질관리",
          copy: "가공과 검사 데이터를 한 흐름으로 관리해 이상 징후를 빠르게 확인합니다.",
          detail: "공정 기록 · 원인 추적 · 출하 품질",
        },
        {
          kicker: "RELIABLE DELIVERY",
          title: "양산공급",
          copy: "고객의 생산 계획에 맞춰 납기, 포장, 재고와 출하까지 함께 관리합니다.",
          detail: "OEM 대응 · 납기 관리 · 안정 공급",
        },
      ],
    },
    company: {
      eyebrow: "BUILT SINCE 1985",
      title: ["기술은 공정에 남고,", "신뢰는 제품으로 증명됩니다"],
      copy: "서울산업은 1985년 자동차 조향 부품 양산을 시작으로 정밀가공, 품질 인증, 연구개발과 글로벌 OEM 대응 역량을 넓혀 왔습니다. 화려한 말보다 반복 생산에서 흔들리지 않는 결과로 제조의 기준을 쌓습니다.",
      link: "회사 연혁 보기",
    },
    products: {
      eyebrow: "AUTOMOTIVE PARTS",
      title: "정밀가공 제품군",
      link: "제품 전체 보기",
      items: [
        { title: "Balance Module", category: "BSM", copy: "진동 저감과 동력 효율을 위한 밸런스 모듈 가공 부품" },
        { title: "Electric Vehicle", category: "EV", copy: "전동화 플랫폼의 조립성과 내구 조건을 고려한 정밀 부품" },
        { title: "Steering", category: "STEERING", copy: "조향 응답성과 안전 품질을 지지하는 피니언 샤프트 계열" },
        { title: "Driveline", category: "DRIVELINE", copy: "동력 전달과 조립 안정성을 위한 핵심 구동계 부품" },
      ],
    },
    principles: {
      eyebrow: "MANUFACTURING PRINCIPLES",
      title: ["정밀가공을 넘어,", "오래 가는 제조 기준"],
      link: "기술 역량 보기",
      items: [
        { title: "Process Stability", copy: "설비 조건과 작업 기준을 표준화해 반복 생산의 흔들림을 줄입니다." },
        { title: "Built-in Quality", copy: "품질을 마지막 검사에 맡기지 않고 공정 안에서부터 관리합니다." },
        { title: "Reliable Delivery", copy: "생산 계획과 공급 일정을 연결해 고객의 양산 흐름을 지킵니다." },
        { title: "Continuous Improvement", copy: "데이터와 현장 경험을 바탕으로 더 나은 가공 조건을 찾습니다." },
      ],
    },
    news: {
      eyebrow: "SEOUL INDUSTRY NEWS",
      title: "제조 현장의 새로운 소식",
      link: "전체 소식 보기",
      items: [
        { category: "ENTERPRISE", title: "서울산업, 글로벌 웹사이트 리뉴얼 프로젝트 진행", date: "2026.07.30" },
        { category: "QUALITY", title: "가공 데이터 기반 품질관리 프로세스 고도화", date: "2026.06.18" },
        { category: "PRODUCT", title: "BSM·EV·Steering 정밀가공 제품군 소개", date: "2026.05.24" },
        { category: "MANUFACTURING", title: "개발 대응부터 양산 공급까지 이어지는 제조 흐름", date: "2026.05.09" },
      ],
    },
    closing: {
      eyebrow: "READY TO BUILD TOGETHER",
      title: ["정밀한 부품이 필요할 때,", "서울산업과 이야기하세요"],
      copy: "도면, 개발 일정, 양산 조건을 보내주시면 필요한 제조 흐름을 함께 검토하겠습니다.",
      link: "프로젝트 문의",
    },
    footer: {
      tagline: "Precision Automotive Components OEM",
      office: "본사·공장",
      address: "경기도 화성시, 대한민국",
      phone: "031-366-1141",
      copyright: "© SEOUL INDUSTRY CO., LTD.",
    },
  },
  en: {
    nav: [
      {
        label: "COMPANY",
        target: "renewal-company",
        children: [
          { label: "About Seoul Industry", target: "renewal-company" },
          { label: "Manufacturing Values", target: "renewal-principles" },
        ],
      },
      {
        label: "TECHNOLOGY",
        target: "renewal-process",
        children: [
          { label: "Precision Machining", target: "renewal-process" },
          { label: "Quality & Supply", target: "renewal-process" },
        ],
      },
      {
        label: "PRODUCTS",
        target: "renewal-products",
        children: [
          { label: "Automotive Parts", target: "renewal-products" },
          { label: "Product Lineup", target: "renewal-products" },
        ],
      },
      {
        label: "SUPPORT",
        target: "renewal-news",
        children: [
          { label: "News", target: "renewal-news" },
          { label: "Contact", target: "renewal-contact" },
        ],
      },
    ],
    contact: "CONTACT",
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    hero: [
      {
        eyebrow: "PRECISION AUTOMOTIVE COMPONENTS",
        title: ["Machining precision,", "moving trust forward"],
        copy: "From drawing review to volume supply, Seoul Industry improves the critical parts behind every vehicle.",
      },
      {
        eyebrow: "QUALITY IN EVERY MICRON",
        title: ["Measurable quality,", "standards that hold"],
        copy: "Process conditions and inspection data stay connected, keeping repeat production consistent.",
      },
      {
        eyebrow: "OEM MANUFACTURING PARTNER",
        title: ["From development", "to dependable supply"],
        copy: "Development schedules, production load, inspection, and delivery move as one manufacturing flow.",
      },
    ],
    prev: "Previous scene",
    next: "Next scene",
    process: {
      eyebrow: "MANUFACTURING FLOW",
      title: ["Five scenes behind", "every finished component"],
      items: [
        {
          kicker: "DRAWING TO PROCESS",
          title: "Machining",
          copy: "Part drawings become stable equipment settings and repeatable precision on the production floor.",
          detail: "Dedicated setup · CNC standards · Variation control",
        },
        {
          kicker: "QUALITY INSPECTION",
          title: "Inspection",
          copy: "Dimensions, geometry, and assembly requirements are checked by lot and traced to process conditions.",
          detail: "Dimensions · Geometry · Inspection history",
        },
        {
          kicker: "AUTOMATED PRODUCTION",
          title: "Automation",
          copy: "Connected equipment and transfer flow reduce handling variation and stabilize production rhythm.",
          detail: "Automated transfer · Linked process · Output control",
        },
        {
          kicker: "DATA-DRIVEN QUALITY",
          title: "Quality Control",
          copy: "Machining and inspection data share one flow so abnormal signals can be identified early.",
          detail: "Process records · Traceability · Outgoing quality",
        },
        {
          kicker: "RELIABLE DELIVERY",
          title: "Volume Supply",
          copy: "Delivery, packing, inventory, and shipping stay aligned with every customer production plan.",
          detail: "OEM response · Delivery control · Stable supply",
        },
      ],
    },
    company: {
      eyebrow: "BUILT SINCE 1985",
      title: ["Technology stays in the process.", "Trust shows in the product."],
      copy: "Since beginning volume production of steering components in 1985, Seoul Industry has expanded its precision machining, quality certification, R&D, and global OEM capabilities. We build manufacturing standards through repeatable results.",
      link: "View our history",
    },
    products: {
      eyebrow: "AUTOMOTIVE PARTS",
      title: "Precision product lineup",
      link: "View all products",
      items: [
        { title: "Balance Module", category: "BSM", copy: "Machined balance module parts for vibration control and power efficiency." },
        { title: "Electric Vehicle", category: "EV", copy: "Precision parts engineered for EV platform assembly and durability." },
        { title: "Steering", category: "STEERING", copy: "Pinion shaft components supporting steering response and safety." },
        { title: "Driveline", category: "DRIVELINE", copy: "Core driveline components for reliable power delivery and assembly." },
      ],
    },
    principles: {
      eyebrow: "MANUFACTURING PRINCIPLES",
      title: ["Beyond machining,", "standards built to last"],
      link: "View capabilities",
      items: [
        { title: "Process Stability", copy: "Standardized equipment settings and work rules reduce variation in repeat production." },
        { title: "Built-in Quality", copy: "Quality is managed inside every process, not left to the final inspection." },
        { title: "Reliable Delivery", copy: "Production and delivery plans stay connected to protect customer schedules." },
        { title: "Continuous Improvement", copy: "Data and shop-floor experience guide better machining conditions." },
      ],
    },
    news: {
      eyebrow: "SEOUL INDUSTRY NEWS",
      title: "Latest from the manufacturing floor",
      link: "View all news",
      items: [
        { category: "ENTERPRISE", title: "Seoul Industry begins its global website renewal project", date: "2026.07.30" },
        { category: "QUALITY", title: "Advancing data-based quality management", date: "2026.06.18" },
        { category: "PRODUCT", title: "Introducing BSM, EV, and steering precision parts", date: "2026.05.24" },
        { category: "MANUFACTURING", title: "A connected flow from development to volume supply", date: "2026.05.09" },
      ],
    },
    closing: {
      eyebrow: "READY TO BUILD TOGETHER",
      title: ["When the part must be precise,", "talk to Seoul Industry"],
      copy: "Share your drawing, development window, and production requirements. We will review the right manufacturing flow with you.",
      link: "Start a project",
    },
    footer: {
      tagline: "Precision Automotive Components OEM",
      office: "Head Office & Factory",
      address: "Hwaseong, Gyeonggi-do, Korea",
      phone: "+82-31-366-1141",
      copyright: "© SEOUL INDUSTRY CO., LTD.",
    },
  },
  ja: {
    nav: [
      {
        label: "会社紹介",
        target: "renewal-company",
        children: [
          { label: "ソウル産業について", target: "renewal-company" },
          { label: "製造理念", target: "renewal-principles" },
        ],
      },
      {
        label: "技術・品質",
        target: "renewal-process",
        children: [
          { label: "精密加工", target: "renewal-process" },
          { label: "検査・量産", target: "renewal-process" },
        ],
      },
      {
        label: "製品紹介",
        target: "renewal-products",
        children: [
          { label: "自動車部品", target: "renewal-products" },
          { label: "製品ラインアップ", target: "renewal-products" },
        ],
      },
      {
        label: "サポート",
        target: "renewal-news",
        children: [
          { label: "ニュース", target: "renewal-news" },
          { label: "お問い合わせ", target: "renewal-contact" },
        ],
      },
    ],
    contact: "CONTACT",
    menuLabel: "メニューを開く",
    closeLabel: "メニューを閉じる",
    hero: [
      {
        eyebrow: "PRECISION AUTOMOTIVE COMPONENTS",
        title: ["精密を加工し、", "信頼を動かす"],
        copy: "図面検討から量産供給まで、ソウル産業は自動車主要部品の完成度を高めます。",
      },
      {
        eyebrow: "QUALITY IN EVERY MICRON",
        title: ["測定できる品質、", "揺るがない基準"],
        copy: "加工条件と検査データをつなぎ、繰り返し生産でも同じ品質を守ります。",
      },
      {
        eyebrow: "OEM MANUFACTURING PARTNER",
        title: ["開発から量産まで、", "途切れないOEM"],
        copy: "開発日程、生産負荷、検査、出荷を一つの製造フローとして管理します。",
      },
    ],
    prev: "前のシーン",
    next: "次のシーン",
    process: {
      eyebrow: "MANUFACTURING FLOW",
      title: ["自動車部品の完成度をつくる", "五つの製造シーン"],
      items: [
        {
          kicker: "DRAWING TO PROCESS",
          title: "精密加工",
          copy: "部品図面の条件を設備と工程の言語に変え、繰り返し精度を安定させます。",
          detail: "専用条件 · CNC標準化 · 寸法ばらつき管理",
        },
        {
          kicker: "QUALITY INSPECTION",
          title: "精密検査",
          copy: "寸法、形状、組立基準をロット単位で確認し、生産条件とともに追跡します。",
          detail: "寸法検査 · 形状測定 · 検査履歴",
        },
        {
          kicker: "AUTOMATED PRODUCTION",
          title: "工程自動化",
          copy: "設備と搬送フローをつなぎ、作業ばらつきを減らして安定した生産リズムをつくります。",
          detail: "自動搬送 · 工程連携 · 生産性管理",
        },
        {
          kicker: "DATA-DRIVEN QUALITY",
          title: "品質管理",
          copy: "加工と検査データを一つの流れで管理し、異常の兆候を早期に確認します。",
          detail: "工程記録 · 原因追跡 · 出荷品質",
        },
        {
          kicker: "RELIABLE DELIVERY",
          title: "量産供給",
          copy: "顧客の生産計画に合わせ、納期、梱包、在庫、出荷までを管理します。",
          detail: "OEM対応 · 納期管理 · 安定供給",
        },
      ],
    },
    company: {
      eyebrow: "BUILT SINCE 1985",
      title: ["技術は工程に残り、", "信頼は製品で証明されます"],
      copy: "ソウル産業は1985年の自動車操舵部品量産を起点に、精密加工、品質認証、研究開発、グローバルOEM対応力を広げてきました。繰り返し生産で揺るがない結果を製造基準としています。",
      link: "会社沿革を見る",
    },
    products: {
      eyebrow: "AUTOMOTIVE PARTS",
      title: "精密加工製品ラインアップ",
      link: "全製品を見る",
      items: [
        { title: "Balance Module", category: "BSM", copy: "振動低減と動力効率を支えるバランスモジュール加工部品" },
        { title: "Electric Vehicle", category: "EV", copy: "EVプラットフォームの組立性と耐久性を考慮した精密部品" },
        { title: "Steering", category: "STEERING", copy: "操舵応答性と安全品質を支えるピニオンシャフト系部品" },
        { title: "Driveline", category: "DRIVELINE", copy: "動力伝達と組立安定性を支える主要駆動系部品" },
      ],
    },
    principles: {
      eyebrow: "MANUFACTURING PRINCIPLES",
      title: ["精密加工を超えて、", "長く続く製造基準へ"],
      link: "技術力を見る",
      items: [
        { title: "Process Stability", copy: "設備条件と作業基準を標準化し、繰り返し生産のばらつきを抑えます。" },
        { title: "Built-in Quality", copy: "品質を最終検査だけに任せず、工程の中から管理します。" },
        { title: "Reliable Delivery", copy: "生産計画と供給日程をつなぎ、顧客の量産フローを守ります。" },
        { title: "Continuous Improvement", copy: "データと現場経験をもとに、より良い加工条件を追求します。" },
      ],
    },
    news: {
      eyebrow: "SEOUL INDUSTRY NEWS",
      title: "製造現場からの最新情報",
      link: "ニュース一覧",
      items: [
        { category: "ENTERPRISE", title: "ソウル産業、グローバルウェブサイト刷新プロジェクトを開始", date: "2026.07.30" },
        { category: "QUALITY", title: "加工データに基づく品質管理プロセスを高度化", date: "2026.06.18" },
        { category: "PRODUCT", title: "BSM・EV・Steering精密加工製品群のご紹介", date: "2026.05.24" },
        { category: "MANUFACTURING", title: "開発対応から量産供給までつながる製造フロー", date: "2026.05.09" },
      ],
    },
    closing: {
      eyebrow: "READY TO BUILD TOGETHER",
      title: ["精密な部品が必要なとき、", "ソウル産業にご相談ください"],
      copy: "図面、開発日程、量産条件をお送りいただければ、最適な製造フローを一緒に検討します。",
      link: "プロジェクト相談",
    },
    footer: {
      tagline: "Precision Automotive Components OEM",
      office: "本社・工場",
      address: "韓国 京畿道 華城市",
      phone: "+82-31-366-1141",
      copyright: "© SEOUL INDUSTRY CO., LTD.",
    },
  },
};

const heroMedia = [
  { video: machiningVideo, poster: machiningPoster },
  { video: qualityVideo, poster: qualityPoster },
  { video: supplyVideo, poster: supplyPoster },
];

const HERO_SLIDE_DURATION_MS = 3000;

const processMedia = [
  { video: machiningVideo, poster: machiningPoster },
  { video: qualityVideo, poster: qualityPoster },
  { video: supplyVideo, poster: supplyPoster },
  { video: qualityVideo, poster: qualityPoster },
  { video: supplyVideo, poster: supplyPoster },
];

const productImages = [balanceModuleImage, electricVehicleImage, steeringImage, drivelineImage];
const productRoutes = [
  "#/products/balance-shaft-module",
  "#/products/electric-vehicle",
  "#/products/steering",
  "#/products/driveline",
];
const principleImages = [housingPoster, steeringPoster, evPoster, heroPoster];
const newsImages = [machiningPoster, qualityPoster, evPoster, supplyPoster];

function scrollToSection(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useRevealObserver() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-renewal-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useStickyScene(ref: React.RefObject<HTMLElement | null>, itemCount: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const next = Math.min(itemCount - 1, Math.floor(progress * itemCount));
      setActive((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [itemCount, ref]);

  return active;
}

function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const next = Math.min(1, Math.max(0, (viewport - rect.top) / (rect.height + viewport * 0.35)));
      setProgress((current) => (Math.abs(current - next) < 0.004 ? current : next));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

function RenewalHero({ copy, reducedMotion }: { copy: RenewalCopy; reducedMotion: boolean }) {
  const [active, setActive] = useState(0);
  const slideCount = copy.hero.length;

  useEffect(() => {
    if (reducedMotion) return;
    const timeout = window.setTimeout(() => setActive((current) => (current + 1) % slideCount), HERO_SLIDE_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [active, reducedMotion, slideCount]);

  const go = (direction: number) => {
    setActive((current) => (current + direction + slideCount) % slideCount);
  };

  return (
    <section className="renewal-hero" aria-label="Seoul Industry">
      <div className="renewal-hero__media" key={`media-${active}`}>
        <video src={heroMedia[active].video} poster={heroMedia[active].poster} autoPlay={!reducedMotion} muted loop playsInline preload="metadata" />
      </div>
      <div className="renewal-hero__shade" />
      <div className="renewal-hero__content" key={`copy-${active}`}>
        <span>{copy.hero[active].eyebrow}</span>
        <h1>
          {copy.hero[active].title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p>{copy.hero[active].copy}</p>
      </div>

      <div className="renewal-hero__controls">
        <button type="button" onClick={() => go(-1)} aria-label={copy.prev}>
          <Icon name="arrow" className="is-reversed" />
          <span>PREV</span>
        </button>
        <div aria-hidden="true">
          {copy.hero.map((slide, index) => (
            <i className={active === index ? "is-active" : ""} key={slide.eyebrow} />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label={copy.next}>
          <span>NEXT</span>
          <Icon name="arrow" />
        </button>
      </div>

      <button className="renewal-scroll-cue" type="button" onClick={() => scrollToSection("renewal-process")}>
        <span>SCROLL</span>
        <i />
      </button>
    </section>
  );
}

function ProcessSection({ copy, reducedMotion }: { copy: RenewalCopy; reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const active = useStickyScene(sectionRef, copy.process.items.length);
  const item = copy.process.items[active];

  return (
    <section className="renewal-process" id="renewal-process" ref={sectionRef}>
      <div className="renewal-process__sticky">
        <div className="renewal-process__background" aria-hidden="true">
          <span>PRECISION</span>
          <span>PROCESS</span>
        </div>
        <div className="renewal-process__heading">
          <span>{copy.process.eyebrow}</span>
          <h2>
            {copy.process.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
        </div>
        <div className="renewal-process__stage">
          <div className="renewal-process__card" key={`${active}-${item.title}`}>
            <div className="renewal-process__media">
              <video
                src={processMedia[active].video}
                poster={processMedia[active].poster}
                autoPlay={!reducedMotion}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="renewal-process__media-meta">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <div>
                  {copy.process.items.map((processItem, index) => (
                    <i className={active === index ? "is-active" : ""} key={processItem.title} />
                  ))}
                </div>
              </div>
            </div>
            <div className="renewal-process__copy">
              <span>{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <strong>{item.detail}</strong>
            </div>
          </div>
          <div className="renewal-process__counter" aria-hidden="true">
            <strong>{String(active + 1).padStart(2, "0")}</strong>
            <span />
            <small>{String(copy.process.items.length).padStart(2, "0")}</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanySection({ copy }: { copy: RenewalCopy }) {
  return (
    <section className="renewal-company" id="renewal-company">
      <div className="renewal-company__line" aria-hidden="true">
        <span>SEOUL INDUSTRY</span>
      </div>
      <div className="renewal-company__inner">
        <span data-renewal-reveal>{copy.company.eyebrow}</span>
        <h2 data-renewal-reveal>
          {copy.company.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className="renewal-company__bottom" data-renewal-reveal>
          <p>{copy.company.copy}</p>
          <a href="#/company/history" className="renewal-arrow-link">
            <span>{copy.company.link}</span>
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductsSection({ copy }: { copy: RenewalCopy }) {
  return (
    <section className="renewal-products" id="renewal-products">
      <div className="renewal-section-heading" data-renewal-reveal>
        <div>
          <span>{copy.products.eyebrow}</span>
          <h2>{copy.products.title}</h2>
        </div>
        <a href="#/products/electric-vehicle" className="renewal-arrow-link">
          <span>{copy.products.link}</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="renewal-products__grid">
        {copy.products.items.map((item, index) => (
          <a href={productRoutes[index]} className="renewal-product-card" data-renewal-reveal key={item.title}>
            <div className="renewal-product-card__top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.category}</strong>
            </div>
            <div className="renewal-product-card__image">
              <img src={productImages[index]} alt="" />
            </div>
            <div className="renewal-product-card__copy">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Icon name="arrow" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function PrinciplesSection({ copy }: { copy: RenewalCopy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);

  return (
    <section className="renewal-principles" id="renewal-principles" ref={sectionRef}>
      <div className="renewal-principles__word" aria-hidden="true">
        SEOUL INDUSTRY
      </div>
      <div className="renewal-principles__heading" data-renewal-reveal>
        <span>{copy.principles.eyebrow}</span>
        <h2>
          {copy.principles.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <a href="#/quality/system" className="renewal-arrow-link">
          <span>{copy.principles.link}</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="renewal-principles__cards">
        {copy.principles.items.map((item, index) => {
          const offset = Math.max(0, 1 - progress) * (index % 2 === 0 ? 110 : 165);
          return (
            <article className="renewal-principle-card" style={{ transform: `translate3d(0, ${offset}px, 0)` }} key={item.title}>
              <img src={principleImages[index]} alt="" />
              <div>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function NewsSection({ copy }: { copy: RenewalCopy }) {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <section className="renewal-news" id="renewal-news">
      <div className="renewal-section-heading" data-renewal-reveal>
        <div>
          <span>{copy.news.eyebrow}</span>
          <h2>{copy.news.title}</h2>
        </div>
        <div className="renewal-news__controls">
          <button type="button" onClick={() => move(-1)} aria-label={copy.prev}>
            <Icon name="arrow" className="is-reversed" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={copy.next}>
            <Icon name="arrow" />
          </button>
        </div>
      </div>
      <div className="renewal-news__rail" ref={railRef}>
        {copy.news.items.map((item, index) => (
          <a href="#/company/notices" className="renewal-news-card" key={item.title}>
            <div className="renewal-news-card__image">
              <img src={newsImages[index]} alt="" />
              <span>{item.category}</span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <time>{item.date}</time>
            </div>
          </a>
        ))}
      </div>
      <a href="#/company/notices" className="renewal-news__all">
        <span>{copy.news.link}</span>
        <Icon name="arrow" />
      </a>
    </section>
  );
}

function ContactSection({ copy }: { copy: RenewalCopy }) {
  return (
    <section className="renewal-closing" id="renewal-contact">
      <video src={heroVideo} poster={heroPoster} autoPlay muted loop playsInline preload="metadata" />
      <div className="renewal-closing__shade" />
      <div className="renewal-closing__inner" data-renewal-reveal>
        <span>{copy.closing.eyebrow}</span>
        <h2>
          {copy.closing.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{copy.closing.copy}</p>
        <a href="#/company/location">
          <span>{copy.closing.link}</span>
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}

export default function RenewalPage() {
  const reducedMotion = usePrefersReducedMotion();
  const [language, setLanguage] = useState<RenewalLanguage>(() => {
    if (typeof window === "undefined") return "ko";
    const saved = window.localStorage.getItem("seoulind-language");
    return saved === "en" || saved === "ja" ? saved : "ko";
  });
  const copy = useMemo(() => renewalCopy[language], [language]);

  useLenisScroll(!reducedMotion);
  useRevealObserver();

  useEffect(() => {
    document.body.classList.add("renewal-active");
    document.documentElement.lang = language === "ko" ? "ko-KR" : language === "ja" ? "ja-JP" : "en";
    window.localStorage.setItem("seoulind-language", language);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      document.body.classList.remove("renewal-active");
    };
  }, [language]);

  return (
    <div className="renewal-page" data-language={language}>
      <RenewalSiteHeader language={language} onLanguageChange={setLanguage} />
      <main>
        <RenewalHero copy={copy} reducedMotion={reducedMotion} />
        <ProcessSection copy={copy} reducedMotion={reducedMotion} />
        <CompanySection copy={copy} />
        <ProductsSection copy={copy} />
        <PrinciplesSection copy={copy} />
        <NewsSection copy={copy} />
        <ContactSection copy={copy} />
      </main>
      <RenewalSiteFooter language={language} />
    </div>
  );
}
