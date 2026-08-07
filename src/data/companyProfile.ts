import factoryImage from "../../assets/company-profile/factory.webp";
import drivelineComponentImage from "../../assets/company-profile/driveline-component.webp";
import evLubricationImage from "../../assets/company-profile/ev-lubrication.webp";
import evSystemImage from "../../assets/company-profile/ev-system.webp";
import powertrainComponentImage from "../../assets/company-profile/powertrain-component.webp";
import autoInspectionImage from "../../assets/company-profile/process/auto-inspection.webp";
import broachingImage from "../../assets/company-profile/process/broaching.webp";
import cmmImage from "../../assets/company-profile/process/cmm.webp";
import cncLatheImage from "../../assets/company-profile/process/cnc-lathe.webp";
import crackInspectionImage from "../../assets/company-profile/process/crack-inspection.webp";
import grindingImage from "../../assets/company-profile/process/grinding.webp";
import hobbingImage from "../../assets/company-profile/process/hobbing.webp";
import inductionHardeningImage from "../../assets/company-profile/process/induction-hardening.webp";
import machiningCenterImage from "../../assets/company-profile/process/machining-center.webp";
import rackRollingImage from "../../assets/company-profile/process/rack-rolling.webp";
import shapingImage from "../../assets/company-profile/process/shaping.webp";
import shotPeeningImage from "../../assets/company-profile/process/shot-peening.webp";
import straighteningImage from "../../assets/company-profile/process/straightening.webp";
import autoInspectionVideo from "../../assets/company-profile/video/auto-inspection.mp4";
import crackInspectionVideo from "../../assets/company-profile/video/crack-inspection.mp4";
import shotPeeningVideo from "../../assets/company-profile/video/shot-peening.mp4";
import straighteningVideo from "../../assets/company-profile/video/straightening.mp4";

export type CompanyProfileLanguage = "ko" | "en" | "ja";
export type ManufacturingGroup = "cutting" | "gear" | "surface" | "inspection";

type LocalizedText = Record<CompanyProfileLanguage, string>;

export type ManufacturingProcess = {
  id: string;
  group: ManufacturingGroup;
  title: string;
  makers: string;
  copy: LocalizedText;
  capability: LocalizedText;
  image: string;
  video?: string;
};

export type EquipmentInventoryGroup = {
  id: string;
  title: LocalizedText;
  copy: LocalizedText;
  items: Array<{ name: string; count: number }>;
};

export const companyProfileAssets = {
  factoryImage,
  autoInspectionImage,
  hobbingImage,
};

export const companyOverviewCopy = {
  ko: {
    eyebrow: "INTEGRATED PRECISION MACHINING SUPPLIER",
    title: "동력을 전달하는 핵심 부품을 정밀가공합니다.",
    copy: "서울산업은 1985년부터 엔진과 모터의 토크를 전달하는 샤프트, 기어, 스플라인, 하우징 부품을 개발 검토부터 양산 검사까지 일관된 공정으로 생산해 왔습니다.",
    facts: [
      { label: "설립", value: "1985" },
      { label: "본사·생산시설", value: "경기도 화성" },
      { label: "업력", value: "40년+" },
      { label: "사업 분야", value: "자동차 부품 정밀가공" },
    ],
    systems: ["STEERING", "E-MOBILITY", "POWERTRAIN", "DRIVELINE", "TRANSMISSION"],
    networkTitle: "글로벌 자동차 부품 프로그램과 연결된 제조 기반",
    networkCopy: "국내 생산 거점을 중심으로 북미, 유럽, 중국, 일본의 자동차 부품 고객 프로그램에 대응합니다.",
  },
  en: {
    eyebrow: "INTEGRATED PRECISION MACHINING SUPPLIER",
    title: "Precision-machining the parts that carry power.",
    copy: "Since 1985, Seoul Industry has produced shafts, gears, splines, and housings that transfer torque from engines and motors, connecting feasibility review, mass production, and inspection in one manufacturing flow.",
    facts: [
      { label: "Founded", value: "1985" },
      { label: "Head Office & Plant", value: "Hwaseong, Korea" },
      { label: "Manufacturing Experience", value: "40+ Years" },
      { label: "Business", value: "Automotive Precision Machining" },
    ],
    systems: ["STEERING", "E-MOBILITY", "POWERTRAIN", "DRIVELINE", "TRANSMISSION"],
    networkTitle: "A manufacturing base connected to global automotive programs",
    networkCopy: "From its Korean production base, Seoul Industry supports automotive component programs across North America, Europe, China, and Japan.",
  },
  ja: {
    eyebrow: "INTEGRATED PRECISION MACHINING SUPPLIER",
    title: "動力を伝える主要部品を精密加工します。",
    copy: "ソウル産業は1985年から、エンジンとモーターのトルクを伝えるシャフト、ギヤ、スプライン、ハウジングを、製造検討から量産検査まで一貫した工程で生産しています。",
    facts: [
      { label: "設立", value: "1985" },
      { label: "本社・生産拠点", value: "韓国 京畿道華城市" },
      { label: "製造実績", value: "40年以上" },
      { label: "事業分野", value: "自動車部品の精密加工" },
    ],
    systems: ["STEERING", "E-MOBILITY", "POWERTRAIN", "DRIVELINE", "TRANSMISSION"],
    networkTitle: "グローバル自動車部品プログラムにつながる製造基盤",
    networkCopy: "韓国の生産拠点を中心に、北米、欧州、中国、日本の自動車部品プログラムに対応します。",
  },
} satisfies Record<CompanyProfileLanguage, object>;

