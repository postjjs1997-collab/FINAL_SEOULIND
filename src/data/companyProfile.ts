import factoryImage from "../../assets/company-profile/factory.webp";
import machinedAluminumImage from "../../assets/product-catalog/lineup/balance-shaft-module.webp";
import drivelineComponentImage from "../../assets/video-posters/driveline/disc-carrier-hub.jpg";
import electrifiedPowertrainImage from "../../assets/product-catalog/lineup/electric-vehicle.webp";
import defenseSpecialProjectsImage from "../../assets/product-catalog/etc/defense-special-projects.png";
import powertrainComponentImage from "../../assets/product-catalog/lineup/powertrain.webp";
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
import cncLatheVideo from "../../assets/company-profile/video/cnc-lathe.mp4";
import crackInspectionVideo from "../../assets/company-profile/video/crack-inspection.mp4";
import grindingVideo from "../../assets/company-profile/video/grinding.mp4";
import hobbingVideo from "../../assets/company-profile/video/hobbing.mp4";
import inductionHardeningVideo from "../../assets/company-profile/video/induction-hardening.mp4";
import machiningCenterVideo from "../../assets/company-profile/video/machining-center.mp4";
import productionAutoInspectionVideo from "../../assets/company-profile/video/production-auto-inspection.mp4";
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
  items: string[];
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
    copy: "서울산업은 1985년부터 엔진과 모터의 토크를 전달하는 기어&샤프트 스플라인, 하우징 부품을 개발 검토부터 양산 검사까지 일관 공정으로 생산해 왔습니다.",
    facts: [
      { label: "설립", value: "1985" },
      { label: "월 생산량", value: "300,000+ PARTS" },
      { label: "핵심 역량", value: "PRECISION MACHINING" },
      { label: "인증", value: "IATF 16949 · ISO 14001 · MSQ" },
      { label: "공급 범위", value: "DEVELOPMENT TO LAUNCHING" },
    ],
    systems: ["STEERING", "POWERTRAIN", "DRIVELINE", "ELECTRIFIED POWERTRAIN", "MACHINED ALUMINUM"],
    networkTitle: "한국의 제조 거점에서 글로벌 고객 프로그램을 지원합니다.",
    networkCopy: "화성 제조 거점을 중심으로 북미·아시아·유럽 프로그램의 도면 검토, 공정 설계, 생산 검증, 양산 안정화와 품질 기록을 하나의 흐름으로 관리합니다.",
  },
  en: {
    eyebrow: "INTEGRATED PRECISION MACHINING SUPPLIER",
    title: "Precision-machining the parts that carry power.",
    copy: "Since 1985, Seoul Industry has produced gear & shaft splines and housings that transfer torque from engines and motors, connecting feasibility review, mass production, and inspection in one manufacturing flow.",
    facts: [
      { label: "Founded", value: "1985" },
      { label: "Monthly Output", value: "300,000+ PARTS" },
      { label: "Core Capability", value: "PRECISION MACHINING" },
      { label: "Certifications", value: "IATF 16949 · ISO 14001 · MSQ" },
      { label: "Program Coverage", value: "DEVELOPMENT TO LAUNCHING" },
    ],
    systems: ["STEERING", "POWERTRAIN", "DRIVELINE", "ELECTRIFIED POWERTRAIN", "MACHINED ALUMINUM"],
    networkTitle: "One manufacturing base in Korea, supporting global customer programs.",
    networkCopy: "From Hwaseong, Korea, Seoul Industry supports programs across North America, Asia, and Europe through one connected flow—from drawing review and process engineering to production validation, launch stabilization, and quality records.",
  },
  ja: {
    eyebrow: "INTEGRATED PRECISION MACHINING SUPPLIER",
    title: "動力を伝える主要部品を精密加工します。",
    copy: "ソウル産業は1985年から、エンジンとモーターのトルクを伝えるギヤ＆シャフト・スプライン、ハウジングを、製造可能性の検討から量産検査まで一貫した工程で生産しています。",
    facts: [
      { label: "設立", value: "1985" },
      { label: "月間生産数", value: "300,000+ PARTS" },
      { label: "中核技術", value: "PRECISION MACHINING" },
      { label: "認証", value: "IATF 16949 · ISO 14001 · MSQ" },
      { label: "対応範囲", value: "DEVELOPMENT TO LAUNCHING" },
    ],
    systems: ["STEERING", "POWERTRAIN", "DRIVELINE", "ELECTRIFIED POWERTRAIN", "MACHINED ALUMINUM"],
    networkTitle: "韓国の生産拠点から、グローバルな顧客プログラムを支えます。",
    networkCopy: "華城の生産拠点を中心に、北米・アジア・欧州のプログラムに対し、図面検討、工程設計、生産検証、量産立上げ・安定化、品質記録までを一つの流れで管理します。",
  },
} satisfies Record<CompanyProfileLanguage, object>;

