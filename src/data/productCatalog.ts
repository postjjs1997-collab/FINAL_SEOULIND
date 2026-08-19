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
  /** Short label for compact placements (home product-card thumbnails). Falls back to title. */
  shortTitle?: ProductLocalizedText;
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

/** One row of the "capability range" table shown on a product page. */
export type ProductSpecItem = {
  label: ProductLocalizedText;
  value: ProductLocalizedText;
};

export type ProductSpecEntry = {
  label: string;
  value: string;
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
  /** Capability-range rows; only figures already published elsewhere on the site. Omitted when no supportable figures exist. */
  specs?: ProductSpecItem[];
};

const localized = (ko: string, en: string, ja: string): ProductLocalizedText => ({ ko, en, ja });

export const productSpecSectionCopy: Record<ProductCatalogLanguage, { eyebrow: string; title: string; note: string }> = {
  ko: {
    eyebrow: "CAPABILITY RANGE",
    title: "가공·검증 대응 범위",
    note: "사내 설비와 측정 기준을 바탕으로 정리한 대응 범위이며, 제품별 세부 사양은 도면 검토 후 확정합니다.",
  },
  en: {
    eyebrow: "CAPABILITY RANGE",
    title: "Machining and verification capability",
    note: "Ranges reflect in-house equipment and metrology capacity; product-specific details are confirmed after drawing review.",
  },
  ja: {
    eyebrow: "CAPABILITY RANGE",
    title: "加工・検証の対応範囲",
    note: "社内設備と測定基準に基づく対応範囲であり、製品ごとの詳細仕様は図面検討後に確定します。",
  },
};

/** Resolves a catalog entry's spec rows for one language. Returns [] when the product has no specs. */
export function getProductSpecs(
  catalog: Pick<ProductPartCatalog, "specs"> | undefined,
  language: ProductCatalogLanguage,
): ProductSpecEntry[] {
  return (catalog?.specs ?? []).map((spec) => ({ label: spec.label[language], value: spec.value[language] }));
}

// Shared spec rows (facts already published on the manufacturing / quality pages).
const specTurning: ProductSpecItem = {
  label: localized("선삭 기준", "Turning", "旋削"),
  value: localized("CNC 선반 6 / 8인치 척", "CNC lathes with 6 / 8-inch chucks", "CNC旋盤 6 / 8インチチャック"),
};
const specGearMetrology: ProductSpecItem = {
  label: localized("기어 측정", "Gear metrology", "ギヤ測定"),
  value: localized(
    "치형·리드·피치 · Ø300 · 모듈 0.2–12 · 길이 500 mm",
    "Profile, lead, and pitch · Ø300 · module 0.2–12 · length 500 mm",
    "歯形・歯すじ・ピッチ · Ø300 · モジュール 0.2–12 · 長さ 500 mm",
  ),
};
const specCmm: ProductSpecItem = {
  label: localized("3차원 측정", "CMM measurement", "三次元測定"),
  value: localized(
    "CMM · GD&T · 최대 1,000 × 1,200 × 600 mm",
    "CMM · GD&T · up to 1,000 × 1,200 × 600 mm",
    "CMM · GD&T · 最大 1,000 × 1,200 × 600 mm",
  ),
};

