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
import electrifiedOutputShaftPoster from "../../assets/product-catalog/electrified/e-drive-output-shaft.jpg";
import electrifiedOutputShaftVideo from "../../assets/product-catalog/electrified/e-drive-output-shaft.mp4";
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

export type ProductPartCatalog = {
  eyebrow: string;
  title: ProductLocalizedText;
  copy: ProductLocalizedText;
  overviewImage: string;
  overviewVideo?: string;
  families: string[];
  parts: ProductPart[];
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
      "밸런스 샤프트 모듈용 알루미늄 하우징과 오일펌프를 가공합니다. 베어링 보어, 조립면, 오일 유로와 복합 형상의 정밀도를 통합 관리합니다.",
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
    qualityControls: [
      {
        feature: localized("베어링 보어", "Bearing bores", "ベアリングボア"),
        characteristic: localized(
          "주요 치수·형상·위치",
          "Critical dimensions, geometry, and position",
          "主要寸法・形状・位置",
        ),
        verification: localized(
          "전용 자동검사와 CMM 정밀 측정",
          "Dedicated automatic inspection and CMM measurement",
          "専用自動検査およびCMMによる精密測定",
        ),
      },
      {
        feature: localized("모듈 조립면", "Module assembly faces", "モジュール組立面"),
        characteristic: localized(
          "기준면 대비 형상·위치 공차",
          "Geometric and positional tolerances relative to datum faces",
          "基準面に対する形状・位置公差",
        ),
        verification: localized(
          "CMM 형상·위치 검증",
          "CMM inspection of geometry and position",
          "CMMによる形状・位置検証",
        ),
      },
      {
        feature: localized("오일 유로", "Oil passages", "オイル流路"),
        characteristic: localized(
          "도면 기준 치수·가공 상태",
          "Drawing-defined dimensions and machined condition",
          "図面基準の寸法・加工状態",
        ),
        verification: localized(
          "치수 측정과 최종 외관 확인",
          "Dimensional measurement and final visual check",
          "寸法測定と最終外観確認",
        ),
      },
    ],
  },
  "products/electric-vehicle": {
    eyebrow: "ELECTRIFIED POWERTRAIN",
    title: localized(
      "EV 오일펌프 부품과 HEV·PHEV·BEV용 기어·샤프트",
      "EV oil-pump components plus gears and shafts for HEV, PHEV, and BEV platforms",
      "EVオイルポンプ部品とHEV・PHEV・BEV向けギヤ・シャフト",
    ),
    copy: localized(
      "EV 감속기 윤활계용 오일펌프 하우징·커버를 가공하며, HEV·PHEV·BEV용 Coaxial·Link·Output Shaft의 설계 검토와 시제품 검증에 대응합니다. 제품별 승인 단계에 맞춰 형상과 품질 기준을 관리합니다.",
      "EV oil-pump housings and covers are machined for reducer lubrication systems, while coaxial, link, and output shafts support design review and prototype validation for HEV, PHEV, and BEV platforms. Geometry and quality controls follow each product's approval stage.",
      "EV減速機潤滑系向けオイルポンプのハウジング・カバーを加工し、HEV・PHEV・BEV向けCoaxial・Link・Output Shaftの設計検討と試作検証に対応します。製品ごとの承認段階に合わせて形状と品質基準を管理します。",
    ),
    overviewImage: electrifiedLineupImage,
    families: ["EV OIL PUMP HOUSING / COVER", "HEV GEAR SHAFT", "COAXIAL / LINK SHAFT", "E-DRIVE OUTPUT SHAFT"],
    // The source deck presents the oil-pump housing/cover in its machined-aluminum chapter.
    // The website intentionally groups them here by their EV reducer application.
    parts: [
      {
        title: localized("EV 오일 펌프 하우징", "EV Oil Pump Housing", "EVオイルポンプ・ハウジング"),
        application: localized("EV 감속기 윤활 시스템", "EV reducer lubrication system", "EV減速機潤滑システム"),
        poster: electricVehiclePoster1,
        video: electricVehicleVideo1,
      },
      {
        title: localized("EV 오일 펌프 커버", "EV Oil Pump Cover", "EVオイルポンプ・カバー"),
        application: localized("EV 감속기 윤활 시스템", "EV reducer lubrication system", "EV減速機潤滑システム"),
        poster: electricVehiclePoster2,
        video: electricVehicleVideo2,
      },
      {
        title: localized("링크 샤프트", "Link Shaft", "リンクシャフト"),
        application: localized("PHEV 기어박스·E-drive 동력 전달", "Power transfer for PHEV gearboxes and E-drive systems", "PHEVギヤボックス・E-drive向け動力伝達"),
        poster: electrifiedLinkShaftPoster,
        video: electrifiedLinkShaftVideo,
      },
      {
        title: localized("코액시얼 샤프트", "Coaxial Shaft", "コアキシャルシャフト"),
        application: localized("HEV·PHEV 전동화 기어박스", "HEV and PHEV electrified gearboxes", "HEV・PHEV電動化ギヤボックス"),
        poster: electrifiedCoaxialShaftPoster,
        video: electrifiedCoaxialShaftVideo,
      },
      {
        title: localized("E-drive 출력 샤프트", "E-drive Output Shaft", "E-drive出力シャフト"),
        application: localized("BEV 전기 구동 모듈", "BEV electric drive modules", "BEV電動ドライブモジュール"),
        poster: electrifiedOutputShaftPoster,
        video: electrifiedOutputShaftVideo,
      },
    ],
    qualityControls: [
      {
        feature: localized(
          "EV 오일펌프 하우징·커버",
          "EV oil-pump housings and covers",
          "EVオイルポンプのハウジング・カバー",
        ),
        characteristic: localized(
          "주요 홀·장착면·오일 유로",
          "Critical holes, mounting faces, and oil passages",
          "主要穴・取付面・オイル流路",
        ),
        verification: localized(
          "전용 자동검사와 CMM 정밀 측정",
          "Dedicated automatic inspection and CMM measurement",
          "専用自動検査およびCMMによる精密測定",
        ),
      },
      {
        feature: localized("전동화 샤프트 기어·스플라인부", "Electrified-shaft gear and spline sections", "電動化シャフトのギヤ・スプライン部"),
        characteristic: localized(
          "치형·형상·위치",
          "Tooth profile, geometry, and position",
          "歯形・形状・位置",
        ),
        verification: localized(
          "기어 전용 측정과 CMM 검증",
          "Dedicated gear metrology and CMM verification",
          "ギヤ専用測定およびCMMによる検証",
        ),
      },
      {
        feature: localized("샤프트 베어링 장착면", "Shaft bearing seats", "シャフトのベアリング取付面"),
        characteristic: localized(
          "리드 관리·표면 상태",
          "Lead control and surface condition",
          "リード管理・表面状態",
        ),
        verification: localized(
          "정밀 측정과 최종 외관 확인",
          "Precision measurement and final visual check",
          "精密測定と最終外観確認",
        ),
      },
      {
        feature: localized(
          "Coaxial·Link·Output Shaft 회전부",
          "Coaxial, link, and output-shaft rotating sections",
          "Coaxial・Link・Output Shaft回転部",
        ),
        characteristic: localized(
          "회전부 치수·런아웃",
          "Rotating dimensions and runout",
          "回転部の寸法・振れ",
        ),
        verification: localized(
          "정밀 측정과 런아웃 측정·교정·재측정 이력 확인",
          "Precision measurement with runout measure-straighten-remeasure records",
          "精密測定と振れの測定・矯正・再測定履歴の確認",
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
    qualityControls: [
      {
        feature: localized(
          "피니언 기어·스플라인부",
          "Pinion gear and spline sections",
          "ピニオンのギヤ・スプライン部",
        ),
        characteristic: localized(
          "치형·형상·위치",
          "Tooth profile, geometry, and position",
          "歯形・形状・位置",
        ),
        verification: localized(
          "기어 전용 측정과 CMM 검증",
          "Dedicated gear metrology and CMM verification",
          "ギヤ専用測定およびCMMによる検証",
        ),
      },
      {
        feature: localized(
          "피니언 샤프트 회전부",
          "Pinion-shaft rotating sections",
          "ピニオンシャフト回転部",
        ),
        characteristic: localized("런아웃·교정 결과", "Runout and straightening results", "振れ・矯正結果"),
        verification: localized(
          "자동 런아웃 측정·교정·재측정과 판정 이력 관리",
          "Automatic runout measure-straighten-remeasure cycle with result records",
          "自動振れ測定・矯正・再測定と判定履歴管理",
        ),
      },
      {
        feature: localized("열처리 부품", "Heat-treated components", "熱処理部品"),
        characteristic: localized(
          "표면 상태·균열 징후",
          "Surface condition and crack indications",
          "表面状態・亀裂兆候",
        ),
        verification: localized(
          "최종 외관 확인과 음향 공진 비파괴 균열검사",
          "Final visual check and acoustic-resonance nondestructive crack inspection",
          "最終外観確認と音響共振による非破壊亀裂検査",
        ),
      },
    ],
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN PARTS",
    title: localized("파워트레인 정밀 부품", "Precision components for powertrain systems", "パワートレインの精密部品"),
    copy: localized(
      "6단 변속기, 8L90 Input·Output, 10R140용 샤프트와 Oil Pump Shaft, Camshaft Nose Piece, Balance Shaft를 생산합니다.",
      "Production covers six-speed, 8L90 input and output, and 10R140 transmission shafts, plus oil-pump shafts, camshaft nose pieces, and balance shafts.",
      "6速、8L90 Input・Output、10R140用シャフトに加え、Oil Pump Shaft、Camshaft Nose Piece、Balance Shaftを生産します。",
    ),
    overviewImage: powertrainLineupImage,
    families: ["TRANSMISSION SHAFT", "OIL PUMP SHAFT", "CAMSHAFT NOSE PIECE", "BALANCE SHAFT"],
    parts: [
      {
        title: localized("8L90 출력 샤프트", "8L90 Output Shaft", "8L90出力シャフト"),
        application: localized("자동변속기 토크 전달", "Automatic-transmission torque delivery", "オートマチックトランスミッションのトルク伝達"),
        poster: transmissionOutputPoster,
        video: transmissionOutputVideo,
      },
      {
        title: localized("캠샤프트 노즈 피스", "Camshaft Nose Piece", "カムシャフト・ノーズピース"),
        application: localized("캠 샤프트 밸브 개폐 제어 계열", "Camshaft valve-timing control family", "カムシャフト・バルブ開閉制御系列"),
        poster: endPieceImage,
        video: endPieceVideo,
      },
      {
        title: localized("변속기 기어 샤프트", "Transmission Gear Shaft", "トランスミッション・ギヤシャフト"),
        application: localized("기어·스플라인 동력전달 계열", "Gear-and-spline power-transfer family", "ギヤ・スプライン動力伝達系列"),
        poster: powertrainShaftPoster1,
        video: powertrainShaftVideo1,
      },
      {
        title: localized("10R140 계열 샤프트", "10R140-family Shaft", "10R140系列シャフト"),
        application: localized("자동변속기 정밀 샤프트 계열", "Precision automatic-transmission shaft family", "オートマチックトランスミッション用精密シャフト系列"),
        poster: transmission10r140Poster,
        video: transmission10r140Video,
      },
    ],
    qualityControls: [
      {
        feature: localized(
          "파워트레인 샤프트의 기어·스플라인부",
          "Powertrain-shaft gear and spline sections",
          "パワートレインシャフトのギヤ・スプライン部",
        ),
        characteristic: localized(
          "치형·형상·위치",
          "Tooth profile, geometry, and position",
          "歯形・形状・位置",
        ),
        verification: localized(
          "기어 전용 측정과 CMM 검증",
          "Dedicated gear metrology and CMM verification",
          "ギヤ専用測定およびCMMによる検証",
        ),
      },
      {
        feature: localized(
          "샤프트 외경·기준면",
          "Shaft outside diameter and datum faces",
          "シャフト外径・基準面",
        ),
        characteristic: localized(
          "치수·진원도·런아웃",
          "Dimensions, roundness, and runout",
          "寸法・真円度・振れ",
        ),
        verification: localized(
          "정밀 치수 측정과 자동 런아웃 교정 이력 확인",
          "Precision dimensional measurement and automatic runout-straightening records",
          "精密寸法測定と自動振れ矯正履歴の確認",
        ),
      },
      {
        feature: localized("캠샤프트 노즈 피스 주요 형상", "Critical camshaft nose-piece geometry", "カムシャフト・ノーズピースの主要形状"),
        characteristic: localized(
          "주요 치수·기하공차",
          "Critical dimensions and GD&T",
          "主要寸法・幾何公差",
        ),
        verification: localized(
          "전용 자동검사와 LOT 이력 연계",
          "Dedicated automatic inspection linked to lot history",
          "専用自動検査とLOT履歴の連携",
        ),
      },
    ],
  },
  "products/driveline": {
    eyebrow: "DRIVELINE PARTS",
    title: localized("드라이브라인 정밀 부품", "Precision components for driveline systems", "ドライブラインの精密部品"),
    copy: localized(
      "Transfer Case와 ETM용 Actuator Shaft, EMCD Hub, Disc Carrier 계열을 호빙·브로칭·랙 롤링 및 레이저 용접 조립 공정으로 생산합니다.",
      "Transfer-case and ETM actuator shafts, EMCD hubs, and disc-carrier families are produced through hobbing, broaching, rack rolling, and laser-welded assembly.",
      "Transfer Case・ETM向けActuator Shaft、EMCD Hub、Disc Carrier系列を、ホビング、ブローチ、ラックローリング、レーザー溶接組立で生産します。",
    ),
    overviewImage: drivelineLineupImage,
    families: ["TRANSFER CASE ACTUATOR SHAFT", "EMCD HUB", "DISK CARRIER", "LASER-WELDED ASSEMBLY"],
    parts: [
      {
        title: localized("디스크 캐리어·허브", "Disk Carrier / Hub", "ディスクキャリア／ハブ"),
        application: localized("ETM 동력 배분 어셈블리", "ETM torque-distribution assembly", "ETMトルク配分アセンブリ"),
        poster: discCarrierPoster,
        video: discCarrierVideo,
      },
      {
        title: localized("트랜스퍼 케이스 액추에이터 샤프트", "Transfer Case Actuator Shaft", "Transfer Case Actuator Shaft"),
        application: localized("트랜스퍼 케이스 구동 제어", "Transfer-case drive control", "Transfer Case駆動制御"),
        poster: transferCaseActuatorPoster,
        video: transferCaseActuatorVideo,
      },
      {
        title: localized("EMCD 허브", "EMCD Hub", "EMCDハブ"),
        application: localized("ETM·EMCD 허브 계열", "ETM and EMCD hub family", "ETM・EMCDハブ系列"),
        poster: drivelinePoster3,
        video: drivelineVideo3,
      },
      {
        title: localized("레이저 용접 어셈블리", "Laser-welded Assembly", "レーザー溶接アセンブリ"),
        application: localized("Disc Carrier 조립 부품", "Disc-carrier assembly parts", "Disc Carrier組立部品"),
        poster: drivelinePoster1,
        video: drivelineVideo1,
      },
    ],
    qualityControls: [
      {
        feature: localized(
          "액추에이터 샤프트의 기어·스플라인부",
          "Actuator-shaft gear and spline sections",
          "アクチュエーターシャフトのギヤ・スプライン部",
        ),
        characteristic: localized(
          "치형·형상·위치",
          "Tooth profile, geometry, and position",
          "歯形・形状・位置",
        ),
        verification: localized(
          "기어 전용 측정과 CMM 검증",
          "Dedicated gear metrology and CMM verification",
          "ギヤ専用測定およびCMMによる検証",
        ),
      },
      {
        feature: localized(
          "디스크 캐리어·허브 조립면",
          "Disc-carrier and hub assembly interfaces",
          "ディスクキャリア・ハブの組立面",
        ),
        characteristic: localized(
          "주요 치수·동심도·조립 상태",
          "Critical dimensions, concentricity, and assembly condition",
          "主要寸法・同心度・組立状態",
        ),
        verification: localized(
          "전용 치수검사와 최종 외관 확인",
          "Dedicated dimensional inspection and final visual check",
          "専用寸法検査と最終外観確認",
        ),
      },
      {
        feature: localized("샤프트 회전부", "Shaft rotating sections", "シャフト回転部"),
        characteristic: localized(
          "치수·진원도·런아웃",
          "Dimensions, roundness, and runout",
          "寸法・真円度・振れ",
        ),
        verification: localized(
          "자동 런아웃 측정·교정·재측정과 결과 이력 관리",
          "Automatic runout measure-straighten-remeasure cycle with result records",
          "自動振れ測定・矯正・再測定と結果履歴管理",
        ),
      },
    ],
  },
  "products/etc": {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: localized("DEFENSE", "DEFENSE", "DEFENSE"),
    copy: localized(
      "방산을 포함해 정보 관리가 요구되는 프로젝트를 위한 정밀가공과 품질관리 체계를 운영합니다.",
      "Precision machining and quality-management capabilities support defense and other projects requiring controlled information.",
      "防衛分野を含む情報管理が求められるプロジェクトに向けた精密加工・品質管理体制を運用します。",
    ),
    overviewImage: defenseSpecialProjectsImage,
    families: ["SECURE PROJECT", "PRECISION MACHINING", "LOT TRACEABILITY", "CONTROLLED PRODUCTION"],
    parts: [],
    qualityControls: [],
  },
};
