import { useEffect, useMemo, useState } from "react";
import balanceModuleImage from "../../assets/product-lineup/balance-module.jpg";
import drivelineImage from "../../assets/product-lineup/driveline.jpg";
import electricVehicleImage from "../../assets/product-lineup/electric-vehicle.jpg";
import powertrainImage from "../../assets/video-posters/powertrain/8l90-output-shafts.jpg";
import steeringImage from "../../assets/product-lineup/steering.jpg";
import heroVideo from "../../assets/hero3.mp4";
import heroPoster from "../../assets/hero3-poster.jpg";
import machiningVideo from "../../machining.mp4";
import qualityVideo from "../../assets/process-videos/inspection-00-04.mp4";
import qualityPoster from "../../assets/process-videos/inspection-00-04.jpg";
import supplyVideo from "../../assets/process-videos/global-supply-08-14.mp4";
import supplyPoster from "../../assets/process-videos/global-supply-08-14.jpg";
import machiningPoster from "../../assets/clients/client-dauch.jpg";
import facadeImage from "../../assets/company-profile/seoul-industry-facade-sign.webp";
import iatfCertificateImage from "../../assets/certificates/iatf-16949-seoul-industry.png";
import iatfCertificatePdf from "../../assets/certificates/iatf-16949-seoul-industry.pdf";
import msqCertificateImage from "../../assets/certificates/msq-seoul-industry-2025.png";
import dauchLogo from "../../assets/partner-dauch.svg";
import gknLogo from "../../assets/partner-gkn.svg";
import hanseaLogo from "../../assets/partner-kdac.svg";
import magnaLogo from "../../assets/partner-magna.svg";
import mobisLogo from "../../assets/partner-mobis.svg";
import muncieLogo from "../../assets/partner-mpt.svg";
import nexteerLogo from "../../assets/partner-nexteer.png";
import spartanLogo from "../../assets/partner-spartan.svg";
import trwLogo from "../../assets/partner-trw.svg";
import Icon from "./Icons";
import { RenewalSiteFooter, RenewalSiteHeader } from "./RenewalShell";
import { useLenisScroll } from "../motion/useLenisScroll";
import { jumpToPageTop } from "../utils/pageScroll";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import {
  companyOverviewCopy,
  manufacturingPageCopy,
  manufacturingProcesses,
  qualityEvidenceCopy,
} from "../data/companyProfile";
import { productPartCatalogByRoute } from "../data/productCatalog";
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
    copy: string;
    link: string;
    items: Array<{ title: string; copy: string; detail: string }>;
  };
  partners: {
    eyebrow: string;
    title: string[];
    copy: string;
    link: string;
    regions: string;
    officialSite: string;
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
        { title: "Electric Vehicle", category: "EV", copy: "전동화 플랫폼의 조립성과 내구 조건을 고려한 정밀 부품" },
        { title: "Powertrain", category: "POWERTRAIN", copy: "Powertrain Shaft와 Sun Gear Output Shaft, Clutch Hub·Disc Carrier 계열" },
        { title: "Driveline", category: "DRIVELINE", copy: "8L90 Input Shaft와 Transfer Case Actuator·10R TRS Stator Shaft 계열" },
        { title: "Balance Shaft Module", category: "BSM", copy: "진동 저감과 동력 효율을 위한 밸런스 샤프트 모듈 가공 부품" },
        { title: "Steering", category: "STEERING", copy: "조향 응답성과 안전 품질을 지지하는 피니언 샤프트 계열" },
      ],
    },
    principles: {
      eyebrow: "SEOUL INDUSTRY STANDARD",
      title: ["공정에서 확인하고,", "제품으로 증명합니다"],
      copy: "서울산업은 가공, 검사, 양산 대응을 서로 떨어진 단계로 보지 않습니다. 도면 검토부터 공정 조건, 측정 결과와 출하 일정까지 하나의 흐름으로 관리해 반복 생산의 신뢰를 만듭니다.",
      link: "생산기술 자세히 보기",
      items: [
        {
          title: "정밀 공정기술",
          copy: "도면과 소재, 부품 형상에 맞춰 CNC 선삭과 기어·스플라인, 연삭 조건을 설계합니다. 설비별 기준을 표준화해 반복 양산에서도 치수와 표면 품질의 편차를 줄입니다.",
          detail: "공정설계 · 전용 가공조건 · 반복정밀도",
        },
        {
          title: "공정 내 품질관리",
          copy: "주요 치수와 형상은 3차원 측정과 전용 검사를 통해 확인합니다. 검사 결과를 설비 조건과 LOT 이력에 연결해 이상 징후를 출하 전에 추적하고 개선합니다.",
          detail: "3차원 측정 · 자동검사 · 품질이력",
        },
        {
          title: "안정적 양산 대응",
          copy: "자동화 설비와 검사 공정을 연결해 생산 흐름을 안정적으로 유지합니다. 개발 일정부터 양산과 출하까지 고객의 공급 계획에 맞춰 대응합니다.",
          detail: "자동화 · 공정연계 · 양산대응",
        },
      ],
    },
    partners: {
      eyebrow: "GLOBAL OEM NETWORK",
      title: ["세계의 자동차 산업과,", "정밀가공으로 연결됩니다"],
      copy: "서울산업은 조향, 드라이브라인, 파워트레인과 전동화 부품 프로그램을 통해 국내외 고객과 양산 경험을 축적해 왔습니다. 개발 대응부터 품질 기록, 납기와 공급 안정성까지 같은 기준으로 관리하며 장기적인 제조 파트너십을 이어갑니다.",
      link: "파트너십 연혁 보기",
      regions: "KOREA · NORTH AMERICA · EUROPE · CHINA · JAPAN",
      officialSite: "공식 홈페이지",
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
        { title: "Electric Vehicle", category: "EV", copy: "Precision parts engineered for EV platform assembly and durability." },
        { title: "Powertrain", category: "POWERTRAIN", copy: "Powertrain shafts, sun-gear output shafts, clutch hubs, and disc carriers." },
        { title: "Driveline", category: "DRIVELINE", copy: "8L90 input, transfer-case actuator, and 10R TRS stator shafts." },
        { title: "Balance Shaft Module", category: "BSM", copy: "Machined balance shaft module parts for vibration control and power efficiency." },
        { title: "Steering", category: "STEERING", copy: "Pinion shaft components supporting steering response and safety." },
      ],
    },
    principles: {
      eyebrow: "SEOUL INDUSTRY STANDARD",
      title: ["Verified in every process,", "proven in every part"],
      copy: "Machining, inspection, and volume-production response are managed as one connected system. From drawing review and process settings to measurement records and delivery schedules, each decision supports repeatable manufacturing.",
      link: "Explore production technology",
      items: [
        {
          title: "Precision Process Engineering",
          copy: "CNC turning, gear and spline machining, and grinding conditions are engineered around each drawing, material, and part geometry. Standardized equipment settings reduce dimensional and surface-quality variation in repeat production.",
          detail: "Process design · Dedicated conditions · Repeatability",
        },
        {
          title: "Quality Built into the Process",
          copy: "Critical dimensions and geometry are verified through CMM and dedicated inspection. Results are linked to equipment conditions and lot records so potential issues can be traced and corrected before shipment.",
          detail: "CMM · Automated inspection · Traceability",
        },
        {
          title: "Reliable Volume Production",
          copy: "Automation and inspection are connected to keep production flow stable. From development timing through volume production and shipment, our response stays aligned with each customer supply plan.",
          detail: "Automation · Connected operations · OEM response",
        },
      ],
    },
    partners: {
      eyebrow: "GLOBAL OEM NETWORK",
      title: ["Precision connects", "global mobility"],
      copy: "Seoul Industry has built volume-production experience with customers in steering, driveline, powertrain, and electrification programs. From development response and quality records to delivery and supply stability, one consistent standard supports every long-term manufacturing partnership.",
      link: "View partnership history",
      regions: "KOREA · NORTH AMERICA · EUROPE · CHINA · JAPAN",
      officialSite: "Official website",
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
        { title: "Electric Vehicle", category: "EV", copy: "EVプラットフォームの組立性と耐久性を考慮した精密部品" },
        { title: "Powertrain", category: "POWERTRAIN", copy: "Powertrain Shaft、Sun Gear Output Shaft、Clutch Hub、Disc Carrier系列" },
        { title: "Driveline", category: "DRIVELINE", copy: "8L90 Input、Transfer Case Actuator、10R TRS Stator Shaft系列" },
        { title: "Balance Shaft Module", category: "BSM", copy: "振動低減と動力効率を支えるバランスシャフトモジュール加工部品" },
        { title: "Steering", category: "STEERING", copy: "操舵応答性と安全品質を支えるピニオンシャフト系部品" },
      ],
    },
    principles: {
      eyebrow: "SEOUL INDUSTRY STANDARD",
      title: ["工程で確かめ、", "製品で証明します"],
      copy: "加工、検査、量産対応を別々の段階として扱わず、一つの生産システムとして管理します。図面検討から工程条件、測定記録、出荷日程までをつなぎ、繰り返し生産の信頼性を高めます。",
      link: "生産技術を見る",
      items: [
        {
          title: "精密工程技術",
          copy: "図面、素材、部品形状に合わせてCNC旋削、ギヤ・スプライン加工、研削条件を設計します。設備ごとの基準を標準化し、繰り返し量産でも寸法と表面品質のばらつきを抑えます。",
          detail: "工程設計 · 専用加工条件 · 繰り返し精度",
        },
        {
          title: "工程内品質管理",
          copy: "主要寸法と形状を三次元測定および専用検査で確認します。測定結果を設備条件とロット履歴につなぎ、異常の兆候を出荷前に追跡・改善します。",
          detail: "三次元測定 · 自動検査 · 品質履歴",
        },
        {
          title: "安定した量産対応",
          copy: "自動化設備と検査工程をつなぎ、安定した生産フローを維持します。開発日程から量産・出荷まで、顧客の供給計画に合わせて対応します。",
          detail: "自動化 · 工程連携 · 量産対応",
        },
      ],
    },
    partners: {
      eyebrow: "GLOBAL OEM NETWORK",
      title: ["世界の自動車産業と、", "精密加工でつながります"],
      copy: "ソウル産業は操舵、ドライブライン、パワートレイン、電動化部品の各プログラムを通じて、国内外のお客様との量産実績を積み重ねてきました。開発対応から品質記録、納期、安定供給まで一貫した基準で管理し、長期的な製造パートナーシップを築いています。",
      link: "パートナーシップ沿革を見る",
      regions: "KOREA · NORTH AMERICA · EUROPE · CHINA · JAPAN",
      officialSite: "公式サイト",
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

const productImages = [electricVehicleImage, powertrainImage, drivelineImage, balanceModuleImage, steeringImage];
const productRoutes = [
  "#/products/electric-vehicle",
  "#/products/powertrain",
  "#/products/driveline",
  "#/products/balance-shaft-module",
  "#/products/steering",
];
const productRouteKeys = [
  "products/electric-vehicle",
  "products/powertrain",
  "products/driveline",
  "products/balance-shaft-module",
  "products/steering",
];

const featuredProcesses = ["cnc-lathe", "hobbing", "induction", "auto-inspection"]
  .map((id) => manufacturingProcesses.find((process) => process.id === id))
  .filter((process): process is (typeof manufacturingProcesses)[number] => Boolean(process));

const homeUiCopy = {
  ko: {
    companyLink: "회사 정보 자세히 보기",
    productActual: "실제 생산 부품",
    productSystem: "적용 시스템",
    manufacturingLink: "전체 생산기술 보기",
    processStep: "핵심 공정",
    qualityEyebrow: "QUALITY ASSURANCE",
    qualityLink: "품질 시스템 자세히 보기",
    certificateEyebrow: "CERTIFIED QUALITY SYSTEM",
    certificateTitle: "문서가 아니라 생산 현장에서 작동하는 품질 기준",
    certificateCopy: "전용 검사와 정밀 측정 결과를 공정 조건, 교정, 출하 판정에 연결합니다. IATF 16949와 현대모비스 MSQ 인증은 이 운영 체계를 고객 기준으로 검증한 결과입니다.",
    certificateView: "원본 인증서 보기",
    iatf: "IATF 16949 품질경영시스템",
    msq: "현대모비스 MSQ 공급사 품질 인증",
  },
  en: {
    companyLink: "View company profile",
    productActual: "Production part",
    productSystem: "Application system",
    manufacturingLink: "View all capabilities",
    processStep: "Core process",
    qualityEyebrow: "QUALITY ASSURANCE",
    qualityLink: "View quality system",
    certificateEyebrow: "CERTIFIED QUALITY SYSTEM",
    certificateTitle: "Quality standards that operate on the production floor",
    certificateCopy: "Dedicated inspection and precision measurement feed back into process settings, straightening, and shipment decisions. IATF 16949 and Hyundai Mobis MSQ certify this operating system against customer requirements.",
    certificateView: "View original certificate",
    iatf: "IATF 16949 Quality Management System",
    msq: "Hyundai Mobis MSQ Supplier Quality",
  },
  ja: {
    companyLink: "会社情報を見る",
    productActual: "実際の生産部品",
    productSystem: "適用システム",
    manufacturingLink: "生産技術一覧を見る",
    processStep: "主要工程",
    qualityEyebrow: "QUALITY ASSURANCE",
    qualityLink: "品質システムを見る",
    certificateEyebrow: "CERTIFIED QUALITY SYSTEM",
    certificateTitle: "生産現場で機能する品質基準",
    certificateCopy: "専用検査と精密測定の結果を工程条件、矯正、出荷判定へつなぎます。IATF 16949と現代モービスMSQ認証は、この運用体制を顧客基準で検証した結果です。",
    certificateView: "認証書原本を見る",
    iatf: "IATF 16949 品質マネジメントシステム",
    msq: "現代モービスMSQサプライヤー品質認証",
  },
} satisfies Record<RenewalLanguage, Record<string, string>>;

const renewalPartners = [
  { name: "Dauch Corporation (AAM)", market: "USA", logo: dauchLogo, href: "https://www.aam.com/" },
  { name: "Spartan Light Metal Products", market: "USA", logo: spartanLogo, href: "https://spartanlmp.com/" },
  {
    name: "ZF TRW",
    market: "KOREA / GLOBAL",
    logo: trwLogo,
    href: "https://aftermarket.zf.com/en/aftermarket-portal/our-brands/trw/",
  },
  { name: "Hyundai Mobis", market: "KOREA", logo: mobisLogo, href: "https://www.mobis.com/" },
  { name: "Nexteer Automotive", market: "GLOBAL", logo: nexteerLogo, href: "https://www.nexteer.com/" },
  { name: "Hansea Mobility", market: "KOREA", logo: hanseaLogo, href: "https://www.hansaemobility.com/" },
  { name: "GKN Automotive", market: "GLOBAL", logo: gknLogo, href: "https://www.gknautomotive.com/" },
  { name: "Muncie Power Products", market: "USA", logo: muncieLogo, href: "https://www.munciepower.com/" },
  { name: "Magna Powertrain", market: "GLOBAL", logo: magnaLogo, href: "https://www.magna.com/" },
];

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

      <button className="renewal-scroll-cue" type="button" onClick={() => scrollToSection("renewal-company")}>
        <span>SCROLL</span>
        <i />
      </button>
    </section>
  );
}