export const globalRegions = [
  { region: "KOREA", customers: ["ZF / TRW", "AAM", "HYUNDAI MOBIS"] },
  { region: "NORTH AMERICA", customers: ["GKN DRIVELINE", "AAM", "SPARTAN", "MAGNA POWERTRAIN"] },
  { region: "EUROPE", customers: ["GKN DRIVELINE"] },
  { region: "CHINA", customers: ["GKN DRIVELINE", "NEXTEER"] },
  { region: "JAPAN", customers: ["GKN DRIVELINE", "ZF / TRW"] },
];

export const manufacturingGroupLabels: Record<
  CompanyProfileLanguage,
  Record<ManufacturingGroup | "all", string>
> = {
  ko: {
    all: "전체 공정",
    cutting: "절삭가공",
    gear: "기어·스플라인",
    surface: "열처리·표면",
    inspection: "자동화·검사",
  },
  en: {
    all: "All Processes",
    cutting: "Machining",
    gear: "Gear & Spline",
    surface: "Heat & Surface",
    inspection: "Automation & Inspection",
  },
  ja: {
    all: "全工程",
    cutting: "切削加工",
    gear: "ギヤ・スプライン",
    surface: "熱処理・表面",
    inspection: "自動化・検査",
  },
};

export const manufacturingPageCopy = {
  ko: {
    eyebrow: "MANUFACTURING CAPABILITY",
    title: "가공부터 검사까지 연결된 생산기술",
    copy: "선삭, 기어·스플라인, 연삭, 열처리, 자동 교정과 전용 검사를 한 흐름으로 연결해 반복 양산의 정밀도를 관리합니다.",
    equipmentTitle: "안정적인 양산을 뒷받침하는 보유설비",
    equipmentCopy: "절삭, 기어·스플라인, 연삭·열처리, 자동화·검사 설비를 공정별로 운영해 다양한 부품 형상과 양산 조건에 대응합니다.",
    inspectionTitle: "측정 결과가 다시 공정으로 돌아가는 검사 기술",
    inspectionCopy: "치수와 기하공차, 기어 형상, 런아웃, 균열 여부를 전용 검사와 정밀 측정 장비로 확인합니다.",
  },
  en: {
    eyebrow: "MANUFACTURING CAPABILITY",
    title: "Production technology connected from machining to inspection",
    copy: "Turning, gear and spline machining, grinding, heat treatment, automatic straightening, and dedicated inspection operate as one controlled production flow.",
    equipmentTitle: "Equipment supporting repeat production",
    equipmentCopy: "Machining, gear and spline, finishing, heat-treatment, automation, and inspection equipment are organized by process to support varied part geometries and production requirements.",
    inspectionTitle: "Inspection technology that feeds results back into production",
    inspectionCopy: "Dimensions, GD&T, gear geometry, runout, and crack conditions are verified through dedicated inspection and precision measuring equipment.",
  },
  ja: {
    eyebrow: "MANUFACTURING CAPABILITY",
    title: "加工から検査までつながる生産技術",
    copy: "旋削、ギヤ・スプライン加工、研削、熱処理、自動矯正、専用検査を一つの流れにつなぎ、量産精度を管理します。",
    equipmentTitle: "量産を支える保有設備",
    equipmentCopy: "切削、ギヤ・スプライン、研削・熱処理、自動化・検査設備を工程別に運用し、多様な部品形状と量産条件に対応します。",
    inspectionTitle: "測定結果を工程へ戻す検査技術",
    inspectionCopy: "寸法、幾何公差、ギヤ形状、振れ、亀裂を専用検査と精密測定設備で確認します。",
  },
} satisfies Record<CompanyProfileLanguage, object>;

