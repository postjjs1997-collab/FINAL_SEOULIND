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
import electricVehicleVideo1 from "../../assets/product-alpha/electric-vehicle1.webm";
import electricVehicleVideo2 from "../../assets/product-alpha/electric-vehicle2.webm";
import electricVehiclePoster1 from "../../assets/video-posters/electric-vehicle1.jpg";
import electricVehiclePoster2 from "../../assets/video-posters/electric-vehicle2.jpg";
import electricVehicleLinkShaftImage from "../../assets/product-catalog/electric-vehicle/link-shaft.jpg";
import steeringVideo1 from "../../assets/product-alpha/steering1.webm";
import steeringVideo2 from "../../assets/product-alpha/steering2.webm";
import steeringPoster1 from "../../assets/video-posters/steering1.jpg";
import steeringPoster2 from "../../assets/video-posters/steering2.jpg";
import drivelineVideo1 from "../../assets/product-alpha/driveline1.webm";
import drivelineVideo2 from "../../assets/product-alpha/driveline2.webm";
import drivelineVideo3 from "../../assets/product-alpha/driveline3.webm";
import drivelinePoster1 from "../../assets/video-posters/driveline1.jpg";
import drivelinePoster2 from "../../assets/video-posters/driveline2.jpg";
import drivelinePoster3 from "../../assets/video-posters/driveline3.jpg";
import bsmLineupImage from "../../assets/product-catalog/lineup/balance-shaft-module.webp";
import electricVehicleLineupImage from "../../assets/product-catalog/lineup/electric-vehicle.webp";
import steeringLineupImage from "../../assets/product-catalog/lineup/steering.webp";
import powertrainLineupImage from "../../assets/product-catalog/lineup/powertrain.webp";
import drivelineLineupImage from "../../assets/product-catalog/lineup/driveline.webp";
import endPieceImage from "../../assets/product-catalog/powertrain/end-piece.jpg";
import endPieceVideo from "../../assets/product-catalog/powertrain/end-piece.webm";
import powertrainShaftVideo1 from "../../assets/product-catalog/powertrain/powertrain-shaft-01.webm";
import powertrainShaftVideo2 from "../../assets/product-catalog/powertrain/powertrain-shaft-02.webm";
import powertrainShaftPoster1 from "../../assets/product-catalog/powertrain/powertrain-shaft-01.jpg";
import powertrainShaftPoster2 from "../../assets/product-catalog/powertrain/powertrain-shaft-02.jpg";
import inputShaftImage from "../../assets/product-catalog/driveline/input-shaft.jpg";
import inputShaftVideo from "../../assets/product-catalog/driveline/input-shaft.webm";
import defenseSpecialProjectsImage from "../../assets/product-catalog/etc/defense-special-projects.png";

export type ProductCatalogLanguage = "ko" | "en" | "ja";

export type ProductLocalizedText = Record<ProductCatalogLanguage, string>;

export type ProductPart = {
  title: ProductLocalizedText;
  application: ProductLocalizedText;
  poster: string;
  video?: string;
};

export type ProductProgram = {
  program: string;
  partner: string;
  application: ProductLocalizedText;
  source: ProductLocalizedText;
};

export type ProductPartCatalog = {
  eyebrow: string;
  title: ProductLocalizedText;
  copy: ProductLocalizedText;
  overviewImage: string;
  families: string[];
  parts: ProductPart[];
  programs: ProductProgram[];
};

const localized = (ko: string, en: string, ja: string): ProductLocalizedText => ({ ko, en, ja });

const companyProfileSource = localized("제품군", "Product line", "製品群");
const vehicleProgramSource = localized("적용 프로그램", "Application program", "適用プログラム");

