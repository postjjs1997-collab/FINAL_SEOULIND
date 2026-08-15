import housingVideo1 from "../../assets/product-alpha/housing1.webm";
import housingVideo2 from "../../assets/product-alpha/housing2.webm";
import housingVideo3 from "../../assets/product-alpha/housing3.webm";
import housingVideo4 from "../../assets/product-alpha/housing4.webm";
import housingVideo5 from "../../assets/product-alpha/housing5.webm";
import housingPoster1 from "../../assets/video-posters/housing1.jpg";
import housingPoster2 from "../../assets/video-posters/hero-housing.jpg";
import housingPoster3 from "../../assets/video-posters/housing3.jpg";
import housingPoster4 from "../../assets/video-posters/housing4.jpg";
import housingPoster5 from "../../assets/video-posters/housing5.jpg";
import electricVehicleVideo1 from "../../electric vehicle1.mp4";
import electricVehicleVideo2 from "../../electric vehicle2.mp4";
import electricVehiclePoster1 from "../../assets/video-posters/electric-vehicle1.jpg";
import electricVehiclePoster2 from "../../assets/video-posters/electric-vehicle2.jpg";
import electrifiedLineupImage from "../../assets/product-catalog/lineup/electric-vehicle.webp";
import electrifiedLinkShaftPoster from "../../assets/product-catalog/electrified/link-shaft.jpg";
import electrifiedLinkShaftVideo from "../../assets/product-catalog/electrified/link-shaft.mp4";
import electrifiedCoaxialShaftPoster from "../../assets/product-catalog/electrified/coaxial-shaft.jpg";
import electrifiedCoaxialShaftVideo from "../../assets/product-catalog/electrified/coaxial-shaft.mp4";
import machinedAluminumLineupImage from "../../assets/product-catalog/lineup/balance-shaft-module.webp";
import steeringVideo1 from "../../assets/product-alpha/steering1.webm";
import steeringVideo2 from "../../assets/product-alpha/steering2.webm";
import steeringPoster1 from "../../assets/video-posters/steering1.jpg";
import steeringPoster2 from "../../assets/video-posters/steering2.jpg";
import drivelineVideo1 from "../../assets/product-alpha/driveline1.webm";
import drivelineVideo3 from "../../assets/product-alpha/driveline3.webm";
import drivelinePoster1 from "../../assets/video-posters/driveline1.jpg";
import drivelinePoster3 from "../../assets/video-posters/driveline3.jpg";
import transferCaseActuatorPoster from "../../assets/video-posters/driveline/transfer-case-actuator-shafts.jpg";
import transferCaseActuatorVideo from "../../assets/product-alpha/driveline/transfer-case-actuator-shafts.webm";
import discCarrierPoster from "../../assets/video-posters/driveline/disc-carrier-hub.jpg";
import discCarrierVideo from "../../assets/product-alpha/driveline/disc-carrier-hub.webm";
import transmissionOutputPoster from "../../assets/video-posters/powertrain/8l90-output-shafts.jpg";
import transmissionOutputVideo from "../../assets/product-alpha/powertrain/8l90-output-shafts.webm";
import transmission10r140Poster from "../../assets/video-posters/powertrain/10r140-transmission-shaft.jpg";
import transmission10r140Video from "../../assets/product-alpha/powertrain/10r140-transmission-shaft.webm";
import steeringLineupImage from "../../assets/product-catalog/lineup/steering.webp";
import powertrainLineupImage from "../../assets/product-catalog/lineup/powertrain.webp";
import drivelineLineupImage from "../../assets/product-catalog/lineup/driveline.webp";
import endPieceImage from "../../assets/product-catalog/powertrain/end-piece-dark.webp";
import endPieceVideo from "../../assets/product-catalog/powertrain/end-piece.webm";
import powertrainShaftVideo1 from "../../assets/product-catalog/powertrain/powertrain-shaft-01.webm";
import powertrainShaftPoster1 from "../../assets/product-catalog/powertrain/powertrain-shaft-01.jpg";
import defenseSpecialProjectsImage from "../../assets/product-catalog/etc/defense-special-projects.png";

export type ProductCatalogLanguage = "ko" | "en" | "ja";

export type ProductLocalizedText = Record<ProductCatalogLanguage, string>;

export type ProductPart = {
  title: ProductLocalizedText;
  application: ProductLocalizedText;
  poster: string;
  video: string;
};

export type ProductQualityControl = {
  feature: ProductLocalizedText;
  characteristic: ProductLocalizedText;
  verification: ProductLocalizedText;
};

export type ProductQualityStory = {
  eyebrow: string;
  title: ProductLocalizedText;
  copy: ProductLocalizedText;
  sourceSlides: number[];
};