export const manufacturingFlowIds = [
  "cnc-lathe",
  "machining-center",
  "hobbing",
  "grinding",
  "induction",
  "auto-inspection",
] as const;

export const inspectionProcessIds = [
  "straightening",
  "auto-inspection",
  "crack-inspection",
  "precision-measurement",
] as const;

export const equipmentInventory: EquipmentInventoryGroup[] = [
  {
    id: "machining",
    title: { ko: "절삭가공", en: "Machining", ja: "切削加工" },
    copy: {
      ko: "외경·단차·기준면과 하우징의 홀·장착면을 가공하는 기반 설비",
      en: "Core equipment for diameters, datum faces, holes, and mounting surfaces",
      ja: "外径、基準面、穴、取付面を加工する基盤設備",
    },
    items: [
      { name: "CNC LATHE", count: 41 },
      { name: "CNC MCT", count: 79 },
    ],
  },
  {
    id: "gear-spline",
    title: { ko: "기어·스플라인", en: "Gear & Spline", ja: "ギヤ・スプライン" },
    copy: {
      ko: "기어 치형과 내·외측 스플라인을 부품 형상에 맞춰 가공하는 전용 설비",
      en: "Dedicated equipment for gear profiles and internal or external splines",
      ja: "歯形と内外スプラインを部品形状に合わせて加工する専用設備",
    },
    items: [
      { name: "CNC HOBBING", count: 17 },
      { name: "SHAPING", count: 2 },
      { name: "BROACHING", count: 2 },
      { name: "RACK ROLLING", count: 6 },
      { name: "TR ROLLING", count: 2 },
    ],
  },
  {
    id: "finishing",
    title: { ko: "연삭·열처리·표면", en: "Finishing & Heat Treatment", ja: "研削・熱処理・表面" },
    copy: {
      ko: "회전부 정밀도와 내마모성, 피로강도를 완성하는 후공정 설비",
      en: "Finishing equipment for rotating accuracy, wear resistance, and fatigue strength",
      ja: "回転精度、耐摩耗性、疲労強度を仕上げる後工程設備",
    },
    items: [
      { name: "CNC GRINDING", count: 26 },
      { name: "SUPER FINISHING", count: 5 },
      { name: "HARDENING", count: 3 },
      { name: "TEMPERING", count: 2 },
      { name: "SHOT PEENING", count: 2 },
    ],
  },
  {
    id: "automation-inspection",
    title: { ko: "자동화·검사", en: "Automation & Inspection", ja: "自動化・検査" },
    copy: {
      ko: "조립, 런아웃 교정, 전용 치수검사와 비파괴 균열검사를 연결하는 설비",
      en: "Equipment connecting assembly, runout correction, dimensional inspection, and crack detection",
      ja: "組立、振れ矯正、専用寸法検査、非破壊亀裂検査をつなぐ設備",
    },
    items: [
      { name: "LASER WELDING", count: 1 },
      { name: "STRAIGHTENER", count: 3 },
      { name: "AUTO INSPECTION", count: 12 },
      { name: "CRACK INSPECTION", count: 2 },
    ],
  },
];