export const productPartCatalogByRoute: Record<string, ProductPartCatalog> = {
  "products/balance-shaft-module": {
    eyebrow: "BALANCE SHAFT MODULE PARTS",
    title: localized(
      "밸런스 샤프트 모듈 하우징",
      "Balance shaft module housings",
      "バランスシャフトモジュール・ハウジング",
    ),
    copy: localized(
      "엔진의 1차 진동을 상쇄하는 밸런스 샤프트 모듈용 알루미늄 하우징입니다. 베어링 보어, 조립면, 오일 유로의 정밀도를 통합 관리합니다.",
      "Aluminum housings for balance shaft modules that counter primary engine vibration, with integrated control of bearing bores, assembly faces, and oil passages.",
      "エンジンの一次振動を相殺するバランスシャフトモジュール用アルミハウジングです。ベアリングボア、組立面、オイル流路を一体的に精密管理します。",
    ),
    overviewImage: bsmLineupImage,
    families: ["HOUSING"],
    parts: [
      {
        title: localized("BSM 하우징 01", "BSM Housing 01", "BSMハウジング 01"),
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
        application: localized("모듈 조립면과 복합 형상 가공", "Module faces and complex-geometry machining", "モジュール組立面・複合形状加工"),
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
        title: localized("BSM 하우징 05", "BSM Housing 05", "BSMハウジング 05"),
        application: localized("밸런스 샤프트 어셈블리 하우징", "Balance shaft assembly housing", "バランスシャフト・アセンブリハウジング"),
        poster: housingPoster5,
        video: housingVideo5,
      },
    ],
    programs: [
      {
        program: "BALANCE SHAFT",
        partner: "AAM",
        application: localized("밸런스 샤프트 프로그램", "Balance shaft program", "バランスシャフト・プログラム"),
        source: vehicleProgramSource,
      },
      {
        program: "BALANCE SHAFT ASSEMBLY",
        partner: "AAM",
        application: localized("밸런스 샤프트 모듈 어셈블리", "Balance shaft module assembly", "バランスシャフトモジュール・アセンブリ"),
        source: vehicleProgramSource,
      },
    ],
  },
  "products/electric-vehicle": {
    eyebrow: "ELECTRIC VEHICLE PARTS",
    title: localized("전동화 구동계 정밀 부품", "Precision components for electrified drivetrains", "電動化駆動系の精密部品"),
    copy: localized(
      "EV 오일 펌프 하우징·커버와 링크 샤프트를 중심으로 전동화 구동계의 윤활과 동력 전달에 필요한 정밀가공 부품을 생산합니다.",
      "Precision-machined EV oil-pump housings, covers, and link shafts support lubrication and power transfer across electrified drivetrains.",
      "EVオイルポンプのハウジング・カバーとリンクシャフトを中心に、電動化駆動系の潤滑と動力伝達を支える精密加工部品を生産しています。",
    ),
    overviewImage: electricVehicleLineupImage,
    families: ["EV OIL PUMP HOUSING / COVER", "LINK SHAFT"],
    parts: [
      {
        title: localized("EV 오일 펌프 하우징·커버 01", "EV Oil Pump Housing / Cover 01", "EVオイルポンプ・ハウジング／カバー 01"),
        application: localized("EV 감속기 윤활 시스템", "EV reducer lubrication system", "EV減速機潤滑システム"),
        poster: electricVehiclePoster1,
        video: electricVehicleVideo1,
      },
      {
        title: localized("EV 오일 펌프 하우징·커버 02", "EV Oil Pump Housing / Cover 02", "EVオイルポンプ・ハウジング／カバー 02"),
        application: localized("전동화 오일 펌프 어셈블리", "Electrified oil-pump assembly", "電動化オイルポンプ・アセンブリ"),
        poster: electricVehiclePoster2,
        video: electricVehicleVideo2,
      },
      {
        title: localized("링크 샤프트", "Link Shaft", "リンクシャフト"),
        application: localized(
          "PHEV 기어박스·E-drive 동력 전달",
          "Power transfer for PHEV gearboxes and E-drive systems",
          "PHEVギヤボックス・E-drive向け動力伝達",
        ),
        poster: electricVehicleLinkShaftImage,
      },
    ],
    programs: [
      {
        program: "EV EOP OIL PUMP",
        partner: "MYEONGHWA",
        application: localized("전기차 전동식 오일 펌프", "Electric-vehicle electric oil pump", "EV用電動オイルポンプ"),
        source: vehicleProgramSource,
      },
      {
        program: "LINK SHAFT",
        partner: "GKN",
        application: localized("GM Cadillac Escalade 적용", "GM Cadillac Escalade application", "GM Cadillac Escalade向け"),
        source: vehicleProgramSource,
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
    programs: [
      {
        program: "STEERING SHAFT",
        partner: "ZF KOREA",
        application: localized("조향 샤프트 프로그램", "Steering shaft program", "ステアリングシャフト・プログラム"),
        source: vehicleProgramSource,
      },
    ],
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN PARTS",
    title: localized("파워트레인 정밀 부품", "Precision components for powertrain systems", "パワートレインの精密部品"),
    copy: localized(
      "엔드 피스와 파워트레인 샤프트를 중심으로 엔진, 감속기, 밸브 타이밍 시스템의 동력 전달에 필요한 정밀 부품을 생산합니다.",
      "End pieces and powertrain shafts deliver precision power transfer for engines, reduction systems, and valve-timing applications.",
      "エンドピースとパワートレインシャフトを中心に、エンジン、減速機、バルブタイミングシステムの動力伝達を支える精密部品を生産しています。",
    ),
    overviewImage: powertrainLineupImage,
    families: ["END PIECE", "POWERTRAIN SHAFT"],
    parts: [
      {
        title: localized("엔드 피스", "End Piece", "エンドピース"),
        application: localized("캠 샤프트 밸브 개폐 제어 계열", "Camshaft valve-timing control family", "カムシャフト・バルブ開閉制御系列"),
        poster: endPieceImage,
        video: endPieceVideo,
      },
      {
        title: localized("파워트레인 샤프트 01", "Powertrain Shaft 01", "パワートレインシャフト 01"),
        application: localized("엔진·감속기 동력전달 샤프트", "Engine and reduction-system power shaft", "エンジン・減速機用動力伝達シャフト"),
        poster: powertrainShaftPoster1,
        video: powertrainShaftVideo1,
      },
      {
        title: localized("파워트레인 샤프트 02", "Powertrain Shaft 02", "パワートレインシャフト 02"),
        application: localized("기어·스플라인 정밀 샤프트", "Precision gear and spline shaft", "ギヤ・スプライン精密シャフト"),
        poster: powertrainShaftPoster2,
        video: powertrainShaftVideo2,
      },
    ],
    programs: [
      {
        program: "POWERTRAIN SHAFT",
        partner: "SEOUL INDUSTRY PRODUCT LINE",
        application: localized("Engine·Decelerator용 샤프트", "Shafts for engine and decelerator systems", "Engine・Decelerator向けシャフト"),
        source: companyProfileSource,
      },
      {
        program: "CLUTCH HUB",
        partner: "SEOUL INDUSTRY PRODUCT LINE",
        application: localized("엔진·감속기용 클러치 허브 계열", "Clutch-hub family for engine and reduction systems", "エンジン・減速機向けクラッチハブ系列"),
        source: companyProfileSource,
      },
    ],
  },
  "products/driveline": {
    eyebrow: "DRIVELINE PARTS",
    title: localized("드라이브라인 정밀 부품", "Precision components for driveline systems", "ドライブラインの精密部品"),
    copy: localized(
      "디스크 캐리어, 샤프트, 허브, 인풋 샤프트를 생산하며, 변속기와 트랜스퍼 케이스에서 동력 전달과 오일 분배 기능을 안정적으로 구현합니다.",
      "Disk carriers, shafts, hubs, and input shafts provide reliable power transfer and oil distribution in transmissions and transfer cases.",
      "ディスクキャリア、シャフト、ハブ、インプットシャフトを生産し、トランスミッションとトランスファーケースの動力伝達とオイル分配を安定して支えます。",
    ),
    overviewImage: drivelineLineupImage,
    families: ["DISK CARRIER", "SHAFT", "HUB", "INPUT SHAFT"],
    parts: [
      {
        title: localized("디스크 캐리어", "Disk Carrier", "ディスクキャリア"),
        application: localized("변속기 클러치·캐리어 계열", "Transmission clutch and carrier family", "トランスミッション・クラッチ／キャリア系列"),
        poster: drivelinePoster1,
        video: drivelineVideo1,
      },
      {
        title: localized("샤프트", "Shaft", "シャフト"),
        application: localized("변속기·트랜스퍼 케이스 동력전달", "Transmission and transfer-case power delivery", "トランスミッション・Transfer Case動力伝達"),
        poster: drivelinePoster2,
        video: drivelineVideo2,
      },
      {
        title: localized("허브", "Hub", "ハブ"),
        application: localized("IDC·ODC·클러치 허브 계열", "IDC, ODC, and clutch-hub family", "IDC・ODC・クラッチハブ系列"),
        poster: drivelinePoster3,
        video: drivelineVideo3,
      },
      {
        title: localized("인풋 샤프트", "Input Shaft", "インプットシャフト"),
        application: localized("변속기 입력·오일 분배 계열", "Transmission input and oil-distribution family", "トランスミッション入力・オイル分配系列"),
        poster: inputShaftImage,
        video: inputShaftVideo,
      },
    ],
    programs: [
      {
        program: "X51 / X48 OUTPUT SHAFT",
        partner: "SPARTAN LTM",
        application: localized("GM Cadillac Escalade 적용", "GM Cadillac Escalade application", "GM Cadillac Escalade向け"),
        source: vehicleProgramSource,
      },
      {
        program: "10R60 / 10R140 STATOR SHAFT",
        partner: "AAM",
        application: localized("Ford Explorer·Mustang 적용", "Ford Explorer and Mustang application", "Ford Explorer・Mustang向け"),
        source: vehicleProgramSource,
      },
      {
        program: "6F15 SLEEVE",
        partner: "AAM",
        application: localized("Ford KA·Kigo·Fiesta 적용", "Ford KA, Kigo, and Fiesta application", "Ford KA・Kigo・Fiesta向け"),
        source: vehicleProgramSource,
      },
      {
        program: "JLR MY19 ODC HUB",
        partner: "GKN",
        application: localized("Range Rover Evoque 적용", "Range Rover Evoque application", "Range Rover Evoque向け"),
        source: vehicleProgramSource,
      },
      {
        program: "9BUX IDC / ODC",
        partner: "GKN",
        application: localized("Chevrolet Trax·소형 SUV 적용", "Chevrolet Trax and compact-SUV application", "Chevrolet Trax・小型SUV向け"),
        source: vehicleProgramSource,
      },
      {
        program: "EM8B HUB",
        partner: "GKN",
        application: localized("Nissan SUV 적용", "Nissan SUV application", "Nissan SUV向け"),
        source: vehicleProgramSource,
      },
      {
        program: "FCA MP IDC / ODC",
        partner: "GKN",
        application: localized("Jeep B-SUV·Grand Cherokee·Compass 적용", "Jeep B-SUV, Grand Cherokee, and Compass application", "Jeep B-SUV・Grand Cherokee・Compass向け"),
        source: vehicleProgramSource,
      },
      {
        program: "WL ACTUATOR SHAFT",
        partner: "MAGNA POWERTRAIN",
        application: localized("Jeep B-SUV·Transfer Case 2WD/4WD 전환", "Jeep B-SUV transfer-case 2WD/4WD switching", "Jeep B-SUV・Transfer Case 2WD/4WD切替"),
        source: vehicleProgramSource,
      },
    ],
  },
  "products/etc": {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: localized("방산·특수사업 대응 역량", "Defense and special-project capability", "防衛・特殊事業対応力"),
    copy: localized(
      "제품과 고객 정보는 공개하지 않으며, 보안이 요구되는 프로젝트의 정밀가공과 품질관리 체계를 운영합니다.",
      "Products and customers remain confidential while precision machining and quality controls support security-sensitive programs.",
      "製品・顧客情報は公開せず、機密性の高いプロジェクトに対応する精密加工・品質管理体制を運用します。",
    ),
    overviewImage: defenseSpecialProjectsImage,
    families: ["SECURE PROJECT", "PRECISION MACHINING", "LOT TRACEABILITY", "CONTROLLED PRODUCTION"],
    parts: [],
    programs: [],
  },
};
