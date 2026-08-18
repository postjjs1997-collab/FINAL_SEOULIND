import {
  siteContent as baseSiteContent,
  type ClientPartner,
  type EsgPillar,
  type Highlight,
  type HistoryEra,
  type LanguageCode,
  type PartnerLogo,
  type SiteContent,
  type Solution,
} from "./brainall";

export {
  defaultLanguage,
  globalVideo,
  heroVisual,
  isLanguageCode,
  languages,
  showcaseVideos,
} from "./brainall";
export type {
  ClientPartner,
  EsgPillar,
  GlobalAchievement,
  HeaderCopy,
  Highlight,
  HistoryEra,
  LanguageCode,
  LatestPart,
  MediaItem,
  PartnerLogo,
  ShowcaseVideo,
  SiteContent,
  Solution,
} from "./brainall";

type ContentMap = Record<LanguageCode, SiteContent>;
type IdPatch<T extends { id: string }> = { id: string } & Partial<T>;

const patchById = <T extends { id: string }>(items: T[], patches: Array<IdPatch<T>>) => {
  const patchMap = new Map(patches.map((patch) => [patch.id, patch]));
  return items.map((item) => ({ ...item, ...patchMap.get(item.id) }));
};

const patchByIndex = <T extends object>(items: T[], patches: Array<Partial<T>>) =>
  items.map((item, index) => ({ ...item, ...(patches[index] ?? {}) }));

const historyStartYear = (era: HistoryEra) => Number(era.period.match(/\d{4}/)?.[0] ?? 0);
const chronologicalHistoryEras = (eras: HistoryEra[]) =>
  [...eras].sort((first, second) => historyStartYear(first) - historyStartYear(second));

const clientStatements: Record<LanguageCode, string> = {
  ko: "서울산업은 정밀가공, 품질관리, 안정적인 납기로 OEM 파트너십을 만들어갑니다.",
  en: "SEOUL INDUSTRY BUILDS OEM PARTNERSHIPS THROUGH PRECISION MACHINING, QUALITY CONTROL, AND RELIABLE DELIVERY.",
  ja: "ソウル産業は精密加工、品質管理、安定供給でOEMパートナーシップを築きます。",
};

const partnerRegionPatches: Record<LanguageCode, Array<Partial<PartnerLogo>>> = {
  ko: [
    { region: "미국" },
    { region: "미국" },
    { region: "한국 / 글로벌" },
    { region: "한국" },
    { region: "글로벌" },
    { region: "한국" },
    { region: "미국 / 멕시코" },
    { region: "미국" },
  ],
  en: [],
  ja: [
    { region: "米国" },
    { region: "米国" },
    { region: "韓国 / グローバル" },
    { region: "韓国" },
    { region: "グローバル" },
    { region: "韓国" },
    { region: "米国 / メキシコ" },
    { region: "米国" },
  ],
};

const clientPartnerPatches: Record<LanguageCode, Array<Partial<ClientPartner>>> = {
  ko: [
    { role: "변속기 / 샤프트 프로그램", year: "미국" },
    { role: "다이캐스팅 / 가공 부품", year: "미국" },
    { role: "파워트레인 / 드라이브라인 프로그램", year: "글로벌" },
    { role: "조향 / 모듈 프로그램", year: "한국" },
    { role: "드라이브라인 양산 프로그램", year: "글로벌" },
    { role: "북미 파워트레인 공급", year: "미국" },
  ],
  en: [],
  ja: [
    { role: "トランスミッション / シャフトプログラム", year: "米国" },
    { role: "ダイカスト / 加工部品", year: "米国" },
    { role: "パワートレイン / ドライブラインプログラム", year: "グローバル" },
    { role: "ステアリング / モジュールプログラム", year: "韓国" },
    { role: "ドライブライン量産プログラム", year: "グローバル" },
    { role: "北米パワートレイン供給", year: "米国" },
  ],
};