export const manufacturingProcesses: ManufacturingProcess[] = [
  {
    id: "cnc-lathe",
    group: "cutting",
    title: "CNC LATHE",
    makers: "HYUNDAI WIA · 6 / 8 INCH",
    copy: {
      ko: "소재의 외경, 단차, 홈과 기준면을 선삭해 후속 기어·연삭 공정의 가공 기준을 만듭니다.",
      en: "Turns outside diameters, steps, grooves, and datum faces before gear machining and grinding.",
      ja: "外径、段差、溝、基準面を旋削し、後工程のギヤ加工と研削の基準を作ります。",
    },
    capability: {
      ko: "황삭부터 정삭까지 부품 형상에 맞춘 선삭 조건 운영",
      en: "Turning conditions configured from roughing through finishing",
      ja: "粗加工から仕上げまで部品形状に合わせた旋削条件",
    },
    image: cncLatheImage,
  },
  {
    id: "machining-center",
    group: "cutting",
    title: "CNC MACHINING CENTER",
    makers: "KOMATEC · BROTHER · HYUNDAI WIA",
    copy: {
      ko: "하우징과 복합 형상 부품의 홀, 장착면, 유로와 기준면을 전용 치공구로 가공합니다.",
      en: "Machines holes, mounting faces, passages, and datum features on housings and complex parts.",
      ja: "ハウジングと複合形状部品の穴、取付面、流路、基準面を専用治具で加工します。",
    },
    capability: {
      ko: "수직형 MCT와 전용 치공구를 활용한 복합가공",
      en: "Complex vertical machining with dedicated fixtures",
      ja: "立形MCTと専用治具による複合加工",
    },
    image: machiningCenterImage,
  },
  {
    id: "rack-rolling",
    group: "gear",
    title: "RACK ROLLING",
    makers: "NACHI · DONG-IL · COMET",
    copy: {
      ko: "래크 롤 다이로 샤프트 표면에 치형을 성형해 반복 생산성과 섬유 흐름을 확보합니다.",
      en: "Forms rack teeth on shaft surfaces with rolling dies for repeatable production.",
      ja: "ラックロールダイスでシャフト表面に歯形を成形し、安定した量産性を確保します。",
    },
    capability: {
      ko: "샤프트 계열 래크·스플라인 성형",
      en: "Rack and spline forming for shaft components",
      ja: "シャフト部品のラック・スプライン成形",
    },
    image: rackRollingImage,
  },
  {
    id: "broaching",
    group: "gear",
    title: "BROACHING",
    makers: "HANKOOK BROACH · NACHI-KUKJE",
    copy: {
      ko: "내경 기어와 스플라인을 브로치 공구로 연속 절삭해 형상과 위치 정밀도를 관리합니다.",
      en: "Continuously cuts internal gears and splines while controlling profile and position.",
      ja: "内径ギヤとスプラインを連続切削し、形状と位置精度を管理します。",
    },
    capability: {
      ko: "내측 기어·스플라인 전용 가공",
      en: "Dedicated internal gear and spline machining",
      ja: "内歯ギヤ・スプライン専用加工",
    },
    image: broachingImage,
  },
  {
    id: "hobbing",
    group: "gear",
    title: "CNC HOBBING",
    makers: "SEIWA · KASHIFUJI · KOEPFER · PFAUTER · MITSUBISHI",
    copy: {
      ko: "헬리컬과 스퍼 기어의 치형을 가공하고 공정 조건을 표준화해 장기 양산의 반복 정밀도를 유지합니다.",
      en: "Machines helical and spur gear profiles under standardized conditions for repeat production.",
      ja: "ヘリカル・スパーギヤの歯形を加工し、標準条件で量産精度を維持します。",
    },
    capability: {
      ko: "헬리컬·스퍼 기어 및 Hard Hobbing 대응",
      en: "Helical, spur, and hard-hobbing capability",
      ja: "ヘリカル・スパーギヤおよびハードホビング",
    },
    image: hobbingImage,
  },
  {
    id: "shaping",
    group: "gear",
    title: "GEAR SHAPING",
    makers: "MITSUBISHI",
    copy: {
      ko: "공구 간섭이 있는 형상과 내·외측 기어를 셰이핑 방식으로 가공합니다.",
      en: "Shapes internal and external gears where tool access or geometry limits other processes.",
      ja: "工具干渉のある形状や内・外歯ギヤをシェイピング方式で加工します。",
    },
    capability: {
      ko: "내측·외측 기어 및 스플라인 형상 가공",
      en: "Internal and external gear and spline profiles",
      ja: "内・外歯ギヤおよびスプライン加工",
    },
    image: shapingImage,
  },
  {
    id: "grinding",
    group: "surface",
    title: "PRECISION GRINDING",
    makers: "TAIYO KOKI · OKAMOTO · WOO-SUNG · DUCK-HEUNG",
    copy: {
      ko: "원통, 앵귤러, 센터리스 연삭으로 회전부의 치수, 진원도와 표면 품질을 완성합니다.",
      en: "Finishes rotating parts through cylindrical, angular, and centerless grinding.",
      ja: "円筒、アンギュラ、センタレス研削で寸法、真円度、表面品質を仕上げます。",
    },
    capability: {
      ko: "원통·앵귤러·센터리스 연삭",
      en: "Cylindrical, angular, and centerless grinding",
      ja: "円筒・アンギュラ・センタレス研削",
    },
    image: grindingImage,
  },
  {
    id: "induction",
    group: "surface",
    title: "INDUCTION HARDENING",
    makers: "INDUCTION · LOW TEMPERING",
    copy: {
      ko: "부품의 필요한 구간만 선택적으로 경화하고 저온 템퍼링을 연결해 내마모성과 인성을 관리합니다.",
      en: "Selectively hardens critical areas and links low tempering to balance wear resistance and toughness.",
      ja: "必要部位を選択的に高周波焼入れし、低温焼戻しで耐摩耗性と靭性を管理します。",
    },
    capability: {
      ko: "고주파 경화와 저온 템퍼링 연계",
      en: "Integrated induction hardening and low tempering",
      ja: "高周波焼入れと低温焼戻し",
    },
    image: inductionHardeningImage,
  },
  {
    id: "straightening",
    group: "inspection",
    title: "AUTOMATIC STRAIGHTENING",
    makers: "SERVO PRESS · RUNOUT CONTROL",
    copy: {
      ko: "서보 프레스와 자동 측정을 반복해 샤프트 런아웃을 교정하고 판정 이력을 남깁니다.",
      en: "Repeats servo-press correction and measurement to control shaft runout and retain results.",
      ja: "サーボプレスと自動測定を繰り返し、シャフトの振れを矯正して履歴を残します。",
    },
    capability: {
      ko: "측정·교정·재측정 자동 루프",
      en: "Automatic measure-correct-remeasure loop",
      ja: "測定・矯正・再測定の自動ループ",
    },
    image: straighteningImage,
    video: straighteningVideo,
  },
  {
    id: "shot-peening",
    group: "surface",
    title: "SHOT PEENING",
    makers: "SURFACE PEENING · DEBURRING",
    copy: {
      ko: "표면에 쇼트 입자를 투사해 버를 제거하고 피로강도와 표면 상태를 개선합니다.",
      en: "Projects shot media onto the surface to deburr parts and improve fatigue and surface condition.",
      ja: "ショット材を投射してバリを除去し、疲労強度と表面状態を改善します。",
    },
    capability: {
      ko: "표면 피닝과 디버링",
      en: "Surface peening and deburring",
      ja: "表面ピーニングとバリ取り",
    },
    image: shotPeeningImage,
    video: shotPeeningVideo,
  },
  {
    id: "auto-inspection",
    group: "inspection",
    title: "DEDICATED AUTO INSPECTION",
    makers: "DIMENSION · GD&T · TRACEABILITY",
    copy: {
      ko: "부품별 전용 검사기로 주요 치수와 기하공차를 자동 측정하고 생산 이력과 연결합니다.",
      en: "Automatically checks critical dimensions and GD&T with dedicated machines linked to production history.",
      ja: "部品別の専用検査機で主要寸法と幾何公差を自動測定し、生産履歴につなげます。",
    },
    capability: {
      ko: "치수·기하공차 자동 측정",
      en: "Automatic dimensional and GD&T measurement",
      ja: "寸法・幾何公差の自動測定",
    },
    image: autoInspectionImage,
    video: autoInspectionVideo,
  },
  {
    id: "crack-inspection",
    group: "inspection",
    title: "CRACK INSPECTION",
    makers: "ACOUSTIC RESONANCE · NON-DESTRUCTIVE",
    copy: {
      ko: "부품을 타격했을 때 발생하는 고유 주파수를 비교해 균열 가능성을 비파괴 방식으로 판정합니다.",
      en: "Compares resonant frequency after impact to identify potential cracks without damaging the part.",
      ja: "打撃時の固有周波数を比較し、部品を傷つけずに亀裂の可能性を判定します。",
    },
    capability: {
      ko: "음향 공진 기반 비파괴 균열검사",
      en: "Acoustic-resonance nondestructive crack detection",
      ja: "音響共振による非破壊亀裂検査",
    },
    image: crackInspectionImage,
    video: crackInspectionVideo,
  },
  {
    id: "precision-measurement",
    group: "inspection",
    title: "PRECISION MEASUREMENT",
    makers: "ZEISS CMM · TTI GEAR MEASUREMENT",
    copy: {
      ko: "3차원 측정과 기어 전용 측정으로 형상, 위치, 치형 데이터를 정밀하게 검증합니다.",
      en: "Verifies geometry, position, and gear-profile data with CMM and dedicated gear measurement.",
      ja: "三次元測定とギヤ専用測定により、形状、位置、歯形データを精密に検証します。",
    },
    capability: {
      ko: "CMM과 기어 전용 정밀 측정",
      en: "CMM and dedicated gear metrology",
      ja: "CMMとギヤ専用精密測定",
    },
    image: cmmImage,
  },
];

