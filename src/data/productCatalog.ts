import drivelineVideo1 from "../../assets/product-alpha/driveline1.webm";
import drivelineVideo2 from "../../assets/product-alpha/driveline2.webm";
import drivelineVideo3 from "../../assets/product-alpha/driveline3.webm";
import electricVehicleVideo1 from "../../assets/product-alpha/electric-vehicle1.webm";
import electricVehicleVideo2 from "../../assets/product-alpha/electric-vehicle2.webm";
import housingVideo2 from "../../assets/product-alpha/housing2.webm";
import housingVideo3 from "../../assets/product-alpha/housing3.webm";
import housingVideo4 from "../../assets/product-alpha/housing4.webm";
import housingVideo5 from "../../assets/product-alpha/housing5.webm";
import steeringVideo1 from "../../assets/product-alpha/steering1.webm";
import steeringVideo2 from "../../assets/product-alpha/steering2.webm";
import drivelinePoster1 from "../../assets/video-posters/driveline1.jpg";
import drivelinePoster2 from "../../assets/video-posters/driveline2.jpg";
import drivelinePoster3 from "../../assets/video-posters/driveline3.jpg";
import electricVehiclePoster1 from "../../assets/video-posters/electric-vehicle1.jpg";
import electricVehiclePoster2 from "../../assets/video-posters/electric-vehicle2.jpg";
import heroHousingPoster from "../../assets/video-posters/hero-housing.jpg";
import housingPoster3 from "../../assets/video-posters/housing3.jpg";
import housingPoster4 from "../../assets/video-posters/housing4.jpg";
import housingPoster5 from "../../assets/video-posters/housing5.jpg";
import steeringPoster1 from "../../assets/video-posters/steering1.jpg";
import steeringPoster2 from "../../assets/video-posters/steering2.jpg";
import powertrainActuatorShafts from "../../assets/company-profile/products/powertrain-actuator-shafts.png";
import powertrainDiscCarrierComponents from "../../assets/company-profile/products/powertrain-disc-carrier-components.png";
import powertrainSunGearOutputShafts from "../../assets/company-profile/products/powertrain-sun-gear-output-shafts.png";

export type ProductCatalogLanguage = "ko" | "en" | "ja";

type LocalizedText = Record<ProductCatalogLanguage, string>;

export type ProductPart = {
  title: LocalizedText;
  application: LocalizedText;
  poster: string;
  video?: string;
};

export type ProductPartCatalog = {
  eyebrow: string;
  title: LocalizedText;
  copy: LocalizedText;
  parts: ProductPart[];
};

const localized = (ko: string, en: string, ja: string): LocalizedText => ({ ko, en, ja });