function CompanySection({ language }: { language: RenewalLanguage }) {
  const profile = companyOverviewCopy[language];
  const ui = homeUiCopy[language];

  return (
    <section className="renewal-company" id="renewal-company">
      <div className="renewal-company__inner">
        <figure className="renewal-company__visual" data-renewal-reveal>
          <img src={facadeImage} alt="Seoul Industry" />
          <figcaption>
            <span>SINCE</span>
            <strong>1985</strong>
          </figcaption>
        </figure>
        <div className="renewal-company__content">
          <span data-renewal-reveal>{profile.eyebrow}</span>
          <h2 data-renewal-reveal>{profile.title}</h2>
          <p data-renewal-reveal>{profile.copy}</p>
          <dl className="renewal-company__facts" data-renewal-reveal>
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="renewal-company__systems" data-renewal-reveal>
            {profile.systems.map((system) => (
              <span key={system}>{system}</span>
            ))}
          </div>
          <a href="#/company/overview" className="renewal-arrow-link" data-renewal-reveal>
            <span>{ui.companyLink}</span>
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductsSection({ copy, language }: { copy: RenewalCopy; language: RenewalLanguage }) {
  const ui = homeUiCopy[language];

  return (
    <section className="renewal-products renewal-portfolio" id="renewal-products">
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
        {copy.products.items.map((item, index) => {
          const catalog = productPartCatalogByRoute[productRouteKeys[index]];
          const actualPart = catalog.parts[0];

          return (
            <a href={productRoutes[index]} className="renewal-product-card" data-renewal-reveal key={item.title}>
              <div className="renewal-product-card__top">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.category}</strong>
              </div>
              <div className="renewal-product-card__image">
                <img src={productImages[index]} alt={`${item.title} ${ui.productSystem}`} />
                <span>{ui.productSystem}</span>
              </div>
              <div className="renewal-product-card__actual">
                <img src={actualPart.poster} alt={actualPart.title[language]} loading="lazy" />
                <span>
                  <small>{ui.productActual}</small>
                  <strong>{actualPart.title[language]}</strong>
                </span>
              </div>
              <div className="renewal-product-card__copy">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Icon name="arrow" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function ManufacturingSection({ language, reducedMotion }: { language: RenewalLanguage; reducedMotion: boolean }) {
  const copy = manufacturingPageCopy[language];
  const ui = homeUiCopy[language];

  return (
    <section className="renewal-capability" id="renewal-process">
      <div className="renewal-capability__heading" data-renewal-reveal>
        <div>
          <span>{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
          <p>{copy.copy}</p>
        </div>
        <a href="#/manufacturing/process" className="renewal-arrow-link">
          <span>{ui.manufacturingLink}</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="renewal-capability__grid">
        {featuredProcesses.map((process, index) => (
          <article className={index === 0 ? "is-featured" : ""} data-renewal-reveal key={process.id}>
            <figure>
              {process.video ? (
                <video
                  src={process.video}
                  poster={process.image}
                  autoPlay={!reducedMotion}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img src={process.image} alt={process.title} loading="lazy" />
              )}
              <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
            <div>
              <span>{ui.processStep}</span>
              <h3>{process.title}</h3>
              <p>{process.copy[language]}</p>
              <strong>{process.capability[language]}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PartnersSection({ copy }: { copy: RenewalCopy }) {
  return (
    <section className="renewal-partners" id="renewal-partners">
      <div className="renewal-partners__word" aria-hidden="true">
        GLOBAL PARTNERS
      </div>
      <div className="renewal-partners__intro" data-renewal-reveal>
        <span>{copy.partners.eyebrow}</span>
        <h2>
          {copy.partners.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{copy.partners.copy}</p>
        <strong>{copy.partners.regions}</strong>
        <a href="#/company/history" className="renewal-arrow-link">
          <span>{copy.partners.link}</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="renewal-partners__grid">
        {renewalPartners.map((partner) => (
          <a
            className="renewal-partner"
            data-renewal-reveal
            href={partner.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${partner.name} ${copy.partners.officialSite}`}
            key={partner.name}
          >
            <span className="renewal-partner__logo">
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </span>
            <span className="renewal-partner__meta">
              <span>
                <strong>{partner.name}</strong>
                <small>{partner.market}</small>
              </span>
              <Icon name="arrow" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function QualitySection({ language, reducedMotion }: { language: RenewalLanguage; reducedMotion: boolean }) {
  const evidence = qualityEvidenceCopy[language];
  const ui = homeUiCopy[language];

  return (
    <section className="renewal-quality" id="renewal-principles">
      <div className="renewal-quality__heading" data-renewal-reveal>
        <div>
          <span>{ui.qualityEyebrow}</span>
          <h2>{evidence.title}</h2>
          <p>{evidence.copy}</p>
        </div>
        <a href="#/quality/system" className="renewal-arrow-link">
          <span>{ui.qualityLink}</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="renewal-quality__body">
        <figure className="renewal-quality__inspection" data-renewal-reveal>
          <video
            src={qualityVideo}
            poster={qualityPoster}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
          />
          <figcaption>
            <span>01</span>
            <strong>PRECISION INSPECTION</strong>
          </figcaption>
        </figure>
        <div className="renewal-quality__certificates">
          <header data-renewal-reveal>
            <span>{ui.certificateEyebrow}</span>
            <h3>{ui.certificateTitle}</h3>
            <p>{ui.certificateCopy}</p>
          </header>
          <div>
            <a href={iatfCertificatePdf} target="_blank" rel="noreferrer" data-renewal-reveal>
              <figure>
                <img src={iatfCertificateImage} alt={ui.iatf} loading="lazy" />
              </figure>
              <span>
                <strong>{ui.iatf}</strong>
                <small>{ui.certificateView}</small>
              </span>
              <Icon name="arrow" />
            </a>
            <a href={msqCertificateImage} target="_blank" rel="noreferrer" data-renewal-reveal>
              <figure>
                <img src={msqCertificateImage} alt={ui.msq} loading="lazy" />
              </figure>
              <span>
                <strong>{ui.msq}</strong>
                <small>{ui.certificateView}</small>
              </span>
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SustainabilityBridge({ language }: { language: RenewalLanguage }) {
  const copy = {
    ko: {
      eyebrow: "SUSTAINABLE MANUFACTURING",
      title: "정밀가공의 책임을 환경·안전·윤리 기준으로 이어갑니다.",
      text: "에너지와 자원 사용을 줄이고, 안전한 작업환경과 투명한 거래 기준을 지키며 지속 가능한 제조 파트너십을 구축합니다.",
      link: "지속가능경영 정책 보기",
    },
    en: {
      eyebrow: "SUSTAINABLE MANUFACTURING",
      title: "Extending precision manufacturing into environmental, safety, and ethical standards.",
      text: "We reduce energy and resource use, protect workplace safety, and maintain transparent business standards for long-term manufacturing partnerships.",
      link: "View sustainability policy",
    },
    ja: {
      eyebrow: "SUSTAINABLE MANUFACTURING",
      title: "精密加工の責任を環境・安全・倫理基準へつなげます。",
      text: "エネルギーと資源使用を減らし、安全な職場と透明な取引基準を守り、持続可能な製造パートナーシップを築きます。",
      link: "持続可能経営方針を見る",
    },
  }[language];

  return (
    <section className="renewal-sustainability" data-renewal-reveal>
      <span>{copy.eyebrow}</span>
      <h2>{copy.title}</h2>
      <p>{copy.text}</p>
      <a href="#/sustainability/policy" className="renewal-arrow-link">
        <span>{copy.link}</span>
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
    jumpToPageTop();

    return () => {
      document.body.classList.remove("renewal-active");
    };
  }, [language]);

  return (
    <div className="renewal-page" data-language={language}>
      <RenewalSiteHeader language={language} onLanguageChange={setLanguage} />
      <main>
        <RenewalHero copy={copy} reducedMotion={reducedMotion} />
        <CompanySection language={language} />
        <ProductsSection copy={copy} language={language} />
        <ManufacturingSection language={language} reducedMotion={reducedMotion} />
        <QualitySection language={language} reducedMotion={reducedMotion} />
        <PartnersSection copy={copy} />
        <SustainabilityBridge language={language} />
        <ContactSection copy={copy} />
      </main>
      <RenewalSiteFooter language={language} />
    </div>
  );
}