type ProductEvidence = {
  eyebrow: string;
  title: LocalizedText;
  copy: LocalizedText;
  items: Record<CompanyProfileLanguage, string[]>;
  image: string;
};

export const productEvidenceByRoute: Record<string, ProductEvidence> = {
  "products/electric-vehicle": {
    eyebrow: "E-MOBILITY APPLICATION",
    title: {
      ko: "전동화 구동계의 윤활과 동력전달 부품",
      en: "Lubrication and power-delivery parts for electrified drivetrains",
      ja: "電動化駆動系の潤滑・動力伝達部品",
    },
    copy: {
      ko: "EV 감속기 윤활 시스템과 Plug-in Hybrid Gearbox에 적용되는 Link Shaft, Stud Shaft, E-drive Shaft를 생산합니다.",
      en: "Production covers link shafts, stud shafts, and e-drive shafts used in EV reducer lubrication systems and plug-in hybrid gearboxes.",
      ja: "EV減速機潤滑システムとプラグインハイブリッドギヤボックス向けのLink Shaft、Stud Shaft、E-drive Shaftを生産します。",
    },
    items: {
      ko: ["EV 감속기 윤활 시스템", "Plug-in Hybrid Gearbox", "Link / Stud / E-drive Shaft", "Torque Vectoring System"],
      en: ["EV reducer lubrication system", "Plug-in hybrid gearbox", "Link / Stud / E-drive shaft", "Torque vectoring system"],
      ja: ["EV減速機潤滑システム", "プラグインハイブリッドギヤボックス", "Link / Stud / E-drive Shaft", "トルクベクタリングシステム"],
    },
    image: evSystemImage,
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN APPLICATION",
    title: {
      ko: "엔진·감속기용 샤프트와 클러치 허브",
      en: "Shafts and clutch hubs for engines and reduction systems",
      ja: "エンジン・減速機向けシャフトとクラッチハブ",
    },
    copy: {
      ko: "Powertrain Shaft, Sun Gear Output Shaft와 Engine·Decelerator용 Clutch Hub, Disc Carrier 계열을 정밀가공합니다.",
      en: "Production covers powertrain shafts, sun-gear output shafts, clutch hubs, and disc-carrier families for engine and reduction systems.",
      ja: "Powertrain Shaft、Sun Gear Output Shaft、Clutch Hub、Disc Carrier系列を精密加工します。",
    },
    items: {
      ko: ["Powertrain Shaft", "Sun Gear Output Shaft", "Clutch Hub", "Disc Carrier Assembly"],
      en: ["Powertrain shaft", "Sun gear output shaft", "Clutch hub", "Disc carrier assembly"],
      ja: ["Powertrain Shaft", "Sun Gear Output Shaft", "Clutch Hub", "Disc Carrier Assembly"],
    },
    image: powertrainComponentImage,
  },
  "products/driveline": {
    eyebrow: "DRIVELINE APPLICATION",
    title: {
      ko: "변속기와 Transfer Case의 동력전달 샤프트",
      en: "Power-delivery shafts for transmissions and transfer cases",
      ja: "トランスミッションとTransfer Caseの動力伝達シャフト",
    },
    copy: {
      ko: "8L90 Input Shaft, Transfer Case Actuator Shaft와 10R TRS Stator Shaft 계열을 생산합니다.",
      en: "Production includes 8L90 input shafts, transfer-case actuator shafts, and 10R TRS stator shafts.",
      ja: "8L90 Input Shaft、Transfer Case Actuator Shaft、10R TRS Stator Shaftを生産します。",
    },
    items: {
      ko: ["8L90 Input Shaft", "Transfer Case Actuator Shaft", "10R TRS Stator Shaft", "Spline / Cross Hole"],
      en: ["8L90 input shaft", "Transfer-case actuator shaft", "10R TRS stator shaft", "Spline / cross hole"],
      ja: ["8L90 Input Shaft", "Transfer Case Actuator Shaft", "10R TRS Stator Shaft", "Spline / Cross Hole"],
    },
    image: drivelineComponentImage,
  },
  "products/steering": {
    eyebrow: "STEERING APPLICATION",
    title: {
      ko: "조향 입력을 정확히 전달하는 기어·샤프트",
      en: "Gears and shafts that transmit steering input precisely",
      ja: "操舵入力を正確に伝えるギヤ・シャフト",
    },
    copy: {
      ko: "Helical Pinion, P/Shaft, Torsion Bar와 Steering Assembly Component를 기어·스플라인, 열처리, 교정 공정으로 생산합니다.",
      en: "Helical pinions, P/shafts, torsion bars, and steering assembly parts are produced through gear, spline, heat-treatment, and straightening processes.",
      ja: "Helical Pinion、P/Shaft、Torsion Bar、Steering Assembly Componentをギヤ、スプライン、熱処理、矯正工程で生産します。",
    },
    items: {
      ko: ["Helical Pinion", "P/Shaft", "Torsion Bar", "Steering Assembly Component"],
      en: ["Helical pinion", "P/shaft", "Torsion bar", "Steering assembly component"],
      ja: ["Helical Pinion", "P/Shaft", "Torsion Bar", "Steering Assembly Component"],
    },
    image: hobbingImage,
  },
  "products/etc": {
    eyebrow: "DRAWING BASED MANUFACTURING",
    title: {
      ko: "도면과 사용 조건에 맞춘 특수 정밀가공",
      en: "Custom precision machining for drawing and application requirements",
      ja: "図面と使用条件に合わせた特殊精密加工",
    },
    copy: {
      ko: "내·외측 기어와 스플라인, 샤프트, 하우징을 고객 도면과 양산 조건에 맞춰 공정 설계합니다.",
      en: "Internal and external gears, splines, shafts, and housings are process-engineered around customer drawings and production conditions.",
      ja: "内・外歯ギヤ、スプライン、シャフト、ハウジングを顧客図面と量産条件に合わせて工程設計します。",
    },
    items: {
      ko: ["내측·외측 Gear", "Spline / Serration", "Precision Shaft", "Machined Housing"],
      en: ["Internal / external gear", "Spline / serration", "Precision shaft", "Machined housing"],
      ja: ["内・外歯Gear", "Spline / Serration", "Precision Shaft", "Machined Housing"],
    },
    image: hobbingImage,
  },
};

export const qualityEvidenceCopy = {
  ko: {
    title: "공정과 출하를 연결하는 품질검사",
    copy: "측정 결과를 교정, 공정 조건, 추적 관리와 출하 판정에 연결해 품질 변동을 관리합니다.",
  },
  en: {
    title: "Inspection connected to process and release decisions",
    copy: "Measurement results inform straightening, process settings, traceability, and shipment release to control variation throughout production.",
  },
  ja: {
    title: "工程と出荷判定をつなぐ品質検査",
    copy: "測定結果を矯正、工程条件、トレーサビリティ、出荷判定へつなぎ、量産工程のばらつきを管理します。",
  },
};

export const qualityEvidenceProcesses = manufacturingProcesses.filter((process) =>
  ["straightening", "auto-inspection", "crack-inspection", "precision-measurement"].includes(process.id),
);