export const productPartCatalogByRoute: Record<string, ProductPartCatalog> = {
  "products/balance-shaft-module": {
    eyebrow: "BALANCE SHAFT MODULE PARTS",
    title: localized("밸런스 모듈 실제 생산 부품", "Production parts for balance shaft modules", "バランスシャフトモジュールの生産部品"),
    copy: localized(
      "베어링 보어, 조립면, 오일 유로의 정밀도를 관리하는 알루미늄 하우징 계열입니다.",
      "Aluminum housings controlled for bearing bores, assembly faces, and lubrication passages.",
      "ベアリングボア、組立面、オイル流路の精度を管理するアルミハウジングです。",
    ),
    parts: [
      {
        title: localized("BSM 하우징", "BSM Housing", "BSMハウジング"),
        application: localized("밸런스 샤프트 모듈", "Balance shaft module", "バランスシャフトモジュール"),
        poster: heroHousingPoster,
        video: housingVideo2,
      },
      {
        title: localized("모듈 베어링 하우징", "Module Bearing Housing", "モジュールベアリングハウジング"),
        application: localized("베어링 보어·조립면", "Bearing bore and assembly face", "ベアリングボア・組立面"),
        poster: housingPoster5,
        video: housingVideo5,
      },
    ],
  },
  "products/electric-vehicle": {
    eyebrow: "E-MOBILITY PARTS",
    title: localized("전동화 구동계 실제 생산 부품", "Production parts for electrified drivetrains", "電動化駆動系の生産部品"),
    copy: localized(
      "EV 감속기와 E-drive 시스템의 조립 조건, 윤활, 내구 기준에 맞춘 하우징과 정밀 부품입니다.",
      "Housings and precision parts engineered for EV reducers and e-drive assembly, lubrication, and durability requirements.",
      "EV減速機とE-driveシステムの組立、潤滑、耐久基準に合わせたハウジングと精密部品です。",
    ),
    parts: [
      {
        title: localized("E-drive 정밀 하우징", "E-drive Precision Housing", "E-drive精密ハウジング"),
        application: localized("EV 감속기 윤활 시스템", "EV reducer lubrication system", "EV減速機潤滑システム"),
        poster: electricVehiclePoster1,
        video: electricVehicleVideo1,
      },
      {
        title: localized("EV 구동 부품", "EV Drive Component", "EV駆動部品"),
        application: localized("E-drive·하이브리드 기어박스", "E-drive and hybrid gearbox", "E-drive・ハイブリッドギヤボックス"),
        poster: electricVehiclePoster2,
        video: electricVehicleVideo2,
      },
    ],
  },
  "products/steering": {
    eyebrow: "STEERING PARTS",
    title: localized("조향 시스템 실제 생산 부품", "Production parts for steering systems", "ステアリングシステムの生産部品"),
    copy: localized(
      "조향 입력을 정확하게 전달하도록 기어 형상, 런아웃, 열처리와 교정 기준을 관리합니다.",
      "Gear geometry, runout, heat treatment, and straightening are controlled for precise steering input transfer.",
      "操舵入力を正確に伝えるため、ギヤ形状、振れ、熱処理、矯正基準を管理します。",
    ),
    parts: [
      {
        title: localized("헬리컬 피니언", "Helical Pinion", "ヘリカルピニオン"),
        application: localized("조향 기어 어셈블리", "Steering gear assembly", "ステアリングギヤアセンブリ"),
        poster: steeringPoster1,
        video: steeringVideo1,
      },
      {
        title: localized("피니언 샤프트", "Pinion Shaft", "ピニオンシャフト"),
        application: localized("P/Shaft·토션 바 계열", "P/shaft and torsion-bar family", "P/Shaft・トーションバー系列"),
        poster: steeringPoster2,
        video: steeringVideo2,
      },
    ],
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN PARTS",
    title: localized("파워트레인 실제 생산 부품", "Production parts for powertrain systems", "パワートレインの生産部品"),
    copy: localized(
      "회사소개서에 수록된 샤프트와 허브 계열을 기준으로 구성했습니다. 하우징 영상을 임의로 연결하지 않고 실제 부품 명칭과 이미지를 사용합니다.",
      "This lineup is based on the shaft and hub families documented in the company profile, using verified part names and images rather than inferred housing footage.",
      "会社案内に掲載されたシャフトとハブ系列を基準に、推定したハウジング映像ではなく確認済みの部品名と画像を使用しています。",
    ),
    parts: [
      {
        title: localized("선 기어 출력 샤프트", "Sun Gear Output Shaft", "サンギヤ出力シャフト"),
        application: localized("동력 전달용 Powertrain Shaft", "Powertrain shaft for torque delivery", "動力伝達用Powertrain Shaft"),
        poster: powertrainSunGearOutputShafts,
      },
      {
        title: localized("액추에이터 샤프트", "Actuator Shaft", "アクチュエータシャフト"),
        application: localized("스플라인·오일홀 정밀가공 샤프트", "Precision shaft with spline and oil-hole features", "スプライン・オイル穴精密加工シャフト"),
        poster: powertrainActuatorShafts,
      },
      {
        title: localized("디스크 캐리어·허브", "Disc Carrier and Hub", "ディスクキャリア・ハブ"),
        application: localized("Inner/Outer Carrier와 레이저 용접 조립부", "Inner and outer carriers with laser-welded assembly parts", "Inner/Outer Carrierとレーザー溶接組立部品"),
        poster: powertrainDiscCarrierComponents,
      },
    ],
  },
  "products/driveline": {
    eyebrow: "DRIVELINE PARTS",
    title: localized("드라이브라인 실제 생산 부품", "Production parts for driveline systems", "ドライブラインの生産部品"),
    copy: localized(
      "변속기와 Transfer Case에서 동력을 전달하는 기어·샤프트 계열의 스플라인과 런아웃을 관리합니다.",
      "Spline geometry and runout are controlled for gears and shafts that transfer power through transmissions and transfer cases.",
      "トランスミッションとTransfer Caseで動力を伝えるギヤ・シャフトのスプラインと振れを管理します。",
    ),
    parts: [
      {
        title: localized("내측 기어 링", "Internal Gear Ring", "内歯ギヤリング"),
        application: localized("변속기·Transfer Case", "Transmission and transfer case", "トランスミッション・Transfer Case"),
        poster: drivelinePoster1,
        video: drivelineVideo1,
      },
      {
        title: localized("트랜스미션 샤프트", "Transmission Shaft", "トランスミッションシャフト"),
        application: localized("8L90·10R 샤프트 계열", "8L90 and 10R shaft family", "8L90・10Rシャフト系列"),
        poster: drivelinePoster2,
        video: drivelineVideo2,
      },
      {
        title: localized("드라이브라인 정밀부품", "Driveline Precision Component", "ドライブライン精密部品"),
        application: localized("액추에이터·스테이터 샤프트", "Actuator and stator shaft", "アクチュエータ・ステータシャフト"),
        poster: drivelinePoster3,
        video: drivelineVideo3,
      },
    ],
  },
  "products/etc": {
    eyebrow: "CUSTOM OEM PARTS",
    title: localized("도면 기반 맞춤 생산 부품", "Drawing-based custom production parts", "図面ベースのカスタム生産部品"),
    copy: localized(
      "기어, 스플라인, 샤프트와 하우징을 고객 도면과 양산 조건에 맞춰 공정 설계합니다.",
      "Gears, splines, shafts, and housings are process-engineered around customer drawings and production conditions.",
      "ギヤ、スプライン、シャフト、ハウジングを顧客図面と量産条件に合わせて工程設計します。",
    ),
    parts: [
      {
        title: localized("맞춤 가공 하우징", "Custom Machined Housing", "カスタム加工ハウジング"),
        application: localized("고객 도면 기반 OEM", "Drawing-based OEM", "顧客図面ベースOEM"),
        poster: housingPoster3,
        video: housingVideo3,
      },
      {
        title: localized("전용 정밀 부품", "Dedicated Precision Part", "専用精密部品"),
        application: localized("시제품부터 양산까지", "Prototype through mass production", "試作から量産まで"),
        poster: housingPoster4,
        video: housingVideo4,
      },
    ],
  },
};
