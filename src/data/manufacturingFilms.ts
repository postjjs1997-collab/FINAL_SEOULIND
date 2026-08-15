import angularGrindingPoster from "../../assets/company-profile/video-library/angular-grinding.jpg";
import angularGrindingVideo from "../../assets/company-profile/video-library/angular-grinding.mp4";
import broachingPoster from "../../assets/company-profile/video-library/broaching.jpg";
import broachingVideo from "../../assets/company-profile/video-library/broaching.mp4";
import gantryTransferPoster from "../../assets/company-profile/video-library/gantry-transfer-line.jpg";
import gantryTransferVideo from "../../assets/company-profile/video-library/gantry-transfer-line.mp4";
import gearShapingPoster from "../../assets/company-profile/video-library/gear-shaping.jpg";
import gearShapingVideo from "../../assets/company-profile/video-library/gear-shaping.mp4";
import idGrindingPoster from "../../assets/company-profile/video-library/id-grinding.jpg";
import idGrindingVideo from "../../assets/company-profile/video-library/id-grinding.mp4";
import laserWeldingPoster from "../../assets/company-profile/video-library/laser-welding.jpg";
import laserWeldingVideo from "../../assets/company-profile/video-library/laser-welding.mp4";
import linkShaftGrindingPoster from "../../assets/company-profile/video-library/link-shaft-grinding.jpg";
import linkShaftGrindingVideo from "../../assets/company-profile/video-library/link-shaft-grinding.mp4";
import multiStageGantryPoster from "../../assets/company-profile/video-library/multi-stage-gantry.jpg";
import multiStageGantryVideo from "../../assets/company-profile/video-library/multi-stage-gantry.mp4";
import odGrindingPoster from "../../assets/company-profile/video-library/od-grinding.jpg";
import odGrindingVideo from "../../assets/company-profile/video-library/od-grinding.mp4";
import polishingPoster from "../../assets/company-profile/video-library/polishing.jpg";
import polishingVideo from "../../assets/company-profile/video-library/polishing.mp4";
import precisionMetrologyPoster from "../../assets/company-profile/video-library/precision-metrology.jpg";
import precisionMetrologyVideo from "../../assets/company-profile/video-library/precision-metrology.mp4";
import rackRollingPoster from "../../assets/company-profile/video-library/rack-rolling.jpg";
import rackRollingVideo from "../../assets/company-profile/video-library/rack-rolling.mp4";
import shotPeeningPoster from "../../assets/company-profile/video-library/shot-peening.jpg";
import shotPeeningVideo from "../../assets/company-profile/video-library/shot-peening.mp4";

export type ManufacturingFilmLanguage = "ko" | "en" | "ja";
export type ManufacturingFilmGroupId = "gear-spline" | "precision-finishing" | "joining-automation";

type LocalizedText = Record<ManufacturingFilmLanguage, string>;

export type ManufacturingFilm = {
  id: string;
  group: ManufacturingFilmGroupId;
  title: LocalizedText;
  copy: LocalizedText;
  video: string;
  poster: string;
};

export const manufacturingFilmLibraryCopy = {
  ko: {
    eyebrow: "MANUFACTURING IN ACTION",
    title: "정밀 부품을 완성하는 핵심 생산 공정",
    copy: "기어·스플라인 가공, 연삭·폴리싱, 레이저 용접, 자동 이송까지 서울산업의 핵심 생산 기술과 공정 흐름을 실제 가동 영상으로 소개합니다.",
    tabs: {
      "gear-spline": "기어·스플라인",
      "precision-finishing": "정밀 정삭",
      "joining-automation": "접합·자동화",
    },
  },
  en: {
    eyebrow: "MANUFACTURING IN ACTION",
    title: "Core processes behind precision components",
    copy: "See Seoul Industry’s key manufacturing technologies and process flow in operation—from gear and spline machining to grinding, polishing, laser welding, and automated transfer.",
    tabs: {
      "gear-spline": "Gear & Spline",
      "precision-finishing": "Precision Finishing",
      "joining-automation": "Joining & Automation",
    },
  },
  ja: {
    eyebrow: "MANUFACTURING IN ACTION",
    title: "精密部品を支える主要生産工程",
    copy: "ギヤ・スプライン加工から研削・ポリッシング、レーザー溶接、自動搬送まで、ソウル産業の主要な生産技術と工程の流れを実際の稼働映像でご紹介します。",
    tabs: {
      "gear-spline": "ギヤ・スプライン",
      "precision-finishing": "精密仕上げ",
      "joining-automation": "接合・自動化",
    },
  },
} satisfies Record<
  ManufacturingFilmLanguage,
  {
    eyebrow: string;
    title: string;
    copy: string;
    tabs: Record<ManufacturingFilmGroupId, string>;
  }