export const productPartCatalogByRoute: Record<string, ProductPartCatalog> = {
  "products/balance-shaft-module": {
    eyebrow: "MACHINED ALUMINUM COMPONENTS",
    detailTitle: localized(
      "주조 공급부터 사내 정밀가공까지",
      "From casting supply to in-house precision machining",
      "鋳造品の供給から社内精密加工まで",
    ),
    detailCopy: localized(
      "다이캐스팅 공급 단계에서는 소재, 유동·충전·응고 해석, T5 열처리 및 금형 보전 항목을 관리하고, 공급된 주조품은 서울산업의 사내 정밀가공 공정으로 이어집니다.",
      "The die-casting supply stage covers material control; flow, filling, and solidification analysis; T5 heat treatment; and die maintenance before the parts move into Seoul Industry's in-house precision-machining process.",
      "ダイカスト供給段階では、素材、湯流れ・充填・凝固解析、T5熱処理、金型保全を管理し、その後ソウル産業の社内精密加工工程へつなぎます。",
    ),
    detailTags: ["CASTING SUPPLY", "IN-HOUSE MACHINING", "CMM / AUTOMATED INSPECTION"],
    lineupTitle: localized(
      "BSM 하우징·오일 펌프 부품 대표 라인업",
      "Representative BSM housing and oil-pump components",
      "BSMハウジング・オイルポンプ部品の代表ラインアップ",
    ),
    lineupCopy: localized(
      "크기와 기준면 구성이 서로 다른 하우징과 오일 펌프 부품을 실제 형상과 가공 장면 중심으로 소개합니다.",
      "Housings and oil-pump components of varying sizes and datum arrangements, shown through real part geometry and in-process machining footage.",
      "サイズと基準面構成が異なるハウジングやオイルポンプ部品を、実際の形状と加工シーンを中心に紹介します。",
    ),
    overviewImage: machinedAluminumLineupImage,
    families: ["BSM HOUSING", "BSM OIL PUMP COMPONENT", "DIE-CAST ALUMINUM", "PRECISION MACHINING"],
    parts: [
      {
        title: localized("BSM 하우징 01", "BSM Housing 01", "BSMハウジング 01"),
        application: localized("밸런스 샤프트 모듈 하우징", "Balance shaft module housing", "バランスシャフトモジュール・ハウジング"),
        poster: housingPoster1,
        video: housingVideo1,
      },
      {
        title: localized("BSM 하우징 02", "BSM Housing 02", "BSMハウジング 02"),
        application: localized("베어링 보어·오일 유로 정밀가공", "Precision bearing-bore and oil-passage machining", "ベアリングボア・オイル流路の精密加工"),
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
        application: localized("알루미늄 하우징 정밀가공", "Precision aluminum-housing machining", "アルミハウジング精密加工"),
        poster: housingPoster4,
        video: housingVideo4,
      },
      {
        title: localized("BSM 하우징 05", "BSM Housing 05", "BSMハウジング 05"),
        application: localized("밸런스 샤프트 어셈블리 하우징", "Balance shaft assembly housing", "バランスシャフト・アセンブリハウジング"),
        poster: housingPoster5,
        video: housingVideo5,
      },
    ],
    qualityStory: {
      eyebrow: "CAST-TO-MACHINING CONTROL",
      title: localized(
        "BSM 알루미늄 부품의 주조 공급부터 사내 가공까지 단계별로 관리합니다",
        "Stage-by-stage control of BSM aluminum components, from casting supply to in-house machining",
        "BSMアルミ部品は、鋳造品の供給から社内加工まで段階ごとに管理します",
      ),
      copy: localized(
        "주조 공급 단계에서는 유동·충전·가스 혼입·응고 항목별 주조 해석 결과와 T5 열처리 조건, 금형 보전 이력을 검토합니다. 사내 가공 단계에서는 승인 도면의 치수·기하공차를 CMM과 자동 검사 설비로 검증하며, 세부 관리 항목과 판정 기준은 고객 승인 도면에 따릅니다.",
        "At the casting-supply stage, casting-simulation results for metal flow, filling, gas entrapment, and solidification are reviewed together with T5 heat-treatment conditions and die-maintenance records. In-house machining is verified against the dimensional and geometric requirements on approved drawings using CMM and automated inspection equipment; detailed control items and acceptance criteria follow customer-approved drawings.",
        "鋳造品の供給段階では、湯流れ・充填・ガス巻込み・凝固の各項目の鋳造解析結果とT5熱処理条件、金型保全履歴を確認します。社内加工段階では、承認図面の寸法・幾何公差をCMMと自動検査設備で検証し、詳細な管理項目と判定基準は顧客承認図面に従います。",
      ),
      sourceSlides: [5, 20, 21, 22],
    },
    specs: [
      {
        label: localized("소재", "Material", "素材"),
        value: localized("ADC12 알루미늄 다이캐스팅 공급품 · T5 열처리", "ADC12 die-cast aluminum supply · T5 heat treatment", "ADC12アルミダイカスト供給品 · T5熱処理"),
      },
      {
        label: localized("주조 해석", "Casting simulation", "鋳造解析"),
        value: localized(
          "AnyCasting 주조 해석 · 유동·충전·가스 혼입·응고",
          "AnyCasting casting simulation · metal flow, filling, gas entrapment, solidification",
          "AnyCasting鋳造解析 · 湯流れ・充填・ガス巻込み・凝固",
        ),
      },
      {
        label: localized("사내 가공", "In-house machining", "社内加工"),
        value: localized(
          "수직형 MCT · 전용 치공구 · 베어링 보어·오일 유로·조립면",
          "Vertical machining centers · dedicated fixtures · bearing bores, oil passages, and assembly faces",
          "立形マシニングセンタ · 専用治具 · ベアリングボア・オイル通路・組立面",
        ),
      },
      specCmm,
      {
        label: localized("자동 검사", "Automated inspection", "自動検査"),
        value: localized("승인 도면 기준 치수·기하공차 자동 검사", "Automated dimensional and GD&T inspection to approved drawings", "承認図面基準の寸法・幾何公差自動検査"),
      },
    ],
    qualityControls: [
      {
        feature: localized("BSM 하우징·오일 펌프용 알루미늄 부품", "BSM housings and aluminum components for oil pumps", "BSMハウジング・オイルポンプ用アルミ部品"),
        characteristic: localized(
          "알루미늄 주조 부품 공급과 서울산업 사내 정밀가공의 연계",
          "Cast-aluminum part supply integrated with Seoul Industry's in-house precision machining",
          "アルミ鋳造部品の供給とソウル産業の社内精密加工の連携",
        ),
        verification: localized(
          "도면·가공성 검토부터 공정 설계, 양산 조건 검증까지 단계별 관리",
          "Stage-by-stage control from drawing and manufacturability review through process design and validation of series-production conditions",
          "図面・加工性の検討から工程設計、量産条件の検証まで段階ごとに管理",
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
        feature: localized("T5 열처리·금형 보전", "T5 heat treatment and die maintenance", "T5熱処理・金型保全"),
        characteristic: localized(
          "T5 열처리 설비 운영과 전담 조직이 수행하는 금형 보전",
          "T5 heat-treatment capability and die maintenance by a dedicated team",
          "T5熱処理設備の運用と専任組織による金型保全",
        ),
        verification: localized(
          "주조 공급 단계의 T5 열처리 조건과 금형 보전 이력 관리",
          "Control of T5 heat-treatment conditions and die-maintenance records at the casting-supply stage",
          "鋳造品供給段階のT5熱処理条件と金型保全履歴を管理",
        ),
      },
      {
        feature: localized("서울산업 정밀가공", "Seoul Industry precision machining", "ソウル産業の精密加工"),
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
      "시제품 개발부터 양산까지 이어지는 대응 체계",
      "One capability from development prototypes to series production",
      "試作開発から量産までつながる対応体制",
    ),
    detailCopy: localized(
      "EV 감속기용 오일 펌프 하우징·커버는 양산 공정으로 공급하고, 전동화 파워트레인용 샤프트는 설계 검증 시제품 단계부터 참여해 양산까지 이어갑니다. 시제품에서 확보한 공정 조건과 검사 기준을 그대로 양산에 반영하며, 도면 검토와 승인 단계는 제품 성격에 맞춰 운영합니다.",
      "Oil-pump housings and covers for EV reduction gears are supplied from series-production processes, and electrified-powertrain shafts are supported from design-validation prototypes through to volume production. Process conditions and inspection criteria proven at the prototype stage carry straight into series production, with drawing reviews and approval stages tailored to each product.",
      "EV減速機用オイルポンプのハウジング・カバーは量産工程で供給し、電動化パワートレイン向けシャフトは設計検証用の試作段階から参画して量産までつなげます。試作で確立した工程条件と検査基準をそのまま量産に反映し、図面検討と承認の段階は製品特性に合わせて運用します。",
    ),
    detailTags: ["PROTOTYPE TO PRODUCTION", "DESIGN VALIDATION", "CUSTOMER APPROVAL STAGE"],
    lineupTitle: localized(
      "하우징·커버와 전동화 샤프트",
      "Housings, covers, and electrified-powertrain shafts",
      "ハウジング・カバーと電動化シャフト",
    ),
    lineupCopy: localized(
      "알루미늄 하우징 계열과 회전축 계열로 나누어, 실제 형상과 양산·시제품 구분을 이미지와 영상으로 소개합니다.",
      "The gallery groups aluminum housings and rotating shafts separately, showing each part's actual geometry and development status in images and video.",
      "アルミハウジング系と回転シャフト系に分け、実際の形状と製品別の開発区分を画像・動画で紹介します。",
    ),
    overviewImage: electrifiedLineupImage,
    families: ["EV OIL PUMP HOUSING / COVER", "HEV GEAR SHAFT", "CO-AXIAL / LINK SHAFT"],
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
        title: localized("코-액슬 샤프트", "Co-axial Shaft", "コアキシャルシャフト"),
        application: localized("전동화 구동 모듈용 동축 샤프트", "Co-axial shaft for electrified drive modules", "電動化駆動モジュール用同軸シャフト"),
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
        "샤프트 시제품은 도면·가공성 검토 후 전용 장비로 기어 정밀도, 스플라인 형상, 런아웃, 표면 상태를 검증합니다. 양산 하우징·커버는 승인 도면의 치수·기하공차를 CMM과 자동 검사 설비로 확인하며, 양산 부품과 시제품의 승인 단계는 제품 성격에 맞춰 별도로 운영합니다.",
        "Prototype shafts are evaluated after drawing and manufacturability review for gear accuracy, spline geometry, runout, and surface condition using dedicated equipment. Series-production housings and covers are verified against the dimensional and geometric requirements on approved drawings with CMM and automated inspection equipment, and approval stages for production parts and prototypes are managed separately according to product type.",
        "シャフト試作品は、図面・加工性の検討後に専用設備でギヤ精度、スプライン形状、振れ、表面状態を検証します。量産のハウジング・カバーは承認図面の寸法・幾何公差をCMMと自動検査設備で確認し、量産部品と試作品の承認段階は製品特性に応じて個別に運用します。",
      ),
      sourceSlides: [5, 10, 11, 12, 14, 19, 20, 22],
    },
    specs: [
      {
        label: localized("양산 부품", "Series-production parts", "量産部品"),
        value: localized("EV 오일 펌프 하우징·커버 · 알루미늄 정밀가공", "EV oil-pump housings and covers · precision-machined aluminum", "EVオイルポンプのハウジング・カバー · アルミ精密加工"),
      },
      {
        label: localized("개발 시제품", "Development prototypes", "開発試作品"),
        value: localized("HEV 기어 샤프트 · 코-액슬 샤프트 · 링크 샤프트", "HEV gear shafts · co-axial shafts · link shafts", "HEVギヤシャフト · コアキシャルシャフト · リンクシャフト"),
      },
      {
        label: localized("하우징 가공", "Housing machining", "ハウジング加工"),
        value: localized(
          "수직형 MCT · 전용 치공구 · 홀·장착면·유로 가공",
          "Vertical machining centers · dedicated fixtures · holes, mounting faces, and passages",
          "立形マシニングセンタ · 専用治具 · 穴・取付面・流路加工",
        ),
      },
      {
        label: localized("샤프트 검증", "Shaft verification", "シャフト検証"),
        value: localized("기어 정밀도 · 스플라인 형상 · 런아웃 · 표면 상태", "Gear accuracy · spline geometry · runout · surface condition", "ギヤ精度 · スプライン形状 · 振れ · 表面状態"),
      },
      specGearMetrology,
      specCmm,
    ],
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
        feature: localized("코-액슬·링크 샤프트", "Co-axial and link shafts", "コアキシャルシャフト・リンクシャフト"),
        characteristic: localized(
          "E-드라이브 기어박스 안에서 동력 전달을 담당하는 회전 부품",
          "Co-axial and link shafts for power transmission in E-drive gearboxes",
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
          "EV 감속기 윤활 시스템용 알루미늄 정밀가공 부품",
          "Precision-machined aluminum parts for EV reduction-gear lubrication systems",
          "EV減速機潤滑システム向けアルミ精密加工部品",
        ),
        verification: localized(
          "승인 도면의 치수·기하공차를 CMM과 자동 검사 설비로 검증",
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
      "Steering components built on helical pinion shaft expertise",
      "ヘリカルピニオンシャフトから広がったステアリング部品",
    ),
    detailCopy: localized(
      "서울산업 조향 부품의 출발점은 헬리컬 피니언 샤프트입니다. 1990년 조향 부품 사업 진출 이후 축적한 호빙·하드 호빙 데이터로 헬리컬 치형을 가공하고, 스플라인은 전조·브로칭으로, 공구 간섭이 있는 형상은 기어 셰이핑으로 대응합니다. 열처리 후에는 자동 교정으로 런아웃을 관리하며, 같은 공정 기준을 피스톤, 랙 부시, 토션 바까지 확장해 적용합니다.",
      "Seoul Industry's steering business began with the helical pinion shaft. Helical tooth profiles are hobbed—including hard hobbing—using process data built up since the company entered the steering-component sector in 1990; splines are produced by rolling and broaching, and geometries with tool interference are gear-shaped. After heat treatment, automatic straightening controls runout, and the same process standards extend to pistons, rack bushes, and torsion bars.",
      "ソウル産業のステアリング部品は、ヘリカルピニオンシャフトから始まりました。1990年のステアリング部品事業への参入以来蓄積してきたホブ加工・ハードホブ加工のデータでヘリカル歯形を加工し、スプラインは転造・ブローチ加工で、工具干渉のある形状はギヤシェーピングで対応します。熱処理後は自動矯正で振れを管理し、同じ工程基準をピストン、ラックブッシュ、トーションバーにも展開しています。",
    ),
    detailTags: ["HOBBING / HARD HOBBING", "ROLLING / BROACHING", "AUTOMATIC STRAIGHTENING"],
    lineupTitle: localized(
      "조향 장치용 대표 부품",
      "Representative components for steering assemblies",
      "ステアリング装置向けの代表部品",
    ),
    lineupCopy: localized(
      "회전 부품, 작동 부품, 지지 부품으로 구분되는 형상 차이와 각 품목의 용도를 이미지와 영상으로 확인할 수 있습니다.",
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
        application: localized("헬리컬 기어가 적용된 조향용 샤프트", "Helical pinion shaft for steering-gear assemblies", "ヘリカルギヤを備えたステアリング用シャフト"),
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
        application: localized("조향 랙 바의 지지·안내 및 유격 관리 부품", "Bushing that supports and guides the steering rack bar and controls clearance", "ステアリングラックバーの支持・案内およびクリアランス管理部品"),
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
      eyebrow: "STEERING GEAR VERIFICATION",
      title: localized(
        "치형·스플라인 가공 결과는 측정과 검사 데이터로 증명합니다",
        "Gear and spline results are proven by measurement and inspection data",
        "歯形・スプラインの加工結果は測定と検査データで裏付けます",
      ),
      copy: localized(
        "치형과 리드는 기어 측정기로, 관련 치수와 기하공차는 CMM으로 고객 승인 도면 기준에 맞춰 측정합니다. 공정 내 검사와 제품별 전용 검사기의 최종 자동 검사로 주요 치수와 런아웃을 확인하고, 검사 데이터와 LOT 식별정보를 기록해 공정 누락 여부까지 추적합니다.",
        "Tooth profile and lead are measured on gear-measuring equipment and related dimensions and geometric tolerances on CMM, all against customer-approved drawings. In-process inspection and final automated inspection on product-specific machines confirm critical dimensions and runout, and recorded inspection data and lot identification make even skipped operations traceable.",
        "歯形と歯すじはギヤ測定機で、関連寸法と幾何公差はCMMで、顧客承認図面を基準に測定します。工程内検査と製品別専用検査機による最終自動検査で主要寸法と振れを確認し、検査データとロット識別情報を記録して工程抜けまで追跡します。",
      ),
      sourceSlides: [3, 5, 7, 11, 12, 13, 22],
    },
    specs: [
      {
        label: localized("기어 가공", "Gear machining", "ギヤ加工"),
        value: localized(
          "헬리컬·스퍼 기어 호빙 · 하드 호빙 · 기어 셰이핑",
          "Helical and spur gear hobbing · hard hobbing · gear shaping",
          "ヘリカル・スパーギヤのホブ加工 · ハードホブ加工 · ギヤシェーピング",
        ),
      },
      {
        label: localized("스플라인 가공", "Spline machining", "スプライン加工"),
        value: localized("전조(랙·TR 롤링) · 브로칭 · 셰이핑", "Rolling (rack / TR rolling) · broaching · shaping", "転造（ラック・TR転造） · ブローチ加工 · シェーピング"),
      },
      specTurning,
      {
        label: localized("열처리·교정", "Heat treatment & straightening", "熱処理・矯正"),
        value: localized(
          "고주파 경화·저온 템퍼링(사내, CQI-9) · 침탄 열처리(협력사) · 서보 프레스 자동 교정",
          "Induction hardening with low-temperature tempering (in-house, CQI-9) · carburizing (qualified partner) · servo-press automatic straightening",
          "高周波焼入れ・低温焼戻し（社内、CQI-9） · 浸炭処理（認定パートナー） · サーボプレス自動矯正",
        ),
      },
      specGearMetrology,
      specCmm,
    ],
    qualityControls: [
      {
        feature: localized(
          "헬리컬 피니언 샤프트",
          "Helical pinion shafts",
          "ヘリカルピニオンシャフト",
        ),
        characteristic: localized(
          "조향 사업 초기부터 축적한 호빙 기반 헬리컬 기어 가공",
          "Helical-gear machining backed by hobbing expertise from the company's early steering programs",
          "ステアリング事業の初期から蓄積したホブ加工によるヘリカルギヤ加工",
        ),
        verification: localized(
          "치형·리드는 기어 측정기로, 관련 치수·기하공차는 CMM으로 검증",
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
          "호빙·하드 호빙과 형상별 기어 셰이핑·전조 공정 적용",
          "Hobbing and hard hobbing, with gear shaping and rolling applied as part geometry requires",
          "ホブ加工・ハードホブ加工と、形状に応じたギヤシェーピング・転造に対応",
        ),
        verification: localized(
          "도면의 CTQ와 위험 요소를 공정 순서, 기준면, 치공구 조건에 반영하고 양산 조건을 검증",
          "Drawing CTQs and risk factors incorporated into process sequences, datums, and tooling conditions, followed by validation of series-production conditions",
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
          "Final dimensional and geometric inspection, checks for skipped operations, and lot-identification traceability",
          "最終寸法・幾何公差検査、工程抜けの確認、ロット識別情報のトレーサビリティ",
        ),
      },
    ],
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN PARTS",
    detailTitle: localized(
      "기능 부위별로 구분한 샤프트 공정",
      "Shaft processes organized by functional feature",
      "機能部位別に区分したシャフト工程",
    ),
    detailCopy: localized(
      "장축·중공 샤프트에는 심공 가공을 적용하고, 제품에 따라 고주파 열처리와 연삭·폴리싱을 조합합니다. 각 공정 결과는 기능 부위에 맞는 측정 항목으로 확인합니다.",
      "Deep-hole drilling is applied to long and hollow shafts, and induction hardening, grinding, and polishing are combined as each product requires. Each process result is verified against measurement items assigned to the relevant functional feature.",
      "長尺・中空シャフトには深穴加工を適用し、製品に応じて高周波焼入れと研削・ポリッシングを組み合わせます。各工程結果は機能部位に応じた測定項目で確認します。",
    ),
    detailTags: ["DEEP-HOLE DRILLING", "INDUCTION HARDENING", "GRINDING / POLISHING", "MPI / METALLURGY"],
    lineupTitle: localized(
      "적용 위치별 대표 샤프트와 엔진 부품",
      "Representative shafts and engine components by application",
      "搭載位置別の代表シャフト・エンジン部品",
    ),
    lineupCopy: localized(
      "장축, 기어 일체형 및 단품 구성으로 나뉘는 형상 차이와 각 부품의 적용 위치를 실제 제품 이미지와 영상으로 비교합니다.",
      "Product images and videos compare long-shaft, integral-gear, and single-piece configurations, along with each component's installation position.",
      "長尺、ギヤ一体型、単品構成に分かれる形状の違いと各部品の搭載位置を、実製品の画像・動画で比較します。",
    ),
    overviewImage: powertrainLineupImage,
    overviewPresentation: "portrait-focused",
    families: ["TRANSMISSION SHAFT", "OIL PUMP SHAFT", "BRAKE MODULE SHAFT", "CAMSHAFT NOSE PIECE", "BALANCE SHAFT"],
    parts: [
      {
        title: localized("출력 샤프트", "Output Shaft", "出力シャフト"),
        application: localized("자동변속기에서 토크를 전달하는 출력 샤프트", "Output shaft that delivers torque in automatic transmissions", "オートマチックトランスミッションでトルクを伝達する出力シャフト"),
        poster: transmissionOutputPoster,
        video: transmissionOutputVideo,
      },
      {
        title: localized("캠샤프트 노즈 피스", "Camshaft Nose Piece", "カムシャフト・ノーズピース"),
        application: localized("캠샤프트 선단부의 구동계 연결 부품", "Drive-interface component at the camshaft nose", "カムシャフト先端部の駆動系連結部品"),
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
        "Process and inspection criteria are defined for each functional feature of 6-, 8-, and 10-speed transmission shafts",
        "6速・8速・10速トランスミッションシャフトの機能部位ごとに工程・検査基準を区分して管理します",
      ),
      copy: localized(
        "토크 전달용 기어·스플라인, 심공 가공된 중공부, 베어링 장착면, 고주파 경화부를 각각의 공정 기준과 측정 결과로 관리합니다. 6단·8단·10단 변속기 샤프트와 오일 펌프·밸런스 샤프트의 제품별 요구사항은 공통 품질 관리 체계로 통합해 운영합니다.",
        "Torque-transmitting gears and splines, hollow sections produced by deep-hole drilling, bearing seats, and induction-hardened areas are controlled using feature-specific process criteria and measurement results. Product-specific requirements for 6-, 8-, and 10-speed transmission shafts and for oil-pump and balance-shaft components are managed within a common quality-control system.",
        "トルク伝達用ギヤ・スプライン、深穴加工された中空部、ベアリング取付面、高周波焼入れ部を、それぞれの工程基準と測定結果で管理します。6速・8速・10速トランスミッションシャフトとオイルポンプ・バランスシャフトの製品別の要求事項を共通の品質管理体制のもとで一元管理します。",
      ),
      sourceSlides: [7, 8, 9, 10, 11, 12, 15, 16, 22],
    },
    specs: [
      {
        label: localized("샤프트 형상", "Shaft configurations", "シャフト形状"),
        value: localized(
          "장축·중공 샤프트(심공 가공) · 기어 일체형 · 단품 구성",
          "Long and hollow shafts (deep-hole drilling) · integral-gear · single-piece",
          "長尺・中空シャフト（深穴加工） · ギヤ一体型 · 単品構成",
        ),
      },
      {
        label: localized("소재 대응", "Material options", "素材対応"),
        value: localized(
          "봉재·튜브 소재 · 봉재→튜브 전환 VA/VE 검토",
          "Bar and tube stock · VA/VE review of bar-to-tube conversion",
          "棒材・チューブ材 · 棒材からチューブ材への変更（VA/VE）検討",
        ),
      },
      specTurning,
      {
        label: localized("열처리", "Heat treatment", "熱処理"),
        value: localized(
          "고주파 경화 + 저온 템퍼링(사내, CQI-9) · 라인 자동화",
          "Induction hardening with low-temperature tempering (in-house, CQI-9) · line automation",
          "高周波焼入れ＋低温焼戻し（社内、CQI-9） · ライン自動化",
        ),
      },
      {
        label: localized("마무리 가공", "Finishing", "仕上げ加工"),
        value: localized("원통·앵귤러·센터리스 연삭 · 폴리싱", "Cylindrical, angular, and centerless grinding · polishing", "円筒・アンギュラ・センタレス研削 · ポリッシング"),
      },
      specGearMetrology,
      specCmm,
      {
        label: localized("재질·열처리 검증", "Material & heat-treatment verification", "材質・熱処理検証"),
        value: localized(
          "자분탐상검사(MPI) · 경도 측정 · 금속조직 검사(현미경 50–500×)",
          "Magnetic-particle inspection (MPI) · hardness testing · metallurgical examination (50–500× microscopy)",
          "磁粉探傷検査（MPI） · 硬さ測定 · 金属組織検査（顕微鏡50–500×）",
        ),
      },
    ],
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
          "치형·리드는 기어 측정기로, 관련 치수·기하공차는 CMM으로 검증",
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
          "심공 가공 적용과 봉재의 튜브 소재 전환 VA/VE 검토",
          "Deep-hole drilling, with VA/VE studies on converting from bar stock to tube stock",
          "深穴加工と棒材からチューブ材への変更検討（VA/VE）",
        ),
        verification: localized(
          "승인 도면에 따른 내경·가공 형상 측정 및 양산 조건 검증",
          "Bore and machined-geometry measurement against approved drawings, with validation of series-production conditions",
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
          "제품 요구사항에 따른 자분탐상검사(MPI), 경도 측정 및 금속조직 검사",
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
      "ETM용 디스크 캐리어·허브와 트랜스퍼 케이스 액추에이터 샤프트, EMCD 허브에는 형상에 따라 호빙, 내경 스플라인 브로칭, 랙 전조, 사내 레이저 용접·조립을 적용합니다. EMCD 허브의 내경 스플라인 단조와 액추에이터 샤프트의 블록 치형 전조는 제품별 승인 사양에 따라 적용합니다.",
      "Disc carriers and hubs for ETM systems, transfer-case actuator shafts, and EMCD hubs are produced with hobbing, internal-spline broaching, rack rolling, and in-house laser welding and assembly as each geometry requires. Forged internal splines for EMCD hubs and rolled block teeth for actuator shafts are applied according to product-specific approved specifications.",
      "ETM用ディスクキャリア・ハブ、トランスファーケースのアクチュエーターシャフト、EMCDハブには、形状に応じてホブ加工、内スプラインのブローチ加工、ラック転造、社内でのレーザー溶接・組立を適用します。EMCDハブの内スプライン鍛造とアクチュエーターシャフトのブロック歯形転造は、製品別の承認仕様に基づいて適用します。",
    ),
    detailTags: ["HOBBING", "INTERNAL-SPLINE BROACHING", "RACK ROLLING", "LASER WELDING"],
    lineupTitle: localized(
      "ETM·트랜스퍼 케이스 부품 라인업",
      "ETM and transfer-case component lineup",
      "ETM・トランスファーケース部品ラインアップ",
    ),
    lineupCopy: localized(
      "치형, 내경 스플라인, 용접 조립부처럼 제품마다 다른 구조와 용도를 실제 이미지와 영상으로 비교합니다.",
      "Images and videos compare product-specific structures such as toothed features, internal splines, and welded assemblies, together with their applications.",
      "歯形、内スプライン、溶接組立部など、製品ごとに異なる構造と用途を画像・動画で比較します。",
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
        shortTitle: localized("액추에이터 샤프트", "Actuator Shaft", "アクチュエーターシャフト"),
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
        title: localized("레이저 용접 조립체", "Laser-Welded Assembly", "レーザー溶接アセンブリ"),
        application: localized("레이저 용접 방식의 디스크 캐리어 조립체", "Laser-welded disc-carrier assembly", "レーザー溶接式ディスクキャリアアセンブリ"),
        poster: drivelinePoster1,
        video: drivelineVideo1,
      },
    ],
    qualityStory: {
      eyebrow: "ETM & TRANSFER CASE VERIFICATION",
      title: localized(
        "치형, 스플라인, 용접부까지 형상별 검증 기준으로 판정합니다",
        "Teeth, splines, and welds are each judged against feature-specific verification criteria",
        "歯形、スプライン、溶接部を形状別の検証基準で判定します",
      ),
      copy: localized(
        "외치·스플라인의 치형과 리드는 기어 측정기로, 관련 치수와 기하공차는 CMM으로 검증하고, 슬리브 내경 스플라인은 전용 게이지로 조립 적합성을 판정합니다. 레이저 용접 조립부는 CQI-15 기준으로 공정 조건·교정·기록을 관리하고 용접부 단면과 용입 깊이를 확인하며, 최종 자동 검사 데이터를 기록해 승인 도면 기준의 판정 근거로 남깁니다.",
        "Tooth profile and lead on external teeth and splines are verified with gear-measuring equipment and related dimensions and geometric tolerances with CMM, while internal splines in sleeve components are checked for assembly fit with dedicated gauges. Laser-welded assemblies are controlled to CQI-15—process parameters, calibration, and records—with weld cross-sections and penetration depth examined, and final automated inspection data is recorded as the basis for release against approved drawings.",
        "外歯・スプラインの歯形と歯すじはギヤ測定機で、関連寸法と幾何公差はCMMで検証し、スリーブの内スプラインは専用ゲージで嵌合性を判定します。レーザー溶接組立部はCQI-15に基づいて工程条件・校正・記録を管理し、溶接部の断面と溶込み深さを確認したうえで、最終自動検査データを記録し、承認図面を基準とした判定の根拠として残します。",
      ),
      sourceSlides: [7, 8, 11, 12, 17, 18, 22],
    },
    specs: [
      {
        label: localized("치형·스플라인", "Teeth & splines", "歯形・スプライン"),
        value: localized(
          "호빙 · 내경 스플라인 브로칭 · 랙 전조(블록 치형)",
          "Hobbing · internal-spline broaching · rack rolling (block teeth)",
          "ホブ加工 · 内スプラインのブローチ加工 · ラック転造（ブロック歯形）",
        ),
      },
      {
        label: localized("용접·조립", "Welding & assembly", "溶接・組立"),
        value: localized("사내 레이저 용접(CQI-15) · 디스크 캐리어 조립", "In-house laser welding (CQI-15) · disc-carrier assembly", "社内レーザー溶接（CQI-15） · ディスクキャリア組立"),
      },
      {
        label: localized("소재·단조 연계", "Forging supply", "素材・鍛造連携"),
        value: localized(
          "열간·온간·냉간 단조 협력사 연계 · 내경 스플라인 단조(승인 사양)",
          "Hot, warm, and cold forging through qualified partners · forged internal splines (approved specifications)",
          "熱間・温間・冷間鍛造の認定パートナー連携 · 内スプライン鍛造（承認仕様）",
        ),
      },
      specTurning,
      specGearMetrology,
      specCmm,
      {
        label: localized("용접부 검증", "Weld verification", "溶接部検証"),
        value: localized(
          "용접선·단면 용입 깊이 확인 · 최종 자동 검사 데이터 기록",
          "Weld-seam and cross-section penetration checks · final automated inspection records",
          "溶接線・断面の溶込み深さ確認 · 最終自動検査データ記録",
        ),
      },
    ],
    qualityControls: [
      {
        feature: localized(
          "ETM 외치·스플라인",
          "ETM external teeth and splines",
          "ETM外歯・スプライン",
        ),
        characteristic: localized(
          "호빙과 랙 전조를 적용한 형상별 가공",
          "Geometry-specific machining through hobbing and rack rolling",
          "ホブ加工とラック転造による形状別加工",
        ),
        verification: localized(
          "치형·리드는 기어 측정기로, 관련 치수·기하공차는 CMM으로 검증",
          "Gear profile and lead measured on gear-measuring equipment, with related dimensions and geometric tolerances verified by CMM",
          "歯形・歯すじ（リード）はギヤ測定機で、関連寸法・幾何公差はCMMで検証",
        ),
      },
      {
        feature: localized(
          "슬리브 내경 스플라인",
          "Internal splines in sleeve components",
          "スリーブ内スプライン",
        ),
        characteristic: localized(
          "브로칭을 적용한 내경 스플라인 가공",
          "Internal-spline machining by broaching",
          "ブローチ加工による内スプライン加工",
        ),
        verification: localized(
          "전용 게이지로 스플라인 조립 적합성을 판정하고, 지정 치수·기하공차는 해당 측정 장비로 검증",
          "Spline assembly fit checked with dedicated gauges; specified dimensions and geometric tolerances verified with the applicable measuring equipment",
          "専用ゲージでスプラインの嵌合性を判定し、指定寸法・幾何公差は該当する測定設備で検証",
        ),
      },
      {
        feature: localized("EMCD 허브·액추에이터 샤프트", "EMCD hubs and actuator shafts", "EMCDハブ・アクチュエーターシャフト"),
        characteristic: localized(
          "내경 스플라인 단조 및 블록 치형 전조 적용",
          "Application of forged internal splines and rolled block teeth",
          "内スプライン鍛造およびブロック歯形転造を適用",
        ),
        verification: localized(
          "승인 도면에 따른 치형·기하공차 측정 및 양산 조건 검증",
          "Tooth-profile and geometric-tolerance measurement against approved drawings, with validation of series-production conditions",
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
    detailTitle: localized("보안 프로젝트 협의", "Confidential project consultation", "機密プロジェクトの協議"),
    detailCopy: localized(
      "방산·특수 프로젝트 관련 정보는 대외 공개 범위를 제한하며, 구체적인 대응 범위와 관리 기준은 보안 및 고객 승인 조건에 따라 개별 협의합니다.",
      "Public disclosure of information related to defense and special projects is restricted. Specific project scope and control requirements are agreed on a case-by-case basis, subject to security requirements and customer approval.",
      "防衛・特別プロジェクトに関する情報は対外公開の範囲を限定し、具体的な対応範囲と管理基準はセキュリティおよび顧客承認条件に応じて個別に協議します。",
    ),
    detailTags: ["CONFIDENTIAL PROJECT INQUIRY", "CUSTOMER APPROVAL", "CONTROLLED DISCLOSURE"],
    lineupTitle: localized("공개 가능한 협의 범위", "Scope open for discussion", "公開可能な協議範囲"),
    lineupCopy: localized(
      "실제 제품 정보는 공개하지 않으며, 프로젝트별 제조·품질 관리 범위만 개별 협의합니다.",
      "Actual product information is not disclosed; only the manufacturing and quality-control scope is discussed for each project.",
      "実製品の情報は公開せず、プロジェクトごとの製造・品質管理範囲のみ個別に協議します。",
    ),
    overviewImage: defenseSpecialProjectsImage,
    families: ["CONFIDENTIAL PROJECT INQUIRY", "SCOPE REVIEW", "CUSTOMER APPROVAL", "CONTROLLED DISCLOSURE"],
    parts: [],
    qualityControls: [],
  },
};