type GlobalProgramRegion = {
  region: string;
  title: string;
  copy: string;
  tags: string[];
};

type GlobalProgramStage = {
  title: string;
  copy: string;
};

type GlobalProgramNetwork = {
  regions: GlobalProgramRegion[];
  frameworkTitle: string;
  stages: GlobalProgramStage[];
};

export const globalProgramNetwork = {
  ko: {
    regions: [
      {
        region: "NORTH AMERICA",
        title: "개발·양산 준비",
        copy: "고객 도면과 CTQ를 공정 순서, 치공구, 검사 로직으로 구체화하고, 생산 검증부터 초기 양산 안정화까지 책임집니다.",
        tags: ["FEASIBILITY", "VALIDATION", "SOP"],
      },
      {
        region: "ASIA",
        title: "통합 제조 운영",
        copy: "화성 제조 거점에서 정밀가공, 기어·스플라인 가공, 연삭, 열처리 연계 공정, 자동화, 최종 검사를 하나의 생산 계획으로 운영합니다.",
        tags: ["MACHINING", "PROCESS CONTROL", "INSPECTION"],
      },
      {
        region: "EUROPE",
        title: "품질 문서·변경 관리",
        copy: "GD&T·CMM 측정, 기어 형상 검사, 자동검사와 추적성 데이터를 기반으로 승인 단계별 품질 자료와 프로그램 변경 사항을 관리합니다.",
        tags: ["GD&T / CMM", "TRACEABILITY", "CHANGE CONTROL"],
      },
    ],
    frameworkTitle: "도면 검토부터 양산 공급까지, 처음부터 끝까지 서울산업이 책임집니다.",
    stages: [
      {
        title: "도면·CTQ 검토",
        copy: "제품 형상, 공차, 소재, 가공 난이도와 생산 조건을 검토해 주요 품질 특성과 공정 리스크를 정의합니다.",
      },
      {
        title: "공정·공급망 설계",
        copy: "공정 순서, 기준면, 치공구와 가공 조건을 설계하고 단조·열처리 연계 공정을 같은 생산 계획에 반영합니다.",
      },
      {
        title: "생산 검증",
        copy: "공정 능력과 검사 로직을 검증하고, 공정 내 검사와 최종 검사 데이터를 선행 공정 피드백과 보정에 활용합니다.",
      },
      {
        title: "SOP·양산 안정화",
        copy: "검사 기준, 자동화 조건과 추적성 체계를 확정하고 초기 양산 데이터를 기반으로 산포를 줄여 공정을 안정화합니다.",
      },
      {
        title: "양산 공급·개선",
        copy: "품질 기록과 LOT 이력을 유지하며 공급 일정, 포장·출하 기준, 외주 공정과 변경 사항을 함께 관리합니다.",
      },
    ],
  },
  en: {
    regions: [
      {
        region: "NORTH AMERICA",
        title: "Launch & Volume Readiness",
        copy: "Customer drawings and CTQs are translated into process sequences, fixture concepts, and inspection logic, connecting production validation with early-volume stabilization.",
        tags: ["FEASIBILITY", "VALIDATION", "SOP"],
      },
      {
        region: "ASIA",
        title: "Integrated Manufacturing Hub",
        copy: "At Hwaseong, precision machining, gear and spline operations, grinding, coordinated heat treatment, automation, and final inspection are managed under one production plan.",
        tags: ["MACHINING", "PROCESS CONTROL", "INSPECTION"],
      },
      {
        region: "EUROPE",
        title: "Quality Documentation & Change Control",
        copy: "GD&T and CMM measurement, gear-profile inspection, automated inspection, and traceability data underpin approval-stage quality documentation and program change control.",
        tags: ["GD&T / CMM", "TRACEABILITY", "CHANGE CONTROL"],
      },
    ],
    frameworkTitle: "A single line of responsibility from drawing review to volume supply.",
    stages: [
      {
        title: "Drawing & CTQ Review",
        copy: "We review geometry, tolerances, material, machining complexity, and production conditions to define critical characteristics and process risks.",
      },
      {
        title: "Process & Supply-Chain Design",
        copy: "We define process sequence, datums, fixtures, clamping, and machining conditions, coordinating forging and heat-treatment processes within the same production plan.",
      },
      {
        title: "Production Validation",
        copy: "We validate process capability and inspection logic, connecting in-cell and final-inspection data to upstream feedback and compensation.",
      },
      {
        title: "SOP & Ramp-Up",
        copy: "We establish inspection criteria, automation conditions, and traceability, then use early-production data to reduce process variation.",
      },
      {
        title: "Volume Supply & Improvement",
        copy: "We maintain quality records and lot history while coordinating supply schedules, packaging and shipping standards, outsourced processes, and engineering changes.",
      },
    ],
  },
  ja: {
    regions: [
      {
        region: "NORTH AMERICA",
        title: "立上げ・量産準備",
        copy: "顧客図面とCTQを工程順序、治具、検査ロジックへ落とし込み、生産検証から初期量産の工程安定化までつなげます。",
        tags: ["FEASIBILITY", "VALIDATION", "SOP"],
      },
      {
        region: "ASIA",
        title: "統合生産ハブ",
        copy: "華城の生産拠点で、精密加工、ギヤ・スプライン加工、研削、熱処理との連携、自動化、最終検査を一つの生産計画で運用します。",
        tags: ["MACHINING", "PROCESS CONTROL", "INSPECTION"],
      },
      {
        region: "EUROPE",
        title: "品質文書・変更管理",
        copy: "GD&T・CMM測定、ギヤ形状検査、自動検査、トレーサビリティデータを基に、承認段階ごとの品質資料とプログラム変更を管理します。",
        tags: ["GD&T / CMM", "TRACEABILITY", "CHANGE CONTROL"],
      },
    ],
    frameworkTitle: "図面検討から量産供給まで、最初から最後までソウル産業が責任を持ちます。",
    stages: [
      {
        title: "図面・CTQ検討",
        copy: "製品形状、公差、材料、加工難易度、生産条件を検討し、重要品質特性と工程リスクを定義します。",
      },
      {
        title: "工程・サプライチェーン設計",
        copy: "工程順序、基準面、治具、クランプ、加工条件を設計し、鍛造・熱処理の連携工程を同じ生産計画へ反映します。",
      },
      {
        title: "生産検証",
        copy: "工程能力と検査ロジックを検証し、工程内・最終検査データを前工程へのフィードバックと補正につなげます。",
      },
      {
        title: "SOP立上げ・安定化",
        copy: "検査基準、自動化条件、トレーサビリティ体制を確定し、初期量産データを基にばらつきを抑えて工程を安定化します。",
      },
      {
        title: "量産供給・改善",
        copy: "品質記録とロット履歴を維持しながら、納入日程、梱包・出荷基準、外部工程、変更事項を一元管理します。",
      },
    ],
  },
} satisfies Record<CompanyProfileLanguage, GlobalProgramNetwork>;

