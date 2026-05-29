export type LanguageCode = "ko" | "en" | "ja";

import partnerGknLogo from "../../assets/partner-gkn.svg";
import partnerKdacLogo from "../../assets/partner-kdac.svg";
import partnerMetaldyneLogo from "../../assets/partner-metaldyne.svg";
import partnerMobisLogo from "../../assets/partner-mobis.svg";
import partnerMptLogo from "../../assets/partner-mpt.svg";
import partnerNexteerLogo from "../../assets/partner-nexteer.svg";
import partnerSpartanLogo from "../../assets/partner-spartan.svg";
import partnerTrwLogo from "../../assets/partner-trw.svg";
import clientGknImage from "../../assets/clients/client-gkn.jpg";
import clientMagnaImage from "../../assets/clients/client-magna.jpg";
import clientMetaldyneImage from "../../assets/clients/client-metaldyne.jpg";
import clientMptImage from "../../assets/clients/client-mpt.jpg";
import clientSpartanImage from "../../assets/clients/client-spartan.jpg";
import clientTrwMobisImage from "../../assets/clients/client-trw-mobis.jpg";
import heroPosterImage from "../../assets/hero3-poster.jpg";
import heroVideoMp4 from "../../assets/hero3.mp4";
import heroVideoWebm from "../../assets/hero3.webm";
import drivelineVideo1 from "../../driveline1.mp4";
import drivelineVideo2 from "../../driveline2.mp4";
import drivelineVideo3 from "../../driveline3.mp4";
import electricVehicleVideo1 from "../../electric vehicle1.mp4";
import electricVehicleVideo2 from "../../electric vehicle2.mp4";
import housingVideo1 from "../../housing1.mp4";
import housingVideo2 from "../../housing2.mp4";
import housingVideo3 from "../../housing3.mp4";
import housingVideo4 from "../../housing4.mp4";
import housingVideo5 from "../../housing5.mp4";
import machiningVideo from "../../machining.mp4";
import steeringVideo1 from "../../steering1.mp4";
import steeringVideo2 from "../../steering2.mp4";
import drivelineAlphaVideo1 from "../../assets/product-alpha/driveline1.webm";
import drivelineAlphaVideo2 from "../../assets/product-alpha/driveline2.webm";
import drivelineAlphaVideo3 from "../../assets/product-alpha/driveline3.webm";
import electricVehicleAlphaVideo1 from "../../assets/product-alpha/electric-vehicle1.webm";
import electricVehicleAlphaVideo2 from "../../assets/product-alpha/electric-vehicle2.webm";
import housingAlphaVideo1 from "../../assets/product-alpha/housing1.webm";
import housingAlphaVideo2 from "../../assets/product-alpha/housing2.webm";
import housingAlphaVideo3 from "../../assets/product-alpha/housing3.webm";
import housingAlphaVideo4 from "../../assets/product-alpha/housing4.webm";
import housingAlphaVideo5 from "../../assets/product-alpha/housing5.webm";
import steeringAlphaVideo1 from "../../assets/product-alpha/steering1.webm";
import steeringAlphaVideo2 from "../../assets/product-alpha/steering2.webm";
import drivelinePoster1 from "../../assets/video-posters/driveline1.jpg";
import drivelinePoster2 from "../../assets/video-posters/driveline2.jpg";
import drivelinePoster3 from "../../assets/video-posters/driveline3.jpg";
import electricVehiclePoster1 from "../../assets/video-posters/electric-vehicle1.jpg";
import electricVehiclePoster2 from "../../assets/video-posters/electric-vehicle2.jpg";
import heroHousingPoster from "../../assets/video-posters/hero-housing.jpg";
import housingPoster1 from "../../assets/video-posters/housing1.jpg";
import housingPoster3 from "../../assets/video-posters/housing3.jpg";
import housingPoster4 from "../../assets/video-posters/housing4.jpg";
import housingPoster5 from "../../assets/video-posters/housing5.jpg";
import steeringPoster1 from "../../assets/video-posters/steering1.jpg";
import steeringPoster2 from "../../assets/video-posters/steering2.jpg";
import globalSupplyClipPoster from "../../assets/process-videos/global-supply-08-14.jpg";
import globalSupplyClipVideo from "../../assets/process-videos/global-supply-08-14.mp4";
import qualityFlowClipPoster from "../../assets/process-videos/quality-flow-15-18.jpg";
import qualityFlowClipVideo from "../../assets/process-videos/quality-flow-15-18.mp4";

export type LanguageOption = {
  code: LanguageCode;
  label: string;
  shortLabel: string;
  htmlLang: string;
  ariaLabel: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: string[];
};

export type Highlight = {
  id: string;
  title: string;
  copy: string;
  visual: "network" | "academy" | "data" | "event";
  image: string;
  video?: string;
};

export type Solution = {
  id: string;
  title: string;
  copy: string;
  details?: string[];
  tags: string[];
  accent: string;
  image: string;
};

export type Product = {
  category: string;
  title: string;
  copy: string;
  accent: string;
  image: string;
  variant: "tms" | "qeeg" | "combo" | "robotics";
};

export type LatestPart = {
  index: string;
  category: string;
  title: string;
  copy: string;
  image: string;
  accent: string;
};

export type ClientPartner = {
  index: string;
  name: string;
  mark: string;
  role: string;
  year: string;
  image: string;
};

export type PartnerLogo = {
  name: string;
  mark: string;
  logoSrc?: string;
  role: string;
  region: string;
};

export type GlobalAchievement = {
  label: string;
  value: string;
  unit: string;
};

export type EsgPillar = {
  keyword: string;
  eyebrow: string;
  title: string;
  copy: string;
  bullets: string[];
  image: string;
  accent: string;
};

export type HistoryEra = {
  period: string;
  title: string;
  summary: string;
  items: string[];
  partners: string[];
};

export type ShowcaseVideo = {
  src: string;
  webm?: string;
  poster: string;
  label: string;
};

export type MediaItem = {
  type: string;
  kicker?: string;
  title: string;
  summary?: string;
  date: string;
  image?: string;
};

export type HeaderCopy = {
  homeLabel: string;
  navLabel: string;
  mobileNavLabel: string;
  openSearch: string;
  openMenu: string;
  closeMenu: string;
  closeSearch: string;
  searchTitle: string;
  searchDescription: string;
  searchLabel: string;
  searchPlaceholder: string;
  searchTagsLabel: string;
  languageLabel: string;
};

export type HeroCopy = {
  leftLabel: string;
  leftWord: string;
  rightWord: string;
  rightLabel: string;
  subtitle: string;
  centerLogo: string;
  fillLines: string[];
};