>;

export const manufacturingFilmGroupIds = [
  "gear-spline",
  "precision-finishing",
  "joining-automation",
] as const satisfies readonly ManufacturingFilmGroupId[];

export const manufacturingFilmLibrary: ManufacturingFilm[] = [
  {
    id: "gear-shaping",
    group: "gear-spline",
    title: { ko: "기어 셰이핑", en: "Gear Shaping", ja: "ギヤシェーピング" },
    copy: {
      ko: "공구 접근이 제한된 내·외치 기어와 스플라인 형상을 전용 셰이핑 공정으로 가공합니다.",
      en: "Dedicated shaping machines cut internal and external gear and spline profiles where access is limited.",
      ja: "工具アクセスが限られる内歯・外歯ギヤおよびスプライン形状を専用シェーピング工程で加工します。",
    },
    video: gearShapingVideo,
    poster: gearShapingPoster,
  },
  {
    id: "broaching",
    group: "gear-spline",
    title: { ko: "브로칭", en: "Broaching", ja: "ブローチ加工" },
    copy: {
      ko: "브로치 공구의 연속 절삭으로 내경 기어와 스플라인 형상을 가공합니다.",
      en: "A continuous broaching cut produces internal gear and spline profiles.",
      ja: "ブローチ工具による連続切削で内歯ギヤとスプライン形状を加工します。",
    },
    video: broachingVideo,
    poster: broachingPoster,
  },
  {
    id: "rack-rolling",
    group: "gear-spline",
    title: { ko: "랙 롤링", en: "Rack Rolling", ja: "ラックローリング" },
    copy: {
      ko: "롤링 다이로 샤프트 표면에 랙과 스플라인 형상을 안정적으로 성형합니다.",
      en: "Rolling dies form consistent rack and spline profiles on shaft surfaces.",
      ja: "ローリングダイでシャフト表面にラックおよびスプライン形状を安定して成形します。",
    },
    video: rackRollingVideo,
    poster: rackRollingPoster,
  },
  {
    id: "id-grinding",
    group: "precision-finishing",
    title: { ko: "이너 디스크 캐리어 연삭", en: "Inner Disc Carrier Grinding", ja: "インナーディスクキャリア研削" },
    copy: {
      ko: "드라이브라인용 이너 디스크 캐리어의 보어 치수와 동심도, 기능면을 연삭합니다.",
      en: "Grinding controls bore size, concentricity, and functional surfaces on inner disc carriers for driveline systems.",
      ja: "ドライブライン向けインナーディスクキャリアのボア寸法、同心度および機能面を研削します。",
    },
    video: idGrindingVideo,
    poster: idGrindingPoster,
  },
  {
    id: "od-grinding",
    group: "precision-finishing",
    title: { ko: "아우터 디스크 캐리어 연삭", en: "Outer Disc Carrier Grinding", ja: "アウターディスクキャリア研削" },
    copy: {
      ko: "드라이브라인용 아우터 디스크 캐리어의 기준 직경, 원통도와 표면 마감성을 연삭 공정으로 관리합니다.",
      en: "Grinding controls reference diameters, cylindricity, and surface finish on outer disc carriers for driveline systems.",
      ja: "ドライブライン向けアウターディスクキャリアの基準径、円筒度および表面仕上げを研削工程で管理します。",
    },
    video: odGrindingVideo,
    poster: odGrindingPoster,
  },
  {
    id: "angular-grinding",
    group: "precision-finishing",
    title: { ko: "앵귤러 연삭", en: "Angular Grinding", ja: "アンギュラ研削" },
    copy: {
      ko: "단차와 각도면을 한 공정에서 연삭해 회전 부품의 형상 정밀도를 확보합니다.",
      en: "Angular grinding finishes stepped and angled surfaces in one controlled setup.",
      ja: "段差面と角度面を一つの工程で研削し、回転部品の形状精度を確保します。",
    },
    video: angularGrindingVideo,
    poster: angularGrindingPoster,
  },
  {
    id: "shaft-grinding-cell",
    group: "precision-finishing",
    title: { ko: "링크 샤프트 연삭 셀", en: "Link Shaft Grinding Cell", ja: "リンクシャフト研削セル" },
    copy: {
      ko: "전동화 링크 샤프트의 설계·시제품 검증 단계에서 로봇 이송과 전용 연삭을 연계해 가공 조건의 재현성을 확인합니다.",
      en: "For electrified link-shaft design and prototype validation, robotic transfer and dedicated grinding are combined to verify repeatable process conditions.",
      ja: "電動化リンクシャフトの設計・試作検証段階で、ロボット搬送と専用研削を組み合わせ、再現性のある加工条件を確認します。",
    },
    video: linkShaftGrindingVideo,
    poster: linkShaftGrindingPoster,
  },
  {
    id: "polishing",
    group: "precision-finishing",
    title: { ko: "폴리싱", en: "Polishing", ja: "ポリッシング" },
    copy: {
      ko: "베어링 랜드와 기능면을 폴리싱해 요구되는 표면 상태로 마무리합니다.",
      en: "Polishing finishes bearing lands and functional surfaces to the required condition.",
      ja: "ベアリングランドと機能面をポリッシングし、要求される表面状態に仕上げます。",
    },
    video: polishingVideo,
    poster: polishingPoster,
  },
  {
    id: "shot-peening",
    group: "precision-finishing",
    title: { ko: "쇼트 피닝", en: "Shot Peening", ja: "ショットピーニング" },
    copy: {
      ko: "쇼트 미디어로 표면을 처리해 디버링과 피로 강도, 표면 상태 개선에 대응합니다.",
      en: "Shot peening removes burrs and improves fatigue strength and surface condition.",
      ja: "ショットメディアで表面を処理し、バリを除去して疲労強度と表面状態を改善します。",
    },
    video: shotPeeningVideo,
    poster: shotPeeningPoster,
  },
  {
    id: "laser-welding",
    group: "joining-automation",
    title: { ko: "레이저 용접", en: "Laser Welding", ja: "レーザー溶接" },
    copy: {
      ko: "정밀 위치 결정과 레이저 용접을 연계해 조립 부품의 접합 공정을 구성합니다.",
      en: "Precision positioning and laser welding are combined in a controlled component-assembly process.",
      ja: "精密位置決めとレーザー溶接を組み合わせ、組立部品の接合工程を構築します。",
    },
    video: laserWeldingVideo,
    poster: laserWeldingPoster,
  },
  {
    id: "multi-stage-gantry",
    group: "joining-automation",
    title: { ko: "다단계 갠트리 자동화", en: "Multi-stage Gantry Automation", ja: "多工程ガントリー自動化" },
    copy: {
      ko: "공정 사이의 이송과 로딩·언로딩을 갠트리로 연결해 다단계 생산 흐름을 자동화합니다.",
      en: "Gantry transfer connects loading and unloading across multiple production stages.",
      ja: "工程間の搬送とローディング・アンローディングをガントリーでつなぎ、多工程の生産フローを自動化します。",
    },
    video: multiStageGantryVideo,
    poster: multiStageGantryPoster,
  },
  {
    id: "gantry-transfer-line",
    group: "joining-automation",
    title: { ko: "갠트리 이송 라인", en: "Gantry Transfer Line", ja: "ガントリー搬送ライン" },
    copy: {
      ko: "가공과 검사 셀 사이의 부품 이송을 자동화해 연속 생산 흐름을 구성합니다.",
      en: "Automated transfer between machining and inspection cells supports continuous production flow.",
      ja: "加工セルと検査セル間の部品搬送を自動化し、連続した生産フローを構築します。",
    },
    video: gantryTransferVideo,
    poster: gantryTransferPoster,
  },
];

export const inspectionFilmByProcessId: Record<string, { video: string; poster: string }> = {
  "precision-measurement": {
    video: precisionMetrologyVideo,
    poster: precisionMetrologyPoster,
  },
};