export const localSupplyNetwork = {
  ko: {
    eyebrow: "INTEGRATED LOCAL SUPPLY NETWORK",
    title: "검증된 전문 파트너와 함께 구축한 통합 공급망",
    copy: "서울산업이 공정 책임과 품질 기준을 총괄하고, 공정별 전문 협력사가 소재와 특수 공정을 맡아 개발 변경과 양산 변동에 신속히 대응합니다.",
    processes: [
      { title: "HOT FORGING", copy: "열간 단조" },
      { title: "WARM FORGING", copy: "온간 단조" },
      { title: "COLD FORGING", copy: "냉간 단조" },
      { title: "OUTSOURCED TURNING", copy: "외주 선삭" },
      { title: "CARBURIZING", copy: "침탄 열처리" },
      { title: "OUTSOURCED INDUCTION HARDENING", copy: "외주 고주파 열처리" },
    ],
    benefits: [
      { title: "긴밀한 기술 협업", copy: "공정별 기술 검토와 현장 협의를 통해 품질 기준과 작업 조건을 조율합니다." },
      { title: "신속한 대응", copy: "개발 변경이나 생산 이슈 발생 시 현장 확인에 걸리는 시간을 줄입니다." },
      { title: "유연한 생산 대응", copy: "프로그램 변화에 맞춰 전문 공정과 생산 여력을 연계합니다." },
      { title: "공급 연속성", copy: "소재·외주 공정·사내 가공의 진행 상태를 하나의 계획으로 관리합니다." },
    ],
  },
  en: {
    eyebrow: "INTEGRATED LOCAL SUPPLY NETWORK",
    title: "An integrated supply network built with qualified specialist partners.",
    copy: "Seoul Industry retains process ownership and control of quality standards, while qualified specialist partners supply raw materials and special processes, enabling rapid response to development changes and production fluctuations.",
    processes: [
      { title: "HOT FORGING", copy: "Qualified partner" },
      { title: "WARM FORGING", copy: "Qualified partner" },
      { title: "COLD FORGING", copy: "Qualified partner" },
      { title: "OUTSOURCED TURNING", copy: "Qualified partner" },
      { title: "CARBURIZING", copy: "Qualified partner" },
      { title: "OUTSOURCED INDUCTION HARDENING", copy: "Qualified partner" },
    ],
    benefits: [
      { title: "Close collaboration", copy: "Technical and shop-floor reviews align quality standards and operating conditions for each process." },
      { title: "Rapid response", copy: "On-site reviews shorten response times for development changes and production issues." },
      { title: "Flexible capacity", copy: "Specialist processes and available capacity adapt to program changes." },
      { title: "Supply continuity", copy: "Materials, outsourced processes, and in-house machining are managed under one plan." },
    ],
  },
  ja: {
    eyebrow: "INTEGRATED LOCAL SUPPLY NETWORK",
    title: "認定された専門パートナーと連携する統合サプライチェーン",
    copy: "ソウル産業が工程責任と品質基準を管理し、工程ごとの専門サプライヤーと連携して素材・特殊工程の能力を確保し、開発段階の変更や量産段階の変動に迅速に対応します。",
    processes: [
      { title: "HOT FORGING", copy: "熱間鍛造" },
      { title: "WARM FORGING", copy: "温間鍛造" },
      { title: "COLD FORGING", copy: "冷間鍛造" },
      { title: "OUTSOURCED TURNING", copy: "外注旋削" },
      { title: "CARBURIZING", copy: "浸炭処理" },
      { title: "OUTSOURCED INDUCTION HARDENING", copy: "外注高周波焼入れ" },
    ],
    benefits: [
      { title: "緊密な技術連携", copy: "工程別の技術検討と現場協議を通じて、品質基準と作業条件を調整します。" },
      { title: "迅速な対応", copy: "開発変更や生産課題に対する現場確認を迅速に行います。" },
      { title: "柔軟な生産対応", copy: "プログラムの変化に合わせて専門工程と生産余力を柔軟に組み合わせます。" },
      { title: "供給継続性", copy: "素材・外注工程・社内加工の進捗を一つの計画で管理します。" },
    ],
  },
} satisfies Record<
  CompanyProfileLanguage,
  {
    eyebrow: string;
    title: string;
    copy: string;
    processes: Array<{ title: string; copy: string }>;
    benefits: Array<{ title: string; copy: string }>;
  }