export type SiteContent = {
  navGroups: NavGroup[];
  searchTags: string[];
  header: HeaderCopy;
  preloader: {
    prefix: string;
    words: string[];
  };
  hero: HeroCopy;
  highlightButton: string;
  highlightAria: string;
  highlightItemAria: string;
  highlights: Highlight[];
  brandMarquee: string;
  latest: {
    title: string;
  };
  latestParts: LatestPart[];
  solutionHeading: {
    title: string;
    copy: string;
    tabsLabel: string;
    prevLabel: string;
    nextLabel: string;
  };
  solutions: Solution[];
  lineupHeading: {
    title: string;
    copy: string;
    pointer: string;
  };
  products: Product[];
  dataHeading: {
    title: string;
    copy: string;
  };
  stats: GlobalAchievement[];
  historyHeading: {
    eyebrow: string;
    title: string;
    copy: string;
    since: string;
  };
  historyEras: HistoryEra[];
  global: {
    copy: string;
    lines: string[];
    networkTitle: string;
  };
  partnerLogos: PartnerLogo[];
  achievementsHeading: {
    eyebrow: string;
    titleLines: string[];
  };
  globalAchievements: GlobalAchievement[];
  clientCollabStatement: string;
  clientPartners: ClientPartner[];
  esgHeading: {
    eyebrow: string;
    title: string;
    copy: string;
  };
  esgPillars: EsgPillar[];
  mediaHeading: {
    title: string;
    copy: string;
    cta: string;
  };
  mediaItems: MediaItem[];
  footer: {
    tagline: string;
    address: string;
  };
};