function applyKoreanCopy(content: SiteContent) {
  Object.assign(content.hero, {
    fillLines: ["도면 검토부터 양산 공급까지,", "자동차 부품 OEM 생산을 끝까지 책임집니다."],
  });
  const productCopies = [
    "BSM HOUSING·OIL PUMP COMPONENT 알루미늄 가공 부품",
    "EV OIL PUMP HOUSING·COVER와 전동화용 GEAR·COAXIAL·LINK SHAFT",
    "PINION, PINION SHAFT, PISTON, RACK BUSH, TORSION BAR",
    "변속기용 SHAFT와 엔진용 CAMSHAFT NOSE PIECE, BALANCE SHAFT",
    "TRANSFER CASE·ETM용 DISC CARRIER, HUB, ACTUATOR SHAFT",
  ];
  const latestCopies = [
    "BSM 하우징·오일 펌프용 알루미늄 가공 부품",
    "EV 오일 펌프 하우징·커버와 전동화용 기어 샤프트·코액시얼 샤프트·링크 샤프트",
    "조향 장치용 피니언, 피니언 샤프트, 피스톤, 랙 부시, 토션 바",
    "캠샤프트 선단 구동계 연결 부품과 변속기용 샤프트",
    "트랜스퍼 케이스와 ETM용 디스크 캐리어, 허브, 액추에이터 샤프트",
  ];
  productCopies.forEach((copy, index) => Object.assign(content.products[index], { copy }));
  latestCopies.forEach((copy, index) => Object.assign(content.latestParts[index], { copy }));

  content.highlights = patchById<Highlight>(content.highlights, [
    {
      id: "machining",
      title: "정밀가공\n라인업",
      copy: "Steering, Powertrain, Driveline의 3대 핵심 제품군과 전동화 부품, 알루미늄 가공 부품의 반복 정밀도와 표면 품질을 공정 조건으로 관리합니다.",
    },
    {
      id: "quality",
      title: "품질을\n공정 안으로",
      copy: "치수, 형상, 조립 품질을 LOT 단위로 확인하고 생산 조건과 연결합니다. 검사 결과를 출하 전 기준에 반영해 납품 품질의 신뢰성을 높입니다.",
    },
    {
      id: "mass-production",
      title: "글로벌\n공급 대응",
      copy: "개발 일정, 생산 부하, 포장, 출하 흐름을 하나의 체계로 관리합니다. 고객사의 양산 계획에 맞춰 정밀가공 부품을 안정적으로 공급합니다.",
    },
  ]);

  Object.assign(content.solutionHeading, {
    copy: "도면 검토, 정밀가공, 품질검사, 양산 공급까지. 서울산업은 고객의 생산 계획에 맞춰 자동차 부품 OEM 제조의 흐름 전체를 하나로 잇습니다.",
  });
  content.solutions = patchById<Solution>(content.solutions, [
    {
      id: "machining",
      copy: "부품별 가공 조건을 표준화해 자동차 부품에 필요한 반복 정밀도와 표면 품질, 안정적인 생산성을 확보합니다.",
      details: ["부품군과 도면 요구 조건에 맞춰 CNC 조건을 설정합니다.", "반복 생산 중 치수 변동과 재가공을 줄입니다.", "설비 조건과 가공 이력을 기록해 품질 편차를 줄입니다."],
    },
    {
      id: "quality",
      copy: "검사 결과를 생산 조건과 연결해 출하 전에 품질 이슈를 추적할 수 있는 체계를 운영합니다.",
      details: ["주요 치수와 형상을 LOT 단위로 확인합니다.", "검사 데이터를 공정 기록과 연결합니다.", "고객 납품 기준에 맞춰 출하 품질을 안정화합니다."],
    },
    {
      id: "mass-production",
      copy: "납기 계획, 포장, 재고, 출하 흐름을 고객사의 생산 일정에 맞춰 관리합니다.",
      details: ["생산 부하와 납기 계획을 함께 확인합니다.", "포장, 재고, 출하 조건을 납품 기준에 맞춥니다.", "반복 공급 중 생기는 품질·납기 이슈를 빠르게 공유합니다."],
    },
  ]);

  Object.assign(content.historyHeading, {
    title: "서울산업이 제조 기반을 확장해 온 역사",
    copy: "1985년 설립 이후 조향 부품, 파워트레인, 드라이브라인과 전동화 부품으로 영역을 넓히며 품질 인증, 연구 개발, 글로벌 고객 대응과 생산 기술을 고도화해 왔습니다.",
  });
  content.historyEras = patchByIndex<HistoryEra>(content.historyEras, [
    {
      title: "전동화 대응과 신규 고객 확대",
      summary: "내연기관부터 HEV, PHEV, BEV까지 대응 범위를 넓히며 다음 성장 단계를 준비하고 있습니다.",
      items: ["2021년 AAM 미국·한국 협력업체 등록", "2022년 PHEV Gear Box용 Link Shaft 양산 시작", "2025년 ICE·HEV·PHEV·BEV 신규 고객 개발"],
    },
    {
      title: "글로벌 사업 영역 확대",
      summary: "유럽과 북미 고객 프로그램을 확대하며 드라이브라인 사업 기반을 넓혔습니다.",
      items: ["2012년 GKN Driveline 유럽·미국 협력업체 등록", "2014년 Spartan LTM 미국 협력업체 등록", "드라이브라인 제품군 및 글로벌 고객 프로그램 확대"],
    },
    {
      title: "글로벌 OEM 대응 기반 구축",
      summary: "품질·환경 인증과 공장 확장, 글로벌 고객 등록을 통해 양산 대응 기반을 강화했습니다.",
      items: ["2001년 QS9000·ISO 9002 인증", "2002년 Delphi Korea 협력업체 등록", "2003년 TRW 미국·일본·말레이시아 협력업체 등록", "2004년 Metaldyne 미국·한국 협력업체 등록 및 ISO/TS 16949·ISO 14001 인증", "2006년 공장 확장 이전", "2007년 Nexteer, ThyssenKrupp Presta, Magna Powertrain 협력업체 등록"],
    },
    {
      title: "정밀 가공 기반 구축",
      summary: "서울산업을 설립하고 조향부품과 헬리컬 기어 샤프트 양산 기반을 구축했습니다.",
      items: ["1985년 서울산업 설립", "1987년 TRW Korea 협력업체 등록", "1990년 조향 부품 사업 진출", "1999년 Pinion Shaft, Piston, Torsion Bar 및 헬리컬 기어 샤프트 제조"],
    },
  ]);
  content.historyEras = chronologicalHistoryEras(content.historyEras);

  Object.assign(content.global, {
    copy: "정확한 일정과 흔들리지 않는 품질은 자동차 부품 공급망의 기본입니다.\n서울산업은 고객의 개발 일정과 양산 계획에 맞춰 정밀가공 부품을 안정적으로 공급합니다.",
    lines: ["1μm 단위의 정밀함으로,", "완성차의 신뢰를 뒷받침합니다."],
  });
  content.achievementsHeading.titleLines = ["도면 검토부터 양산 공급까지", "서울산업의 제조 기반"];
  content.globalAchievements = [
    { label: "설립", value: "1985", unit: "SINCE" },
    { label: "주요 적용 시스템", value: "5", unit: "AUTOMOTIVE SYSTEMS" },
    { label: "연계 생산·검사 공정", value: "13", unit: "PROCESSES" },
    { label: "글로벌 대응 지역", value: "5", unit: "REGIONS" },
  ];
  content.partnerLogos = patchByIndex<PartnerLogo>(content.partnerLogos, partnerRegionPatches.ko);
  content.clientCollabStatement = clientStatements.ko;
  content.clientPartners = patchByIndex<ClientPartner>(content.clientPartners, clientPartnerPatches.ko);
  Object.assign(content.esgHeading, {
    copy: "정밀가공 기업으로서 환경 부담을 줄이고 안전한 현장과 투명한 기준을 지키며, 지속 가능한 OEM 파트너십을 만들어 갑니다.",
  });
  content.esgPillars = patchByIndex<EsgPillar>(content.esgPillars, [
    {
      title: "환경 부담을 낮추는 정밀가공",
      copy: "에너지 사용, 자원 관리, 공정 안정화를 함께 점검해 제조 과정에서 생기는 환경 부담을 줄입니다.",
      bullets: ["에너지와 자원 사용 절감", "공정 효율화를 통한 낭비 최소화", "환경 규제와 현장 기준 준수"],
    },
    {
      title: "안전하고 숙련된 제조 현장",
      copy: "임직원의 안전과 현장 역량을 바탕으로 고객이 믿고 맡길 수 있는 품질과 납기를 이어갑니다.",
      bullets: ["안전한 작업 환경 유지", "현장 숙련도와 품질 의식 강화", "고객·협력사와의 책임 있는 관계"],
    },
    {
      title: "투명한 기준으로 연결되는 OEM 파트너십",
      copy: "도면, 품질, 납기, 거래 기준을 명확하게 관리해 장기적인 신뢰를 쌓습니다.",
      bullets: ["품질 기록과 공정 이력 관리", "고객 요구사항과 변경 이력 확인", "정직하고 투명한 거래 기준"],
    },
  ]);
  Object.assign(content.mediaHeading, {
    copy: "제품, 공정, 품질, OEM 공급과 관련된 서울산업의 최신 소식을 확인하세요.",
  });
}