>;

export const operationalReliability = {
  ko: {
    eyebrow: "EQUIPMENT RELIABILITY",
    title: "데이터와 자주보전으로 설비 가동 안정성을 관리합니다.",
    copy: "MES 설비 이력, 테마별 자주보전, 정비·세팅 후 작업자 교육을 연계해 가동 리스크를 줄이고 개선 우선순위를 정합니다.",
    items: [
      {
        code: "01 · MES",
        title: "가동·비가동 이력 관리",
        copy: "설비의 고장·비가동 이력과 주요 원인을 MES 데이터로 확인해 정비 우선순위를 관리합니다.",
        detail: "History · Downtime · Priority",
      },
      {
        code: "02 · TPM",
        title: "테마별 자주보전",
        copy: "청소, 점검, 보전 항목을 테마별로 운영하고 개선 전후 상태를 확인해 설비의 기본 조건을 유지합니다.",
        detail: "Clean · Inspect · Maintain",
      },
      {
        code: "03 · TRAINING",
        title: "정비·세팅 후 교육",
        copy: "설비 정비·세팅 후 작업 방법을 확인하고 담당자 교육을 통해 운전 조건과 주의 사항을 공유합니다.",
        detail: "Maintenance · Setup · Training",
      },
    ],
  },
  en: {
    eyebrow: "EQUIPMENT RELIABILITY",
    title: "Managing equipment reliability through data and autonomous maintenance",
    copy: "MES equipment history, targeted autonomous maintenance, and post-maintenance training work together to reduce operating risks and prioritize improvements.",
    items: [
      {
        code: "01 · MES",
        title: "Uptime and downtime history",
        copy: "MES data tracks failure and downtime history along with their primary causes, guiding maintenance priorities.",
        detail: "History · Downtime · Priority",
      },
      {
        code: "02 · TPM",
        title: "Targeted autonomous maintenance",
        copy: "Cleaning, inspection, and maintenance tasks are organized by theme, with before-and-after checks that maintain basic equipment conditions.",
        detail: "Clean · Inspect · Maintain",
      },
      {
        code: "03 · TRAINING",
        title: "Training after maintenance and setup",
        copy: "After maintenance or setup, work methods are verified and operators are trained on the updated operating conditions and precautions.",
        detail: "Maintenance · Setup · Training",
      },
    ],
  },
  ja: {
    eyebrow: "EQUIPMENT RELIABILITY",
    title: "データと自主保全で設備稼働の安定性を管理します。",
    copy: "MES設備履歴、テーマ別自主保全、設備保全・セットアップ後の作業者教育を連携させ、稼働リスクを低減して改善の優先順位を定めます。",
    items: [
      {
        code: "01 · MES",
        title: "稼働・非稼働履歴管理",
        copy: "設備の故障・非稼働履歴と主な原因をMESデータで確認し、保全の優先順位を管理します。",
        detail: "History · Downtime · Priority",
      },
      {
        code: "02 · TPM",
        title: "テーマ別自主保全",
        copy: "清掃、点検、保全項目をテーマ別に実施し、改善前後の状態を確認して設備の基本条件を維持します。",
        detail: "Clean · Inspect · Maintain",
      },
      {
        code: "03 · TRAINING",
        title: "保全・セットアップ後の教育",
        copy: "設備の保全・セットアップ後に作業方法を確認し、担当者教育を通じて運転条件と注意事項を共有します。",
        detail: "Maintenance · Setup · Training",
      },
    ],
  },
} satisfies Record<
  CompanyProfileLanguage,
  {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{ code: string; title: string; copy: string; detail: string }>;
  }