const brainallAsset = (path: string) => `https://brainall.kr${path}`;
const unsplash = (id: string, width = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const languages: LanguageOption[] = [
  { code: "ko", label: "한국어", shortLabel: "KR", htmlLang: "ko", ariaLabel: "한국어로 보기" },
  { code: "en", label: "English", shortLabel: "EN", htmlLang: "en", ariaLabel: "View in English" },
  { code: "ja", label: "日本語", shortLabel: "JP", htmlLang: "ja", ariaLabel: "日本語で表示" },
];

export const defaultLanguage: LanguageCode = "ko";

export function isLanguageCode(value: unknown): value is LanguageCode {
  return value === "ko" || value === "en" || value === "ja";
}

export const heroVisual = {
  src: heroVideoMp4,
  webm: heroVideoWebm,
  poster: heroPosterImage,
  label: "Transparent luxury sedan with visible precision components",
};

export const globalVideo = {
  webm: brainallAsset("/inc/img/main/global_video.webm"),
  mov: brainallAsset("/inc/img/main/global_video.mov"),
};

export const showcaseVideos = {
  heroBackground: { src: housingVideo1, webm: housingAlphaVideo1, poster: housingPoster1, label: "Precision machined housing background" },
  heroFocus: { src: housingVideo2, webm: housingAlphaVideo2, poster: heroHousingPoster, label: "Machined housing hero object" },
  latest: [
    { src: housingVideo5, webm: housingAlphaVideo5, poster: housingPoster5, label: "BSM housing machining view" },
    { src: electricVehicleVideo2, webm: electricVehicleAlphaVideo2, poster: electricVehiclePoster2, label: "EV precision machined component" },
    { src: steeringVideo1, webm: steeringAlphaVideo1, poster: steeringPoster1, label: "Steering shaft component" },
    { src: drivelineVideo1, webm: drivelineAlphaVideo1, poster: drivelinePoster1, label: "Driveline ring component" },
    { src: housingVideo3, webm: housingAlphaVideo3, poster: housingPoster3, label: "Drawing based housing component" },
    { src: drivelineVideo2, webm: drivelineAlphaVideo2, poster: drivelinePoster2, label: "Powertrain shaft component" },
  ],
  products: [
    { src: housingVideo2, webm: housingAlphaVideo2, poster: heroHousingPoster, label: "Balance shaft module housing" },
    { src: electricVehicleVideo1, webm: electricVehicleAlphaVideo1, poster: electricVehiclePoster1, label: "Electric vehicle precision part" },
    { src: steeringVideo2, webm: steeringAlphaVideo2, poster: steeringPoster2, label: "Steering shaft long component" },
    { src: drivelineVideo1, webm: drivelineAlphaVideo1, poster: drivelinePoster1, label: "Powertrain ring component" },
    { src: drivelineVideo3, webm: drivelineAlphaVideo3, poster: drivelinePoster3, label: "Driveline precision component" },
    { src: housingVideo4, webm: housingAlphaVideo4, poster: housingPoster4, label: "Custom OEM housing component" },
  ],
} satisfies {
  heroBackground: ShowcaseVideo;
  heroFocus: ShowcaseVideo;
  latest: ShowcaseVideo[];
  products: ShowcaseVideo[];
};

const images = {
  machining: unsplash("photo-1565043666747-69f6646db940"),
  inspection: unsplash("photo-1581092580497-e0d23cbdf1dc"),
  logistics: unsplash("photo-1494412519320-aa613dfb7738"),
  bsm: unsplash("photo-1492144534655-ae79c964c9d7", 1200),
  brake: unsplash("photo-1486262715619-67b85e0b08d3", 1200),
  steering: unsplash("photo-1503376780353-7e6692767b70", 1200),
  engine: unsplash("photo-1511919884226-fd3cad34687c", 1200),
  driveline: unsplash("photo-1494412519320-aa613dfb7738", 1200),
  oem: unsplash("photo-1565043666747-69f6646db940", 1200),
  esgEnvironmental: unsplash("photo-1469474968028-56623f02e42e", 1400),
  esgSocial: unsplash("photo-1521737604893-d14cc237f11d", 1400),
  esgGovernance: unsplash("photo-1450101499163-c8848c66ca85", 1400),
  clientMetaldyne: clientMetaldyneImage,
  clientSpartan: clientSpartanImage,
  clientMagna: clientMagnaImage,
  clientTrwMobis: clientTrwMobisImage,
  clientGkn: clientGknImage,
  clientMpt: clientMptImage,
};

const partnerLogoUrls = {
  metaldyne: partnerMetaldyneLogo,
  spartan: partnerSpartanLogo,
  trw: partnerTrwLogo,
  mobis: partnerMobisLogo,
  nexteer: partnerNexteerLogo,
  kdac: partnerKdacLogo,
  gkn: partnerGknLogo,
  mpt: partnerMptLogo,
};

const productVisuals = [
  { category: "BSM", title: "Balance Shaft Module", image: images.bsm, accent: "#f2b429", variant: "tms" as const },
  { category: "EV", title: "Electric Vehicle Parts", image: images.oem, accent: "#9ed4ff", variant: "qeeg" as const },
  { category: "STEERING", title: "Steering Parts", image: images.steering, accent: "#e9efff", variant: "combo" as const },
  { category: "POWERTRAIN", title: "Powertrain Parts", image: images.engine, accent: "#cfb3ff", variant: "robotics" as const },
  { category: "DRIVELINE", title: "Driveline Parts", image: images.driveline, accent: "#ffd36e", variant: "qeeg" as const },
  { category: "CUSTOM", title: "OEM Machining", image: images.brake, accent: "#63d7ff", variant: "combo" as const },
];

const partnerMarks = [
  { name: "Metaldyne", mark: "METALDYNE", logoSrc: partnerLogoUrls.metaldyne, region: "USA" },
  { name: "Spartan Light Metal Products", mark: "SPARTAN", logoSrc: partnerLogoUrls.spartan, region: "USA" },
  { name: "TRW", mark: "TRW", logoSrc: partnerLogoUrls.trw, region: "Korea / Global" },
  { name: "Hyundai Mobis", mark: "MOBIS", logoSrc: partnerLogoUrls.mobis, region: "Korea" },
  { name: "Nexteer Automotive", mark: "NEXTEER", logoSrc: partnerLogoUrls.nexteer, region: "Global" },
  { name: "KDAC", mark: "KDAC", logoSrc: partnerLogoUrls.kdac, region: "Korea" },
  { name: "GKN Driveline", mark: "GKN", logoSrc: partnerLogoUrls.gkn, region: "USA / Mexico" },
  { name: "MPT Muncie", mark: "MPT", logoSrc: partnerLogoUrls.mpt, region: "USA" },
];

export const siteContent: Record<LanguageCode, SiteContent> = {ko:{navGroups:[{label:"회사소개",href:"#brand",children:["CEO 메시지","회사연혁","조직","오시는 길"]},{label:"기술/품질",href:"#solution",children:["개발 대응","정밀가공","품질검사","양산관리"]},{label:"제품군",href:"#lineup",children:["BSM","EV","Steering","Powertrain","Driveline"]},{label:"생산역량",href:"#data"},{label:"글로벌 OEM",href:"#partners",children:["공급 네트워크","주요 고객","수출 프로그램"]},{label:"고객지원",href:"#media",children:["공지사항","뉴스","자료","오시는 길"]}],searchTags:["BSM","EV","Steering","Powertrain","Driveline","OEM","정밀가공","품질검사"],header:{homeLabel:"서울산업 홈",navLabel:"주요 메뉴",mobileNavLabel:"모바일 메뉴",openSearch:"검색 열기",openMenu:"메뉴 열기",closeMenu:"메뉴 닫기",closeSearch:"검색 닫기",searchTitle:"통합검색",searchDescription:"제품군, 공정, OEM 키워드를 입력하면 관련 정보를 빠르게 확인할 수 있습니다.",searchLabel:"검색어",searchPlaceholder:"검색어를 입력하세요",searchTagsLabel:"추천 검색어",languageLabel:"언어 선택"},preloader:{prefix:"WE",words:["MACHINED","MEASURED","BUILT","ASSEMBLED","SUPPLIED","DELIVERED","MADE"]},hero:{leftLabel:"Automotive OEM",leftWord:"Auto",rightWord:"Parts",rightLabel:"Precision Components",subtitle:"Precision Automotive Components OEM",centerLogo:"SEOUL INDUSTRY",fillLines:["자동차 부품 정밀가공의 기준을 세우고","개발부터 양산까지","공정의 흐름을 연결하며","고객사의 생산 계획에 맞춘","OEM 파트너가 됩니다."]},highlightButton:"자세히 보기",highlightAria:"서울산업 핵심 역량 슬라이드",highlightItemAria:"번째 핵심 역량 보기",highlights:[{id:"machining",title:`정밀가공
라인업`,copy:"BSM, EV, Steering, Powertrain, Driveline 부품의 반복 정밀도와 표면 품질을 공정 조건으로 관리합니다. 전용 가공 조건과 검사 기준을 함께 고정해 양산 흔들림을 낮춥니다.",visual:"academy",image:images.machining,video:machiningVideo},{id:"quality",title:`검사와
품질흐름`,copy:"치수, 형상, 조립 품질을 LOT 단위로 확인하고 생산 조건과 연결합니다. 검사 결과가 다시 공정 기준으로 돌아가도록 관리해 납품 전 품질 신뢰도를 높입니다.",visual:"data",image:qualityFlowClipPoster,video:qualityFlowClipVideo},{id:"mass-production",title:`글로벌
공급 대응`,copy:"1985년부터 축적한 제조 경험으로 국내외 고객사의 개발 일정과 생산 계획에 대응합니다. 생산 부하, 포장, 출하 흐름까지 함께 보며 OEM 공급 안정성을 지킵니다.",visual:"event",image:globalSupplyClipPoster,video:globalSupplyClipVideo}],brandMarquee:"Precision Automotive Components OEM · Since 1985",latest:{title:"LATEST"},latestParts:[{index:"001",category:"Balance Shaft Module",title:"BSM Housing",copy:"진동 저감과 동력 효율을 위한 밸런스 샤프트 모듈 가공 부품",image:images.bsm,accent:"#f36f21"},{index:"002",category:"Electric Vehicle",title:"EV Precision Part",copy:"전동화 플랫폼의 조립성과 내구 조건을 고려한 정밀 가공 부품",image:images.oem,accent:"#d94f1d"},{index:"003",category:"Steering",title:"Pinion Shaft",copy:"조향 응답성과 내구성을 위한 Pinion Shaft 계열 부품",image:images.steering,accent:"#f08a2a"},{index:"004",category:"Powertrain",title:"Powertrain Shaft",copy:"열과 진동 조건에서 안정적인 조립 품질을 요구하는 동력계 부품",image:images.engine,accent:"#c64a18"},{index:"005",category:"Driveline",title:"Driveline Component",copy:"동력 전달 흐름에 맞춘 반복 정밀도와 표면 품질 관리",image:images.driveline,accent:"#f7a13a"},{index:"006",category:"Custom OEM",title:"Drawing Based Part",copy:"고객 도면과 생산 조건에 맞춰 개발부터 양산까지 대응하는 맞춤 부품",image:images.brake,accent:"#e25d1f"}],solutionHeading:{title:"Manufacturing Flow",copy:"개발 대응부터 정밀가공, 검사, 양산 공급까지. 서울산업은 자동차 부품 OEM 생산의 흐름을 하나로 연결합니다.",tabsLabel:"제조 프로세스",prevLabel:"이전 프로세스",nextLabel:"다음 프로세스"},solutions:[{id:"machining",title:"정밀가공",copy:"자동차 주요 부품의 반복 정밀도와 표면 품질을 안정적으로 확보하는 가공 체계를 운영합니다.",details:["CNC 가공 조건을 부품별로 표준화합니다.","반복 생산에서 치수 편차와 재가공을 줄입니다.","설비 가동 조건을 기록해 품질 흔들림을 낮춥니다."],tags:["CNC","전용 설비","공정 안정화"],accent:"#c94b16",image:images.machining},{id:"quality",title:"품질검사",copy:"치수와 형상, 조립 품질을 단계별로 확인해 납품 전 품질 신뢰도를 높입니다.",details:["주요 치수와 형상 기준을 LOT 단위로 확인합니다.","검사 결과를 생산 조건과 연결해 원인을 추적합니다.","고객 납품 기준에 맞춰 출하 전 품질을 고정합니다."],tags:["치수 검사","형상 검사","LOT 관리"],accent:"#f08a2a",image:images.inspection},{id:"mass-production",title:"양산 공급",copy:"고객사의 생산 계획에 맞춰 납기, 포장, 재고 흐름까지 관리하는 OEM 공급 체계를 제공합니다.",details:["납기 계획과 생산 부하를 함께 확인합니다.","포장, 재고, 출하 흐름을 납품 기준에 맞춥니다.","반복 공급 중 발생하는 품질·납기 이슈를 즉시 공유합니다."],tags:["OEM","납기 대응","공급 안정성"],accent:"#7f4d28",image:images.logistics}],lineupHeading:{title:"Automotive Parts Lineup",copy:"서울산업은 자동차 주요 시스템에 필요한 정밀 가공 부품을 OEM 방식으로 생산합니다.",pointer:"VIEW"},products:productVisuals.map((u,i)=>({...u,copy:["진동 저감과 동력 효율을 위한 밸런스 샤프트 모듈 부품","전동화 플랫폼의 조립성과 내구 조건을 고려한 가공 부품","조향 장치의 응답성과 내구성을 위한 Pinion Shaft 계열 부품","엔진과 동력 전달계 주변의 열과 진동 조건을 견디는 가공 부품","드라이브라인의 동력 전달과 조립 품질을 위한 핵심 부품","고객 도면과 사양에 맞춘 자동차 부품 위탁 생산"][i]})),dataHeading:{title:"정밀가공의 기준, 서울산업",copy:"1985년부터 축적한 자동차 부품 제조 경험을 바탕으로 개발 대응, 공정 안정화, 양산 품질까지 한 흐름으로 관리합니다."},stats:[{value:"1985",label:"자동차 부품 정밀가공 기반 설립",unit:""},{value:"5",label:"주요 제품군 BSM, EV, Steering, Powertrain, Driveline",unit:""},{value:"100%",label:"도면 기반 맞춤 OEM 생산 대응",unit:""},{value:"40+",label:"축적된 제조 노하우와 현장 경험",unit:""},{value:"1",label:"개발부터 양산까지 연결되는 제조 파트너",unit:""}],historyHeading:{eyebrow:"History",since:"Since 1985",title:"서울산업의 제조 기반이 확장되어 온 시간",copy:"조향부품 양산으로 시작해 품질 인증, 연구개발, 글로벌 고객 확장, 생산 기술 고도화를 거치며 자동차 부품 OEM 제조 기반을 넓혀왔습니다."},historyEras:[{period:"2020 ~ 현재",title:"성장 안정화와 재도약",summary:"인증 기반을 다지고 신규 글로벌 고객과의 거래를 넓히며 다음 성장 단계를 준비하고 있습니다.",items:["INNOBIZ 인증 획득","BorgWarner, GMB, BOCAR, Namyang Nexmo 등 신규 고객사 확대"],partners:["BORGWARNER","GMB","BOCAR","NAMYANG NEXMO"]},{period:"2010 ~ 2019",title:"글로벌 시장 성장 확대",summary:"품질 인증과 수출 성과, 생산 기술특허를 바탕으로 글로벌 자동차 시장 대응 범위를 넓혔습니다.",items:["현대모비스 SQ 인증 획득","3천만불 수출의 탑 수상","AL 다이캐스팅 사업 진출","자동차 부품 생산 관련 기술특허 다수 등록","영화공업, GKN Driveline, Spartan 신규 거래"],partners:["GKN DRIVE LINE","SPARTAN","영화공업"]},{period:"2000 ~ 2009",title:"글로벌 자동차 시장 참여",summary:"환경·품질 인증과 기업부설 연구소 설립을 통해 글로벌 OEM 대응 체계를 갖추기 시작했습니다.",items:["ISO 14001 인증 획득","IATF/TS 16949 인증 획득","기업부설 연구소 설립","ZF, AAM, Nexteer, ThyssenKrupp, Magna Powertrain, Hyundai Mobis, ERAE AMS 등 고객 네트워크 확대"],partners:["ZF","AAM","NEXTEER","THYSSENKRUPP","MAGNA POWERTRAIN","HYUNDAI MOBIS","ERAE AMS"]},{period:"1985 ~ 1999",title:"정밀가공 기반 구축",summary:"서울산업을 설립하고 자동차 조향부품 양산을 시작하며 제조 기반을 만들었습니다.",items:["1985년 회사 설립","TRW 자동차 조향부품 양산 시작"],partners:["TRW"]}],global:{copy:"자동차 산업의 공급망은 정확한 일정과 흔들리지 않는 품질에서 시작되며, 서울산업은 고객사의 개발 일정과 양산 계획에 맞춰 정밀가공 부품을 안정적으로 공급합니다.",lines:["오늘도 1μm 단위의 정밀함으로","완성차의 신뢰를 함께 만듭니다."],networkTitle:"OEM Manufacturing Network"},partnerLogos:partnerMarks.map((u,i)=>({...u,role:["변속기/샤프트 양산 프로그램","GM/Ford 연계 경량 부품 프로그램","조향 부품 공급 프로그램","국내 조향/모듈 프로그램","글로벌 조향 시스템 프로그램","국내 자동차 부품 프로그램","드라이브라인 수출 프로그램","북미 파워트레인 공급 프로그램"][i]})),achievementsHeading:{eyebrow:"at a Glance",titleLines:["숫자로 보는 서울산업의 제조 기반"]},globalAchievements:[{label:"설립",value:"1985",unit:"SINCE"},{label:"매출 기준",value:"510억",unit:"KRW"},{label:"임직원",value:"185",unit:"PEOPLE"},{label:"월 양산량",value:"300,000+",unit:"PARTS / MONTH"}],clientCollabStatement:"SEOUL INDUSTRY BUILDS PRECISE OEM PARTNERSHIPS THROUGH MACHINING, QUALITY, AND DELIVERY.",clientPartners:[{index:"01",name:"Metaldyne",mark:"METALDYNE",role:"Transmission / Shaft Program",year:"USA",image:images.clientMetaldyne},{index:"02",name:"Spartan Light Metal Products",mark:"SPARTAN",role:"Die-Cast / Machined Components",year:"USA",image:images.clientSpartan},{index:"03",name:"Magna Powertrain",mark:"MAGNA",role:"Powertrain / Driveline Program",year:"GLOBAL",image:images.clientMagna},{index:"04",name:"TRW · Hyundai Mobis",mark:"TRW MOBIS",role:"Steering / Module Program",year:"KOREA",image:images.clientTrwMobis},{index:"05",name:"GKN Driveline",mark:"GKN",role:"Driveline Export Program",year:"GLOBAL",image:images.clientGkn},{index:"06",name:"MPT Muncie",mark:"MPT",role:"North America Powertrain Supply",year:"USA",image:images.clientMpt}],esgHeading:{eyebrow:"ESG Management",title:"지속가능한 제조를 위한 서울산업의 책임",copy:"정밀가공 기업으로서 환경 부담을 줄이고, 안전한 현장과 투명한 기준을 통해 오래 지속되는 OEM 파트너십을 만듭니다."},esgPillars:[{keyword:"ENVIRONMENTAL",eyebrow:"Responsible Manufacturing",title:"환경과 함께하는 정밀가공",copy:"에너지 사용, 자원 관리, 공정 안정화를 함께 보며 제조 과정에서 발생하는 환경 부담을 줄입니다.",bullets:["에너지와 자원 사용 절감","공정 효율화를 통한 낭비 최소화","환경 규제와 현장 기준 준수"],image:images.esgEnvironmental,accent:"#6f9f58"},{keyword:"SOCIAL",eyebrow:"Safe Workplace",title:"안전하고 숙련된 제조 현장",copy:"임직원의 안전과 역량을 기반으로 고객이 신뢰할 수 있는 품질과 납기 대응을 지속합니다.",bullets:["안전한 작업 환경 유지","현장 숙련도와 품질 의식 강화","고객·협력사와의 책임 있는 관계"],image:images.esgSocial,accent:"#e9631a"},{keyword:"GOVERNANCE",eyebrow:"Transparent Standard",title:"투명한 기준으로 연결되는 OEM 파트너십",copy:"도면, 품질, 납기, 거래 기준을 명확하게 관리해 장기적인 신뢰를 쌓습니다.",bullets:["품질 기록과 공정 이력 관리","고객 요구사항과 변경 이력 확인","정직하고 투명한 거래 기준"],image:images.esgGovernance,accent:"#303344"}],mediaHeading:{title:"NEWS",copy:"제품군, 공정, 품질 대응과 관련된 서울산업의 새로운 소식을 확인하세요.",cta:"자세히 보기"},mediaItems:[{type:"공지",title:"서울산업 신규 홈페이지 개편 준비 중입니다",date:"2026-05-28"},{type:"제품",title:"BSM, EV, Steering 제품군 정밀가공 라인업 소개",date:"2026-05-21"},{type:"품질",title:"도면 기반 OEM 개발 대응과 품질 검사 프로세스",date:"2026-05-15"},{type:"제조",title:"자동차 부품 양산 공정에서 중요한 반복 정밀도 관리",date:"2026-05-09"},{type:"자료",title:"Driveline 부품과 동력 전달계 가공 안내",date:"2026-04-30"}],footer:{tagline:"Precision Automotive Components OEM",address:"031-366-1141 · Hwaseong, Korea"}},en:{navGroups:[{label:"Company",href:"#brand",children:["CEO Message","History","Organization","Location"]},{label:"Technology",href:"#solution",children:["Development","Precision Machining","Quality","Mass Production"]},{label:"Products",href:"#lineup",children:["BSM","EV","Steering","Powertrain","Driveline"]},{label:"Capability",href:"#data"},{label:"Global OEM",href:"#partners",children:["Supply Network","Key Customers","Export Programs"]},{label:"Support",href:"#media",children:["Notice","News","Resources","Location"]}],searchTags:["BSM","EV","Steering","Powertrain","Driveline","OEM","Precision Machining","Quality Inspection"],header:{homeLabel:"Seoul Industry home",navLabel:"Primary navigation",mobileNavLabel:"Mobile navigation",openSearch:"Open search",openMenu:"Open menu",closeMenu:"Close menu",closeSearch:"Close search",searchTitle:"Search",searchDescription:"Search product groups, processes, and OEM keywords to find related information quickly.",searchLabel:"Keyword",searchPlaceholder:"Type a keyword",searchTagsLabel:"Suggested keywords",languageLabel:"Select language"},preloader:{prefix:"WE",words:["MACHINED","MEASURED","BUILT","ASSEMBLED","SUPPLIED","DELIVERED","MADE"]},hero:{leftLabel:"Automotive OEM",leftWord:"Auto",rightWord:"Parts",rightLabel:"Precision Components",subtitle:"Precision Automotive Components OEM",centerLogo:"SEOUL INDUSTRY",fillLines:["We machine the critical parts behind every drive","connect engineering, process control, and mass production","and keep OEM programs moving with dependable precision."]},highlightButton:"Learn More",highlightAria:"Seoul Industry capability slides",highlightItemAria:"View capability",highlights:[{id:"machining",title:`Precision
Machining Lines`,copy:"BSM, EV, steering, powertrain, and driveline parts are managed through repeatable machining conditions and surface-quality standards. Dedicated process settings and inspection criteria reduce variation in mass production.",visual:"academy",image:images.machining,video:machiningVideo},{id:"quality",title:`Quality Built
into the Flow`,copy:"Dimensional, geometric, and assembly quality are checked by lot and connected back to process conditions. Inspection results become operating standards that protect delivery quality before shipment.",visual:"data",image:qualityFlowClipPoster,video:qualityFlowClipVideo},{id:"mass-production",title:`Global
Supply Response`,copy:"Since 1985, Seoul Industry has responded to customer development windows and production schedules with practical manufacturing discipline. Production load, packing, and shipment flow are managed together for stable OEM supply.",visual:"event",image:globalSupplyClipPoster,video:globalSupplyClipVideo}],brandMarquee:"Precision Automotive Components OEM · Since 1985",latest:{title:"LATEST"},latestParts:[{index:"001",category:"Balance Shaft Module",title:"BSM Housing",copy:"Machined module parts for balance shaft systems and vibration control.",image:images.bsm,accent:"#f36f21"},{index:"002",category:"Electric Vehicle",title:"EV Precision Part",copy:"Precision parts designed around EV assembly and durability requirements.",image:images.oem,accent:"#d94f1d"},{index:"003",category:"Steering",title:"Pinion Shaft",copy:"Pinion shaft components supporting steering response and durability.",image:images.steering,accent:"#f08a2a"},{index:"004",category:"Powertrain",title:"Powertrain Shaft",copy:"Powertrain components built for heat, vibration, and stable assembly quality.",image:images.engine,accent:"#c64a18"},{index:"005",category:"Driveline",title:"Driveline Component",copy:"Core driveline parts managed for repeat accuracy and surface quality.",image:images.driveline,accent:"#f7a13a"},{index:"006",category:"Custom OEM",title:"Drawing Based Part",copy:"Custom parts developed from customer drawings and production conditions.",image:images.brake,accent:"#e25d1f"}],solutionHeading:{title:"Manufacturing Flow",copy:"From development response to precision machining, inspection, and mass-production supply, Seoul Industry keeps the OEM manufacturing flow connected.",tabsLabel:"Manufacturing process",prevLabel:"Previous process",nextLabel:"Next process"},solutions:[{id:"machining",title:"Machining",copy:"Dedicated machining practices keep repeat accuracy and surface quality stable for automotive parts.",details:["Standardize CNC conditions for each component group.","Reduce dimensional drift and rework in repeated production.","Record equipment conditions to keep quality variation low."],tags:["CNC","Dedicated Lines","Process Stability"],accent:"#c94b16",image:images.machining},{id:"quality",title:"Quality",copy:"Dimensional, geometric, and assembly checks are managed step by step before delivery.",details:["Check key dimensions and geometry by production lot.","Connect inspection results with process conditions.","Stabilize outgoing quality against customer delivery standards."],tags:["Dimension","Geometry","LOT Control"],accent:"#f08a2a",image:images.inspection},{id:"mass-production",title:"Supply",copy:"Production planning, packing, and delivery control are aligned with customer schedules.",details:["Review delivery plans together with production load.","Align packing, inventory, and shipment flow with supply rules.","Share quality and delivery issues quickly during repeat supply."],tags:["OEM","Delivery","Stable Supply"],accent:"#7f4d28",image:images.logistics}],lineupHeading:{title:"Automotive Parts Lineup",copy:"Seoul Industry manufactures precision-machined parts for core automotive systems on an OEM basis.",pointer:"VIEW"},products:productVisuals.map((u,i)=>({...u,copy:["Balance shaft module parts for vibration control and power efficiency.","Machined parts designed around EV platform assembly and durability.","Pinion shaft and steering components requiring response and durability.","Powertrain parts built for heat, vibration, and stable assembly quality.","Core driveline parts for power delivery and assembly reliability.","Contract manufacturing for automotive parts based on customer drawings."][i]})),dataHeading:{title:"Built on Precision Machining",copy:"Since 1985, Seoul Industry has managed development response, process stability, and mass-production quality as one manufacturing flow."},stats:[{value:"1985",label:"Founded on precision automotive component machining",unit:""},{value:"5",label:"Core product groups: BSM, EV, Steering, Powertrain, Driveline",unit:""},{value:"100%",label:"Drawing-based custom OEM production response",unit:""},{value:"40+",label:"Years of manufacturing know-how and field experience",unit:""},{value:"1",label:"Integrated partner from development to production",unit:""}],historyHeading:{eyebrow:"History",since:"Since 1985",title:"The years that expanded Seoul Industry's manufacturing base",copy:"From steering component production to quality certification, R&D capability, global customer expansion, and production technology, Seoul Industry has broadened its OEM manufacturing foundation for automotive parts."},historyEras:[{period:"2020 ~ Present",title:"Stabilization and renewed growth",summary:"Seoul Industry is strengthening its certification base and expanding work with new global customers for the next stage of growth.",items:["Obtained INNOBIZ certification","Expanded new customer relationships including BorgWarner, GMB, BOCAR, and Namyang Nexmo"],partners:["BORGWARNER","GMB","BOCAR","NAMYANG NEXMO"]},{period:"2010 ~ 2019",title:"Global market expansion",summary:"Quality certification, export recognition, and production technology patents expanded the company's response range in the global automotive market.",items:["Obtained Hyundai Mobis SQ certification","Received the 30 Million Dollar Export Tower award","Entered the aluminum die-casting business","Registered multiple patents related to automotive component production","Started new business with Younghwa, GKN Driveline, and Spartan"],partners:["GKN DRIVE LINE","SPARTAN","YOUNGHWA"]},{period:"2000 ~ 2009",title:"Entry into global automotive programs",summary:"Environmental and quality certifications, along with the company research institute, formed the basis for global OEM response.",items:["Obtained ISO 14001 certification","Obtained IATF/TS 16949 certification","Established the corporate research institute","Expanded customer network with ZF, AAM, Nexteer, ThyssenKrupp, Magna Powertrain, Hyundai Mobis, and ERAE AMS"],partners:["ZF","AAM","NEXTEER","THYSSENKRUPP","MAGNA POWERTRAIN","HYUNDAI MOBIS","ERAE AMS"]},{period:"1985 ~ 1999",title:"Precision machining foundation",summary:"Seoul Industry was founded and began mass production of automotive steering components.",items:["Company founded in 1985","Started mass production of TRW automotive steering components"],partners:["TRW"]}],global:{copy:`Automotive supply chains start with exact schedules and quality that does not drift.
Seoul Industry supplies precision-machined components aligned with customer development and production plans.`,lines:["With 1μm-level precision","we support finished-vehicle reliability."],networkTitle:"OEM Manufacturing Network"},partnerLogos:partnerMarks.map((u,i)=>({...u,role:["Transmission and shaft programs","Light-metal programs linked to GM/Ford","Steering component programs","Domestic steering and module programs","Global steering system programs","Korean automotive component programs","Driveline export programs","North American powertrain supply programs"][i]})),achievementsHeading:{eyebrow:"at a Glance",titleLines:["From drawing review to mass production","the manufacturing base behind Seoul Industry"]},globalAchievements:[{label:"Founded",value:"1985",unit:"SINCE"},{label:"Sales Scale",value:"51B",unit:"KRW"},{label:"Employees",value:"185",unit:"PEOPLE"},{label:"Monthly Production",value:"300,000+",unit:"PARTS / MONTH"}],clientCollabStatement:"SEOUL INDUSTRY BUILDS PRECISE OEM PARTNERSHIPS THROUGH MACHINING, QUALITY, AND DELIVERY.",clientPartners:[{index:"01",name:"Metaldyne",mark:"METALDYNE",role:"Transmission / Shaft Program",year:"USA",image:images.clientMetaldyne},{index:"02",name:"Spartan Light Metal Products",mark:"SPARTAN",role:"Die-Cast / Machined Components",year:"USA",image:images.clientSpartan},{index:"03",name:"Magna Powertrain",mark:"MAGNA",role:"Powertrain / Driveline Program",year:"GLOBAL",image:images.clientMagna},{index:"04",name:"TRW · Hyundai Mobis",mark:"TRW MOBIS",role:"Steering / Module Program",year:"KOREA",image:images.clientTrwMobis},{index:"05",name:"GKN Driveline",mark:"GKN",role:"Driveline Export Program",year:"GLOBAL",image:images.clientGkn},{index:"06",name:"MPT Muncie",mark:"MPT",role:"North America Powertrain Supply",year:"USA",image:images.clientMpt}],esgHeading:{eyebrow:"ESG Management",title:"Seoul Industry's responsibility for sustainable manufacturing",copy:"As a precision machining company, Seoul Industry reduces environmental burden and builds lasting OEM partnerships through safe workplaces and transparent standards."},esgPillars:[{keyword:"ENVIRONMENTAL",eyebrow:"Responsible Manufacturing",title:"Precision machining with environmental care",copy:"Energy use, resource management, and process stability are managed together to reduce environmental burden across manufacturing.",bullets:["Reduce energy and resource use","Minimize waste through process efficiency","Follow environmental regulations and site standards"],image:images.esgEnvironmental,accent:"#6f9f58"},{keyword:"SOCIAL",eyebrow:"Safe Workplace",title:"A safe and skilled manufacturing site",copy:"Employee safety and shop-floor capability support the quality and delivery response customers can trust.",bullets:["Maintain safe working conditions","Strengthen skill and quality awareness","Build responsible relationships with customers and partners"],image:images.esgSocial,accent:"#e9631a"},{keyword:"GOVERNANCE",eyebrow:"Transparent Standard",title:"OEM partnerships connected by clear standards",copy:"Drawings, quality, delivery, and transaction standards are managed clearly to build long-term trust.",bullets:["Manage quality records and process history","Track customer requirements and revisions","Maintain fair and transparent transaction standards"],image:images.esgGovernance,accent:"#303344"}],mediaHeading:{title:"NEWS",copy:"Updates on Seoul Industry product groups, processes, and quality response.",cta:"View More"},mediaItems:[{type:"Notice",title:"Seoul Industry is preparing a renewed global website.",date:"2026-05-28"},{type:"Products",title:"Introducing precision-machined BSM, EV, and steering parts.",date:"2026-05-21"},{type:"Quality",title:"Drawing-based OEM development and inspection process.",date:"2026-05-15"},{type:"Manufacturing",title:"Managing repeat accuracy in automotive component production.",date:"2026-05-09"},{type:"Resources",title:"Driveline components and power-delivery machining guide.",date:"2026-04-30"}],footer:{tagline:"Precision Automotive Components OEM",address:"+82-31-366-1141 · Hwaseong, Korea"}},ja:{navGroups:[{label:"会社紹介",href:"#brand",children:["CEOメッセージ","沿革","組織","アクセス"]},{label:"技術/品質",href:"#solution",children:["開発対応","精密加工","品質検査","量産管理"]},{label:"製品群",href:"#lineup",children:["BSM","EV","Steering","Powertrain","Driveline"]},{label:"生産力",href:"#data"},{label:"グローバルOEM",href:"#partners",children:["供給ネットワーク","主要顧客","輸出プログラム"]},{label:"サポート",href:"#media",children:["お知らせ","ニュース","資料","アクセス"]}],searchTags:["BSM","EV","Steering","Powertrain","Driveline","OEM","精密加工","品質検査"],header:{homeLabel:"ソウル産業 ホーム",navLabel:"メインナビゲーション",mobileNavLabel:"モバイルメニュー",openSearch:"検索を開く",openMenu:"メニューを開く",closeMenu:"メニューを閉じる",closeSearch:"検索を閉じる",searchTitle:"サイト内検索",searchDescription:"製品群、工程、OEMキーワードから関連情報をすばやく確認できます。",searchLabel:"キーワード",searchPlaceholder:"キーワードを入力",searchTagsLabel:"おすすめキーワード",languageLabel:"言語を選択"},preloader:{prefix:"WE",words:["MACHINE","MEASURE","BUILD","ASSEMBLE","SUPPLY","DELIVER","MAKE"]},hero:{leftLabel:"Automotive OEM",leftWord:"Auto",rightWord:"Parts",rightLabel:"Precision Components",subtitle:"Precision Automotive Components OEM",centerLogo:"SEOUL INDUSTRY",fillLines:["走りを支える部品を、確かな精度で磨き上げ","開発対応から工程管理、量産供給までをつなぎ","OEMプログラムを着実に前へ進めます。"]},highlightButton:"詳しく見る",highlightAria:"ソウル産業のコア技術スライド",highlightItemAria:"番目の技術を見る",highlights:[{id:"machining",title:`精密加工
ライン`,copy:"BSM、EV、ステアリング、パワートレイン、ドライブライン部品の反復精度と表面品質を工程条件として管理します。専用条件と検査基準を合わせて固定し、量産時のばらつきを抑えます。",visual:"academy",image:images.machining,video:machiningVideo},{id:"quality",title:`品質を
工程の中へ`,copy:"寸法、形状、組立品質をLOT単位で確認し、生産条件と結びつけます。検査結果を工程基準へ戻すことで、出荷前の品質信頼性を高めます。",visual:"data",image:qualityFlowClipPoster,video:qualityFlowClipVideo},{id:"mass-production",title:`グローバル
供給対応`,copy:"1985年から積み重ねた製造経験をもとに、顧客の開発日程と量産計画に対応します。生産負荷、梱包、出荷の流れまで合わせて確認し、OEM供給の安定性を守ります。",visual:"event",image:globalSupplyClipPoster,video:globalSupplyClipVideo}],brandMarquee:"Precision Automotive Components OEM · Since 1985",latest:{title:"LATEST"},latestParts:[{index:"001",category:"Balance Shaft Module",title:"BSM Housing",copy:"振動低減と動力効率を支えるバランスシャフトモジュール部品",image:images.bsm,accent:"#f36f21"},{index:"002",category:"Electric Vehicle",title:"EV Precision Part",copy:"EVプラットフォームの組立性と耐久条件を踏まえた精密加工部品",image:images.oem,accent:"#d94f1d"},{index:"003",category:"Steering",title:"Pinion Shaft",copy:"操舵応答性と耐久性を支えるピニオンシャフト系部品",image:images.steering,accent:"#f08a2a"},{index:"004",category:"Powertrain",title:"Powertrain Shaft",copy:"熱・振動条件でも安定した組立品質を求められる動力系部品",image:images.engine,accent:"#c64a18"},{index:"005",category:"Driveline",title:"Driveline Component",copy:"動力伝達の流れに合わせた反復精度と表面品質の管理",image:images.driveline,accent:"#f7a13a"},{index:"006",category:"Custom OEM",title:"Drawing Based Part",copy:"顧客図面と生産条件に合わせ、開発から量産まで対応する特注部品",image:images.brake,accent:"#e25d1f"}],solutionHeading:{title:"Manufacturing Flow",copy:"開発対応から精密加工、検査、量産供給まで。ソウル産業は自動車部品OEM生産の流れを一つにつなぎます。",tabsLabel:"製造プロセス",prevLabel:"前のプロセス",nextLabel:"次のプロセス"},solutions:[{id:"machining",title:"精密加工",copy:"自動車主要部品の反復精度と表面品質を安定して確保する加工体制を運用します。",details:["部品ごとにCNC加工条件を標準化します。","反復生産で寸法ばらつきと再加工を抑えます。","設備稼働条件を記録し品質変動を低減します。"],tags:["CNC","専用設備","工程安定化"],accent:"#c94b16",image:images.machining},{id:"quality",title:"品質検査",copy:"寸法、形状、組立品質を段階的に確認し、納入前の品質信頼性を高めます。",details:["主要寸法と形状基準をLOT単位で確認します。","検査結果を生産条件と結びつけて原因を追跡します。","顧客納入基準に合わせ出荷前品質を安定させます。"],tags:["寸法検査","形状検査","LOT管理"],accent:"#f08a2a",image:images.inspection},{id:"mass-production",title:"量産供給",copy:"顧客の生産計画に合わせ、納期、梱包、在庫の流れまで管理するOEM供給体制を整えます。",details:["納期計画と生産負荷を合わせて確認します。","梱包、在庫、出荷フローを納品基準に合わせます。","反復供給中の品質・納期課題をすばやく共有します。"],tags:["OEM","納期対応","供給安定性"],accent:"#7f4d28",image:images.logistics}],lineupHeading:{title:"Automotive Parts Lineup",copy:"ソウル産業は自動車主要システムに必要な精密加工部品をOEM方式で生産しています。",pointer:"VIEW"},products:productVisuals.map((u,i)=>({...u,copy:["振動低減と動力効率を支えるバランスシャフトモジュール部品","EVプラットフォームの組立性と耐久条件を踏まえた加工部品","操舵装置の応答性と耐久性を支えるピニオンシャフト系部品","熱と振動条件を受けるエンジン・動力伝達系周辺部品","ドライブラインの動力伝達と組立品質を支える主要部品","顧客図面と仕様に合わせた自動車部品の受託生産"][i]})),dataHeading:{title:"精密加工を軸にした製造基盤",copy:"1985年から積み重ねた自動車部品製造の経験をもとに、開発対応、工程安定化、量産品質までを一つの流れで管理します。"},stats:[{value:"1985",label:"自動車部品の精密加工を基盤に設立",unit:""},{value:"5",label:"主要製品群 BSM、EV、Steering、Powertrain、Driveline",unit:""},{value:"100%",label:"図面ベースのカスタムOEM生産に対応",unit:""},{value:"40+",label:"積み重ねた製造ノウハウと現場経験",unit:""},{value:"1",label:"開発から量産までつながる製造パートナー",unit:""}],historyHeading:{eyebrow:"History",since:"Since 1985",title:"ソウル産業の製造基盤が広がってきた時間",copy:"操舵部品の量産から始まり、品質認証、研究開発、グローバル顧客の拡大、生産技術の高度化を経て、自動車部品OEM製造の基盤を広げてきました。"},historyEras:[{period:"2020 ~ 現在",title:"成長の安定化と再跳躍",summary:"認証基盤を強化し、新たなグローバル顧客との取引を広げながら次の成長段階を準備しています。",items:["INNOBIZ認証を取得","BorgWarner、GMB、BOCAR、Namyang Nexmoなど新規顧客を拡大"],partners:["BORGWARNER","GMB","BOCAR","NAMYANG NEXMO"]},{period:"2010 ~ 2019",title:"グローバル市場での成長拡大",summary:"品質認証、輸出実績、生産技術特許をもとに、グローバル自動車市場への対応範囲を広げました。",items:["現代モービスSQ認証を取得","3千万ドル輸出の塔を受賞","ALダイカスト事業に進出","自動車部品生産関連の技術特許を多数登録","ヨンファ工業、GKN Driveline、Spartanとの新規取引を開始"],partners:["GKN DRIVE LINE","SPARTAN","ヨンファ工業"]},{period:"2000 ~ 2009",title:"グローバル自動車市場への参加",summary:"環境・品質認証と企業付設研究所の設立により、グローバルOEM対応体制を整え始めました。",items:["ISO 14001認証を取得","IATF/TS 16949認証を取得","企業付設研究所を設立","ZF、AAM、Nexteer、ThyssenKrupp、Magna Powertrain、Hyundai Mobis、ERAE AMSなど顧客ネットワークを拡大"],partners:["ZF","AAM","NEXTEER","THYSSENKRUPP","MAGNA POWERTRAIN","HYUNDAI MOBIS","ERAE AMS"]},{period:"1985 ~ 1999",title:"精密加工基盤の構築",summary:"ソウル産業を設立し、自動車操舵部品の量産を開始して製造基盤を築きました。",items:["1985年 会社設立","TRW自動車操舵部品の量産を開始"],partners:["TRW"]}],global:{copy:`自動車産業のサプライチェーンは、正確な日程と揺るがない品質から始まります。
ソウル産業は顧客の開発日程と量産計画に合わせ、精密加工部品を安定して供給します。`,lines:["今日も1μm単位の精密さで","完成車の信頼を支えます。"],networkTitle:"OEM Manufacturing Network"},partnerLogos:partnerMarks.map((u,i)=>({...u,region:["米国","米国","韓国 / グローバル","韓国","グローバル","韓国","米国 / メキシコ","米国"][i] ?? u.region,role:["トランスミッション/シャフト量産プログラム","GM/Ford連携の軽量部品プログラム","ステアリング部品供給プログラム","韓国国内のステアリング/モジュールプログラム","グローバルステアリングシステムプログラム","韓国自動車部品プログラム","ドライブライン輸出プログラム","北米パワートレイン供給プログラム"][i]})),achievementsHeading:{eyebrow:"at a Glance",titleLines:["図面検討から量産供給まで","数字で見るソウル産業の製造基盤"]},globalAchievements:[{label:"設立",value:"1985",unit:"SINCE"},{label:"売上規模",value:"510億",unit:"KRW"},{label:"従業員",value:"185",unit:"PEOPLE"},{label:"月間量産数",value:"300,000+",unit:"PARTS / MONTH"}],clientCollabStatement:"SEOUL INDUSTRY BUILDS PRECISE OEM PARTNERSHIPS THROUGH MACHINING, QUALITY, AND DELIVERY.",clientPartners:[{index:"01",name:"Metaldyne",mark:"METALDYNE",role:"Transmission / Shaft Program",year:"USA",image:images.clientMetaldyne},{index:"02",name:"Spartan Light Metal Products",mark:"SPARTAN",role:"Die-Cast / Machined Components",year:"USA",image:images.clientSpartan},{index:"03",name:"Magna Powertrain",mark:"MAGNA",role:"Powertrain / Driveline Program",year:"GLOBAL",image:images.clientMagna},{index:"04",name:"TRW · Hyundai Mobis",mark:"TRW MOBIS",role:"Steering / Module Program",year:"KOREA",image:images.clientTrwMobis},{index:"05",name:"GKN Driveline",mark:"GKN",role:"Driveline Export Program",year:"GLOBAL",image:images.clientGkn},{index:"06",name:"MPT Muncie",mark:"MPT",role:"North America Powertrain Supply",year:"USA",image:images.clientMpt}],esgHeading:{eyebrow:"ESG Management",title:"持続可能な製造に向けたソウル産業の責任",copy:"精密加工企業として環境負荷を減らし、安全な現場と透明な基準を通じて長く続くOEMパートナーシップを築きます。"},esgPillars:[{keyword:"ENVIRONMENTAL",eyebrow:"Responsible Manufacturing",title:"環境とともに進む精密加工",copy:"エネルギー使用、資源管理、工程安定化を合わせて見ながら、製造過程の環境負荷を減らします。",bullets:["エネルギーと資源使用の削減","工程効率化による無駄の最小化","環境規制と現場基準の遵守"],image:images.esgEnvironmental,accent:"#6f9f58"},{keyword:"SOCIAL",eyebrow:"Safe Workplace",title:"安全で熟練した製造現場",copy:"従業員の安全と現場力を基盤に、顧客が信頼できる品質と納期対応を継続します。",bullets:["安全な作業環境の維持","現場熟練度と品質意識の強化","顧客・協力会社との責任ある関係"],image:images.esgSocial,accent:"#e9631a"},{keyword:"GOVERNANCE",eyebrow:"Transparent Standard",title:"透明な基準でつながるOEMパートナーシップ",copy:"図面、品質、納期、取引基準を明確に管理し、長期的な信頼を築きます。",bullets:["品質記録と工程履歴の管理","顧客要求事項と変更履歴の確認","公正で透明な取引基準"],image:images.esgGovernance,accent:"#303344"}],mediaHeading:{title:"NEWS",copy:"製品群、工程、品質対応に関するソウル産業の最新情報をご確認ください。",cta:"詳しく見る"},mediaItems:[{type:"お知らせ",title:"ソウル産業の新しいグローバルサイトを準備中です",date:"2026-05-28"},{type:"製品",title:"BSM、EV、Steering製品群の精密加工ラインアップ",date:"2026-05-21"},{type:"品質",title:"図面ベースのOEM開発対応と品質検査プロセス",date:"2026-05-15"},{type:"製造",title:"自動車部品量産工程における反復精度管理",date:"2026-05-09"},{type:"資料",title:"Driveline部品と動力伝達系加工のご案内",date:"2026-04-30"}],footer:{tagline:"Precision Automotive Components OEM",address:"+82-31-366-1141 · Hwaseong, Korea"}}};
