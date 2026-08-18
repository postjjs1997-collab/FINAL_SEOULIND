export type CapabilityLanguage = "ko" | "en" | "ja";

type CapabilityCard = {
  code: string;
  title: string;
  copy: string;
  detail: string;
};

type CapabilitySection = {
  eyebrow: string;
  title: string;
  copy: string;
  items: CapabilityCard[];
};

type MeasurementItem = {
  title: string;
  scope: string;
  capability: string;
};

type EngineeringTool = {
  label: string;
  title: string;
  copy: string;
};

export type QualityCapabilityContent = {
  governance: CapabilitySection;
  credentials: CapabilitySection;
  digitalLoop: CapabilitySection;
  shopFloorAssurance: CapabilitySection;
  measurement: {
    eyebrow: string;
    title: string;
    copy: string;
    items: MeasurementItem[];
  };
  problemSolving: CapabilitySection;
  supplierQuality: CapabilitySection;
  engineering: {
    eyebrow: string;
    title: string;
    copy: string;
    stages: CapabilityCard[];
    toolsTitle: string;
    tools: EngineeringTool[];
    validationTitle: string;
    validation: string[];
  };
};

export const qualityCapabilityCopy: Record<CapabilityLanguage, QualityCapabilityContent> = {
  ko: {
    governance: {
      eyebrow: "QUALITY GOVERNANCE",
      title: "방침이 현장 판단으로 이어지는 품질 관리체계",
      copy:
        "경영 책임, 품질 시스템 보증, 현장 실행의 역할을 분리하면서도 정기 검토와 즉시 보고 체계로 연결합니다.",
      items: [
        {
          code: "01 · LEADERSHIP",
          title: "경영 책임과 고객 중심",
          copy: "품질 목표, 고객 요구, 중대 이슈와 자원 투입을 경영검토를 통해 결정합니다.",
          detail: "고객 요구 · 품질 목표 · 이슈 격상 · 자원 배분",
        },
        {
          code: "02 · SYSTEM ASSURANCE",
          title: "품질 시스템 보증",
          copy: "APQP·PPAP, 문서 및 변경 관리, 내부·공정 감사, KPI 검토를 하나의 시스템으로 운영합니다.",
          detail: "APQP / PPAP · 변경 관리 · 공정 감사 · KPI",
        },
        {
          code: "03 · OPERATIONAL CONTROL",
          title: "현장 품질 실행",
          copy: "수입 검사, 공정·특수공정 검사, 최종 검사, 정밀 측정과 LOT 추적을 현장 데이터로 연결해 관리합니다.",
          detail: "수입 · 공정 · 특수공정 · 최종 검사 · 추적성",
        },
      ],
    },
    credentials: {
      eyebrow: "QUALITY STANDARDS IN OPERATION",
      title: "자동차 양산과 특수공정을 뒷받침하는 관리 기준",
      copy:
        "인증과 공정 관리 기준을 고객 요구와 공정 특성에 맞춘 감사, 검증, 교정과 기록 체계로 연결합니다.",
      items: [
        {
          code: "AUTOMOTIVE QMS",
          title: "IATF 16949",
          copy: "자동차 부품 양산을 위한 품질 경영 시스템을 운영합니다.",
          detail: "고객별 요구 사항 · APQP / PPAP · 변경 관리",
        },
        {
          code: "SUPPLIER QUALITY",
          title: "MSQ",
          copy: "현대모비스 협력사 품질 인증 기준을 가공 현장에 적용합니다.",
          detail: "가공 분야 G등급 · 공급 품질 관리",
        },
        {
          code: "PROCESS AUDIT",
          title: "VDA 6.3 기반 공정 감사 역량",
          copy: "VDA 6.3 관점의 리스크 확인과 공정 성숙도 점검 역량을 품질 관리에 반영합니다.",
          detail: "공정 감사 · 위험 검토 · 성숙도",
        },
        {
          code: "SPECIAL PROCESS",
          title: "CQI-9 · CQI-15",
          copy: "CQI 기준에 맞춰 고주파 열처리·템퍼링과 레이저 용접의 조건, 교정, 검증과 기록을 관리합니다.",
          detail: "CQI-9 열처리 · CQI-15 용접",
        },
      ],
    },
    digitalLoop: {
      eyebrow: "DATA-DRIVEN QUALITY LOOP",
      title: "측정값을 쌓아 두는 데 그치지 않고 공정 판단에 반영합니다",
      copy:
        "소재 입고부터 특수공정, 가공 중 측정, 최종 판정까지 각 단계의 결과를 이상 발생 시 대응 계획과 공정 보정으로 연결하고 이력을 남깁니다.",
      items: [
        {
          code: "01 · INCOMING",
          title: "소재·수입 검사",
          copy: "소재 성적서, 재질 등급, 용강 번호(Heat No.), LOT를 확인하고 치수와 식별 상태를 검증합니다.",
          detail: "소재 성적서 · 등급 · 용강 번호 · LOT",
        },
        {
          code: "02 · SPECIAL PROCESS",
          title: "열처리·용접 관리",
          copy: "고주파 열처리·템퍼링과 레이저 용접의 공정 조건, 설비 교정, 검증 결과를 추적 가능한 기록으로 관리합니다.",
          detail: "공정 조건 · 교정 · 검증",
        },
        {
          code: "03 · IN-PROCESS",
          title: "SPC·자동 보정",
          copy: "연삭 직후 측정값은 SPC로 관리하고, 적용 공정에서는 설비 오프셋 보정에 반영하며, 기어 치형·리드·피치·비틀림은 제품 요구에 따라 검증합니다.",
          detail: "연삭 · 기어 정밀 측정 · SPC · 오프셋",
        },
        {
          code: "04 · FINAL RELEASE",
          title: "최종 검사·출하 판정",
          copy: "제품 특성에 따라 CMM·기어 측정기·전용 게이지를 선택하고, 요구 시 스플라인은 전수 검사하고 청정도를 확인합니다. QR 기반 LOT 추적으로 보관 위치, 선입선출, 검사 상태, 방청, 출하 준비 이력을 연결합니다.",
          detail: "정밀 측정 · 조건부 전수 검사 · QR/선입선출 · 출하 판정",
        },
      ],
    },
    shopFloorAssurance: {
      eyebrow: "SHOP-FLOOR ASSURANCE",
      title: "감사·검증 계획·역량 관리로 현장 판정의 일관성을 높입니다",
      copy:
        "공정 리더의 현장 감사부터 자동 검사 결과와 CMM 기준 측정값의 비교 검증, 검사원 역량 확인, 4M 변경 검토까지 양산 리스크를 예방적으로 관리합니다.",
      items: [
        {
          code: "01 · LPA",
          title: "계층별 공정 감사",
          copy: "공정별 책임자가 주요 공정의 표준 준수와 이상·조치 상태를 정기적으로 점검합니다.",
          detail: "관리층 · 생산 현장 · 후속 조치",
        },
        {
          code: "02 · CORRELATION",
          title: "검사 시스템 검증 계획",
          copy: "자동 검사 결과의 신뢰성은 CMM 기준 측정값과 비교하는 검증 계획으로 관리합니다.",
          detail: "자동 검사 · CMM · 상관성",
        },
        {
          code: "03 · COMPETENCY",
          title: "검사원 역량 관리",
          copy: "공정별 스킬 매트릭스와 정기 재평가를 통해 검사·판정 역량과 추가 교육 필요사항을 관리합니다.",
          detail: "스킬 매트릭스 · 재평가 · 교육",
        },
        {
          code: "04 · CHANGE REVIEW",
          title: "4M 변경 검토",
          copy: "4M 변경 시 샘플·시험·검증 자료를 확인하고, 필요한 경우 PPAP 진행 상태까지 점검합니다.",
          detail: "4M · 샘플 · 검증 · PPAP",
        },
      ],
    },
    measurement: {
      eyebrow: "QUALITY LAB & METROLOGY",
      title: "치수부터 기어·표면·재질·용접 단면까지 사내 검증",
      copy:
        "제품 특성과 관리 목적에 맞춰 전용 측정기와 시험 장비를 선택하고, 결과를 공정 판정과 출하 근거로 사용합니다.",
      items: [
        { title: "3차원 측정", scope: "CMM · GD&T · 복합 형상", capability: "최대 1,000 × 1,200 × 600 mm" },
        { title: "기어 정밀 측정", scope: "치형 · 리드 · 피치", capability: "Ø300 · 모듈 0.2–12 · 길이 500 mm" },
        { title: "표면·윤곽", scope: "Ra · Rz · Rmr · 윤곽", capability: "표면조도와 기능 형상 통합 분석" },
        { title: "진원도", scope: "진원도 · 원통도", capability: "분해능 0.002 μm · 최대 25 kg" },
        { title: "경도·금속조직", scope: "비커스 · 로크웰 · 현미경", capability: "현미경 50–500× · 열처리 결과 확인" },
        { title: "재료 기계적 특성", scope: "인장 · 압축", capability: "인장·압축 하중과 변형 거동 확인" },
        { title: "용접부 검증", scope: "용접선 · 단면 깊이", capability: "접합부 단면과 용입 깊이 확인" },
      ],
    },
    problemSolving: {
      eyebrow: "STRUCTURED PROBLEM SOLVING",
      title: "발견부터 표준화까지 완결되는 6단계 개선 루프",
      copy:
        "문제를 임시 조치로 끝내지 않고 고객과 후속 공정 보호, 원인 검증, 효과 확인, 표준 반영까지 하나의 이력으로 관리합니다.",
      items: [
        { code: "01", title: "발견", copy: "SPC 신호, 감사 결과, 고객 피드백으로 이상을 식별합니다.", detail: "신호 · 감사 · 피드백" },
        { code: "02", title: "유출 방지", copy: "영향 범위를 구분하고 고객과 후속 공정을 우선 보호합니다.", detail: "범위 · 추적 · 보호" },
        { code: "03", title: "원인 분석", copy: "5 Why 분석, 특성요인도, 데이터 층별화로 근본 원인을 검증합니다.", detail: "5 Why · 특성요인도 · 데이터" },
        { code: "04", title: "개선", copy: "원인을 제거하고 오류 방지와 관리 조건을 보완합니다.", detail: "원인 제거 · 오류 방지" },
        { code: "05", title: "효과 검증", copy: "공정 능력과 추세로 개선 효과와 재발 여부를 확인합니다.", detail: "공정 능력 · 추세 · 효과" },
        { code: "06", title: "표준화", copy: "PFMEA, 관리 계획, 작업 표준과 교육에 학습 결과를 반영합니다.", detail: "PFMEA · 관리 계획 · 교육" },
      ],
    },
    supplierQuality: {
      eyebrow: "SUPPLIER QUALITY MANAGEMENT",
      title: "선정부터 양산까지 이어지는 협력사 품질 관리",
      copy:
        "소재와 외주공정의 품질을 서울산업 내부 공정과 같은 흐름에서 검증하고, 성과와 위험에 따라 관리 수준을 조정합니다.",
      items: [
        { code: "01", title: "신규 협력사 평가", copy: "품질 시스템, 기술 역량, 문제 해결과 추적성을 현장·문서로 확인합니다.", detail: "시스템 · 공정 · 기술" },
        { code: "02", title: "APQP 관리", copy: "PFMEA, 품질 보증 계획과 개발 진행 상황을 단계별로 검토합니다.", detail: "단계별 검토 · 미결 과제" },
        { code: "03", title: "PPAP 승인", copy: "신규·변경 부품의 승인 자료와 생산 준비 상태를 검증합니다.", detail: "PPAP · 생산 능력 확인" },
        { code: "04", title: "품질 문제 대응", copy: "원인·시정 조치·효과 확인을 연결해 공급망 재발을 방지합니다.", detail: "시정 조치 · 효과 확인 · 재발 방지" },
        { code: "05", title: "공정 개선", copy: "시스템·공정·제품 감사를 바탕으로 개선과 교육을 지원합니다.", detail: "감사 · 지도 · 역량 향상" },
        { code: "06", title: "양산 관리", copy: "품질 성과와 변경점을 지속 점검하고 미결 사항을 끝까지 추적합니다.", detail: "KPI · 변경 · 후속 조치" },
      ],
    },
    engineering: {
      eyebrow: "EARLY SUPPLIER INVOLVEMENT",
      title: "도면 확정 전부터 제조성·품질 위험·원가를 함께 검토합니다",
      copy:
        "고객의 기능 요구를 실제 가공 순서, 치공구, 검사 방법, 검증 계획으로 구체화합니다. 신규 요구는 제품 요구사항과 고객 승인 단계에 맞춰 별도의 타당성 검증을 수행합니다.",
      stages: [
        { code: "01", title: "초기 제조성 검토", copy: "설계 동결 전 기능 요구, 도면, 특별특성과 생산 조건을 함께 검토해 제조성 위험을 조기에 식별해 해소합니다.", detail: "초기 공동 엔지니어링 · 도면 · 제조성 검토" },
        { code: "02", title: "공정·치공구 엔지니어링", copy: "장비와 공구 확정 전 공정 순서, 기준면, 클램핑, 사내·외주 공정 경로, 치공구와 검사 전략을 FMEA와 함께 설계합니다.", detail: "FMEA · 기준면 · 치공구 · 관리" },
        { code: "03", title: "데이터 기반 검증·VA/VE", copy: "시험 생산, 측정, 공정 능력과 기능 시험을 승인 단계에 맞춰 검증하고 소재·공정·치공구·사이클 타임 개선안을 제안합니다.", detail: "시험 생산 · 검증 · PPAP · VA/VE" },
      ],
      toolsTitle: "설계와 제조를 잇는 엔지니어링 도구",
      tools: [
        { label: "2D ENGINEERING", title: "AutoCAD", copy: "도면 검토, 공정·라인 배치와 치공구 상세 설계" },
        { label: "3D ENGINEERING", title: "Autodesk Inventor", copy: "3D 모델, 조립·간섭과 치공구 콘셉트 검토" },
        { label: "CAM & COST SUPPORT", title: "Mastercam", copy: "가공 경로, 공구 접근, 사이클 타임과 초기 원가 검토" },
      ],
      validationTitle: "제조 의사 결정을 위한 검증 근거",
      validation: [
        "단조 유동·응력·변형률·성형하중 시뮬레이션",
        "서보 프레스 하중–변위 모니터링",
        "제품별 승인 단계에 맞춘 레이저 용접 용입·접합 상태·치수 영향의 타당성 검증",
        "연삭 측정 데이터의 SPC·설비 보정 피드백",
        "필요 시 외부 전문기관과 연계한 기능 시험",
      ],
    },
  },
  en: {
    governance: {
      eyebrow: "QUALITY GOVERNANCE",
      title: "A quality system that turns policy into shop-floor decisions",
      copy: "Leadership, system assurance, and operational control have distinct ownership and are linked through regular review and clear escalation.",
      items: [
        { code: "01 · LEADERSHIP", title: "Leadership & customer focus", copy: "Quality objectives, customer requirements, critical issues, and resource allocation are decided in management review.", detail: "Customer · Objectives · Escalation · Resources" },
        { code: "02 · SYSTEM ASSURANCE", title: "Quality system assurance", copy: "APQP and PPAP, document and change control, audits, and KPI reviews operate as one system.", detail: "APQP / PPAP · Change · Audit · KPI" },
        { code: "03 · OPERATIONAL CONTROL", title: "Shop-floor quality execution", copy: "Incoming, in-process, special-process, and final inspections are integrated with metrology and lot traceability.", detail: "Incoming · Process · Special · Final · Trace" },
      ],
    },
    credentials: {
      eyebrow: "QUALITY STANDARDS IN OPERATION",
      title: "Operating standards for automotive production and special processes",
      copy: "Certifications and process standards are translated into customer-specific audits, validation, calibration, and traceable process records.",
      items: [
        { code: "AUTOMOTIVE QMS", title: "IATF 16949", copy: "An automotive quality management system underpins volume production of automotive parts.", detail: "CSR · APQP / PPAP · Change Control" },
        { code: "SUPPLIER QUALITY", title: "MSQ", copy: "Hyundai Mobis supplier-quality requirements are applied to machining operations.", detail: "Machining Grade G · Supply Quality" },
        { code: "PROCESS AUDIT", title: "VDA 6.3-based audit capability", copy: "VDA 6.3-based process audits support risk review and process-maturity checks in quality operations.", detail: "Process Audit · Risk Review · Maturity" },
        { code: "SPECIAL PROCESS", title: "CQI-9 · CQI-15", copy: "Induction hardening, tempering, and laser welding are controlled through CQI-based process parameters, calibration, validation, and records.", detail: "CQI-9 Heat Treatment · CQI-15 Welding" },
      ],
    },
    digitalLoop: {
      eyebrow: "DATA-DRIVEN QUALITY LOOP",
      title: "Measurement results inform process decisions—not just recordkeeping",
      copy: "From incoming material through special processes, in-process measurement, and final release, each result informs reaction plans and process adjustments while preserving traceable evidence.",
      items: [
        { code: "01 · INCOMING", title: "Material & incoming inspection", copy: "Material certificates, grade, heat number, lot, dimensions, and identification status are verified.", detail: "Material Certificate · Grade · Heat No. · Lot" },
        { code: "02 · SPECIAL PROCESS", title: "Heat treatment & welding", copy: "Induction hardening, tempering, and laser-welding conditions, calibration, and validation are retained as traceable records.", detail: "Parameter · Calibration · Verification" },
        { code: "03 · IN-PROCESS", title: "SPC & automatic offset", copy: "Post-grinding measurements are managed in SPC and, where applied, fed back to equipment offsets; gear profile, lead, pitch, and twist are verified against product requirements.", detail: "Grinding · Gear Metrology · SPC · Offset" },
        { code: "04 · FINAL RELEASE", title: "Final inspection & release", copy: "CMM, gear measuring machines, and dedicated gauges are selected for each product characteristic; where required, 100% spline gauging and cleanliness checks are applied. QR-linked lot records connect storage location, FIFO status, inspection status, rust prevention, and shipment readiness.", detail: "Metrology · Conditional 100% · QR/FIFO · Release" },
      ],
    },
    shopFloorAssurance: {
      eyebrow: "SHOP-FLOOR ASSURANCE",
      title: "Consistent shop-floor decisions through audits, verification, and competency management",
      copy:
        "Production risk is managed proactively through layered process audits, planned correlation checks between automated inspection results and CMM reference measurements, inspector qualification, and structured 4M change review.",
      items: [
        {
          code: "01 · LPA",
          title: "Layered process audits",
          copy: "Process owners periodically review compliance with standards and track open abnormalities and corrective actions at key processes.",
          detail: "Leadership · Shop Floor · Follow-up",
        },
        {
          code: "02 · CORRELATION",
          title: "Inspection-system verification plan",
          copy: "Automated inspection reliability is managed through planned correlation checks against CMM reference measurements.",
          detail: "Automated Inspection · CMM · Correlation",
        },
        {
          code: "03 · COMPETENCY",
          title: "Inspector competency",
          copy: "Process-specific skill matrices and periodic re-evaluation identify qualification status and additional training needs.",
          detail: "Skill Matrix · Re-evaluation · Training",
        },
        {
          code: "04 · CHANGE REVIEW",
          title: "4M change review",
          copy: "Samples, tests, validation evidence, and the progress of any required PPAP activity are reviewed for 4M changes.",
          detail: "4M · Sample · Validation · PPAP",
        },
      ],
    },
    measurement: {
      eyebrow: "QUALITY LAB & METROLOGY",
      title: "In-house verification from geometry and gears to materials and welds",
      copy: "Fit-for-purpose measurement and test equipment provides objective evidence for process decisions and product release.",
      items: [
        { title: "Coordinate measurement", scope: "CMM · GD&T · Complex geometry", capability: "Up to 1,000 × 1,200 × 600 mm" },
        { title: "Gear metrology", scope: "Profile · Lead · Pitch", capability: "Ø300 · Module 0.2–12 · Length 500 mm" },
        { title: "Surface & contour", scope: "Ra · Rz · Rmr · Contour", capability: "Surface texture and functional geometry" },
        { title: "Roundness", scope: "Roundness · Cylindricity", capability: "0.002 μm resolution · Up to 25 kg" },
        { title: "Hardness & metallurgy", scope: "Vickers · Rockwell · Microscope", capability: "50–500× microscopy for heat-treatment checks" },
        { title: "Mechanical properties", scope: "Tensile · Compression", capability: "Load and deformation behavior verification" },
        { title: "Weld verification", scope: "Weld seam · Penetration depth", capability: "Joint cross-section and penetration-depth review" },
      ],
    },
    problemSolving: {
      eyebrow: "STRUCTURED PROBLEM SOLVING",
      title: "A six-step improvement loop from detection to standardization",
      copy: "Issues progress from immediate containment through verified root cause, corrective action, effectiveness review, and standards updates.",
      items: [
        { code: "01", title: "Detect", copy: "Identify abnormalities from SPC signals, audit findings, and customer feedback.", detail: "Signal · Audit · Feedback" },
        { code: "02", title: "Contain", copy: "Define the affected scope and protect the customer and downstream processes.", detail: "Scope · Trace · Protect" },
        { code: "03", title: "Analyze", copy: "Verify root causes through 5 Whys, Ishikawa analysis, and data stratification.", detail: "5 Whys · Ishikawa · Data" },
        { code: "04", title: "Correct", copy: "Eliminate causes and reinforce error-proofing and process controls.", detail: "Remove Cause · Poka-yoke" },
        { code: "05", title: "Verify", copy: "Confirm effectiveness and recurrence risk through capability and trend review.", detail: "Capability · Trend · Effectiveness" },
        { code: "06", title: "Standardize", copy: "Embed lessons in PFMEA, control plans, work standards, and training.", detail: "PFMEA · Control Plan · Training" },
      ],
    },
    supplierQuality: {
      eyebrow: "SUPPLIER QUALITY MANAGEMENT",
      title: "Supplier quality from selection through volume production",
      copy: "Material and outsourced-process quality are validated within the same connected flow as Seoul Industry’s internal operations, with oversight adjusted to performance and risk.",
      items: [
        { code: "01", title: "New supplier evaluation", copy: "Assess quality systems, technical capability, problem-solving methods, and traceability through on-site audits and document review.", detail: "System · Process · Technical" },
        { code: "02", title: "APQP management", copy: "Review PFMEA, assurance planning, timing, and open issues through stage gates.", detail: "Gate Review · Open Issues" },
        { code: "03", title: "PPAP approval", copy: "Validate approval evidence and production readiness for new and changed parts.", detail: "PPAP · Run-at-Rate" },
        { code: "04", title: "Quality issue response", copy: "Connect root cause, corrective action, and effectiveness review to prevent recurrence.", detail: "CAPA · Effectiveness · Prevention" },
        { code: "05", title: "Process improvement", copy: "Use system, process, and product audits to support improvement and training.", detail: "Audit · Coaching · Capability Improvement" },
        { code: "06", title: "Production control", copy: "Monitor performance and changes continuously and track open issues to closure.", detail: "KPI · Change · Follow-up" },
      ],
    },
    engineering: {
      eyebrow: "EARLY SUPPLIER INVOLVEMENT",
      title: "Manufacturability, quality, and cost reviewed before design freeze",
      copy: "Functional requirements are translated into process sequences, fixtures, inspection methods, and validation plans. New requirements receive separate feasibility validation against product requirements and at each customer approval stage.",
      stages: [
        { code: "01", title: "Early manufacturability review", copy: "Before design freeze, functional requirements, drawings, special characteristics, and production conditions are reviewed to identify manufacturing risk early.", detail: "Early Involvement · Drawing · DFM" },
        { code: "02", title: "Process and tooling engineering", copy: "Before equipment and tools are finalized, process sequences, datums, clamping, in-house and outsourced routes, fixtures, and inspection strategies are designed with FMEA.", detail: "FMEA · Datum · Fixture · Control" },
        { code: "03", title: "Data-based validation and VA/VE", copy: "Trials, measurements, process capability, and functional tests support approval-stage validation and improvement proposals for materials, processes, tooling, and cycle time.", detail: "Trial · Validation · PPAP · VA/VE" },
      ],
      toolsTitle: "Engineering tools connecting design and manufacturing",
      tools: [
        { label: "2D ENGINEERING", title: "AutoCAD", copy: "Drawing review, process and line layouts, and detailed fixture design" },
        { label: "3D ENGINEERING", title: "Autodesk Inventor", copy: "3D modeling, assembly and interference review, and fixture concepts" },
        { label: "CAM & COST SUPPORT", title: "Mastercam", copy: "Toolpaths, tool access, cycle time, and early cost review" },
      ],
      validationTitle: "Evidence for manufacturing decisions",
      validation: [
        "Forging simulation of material flow, stress, strain, and forming load",
        "Servo-press force–displacement monitoring",
        "Separate feasibility validation of laser-weld penetration, joint condition, and dimensional impact at each product approval stage",
        "SPC on grinding measurement data, fed back to machine offsets",
        "External functional testing through qualified institutes when required",
      ],
    },
  },
  ja: {
    governance: {
      eyebrow: "QUALITY GOVERNANCE",
      title: "方針を現場判断につなげる品質管理体制",
      copy: "経営責任、品質システム保証、現場実行の役割を明確にし、定期レビューと迅速なエスカレーションで連携します。",
      items: [
        { code: "01 · LEADERSHIP", title: "経営責任と顧客重視", copy: "品質目標、顧客要求、重大課題、資源配分をマネジメントレビューで判断します。", detail: "顧客要求 · 品質目標 · エスカレーション · 資源" },
        { code: "02 · SYSTEM ASSURANCE", title: "品質システム保証", copy: "APQP・PPAP、文書・変更管理、内部・工程監査、KPIレビューを一つのシステムで運用します。", detail: "APQP / PPAP · 変更管理 · 工程監査 · KPI" },
        { code: "03 · OPERATIONAL CONTROL", title: "現場品質の実行", copy: "受入検査、工程・特殊工程検査、最終検査を、精密測定およびロットトレーサビリティと結びつけて管理します。", detail: "受入 · 工程 · 特殊工程 · 最終検査 · トレーサビリティ" },
      ],
    },
    credentials: {
      eyebrow: "QUALITY STANDARDS IN OPERATION",
      title: "自動車量産と特殊工程を支える管理基準",
      copy: "認証と工程管理基準を、顧客要求と工程特性に応じた監査、検証、校正、記録へつなげています。",
      items: [
        { code: "AUTOMOTIVE QMS", title: "IATF 16949", copy: "自動車部品量産のための品質マネジメントシステムを運用します。", detail: "顧客固有要求 · APQP / PPAP · 変更管理" },
        { code: "SUPPLIER QUALITY", title: "MSQ", copy: "現代モービスのサプライヤー品質基準を加工現場に適用します。", detail: "加工分野G等級 · 供給品質管理" },
        { code: "PROCESS AUDIT", title: "VDA 6.3に基づく工程監査能力", copy: "VDA 6.3の視点に基づくリスク評価と工程成熟度の点検手法を、品質管理に取り入れています。", detail: "工程監査 · リスク確認 · 成熟度" },
        { code: "SPECIAL PROCESS", title: "CQI-9 · CQI-15", copy: "CQI基準に沿って高周波焼入れ・焼戻しとレーザー溶接の条件、校正、検証、記録を管理します。", detail: "CQI-9 熱処理 · CQI-15 溶接" },
      ],
    },
    digitalLoop: {
      eyebrow: "DATA-DRIVEN QUALITY LOOP",
      title: "測定値を保存するだけでなく、工程判断へフィードバックします",
      copy: "素材受入から特殊工程、工程内測定、最終判定まで、各結果を異常時対応計画と工程補正につなげ、履歴を残します。",
      items: [
        { code: "01 · INCOMING", title: "素材・受入検査", copy: "材料証明書、材質、ヒート番号、ロット、寸法、識別状態を確認します。", detail: "材料証明書 · 材質 · ヒート番号 · ロット" },
        { code: "02 · SPECIAL PROCESS", title: "熱処理・溶接管理", copy: "高周波焼入れ・焼戻しとレーザー溶接の工程条件、設備校正、検証結果を追跡可能な記録として管理します。", detail: "工程条件 · 校正 · 検証" },
        { code: "03 · IN-PROCESS", title: "SPC・自動補正", copy: "研削直後の測定値はSPCで管理し、適用工程では設備オフセットへフィードバックします。ギヤの歯形・歯すじ・ピッチ・ねじれは製品要求に応じて検証します。", detail: "研削 · ギヤ測定 · SPC · オフセット" },
        { code: "04 · FINAL RELEASE", title: "最終検査・出荷判定", copy: "製品特性に応じてCMM、ギヤ測定機、専用ゲージを選定し、要求時にはスプラインの100%全数検査と清浄度確認を行います。QRコードに紐づくロット記録により、保管位置、先入れ先出し、検査状態、防錆、出荷準備までの履歴を一元管理します。", detail: "精密測定 · 条件付き全数検査 · QR／先入れ先出し · 出荷判定" },
      ],
    },
    shopFloorAssurance: {
      eyebrow: "SHOP-FLOOR ASSURANCE",
      title: "監査・検証計画・力量管理で現場判定の一貫性を高めます",
      copy:
        "階層別工程監査、自動検査結果とCMM基準測定値の比較検証、検査員の力量確認、4M変更レビューを通じて量産リスクを予防的に管理します。",
      items: [
        {
          code: "01 · LPA",
          title: "階層別工程監査",
          copy: "工程別責任者が主要工程の標準遵守と異常・対策状況を定期的に点検します。",
          detail: "管理層 · 製造現場 · フォローアップ",
        },
        {
          code: "02 · CORRELATION",
          title: "検査システム検証計画",
          copy: "自動検査結果の信頼性は、CMM基準測定値との比較検証計画により管理します。",
          detail: "自動検査 · CMM · 相関確認",
        },
        {
          code: "03 · COMPETENCY",
          title: "検査員力量管理",
          copy: "工程別スキルマトリクスと定期的な再評価により、検査・判定能力と追加教育の必要性を管理します。",
          detail: "スキルマトリクス · 再評価 · 教育",
        },
        {
          code: "04 · CHANGE REVIEW",
          title: "4M変更レビュー",
          copy: "4M変更時にサンプル、試験、検証資料、必要なPPAPの進捗状況を確認します。",
          detail: "4M · サンプル · 検証 · PPAP",
        },
      ],
    },
    measurement: {
      eyebrow: "QUALITY LAB & METROLOGY",
      title: "寸法からギヤ、表面、材質、溶接断面まで社内で検証",
      copy: "製品特性と管理目的に応じて測定・試験設備を選定し、結果を工程判断と出荷判定の根拠として活用します。",
      items: [
        { title: "三次元測定", scope: "CMM · GD&T · 複合形状", capability: "最大 1,000 × 1,200 × 600 mm" },
        { title: "ギヤ精密測定", scope: "歯形 · 歯すじ · ピッチ", capability: "Ø300 · モジュール 0.2–12 · 長さ 500 mm" },
        { title: "表面・輪郭", scope: "Ra · Rz · Rmr · 輪郭", capability: "表面性状と機能形状の統合分析" },
        { title: "真円度", scope: "真円度 · 円筒度", capability: "分解能 0.002 μm · 最大25 kg" },
        { title: "硬さ・金属組織", scope: "ビッカース · ロックウェル · 顕微鏡", capability: "顕微鏡50–500× · 熱処理結果確認" },
        { title: "材料機械特性", scope: "引張 · 圧縮", capability: "引張・圧縮荷重と変形挙動の確認" },
        { title: "溶接部検証", scope: "溶接線 · 断面深さ", capability: "接合断面と溶込み深さ確認" },
      ],
    },
    problemSolving: {
      eyebrow: "STRUCTURED PROBLEM SOLVING",
      title: "検出から標準化まで完結する6段階改善ループ",
      copy: "暫定処置で終わらせず、顧客と後工程の保護、根本原因の検証、効果確認、標準反映までを一つの履歴で管理します。",
      items: [
        { code: "01", title: "検出", copy: "SPC信号、監査結果、顧客フィードバックから異常を特定します。", detail: "信号 · 監査 · フィードバック" },
        { code: "02", title: "流出防止", copy: "影響範囲を明確にし、顧客と後工程を優先して保護します。", detail: "範囲 · 追跡 · 保護" },
        { code: "03", title: "原因分析", copy: "なぜなぜ分析、特性要因図、データ層別により根本原因を検証します。", detail: "なぜなぜ分析 · 特性要因図 · データ" },
        { code: "04", title: "是正", copy: "原因を除去し、ポカヨケと管理条件を強化します。", detail: "原因除去 · ポカヨケ" },
        { code: "05", title: "効果検証", copy: "工程能力と傾向から改善効果と再発リスクを確認します。", detail: "工程能力 · 傾向 · 効果" },
        { code: "06", title: "標準化", copy: "PFMEA、管理計画、作業標準、教育へ学習結果を反映します。", detail: "PFMEA · 管理計画 · 教育" },
      ],
    },
    supplierQuality: {
      eyebrow: "SUPPLIER QUALITY MANAGEMENT",
      title: "選定から量産までつながるサプライヤー品質管理",
      copy: "素材と外注工程の品質を社内工程と同じ一連の流れで検証し、実績とリスクに応じて管理レベルを調整します。",
      items: [
        { code: "01", title: "新規サプライヤー評価", copy: "品質システム、技術力、問題解決力、トレーサビリティを現場と文書で確認します。", detail: "システム · 工程 · 技術" },
        { code: "02", title: "APQP管理", copy: "PFMEA、品質保証計画、進捗、未解決課題を段階ごとに確認します。", detail: "段階別レビュー · 未解決課題" },
        { code: "03", title: "PPAP承認", copy: "新規・変更部品の承認資料と量産準備状態を検証します。", detail: "PPAP · 生産能力確認" },
        { code: "04", title: "品質問題対応", copy: "根本原因、是正処置、効果確認をつなげてサプライチェーンでの再発を防ぎます。", detail: "是正処置 · 効果確認 · 再発防止" },
        { code: "05", title: "工程改善", copy: "システム・工程・製品監査を基に改善と教育を支援します。", detail: "監査 · 指導 · 能力向上" },
        { code: "06", title: "量産管理", copy: "品質実績と変更点を継続的に確認し、未解決課題を完了まで追跡します。", detail: "KPI · 変更 · フォローアップ" },
      ],
    },
    engineering: {
      eyebrow: "EARLY SUPPLIER INVOLVEMENT",
      title: "図面確定前から、顧客とともに製造性・品質リスク・コストを検討します",
      copy: "顧客の機能要求を、実際の加工順序、治工具、検査方法、検証計画へ落とし込みます。新規要求は製品要求事項と顧客承認段階に合わせて個別の実現可能性検証を行います。",
      stages: [
        { code: "01", title: "初期製造性検討", copy: "設計凍結前に機能要求、図面、特殊特性、生産条件を確認し、製造リスクを早期に洗い出します。", detail: "初期共同エンジニアリング · 図面 · 製造性検討" },
        { code: "02", title: "工程・治工具エンジニアリング", copy: "設備・工具確定前に工程順序、基準面、クランプ、社内・外注工程ルート、治工具、検査戦略をFMEAと共に設計します。", detail: "FMEA · 基準面 · 治工具 · 管理" },
        { code: "03", title: "データ検証・VA/VE", copy: "試作・試験生産、測定、工程能力、機能試験を承認段階に合わせて検証し、素材・工程・治工具・サイクルタイムの改善を提案します。", detail: "試験生産 · 検証 · PPAP · VA/VE" },
      ],
      toolsTitle: "設計と製造をつなぐエンジニアリングツール",
      tools: [
        { label: "2D ENGINEERING", title: "AutoCAD", copy: "図面検討、工程・ライン配置、治工具詳細設計" },
        { label: "3D ENGINEERING", title: "Autodesk Inventor", copy: "3Dモデル、組立・干渉、治工具構想の検討" },
        { label: "CAM & COST SUPPORT", title: "Mastercam", copy: "加工経路、工具アクセス性、サイクルタイム、初期原価の検討" },
      ],
      validationTitle: "製造判断を支える検証根拠",
      validation: [
        "鍛造における材料流動・応力・ひずみ・成形荷重のシミュレーション",
        "サーボプレス荷重－変位モニタリング",
        "製品別承認段階に応じたレーザー溶接の溶込み・接合状態・寸法影響の個別実現可能性検証",
        "研削測定データのSPC・設備補正フィードバック",
        "必要に応じて外部専門機関と連携した機能試験",
      ],
    },
  },
};