export type ProductPartCatalog = {
  eyebrow: string;
  title: ProductLocalizedText;
  copy: ProductLocalizedText;
  overviewImage: string;
  overviewVideo?: string;
  families: string[];
  parts: ProductPart[];
  qualityStory?: ProductQualityStory;
  qualityControls: ProductQualityControl[];
};

const localized = (ko: string, en: string, ja: string): ProductLocalizedText => ({ ko, en, ja });

export const productPartCatalogByRoute: Record<string, ProductPartCatalog> = {
  "products/balance-shaft-module": {
    eyebrow: "MACHINED ALUMINUM COMPONENTS",
    title: localized(
      "밸런스 샤프트 모듈용 알루미늄 가공 부품",
      "Machined aluminum components for balance-shaft modules",
      "バランスシャフトモジュール向けアルミ加工部品",
    ),
    copy: localized(
      "밸런스 샤프트 모듈용 알루미늄 하우징과 오일 펌프를 가공합니다. 베어링 보어, 조립면, 오일 유로와 복합 형상의 정밀도를 통합 관리합니다.",
      "Aluminum housings and oil pumps for balance-shaft modules are machined with integrated control of bearing bores, assembly faces, oil passages, and complex geometry.",
      "バランスシャフトモジュール向けアルミハウジングとオイルポンプを加工し、ベアリングボア、組立面、オイル流路、複合形状を一体管理します。",
    ),
    overviewImage: machinedAluminumLineupImage,
    families: ["BSM HOUSING", "BSM OIL PUMP", "DIE-CAST ALUMINUM", "PRECISION MACHINING"],
    parts: [
      {
        title: localized("BSM 하우징 01", "BSM Housing 01", "BSMハウジング 01"),
        application: localized("밸런스 샤프트 모듈 하우징", "Balance shaft module housing", "バランスシャフトモジュール・ハウジング"),
        poster: housingPoster1,
        video: housingVideo1,
      },
      {
        title: localized("BSM 하우징 02", "BSM Housing 02", "BSMハウジング 02"),
        application: localized("베어링 보어·오일 유로 정밀 가공", "Precision bearing-bore and oil-passage machining", "ベアリングボア・オイル流路の精密加工"),
        poster: housingPoster2,
        video: housingVideo2,
      },
      {
        title: localized("BSM 하우징 03", "BSM Housing 03", "BSMハウジング 03"),
        application: localized("모듈 조립면과 복합 형상 가공", "Module faces and complex-geometry machining", "モジュール組立面・複合形状加工"),
        poster: housingPoster3,
        video: housingVideo3,
      },
      {
        title: localized("BSM 하우징 04", "BSM Housing 04", "BSMハウジング 04"),
        application: localized("알루미늄 하우징 정밀 가공", "Precision aluminum-housing machining", "アルミハウジング精密加工"),
        poster: housingPoster4,
        video: housingVideo4,
      },
      {
        title: localized("BSM 하우징 05", "BSM Housing 05", "BSMハウジング 05"),
        application: localized("밸런스 샤프트 어셈블리 하우징", "Balance shaft assembly housing", "バランスシャフト・アセンブリハウジング"),
        poster: housingPoster5,
        video: housingVideo5,
      },
    ],
    qualityStory: {
      eyebrow: "CAST-TO-MACHINING CONTROL",
      title: localized(
        "BSM 알루미늄 부품은 주조 단계부터 사내 가공까지 연결합니다",
        "BSM aluminum parts: from casting control to in-house machining",
        "BSMアルミ部品を鋳造管理から社内加工まで一貫して管理します",
      ),
      copy: localized(
        "BSM 하우징·오일 펌프는 알루미늄 다이캐스팅 단계의 유동·충전·가스·응고 해석, T5 열처리와 금형 유지보수, 서울산업의 사내 정밀 가공을 하나의 공급 흐름으로 관리합니다. 세부 관리 항목과 판정 기준은 승인 도면에 따릅니다.",
        "BSM housings and oil pumps are managed through one supply flow connecting casting-stage simulations for flow, filling, gas, and solidification with T5 treatment, mold maintenance, and Seoul Industry's in-house precision machining. Detailed controls and acceptance criteria follow approved drawings.",
        "BSMハウジング・オイルポンプは、アルミダイカスト工程の流動・充填・ガス・凝固解析、T5熱処理、金型保全、ソウル産業の社内精密加工を一つの供給フローとして管理します。詳細な管理項目と判定基準は承認図面に従います。",
      ),
      sourceSlides: [5, 20, 21, 22],
    },
    qualityControls: [
      {
        feature: localized("BSM 하우징·오일 펌프", "BSM housings and oil pumps", "BSMハウジング・オイルポンプ"),
        characteristic: localized(
          "주조 부품 공급과 서울산업 사내 가공을 연결한 알루미늄 제품군",
          "Aluminum product family linking casting supply with Seoul Industry's in-house machining",
          "鋳造部品供給とソウル産業の社内加工を結ぶアルミ製品群",
        ),
        verification: localized(
          "도면·가공성 검토에서 공정 설계와 생산 검증까지 연결",
          "Integrated drawing and manufacturability review, process design, and production validation",
          "図面・加工性検討から工程設計・生産検証までを連携",
        ),
      },
      {
        feature: localized("ADC12 다이캐스팅 단계", "ADC12 die-casting stage", "ADC12ダイカスト段階"),
        characteristic: localized(
          "AnyCasting 기반 유동·충전·가스·응고 해석",
          "AnyCasting analysis for flow, filling, gas, and solidification",
          "AnyCastingによる流動・充填・ガス・凝固解析",
        ),
        verification: localized(
          "유동·충전·가스·응고 항목별 주조 해석 검토",
          "Review of flow, filling, gas, and solidification simulations",
          "流動・充填・ガス・凝固の各項目による鋳造解析レビュー",
        ),
      },
      {
        feature: localized("T5·금형 유지보수", "T5 treatment and mold maintenance", "T5熱処理・金型保全"),
        characteristic: localized(
          "T5 열처리 설비와 금형 보전 전담 조직을 통한 금형 유지보수",
          "T5 treatment capability and tool-shop mold maintenance",
          "T5熱処理設備と金型保全組織による金型保全",
        ),
        verification: localized(
          "T5 열처리와 금형 유지보수를 주조 공급 공정에 포함",
          "T5 treatment and mold maintenance included in the casting supply process",
          "T5熱処理と金型保全を鋳造供給工程に組み込み",
        ),
      },
      {
        feature: localized("서울산업 정밀 가공", "Seoul Industry precision machining", "ソウル産業の精密加工"),
        characteristic: localized(
          "기준면·지그·클램핑·가공 조건을 제품 형상에 맞춰 설계",
          "Datums, fixtures, clamping, and machining parameters designed around part geometry",
          "基準面・治具・クランプ・加工条件を製品形状に合わせて設計",
        ),
        verification: localized(
          "GD&T·CMM과 자동 검사 기반의 가공 완료 검증",
          "Post-machining verification through GD&T, CMM, and automated inspection",
          "GD&T・CMM・自動検査による加工完了検証",
        ),
      },
    ],
  },
  "products/electric-vehicle": {
    eyebrow: "ELECTRIFIED POWERTRAIN",
    title: localized(
      "EV 오일 펌프 부품과 HEV·PHEV·BEV용 기어·샤프트",
      "EV oil-pump components plus gears and shafts for HEV, PHEV, and BEV platforms",
      "EVオイルポンプ部品とHEV・PHEV・BEV向けギヤ・シャフト",
    ),
    copy: localized(
      "EV 감속기 윤활 시스템용 오일 펌프 하우징·커버를 가공하며, HEV·PHEV·BEV용 코액시얼 샤프트와 링크 샤프트의 설계 검토·시제품 검증에 대응합니다. 제품별 승인 단계에 맞춰 형상과 품질 기준을 관리합니다.",
      "EV oil-pump housings and covers are machined for reduction-gear lubrication systems, while coaxial and link shafts undergo design review and prototype validation for HEV, PHEV, and BEV platforms. Geometry and quality controls follow each product's approval stage.",
      "EV減速機の潤滑システム向けオイルポンプハウジング・カバーを加工し、HEV・PHEV・BEV向けコアキシャルシャフトとリンクシャフトの設計検討・試作検証に対応します。製品ごとの承認段階に合わせて形状と品質基準を管理します。",
    ),
    overviewImage: electrifiedLineupImage,
    families: ["EV OIL PUMP HOUSING / COVER", "HEV GEAR SHAFT", "COAXIAL / LINK SHAFT"],
    // The source deck presents the oil-pump housing/cover in its machined-aluminum chapter.
    // The website intentionally groups them here by their EV reducer application.
    parts: [
      {
        title: localized("EV 오일 펌프 하우징", "EV Oil Pump Housing", "EVオイルポンプ・ハウジング"),
        application: localized("EV 감속기 윤활 시스템", "EV reduction-gear lubrication system", "EV減速機潤滑システム"),
        poster: electricVehiclePoster1,
        video: electricVehicleVideo1,
      },
      {
        title: localized("EV 오일 펌프 커버", "EV Oil Pump Cover", "EVオイルポンプ・カバー"),
        application: localized("EV 감속기 윤활 시스템", "EV reduction-gear lubrication system", "EV減速機潤滑システム"),
        poster: electricVehiclePoster2,
        video: electricVehicleVideo2,
      },
      {
        title: localized("링크 샤프트", "Link Shaft", "リンクシャフト"),
        application: localized("PHEV 기어박스·E-드라이브 동력 전달", "Power transfer for PHEV gearboxes and E-drive systems", "PHEVギヤボックス・Eドライブ向け動力伝達"),
        poster: electrifiedLinkShaftPoster,
        video: electrifiedLinkShaftVideo,
      },
      {
        title: localized("코액시얼 샤프트", "Coaxial Shaft", "コアキシャルシャフト"),
        application: localized("HEV·PHEV 전동화 기어박스", "HEV and PHEV electrified gearboxes", "HEV・PHEV電動化ギヤボックス"),
        poster: electrifiedCoaxialShaftPoster,
        video: electrifiedCoaxialShaftVideo,
      },
    ],
    qualityStory: {
      eyebrow: "PROTOTYPE-TO-PRODUCTION VALIDATION",
      title: localized(
        "전동화 부품은 양산 가공과 시제품 검증을 구분해 관리합니다",
        "Separate controls for EV production parts and shaft prototypes",
        "電動化部品は量産加工と試作検証を分けて管理します",
      ),
      copy: localized(
        "EV 감속기 오일 펌프 하우징·커버의 정밀 가공과 HEV·PHEV·BEV용 샤프트의 설계·엔지니어링 검증용 시제품 제작에 대응합니다. 샤프트는 기어 품질, 스플라인 형상, 런아웃과 표면 건전성을 중심으로 검증합니다.",
        "We precision-machine EV-reducer oil-pump housings and covers and build HEV, PHEV, and BEV shaft prototypes for design and engineering verification. Shaft validation focuses on gear quality, spline geometry, runout, and surface integrity.",
        "EV減速機オイルポンプのハウジング・カバーを精密加工し、HEV・PHEV・BEV向けシャフトの設計・エンジニアリング検証用試作品を製作します。シャフトはギヤ品質、スプライン形状、振れ、表面健全性を中心に検証します。",
      ),
      sourceSlides: [5, 10, 11, 12, 14, 19, 20, 22],
    },
    qualityControls: [
      {
        feature: localized(
          "HEV 기어 샤프트 시제품",
          "HEV gear-shaft prototypes",
          "HEVギヤシャフト試作品",
        ),
        characteristic: localized(
          "설계·엔지니어링 검증을 위한 시제품 제작",
          "Prototype production for design and engineering verification",
          "設計・エンジニアリング検証のための試作製作",
        ),
        verification: localized(
          "기어 품질·스플라인 형상·런아웃·표면 건전성 확인",
          "Verification of gear quality, spline geometry, runout, and surface integrity",
          "ギヤ品質・スプライン形状・振れ・表面健全性を確認",
        ),
      },
      {
        feature: localized("코액시얼·링크 샤프트", "Coaxial and link shafts", "コアキシャルシャフト・リンクシャフト"),
        characteristic: localized(
          "E-드라이브 기어박스용 동력 전달 샤프트 형상",
          "Power-transfer shaft geometry for E-drive gearboxes",
          "Eドライブ用ギヤボックス向け動力伝達シャフト形状",
        ),
        verification: localized(
          "도면·가공성 검토 후 기어·스플라인·런아웃 공통 측정 인프라 적용",
          "Gear, spline, and runout measurement following drawing and manufacturability review",
          "図面・加工性検討後にギヤ・スプライン・振れ測定基盤を適用",
        ),
      },
      {
        feature: localized(
          "EV 오일 펌프 하우징·커버",
          "EV oil-pump housings and covers",
          "EVオイルポンプのハウジング・カバー",
        ),
        characteristic: localized(
          "EV 감속기 윤활 시스템용 알루미늄 정밀 가공 부품",
          "Precision-machined aluminum parts for EV-reducer lubrication systems",
          "EV減速機潤滑システム向けアルミ精密加工部品",
        ),
        verification: localized(
          "승인 도면 기준 GD&T·CMM과 자동 측정 인프라 적용",
          "GD&T, CMM, and automated measurement against approved drawings",
          "承認図面に基づくGD&T、CMM、自動測定による検証",
        ),
      },
    ],
  },
  "products/steering": {
    eyebrow: "STEERING PARTS",
    title: localized("조향 시스템 정밀 부품", "Precision components for steering systems", "ステアリングシステムの精密部品"),
    copy: localized(
      "피니언, 피니언 샤프트, 피스톤, 랙 부시, 토션 바를 생산합니다. 기어 형상, 스플라인, 런아웃, 열처리와 교정 기준을 통합 관리해 조향 입력을 정밀하게 전달합니다.",
      "Pinions, pinion shafts, pistons, rack bushes, and torsion bars are produced under integrated controls for gear geometry, splines, runout, heat treatment, and straightening.",
      "ピニオン、ピニオンシャフト、ピストン、ラックブッシュ、トーションバーを生産しています。ギヤ形状、スプライン、振れ、熱処理、矯正を一体管理し、操舵入力を正確に伝えます。",
    ),
    overviewImage: steeringLineupImage,
    families: ["PINION", "PINION SHAFT", "PISTON", "RACK BUSH", "TORSION BAR"],
    parts: [
      {
        title: localized("피니언 샤프트", "Pinion Shaft", "ピニオンシャフト"),
        application: localized("헬리컬 기어 조향 샤프트", "Helical-gear steering shaft", "ヘリカルギヤ・ステアリングシャフト"),
        poster: steeringPoster1,
        video: steeringVideo1,
      },
      {
        title: localized("토션 바", "Torsion Bar", "トーションバー"),
        application: localized("조향 토크 감지·전달 부품", "Steering torque sensing and transfer", "操舵トルク検知・伝達部品"),
        poster: steeringPoster2,
        video: steeringVideo2,
      },
    ],
    qualityStory: {
      eyebrow: "STEERING PROCESS EVIDENCE",
      title: localized(
        "헬리컬 피니언 샤프트, 서울산업 조향 사업의 출발점",
        "Helical pinion shafts anchor Seoul Industry's steering heritage",
        "ヘリカルピニオンシャフトはソウル産業の操舵事業の原点です",
      ),
      copy: localized(
        "서울산업은 초기 조향 부품 사업부터 헬리컬 기어 피니언 샤프트 호빙 경험을 축적해 왔습니다. 치형·스플라인 가공은 기어 형상·리드, CMM, 공정 중·최종 자동 검사 등 회사 공통 측정 인프라와 고객 승인 도면을 기준으로 연결합니다.",
        "Seoul Industry built its helical-gear pinion-shaft hobbing expertise through its early steering programs. Gear and spline machining is verified against approved drawings using company-wide capabilities for gear-profile and lead measurement, CMM, in-cell inspection, and final automated inspection.",
        "ソウル産業は操舵部品事業の初期から、ヘリカルギヤ・ピニオンシャフトのホブ加工技術を蓄積してきました。ギヤ・スプライン加工は、歯形・歯すじ測定、CMM、工程内・最終自動検査などの全社共通測定設備を用い、顧客承認図面に基づいて検証します。",
      ),
      sourceSlides: [3, 5, 7, 11, 12, 13, 22],
    },
    qualityControls: [
      {
        feature: localized(
          "헬리컬 피니언 샤프트",
          "Helical pinion shafts",
          "ヘリカルピニオンシャフト",
        ),
        characteristic: localized(
          "조향 사업 초기부터 축적한 호빙 기반 헬리컬 기어 가공",
          "Helical-gear machining based on hobbing experience built through the company's early steering programs",
          "操舵事業の初期から蓄積したホブ加工によるヘリカルギヤ加工",
        ),
        verification: localized(
          "기어 형상·리드 전용 측정과 관련 GD&T의 CMM 검증",
          "Dedicated gear profile/lead measurement and CMM verification of related GD&T",
          "歯形・リード専用測定と関連GD&TのCMM検証",
        ),
      },
      {
        feature: localized(
          "기어·스플라인 생산 인프라",
          "Gear and spline production capability",
          "ギヤ・スプライン生産基盤",
        ),
        characteristic: localized(
          "호빙·하드 호빙과 형상별 셰이핑·롤링 공정 적용",
          "Hobbing and hard hobbing, with shaping and rolling available by geometry",
          "ホブ加工・ハードホブ加工と、形状に応じたギヤシェーピング・転造に対応",
        ),
        verification: localized(
          "도면의 CTQ·위험을 공정 순서·기준면·치공구 조건과 생산 검증으로 전환",
          "Drawing CTQs and risks translated into process sequences, datums, fixtures, and production validation",
          "図面のCTQ・リスクを工程順序・基準面・治工具条件・生産検証へ展開",
        ),
      },
      {
        feature: localized("공정 중·최종 자동 검사", "In-cell and final automated inspection", "工程内・最終自動検査"),
        characteristic: localized(
          "에어 게이지 측정 데이터의 선행 공정 피드백과 자동 보정·SPC",
          "Air-gauge measurement feedback to the preceding operation with automatic compensation and SPC",
          "エアゲージ測定データの前工程へのフィードバックと自動補正・SPC",
        ),
        verification: localized(
          "최종 GD&T·데이터 기록·공정 누락 확인과 LOT 마킹 추적",
          "Final GD&T, data recording, missed-operation detection, and lot-marking traceability",
          "最終GD&T、データ記録、工程漏れ確認、ロットマーキングの追跡",
        ),
      },
    ],
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN PARTS",
    title: localized("파워트레인 정밀 부품", "Precision components for powertrain systems", "パワートレインの精密部品"),
    copy: localized(
      "6단 변속기, 8L90 입력·출력, 10R140용 변속기 샤프트와 오일 펌프 샤프트, 브레이크 모듈 샤프트, 캠샤프트 노즈 피스, 밸런스 샤프트를 생산합니다.",
      "We produce six-speed transmission shafts, 8L90 input and output shafts, and 10R140 transmission shafts, along with oil-pump shafts, brake-module shafts, camshaft nose pieces, and balance shafts.",
      "6速トランスミッションシャフト、8L90の入力・出力シャフト、10R140用トランスミッションシャフトに加え、オイルポンプシャフト、ブレーキモジュールシャフト、カムシャフトノーズピース、バランスシャフトを生産します。",
    ),
    overviewImage: powertrainLineupImage,
    families: ["TRANSMISSION SHAFT", "OIL PUMP SHAFT", "BRAKE MODULE SHAFT", "CAMSHAFT NOSE PIECE", "BALANCE SHAFT"],
    parts: [
      {
        title: localized("8L90 출력 샤프트", "8L90 Output Shaft", "8L90出力シャフト"),
        application: localized("자동변속기 토크 전달", "Automatic-transmission torque delivery", "オートマチックトランスミッションのトルク伝達"),
        poster: transmissionOutputPoster,
        video: transmissionOutputVideo,
      },
      {
        title: localized("캠샤프트 노즈 피스", "Camshaft Nose Piece", "カムシャフト・ノーズピース"),
        application: localized("캠샤프트 밸브 개폐 제어 부품", "Camshaft valve-timing control components", "カムシャフトのバルブ開閉制御部品"),
        poster: endPieceImage,
        video: endPieceVideo,
      },
      {
        title: localized("변속기 기어 샤프트", "Transmission Gear Shaft", "トランスミッション・ギヤシャフト"),
        application: localized("기어·스플라인 동력 전달 부품", "Gear-and-spline power-transfer components", "ギヤ・スプライン動力伝達部品"),
        poster: powertrainShaftPoster1,
        video: powertrainShaftVideo1,
      },
      {
        title: localized("10R140 변속기 샤프트", "10R140 Transmission Shaft", "10R140トランスミッションシャフト"),
        application: localized("자동변속기 정밀 샤프트 부품", "Precision automatic-transmission shaft components", "オートマチックトランスミッション用精密シャフト"),
        poster: transmission10r140Poster,
        video: transmission10r140Video,
      },
    ],
    qualityStory: {
      eyebrow: "TRANSMISSION SHAFT CONTROL",
      title: localized(
        "6단·8L90·10R140 변속기 샤프트의 기능면을 따로 관리합니다",
        "Dedicated controls for 6-speed, 8L90, and 10R140 shafts",
        "6速・8L90・10R140シャフトの機能面を個別管理します",
      ),
      copy: localized(
        "토크를 전달하는 기어·스플라인, 심공 가공 중공부, 리드 무늬가 없어야 하는 베어링 랜드, 고주파 경화부를 형상별 공정과 측정 데이터로 관리합니다. 6단·8L90·10R140 변속기 샤프트와 오일 펌프·밸런스 샤프트 부품을 하나의 공정 체계로 연결합니다.",
        "Torque-transmitting gears and splines, long-drilled hollow sections, no-lead bearing lands, and induction-hardened features are controlled using dedicated processes and measurement evidence. A unified process system covers 6-speed, 8L90, and 10R140 transmission shafts as well as oil-pump and balance-shaft components.",
        "トルク伝達用ギヤ・スプライン、深穴加工による中空部、リード目のないことが求められるベアリングランド、高周波焼入れ部を、形状別の工程と測定データで管理します。6速・8L90・10R140トランスミッションシャフトとオイルポンプ・バランスシャフト部品を一つの工程体系で管理します。",
      ),
      sourceSlides: [7, 8, 9, 10, 11, 12, 15, 16, 22],
    },
    qualityControls: [
      {
        feature: localized(
          "6단·8L90·10R140 샤프트",
          "6-speed, 8L90, and 10R140 shafts",
          "6速・8L90・10R140シャフト",
        ),
        characteristic: localized(
          "토크 전달용 기어·스플라인과 샤프트 형상",
          "Torque-transmitting gear, spline, and shaft geometry",
          "トルク伝達用ギヤ・スプライン・シャフト形状",
        ),
        verification: localized(
          "기어 형상·리드 전용 측정과 관련 GD&T의 CMM 검증",
          "Dedicated gear profile/lead measurement and CMM verification of related GD&T",
          "歯形・リード専用測定と関連GD&TのCMM検証",
        ),
      },
      {
        feature: localized(
          "중공 샤프트",
          "Hollow shafts",
          "中空シャフト",
        ),
        characteristic: localized(
          "심공 가공과 봉재의 튜브 소재 전환 검토(VA/VE)",
          "Deep-hole drilling and VA/VE review of conversion from bar stock to tube",
          "深穴加工と棒材からチューブ材への変更検討（VA/VE）",
        ),
        verification: localized(
          "승인 도면 기준 내경·가공 형상 측정과 생산 검증",
          "Bore and machined-geometry measurement against approved drawings, with production validation",
          "承認図面基準の内径・加工形状測定と生産検証",
        ),
      },
      {
        feature: localized("베어링 장착 랜드", "Bearing lands", "ベアリングランド"),
        characteristic: localized(
          "리드 관리·리드 무늬 없음 요구와 폴리싱 공정",
          "Lead control, no-lead surface requirements, and polishing",
          "リード管理・リード目なし要求と研磨工程",
        ),
        verification: localized(
          "연마·초정밀 마감 후 기능 표면 특성 확인",
          "Functional-surface verification after polishing and superfinishing",
          "研磨・超仕上げ後の機能表面特性確認",
        ),
      },
      {
        feature: localized("밸런스 샤프트 부품", "Balance-shaft components", "バランスシャフト類"),
        characteristic: localized(
          "사내 고주파 열처리와 라인 자동화",
          "In-house induction hardening and line automation",
          "社内高周波焼入れとライン自動化",
        ),
        verification: localized(
          "MPI 검사와 적용 시 경도·금속조직 측정",
          "MPI, plus hardness and metallurgical testing where applicable",
          "MPI検査と適用時の硬さ・金属組織測定",
        ),
      },
    ],
  },
  "products/driveline": {
    eyebrow: "DRIVELINE PARTS",
    title: localized("드라이브라인 정밀 부품", "Precision components for driveline systems", "ドライブラインの精密部品"),
    copy: localized(
      "트랜스퍼 케이스와 ETM용 액추에이터 샤프트, EMCD 허브, 디스크 캐리어 부품을 호빙·브로칭·랙 롤링·레이저 용접·조립 공정으로 생산합니다.",
      "Transfer-case and ETM actuator shafts, EMCD hubs, and disc-carrier components are produced through hobbing, broaching, rack rolling, laser welding, and assembly.",
      "トランスファーケースおよびETM向けのアクチュエーターシャフト、EMCDハブ、ディスクキャリア類を、ホブ加工、ブローチ加工、ラック転造、レーザー溶接・組立で生産します。",
    ),
    overviewImage: drivelineLineupImage,
    families: ["TRANSFER CASE ACTUATOR SHAFT", "EMCD HUB", "DISC CARRIER", "LASER-WELDED ASSEMBLY"],
    parts: [
      {
        title: localized("디스크 캐리어·허브", "Disc Carrier / Hub", "ディスクキャリア／ハブ"),
        application: localized("ETM 동력 배분 조립체", "ETM torque-distribution assembly", "ETMトルク配分用アセンブリ"),
        poster: discCarrierPoster,
        video: discCarrierVideo,
      },
      {
        title: localized("트랜스퍼 케이스 액추에이터 샤프트", "Transfer Case Actuator Shaft", "トランスファーケース・アクチュエーターシャフト"),
        application: localized("트랜스퍼 케이스 구동 제어", "Transfer-case drive control", "トランスファーケース駆動制御"),
        poster: transferCaseActuatorPoster,
        video: transferCaseActuatorVideo,
      },
      {
        title: localized("EMCD 허브", "EMCD Hub", "EMCDハブ"),
        application: localized("ETM·EMCD 허브 부품", "ETM and EMCD hub components", "ETM・EMCDハブ類"),
        poster: drivelinePoster3,
        video: drivelineVideo3,
      },
      {
        title: localized("레이저 용접 조립체", "Laser-welded Assembly", "レーザー溶接アセンブリ"),
        application: localized("디스크 캐리어 조립 부품", "Disc-carrier assembly parts", "ディスクキャリア組立部品"),
        poster: drivelinePoster1,
        video: drivelineVideo1,
      },
    ],
    qualityStory: {
      eyebrow: "ETM & TRANSFER CASE PROCESS",
      title: localized(
        "ETM·트랜스퍼 케이스는 형상마다 공정이 달라집니다",
        "Feature-specific process routes for ETM and transfer-case parts",
        "ETM・トランスファーケース部品は形状別の工程で管理します",
      ),
      copy: localized(
        "ETM과 트랜스퍼 케이스 부품은 호빙, 슬리브 브로칭, 랙 롤링, 레이저 용접·조립 공정을 형상에 맞춰 조합합니다. EMCD 허브에는 내측 스플라인 단조를, 액추에이터 샤프트에는 블록 치형 롤링을 적용해 VA/VE를 구현합니다.",
        "ETM and transfer-case parts use a geometry-specific combination of hobbing, sleeve broaching, rack rolling, laser welding, and assembly. Forged internal splines for EMCD hubs and rolled block teeth for actuator shafts support VA/VE.",
        "ETM・トランスファーケース部品は、形状に応じてホブ加工、スリーブブローチ加工、ラック転造、レーザー溶接・組立を組み合わせます。EMCDハブには内スプライン鍛造、アクチュエーターシャフトにはブロック歯形転造を適用し、VA/VEにつなげます。",
      ),
      sourceSlides: [7, 8, 11, 12, 17, 18, 22],
    },
    qualityControls: [
      {
        feature: localized(
          "ETM 외치·스플라인",
          "ETM external teeth and splines",
          "ETM外歯・スプライン",
        ),
        characteristic: localized(
          "호빙과 랙 롤링을 적용한 형상별 가공",
          "Geometry-specific machining through hobbing and rack rolling",
          "ホブ加工とラック転造による形状別加工",
        ),
        verification: localized(
          "기어 형상·리드 측정과 관련 GD&T의 CMM 검증",
          "Gear profile/lead measurement and CMM verification of related GD&T",
          "歯形・リード測定と関連GD&TのCMM検証",
        ),
      },
      {
        feature: localized(
          "슬리브 내경 스플라인",
          "Sleeve internal splines",
          "スリーブ内スプライン",
        ),
        characteristic: localized(
          "브로칭을 적용한 내측 스플라인 가공",
          "Broaching-based internal-spline machining",
          "ブローチ加工による内スプライン加工",
        ),
        verification: localized(
          "전용 속성 게이지와 CMM 등 회사 공통 측정 인프라 적용",
          "Company-wide attribute-gauge and CMM measurement capability",
          "専用属性ゲージ・CMMなど全社共通の測定基盤を適用",
        ),
      },
      {
        feature: localized("EMCD 허브·액추에이터 샤프트", "EMCD hubs and actuator shafts", "EMCDハブ・アクチュエーターシャフト"),
        characteristic: localized(
          "내측 스플라인 단조와 블록 치형 롤링을 통한 VA/VE",
          "VA/VE through forged internal splines and rolled block teeth",
          "内スプライン鍛造とブロック歯形転造によるVA/VE",
        ),
        verification: localized(
          "승인 도면 기준 치형·관련 기하 특성 측정과 생산 검증",
          "Tooth-profile and related geometric measurements against approved drawings, with production validation",
          "承認図面基準の歯形・関連幾何特性測定と生産検証",
        ),
      },
      {
        feature: localized("디스크 캐리어 용접 조립", "Disc-carrier welded assembly", "ディスクキャリア溶接組立"),
        characteristic: localized(
          "사내 모재 레이저 용접 조립",
          "In-house laser welding of base-material assemblies",
          "社内での母材レーザー溶接・組立",
        ),
        verification: localized(
          "레이저 용접 공정 관리와 최종 자동 검사·데이터 기록",
          "Laser-welding process control with final automated inspection and data recording",
          "レーザー溶接工程管理と最終自動検査・データ記録",
        ),
      },
    ],
  },
  "products/etc": {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: localized("DEFENSE", "DEFENSE", "DEFENSE"),
    copy: localized(
      "방산을 포함해 정보 관리가 요구되는 프로젝트를 위한 정밀 가공과 품질 관리 체계를 운영합니다.",
      "Precision machining and quality-management capabilities support defense and other projects requiring controlled information.",
      "防衛分野を含む情報管理が求められるプロジェクトに向けた精密加工・品質管理体制を運用します。",
    ),
    overviewImage: defenseSpecialProjectsImage,
    families: ["SECURE PROJECTS", "PRECISION MACHINING", "LOT TRACEABILITY", "CONTROLLED PRODUCTION"],
    parts: [],
    qualityControls: [],
  },
};
