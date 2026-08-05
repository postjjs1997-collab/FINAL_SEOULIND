import drivelineInputShaftVideo from "../../assets/product-alpha/driveline/8l90-input-shafts.webm";
import drivelineActuatorShaftVideo from "../../assets/product-alpha/driveline/transfer-case-actuator-shafts.webm";
import drivelineStatorShaftVideo from "../../assets/product-alpha/driveline/10r-trs-stator-shaft.webm";
import electricVehicleVideo1 from "../../assets/product-alpha/electric-vehicle1.webm";
import electricVehicleVideo2 from "../../assets/product-alpha/electric-vehicle2.webm";
import housingVideo2 from "../../assets/product-alpha/housing2.webm";
import housingVideo3 from "../../assets/product-alpha/housing3.webm";
import housingVideo4 from "../../assets/product-alpha/housing4.webm";
import housingVideo5 from "../../assets/product-alpha/housing5.webm";
import steeringVideo1 from "../../assets/product-alpha/steering1.webm";
import steeringVideo2 from "../../assets/product-alpha/steering2.webm";
import drivelineInputShaftPoster from "../../assets/video-posters/driveline/8l90-input-shafts.jpg";
import drivelineActuatorShaftPoster from "../../assets/video-posters/driveline/transfer-case-actuator-shafts.jpg";
import drivelineStatorShaftPoster from "../../assets/video-posters/driveline/10r-trs-stator-shaft.jpg";
import electricVehiclePoster1 from "../../assets/video-posters/electric-vehicle1.jpg";
import electricVehiclePoster2 from "../../assets/video-posters/electric-vehicle2.jpg";
import heroHousingPoster from "../../assets/video-posters/hero-housing.jpg";
import housingPoster3 from "../../assets/video-posters/housing3.jpg";
import housingPoster4 from "../../assets/video-posters/housing4.jpg";
import housingPoster5 from "../../assets/video-posters/housing5.jpg";
import steeringPoster1 from "../../assets/video-posters/steering1.jpg";
import steeringPoster2 from "../../assets/video-posters/steering2.jpg";
import powertrainOutputShaftPoster from "../../assets/video-posters/powertrain/8l90-output-shafts.jpg";
import powertrainDiscCarrierPoster from "../../assets/video-posters/powertrain/clutch-hub-disc-carrier.jpg";
import powertrainOutputShaftVideo from "../../assets/product-alpha/powertrain/8l90-output-shafts.webm";
import powertrainDiscCarrierVideo from "../../assets/product-alpha/powertrain/clutch-hub-disc-carrier.webm";

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
        title: localized("BSM 정밀 하우징 01", "BSM Precision Housing 01", "BSM精密ハウジング 01"),
        application: localized("밸런스 샤프트 모듈", "Balance shaft module", "バランスシャフトモジュール"),
        poster: heroHousingPoster,
        video: housingVideo2,
      },
      {
        title: localized("BSM 정밀 하우징 02", "BSM Precision Housing 02", "BSM精密ハウジング 02"),
        application: localized("밸런스 샤프트 모듈 하우징 계열", "Balance shaft module housing family", "バランスシャフトモジュール・ハウジング系列"),
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
        title: localized("EV 정밀 부품 01", "EV Precision Component 01", "EV精密部品 01"),
        application: localized("EV 감속기·E-drive 계열", "EV reducer and e-drive family", "EV減速機・E-drive系列"),
        poster: electricVehiclePoster1,
        video: electricVehicleVideo1,
      },
      {
        title: localized("EV 정밀 부품 02", "EV Precision Component 02", "EV精密部品 02"),
        application: localized("E-drive·하이브리드 기어박스 계열", "E-drive and hybrid gearbox family", "E-drive・ハイブリッドギヤボックス系列"),
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
      "Powertrain Shaft와 Sun Gear Output Shaft, Engine·Decelerator용 Clutch Hub와 Disc Carrier 계열입니다.",
      "Powertrain shafts, sun-gear output shafts, and clutch-hub and disc-carrier families for engine and reduction systems.",
      "Powertrain Shaft、Sun Gear Output Shaft、エンジン・減速機向けClutch Hub、Disc Carrier系列です。",
    ),
    parts: [
      {
        title: localized("8L90 선 기어 출력 샤프트", "8L90 Sun Gear Output Shaft", "8L90サンギヤ出力シャフト"),
        application: localized("8L90 변속기 출력 샤프트 계열", "8L90 transmission output-shaft family", "8L90トランスミッション出力シャフト系列"),
        poster: powertrainOutputShaftPoster,
        video: powertrainOutputShaftVideo,
      },
      {
        title: localized("클러치 허브·디스크 캐리어", "Clutch Hub and Disc Carrier", "クラッチハブ・ディスクキャリア"),
        application: localized("내·외측 캐리어와 레이저 용접 조립부", "Inner and outer carriers with laser-welded assemblies", "内・外側キャリアとレーザー溶接組立部品"),
        poster: powertrainDiscCarrierPoster,
        video: powertrainDiscCarrierVideo,
      },
    ],
  },
  "products/driveline": {
    eyebrow: "DRIVELINE PARTS",
    title: localized("드라이브라인 실제 생산 부품", "Production parts for driveline systems", "ドライブラインの生産部品"),
    copy: localized(
      "8L90·10R 변속기와 Transfer Case에 적용되는 Input Shaft, Actuator Shaft, TRS Stator Shaft 계열입니다.",
      "Input shafts, actuator shafts, and TRS stator shafts for 8L90 and 10R transmissions and transfer cases.",
      "8L90・10RトランスミッションとTransfer Case向けのInput Shaft、Actuator Shaft、TRS Stator Shaft系列です。",
    ),
    parts: [
      {
        title: localized("8L90 인풋 샤프트", "8L90 Input Shaft", "8L90インプットシャフト"),
        application: localized("8L90 변속기 입력 샤프트 계열", "8L90 transmission input-shaft family", "8L90トランスミッション入力シャフト系列"),
        poster: drivelineInputShaftPoster,
        video: drivelineInputShaftVideo,
      },
      {
        title: localized("트랜스퍼 케이스 액추에이터 샤프트", "Transfer Case Actuator Shaft", "トランスファーケース・アクチュエータシャフト"),
        application: localized("스플라인·크로스홀 정밀가공 샤프트", "Precision shaft with spline and cross-hole features", "スプライン・クロスホール精密加工シャフト"),
        poster: drivelineActuatorShaftPoster,
        video: drivelineActuatorShaftVideo,
      },
      {
        title: localized("10R TRS 스테이터 샤프트", "10R TRS Stator Shaft", "10R TRSステーターシャフト"),
        application: localized("10R 변속기 스테이터 샤프트 계열", "10R transmission stator-shaft family", "10Rトランスミッション・ステーターシャフト系列"),
        poster: drivelineStatorShaftPoster,
        video: drivelineStatorShaftVideo,
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
