import {
  siteContent as baseSiteContent,
  type EsgPillar,
  type Highlight,
  type HistoryEra,
  type LanguageCode,
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

const clientStatement = "SEOUL INDUSTRY BUILDS OEM PARTNERSHIPS THROUGH PRECISION MACHINING, QUALITY CONTROL, AND RELIABLE DELIVERY.";

function applyKoreanCopy(content: SiteContent) {
  Object.assign(content.hero, {
    fillLines: ["도면 검토부터 양산 공급까지,", "자동차 부품 OEM 생산을 끝까지 책임집니다."],
  });

  content.highlights = patchById<Highlight>(content.highlights, [
    {
      id: "machining",
      title: "정밀가공\n라인업",
      copy: "BSM, EV, Steering, Powertrain, Driveline 부품의 반복 정밀도와 표면 품질을 공정 조건으로 잡습니다. 전용 설비와 검사 기준을 함께 고정해 양산 편차를 줄입니다.",
    },
    {
      id: "quality",
      title: "품질을\n공정 안으로",
      copy: "치수, 형상, 조립 품질을 LOT 단위로 확인하고 생산 조건과 연결합니다. 검사 결과가 출하 전 기준에 다시 반영되어 납품 품질을 잡아 줍니다.",
    },
    {
      id: "mass-production",
      title: "글로벌\n공급 대응",
      copy: "개발 일정, 생산 부하, 포장, 출하 흐름을 한 화면에서 봅니다. 고객사의 양산 계획에 맞춰 정밀가공 부품을 안정적으로 공급합니다.",
    },
  ]);

  Object.assign(content.solutionHeading, {
    copy: "도면 검토, 정밀가공, 품질검사, 양산 공급까지. 서울산업은 고객의 생산 계획에 맞춰 자동차 부품 OEM 제조의 흐름 전체를 하나로 잇습니다.",
  });
  content.solutions = patchById<Solution>(content.solutions, [
    {
      id: "machining",
      copy: "부품별 가공 조건을 표준화해 자동차 부품에 필요한 반복 정밀도와 표면 품질, 안정적인 생산성을 확보합니다.",
      details: ["부품군과 도면 요구 조건에 맞춰 CNC 조건을 설정합니다.", "반복 생산 중 치수 변동과 재가공을 줄입니다.", "설비 조건과 가공 이력을 기록해 품질 편차를 다잡습니다."],
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
    title: "서울산업이 제조 기준을 넓혀 온 시간",
    copy: "1985년 조향부품 양산을 시작으로 품질 인증, 연구개발, 글로벌 고객 확대, 생산 기술 고도화를 이어오며 자동차 부품 OEM 제조 기반을 넓혀 왔습니다.",
  });
  content.historyEras = patchByIndex<HistoryEra>(content.historyEras, [
    {
      title: "인증 기반 강화와 신규 고객 확대",
      summary: "인증 체계와 고객 포트폴리오를 넓히며 다음 성장 단계를 준비하고 있습니다.",
      items: ["INNOBIZ 인증 획득", "BorgWarner, GMB, BOCAR, Namyang Nexmo 등 신규 고객사 확대"],
    },
    {
      title: "글로벌 시장 대응력 확대",
      summary: "품질 인증, 수출 성과, 생산 기술 특허를 바탕으로 글로벌 자동차 시장 대응 범위를 넓혔습니다.",
      items: ["현대모비스 SQ 인증 획득", "3천만불 수출의 탑 수상", "AL 다이캐스팅 사업 진출", "자동차 부품 생산 관련 기술 특허 다수 등록", "영화공업, GKN Driveline, Spartan 신규 거래"],
    },
    {
      title: "글로벌 OEM 대응 체계 구축",
      summary: "환경·품질 인증과 기업부설 연구소 설립을 통해 글로벌 고객 대응 기반을 마련했습니다.",
      items: ["ISO 14001 인증 획득", "IATF/TS 16949 인증 획득", "기업부설 연구소 설립", "ZF, AAM, Nexteer, ThyssenKrupp, Magna Powertrain, Hyundai Mobis, ERAE AMS 등 고객 네트워크 확대"],
    },
    {
      title: "정밀가공 제조 기반 구축",
      summary: "서울산업을 설립하고 자동차 조향부품 양산을 시작하며 정밀가공 제조 기반을 만들었습니다.",
    },
  ]);

  Object.assign(content.global, {
    copy: "정확한 일정과 흔들리지 않는 품질은 자동차 부품 공급망의 기본입니다.\n서울산업은 고객의 개발 일정과 양산 계획에 맞춰 정밀가공 부품을 안정적으로 공급합니다.",
    lines: ["1μm 단위의 정밀함으로,", "완성차의 신뢰를 뒷받침합니다."],
  });
  content.achievementsHeading.titleLines = ["도면 검토부터 양산 공급까지", "서울산업의 제조 기반"];
  content.clientCollabStatement = clientStatement;
  Object.assign(content.esgHeading, {
    copy: "정밀가공 기업으로서 환경 부담을 줄이고 안전한 현장과 투명한 기준을 지키며, 오래 가는 OEM 파트너십을 만들어 갑니다.",
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
    copy: "제품, 공정, 품질, OEM 공급과 관련된 서울산업의 새로운 소식을 확인하세요.",
  });
}

function applyEnglishCopy(content: SiteContent) {
  Object.assign(content.hero, {
    fillLines: ["From the first drawing to full production,", "we engineer the precision behind every OEM part."],
  });

  content.highlights = patchById<Highlight>(content.highlights, [
    {
      id: "machining",
      title: "Precision\nMachining Lines",
      copy: "We machine BSM, EV, steering, powertrain, and driveline parts to repeatable tolerances and clean surface finishes. Locking process settings to inspection criteria keeps variation low, run after run.",
    },
    {
      id: "quality",
      title: "Quality\nBuilt Into Every Step",
      copy: "We check dimensions, geometry, and assembly fit lot by lot, then tie every result back to how the part is made. What we learn on the floor sharpens our standards before anything ships.",
    },
    {
      id: "mass-production",
      title: "Global Supply,\nOn Schedule",
      copy: "Development timelines, capacity, packing, and shipping run as one connected flow — so OEM programs get the precision parts they need, exactly when they need them.",
    },
  ]);

  Object.assign(content.solutionHeading, {
    copy: "From drawing review and precision machining to inspection and volume supply, Seoul Industry keeps the entire OEM manufacturing flow under one roof.",
  });
  content.solutions = patchById<Solution>(content.solutions, [
    {
      id: "machining",
      title: "Precision Machining",
      copy: "Purpose-built machining setups hold repeatable accuracy, clean finishes, and steady output across every automotive part we make.",
      details: ["CNC settings tuned to each part family and drawing.", "Less dimensional drift and rework over long runs.", "Machine conditions logged to keep quality consistent."],
    },
    {
      id: "quality",
      title: "Quality Inspection",
      copy: "Every inspection ties back to how the part was made — so issues get caught and traced long before shipment.",
      details: ["Key dimensions and geometry checked lot by lot.", "Inspection data linked to process records.", "Outgoing quality held to each customer's standard."],
    },
    {
      id: "mass-production",
      title: "Volume Supply",
      copy: "Delivery planning, packing, inventory, and shipping all move in step with your production schedule.",
      details: ["Capacity planned against your delivery dates.", "Packing, inventory, and shipping matched to each program.", "Quality and delivery issues flagged fast on repeat orders."],
    },
  ]);

  Object.assign(content.historyHeading, {
    title: "How Seoul Industry built its manufacturing base",
    copy: "Since 1985, Seoul Industry has grown from a steering-parts maker into a full OEM manufacturing partner — with certified quality systems, in-house R&D, global customers, and advanced production technology.",
  });
  content.historyEras = patchByIndex<HistoryEra>(content.historyEras, [
    {
      title: "Stronger certifications, new customers",
      summary: "We're deepening our certifications and opening programs with new global customers as we set up the next stage of growth.",
      items: ["Earned INNOBIZ certification", "Opened new programs with BorgWarner, GMB, BOCAR, and Namyang Nexmo"],
    },
    {
      title: "Going global",
      summary: "Quality certifications, export milestones, and production patents widened our reach across the global automotive market.",
      items: ["Earned Hyundai Mobis SQ certification", "Won the USD 30 Million Export Tower award", "Entered the aluminum die-casting business", "Registered multiple automotive production patents", "Began work with Younghwa, GKN Driveline, and Spartan"],
    },
    {
      title: "Into global OEM programs",
      summary: "Environmental and quality certifications, plus our own research institute, laid the groundwork for global OEM work.",
      items: ["Earned ISO 14001 certification", "Earned IATF/TS 16949 certification", "Founded the corporate research institute", "Grew the customer network with ZF, AAM, Nexteer, ThyssenKrupp, Magna Powertrain, Hyundai Mobis, and ERAE AMS"],
    },
    {
      title: "Where precision machining began",
      summary: "Seoul Industry was founded and began volume production of automotive steering parts — the start of our precision machining base.",
    },
  ]);

  Object.assign(content.global, {
    copy: "In automotive supply, the schedule has to hold and the quality can't drift.\nSeoul Industry machines to exactly that standard — in step with your development and production plans.",
    lines: ["Precise to the micron,", "we stand behind every vehicle we help build."],
  });
  content.achievementsHeading.titleLines = ["From first drawing to full production —", "the base Seoul Industry is built on"];
  content.clientCollabStatement = clientStatement;
  Object.assign(content.esgHeading, {
    copy: "As a precision machining company, we keep our footprint light, our shop floor safe, and our standards clear — the foundation for OEM partnerships that last.",
  });
  content.esgPillars = patchByIndex<EsgPillar>(content.esgPillars, [
    {
      title: "Machining with a lighter footprint",
      copy: "We look at energy, resources, and process stability together to lower the environmental load of how we make parts.",
      bullets: ["Lower energy and resource use", "Less waste through tighter processes", "Compliance with environmental and site standards"],
    },
    {
      title: "A safe, skilled shop floor",
      copy: "Our people's safety and skill are what keep quality steady and deliveries on time for every customer.",
      bullets: ["Safe working conditions, maintained day to day", "Sharper shop-floor skill and quality mindset", "Responsible relationships with customers and partners"],
    },
    {
      title: "Partnerships built on clear standards",
      copy: "We keep drawing control, quality records, delivery terms, and every dealing transparent — that's how trust holds up over the long run.",
      bullets: ["Quality records and process history kept in order", "Customer requirements and revisions tracked", "Fair, transparent business dealings"],
    },
  ]);
  Object.assign(content.mediaHeading, {
    copy: "The latest from Seoul Industry — products, processes, quality, and OEM supply.",
  });
}

function applyJapaneseCopy(content: SiteContent) {
  Object.assign(content.hero, {
    fillLines: ["図面の検討から量産供給まで。", "OEM部品の精度を、工程で造り込みます。"],
  });

  content.highlights = patchById<Highlight>(content.highlights, [
    {
      id: "machining",
      title: "精密加工\nライン",
      copy: "BSM、EV、ステアリング、パワートレイン、ドライブライン部品の反復精度と表面品質を工程条件で造り込みます。専用の加工条件と検査基準をそろえ、量産でのばらつきを抑え込みます。",
    },
    {
      id: "quality",
      title: "品質を\n工程の中へ",
      copy: "寸法、形状、組立品質をLOT単位で確認し、生産条件と結びつけます。検査結果を工程へフィードバックし、出荷前に品質を確かなものにします。",
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
      copy: "部品ごとに加工条件を整え、自動車部品に求められる反復精度、表面品質、安定した生産性を確保します。",
      details: ["部品群と図面要求に合わせてCNC条件を設定します。", "反復生産での寸法変動と再加工を抑えます。", "設備条件と加工履歴を記録し、品質のばらつきを抑えます。"],
    },
    {
      id: "quality",
      copy: "検査結果を生産条件と結びつけ、出荷前に品質課題を追える体制を整えています。",
      details: ["主要寸法と形状をLOT単位で確認します。", "検査データを工程記録と連携します。", "顧客の納入基準に合わせて出荷品質を安定させます。"],
    },
    {
      id: "mass-production",
      copy: "納期計画、梱包、在庫、出荷の流れを顧客の生産計画に合わせて管理します。",
      details: ["生産負荷と納期計画を合わせて確認します。", "梱包、在庫、出荷条件を納入基準に合わせます。", "反復供給で生じる品質・納期の課題をすばやく共有します。"],
    },
  ]);

  Object.assign(content.historyHeading, {
    title: "ソウル産業が製造基盤を広げてきた歩み",
    copy: "1985年の操舵部品量産を起点に、品質認証、研究開発、グローバル顧客の拡大、生産技術の高度化を重ね、自動車部品OEM製造の基盤を広げてきました。",
  });
  content.historyEras = patchByIndex<HistoryEra>(content.historyEras, [
    {
      title: "認証基盤の強化と新規顧客の拡大",
      summary: "認証体制と顧客ポートフォリオを広げ、次の成長段階に向けた基盤を整えています。",
      items: ["INNOBIZ認証を取得", "BorgWarner、GMB、BOCAR、Namyang Nexmoなど新規顧客を拡大"],
    },
    {
      title: "グローバル市場への展開",
      summary: "品質認証、輸出実績、生産技術特許を土台に、グローバル自動車市場での対応範囲を広げました。",
      items: ["現代モービスSQ認証を取得", "3千万ドル輸出の塔を受賞", "アルミダイカスト事業に進出", "自動車部品生産に関する技術特許を多数登録", "ヨンファ工業、GKN Driveline、Spartanとの取引を開始"],
    },
    {
      title: "グローバルOEM対応体制の構築",
      summary: "環境・品質認証と企業付設研究所の設立により、グローバル顧客への対応基盤を整えました。",
      items: ["ISO 14001認証を取得", "IATF/TS 16949認証を取得", "企業付設研究所を設立", "ZF、AAM、Nexteer、ThyssenKrupp、Magna Powertrain、Hyundai Mobis、ERAE AMSなど顧客ネットワークを拡大"],
    },
    {
      title: "精密加工の製造基盤を構築",
      summary: "ソウル産業を設立し、自動車操舵部品の量産を開始して精密加工の基盤を築きました。",
    },
  ]);

  Object.assign(content.global, {
    copy: "自動車部品のサプライチェーンは、\n正確な日程とぶれない品質で成り立ちます。\nソウル産業は、顧客の開発日程と量産計画に合わせ、\n精密加工部品を安定供給します。",
    lines: ["1ミクロン単位の精度で、", "完成車の信頼を", "支え続けます。"],
  });
  content.achievementsHeading.titleLines = ["図面の検討から量産供給まで——", "ソウル産業の製造基盤"];
  content.clientCollabStatement = clientStatement;
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
      bullets: ["安全な作業環境の維持", "現場技能と品質意識の強化", "顧客・協力会社との責任ある関係"],
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