>;

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
    surface: "Heat Treat & Surface",
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
    title: "가공부터 검사까지 연결된 생산 기술",
    copy: "선삭, 기어·스플라인 가공, 연삭에 CQI-9 기반의 사내 고주파 열처리, CQI-15 기반의 레이저 용접, 자동 교정과 전용 검사를 연결해 장기 양산의 정밀도를 관리합니다.",
    equipmentTitle: "안정적인 양산을 뒷받침하는 보유 설비",
    equipmentCopy: "사내 가공 설비와 주요 단조·열처리 협력사를 동일한 공정 계획과 품질 관리 체계 아래 운영합니다.",
    inspectionTitle: "측정 결과가 다시 공정으로 돌아가는 검사 기술",
    inspectionCopy: "치수와 기하공차, 기어 형상, 런아웃, 균열 여부를 전용 검사와 정밀 측정 장비로 확인합니다.",
  },
  en: {
    eyebrow: "MANUFACTURING CAPABILITY",
    title: "Production technology that connects machining to inspection",
    copy: "Turning, gear and spline machining, and grinding are linked with CQI-9-compliant in-house induction hardening, CQI-15-compliant laser welding, automatic straightening, and dedicated inspection to sustain precision over long production runs.",
    equipmentTitle: "Equipment supporting stable volume production",
    equipmentCopy: "In-house equipment and key forging and heat-treatment partners are managed through the same process plan and quality-control system.",
    inspectionTitle: "Inspection technology that feeds results back into production",
    inspectionCopy: "Dedicated inspection systems and precision measuring equipment verify dimensions, GD&T, gear geometry, and runout, and screen every part for cracks.",
  },
  ja: {
    eyebrow: "MANUFACTURING CAPABILITY",
    title: "加工から検査までつながる生産技術",
    copy: "旋削、ギヤ・スプライン加工、研削に、CQI-9に基づく社内高周波焼入れ、CQI-15に基づくレーザー溶接、自動矯正、専用検査をつなぎ、長期量産の精度を管理します。",
    equipmentTitle: "安定した量産を支える保有設備",
    equipmentCopy: "社内設備と主要な鍛造・熱処理パートナーを、同一の工程計画と品質管理体制で一元管理します。",
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

export const manufacturingFlowVideos = {
  "cnc-lathe": cncLatheVideo,
  "machining-center": machiningCenterVideo,
  hobbing: hobbingVideo,
  grinding: grindingVideo,
  induction: inductionHardeningVideo,
  "auto-inspection": productionAutoInspectionVideo,
} satisfies Record<(typeof manufacturingFlowIds)[number], string>;

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
      en: "Core equipment for outside diameters, steps, datum faces, and housing holes and mounting surfaces",
      ja: "外径、基準面、穴、取付面を加工する基幹設備",
    },
    items: ["CNC LATHE", "CNC MCT"],
  },
  {
    id: "gear-spline",
    title: { ko: "기어·스플라인", en: "Gear & Spline", ja: "ギヤ・スプライン" },
    copy: {
      ko: "기어 치형과 내·외측 스플라인을 부품 형상에 맞춰 가공하는 전용 설비",
      en: "Dedicated equipment for gear profiles and internal or external splines",
      ja: "歯形と内外スプラインを部品形状に合わせて加工する専用設備",
    },
    items: ["CNC HOBBING", "SHAPING", "BROACHING", "RACK ROLLING", "TR ROLLING"],
  },
  {
    id: "finishing",
    title: { ko: "연삭·열처리·표면", en: "Finishing & Heat Treatment", ja: "研削・熱処理・表面" },
    copy: {
      ko: "회전부 정밀도와 내마모성, 피로강도를 확보하는 후공정 설비",
      en: "Finishing equipment for rotational accuracy, wear resistance, and fatigue strength",
      ja: "回転部品の精度、耐摩耗性、疲労強度を作り込む後工程設備",
    },
    items: ["CNC GRINDING", "SUPER FINISHING", "SHOT PEENING"],
  },
  {
    id: "automation-inspection",
    title: { ko: "자동화·검사", en: "Automation & Inspection", ja: "自動化・検査" },
    copy: {
      ko: "조립, 런아웃 교정, 전용 치수검사와 비파괴 균열검사를 연결하는 설비",
      en: "Equipment connecting assembly, runout correction, dimensional inspection, and crack detection",
      ja: "組立、振れ矯正、専用寸法検査、非破壊亀裂検査をつなぐ設備",
    },
    items: ["LASER WELDING", "STRAIGHTENER"],
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
      en: "Complex machining on vertical machining centers with dedicated fixtures",
      ja: "立形マシニングセンタと専用治具による複合加工",
    },
    image: machiningCenterImage,
  },
  {
    id: "rack-rolling",
    group: "gear",
    title: "RACK ROLLING",
    makers: "NACHI · DONG-IL · COMET",
    copy: {
      ko: "전조 다이로 샤프트 표면에 랙 치형을 성형해 반복 생산성과 끊김 없는 단류선을 확보합니다.",
      en: "Forms rack teeth on shaft surfaces with rolling dies, securing repeatable production and continuous grain flow.",
      ja: "ラック転造ダイスでシャフト表面に歯形を転造し、安定した量産性を確保します。",
    },
    capability: {
      ko: "샤프트 계열 랙·스플라인 성형",
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
      ko: "내측 기어와 스플라인을 브로치 공구로 연속 절삭해 형상과 위치 정밀도를 관리합니다.",
      en: "Continuously cuts internal gears and splines while controlling profile and position.",
      ja: "内歯ギヤとスプラインをブローチ加工で連続切削し、形状と位置精度を管理します。",
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
      en: "Machines helical and spur gear profiles under standardized conditions to maintain accuracy across long production runs.",
      ja: "ヘリカルギヤ・スパーギヤの歯形を加工し、標準化した工程条件で長期量産の繰返し精度を維持します。",
    },
    capability: {
      ko: "헬리컬·스퍼 기어 및 Hard Hobbing 대응",
      en: "Helical and spur gear hobbing, including hard hobbing",
      ja: "ヘリカルギヤ・スパーギヤおよびハードホビング",
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
      ja: "工具干渉のある形状や内・外歯ギヤをギヤシェーパーで加工します。",
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
      ja: "円筒・アンギュラ・センタレス研削で、回転部の寸法精度、真円度、表面品質を作り込みます。",
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
    makers: "INDUCTION HARDENING · LOW-TEMP TEMPERING",
    copy: {
      ko: "필요한 부위만 선택적으로 경화하고 저온 템퍼링을 연계해 내마모성과 인성을 관리합니다.",
      en: "Selectively hardens critical areas and uses low-temperature tempering to balance wear resistance and toughness.",
      ja: "必要部位を選択的に高周波焼入れし、低温焼戻しで耐摩耗性と靭性を両立させます。",
    },
    capability: {
      ko: "고주파 경화와 저온 템퍼링 연계",
      en: "Induction hardening integrated with low-temperature tempering",
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
      en: "Alternates servo-press correction with automatic measurement to control shaft runout and record the results.",
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
      en: "Propels shot media at the surface to remove burrs and improve fatigue strength and surface condition.",
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
    title: "DEDICATED AUTOMATED INSPECTION",
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
      ja: "打撃時の固有振動数を比較し、部品を傷つけずに亀裂の可能性を判定します。",
    },
    capability: {
      ko: "음향 공진 기반 비파괴 균열검사",
      en: "Acoustic-resonance non-destructive crack detection",
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
      en: "Verifies geometry, position, and gear-profile data with CMM and dedicated gear-measurement systems.",
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
    eyebrow: "ELECTRIFIED POWERTRAIN",
    title: {
      ko: "EV 오일 펌프 부품과 전동화 파워트레인용 기어·샤프트",
      en: "EV oil-pump components and electrified-powertrain gears and shafts",
      ja: "EVオイルポンプ部品と電動化パワートレイン向けギヤ・シャフト",
    },
    copy: {
      ko: "EV 감속기용 오일 펌프 하우징·커버를 가공하고, 전동화 파워트레인용 기어 샤프트·코액시얼 샤프트·링크 샤프트의 설계 검토와 시제품 제작·검증에 대응합니다.",
      en: "We machine oil-pump housings and covers for EV reduction gearboxes and support design reviews, prototype production, and validation for electrified-powertrain gear shafts, coaxial shafts, and link shafts.",
      ja: "EV減速機向けオイルポンプハウジング・カバーを加工し、電動化パワートレイン向けギヤシャフト、コアキシャルシャフト、リンクシャフトの設計検討および試作・検証に対応します。",
    },
    items: {
      ko: ["EV Oil Pump Housing / Cover", "HEV Gear Shaft", "Coaxial / Link Shaft"],
      en: ["EV oil-pump housing / cover", "HEV gear shaft", "Coaxial / link shaft"],
      ja: ["EVオイルポンプハウジング／カバー", "HEVギヤシャフト", "コアキシャルシャフト／リンクシャフト"],
    },
    image: electrifiedPowertrainImage,
  },
  "products/powertrain": {
    eyebrow: "POWERTRAIN APPLICATION",
    title: {
      ko: "변속기·엔진용 정밀가공 부품",
      en: "Precision-machined components for transmissions and engines",
      ja: "トランスミッション・エンジン向け精密加工部品",
    },
    copy: {
      ko: "6단·8단·10단 변속기 샤프트를 비롯해 Oil Pump Shaft, Brake Module Shaft, Camshaft Nose Piece와 Balance Shaft를 정밀가공합니다.",
      en: "Production covers six-, eight-, and ten-speed transmission shafts, plus oil-pump shafts, brake-module shafts, camshaft nose pieces, and balance shafts.",
      ja: "6速、8速、10速のトランスミッションシャフトに加え、オイルポンプシャフト、ブレーキモジュールシャフト、カムシャフトノーズピース、バランスシャフトを精密加工します。",
    },
    items: {
      ko: ["6 / 8 / 10-Speed Shaft", "Transmission Oil Pump Shaft", "Brake Module / Camshaft Nose Piece", "Balance Shaft"],
      en: ["6 / 8 / 10-speed shaft", "Transmission oil-pump shaft", "Brake-module / camshaft nose piece", "Balance shaft"],
      ja: ["6速／8速／10速シャフト", "トランスミッションオイルポンプシャフト", "ブレーキモジュール／カムシャフトノーズピース", "バランスシャフト"],
    },
    image: powertrainComponentImage,
  },
  "products/driveline": {
    eyebrow: "DRIVELINE APPLICATION",
    title: {
      ko: "트랜스퍼 케이스·ETM용 구동 부품",
      en: "Drive components for transfer cases and ETM systems",
      ja: "トランスファーケース・ETM向け駆動部品",
    },
    copy: {
      ko: "트랜스퍼 케이스 액추에이터 샤프트, EMCD 허브 및 디스크 캐리어 부품에 형상별로 호빙·브로칭·랙 롤링·레이저 용접·조립 공정을 적용합니다.",
      en: "Hobbing, broaching, rack rolling, laser welding, and assembly are applied to transfer-case actuator shafts, EMCD hubs, and disc-carrier components as each geometry requires.",
      ja: "トランスファーケースアクチュエーターシャフト、EMCDハブ、ディスクキャリア部品に、形状に応じてホブ加工、ブローチ加工、ラック転造、レーザー溶接・組立を適用します。",
    },
    items: {
      ko: ["Transfer Case Actuator Shaft", "EMCD Hub", "Disc Carrier / Hub", "Laser-welded Assembly"],
      en: ["Transfer-case actuator shaft", "EMCD hub", "Disc carrier / hub", "Laser-welded assembly"],
      ja: ["トランスファーケースアクチュエーターシャフト", "EMCDハブ", "ディスクキャリア／ハブ", "レーザー溶接アセンブリー"],
    },
    image: drivelineComponentImage,
  },
  "products/balance-shaft-module": {
    eyebrow: "MACHINED ALUMINUM COMPONENTS",
    title: {
      ko: "밸런스 샤프트 모듈용 알루미늄 가공 부품",
      en: "Machined aluminum components for balance-shaft modules",
      ja: "バランスシャフトモジュール向けアルミ加工部品",
    },
    copy: {
      ko: "밸런스 샤프트 모듈용 알루미늄 다이캐스팅 하우징과 오일 펌프 부품을 정밀가공합니다.",
      en: "We precision-machine die-cast aluminum housings and oil-pump components for balance-shaft modules.",
      ja: "バランスシャフトモジュール向けハウジングとオイルポンプ用アルミダイカスト部品を精密加工します。",
    },
    items: {
      ko: ["BSM Housing", "BSM Oil Pump Component", "Bearing Bore / Oil Passage", "Complex Aluminum Geometry"],
      en: ["BSM housing", "BSM oil-pump component", "Bearing bore / oil passage", "Complex aluminum geometry"],
      ja: ["BSMハウジング", "BSMオイルポンプ用部品", "ベアリングボア／オイル通路", "複雑形状アルミ部品"],
    },
    image: machinedAluminumImage,
  },
  "products/steering": {
    eyebrow: "STEERING APPLICATION",
    title: {
      ko: "조향 장치용 정밀가공 부품",
      en: "Precision-machined components for steering systems",
      ja: "ステアリングシステム向け精密加工部品",
    },
    copy: {
      ko: "헬리컬 피니언, 피니언 샤프트, 토션 바 등 조향 어셈블리 부품에 기어·스플라인 가공, 열처리 및 교정 공정을 적용합니다.",
      en: "Gear and spline machining, heat treatment, and straightening are applied to steering-assembly components such as helical pinions, pinion shafts, and torsion bars.",
      ja: "ヘリカルピニオン、ピニオンシャフト、トーションバーなどのステアリングアセンブリー部品に、ギヤ・スプライン加工、熱処理、矯正工程を適用します。",
    },
    items: {
      ko: ["Helical Pinion", "P/Shaft", "Torsion Bar", "Steering Assembly Component"],
      en: ["Helical pinion", "Pinion shaft", "Torsion bar", "Steering assembly component"],
      ja: ["ヘリカルピニオン", "P／シャフト", "トーションバー", "ステアリングアセンブリー部品"],
    },
    image: hobbingImage,
  },
  "products/etc": {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: {
      ko: "방산·특수 프로젝트 정보 공개 기준",
      en: "Disclosure policy for defense and special projects",
      ja: "防衛・特殊プロジェクトの情報開示について",
    },
    copy: {
      ko: "구체적인 제품과 고객 정보는 공개하지 않으며, 대응 범위와 관리 기준은 보안 및 고객 승인 조건에 따라 개별 협의합니다.",
      en: "Specific product and customer details are not disclosed. Project scope and control requirements are agreed on case by case, subject to security and customer-approval requirements.",
      ja: "具体的な製品・顧客情報は開示せず、対応範囲と管理基準は機密保持および顧客の承認条件に応じて個別に協議します。",
    },
    items: {
      ko: ["정보 관리 프로젝트", "정밀 공정 설계", "품질·LOT 추적", "통제된 양산 이관"],
      en: ["Restricted-information projects", "Precision process design", "Quality and lot traceability", "Controlled production transfer"],
      ja: ["情報管理プロジェクト", "精密工程設計", "品質・ロットトレーサビリティ", "管理下での量産移管"],
    },
    image: defenseSpecialProjectsImage,
  },
};

export const qualityEvidenceCopy = {
  ko: {
    title: "공정과 출하를 연결하는 품질검사",
    copy: "측정 결과를 런아웃 교정, 공정 조건, 추적 관리, 출하 판정에 반영해 품질 변동을 관리합니다.",
  },
  en: {
    title: "Inspection connected to process and release decisions",
    copy: "Measurement results inform straightening, process settings, traceability, and shipment release to control variation throughout production.",
  },
  ja: {
    title: "工程と出荷判定をつなぐ品質検査",
    copy: "測定結果を矯正・工程条件・トレーサビリティ・出荷判定へつなぎ、量産工程のばらつきを管理します。",
  },
};