function applyEnglishCopy(content: SiteContent) {
  Object.assign(content.hero, {
    fillLines: ["From the first drawing to full production,", "we engineer the precision behind every OEM part."],
  });
  const productCopies = [
    "Machined-aluminum BSM housings and oil-pump components.",
    "EV oil-pump housings and covers plus electrified-powertrain gear shafts, coaxial shafts, and link shafts.",
    "Pinions, pinion shafts, pistons, rack bushes, and torsion bars.",
    "Transmission shafts plus camshaft nose pieces and balance shafts for powertrain systems.",
    "Disc carriers, hubs, and actuator shafts for transfer-case and ETM systems.",
  ];
  const latestCopies = [
    "Machined-aluminum BSM housings and oil-pump components.",
    "EV oil-pump housings and covers plus electrified-powertrain gear shafts, coaxial shafts, and link shafts.",
    "Pinions, pinion shafts, pistons, rack bushes, and torsion bars for steering systems.",
    "Camshaft-end drive-interface components and transmission shafts.",
    "Disc carriers, hubs, and actuator shafts for transfer-case and ETM systems.",
  ];
  productCopies.forEach((copy, index) => Object.assign(content.products[index], { copy }));
  latestCopies.forEach((copy, index) => Object.assign(content.latestParts[index], { copy }));

  content.highlights = patchById<Highlight>(content.highlights, [
    {
      id: "machining",
      title: "Precision\nMachining Lines",
      copy: "We control repeatability and surface quality across three core families—Steering, Powertrain, and Driveline—plus electrified and machined-aluminum parts.",
    },
    {
      id: "quality",
      title: "Quality\nBuilt Into Every Step",
      copy: "We check dimensions, geometry, and assembly fit lot by lot, then tie every result back to how the part is made. What we learn on the floor sharpens our standards before anything ships.",
    },
    {
      id: "mass-production",
      title: "Global Supply,\nOn Schedule",
      copy: "Development timelines, capacity, packing, and shipping run as one connected flow—so OEM programs get the precision parts they need exactly when they need them.",
    },
  ]);

  Object.assign(content.solutionHeading, {
    copy: "From drawing review and precision machining to inspection and volume supply, Seoul Industry manages the entire OEM manufacturing process as one connected flow.",
  });
  content.solutions = patchById<Solution>(content.solutions, [
    {
      id: "machining",
      title: "Precision Machining",
      copy: "Purpose-built machining setups maintain repeatable accuracy, consistent surface quality, and stable output across our automotive components.",
      details: ["CNC settings tuned to each part family and drawing.", "Less dimensional drift and rework over long runs.", "Machine conditions logged to keep quality consistent."],
    },
    {
      id: "quality",
      title: "Quality Inspection",
      copy: "Every inspection ties back to how the part was made—so issues are detected and traced well before shipment.",
      details: ["Key dimensions and geometry checked lot by lot.", "Inspection data linked to process records.", "Outgoing quality held to each customer's standard."],
    },
    {
      id: "mass-production",
      title: "Volume Supply",
      copy: "Delivery planning, packing, inventory, and shipping all move in step with your production schedule.",
      details: ["Capacity planned against your delivery dates.", "Packing, inventory, and shipping matched to each program.", "Quality and delivery issues flagged quickly during ongoing production."],
    },
  ]);

  Object.assign(content.historyHeading, {
    title: "How Seoul Industry built its manufacturing base",
    copy: "Founded in 1985, Seoul Industry expanded from steering into powertrain, driveline, and electrified components while strengthening certified quality, R&D, global customer support, and production technology.",
  });
  content.historyEras = patchByIndex<HistoryEra>(content.historyEras, [
    {
      title: "Electrification and new customer programs",
      summary: "The product range now covers ICE, HEV, PHEV, and BEV programs.",
      items: ["Registered as an AAM supplier in the US and Korea in 2021", "Launched PHEV gearbox Link Shaft production in 2022", "Developing new ICE, HEV, PHEV, and BEV customers from 2025"],
    },
    {
      title: "Global business expansion",
      summary: "European and North American customer programs expanded the company's driveline business base.",
      items: ["Registered as a supplier to GKN Driveline in Europe and the United States in 2012", "Registered as a supplier to Spartan LTM in the United States in 2014", "Expanded driveline products and global customer programs"],
    },
    {
      title: "Global OEM operating base",
      summary: "Certifications, plant expansion, and global supplier registrations strengthened volume-production capability.",
      items: ["QS9000 and ISO 9002 certification in 2001", "Registered as a supplier to Delphi Korea in 2002", "Registered as a supplier to TRW in the United States, Japan, and Malaysia in 2003", "Registered as a supplier to Metaldyne in the United States and Korea and earned ISO/TS 16949 and ISO 14001 in 2004", "Expanded and relocated the plant in 2006", "Registered as a supplier to Nexteer, ThyssenKrupp Presta, and Magna Powertrain in 2007"],
    },
    {
      title: "Where precision machining began",
      summary: "Seoul Industry established its steering component and helical gear shaft manufacturing base.",
      items: ["Seoul Industry founded in 1985", "Registered as a supplier to TRW Korea in 1987", "Entered the steering component sector in 1990", "Manufactured pinion shafts, pistons, torsion bars, and helical gear shafts from 1999"],
    },
  ]);
  content.historyEras = chronologicalHistoryEras(content.historyEras);

  Object.assign(content.global, {
    copy: "In automotive supply, schedules must hold and quality cannot drift.\nSeoul Industry machines to that standard—in step with your development and production plans.",
    lines: ["Precise to the micron,", "we stand behind every vehicle we help build."],
  });
  content.achievementsHeading.titleLines = ["From first drawing to full production—", "the manufacturing base behind Seoul Industry"];
  content.globalAchievements = [
    { label: "Founded", value: "1985", unit: "SINCE" },
    { label: "Core Applications", value: "5", unit: "AUTOMOTIVE SYSTEMS" },
    { label: "Connected Operations", value: "13", unit: "PROCESSES" },
    { label: "Global Program Reach", value: "5", unit: "REGIONS" },
  ];
  content.clientCollabStatement = clientStatements.en;
  Object.assign(content.esgHeading, {
    copy: "As a precision machining company, we reduce our environmental footprint, keep our shop floor safe, and maintain clear standards—the foundation for lasting OEM partnerships.",
  });
  content.esgPillars = patchByIndex<EsgPillar>(content.esgPillars, [
    {
      title: "Machining with a lighter footprint",
      copy: "We review energy use, resources, and process stability together to reduce the environmental impact of our manufacturing.",
      bullets: ["Lower energy and resource use", "Less waste through tighter processes", "Compliance with environmental and site standards"],
    },
    {
      title: "A safe, skilled shop floor",
      copy: "Our people's safety and skill are what keep quality steady and deliveries on time for every customer.",
      bullets: ["Safe working conditions, maintained day to day", "Sharper shop-floor skill and quality mindset", "Responsible relationships with customers and partners"],
    },
    {
      title: "Partnerships built on clear standards",
      copy: "We keep drawing control, quality records, delivery terms, and business practices transparent—that is how we build trust for the long term.",
      bullets: ["Quality records and process history kept in order", "Customer requirements and revisions tracked", "Fair, transparent business dealings"],
    },
  ]);
  Object.assign(content.mediaHeading, {
    copy: "The latest from Seoul Industry—products, processes, quality, and OEM supply.",
  });
}

