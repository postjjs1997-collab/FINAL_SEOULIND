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
import steeringPinionImage from "../../assets/product-catalog/steering/pinion-dark.webp";
import steeringPistonImage from "../../assets/product-catalog/steering/piston-dark.webp";
import steeringRackBushImage from "../../assets/product-catalog/steering/rack-bush-dark.webp";
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
  video?: string;
  mediaFit?: "contain" | "cover";
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
  detailTitle: ProductLocalizedText;
  detailCopy: ProductLocalizedText;
  detailTags: string[];
  lineupTitle: ProductLocalizedText;
  lineupCopy: ProductLocalizedText;
  overviewImage: string;
  overviewVideo?: string;
  overviewPresentation?: "portrait-focused";
  families: string[];
  parts: ProductPart[];
  qualityStory?: ProductQualityStory;
  qualityControls: ProductQualityControl[];
};

const localized = (ko: string, en: string, ja: string): ProductLocalizedText => ({ ko, en, ja });

export const productPartCatalogByRoute: Record<string, ProductPartCatalog> = {
  "products/balance-shaft-module": {
    eyebrow: "MACHINED ALUMINUM COMPONENTS",
    detailTitle: localized(
      "주조 공급부터 사내 정밀가공까지",
      "From casting supply to in-house precision machining",
      "鋳造供給から社内精密加工まで",
    ),
    detailCopy: localized(
      "다이캐스팅 공급 단계에서는 소재, 유동·충전·응고 해석, T5 열처리 및 금형 보전 항목을 관리하고, 이후 서울산업의 사내 정밀가공 공정으로 연결합니다.",
      "The die-casting supply stage covers material control, flow, filling and solidification analysis, T5 heat treatment, and die maintenance before the parts move into Seoul Industry's in-house precision-machining process.",
      "ダイカスト供給段階では、素材、湯流れ・充填・凝固解析、T5熱処理、金型保全を管理し、その後ソウル産業の社内精密加工工程へつなぎます。",
    ),
    detailTags: ["CASTING SUPPLY", "IN-HOUSE MACHINING", "CMM / AUTOMATED INSPECTION"],
    lineupTitle: localized(
      "BSM 하우징 5종 가공 사례",
      "Five BSM housing machining examples",
      "BSMハウジング5種の加工事例",
    ),
    lineupCopy: localized(
      "크기와 기준면 구성이 다른 다섯 개 하우징을 실제 형상과 가공 전경 중심으로 소개합니다.",
      "Five housings with different sizes and datum arrangements are presented through their actual forms and machining views.",
      "サイズと基準面構成が異なる5種類のハウジングを、実際の形状と加工シーンを中心に紹介します。",
    ),
    overviewImage: machinedAluminumLineupImage,
    families: ["BSM HOUSING", "BSM OIL PUMP COMPONENT", "DIE-CAST ALUMINUM", "PRECISION MACHINING"],
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
        application: localized("모듈 조립면과 복합 형상 가공", "Module assembly faces and complex-geometry machining", "モジュール組立面・複合形状加工"),
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
        "BSM 알루미늄 부품의 주조 공급부터 사내 가공까지 단계별로 관리합니다",
        "Stage-by-stage control from casting supply to in-house machining for BSM aluminum components",
        "BSMアルミ部品の鋳造供給から社内加工までを段階別に管理します",
      ),
      copy: localized(
        "알루미늄 다이캐스팅 공급 단계에서는 유동·충전·가스 혼입·응고 해석, T5 열처리 및 금형 유지보수 항목을 관리하고, 이후 서울산업이 사내 정밀가공을 수행합니다. 세부 관리 항목과 판정 기준은 고객 승인 도면에 따릅니다.",
        "BSM aluminum components are managed through a supply chain covering die-casting simulations of metal flow, filling, gas entrapment, and solidification; T5 heat treatment; die maintenance; and Seoul Industry's in-house precision machining. Detailed control items and acceptance criteria follow customer-approved drawings.",
        "アルミダイカストの供給段階では、湯流れ・充填・ガス巻込み・凝固解析、T5熱処理、金型保全を管理し、その後、ソウル産業が社内で精密加工を行います。詳細な管理項目と判定基準は顧客承認図面に従います。",
      ),
      sourceSlides: [5, 20, 21, 22],
    },
    qualityControls: [
      {
        feature: localized("BSM 하우징·오일 펌프용 알루미늄 부품", "BSM housings and aluminum components for oil pumps", "BSMハウジング・オイルポンプ用アルミ部品"),
        characteristic: localized(
          "알루미늄 주조 부품 공급과 서울산업 사내 정밀가공의 연계",
          "Integrated supply of cast-aluminum parts and Seoul Industry's in-house precision machining",
          "アルミ鋳造部品の供給とソウル産業の社内精密加工を連携",
        ),
        verification: localized(
          "도면·가공성 검토부터 공정 설계, 양산 조건 검증까지 단계별 관리",
          "Stage-by-stage control from drawing and manufacturability review through process design and production-condition validation",
          "図面・加工性検討から工程設計、量産条件の検証までを段階別に管理",
        ),
      },
      {
        feature: localized("ADC12 다이캐스팅 단계", "ADC12 die-casting stage", "ADC12ダイカスト段階"),
        characteristic: localized(
          "AnyCasting 기반 유동·충전·가스 혼입·응고 해석",
          "AnyCasting analysis of metal flow, filling, gas entrapment, and solidification",
          "AnyCastingによる湯流れ・充填・ガス巻込み・凝固解析",
        ),
        verification: localized(
          "유동·충전·가스 혼입·응고 항목별 주조 해석 검토",
          "Review of casting simulations for metal flow, filling, gas entrapment, and solidification",
          "湯流れ・充填・ガス巻込み・凝固の各項目に関する鋳造解析レビュー",
        ),
      },
      {
        feature: localized("T5 열처리·금형 유지보수", "T5 heat treatment and die maintenance", "T5熱処理・金型保全"),
        characteristic: localized(
          "T5 열처리 설비 운영 및 전담 조직에 의한 금형 보전",
          "T5 heat-treatment capability and die maintenance by a dedicated team",
          "T5熱処理設備の運用と専任組織による金型保全",
        ),
        verification: localized(
          "주조 공급 단계의 T5 열처리 조건과 금형 보전 이력 관리",
          "Control of T5 heat-treatment conditions and die-maintenance records at the casting-supply stage",
          "鋳造供給段階のT5熱処理条件と金型保全履歴を管理",
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
          "승인 도면의 치수·기하공차를 CMM과 자동 검사 설비로 검증",
          "Verification of dimensional and geometric requirements on approved drawings using CMM and automated inspection equipment",
          "承認図面の寸法・幾何公差をCMMと自動検査設備で検証",
        ),
      },
    ],
  },
  "products/electric-vehicle": {
    eyebrow: "ELECTRIFIED POWERTRAIN",
    detailTitle: localized(
      "양산 부품과 개발 시제품의 구분 대응",
      "Separate paths for production parts and development prototypes",
      "量産部品と開発試作品を区分して対応",
    ),
    detailCopy: localized(
      "EV 감속기용 오일 펌프 하우징·커버는 양산 공정으로, 전동화용 샤프트는 설계 검증용 시제품으로 구분해 제작합니다. 도면 검토와 승인 단계도 제품 성격에 맞춰 별도로 운영합니다.",
      "EV reduction-gear oil-pump housings and covers follow a production process, while electrified-powertrain shafts are made as design-validation prototypes. Drawing reviews and approval stages are managed separately for each product type.",
      "EV減速機用オイルポンプのハウジング・カバーは量産工程で、電動化パワートレイン向けシャフトは設計検証用試作品として区分して製作します。図面検討と承認段階も製品の性格に合わせて個別に運用します。",
    ),
    detailTags: ["SERIES PRODUCTION", "DEVELOPMENT PROTOTYPE", "CUSTOMER APPROVAL STAGE"],
    lineupTitle: localized(
      "하우징·커버와 전동화 샤프트",
      "Housings, covers, and electrified-powertrain shafts",
      "ハウジング・カバーと電動化シャフト",
    ),
    lineupCopy: localized(
      "알루미늄 하우징 계열과 회전축 계열을 나누어 실제 형상과 제품별 개발 구분을 이미지와 영상으로 소개합니다.",
      "The gallery separates aluminum-housing parts from rotating shafts and presents their actual forms and product-development categories through images and video.",
      "アルミハウジング系と回転シャフト系に分け、実際の形状と製品別の開発区分を画像・動画で紹介します。",
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
        application: localized("전동화 구동 모듈용 동력 전달 샤프트", "Power-transfer shaft for electrified drive modules", "電動化駆動モジュール用動力伝達シャフト"),
        poster: electrifiedLinkShaftPoster,
        video: electrifiedLinkShaftVideo,
      },
      {
        title: localized("코액시얼 샤프트", "Coaxial Shaft", "コアキシャルシャフト"),
        application: localized("전동화 구동 모듈용 동축 샤프트", "Coaxial shaft for electrified drive modules", "電動化駆動モジュール用同軸シャフト"),
        poster: electrifiedCoaxialShaftPoster,
        video: electrifiedCoaxialShaftVideo,
      },
    ],
    qualityStory: {
      eyebrow: "PROTOTYPE-TO-PRODUCTION VALIDATION",
      title: localized(
        "양산 부품과 개발 시제품은 서로 다른 기준으로 관리합니다",
        "Separate controls for production parts and development prototypes",
        "量産部品と開発試作品を異なる基準で管理します",
      ),
      copy: localized(
        "EV 감속기용 오일 펌프 하우징·커버는 양산 기준으로 정밀가공하고, 전동화용 샤프트는 설계 검증을 위한 시제품으로 제작합니다. 샤프트 시제품은 기어 정밀도, 스플라인 형상, 런아웃 및 표면 상태를 중심으로 검증합니다.",
        "EV reduction-gear oil-pump housings and covers are precision-machined to production criteria, while electrified-powertrain shafts are produced as prototypes for design validation. Prototype shafts are evaluated for gear accuracy, spline geometry, runout, and surface condition.",
        "EV減速機用オイルポンプのハウジング・カバーは量産基準で精密加工し、電動化パワートレイン向けシャフトは設計検証用の試作品として製作します。シャフト試作品はギヤ精度、スプライン形状、振れ、表面状態を中心に検証します。",
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
          "설계 검증을 위한 시제품 제작",
          "Prototype production for design validation",
          "設計検証用試作品の製作",
        ),
        verification: localized(
          "기어 정밀도, 스플라인 형상, 런아웃 및 표면 상태 검증",
          "Verification of gear accuracy, spline geometry, runout, and surface condition",
          "ギヤ精度、スプライン形状、振れ、表面状態を検証",
        ),
      },
      {
        feature: localized("코액시얼·링크 샤프트", "Coaxial and link shafts", "コアキシャルシャフト・リンクシャフト"),
        characteristic: localized(
          "E-드라이브 기어박스에서 동력을 전달하는 코액시얼·링크 샤프트",
          "Coaxial and link shafts for power transmission in E-drive gearboxes",
          "Eドライブギヤボックスで動力を伝達するコアキシャルシャフト・リンクシャフト",
        ),
        verification: localized(
          "도면·가공성 검토 후 전용 장비로 기어·스플라인 형상과 런아웃 측정",
          "Gear and spline geometry and runout measured with dedicated equipment after drawing and manufacturability review",
          "図面・加工性検討後、専用設備でギヤ・スプライン形状と振れを測定",
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
          "Precision-machined aluminum parts for EV reduction-gear lubrication systems",
          "EV減速機潤滑システム向けアルミ精密加工部品",
        ),
        verification: localized(
          "승인 도면의 치수·기하공차를 CMM과 자동 측정 설비로 검증",
          "Verification of dimensional and geometric requirements on approved drawings using CMM and automated measurement equipment",
          "承認図面の寸法・幾何公差をCMMと自動測定設備で検証",
        ),
      },
    ],
  },
  "products/steering": {
    eyebrow: "STEERING PARTS",
    detailTitle: localized(
      "헬리컬 피니언 샤프트에서 시작된 조향 부품",
      "Steering components built from helical-pinion-shaft experience",
      "ヘリカルピニオンシャフトから広がったステアリング部品",
    ),
    detailCopy: localized(
      "서울산업은 조향 부품 사업 초기부터 헬리컬 기어 피니언 샤프트의 호빙 가공 경험을 축적해 왔습니다. 치형·스플라인 가공 결과는 고객 승인 도면을 기준으로 기어 측정기, CMM, 공정 내 검사 및 최종 자동 검사로 검증합니다.",
      "Seoul Industry has built hobbing experience for helical-gear pinion shafts since the early stages of its steering-component business. Gear and spline machining results are verified against customer-approved drawings using gear-measuring equipment, CMM, in-process inspection, and final automated inspection.",
      "ソウル産業はステアリング部品事業の初期から、ヘリカルギヤを備えたピニオンシャフトのホブ加工経験を蓄積してきました。歯形・スプラインの加工結果は、顧客承認図面に基づき、ギヤ測定機、CMM、工程内検査、最終自動検査で検証します。",
    ),
    detailTags: ["HOBBING EXPERIENCE", "GEAR MEASUREMENT", "CMM / AUTOMATED INSPECTION"],
    lineupTitle: localized(
      "조향 장치용 부품 5종",
      "Five component types for steering assemblies",
      "ステアリング装置向け部品5種",
    ),
    lineupCopy: localized(
      "회전축, 작동 부품 및 지지 부품으로 구분되는 형상 차이와 각 품목의 적용 용도를 이미지와 영상으로 확인할 수 있습니다.",
      "Images and video show the geometric differences among rotating, actuating, and supporting components, together with each item's application.",
      "回転部品、作動部品、支持部品に分かれる形状の違いと、各品目の用途を画像・動画で確認できます。",
    ),
    overviewImage: steeringLineupImage,
    families: ["PINION", "PINION SHAFT", "PISTON", "RACK BUSH", "TORSION BAR"],
    parts: [
      {
        title: localized("피니언", "Pinion", "ピニオン"),
        application: localized("조향 기어 어셈블리용 헬리컬 피니언", "Helical pinion for steering-gear assemblies", "ステアリングギヤ・アセンブリ用ヘリカルピニオン"),
        poster: steeringPinionImage,
      },
      {
        title: localized("피니언 샤프트", "Pinion Shaft", "ピニオンシャフト"),
        application: localized("헬리컬 기어가 적용된 조향용 샤프트", "Steering shaft with a helical gear", "ヘリカルギヤを備えたステアリング用シャフト"),
        poster: steeringPoster1,
        video: steeringVideo1,
      },
      {
        title: localized("피스톤", "Piston", "ピストン"),
        application: localized("조향 어셈블리용 피스톤 부품", "Piston component for steering assemblies", "ステアリングアセンブリ用ピストン部品"),
        poster: steeringPistonImage,
      },
      {
        title: localized("랙 부시", "Rack Bush", "ラックブッシュ"),
        application: localized("스티어링 랙 바의 지지·안내 및 유격 관리 부품", "Component for supporting and guiding the steering rack bar and controlling clearance", "ステアリングラックバーの支持・案内およびクリアランス管理部品"),
        poster: steeringRackBushImage,
      },
      {
        title: localized("토션 바", "Torsion Bar", "トーションバー"),
        application: localized("조향 토크를 전달하고 토크 검출에 필요한 비틀림 변위를 형성하는 부품", "Component that transmits steering torque and provides the torsional displacement used for torque sensing", "操舵トルクを伝達し、トルク検出に必要なねじれ変位を生じさせる部品"),
        poster: steeringPoster2,
        video: steeringVideo2,
      },
    ],
    qualityStory: {
      eyebrow: "STEERING PROCESS EVIDENCE",
      title: localized(
        "서울산업 조향 부품 사업의 출발점, 헬리컬 피니언 샤프트",
        "Helical pinion shafts: the foundation of Seoul Industry's steering-component business",
        "ソウル産業のステアリング部品事業の原点、ヘリカルピニオンシャフト",
      ),
      copy: localized(
        "서울산업은 조향 부품 사업 초기부터 헬리컬 기어 피니언 샤프트의 호빙 가공 경험을 축적해 왔습니다. 치형·스플라인 가공 결과는 고객 승인 도면을 기준으로 기어 측정기, CMM, 공정 내 검사 및 최종 자동 검사로 검증합니다.",
        "Seoul Industry has built hobbing experience for helical-gear pinion shafts since the early stages of its steering-component business. Gear and spline machining results are verified against customer-approved drawings using gear-measuring equipment, CMM, in-process inspection, and final automated inspection.",
        "ソウル産業はステアリング部品事業の初期から、ヘリカルギヤを備えたピニオンシャフトのホブ加工経験を蓄積してきました。歯形・スプラインの加工結果は、顧客承認図面に基づき、ギヤ測定機、CMM、工程内検査、最終自動検査で検証します。",
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
          "치형·치선(리드)은 기어 측정기로, 관련 치수·기하공차는 CMM으로 검증",
          "Gear profile and lead measured on gear-measuring equipment, with related dimensions and geometric tolerances verified by CMM",
          "歯形・歯すじ（リード）はギヤ測定機で、関連寸法・幾何公差はCMMで検証",
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
          "도면의 CTQ와 위험 요소를 공정 순서, 기준면, 치공구 조건에 반영하고 양산 조건을 검증",
          "Drawing CTQs and risk factors incorporated into process sequences, datums, and tooling conditions, followed by production-condition validation",
          "図面のCTQとリスク要因を工程順序、基準面、治工具条件に反映し、量産条件を検証",
        ),
      },
      {
        feature: localized("전용 검사·추적", "Dedicated inspection and traceability", "専用検査・トレーサビリティ"),
        characteristic: localized(
          "제품별 전용 검사기로 주요 치수와 런아웃을 확인하고 검사 데이터를 기록",
          "Critical dimensions and runout checked with product-specific inspection equipment, with inspection data recorded",
          "製品別の専用検査機で主要寸法と振れを確認し、検査データを記録",
        ),
        verification: localized(
          "최종 치수·기하공차 검사, 공정 누락 확인 및 LOT 식별정보 추적",
          "Final dimensional and geometric verification, missed-operation checks, and traceability of lot-identification data",
          "最終寸法・幾何公差検査、工程漏れ確認、ロット識別情報のトレーサビリティ",
        ),
      },
    ],
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN PARTS",
    detailTitle: localized(
      "기능 부위별로 구분한 샤프트 공정",
      "Shaft processes organized by functional area",
      "機能部位別に区分したシャフト工程",
    ),
    detailCopy: localized(
      "장축·중공 샤프트에는 심공 가공을 적용하고, 제품에 따라 고주파 열처리와 연삭·폴리싱을 조합합니다. 각 공정 결과는 기능 부위에 맞는 측정 항목으로 확인합니다.",
      "Long and hollow shafts use deep-hole drilling, with induction hardening and grinding or polishing combined as required by the product. Each process result is checked using measurements assigned to the relevant functional area.",
      "長尺・中空シャフトには深穴加工を適用し、製品に応じて高周波焼入れと研削・ポリッシングを組み合わせます。各工程結果は機能部位に応じた測定項目で確認します。",
    ),
    detailTags: ["DEEP-HOLE DRILLING", "INDUCTION HARDENING", "GRINDING / POLISHING", "MPI / METALLURGY"],
    lineupTitle: localized(
      "구동 위치별 대표 샤프트와 엔진 부품",
      "Representative shafts and engine components by application",
      "搭載位置別の代表シャフト・エンジン部品",
    ),
    lineupCopy: localized(
      "장축, 기어 일체형 및 단품 구성으로 나뉘는 형상 차이와 각 부품의 적용 위치를 실제 제품 이미지와 영상으로 비교합니다.",
      "Product images and videos compare long-shaft, integral-gear, and discrete-component forms together with their application positions.",
      "長尺、ギヤ一体型、単品構成に分かれる形状の違いと各部品の搭載位置を、実製品の画像・動画で比較します。",
    ),
    overviewImage: powertrainLineupImage,
    overviewPresentation: "portrait-focused",
    families: ["TRANSMISSION SHAFT", "OIL PUMP SHAFT", "BRAKE MODULE SHAFT", "CAMSHAFT NOSE PIECE", "BALANCE SHAFT"],
    parts: [
      {
        title: localized("출력 샤프트", "Output Shaft", "出力シャフト"),
        application: localized("자동변속기에서 토크를 전달하는 출력 샤프트", "Output shaft for torque transmission in automatic transmissions", "オートマチックトランスミッションでトルクを伝達する出力シャフト"),
        poster: transmissionOutputPoster,
        video: transmissionOutputVideo,
      },
      {
        title: localized("캠샤프트 노즈 피스", "Camshaft Nose Piece", "カムシャフト・ノーズピース"),
        application: localized("캠샤프트 선단부의 구동계 연결 부품", "Drive-interface component at the end of a camshaft", "カムシャフト先端部の駆動系連結部品"),
        poster: endPieceImage,
        video: endPieceVideo,
      },
      {
        title: localized("변속기 기어 샤프트", "Transmission Gear Shaft", "トランスミッション・ギヤシャフト"),
        application: localized("기어·스플라인을 통해 동력을 전달하는 샤프트", "Shaft that transmits power through gears and splines", "ギヤ・スプラインを介して動力を伝達するシャフト"),
        poster: powertrainShaftPoster1,
        video: powertrainShaftVideo1,
        mediaFit: "cover",
      },
      {
        title: localized("변속기 샤프트", "Transmission Shaft", "トランスミッションシャフト"),
        application: localized("자동변속기용 정밀 샤프트", "Precision shaft for automatic transmissions", "オートマチックトランスミッション用精密シャフト"),
        poster: transmission10r140Poster,
        video: transmission10r140Video,
      },
    ],
    qualityStory: {
      eyebrow: "TRANSMISSION SHAFT CONTROL",
      title: localized(
        "6단·8단·10단 변속기 샤프트의 기능 부위별 공정과 검사 기준을 구분해 관리합니다",
        "Process and inspection criteria are defined for each functional area of 6-, 8-, and 10-speed transmission shafts",
        "6速・8速・10速トランスミッションシャフトの機能部位ごとに工程・検査基準を区分して管理します",
      ),
      copy: localized(
        "토크 전달용 기어·스플라인, 심공 가공된 중공부, 베어링 장착면, 고주파 경화부를 각각의 공정 기준과 측정 결과로 관리합니다. 6단·8단·10단 변속기 샤프트와 오일 펌프·밸런스 샤프트의 제품별 요구사항을 공통 품질 관리 체계 안에서 관리합니다.",
        "Torque-transmitting gears and splines, hollow sections produced by deep-hole drilling, bearing seats, and induction-hardened areas are controlled using feature-specific process criteria and measurement results. Product-specific requirements for 6-, 8-, and 10-speed transmission shafts and for oil-pump and balance-shaft components are managed within a common quality-control system.",
        "トルク伝達用ギヤ・スプライン、深穴加工された中空部、ベアリング取付面、高周波焼入れ部を、それぞれの工程基準と測定結果で管理します。6速・8速・10速トランスミッションシャフトとオイルポンプ・バランスシャフトの製品別要求事項を共通の品質管理体系で管理します。",
      ),
      sourceSlides: [7, 8, 9, 10, 11, 12, 15, 16, 22],
    },
    qualityControls: [
      {
        feature: localized(
          "6단·8단·10단 샤프트",
          "6-, 8-, and 10-speed shafts",
          "6速・8速・10速シャフト",
        ),
        characteristic: localized(
          "토크 전달용 기어·스플라인과 샤프트 형상",
          "Torque-transmitting gear, spline, and shaft geometry",
          "トルク伝達用ギヤ・スプライン・シャフト形状",
        ),
        verification: localized(
          "치형·치선(리드)은 기어 측정기로, 관련 치수·기하공차는 CMM으로 검증",
          "Gear profile and lead measured on gear-measuring equipment, with related dimensions and geometric tolerances verified by CMM",
          "歯形・歯すじ（リード）はギヤ測定機で、関連寸法・幾何公差はCMMで検証",
        ),
      },
      {
        feature: localized(
          "중공 샤프트",
          "Hollow shafts",
          "中空シャフト",
        ),
        characteristic: localized(
          "심공 가공 및 봉재를 튜브 소재로 전환하는 VA/VE 검토",
          "Deep-hole drilling and VA/VE review of conversion from bar stock to tube",
          "深穴加工と棒材からチューブ材への変更検討（VA/VE）",
        ),
        verification: localized(
          "승인 도면에 따른 내경·가공 형상 측정 및 양산 조건 검증",
          "Bore and machined-geometry measurement against approved drawings, with production-condition validation",
          "承認図面に基づく内径・加工形状の測定と量産条件の検証",
        ),
      },
      {
        feature: localized("베어링 장착면", "Bearing seats", "ベアリング取付面"),
        characteristic: localized(
          "연삭·폴리싱을 통한 표면조도 및 형상 관리",
          "Surface-finish and geometry control through grinding and polishing",
          "研削・ポリッシングによる表面粗さ・形状管理",
        ),
        verification: localized(
          "연삭·폴리싱 후 베어링 장착면의 치수·표면 상태 확인",
          "Dimensional and surface-condition checks of bearing seats after grinding and polishing",
          "研削・ポリッシング後にベアリング取付面の寸法・表面状態を確認",
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
          "제품 요구사항에 따른 자분탐상검사(MPI), 경도 및 금속조직 측정",
          "Magnetic-particle inspection (MPI), hardness testing, and metallurgical examination as required for each product",
          "製品要求に応じた磁粉探傷検査（MPI）、硬さ測定、金属組織検査",
        ),
      },
    ],
  },
  "products/driveline": {
    eyebrow: "DRIVELINE PARTS",
    detailTitle: localized(
      "형상에 따라 달라지는 공정 경로",
      "Process routes selected by component geometry",
      "形状に応じて選定する工程ルート",
    ),
    detailCopy: localized(
      "ETM과 트랜스퍼 케이스 부품에는 형상에 따라 호빙, 내경 스플라인 브로칭, 랙 롤링, 레이저 용접·조립을 적용합니다. EMCD 허브의 내측 스플라인 단조와 액추에이터 샤프트의 블록 치형 롤링은 제품별 승인 사양에 따라 적용합니다.",
      "ETM and transfer-case parts use hobbing, internal-spline broaching, rack rolling, laser welding, and assembly according to component geometry. Forged internal splines for EMCD hubs and rolled block teeth for actuator shafts are applied to product-specific approved specifications.",
      "ETM・トランスファーケース部品には、形状に応じてホブ加工、内径スプラインブローチ加工、ラック転造、レーザー溶接・組立を適用します。EMCDハブの内スプライン鍛造とアクチュエーターシャフトのブロック歯形転造は、製品別の承認仕様に基づいて適用します。",
    ),
    detailTags: ["HOBBING", "INTERNAL-SPLINE BROACHING", "RACK ROLLING", "LASER WELDING"],
    lineupTitle: localized(
      "ETM·트랜스퍼 케이스 부품 라인업",
      "ETM and transfer-case component lineup",
      "ETM・トランスファーケース部品ラインアップ",
    ),
    lineupCopy: localized(
      "치형, 내경 스플라인 및 용접 조립부처럼 제품마다 다른 구조와 적용 용도를 실제 이미지와 영상으로 비교합니다.",
      "Images and videos compare product-specific structures such as toothed features, internal splines, and welded assemblies, together with their applications.",
      "歯形、内径スプライン、溶接組立部など、製品ごとに異なる構造と用途を画像・動画で比較します。",
    ),
    overviewImage: drivelineLineupImage,
    overviewPresentation: "portrait-focused",
    families: ["TRANSFER CASE ACTUATOR SHAFT", "EMCD HUB", "DISC CARRIER", "LASER-WELDED ASSEMBLY"],
    parts: [
      {
        title: localized("디스크 캐리어·허브", "Disc Carrier / Hub", "ディスクキャリア／ハブ"),
        application: localized("ETM의 동력 배분을 위한 조립 부품", "Assembly component for ETM torque distribution", "ETMのトルク配分用組立部品"),
        poster: discCarrierPoster,
        video: discCarrierVideo,
      },
      {
        title: localized("트랜스퍼 케이스 액추에이터 샤프트", "Transfer Case Actuator Shaft", "トランスファーケース・アクチュエーターシャフト"),
        application: localized("트랜스퍼 케이스 모드 전환 구동부", "Drive component for transfer-case mode selection", "トランスファーケースのモード切替駆動部品"),
        poster: transferCaseActuatorPoster,
        video: transferCaseActuatorVideo,
      },
      {
        title: localized("EMCD 허브", "EMCD Hub", "EMCDハブ"),
        application: localized("전자기식 제어 장치(EMCD)용 허브", "Hub for an electromagnetic control device (EMCD)", "電磁制御装置（EMCD）用ハブ"),
        poster: drivelinePoster3,
        video: drivelineVideo3,
      },
      {
        title: localized("레이저 용접 조립체", "Laser-welded Assembly", "レーザー溶接アセンブリ"),
        application: localized("레이저 용접 방식의 디스크 캐리어 조립체", "Laser-welded disc-carrier assembly", "レーザー溶接式ディスクキャリアアセンブリ"),
        poster: drivelinePoster1,
        video: drivelineVideo1,
      },
    ],
    qualityStory: {
      eyebrow: "ETM & TRANSFER CASE PROCESS",
      title: localized(
        "ETM·트랜스퍼 케이스 부품은 형상에 따라 공정 경로를 구분합니다",
        "Feature-specific process routes for ETM and transfer-case parts",
        "ETM・トランスファーケース部品は形状別の工程で管理します",
      ),
      copy: localized(
        "ETM과 트랜스퍼 케이스 부품에는 형상에 따라 호빙, 내경 스플라인 브로칭, 랙 롤링, 레이저 용접·조립을 적용합니다. EMCD 허브의 내측 스플라인 단조와 액추에이터 샤프트의 블록 치형 롤링은 제품별 승인 사양에 따라 적용합니다.",
        "ETM and transfer-case parts use hobbing, internal-spline broaching, rack rolling, laser welding, and assembly according to part geometry. Forged internal splines for EMCD hubs and rolled block teeth for actuator shafts are applied according to product-specific approved specifications.",
        "ETM・トランスファーケース部品には、形状に応じてホブ加工、内径スプラインブローチ加工、ラック転造、レーザー溶接・組立を適用します。EMCDハブの内スプライン鍛造とアクチュエーターシャフトのブロック歯形転造は、製品別の承認仕様に基づいて適用します。",
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
          "치형·치선(리드)은 기어 측정기로, 관련 치수·기하공차는 CMM으로 검증",
          "Gear profile and lead measured on gear-measuring equipment, with related dimensions and geometric tolerances verified by CMM",
          "歯形・歯すじ（リード）はギヤ測定機で、関連寸法・幾何公差はCMMで検証",
        ),
      },
      {
        feature: localized(
          "슬리브 내경 스플라인",
          "Internal splines in sleeve components",
          "スリーブ内径スプライン",
        ),
        characteristic: localized(
          "브로칭을 적용한 내측 스플라인 가공",
          "Broaching-based internal-spline machining",
          "ブローチ加工による内スプライン加工",
        ),
        verification: localized(
          "전용 게이지로 스플라인 조립 적합성을 판정하고, 지정 치수·기하공차는 해당 측정 장비로 검증",
          "Spline assembly fit checked with dedicated gauges; specified dimensions and geometric tolerances verified with the applicable measuring equipment",
          "専用ゲージでスプラインの組立適合性を判定し、指定寸法・幾何公差は該当する測定設備で検証",
        ),
      },
      {
        feature: localized("EMCD 허브·액추에이터 샤프트", "EMCD hubs and actuator shafts", "EMCDハブ・アクチュエーターシャフト"),
        characteristic: localized(
          "내측 스플라인 단조 및 블록 치형 롤링 적용",
          "Application of forged internal splines and rolled block teeth",
          "内スプライン鍛造およびブロック歯形転造を適用",
        ),
        verification: localized(
          "승인 도면에 따른 치형·기하공차 측정 및 양산 조건 검증",
          "Tooth-profile and geometric-tolerance measurement against approved drawings, with production-condition validation",
          "承認図面に基づく歯形・幾何公差測定と量産条件の検証",
        ),
      },
      {
        feature: localized("디스크 캐리어 용접 조립", "Disc-carrier welded assembly", "ディスクキャリア溶接組立"),
        characteristic: localized(
          "디스크 캐리어 구성품의 사내 레이저 용접·조립",
          "In-house laser welding and assembly of disc-carrier components",
          "ディスクキャリア構成部品の社内レーザー溶接・組立",
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
    detailTitle: localized("보안 프로젝트 협의", "Secure-project consultation", "機密プロジェクトの協議"),
    detailCopy: localized(
      "방산·특수 프로젝트 관련 정보는 대외 공개 범위를 제한하며, 구체적인 대응 범위와 관리 기준은 보안 및 고객 승인 조건에 따라 개별 협의합니다.",
      "Public disclosure of information related to defense and special projects is restricted. Specific project scope and control requirements are agreed case by case according to security and customer-approval conditions.",
      "防衛・特別プロジェクトに関する情報は対外公開の範囲を限定し、具体的な対応範囲と管理基準はセキュリティおよび顧客承認条件に応じて個別に協議します。",
    ),
    detailTags: ["SECURE PROJECT INQUIRY", "CUSTOMER APPROVAL", "CONTROLLED DISCLOSURE"],
    lineupTitle: localized("공개 가능한 협의 범위", "Scope available for public consultation", "公開可能な協議範囲"),
    lineupCopy: localized(
      "실제 제품 정보는 공개하지 않으며, 프로젝트별 제조·품질 관리 범위만 개별 협의합니다.",
      "Actual product information is not disclosed; manufacturing and quality-control scope is discussed for each project.",
      "実製品の情報は公開せず、プロジェクトごとの製造・品質管理範囲のみ個別に協議します。",
    ),
    overviewImage: defenseSpecialProjectsImage,
    families: ["SECURE PROJECT INQUIRY", "SCOPE REVIEW", "CUSTOMER APPROVAL", "CONTROLLED DISCLOSURE"],
    parts: [],
    qualityControls: [],
  },
};