function applyJapaneseCopy(content: SiteContent) {
  Object.assign(content.hero, {
    fillLines: ["図面の検討から量産供給まで。", "OEM部品の精度を、工程で造り込みます。"],
  });
  const productCopies = [
    "BSMハウジング・オイルポンプ用アルミ加工部品",
    "EVオイルポンプハウジング・カバーと電動化パワートレイン向けギヤシャフト、コアキシャルシャフト、リンクシャフト",
    "ピニオン、ピニオンシャフト、ピストン、ラックブッシュ、トーションバー",
    "トランスミッション用シャフトとエンジン用カムシャフトノーズピース、バランスシャフト",
    "トランスファーケース・ETM向けのディスクキャリア、ハブ、アクチュエーターシャフト類",
  ];
  const latestCopies = [
    "BSMハウジング・オイルポンプ用アルミ加工部品",
    "EVオイルポンプのハウジング・カバーと電動化パワートレイン向けギヤシャフト、コアキシャルシャフト、リンクシャフト",
    "ステアリングシステム用ピニオン、ピニオンシャフト、ピストン、ラックブッシュ、トーションバー",
    "カムシャフト先端の駆動系連結部品とトランスミッション用シャフト",
    "トランスファーケース・ETM向けディスクキャリア、ハブ、アクチュエーターシャフト",
  ];
  productCopies.forEach((copy, index) => Object.assign(content.products[index], { copy }));
  latestCopies.forEach((copy, index) => Object.assign(content.latestParts[index], { copy }));

  content.highlights = patchById<Highlight>(content.highlights, [
    {
      id: "machining",
      title: "精密加工\nライン",
      copy: "ステアリング、パワートレイン、ドライブラインの3大中核製品群に加え、電動化部品とアルミ加工部品の繰り返し精度・表面品質を工程条件で管理します。",
    },
    {
      id: "quality",
      title: "品質を\n工程の中へ",
      copy: "寸法、形状、組立品質をロット単位で確認し、生産条件と結びつけます。検査結果を工程へフィードバックし、出荷前に品質を確かなものにします。",
    },
    {
      id: "mass-production",
      title: "グローバル\n供給対応",
      copy: "開発日程、生産負荷、梱包、出荷までを一つの流れとして管理します。顧客の量産計画に合わせ、精密加工部品を安定して供給します。",
    },
  ]);

  Object.assign(content.solutionHeading, {
    copy: "図面の検討から精密加工、品質検査、量産供給まで。ソウル産業は自動車部品OEMの製造フロー全体を一つにつなぎます。",
  });
  content.solutions = patchById<Solution>(content.solutions, [
    {
      id: "machining",
      copy: "部品ごとに加工条件を整え、自動車部品に求められる繰り返し精度、表面品質、安定した生産性を確保します。",
      details: ["部品群と図面要件に合わせてCNC条件を設定します。", "繰り返し生産での寸法変動と再加工を抑えます。", "設備条件と加工履歴を記録し、品質のばらつきを抑えます。"],
    },
    {
      id: "quality",
      copy: "検査結果を生産条件と結びつけ、出荷前に品質課題を追える体制を整えています。",
      details: ["主要寸法と形状をロット単位で確認します。", "検査データを工程記録と連携します。", "顧客の納入基準に合わせて出荷品質を安定させます。"],
    },
    {
      id: "mass-production",
      copy: "納期計画、梱包、在庫、出荷の流れを顧客の生産計画に合わせて管理します。",
      details: ["生産負荷と納期計画を合わせて確認します。", "梱包、在庫、出荷条件を納入基準に合わせます。", "継続供給で生じる品質・納期の課題をすばやく共有します。"],
    },
  ]);

  Object.assign(content.historyHeading, {
    title: "ソウル産業が製造基盤を広げてきた歩み",
    copy: "1985年の設立以来、操舵部品からパワートレイン、ドライブライン、電動化部品へ領域を広げ、品質認証、研究開発、グローバル顧客対応、生産技術を高度化してきました。",
  });
  content.historyEras = patchByIndex<HistoryEra>(content.historyEras, [
    {
      title: "電動化対応と新規顧客拡大",
      summary: "ICE、HEV、PHEV、BEVまで対応範囲を広げています。",
      items: ["2021年 AAM米国・韓国のサプライヤーとして登録", "2022年 PHEVギヤボックス用リンクシャフトの量産開始", "2025年 ICE・HEV・PHEV・BEVの新規顧客開発"],
    },
    {
      title: "グローバル事業領域の拡大",
      summary: "欧州・北米の顧客プログラムを拡大し、ドライブライン事業の基盤を広げました。",
      items: ["2012年 GKN Driveline欧州・米国のサプライヤーとして登録", "2014年 Spartan LTM米国のサプライヤーとして登録", "ドライブライン製品群とグローバル顧客プログラムを拡大"],
    },
    {
      title: "グローバルOEM対応基盤の構築",
      summary: "品質・環境認証、工場拡張、グローバル顧客登録で量産対応力を強化しました。",
      items: ["2001年 QS9000・ISO 9002認証", "2002年 Delphi Koreaのサプライヤーとして登録", "2003年 TRW米国・日本・マレーシアのサプライヤーとして登録", "2004年 Metaldyne米国・韓国のサプライヤーとして登録、ISO/TS 16949・ISO 14001認証", "2006年 工場拡張移転", "2007年 Nexteer、ThyssenKrupp Presta、Magna Powertrainのサプライヤーとして登録"],
    },
    {
      title: "精密加工の製造基盤を構築",
      summary: "操舵部品とヘリカルギヤシャフトの製造基盤を構築しました。",
      items: ["1985年 ソウル産業設立", "1987年 TRW Koreaのサプライヤーとして登録", "1990年 操舵部品事業へ進出", "1999年 ピニオンシャフト、ピストン、トーションバー、ヘリカルギヤシャフトを製造"],
    },
  ]);
  content.historyEras = chronologicalHistoryEras(content.historyEras);

  Object.assign(content.global, {
    copy: "自動車部品のサプライチェーンは、\n正確な日程とぶれない品質で成り立ちます。\nソウル産業は、顧客の開発日程と量産計画に合わせ、\n精密加工部品を安定供給します。",
    lines: ["1ミクロン単位の精度で、", "完成車の信頼を", "支え続けます。"],
  });
  content.achievementsHeading.titleLines = ["図面の検討から量産供給まで——", "ソウル産業の製造基盤"];
  content.globalAchievements = [
    { label: "設立", value: "1985", unit: "SINCE" },
    { label: "主要適用システム", value: "5", unit: "AUTOMOTIVE SYSTEMS" },
    { label: "連携する生産・検査工程", value: "13", unit: "PROCESSES" },
    { label: "グローバル対応地域", value: "5", unit: "REGIONS" },
  ];
  content.partnerLogos = patchByIndex<PartnerLogo>(content.partnerLogos, partnerRegionPatches.ja);
  content.clientCollabStatement = clientStatements.ja;
  content.clientPartners = patchByIndex<ClientPartner>(content.clientPartners, clientPartnerPatches.ja);
  Object.assign(content.esgHeading, {
    copy: "精密加工企業として環境負荷を抑え、安全な現場と透明な基準を守りながら、長く続くOEMパートナーシップを築きます。",
  });
  content.esgPillars = patchByIndex<EsgPillar>(content.esgPillars, [
    {
      title: "環境負荷を抑える精密加工",
      copy: "エネルギー使用、資源管理、工程安定化をまとめて見直し、製造過程で生じる環境負荷を減らします。",
      bullets: ["エネルギーと資源使用の削減", "工程効率化による無駄の最小化", "環境規制と現場基準の遵守"],
    },
    {
      title: "安全で熟練した製造現場",
      copy: "従業員の安全と現場力を土台に、顧客が安心して任せられる品質と納期対応を続けます。",
      bullets: ["安全な作業環境の維持", "現場技能と品質意識の強化", "顧客・サプライヤーとの責任ある関係"],
    },
    {
      title: "透明な基準でつながるOEMパートナーシップ",
      copy: "図面、品質、納期、取引の基準を明確に管理し、長期的な信頼を築きます。",
      bullets: ["品質記録と工程履歴の管理", "顧客要求事項と変更履歴の確認", "公正で透明な取引基準"],
    },
  ]);
  Object.assign(content.mediaHeading, {
    copy: "製品や工程、品質、OEM供給に関するソウル産業の最新情報をお届けします。",
  });
}

applyKoreanCopy(baseSiteContent.ko);
applyEnglishCopy(baseSiteContent.en);
applyJapaneseCopy(baseSiteContent.ja);

export const siteContent: ContentMap = baseSiteContent;
