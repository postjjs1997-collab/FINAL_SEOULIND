import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import preventiveQualityImage from "../../assets/company-profile/process/cmm.webp";
import iatfCertificateImage from "../../assets/certificates/iatf-16949-seoul-industry.png";
import iatfCertificatePdf from "../../assets/certificates/iatf-16949-seoul-industry.pdf";
import msqCertificateImage from "../../assets/certificates/msq-seoul-industry-2025.png";
import iso14001CertificateImage from "../../assets/certificates/iso-14001-seoul-industry.webp";
import iso14001CertificatePdf from "../../assets/certificates/iso-14001-seoul-industry.pdf";
import balanceModuleImage from "../../assets/product-application/machined-aluminum-application.webp";
import automotiveImage from "../../assets/product-application/electric-vehicle-precise.webp";
import steeringImage from "../../assets/product-application/steering-precise.webp";
import drivelineImage from "../../assets/product-application/driveline-precise.webp";
import powertrainImage from "../../assets/product-application/powertrain-precise.webp";
import precisionImage from "../../precision-inside-mobility.jpg";
import seoulIndustryFacadeImage from "../../assets/company-profile/seoul-industry-facade-sign.webp";
import ceoGreetingIllustration from "../../assets/company-profile/ceo-greeting-illustration.webp";
import defenseSpecialProjectsImage from "../../assets/product-catalog/etc/defense-special-projects.png";
import cncLatheEquipmentImage from "../../assets/equipment-inventory/actual/cnc-lathe.webp";
import cncMachiningCenterEquipmentImage from "../../assets/equipment-inventory/actual/cnc-machining-center.webp";
import rackRollingEquipmentImage from "../../assets/equipment-inventory/actual/rack-rolling.webp";
import broachingEquipmentImage from "../../assets/equipment-inventory/actual/broaching.webp";
import hobbingEquipmentImage from "../../assets/equipment-inventory/actual/cnc-hobbing.webp";
import shapingEquipmentImage from "../../assets/equipment-inventory/actual/shaping.webp";
import grindingEquipmentImage from "../../assets/equipment-inventory/actual/cnc-grinding.webp";
import inductionHardeningEquipmentImage from "../../assets/equipment-inventory/actual/induction-hardening.webp";
import straightenerEquipmentImage from "../../assets/equipment-inventory/actual/straightener.webp";
import automaticInspectionEquipmentImage from "../../assets/equipment-inventory/actual/automatic-inspection.webp";
import gearMeasuringEquipmentImage from "../../assets/equipment-inventory/actual/gear-measuring.webp";
import cmmEquipmentImage from "../../assets/equipment-inventory/actual/cmm.webp";
import sustainabilityPolicyDocument from "../../assets/documents/sustainability-management-policy-seoul-industry.docx?url";
import Icon from "./Icons";
import { getPageConfig, type PageConfig } from "../data/pageConfig";
import { RenewalSiteFooter, RenewalSiteHeader, toRenewalHref, type RenewalLanguage } from "./RenewalShell";
import ViewportLoopVideo from "./ViewportLoopVideo";
import { defaultLanguage, isLanguageCode, siteContent, type SiteContent } from "../data/siteContent";
import useNoticePosts from "../hooks/useNoticePosts";
import { findMenuByRoute, getSiteMenuGroups, resolveMenuRoute } from "../data/navigation";
import {
  companyOverviewCopy,
  companyProfileAssets,
  equipmentInventory,
  globalProgramNetwork,
  inspectionProcessIds,
  localSupplyNetwork,
  manufacturingFlowIds,
  manufacturingFlowVideos,
  manufacturingGroupLabels,
  manufacturingPageCopy,
  manufacturingProcesses,
  operationalReliability,
} from "../data/companyProfile";
import {
  inspectionFilmByProcessId,
  manufacturingFilmGroupIds,
  manufacturingFilmLibrary,
  manufacturingFilmLibraryCopy,
  type ManufacturingFilmGroupId,
} from "../data/manufacturingFilms";
import { qualityCapabilityCopy, type QualityCapabilityContent } from "../data/qualityCapability";
import { getProductSpecs, productPartCatalogByRoute, productSpecSectionCopy } from "../data/productCatalog";
import { useLenisScroll } from "../motion/useLenisScroll";
import { jumpToPageTop } from "../utils/pageScroll";
import { getStoredLanguage, parseLocation, setSiteLanguage } from "../utils/siteRouter";
import { usePrefersReducedMotion } from "../motion/usePrefersReducedMotion";
import "../styles/renewal.css";
import "../styles/renewal-subpage.css";

type RenewalSubPageProps = {
  route: string;
};

type LocalizedUi = {
  home: string;
  overview: string;
  standards: string;
  process: string;
  details: string;
  next: string;
  view: string;
  contact: string;
  submit: string;
  sent: string;
  fields: {
    company: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
};

const uiCopy: Record<RenewalLanguage, LocalizedUi> = {
  ko: {
    home: "홈",
    overview: "OVERVIEW",
    standards: "운영 기준",
    process: "제조 흐름",
    details: "세부 내용",
    next: "다음 페이지",
    view: "자세히 보기",
    contact: "프로젝트 문의",
    submit: "문의 보내기",
    sent: "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.",
    fields: { company: "회사명", name: "담당자명", email: "이메일", phone: "연락처", subject: "문의 분야", message: "문의 내용" },
  },
  en: {
    home: "Home",
    overview: "OVERVIEW",
    standards: "Operating Standards",
    process: "Manufacturing Flow",
    details: "Details",
    next: "Next Page",
    view: "View More",
    contact: "Project Inquiry",
    submit: "Send Inquiry",
    sent: "Your inquiry has been received. Our team will contact you after review.",
    fields: { company: "Company", name: "Name", email: "Email", phone: "Phone", subject: "Subject", message: "Message" },
  },
  ja: {
    home: "ホーム",
    overview: "OVERVIEW",
    standards: "運用基準",
    process: "製造フロー",
    details: "詳細",
    next: "次のページ",
    view: "詳しく見る",
    contact: "プロジェクトのご相談",
    submit: "お問い合わせを送信",
    sent: "お問い合わせを受け付けました。確認後、担当者よりご連絡いたします。",
    fields: { company: "会社名", name: "担当者名", email: "メール", phone: "電話番号", subject: "お問い合わせ分野", message: "お問い合わせ内容" },
  },
};

type CertificateShowcaseCopy = {
  heading: string;
  intro: string;
  originalLabel: string;
  items: Array<{
    eyebrow: string;
    title: string;
    copy: string;
    metadata: string[];
    alt: string;
  }>;
};

const certificateShowcaseCopy: Record<RenewalLanguage, CertificateShowcaseCopy> = {
  ko: {
    heading: "양산 품질과 환경경영을 뒷받침하는 인증",
    intro: "IATF 16949 및 현대모비스 MSQ 인증 기준에 따라 양산 품질 체계를 운영하고, ISO 14001 인증 범위에 따라 자동차 조향 부품 제조·서비스의 환경경영 체계를 관리합니다.",
    originalLabel: "인증서 보기",
    items: [
      {
        eyebrow: "AUTOMOTIVE QUALITY MANAGEMENT",
        title: "IATF 16949:2016",
        copy: "인증기관 인터텍이 서울산업의 조향·엔진·변속기 부품 제조 및 가공에 대한 품질경영시스템을 인증했습니다.",
        metadata: ["인증번호 2022-0205", "유효기간 2027.05.23"],
        alt: "서울산업 IATF 16949:2016 인증서",
      },
      {
        eyebrow: "MOBIS SUPPLIER QUALITY",
        title: "MSQ 인증",
        copy: "현대모비스 협력사 품질 인증 평가에서 가공 분야 G 등급을 취득한 서울산업의 MSQ 인증서입니다.",
        metadata: ["인증번호 MWK0276", "발급일 2025.01.08"],
        alt: "서울산업 MSQ 인증서",
      },
      {
        eyebrow: "ENVIRONMENTAL MANAGEMENT",
        title: "ISO 14001:2015",
        copy: "자동차 조향 부품의 제조·서비스 범위에 대한 서울산업의 환경경영시스템 인증입니다.",
        metadata: ["인증번호 JEK-2330", "유효기간 2027.05.06"],
        alt: "서울산업 ISO 14001:2015 환경경영시스템 인증서",
      },
    ],
  },
  en: {
    heading: "Certifications supporting production quality and environmental management",
    intro: "IATF 16949 and Hyundai Mobis MSQ support automotive production quality, while ISO 14001 covers the environmental management system for the manufacture and service of automotive steering parts.",
    originalLabel: "View certificate",
    items: [
      {
        eyebrow: "AUTOMOTIVE QUALITY MANAGEMENT",
        title: "IATF 16949:2016",
        copy: "Intertek certified Seoul Industry's quality management system for the manufacture and machining of steering, engine, and transmission parts.",
        metadata: ["Certificate 2022-0205", "Valid through 23 May 2027"],
        alt: "Seoul Industry IATF 16949:2016 certificate",
      },
      {
        eyebrow: "MOBIS SUPPLIER QUALITY",
        title: "MSQ Certification",
        copy: "Seoul Industry achieved Grade G for machining in the Hyundai Mobis supplier quality certification assessment.",
        metadata: ["Certificate MWK0276", "Issued 8 January 2025"],
        alt: "Seoul Industry MSQ certificate",
      },
      {
        eyebrow: "ENVIRONMENTAL MANAGEMENT",
        title: "ISO 14001:2015",
        copy: "Seoul Industry's environmental management system is certified for the manufacture and service of automotive steering parts.",
        metadata: ["Certificate JEK-2330", "Valid through 6 May 2027"],
        alt: "Seoul Industry ISO 14001:2015 environmental management system certificate",
      },
    ],
  },
  ja: {
    heading: "量産品質と環境マネジメントを支える認証",
    intro: "IATF 16949と現代モービスMSQに基づく量産品質管理に加え、ISO 14001の認証範囲に沿って自動車用ステアリング部品の製造・サービスに関する環境マネジメントシステムを運用しています。",
    originalLabel: "認証書を見る",
    items: [
      {
        eyebrow: "AUTOMOTIVE QUALITY MANAGEMENT",
        title: "IATF 16949:2016",
        copy: "認証機関のIntertekが、ステアリング・エンジン・トランスミッション部品の製造および加工に関するソウル産業の品質マネジメントシステムを認証しました。",
        metadata: ["認証番号 2022-0205", "有効期限 2027.05.23"],
        alt: "ソウル産業 IATF 16949:2016認証書",
      },
      {
        eyebrow: "MOBIS SUPPLIER QUALITY",
        title: "MSQ認証",
        copy: "現代モービスのサプライヤー品質認証評価において、加工分野Gグレードを取得したソウル産業のMSQ認証書です。",
        metadata: ["認証番号 MWK0276", "発行日 2025.01.08"],
        alt: "ソウル産業 MSQ認証書",
      },
      {
        eyebrow: "ENVIRONMENTAL MANAGEMENT",
        title: "ISO 14001:2015",
        copy: "自動車用ステアリング部品の製造・サービスを認証範囲とする、ソウル産業の環境マネジメントシステム認証です。",
        metadata: ["認証番号 JEK-2330", "有効期限 2027.05.06"],
        alt: "ソウル産業 ISO 14001:2015環境マネジメントシステム認証書",
      },
    ],
  },
};

const certificateAssets = [
  { image: iatfCertificateImage, href: iatfCertificatePdf },
  { image: msqCertificateImage, href: msqCertificateImage },
  { image: iso14001CertificateImage, href: iso14001CertificatePdf },
];

type SustainabilityPolicyCopy = {
  statement: { eyebrow: string; title: string; copy: string };
  meta: Array<{ label: string; value: string }>;
  governance: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{ title: string; copy: string }>;
  };
  pillars: Array<{ letter: string; title: string; label: string; copy: string; items: string[] }>;
  domains: {
    eyebrow: string;
    title: string;
    copy: string;
    items: Array<{ tag: string; title: string; copy: string }>;
  };
  execution: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; copy: string }>;
    evidenceTitle: string;
    evidenceItems: Array<{ tag: string; title: string; copy: string }>;
  };
  document: { eyebrow: string; title: string; copy: string; dateLabel: string; date: string; download: string };
};

const sustainabilityPolicyCopy: Record<RenewalLanguage, SustainabilityPolicyCopy> = {
  ko: {
    statement: {
      eyebrow: "SUSTAINABILITY MANAGEMENT POLICY",
      title: "책임 있는 제조를 모든 경영 판단의 기준으로 삼습니다.",
      copy: "서울산업은 환경·사회·지배구조 요구사항과 자동차 공급망 지속가능성 평가 기준인 SAQ 5.0을 경영 전반에 반영하고, 사업장과 공급망이 함께 준수해야 할 지속가능경영 원칙을 운영합니다.",
    },
    meta: [
      { label: "적용 대상", value: "전 임직원·사업장·사업 활동·협력사" },
      { label: "운영 기준", value: "ESG·환경·안전·인권·윤리" },
      { label: "공급망 기준", value: "SAQ 5.0 요구사항 반영" },
    ],
    governance: {
      eyebrow: "POLICY FOUNDATION",
      title: "정책의 목적과 적용 원칙",
      copy: "지속가능성을 별도의 활동으로 두지 않고 사업 운영의 핵심 요소로 통합합니다. 최고경영진이 이행을 감독하고 필요한 자원을 제공하며, 모든 구성원이 각자의 업무에서 정책을 준수합니다.",
      items: [
        { title: "경영 통합", copy: "ESG를 사업 전략과 일상적인 의사결정의 핵심 요소로 반영합니다." },
        { title: "전사 적용", copy: "모든 임직원, 사업장, 운영 활동과 서울산업의 공급망에 동일하게 적용합니다." },
        { title: "경영진 책임", copy: "최고경영진이 정책의 실행과 준수 여부를 감독하고 필요한 자원을 제공합니다." },
      ],
    },
    pillars: [
      {
        letter: "E",
        title: "Environmental",
        label: "환경 책임",
        copy: "오염과 자원 사용을 줄이고 사업 활동이 자연환경에 미치는 영향을 사전에 관리합니다.",
        items: ["에너지 효율 향상과 온실가스 감축", "폐기물·대기 배출·폐수 및 유해 물질 관리", "생물다양성·토지 이용·산림 훼손 리스크 점검", "소음 측정과 환경 사고 비상 대응"],
      },
      {
        letter: "S",
        title: "Social",
        label: "사람과 지역사회",
        copy: "안전하고 건강한 근무 환경을 제공하고 모든 노동자의 기본 권리와 존엄을 보호합니다.",
        items: ["아동노동·강제노동·차별 금지", "공정한 근로조건과 안전보건 환경", "지역사회 발전 기여", "공급망 내 국제 동물복지 기준 준수"],
      },
      {
        letter: "G",
        title: "Governance",
        label: "윤리와 투명성",
        copy: "공정거래, 정보보호, 책임 있는 공급망을 투명한 경영의 기본 기준으로 운영합니다.",
        items: ["뇌물·부패·부당 이익 금지", "공정 거래 및 이해 상충 방지", "개인·기업 정보 보호", "협력사 ESG 평가와 시정 조치"],
      },
    ],
    domains: {
      eyebrow: "POLICY COMMITMENTS",
      title: "서울산업의 지속가능경영 세부 원칙",
      copy: "환경, 사회, 윤리, 정보보호와 공급망 전반에서 지켜야 할 기준을 구체적인 실행 원칙으로 운영합니다.",
      items: [
        { tag: "ENVIRONMENT", title: "환경경영", copy: "폐기물, 대기 배출, 폐수 등 환경 오염을 최소화하고 에너지 효율과 온실가스 감축을 추진하며 유해 물질을 안전하게 관리합니다." },
        { tag: "NATURE", title: "생물다양성·토지·산림", copy: "생태계 영향을 최소화하고 운영 전 토지 이용 리스크를 평가하며, 공급망에서 산림 훼손에 기여하는 원자재 사용을 금지합니다." },
        { tag: "EMISSIONS", title: "소음·오염·비상 대응", copy: "법적 기준에 맞춰 소음을 정기 측정하고 토양·대기·수질 오염을 예방하며 환경 사고 비상 대응 체계를 유지합니다." },
        { tag: "PEOPLE", title: "인권·안전·지역사회", copy: "안전하고 건강한 작업 환경과 공정한 근로 조건을 제공하고 아동 노동, 강제 노동, 차별을 금지하며 지역사회 발전에 기여합니다." },
        { tag: "WELFARE", title: "동물복지", copy: "동물에 대한 학대와 불필요한 위해를 금지하고 공급망 안에서 국제 동물복지 기준을 준수합니다." },
        { tag: "ETHICS", title: "윤리·공정거래", copy: "공정거래 및 이해상충 방지 서약을 따르고 뇌물, 부패, 부당한 이익을 금지하며 투명하고 책임 있는 거래를 유지합니다." },
        { tag: "DATA", title: "정보 보호", copy: "개인 정보와 기업 정보를 무단 접근과 오용으로부터 보호하고 관련 법규와 고객의 정보 보호 요구사항을 준수합니다." },
        { tag: "SUPPLY CHAIN", title: "지속가능한 공급망", copy: "협력사가 본 정책을 준수하도록 요구하고 SAQ 5.0에 부합하는 ESG 평가와 시정 조치를 실시합니다." },
      ],
    },
    execution: {
      eyebrow: "IMPLEMENTATION & IMPROVEMENT",
      title: "목표를 세우고 점검하며 지속적으로 개선합니다.",
      items: [
        { title: "목표 수립", copy: "환경·사회·윤리·공급망 분야의 지속가능경영 목표와 관리 항목을 정합니다." },
        { title: "성과 모니터링", copy: "정책 이행 현황과 목표 대비 성과를 정기적으로 확인하고 기록합니다." },
        { title: "평가와 시정", copy: "내부 감사, 외부 평가, 고객 평가와 SAQ 5.0 결과를 바탕으로 필요한 시정 조치를 시행합니다." },
        { title: "책임과 개선", copy: "경영진과 모든 임직원이 정책 준수에 책임을 지고 평가 결과를 다음 개선 활동에 반영합니다." },
      ],
      evidenceTitle: "현장 실행 근거",
      evidenceItems: [
        { tag: "ENERGY DATA", title: "에너지 데이터 관리", copy: "전력 관련 지표를 월별로 확인해 변화 추세를 파악하고 외부 에너지 진단을 추진합니다." },
        { tag: "ELECTRICAL SAFETY", title: "전기 설비 안전 점검", copy: "전기 설비 정기 안전 점검을 실시하고 점검 이력을 관리해 생산 현장의 안전 기반을 유지합니다." },
      ],
    },
    document: {
      eyebrow: "OFFICIAL POLICY",
      title: "서울산업 지속가능경영정책",
      copy: "환경, 인권, 안전, 윤리와 공급망 전반에 적용하는 운영 원칙과 실행 책임을 담았습니다.",
      dateLabel: "시행일",
      date: "2025.11.21",
      download: "정책 문서 다운로드",
    },
  },
  en: {
    statement: {
      eyebrow: "SUSTAINABILITY MANAGEMENT POLICY",
      title: "Responsible manufacturing guides every business decision.",
      copy: "Seoul Industry integrates environmental, social, and governance requirements, including SAQ 5.0, across its operations and supply chain.",
    },
    meta: [
      { label: "Scope", value: "Employees, sites, operations, and suppliers" },
      { label: "Standards", value: "ESG, environment, safety, human rights, and ethics" },
      { label: "Supply Chain", value: "Aligned with SAQ 5.0 requirements" },
    ],
    governance: {
      eyebrow: "POLICY FOUNDATION",
      title: "Purpose, scope, and governance",
      copy: "Sustainability is integrated as a core element of business management. Top management oversees implementation, provides the necessary resources, and holds every employee responsible for compliance.",
      items: [
        { title: "Management Integration", copy: "ESG principles are embedded in business strategy and day-to-day decisions." },
        { title: "Company-wide Scope", copy: "The policy applies to all employees, business sites, operations, and suppliers." },
        { title: "Executive Oversight", copy: "Top management ensures implementation, enforcement, and adequate resources." },
      ],
    },
    pillars: [
      {
        letter: "E",
        title: "Environmental",
        label: "Environmental Responsibility",
        copy: "We reduce pollution and resource use while managing the impact of our operations on nature.",
        items: ["Energy efficiency and greenhouse-gas reduction", "Waste, emissions, wastewater, and hazardous substances", "Biodiversity, land-use, and deforestation risk", "Noise measurement and environmental emergency response"],
      },
      {
        letter: "S",
        title: "Social",
        label: "People and Communities",
        copy: "We provide a safe and healthy workplace while protecting fundamental rights and dignity.",
        items: ["No child labor, forced labor or discrimination", "Fair working conditions and occupational safety", "Contribution to local communities", "International animal-welfare standards in the supply chain"],
      },
      {
        letter: "G",
        title: "Governance",
        label: "Ethics and Transparency",
        copy: "Fair trade, data protection and a responsible supply chain form the basis of transparent management.",
        items: ["No bribery, corruption or improper benefits", "Fair trade and conflict-of-interest prevention", "Protection of personal and corporate information", "Supplier ESG assessments and corrective action"],
      },
    ],
    domains: {
      eyebrow: "POLICY COMMITMENTS",
      title: "Our sustainability commitments",
      copy: "The official policy translates environmental, social, ethical, data-protection, and supply-chain requirements into clear operating commitments.",
      items: [
        { tag: "ENVIRONMENT", title: "Environmental Management", copy: "Minimize waste, air emissions and wastewater, improve energy efficiency, reduce greenhouse gases, and manage hazardous substances safely." },
        { tag: "NATURE", title: "Biodiversity, Land and Forests", copy: "Minimize ecological impacts, assess land-use risks before operations, and prohibit materials that contribute to deforestation." },
        { tag: "EMISSIONS", title: "Noise, Pollution, and Emergency Response", copy: "Measure and manage noise, prevent soil, air, and water contamination, and maintain environmental emergency-response systems." },
        { tag: "PEOPLE", title: "Human Rights, Safety and Community", copy: "Provide safe and fair working conditions, prohibit child labor, forced labor and discrimination, and contribute to local communities." },
        { tag: "WELFARE", title: "Animal Welfare", copy: "Prohibit cruelty and unnecessary harm and uphold international animal-welfare standards throughout the supply chain." },
        { tag: "ETHICS", title: "Ethics and Fair Trade", copy: "Prevent bribery, corruption, improper benefits and conflicts of interest while maintaining transparent and fair business practices." },
        { tag: "DATA", title: "Data Protection", copy: "Protect personal and corporate information from unauthorized access or misuse and meet legal and customer requirements." },
        { tag: "SUPPLY CHAIN", title: "Sustainable Supply Chain", copy: "Require suppliers to follow this policy and conduct ESG assessments and corrective actions aligned with SAQ 5.0." },
      ],
    },
    execution: {
      eyebrow: "IMPLEMENTATION & IMPROVEMENT",
      title: "Set goals, monitor performance and improve continuously.",
      items: [
        { title: "Set Objectives", copy: "Define sustainability objectives and management priorities across environment, people, ethics, and supply chain." },
        { title: "Monitor Performance", copy: "Review implementation status and performance against objectives on a regular basis." },
        { title: "Assess and Correct", copy: "Use internal audits, external evaluations, customer assessments and SAQ 5.0 results to drive corrective action." },
        { title: "Own and Improve", copy: "Management and employees share responsibility for compliance and feed evaluation results into continuous improvement." },
      ],
      evidenceTitle: "Shop-floor implementation evidence",
      evidenceItems: [
        { tag: "ENERGY DATA", title: "Energy data management", copy: "Review power-related indicators monthly, track trends, and pursue third-party energy audits." },
        { tag: "ELECTRICAL SAFETY", title: "Electrical safety inspections", copy: "Conduct regular electrical-equipment safety inspections and retain the inspection history that supports safe production." },
      ],
    },
    document: {
      eyebrow: "OFFICIAL POLICY",
      title: "Seoul Industry Sustainability Management Policy",
      copy: "The policy defines the environmental, human-rights, safety, ethics, and supply-chain principles that guide our operations.",
      dateLabel: "Effective",
      date: "21 November 2025",
      download: "Download policy",
    },
  },
  ja: {
    statement: {
      eyebrow: "SUSTAINABILITY MANAGEMENT POLICY",
      title: "責任ある製造を、すべての経営判断の基準とします。",
      copy: "ソウル産業は、SAQ 5.0を含む環境・社会・ガバナンス要件を事業運営とサプライチェーン全体に反映します。",
    },
    meta: [
      { label: "適用範囲", value: "全従業員・事業所・事業活動・サプライヤー" },
      { label: "運用基準", value: "ESG・環境・安全・人権・倫理" },
      { label: "サプライチェーン", value: "SAQ 5.0要件を反映" },
    ],
    governance: {
      eyebrow: "POLICY FOUNDATION",
      title: "方針の目的と適用原則",
      copy: "サステナビリティを事業経営の中核要素として統合します。最高経営層が実施を監督し、必要な資源を提供するとともに、すべての従業員が各業務で方針を遵守します。",
      items: [
        { title: "経営への統合", copy: "ESGを事業戦略と日常の意思決定に組み込みます。" },
        { title: "全社への適用", copy: "全従業員、事業所、事業活動およびサプライヤーに同じ基準を適用します。" },
        { title: "経営者の責任", copy: "最高経営層が方針の実施と遵守を監督し、必要な資源を提供します。" },
      ],
    },
    pillars: [
      {
        letter: "E",
        title: "Environmental",
        label: "環境責任",
        copy: "汚染と資源使用を抑え、事業活動が自然環境に与える影響を事前に管理します。",
        items: ["エネルギー効率向上と温室効果ガス削減", "廃棄物・大気排出・排水・有害物質管理", "生物多様性・土地利用・森林破壊リスク", "騒音測定と環境事故への緊急対応"],
      },
      {
        letter: "S",
        title: "Social",
        label: "人と地域社会",
        copy: "安全で健康的な職場を提供し、すべての労働者の基本的権利と尊厳を守ります。",
        items: ["児童労働・強制労働・差別の禁止", "公正な労働条件と労働安全衛生", "地域社会の発展への貢献", "サプライチェーンでの国際動物福祉基準"],
      },
      {
        letter: "G",
        title: "Governance",
        label: "倫理と透明性",
        copy: "公正取引、情報保護、責任あるサプライチェーンを透明性の高い経営の基本とします。",
        items: ["贈収賄・腐敗・不当な利益の禁止", "公正取引と利益相反の防止", "個人・企業情報の保護", "サプライヤーのESG評価と是正措置"],
      },
    ],
    domains: {
      eyebrow: "POLICY COMMITMENTS",
      title: "ソウル産業のサステナビリティ原則",
      copy: "公式方針に定めた環境、社会、倫理、情報保護、サプライチェーン要件を実行項目別に整理しています。",
      items: [
        { tag: "ENVIRONMENT", title: "環境マネジメント", copy: "廃棄物、大気排出、排水を最小化し、エネルギー効率と温室効果ガス削減を進め、有害物質を安全に管理します。" },
        { tag: "NATURE", title: "生物多様性・土地・森林", copy: "生態系への影響を最小化し、操業前に土地利用リスクを評価するとともに、森林破壊につながる原材料の使用を禁止します。" },
        { tag: "EMISSIONS", title: "騒音・汚染・緊急対応", copy: "騒音を定期的に測定し、土壌・大気・水質の汚染を防止するとともに、環境事故への緊急対応体制を維持します。" },
        { tag: "PEOPLE", title: "人権・安全・地域社会", copy: "安全で公正な労働条件を提供し、児童労働、強制労働、差別を禁止し、地域社会の発展に貢献します。" },
        { tag: "WELFARE", title: "動物福祉", copy: "動物への虐待と不必要な危害を禁止し、サプライチェーンで国際的な動物福祉基準を遵守します。" },
        { tag: "ETHICS", title: "倫理・公正取引", copy: "贈収賄、腐敗、不当な利益、利益相反を防止し、透明で公正な取引慣行を維持します。" },
        { tag: "DATA", title: "情報保護", copy: "個人情報と企業情報を不正アクセスや不正利用から保護し、法令および顧客要求を遵守します。" },
        { tag: "SUPPLY CHAIN", title: "持続可能なサプライチェーン", copy: "サプライヤーに本方針の遵守を求め、SAQ 5.0に沿ったESG評価と是正措置を実施します。" },
      ],
    },
    execution: {
      eyebrow: "IMPLEMENTATION & IMPROVEMENT",
      title: "目標を定め、実績を確認し、継続的に改善します。",
      items: [
        { title: "目標設定", copy: "環境、人、倫理、サプライチェーンに関するサステナビリティ目標と管理項目を定めます。" },
        { title: "実績モニタリング", copy: "方針の実施状況と目標に対する実績を定期的に確認し、記録します。" },
        { title: "評価と是正", copy: "内部監査、外部評価、顧客評価、SAQ 5.0の結果に基づき必要な是正措置を実施します。" },
        { title: "責任と改善", copy: "経営層と全従業員が遵守責任を担い、評価結果を継続的改善に反映します。" },
      ],
      evidenceTitle: "現場での取り組み実績",
      evidenceItems: [
        { tag: "ENERGY DATA", title: "エネルギーデータ管理", copy: "電力関連指標を月次で確認して変化傾向を把握し、外部エネルギー診断を推進します。" },
        { tag: "ELECTRICAL SAFETY", title: "電気設備安全点検", copy: "電気設備の定期安全点検を実施し、点検履歴を管理して生産現場の安全基盤を維持します。" },
      ],
    },
    document: {
      eyebrow: "OFFICIAL POLICY",
      title: "ソウル産業 サステナビリティ経営方針",
      copy: "環境、人権、安全、倫理、サプライチェーンに適用する運用原則と実行責任を定めています。",
      dateLabel: "施行日",
      date: "2025.11.21",
      download: "方針をダウンロード",
    },
  },
};

const recruitCopy: Record<
  RenewalLanguage,
  {
    values: Array<{ title: string; copy: string }>;
    steps: string[];
    jobs: Array<{
      title: string;
      field: string;
      status: string;
      copy: string;
      duties: string[];
      requirements: string[];
      preferred: string[];
    }>;
    posting: {
      duties: string;
      requirements: string;
      preferred: string;
      location: string;
      locationValue: string;
      employment: string;
      employmentValue: string;
      apply: string;
      applyValue: string;
      applyLinkLabel: string;
      applyLink: string;
    };
    benefits: string[];
  }
> = {
  ko: {
    values: [
      { title: "기준을 지키는 사람", copy: "도면과 공정 기준을 정확하게 이해하고 요구되는 품질을 일관되게 구현합니다." },
      { title: "개선을 이어가는 사람", copy: "현장의 작은 불편과 품질 흔들림을 발견하고 더 나은 방법을 제안합니다." },
      { title: "함께 완성하는 사람", copy: "생산, 품질, 개발, 관리가 하나의 흐름으로 움직이도록 소통합니다." },
    ],
    steps: ["지원서 접수", "서류 전형", "실무 면접", "입사"],
    jobs: [
      {
        title: "정밀 가공·생산 기술",
        field: "생산·기술",
        status: "상시 채용",
        copy: "공정 조건, 설비 세팅, 생산성 개선",
        duties: ["공정 조건 설정과 설비 세팅", "가공 품질 안정화와 생산성 개선", "신규 부품 양산 준비 지원"],
        requirements: ["기계·생산 관련 전공 또는 동등한 실무 경력"],
        preferred: ["자동차 부품 양산 경험", "CNC 선반·머시닝센터·호빙 등 절삭 설비 운용 경험"],
      },
      {
        title: "자동차 부품 품질 관리",
        field: "품질",
        status: "상시 채용",
        copy: "수입·공정·출하 검사, 고객 품질 대응",
        duties: ["수입·공정·출하 검사 운영", "고객 품질 이슈 대응과 시정 조치", "측정 데이터 관리와 검사 기준 정비"],
        requirements: ["품질·기계 관련 전공 또는 동등한 실무 경력"],
        preferred: ["자동차 부품 품질 업무 경험", "IATF 16949 체계 운영, CMM·기어 측정기 사용 경험"],
      },
      {
        title: "생산 관리·자재",
        field: "생산 관리",
        status: "인재풀 등록",
        copy: "생산 계획, 자재 흐름, 납기 관리",
        duties: ["생산 계획 수립과 진도 관리", "자재 입출고와 재고 흐름 관리", "납기 관리와 고객 출하 대응"],
        requirements: ["산업공학·경영 관련 전공 또는 동등한 실무 경력"],
        preferred: ["자동차 부품 생산 관리 경험", "생산 관리 시스템 운용 경험"],
      },
    ],
    posting: {
      duties: "담당 업무",
      requirements: "자격 요건",
      preferred: "우대 사항",
      location: "근무지",
      locationValue: "경기도 화성시 본사·공장",
      employment: "고용 형태",
      employmentValue: "정규직",
      apply: "지원 방법",
      applyValue: "채용 플랫폼(잡코리아)에서 지원",
      applyLinkLabel: "리크루팅 플랫폼 링크 바로가기",
      applyLink: "https://www.jobkorea.co.kr/",
    },
    benefits: ["직무·품질 교육", "건강검진", "경조사 지원", "통근·식사 지원", "장기근속 포상", "자격증 지원"],
  },
  en: {
    values: [
      { title: "Uphold Standards", copy: "Understand drawings and process requirements precisely, and deliver consistent quality." },
      { title: "Continue Improving", copy: "Identify minor shop-floor issues and quality variation, then suggest better methods." },
      { title: "Build Together", copy: "Connect production, quality, development, and administration through clear communication." },
    ],
    steps: ["Apply", "Document Screening", "Interview", "Onboarding"],
    jobs: [
      {
        title: "Precision Machining Engineer",
        field: "Production · Engineering",
        status: "Open year-round",
        copy: "Process conditions, equipment setup, and productivity improvement",
        duties: ["Set process conditions and machine setups", "Stabilize machining quality and improve productivity", "Support production readiness for new parts"],
        requirements: ["Degree in mechanical or production engineering, or equivalent hands-on experience"],
        preferred: ["Series-production experience with automotive components", "Experience operating CNC lathes, machining centers, or hobbing machines"],
      },
      {
        title: "Automotive Quality Engineer",
        field: "Quality",
        status: "Open year-round",
        copy: "Incoming, in-process, and final inspection, plus customer quality support",
        duties: ["Run incoming, in-process, and outgoing inspection", "Handle customer quality issues and corrective actions", "Manage measurement data and maintain inspection standards"],
        requirements: ["Degree in quality or mechanical engineering, or equivalent hands-on experience"],
        preferred: ["Quality experience with automotive components", "Experience with IATF 16949 systems and CMM or gear-measuring equipment"],
      },
      {
        title: "Production & Materials Management",
        field: "Production Control",
        status: "Talent Pool",
        copy: "Production planning, material flow, and delivery management",
        duties: ["Build production plans and track progress", "Manage material receipt, issue, and inventory flow", "Manage delivery schedules and customer shipments"],
        requirements: ["Degree in industrial engineering or business, or equivalent hands-on experience"],
        preferred: ["Production-control experience with automotive components", "Experience with production management systems"],
      },
    ],
    posting: {
      duties: "Responsibilities",
      requirements: "Requirements",
      preferred: "Preferred",
      location: "Location",
      locationValue: "Head office and plant, Hwaseong, Gyeonggi-do",
      employment: "Employment type",
      employmentValue: "Full-time, permanent",
      apply: "How to apply",
      applyValue: "Apply through our recruiting platform (JobKorea)",
      applyLinkLabel: "Go to recruiting platform",
      applyLink: "https://www.jobkorea.co.kr/",
    },
    benefits: ["Job and quality training", "Health checks", "Family event and bereavement support", "Transportation and meal support", "Long-service awards", "Professional certification support"],
  },
  ja: {
    values: [
      { title: "基準を守る人", copy: "図面と工程基準を正確に理解し、求められる品質を安定して実現します。" },
      { title: "改善を続ける人", copy: "現場の小さな不便や品質変動を見つけ、より良い方法を提案します。" },
      { title: "協働して成果を生み出す人", copy: "生産・品質・開発・管理が一体となって進められるよう連携します。" },
    ],
    steps: ["応募受付", "書類選考", "実務面接", "入社"],
    jobs: [
      {
        title: "精密加工・生産技術",
        field: "生産・技術",
        status: "随時募集中",
        copy: "工程条件、設備セットアップ、生産性改善",
        duties: ["工程条件の設定と設備セットアップ", "加工品質の安定化と生産性改善", "新規部品の量産準備支援"],
        requirements: ["機械・生産系の専攻、または同等の実務経験"],
        preferred: ["自動車部品の量産経験", "CNC旋盤・マシニングセンタ・ホブ盤などの切削設備の運用経験"],
      },
      {
        title: "自動車部品の品質管理",
        field: "品質",
        status: "随時募集中",
        copy: "受入・工程・出荷検査、顧客品質対応",
        duties: ["受入・工程・出荷検査の運営", "顧客品質問題への対応と是正処置", "測定データの管理と検査基準の整備"],
        requirements: ["品質・機械系の専攻、または同等の実務経験"],
        preferred: ["自動車部品の品質業務経験", "IATF 16949体系の運用、CMM・歯車測定機の使用経験"],
      },
      {
        title: "生産管理・資材",
        field: "生産管理",
        status: "キャリア登録",
        copy: "生産計画、資材フロー、納期管理",
        duties: ["生産計画の立案と進捗管理", "資材の入出庫と在庫フローの管理", "納期管理と顧客への出荷対応"],
        requirements: ["経営工学・経営系の専攻、または同等の実務経験"],
        preferred: ["自動車部品の生産管理経験", "生産管理システムの運用経験"],
      },
    ],
    posting: {
      duties: "担当業務",
      requirements: "応募資格",
      preferred: "歓迎要件",
      location: "勤務地",
      locationValue: "京畿道華城市 本社・工場",
      employment: "雇用形態",
      employmentValue: "正社員",
      apply: "応募方法",
      applyValue: "採用プラットフォーム（JobKorea）から応募",
      applyLinkLabel: "採用プラットフォームへ",
      applyLink: "https://www.jobkorea.co.kr/",
    },
    benefits: ["職務・品質教育", "健康診断", "慶弔見舞金・休暇", "通勤・食事補助", "長期勤続表彰", "資格取得支援"],
  },
};

const productImages = [balanceModuleImage, automotiveImage, steeringImage, powertrainImage, drivelineImage];

const equipmentVisuals: Record<string, Array<{ image: string; label: string }>> = {
  machining: [
    { image: cncLatheEquipmentImage, label: "CNC LATHE" },
    { image: cncMachiningCenterEquipmentImage, label: "CNC MCT" },
  ],
  "gear-spline": [
    { image: hobbingEquipmentImage, label: "CNC HOBBING" },
    { image: shapingEquipmentImage, label: "SHAPING" },
    { image: broachingEquipmentImage, label: "BROACHING" },
    { image: rackRollingEquipmentImage, label: "RACK ROLLING" },
  ],
  finishing: [
    { image: grindingEquipmentImage, label: "CNC GRINDING" },
    { image: inductionHardeningEquipmentImage, label: "INDUCTION HARDENING" },
  ],
  "automation-inspection": [
    { image: straightenerEquipmentImage, label: "STRAIGHTENER" },
    { image: automaticInspectionEquipmentImage, label: "AUTO INSPECTION" },
    { image: gearMeasuringEquipmentImage, label: "GEAR MEASURING" },
    { image: cmmEquipmentImage, label: "CMM" },
  ],
};

const ceoCopy: Record<RenewalLanguage, { quote: string; paragraphs: string[]; sign: string }> = {
  ko: {
    quote: "정밀함과 일관된 품질로 신뢰에 답하고, 지속 가능한 성장을 이어가겠습니다.",
    paragraphs: [
      "안녕하십니까. 서울산업 홈페이지를 찾아주셔서 감사합니다.",
      "서울산업(주)는 1985년 설립 이후 자동차 부품 정밀가공 기술을 축적하며 고객과 함께 성장해 왔습니다.",
      "40여 년간 쌓아 온 제조 경험을 바탕으로 국내외 자동차 부품 고객의 다양한 프로그램에 안정적인 품질과 납기로 대응하고 있습니다.",
      "도면 검토부터 공정 설계, 정밀가공, 열처리, 검사와 양산 관리까지 전 과정을 긴밀하게 연결해 고객의 요구사항을 정확히 구현하겠습니다.",
      "앞으로도 끊임없는 기술 개발과 현장 개선을 통해 신뢰받는 자동차 부품 제조 파트너이자 사회에 책임을 다하는 기업으로 나아가겠습니다.",
    ],
    sign: "서울산업(주) 대표이사 김을식",
  },
  en: {
    quote: "Earning trust through precision, consistency, and responsible growth.",
    paragraphs: [
      "Thank you for visiting Seoul Industry.",
      "Since our founding in 1985, we have grown alongside our customers by building deep expertise in precision machining for automotive components.",
      "Over four decades of manufacturing experience enable us to support diverse automotive-component programs in Korea and overseas with consistent quality and dependable delivery.",
      "From drawing review and process design to machining, heat treatment, inspection, and mass-production control, we connect every stage to meet each requirement with precision.",
      "We will continue to invest in technology and continuous improvement to remain a trusted manufacturing partner and a responsible member of the communities we serve.",
    ],
    sign: "Eul-Sik Kim, President & CEO",
  },
  ja: {
    quote: "精密さと一貫した品質で信頼に応え、持続的な成長を目指します。",
    paragraphs: [
      "ソウル産業のウェブサイトをご覧いただき、誠にありがとうございます。",
      "当社は1985年の設立以来、自動車部品の精密加工技術を磨き、お客様とともに成長してまいりました。",
      "40年以上にわたるものづくりの経験を生かし、韓国内外の多様な自動車部品プログラムに、安定した品質と確かな納期で対応しています。",
      "図面検討から工程設計、精密加工、熱処理、検査、量産管理までを緊密につなぎ、お客様の要求を正確に製品へ反映してまいります。",
      "今後も技術開発と現場改善を重ね、信頼される製造パートナーとして、社会に責任を果たす企業を目指します。",
    ],
    sign: "ソウル産業株式会社 代表取締役 金乙植",
  },
};

const productRouteIndex: Record<string, number> = {
  "products/balance-shaft-module": 0,
  "products/electric-vehicle": 1,
  "products/steering": 2,
  "products/powertrain": 3,
  "products/driveline": 4,
  "products/etc": 5,
};

const productRouteDisplayIndex: Record<string, number> = {
  "products/steering": 1,
  "products/powertrain": 2,
  "products/driveline": 3,
  "products/electric-vehicle": 4,
  "products/balance-shaft-module": 5,
};

const productRouteImages: Record<string, string> = {
  "products/balance-shaft-module": balanceModuleImage,
  "products/electric-vehicle": automotiveImage,
  "products/steering": steeringImage,
  "products/powertrain": powertrainImage,
  "products/driveline": drivelineImage,
  "products/etc": defenseSpecialProjectsImage,
};

const bodyLabels: Record<
  RenewalLanguage,
  {
    application: string;
    manufacturing: string;
    qualityFlow: string;
    policyStatement: string;
    developmentFlow: string;
    office: string;
    directions: string;
    map: string;
    recruitmentOpenings: string;
    welfare: string;
  }
> = {
  ko: {
    application: "핵심 가공·검증 항목",
    manufacturing: "제품별 제조 대응",
    qualityFlow: "품질 관리 흐름",
    policyStatement: "서울산업 품질방침",
    developmentFlow: "부품 개발 프로세스",
    office: "본사·공장",
    directions: "방문 안내",
    map: "지도에서 보기",
    recruitmentOpenings: "모집 직무",
    welfare: "복지 지원",
  },
  en: {
    application: "Key process controls",
    manufacturing: "Manufacturing Capabilities",
    qualityFlow: "Quality Control Flow",
    policyStatement: "Seoul Industry Quality Policy",
    developmentFlow: "Parts Development Process",
    office: "Head Office & Factory",
    directions: "Visit Information",
    map: "View on Map",
    recruitmentOpenings: "Open Roles",
    welfare: "Employee Support",
  },
  ja: {
    application: "主な加工・検証項目",
    manufacturing: "製品別製造対応",
    qualityFlow: "品質管理フロー",
    policyStatement: "ソウル産業 品質方針",
    developmentFlow: "部品開発プロセス",
    office: "本社・工場",
    directions: "訪問案内",
    map: "地図で見る",
    recruitmentOpenings: "募集職種",
    welfare: "福利厚生",
  },
};

type QualityPrinciple = {
  title: string;
  english: string;
  statement: string;
  actions: string[];
  outcome: string;
};

const qualityPolicyCopy: Record<
  RenewalLanguage,
  {
    headline: string;
    introduction: string;
    sectionTitle: string;
    sectionCopy: string;
    outcomeLabel: string;
    principles: QualityPrinciple[];
  }
> = {
  ko: {
    headline: "품질은 검사로 가려내는 것이 아니라 공정에서 만들어 냅니다.",
    introduction:
      "서울산업은 고객 요구사항을 개발 단계에서 공정 기준으로 전환하고, 양산 조건과 측정 데이터를 연결해 LOT별 품질 근거를 관리합니다. 발견된 문제는 원인 분석과 효과 검증을 거쳐 표준에 반영하며 재발을 방지합니다.",
    sectionTitle: "일관된 품질을 만드는 네 가지 약속",
    sectionCopy: "고객 요구의 확인부터 공정 예방, 데이터 검증, 재발 방지까지 하나의 관리 체계로 운영합니다.",
    outcomeLabel: "관리 목표",
    principles: [
      {
        title: "고객 요구 우선",
        english: "CUSTOMER REQUIREMENTS",
        statement: "고객 요구를 정확한 공정 기준으로 바꿉니다.",
        actions: [
          "도면·사양·특별특성의 개발 단계 사전 검토",
          "고객별 검사·포장·납품 기준의 문서화",
          "설계 및 4M 변경점의 승인 이력 관리",
        ],
        outcome: "요구사항 누락 방지",
      },
      {
        title: "공정에서 완성",
        english: "BUILT INTO THE PROCESS",
        statement: "검사보다 예방 중심의 공정 설계로 품질을 만듭니다.",
        actions: [
          "PFMEA·관리계획·작업표준의 일관된 연계",
          "가공 조건·공구·치공구·설비 상태의 표준화",
          "소재·외주 공정·초도품의 승인 기준 검증",
        ],
        outcome: "반복 생산 안정화",
      },
      {
        title: "데이터로 검증",
        english: "VERIFIED BY DATA",
        statement: "측정 결과와 생산 이력을 하나의 LOT로 연결합니다.",
        actions: [
          "에어 게이지·비전·CMM·치수 측정 결과 관리",
          "SPC와 공정능력 지표를 통한 변동 감시",
          "설비 조건·검사 결과·작업 이력의 LOT 추적",
        ],
        outcome: "판단 근거와 추적성 확보",
      },
      {
        title: "지속적인 개선",
        english: "CONTINUAL IMPROVEMENT",
        statement: "문제 조치에서 끝내지 않고 재발 방지까지 확인합니다.",
        actions: [
          "불량 원인과 4M 변경점의 체계적 분석",
          "시정·예방조치의 실행 및 효과 검증",
          "개선 결과를 PFMEA·관리계획·표준에 반영",
        ],
        outcome: "재발 방지와 고객 신뢰",
      },
    ],
  },
  en: {
    headline: "Quality is not created by inspection; it is built into every process.",
    introduction:
      "Seoul Industry translates customer requirements into process standards during development and connects production conditions with measurement data to maintain traceable quality evidence for each production lot. Each issue is analyzed, verified, and incorporated into standards to prevent recurrence.",
    sectionTitle: "Four commitments behind consistent quality",
    sectionCopy: "Customer requirements, preventive process controls, data verification, and recurrence prevention operate as one quality system.",
    outcomeLabel: "CONTROL OBJECTIVE",
    principles: [
      {
        title: "Customer Requirements",
        english: "CUSTOMER REQUIREMENTS",
        statement: "We translate customer requirements into precise process criteria.",
        actions: [
          "Early review of drawings, specifications, and special characteristics",
          "Documented customer-specific inspection, packing, and delivery criteria",
          "Controlled approval history for design and 4M changes",
        ],
        outcome: "Complete requirement coverage",
      },
      {
        title: "Built into the Process",
        english: "BUILT INTO THE PROCESS",
        statement: "Prevention-focused process design creates quality before inspection.",
        actions: [
          "Alignment of PFMEA, control plans, and work standards",
          "Standardized machining conditions, tools, fixtures, and equipment",
          "Validation of material, outsourced processes, and first articles",
        ],
        outcome: "Stable, repeatable production",
      },
      {
        title: "Verified by Data",
        english: "VERIFIED BY DATA",
        statement: "Measurement results and production history are connected by lot.",
        actions: [
          "Air gauge, vision, CMM, and dimensional measurement records",
          "SPC and process capability monitoring for variation control",
          "Lot traceability across equipment, inspection, and work history",
        ],
        outcome: "Evidence and traceability",
      },
      {
        title: "Continual Improvement",
        english: "CONTINUAL IMPROVEMENT",
        statement: "Corrective action continues until recurrence is prevented.",
        actions: [
          "Systematic analysis of defect causes and 4M changes",
          "Implementation and effectiveness review of corrective actions",
          "Updates to PFMEA, control plans, and standards from lessons learned",
        ],
        outcome: "Prevention and customer trust",
      },
    ],
  },
  ja: {
    headline: "品質は検査で選別するものではなく、工程で造り込むものです。",
    introduction:
      "ソウル産業は、開発段階で顧客要求を工程基準へ変換し、量産条件と測定データを連携させて、ロットごとの品質根拠を管理します。発生した問題は原因分析と効果確認を経て標準へ反映し、再発を防止します。",
    sectionTitle: "安定した品質を支える4つの約束",
    sectionCopy: "顧客要求の確認、工程での予防、データ検証、再発防止を一つの品質システムとして運用します。",
    outcomeLabel: "管理目標",
    principles: [
      {
        title: "顧客要求を最優先",
        english: "CUSTOMER REQUIREMENTS",
        statement: "顧客要求を明確な工程基準へ変換します。",
        actions: [
          "図面・仕様・特殊特性の開発段階での事前検討",
          "顧客別の検査・梱包・納入基準の文書化",
          "設計および4M変更の承認履歴管理",
        ],
        outcome: "要求事項の抜け漏れ防止",
      },
      {
        title: "工程で造り込む",
        english: "BUILT INTO THE PROCESS",
        statement: "検査より予防を重視した工程設計で品質を造り込みます。",
        actions: [
          "PFMEA・管理計画・作業標準の一貫した連携",
          "加工条件・工具・治具・設備状態の標準化",
          "素材・外注工程・初品の承認基準検証",
        ],
        outcome: "量産の安定化",
      },
      {
        title: "データで検証",
        english: "VERIFIED BY DATA",
        statement: "測定結果と生産履歴をロット単位で関連付けます。",
        actions: [
          "エアゲージ・画像検査・CMM・寸法測定結果の管理",
          "SPCと工程能力指標による変動監視",
          "設備条件・検査結果・作業履歴のロット追跡",
        ],
        outcome: "判断根拠と追跡性の確保",
      },
      {
        title: "継続的改善",
        english: "CONTINUAL IMPROVEMENT",
        statement: "問題への対処で終わらせず、再発防止まで確認します。",
        actions: [
          "不良原因と4M変更点の体系的な分析",
          "是正・予防処置の実行と効果確認",
          "改善結果をPFMEA・管理計画・標準へ反映",
        ],
        outcome: "再発防止と顧客信頼",
      },
    ],
  },
};

const qualityFlow: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "도면·사양 검토", copy: "고객 요구와 특별특성, 검사 기준을 개발 단계에서 확인합니다." },
    { title: "수입·초도 검사", copy: "소재와 외주 공정, 초도품이 승인 기준에 맞는지 검증합니다." },
    { title: "공정 품질 관리", copy: "에어 게이지, 비전, 치수 측정과 SPC로 공정 상태를 확인합니다." },
    { title: "최종·출하 검사", copy: "최종 치수와 외관, 포장, 식별표를 확인한 뒤 출하합니다." },
    { title: "LOT 추적", copy: "검사 결과와 설비 조건, 작업 이력을 LOT 단위로 연결합니다." },
  ],
  en: [
    { title: "Drawing Review", copy: "Customer requirements, special characteristics, and inspection criteria are confirmed." },
    { title: "Incoming & First-Article Inspection", copy: "Materials, outsourced processes, and first articles are validated against approval criteria." },
    { title: "Process Quality", copy: "Air gauges, vision systems, dimensional checks, and SPC monitor process conditions." },
    { title: "Final Inspection & Shipment Release", copy: "Final dimensions, appearance, packing, and identification are checked before shipment." },
    { title: "Lot Traceability", copy: "Inspection, equipment, and work history are connected by production lot." },
  ],
  ja: [
    { title: "図面・仕様検討", copy: "顧客要求、特殊特性、検査基準を開発段階で確認します。" },
    { title: "受入・初品検査", copy: "素材、外注工程、初品を承認基準に照らして検証します。" },
    { title: "工程品質管理", copy: "エアゲージ、画像検査、寸法測定、SPCで工程状態を確認します。" },
    { title: "最終・出荷検査", copy: "最終寸法、外観、梱包、識別票を確認して出荷します。" },
    { title: "ロットトレーサビリティ", copy: "検査結果、設備条件、作業履歴をロット単位で関連付けます。" },
  ],
};

const preventiveFlow: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "위험 요인 식별", copy: "공정 FMEA와 과거 불량 이력을 바탕으로 잠재 위험을 먼저 찾습니다." },
    { title: "관리 계획 수립", copy: "특별특성, 검사 주기, 이상 발생 시 대응 계획과 담당자를 관리계획에 명확히 규정합니다." },
    { title: "초도품 검증", copy: "설비·치공구 조건과 측정 결과를 확인해 양산 승인 전에 문제를 제거합니다." },
    { title: "SPC·자동 보정", copy: "측정 데이터를 기록하고 필요 시 자동 오프셋으로 공정 변동을 줄입니다." },
    { title: "변경점·재발 방지", copy: "4M 변경과 이상 발생 시 원인, 조치, 효과 확인을 하나의 이력으로 관리합니다." },
  ],
  en: [
    { title: "Identify Risk", copy: "Process FMEA and prior defect history reveal potential risks before launch." },
    { title: "Control Plan", copy: "Special characteristics, inspection frequency, reaction plans, and owners are defined." },
    { title: "First-Article Validation", copy: "Equipment, tooling, and measurement results are verified before production approval." },
    { title: "SPC & Automatic Offset Correction", copy: "Measurement data and automatic offset control reduce process variation." },
    { title: "Change Control & Recurrence Prevention", copy: "4M changes and abnormalities are managed from cause through effectiveness review." },
  ],
  ja: [
    { title: "リスク特定", copy: "工程FMEAと過去の不良履歴から潜在リスクを事前に特定します。" },
    { title: "管理計画", copy: "特殊特性、検査頻度、異常時対応計画、担当者を明確にします。" },
    { title: "初品検証", copy: "設備・治工具条件と測定結果を確認し、量産承認前に問題を除去します。" },
    { title: "SPC・自動補正", copy: "測定データと自動オフセットで工程変動を抑えます。" },
    { title: "変更・再発防止", copy: "4M変更や異常について、原因分析から対策・効果確認までを一貫して記録・管理します。" },
  ],
};

type DevelopmentFlowItem = {
  phase: string;
  title: string;
  copy: string;
  output: string;
};

const developmentFlow: Record<RenewalLanguage, DevelopmentFlowItem[]> = {
  ko: [
    {
      phase: "CUSTOMER INPUT",
      title: "요구사항 분석",
      copy: "고객 도면과 소재, 특별특성, 목표 물량, 개발 일정을 함께 검토해 프로젝트의 입력 조건을 명확히 정의합니다.",
      output: "개발 입력조건",
    },
    {
      phase: "PROCESS PLANNING",
      title: "가공성 검토",
      copy: "형상과 공차를 기준으로 공정 순서, 설비, 공구, 치공구, 측정 방법을 검토해 안정적인 제조 방안을 구상합니다.",
      output: "공정 구상안",
    },
    {
      phase: "PROTOTYPE",
      title: "시제품 제작",
      copy: "초도 가공과 정밀 측정을 반복하며 형상, 조립성, 핵심 치수와 기능 요구가 설계 의도에 맞는지 확인합니다.",
      output: "시제품 검증 결과",
    },
    {
      phase: "APQP",
      title: "공정 설계",
      copy: "PFMEA와 관리계획, 작업표준, 검사 기준, LOT 추적 체계를 연결해 양산 공정의 관리 조건을 확정합니다.",
      output: "양산 관리 기준",
    },
    {
      phase: "PPAP",
      title: "양산 검증",
      copy: "공정 능력과 반복 생산성, 측정 신뢰성, 포장·출하 조건을 검증하고 고객 승인에 필요한 근거를 완성합니다.",
      output: "양산 승인 결과",
    },
    {
      phase: "SOP",
      title: "양산 이관",
      copy: "승인된 조건을 현장 표준으로 이관하고 작업·검사·변경 이력을 연결해 안정적인 양산 상태를 유지합니다.",
      output: "현장 표준·변경이력",
    },
  ],
  en: [
    { phase: "CUSTOMER INPUT", title: "Requirement Analysis", copy: "We define project inputs by reviewing drawings, materials, special characteristics, target volume, and timing.", output: "Development inputs" },
    { phase: "PROCESS PLANNING", title: "Feasibility Review", copy: "Geometry and tolerances guide the process sequence, equipment, tooling, fixtures, and measurement concept.", output: "Process concept" },
    { phase: "PROTOTYPE", title: "Prototype Build", copy: "Initial machining and precision measurement validate geometry, assembly, key dimensions, and functional requirements.", output: "Prototype validation" },
    { phase: "APQP", title: "Process Design", copy: "PFMEA, control plans, work standards, inspection criteria, and lot traceability are aligned to establish production controls.", output: "Production controls" },
    { phase: "PPAP", title: "Production Validation", copy: "Capability, repeatability, measurement confidence, packing, and shipment conditions are verified for approval.", output: "Launch approval" },
    { phase: "SOP", title: "Production Handover", copy: "Approved conditions are translated into shop-floor standards while work, inspection, and change records remain connected.", output: "Shop-floor standards" },
  ],
  ja: [
    { phase: "CUSTOMER INPUT", title: "要求分析", copy: "図面、素材、特殊特性、目標数量、開発日程を確認し、プロジェクトの入力条件を明確にします。", output: "開発入力条件" },
    { phase: "PROCESS PLANNING", title: "加工性検討", copy: "形状と公差を基準に工程順序、設備、工具、治工具、測定方法を検討します。", output: "工程構想案" },
    { phase: "PROTOTYPE", title: "試作", copy: "初品加工と精密測定を繰り返し、形状、組立性、主要寸法、機能要求を検証します。", output: "試作検証結果" },
    { phase: "APQP", title: "工程設計", copy: "PFMEA、管理計画、作業標準、検査基準、ロット追跡を量産管理条件として確定します。", output: "量産管理基準" },
    { phase: "PPAP", title: "量産検証", copy: "工程能力、量産再現性、測定信頼性、梱包・出荷条件を検証し、承認根拠を整えます。", output: "量産承認結果" },
    { phase: "SOP", title: "量産移管", copy: "承認条件を現場標準へ移管し、作業・検査・変更履歴をつないで安定量産を維持します。", output: "現場標準・変更履歴" },
  ],
};

const developmentRoadmapCopy: Record<RenewalLanguage, { eyebrow: string; title: string; copy: string; outputLabel: string }> = {
  ko: {
    eyebrow: "PART DEVELOPMENT ROADMAP",
    title: "도면에서 양산까지, 개발의 여섯 관문",
    copy: "고객 요구를 제조 조건으로 바꾸고, 검증 결과를 현장 표준으로 남기는 서울산업의 부품개발 흐름입니다.",
    outputLabel: "단계 산출물",
  },
  en: {
    eyebrow: "PART DEVELOPMENT ROADMAP",
    title: "Six gates from drawing to production",
    copy: "Seoul Industry turns customer requirements into manufacturing conditions and translates validated results into shop-floor standards.",
    outputLabel: "DELIVERABLE",
  },
  ja: {
    eyebrow: "PART DEVELOPMENT ROADMAP",
    title: "図面から量産まで、開発の6つのゲート",
    copy: "顧客要求を製造条件へ変換し、検証結果を現場標準として定着させる部品開発フローです。",
    outputLabel: "成果物",
  },
};

type LocationCopy = {
  address: string;
  addressLines: string[];
  visit: string;
  email: string;
  transportTitle: string;
  transport: string[];
  parking: string;
  procedureTitle: string;
  procedureNote: string;
  procedure: string[];
};

const locationCopy: Record<RenewalLanguage, LocationCopy> = {
  ko: {
    address: "경기도 화성시 양감면 요당길320번길 51 서울산업(주)",
    addressLines: ["경기도 화성시 양감면", "요당길320번길 51 서울산업(주)"],
    visit: "공장 방문은 사전 협의가 필요합니다. 도착 전 담당자에게 연락해 주십시오.",
    email: "sales@seoulind.co.kr",
    transportTitle: "교통 안내",
    transport: ["서해안고속도로 발안IC 또는 평택제천고속도로 청북IC 이용", "인천국제공항에서 차량으로 약 1시간 30분 내외"],
    parking: "방문객 주차: 정문 안내실 앞",
    procedureTitle: "방문 절차",
    procedureNote: "방문 당일 원활한 출입을 위해 아래 순서로 진행됩니다.",
    procedure: ["담당자와 방문 일정 협의", "정문 안내실에서 출입 등록", "안전 수칙 안내 후 입장"],
  },
  en: {
    address: "51, Yodang-gil 320beon-gil, Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Republic of Korea",
    addressLines: ["51, Yodang-gil 320beon-gil,", "Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Republic of Korea"],
    visit: "Factory visits require advance coordination. Please contact your Seoul Industry representative before arriving.",
    email: "sales@seoulind.co.kr",
    transportTitle: "Getting here",
    transport: [
      "Exit at Balan IC on the Seohaean Expressway or Cheongbuk IC on the Pyeongtaek–Jecheon Expressway",
      "About 1 hour 30 minutes by car from Incheon International Airport",
    ],
    parking: "Visitor parking: in front of the main-gate reception",
    procedureTitle: "Visit procedure",
    procedureNote: "On the day of your visit, access to the plant follows these three steps.",
    procedure: ["Arrange the visit date with your Seoul Industry contact", "Register at the main-gate reception", "Enter after a short safety briefing"],
  },
  ja: {
    address: "51, Yodang-gil 320beon-gil, Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Republic of Korea",
    addressLines: ["51, Yodang-gil 320beon-gil,", "Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Republic of Korea"],
    visit: "工場訪問は事前調整が必要です。到着前に担当者へご連絡ください。",
    email: "sales@seoulind.co.kr",
    transportTitle: "交通案内",
    transport: ["西海岸高速道路 発安（パラン）IC、または平沢済川高速道路 青北（チョンブク）ICをご利用ください", "仁川国際空港から車で約1時間30分"],
    parking: "来客用駐車場：正門受付前",
    procedureTitle: "訪問手順",
    procedureNote: "訪問当日は、次の手順で入構いただきます。",
    procedure: ["担当者と訪問日程を調整", "正門受付で入構登録", "安全上の注意事項の説明後に入場"],
  },
};

function useSubpageReveal(route: string, language: RenewalLanguage) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-sub-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node, index) => {
      node.style.setProperty("--sub-delay", `${Math.min(index * 55, 280)}ms`);
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, [route, language]);
}

function CapabilityGrid({ content }: { content: SiteContent }) {
  return (
    <section className="renewal-sub-capabilities">
      {content.solutions.map((item, index) => (
        <article data-sub-reveal key={item.id}>
          <span>0{index + 1}</span>
          <div>
            <small>{item.tags.join(" · ")}</small>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

const ceoTagline: Record<RenewalLanguage, { lead: string; emphasis: string; tail: string; sub: string; alt: string }> = {
  ko: {
    lead: "서울산업은",
    emphasis: "화합으로 창조",
    tail: "하는 기업입니다.",
    sub: "환경 친화적 경영, 서울산업 웹사이트에 오신 것을 환영합니다.",
    alt: "서울산업 사옥 일러스트",
  },
  en: {
    lead: "Seoul Industry",
    emphasis: "creates through harmony",
    tail: ".",
    sub: "Environmentally responsible management — welcome to Seoul Industry.",
    alt: "Illustration of the Seoul Industry head office",
  },
  ja: {
    lead: "ソウル産業は",
    emphasis: "和合による創造",
    tail: "を掲げる企業です。",
    sub: "環境に配慮した経営 — ソウル産業のウェブサイトへようこそ。",
    alt: "ソウル産業本社のイラスト",
  },
};

function CeoBody({ language }: { language: RenewalLanguage }) {
  const copy = ceoCopy[language];
  const tagline = ceoTagline[language];

  return (
    <section className="renewal-sub-ceo">
      <div className="renewal-sub-ceo__visual renewal-sub-ceo__visual--illustration" data-sub-reveal>
        <div className="renewal-sub-ceo__tagline">
          <p>
            {tagline.lead}
            <br />
            <em>{tagline.emphasis}</em>
            {language === "ko" ? <br /> : null}
            {tagline.tail}
          </p>
          <small>{tagline.sub}</small>
        </div>
        <img src={ceoGreetingIllustration} alt={tagline.alt} />
        <span>SEOUL INDUSTRY · PRECISION MANUFACTURING SINCE 1985</span>
      </div>
      <div className="renewal-sub-ceo__message" data-sub-reveal>
        <span>CEO MESSAGE</span>
        <h2>{copy.quote}</h2>
        <div>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <strong>{copy.sign}</strong>
      </div>
    </section>
  );
}

function GreetingBody({ content }: { content: SiteContent }) {
  return (
    <>
      <section className="renewal-sub-statement">
        <figure data-sub-reveal>
          <img src={precisionImage} alt="" />
          <figcaption>PRECISION AUTOMOTIVE COMPONENTS · SINCE 1985</figcaption>
        </figure>
        <div className="renewal-sub-statement__copy" data-sub-reveal>
          <span>SEOUL INDUSTRY · COMPANY OVERVIEW</span>
          <h2>{content.dataHeading.title}</h2>
          <p>{content.dataHeading.copy}</p>
        </div>
      </section>
      <CapabilityGrid content={content} />
    </>
  );
}

function LocalSupplyNetworkSection({ language }: { language: RenewalLanguage }) {
  const copy = localSupplyNetwork[language];

  return (
    <section className="profile-local-network">
      <header data-sub-reveal>
        <span>{copy.eyebrow}</span>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.copy}</p>
        </div>
      </header>
      <div className="profile-local-network__flow" data-sub-reveal>
        <div className="profile-local-network__hub">
          <small>PROCESS OWNER</small>
          <strong>SEOUL INDUSTRY</strong>
          <span>HWASEONG · KOREA</span>
        </div>
        <div className="profile-local-network__processes">
          {copy.processes.map((process, index) => (
            <article key={process.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{process.title}</strong>
              <small>{process.copy}</small>
            </article>
          ))}
        </div>
      </div>
      <div className="profile-local-network__benefits">
        {copy.benefits.map((benefit, index) => (
          <article data-sub-reveal key={benefit.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompanyOverviewBody({ language }: { language: RenewalLanguage }) {
  const copy = companyOverviewCopy[language];
  const network = globalProgramNetwork[language];

  return (
    <>
      <section className="profile-overview">
        <figure className="profile-overview__factory" data-sub-reveal>
          <img src={seoulIndustryFacadeImage} alt="Seoul Industry logo signage on the head office facade" />
          <figcaption>HEAD OFFICE · PRODUCTION FACILITY · HWASEONG, KOREA</figcaption>
        </figure>
        <div className="profile-overview__content">
          <div data-sub-reveal>
            <span>{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
            <p>{copy.copy}</p>
          </div>
          <dl className="profile-overview__facts" data-sub-reveal>
            {copy.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="profile-systems" data-sub-reveal aria-label="Automotive systems">
        {copy.systems.map((system, index) => (
          <div key={system}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{system}</strong>
          </div>
        ))}
      </section>

      <LocalSupplyNetworkSection language={language} />

      <section className="profile-network">
        <header data-sub-reveal>
          <span>GLOBAL PROGRAM SUPPORT</span>
          <h2>{copy.networkTitle}</h2>
          <p>{copy.networkCopy}</p>
        </header>
        <div className="profile-network__regions">
          {network.regions.map((region, index) => (
            <article data-sub-reveal key={region.region}>
              <div className="profile-network__region-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{region.title}</h3>
              <p>{region.copy}</p>
              <div className="profile-network__tags" aria-label={`${region.region} program scope`}>
                {region.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="profile-network__framework" data-sub-reveal>
          <div className="profile-network__framework-head">
            <div>
              <span>ONE CONNECTED VALUE STREAM</span>
              <h3>{network.frameworkTitle}</h3>
            </div>
          </div>
          <ol className="profile-network__stages">
            {network.stages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{stage.title}</strong>
                <p>{stage.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function LocationBody({ language }: { language: RenewalLanguage }) {
  const copy = locationCopy[language];
  const labels = bodyLabels[language];
  const mapQuery = "서울산업(주), 경기도 화성시 양감면 요당길320번길 51";
  const mapLanguage = language === "ja" ? "ja" : language === "en" ? "en" : "ko";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed&hl=${mapLanguage}`;

  return (
    <section className="renewal-sub-location">
      <div className="renewal-sub-location__map" data-sub-reveal>
        <iframe
          src={mapEmbedUrl}
          title={`${copy.address} ${labels.map}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a href={mapUrl} target="_blank" rel="noreferrer">
          <span>{labels.map}</span>
          <Icon name="arrow" />
        </a>
      </div>
      <div className="renewal-sub-location__details">
        <article data-sub-reveal>
          <span>01 · {labels.office}</span>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="renewal-sub-location__address">
            {copy.addressLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </a>
        </article>
        <article data-sub-reveal>
          <span>02 · TEL / FAX</span>
          <a href="tel:+82313661141">+82 31 366 1141</a>
          <p>FAX +82 31 366 1150</p>
        </article>
        <article data-sub-reveal>
          <span>03 · E-MAIL</span>
          <a href={`mailto:${copy.email}`}>{copy.email}</a>
        </article>
        <article data-sub-reveal>
          <span>04 · {labels.directions}</span>
          <p>{copy.visit}</p>
        </article>
      </div>
      <div className="renewal-sub-location-visit">
        <article data-sub-reveal>
          <span>05 · {copy.transportTitle}</span>
          <ul>
            {copy.transport.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>{copy.parking}</li>
          </ul>
        </article>
        <article data-sub-reveal>
          <span>06 · {copy.procedureTitle}</span>
          <p>{copy.procedureNote}</p>
          <ol>
            {copy.procedure.map((step, index) => (
              <li key={step}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}

function HistoryBody({ content }: { content: SiteContent }) {
  const historySinceWords = content.historyHeading.since.split(/\s+/).filter(Boolean);

  return (
    <section className="renewal-sub-history">
      <div className="renewal-sub-history__since" data-sub-reveal>
        <span>{content.historyHeading.eyebrow}</span>
        <strong aria-label={content.historyHeading.since}>
          {historySinceWords.map((word) => (
            <span aria-hidden="true" key={word}>{word}</span>
          ))}
        </strong>
        <p>{content.historyHeading.copy}</p>
      </div>
      <div className="renewal-sub-history__timeline">
        {content.historyEras.map((era, index) => (
          <article data-sub-reveal key={era.period}>
            <span>0{index + 1}</span>
            <div>
              <strong>{era.period}</strong>
              <h3>{era.title}</h3>
              <p>{era.summary}</p>
            </div>
            <ul>
              {era.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function CertificatesBody({ language }: { language: RenewalLanguage }) {
  const copy = certificateShowcaseCopy[language];

  return (
    <section className="renewal-sub-cert-showcase">
      <header className="renewal-sub-cert-showcase__header" data-sub-reveal>
        <span>CORPORATE CERTIFICATIONS</span>
        <div>
          <h2>{copy.heading}</h2>
          <p>{copy.intro}</p>
        </div>
      </header>
      <div className="renewal-sub-certificates">
        {copy.items.map((certificate, index) => (
          <article data-sub-reveal key={certificate.title}>
            <a href={certificateAssets[index].href} target="_blank" rel="noreferrer">
              <figure>
                <img src={certificateAssets[index].image} alt={certificate.alt} loading="lazy" decoding="async" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </figure>
              <div>
                <small>{certificate.eyebrow}</small>
                <h3>{certificate.title}</h3>
                <p>{certificate.copy}</p>
                <ul>
                  {certificate.metadata.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="renewal-sub-certificates__link">
                  {copy.originalLabel}
                  <Icon name="arrow" />
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActualProductLineup({
  route,
  language,
}: {
  route: string;
  language: RenewalLanguage;
}) {
  const catalog = productPartCatalogByRoute[route];
  if (!catalog) return null;

  const labels = {
    ko: { eyebrow: "PRODUCTION PARTS", item: "서울산업 양산 부품", motion: "세부 부품", overview: "대표 제품군" },
    en: { eyebrow: "PRODUCTION PARTS", item: "Production component", motion: "Product detail", overview: "Product family overview" },
    ja: { eyebrow: "PRODUCTION PARTS", item: "ソウル産業の量産部品", motion: "製品詳細", overview: "代表製品群" },
  }[language];
  const lineupLabels = route === "products/electric-vehicle"
    ? {
        ko: { ...labels, eyebrow: "ELECTRIFIED PARTS", item: "서울산업 전동화 부품", overview: "전동화 제품군" },
        en: { ...labels, eyebrow: "ELECTRIFIED PARTS", item: "Electrified component", overview: "Electrified product family" },
        ja: { ...labels, eyebrow: "ELECTRIFIED PARTS", item: "ソウル産業の電動化部品", overview: "電動化製品群" },
      }[language]
    : labels;

  return (
    <section className="renewal-sub-product-lineup">
      <div className="renewal-sub-product-lineup__overview">
        <header data-sub-reveal>
          <span>{lineupLabels.eyebrow}</span>
          <h2>{catalog.lineupTitle[language]}</h2>
          <p>{catalog.lineupCopy[language]}</p>
          <div className="renewal-sub-product-lineup__families">
            {catalog.families.map((family) => (
              <span key={family}>{family}</span>
            ))}
          </div>
        </header>
        <figure
          className={catalog.overviewPresentation === "portrait-focused" ? "is-portrait-focused" : undefined}
          data-sub-reveal
        >
          {catalog.overviewVideo ? (
            <video
              src={catalog.overviewVideo}
              poster={catalog.overviewImage}
              aria-label={catalog.lineupTitle[language]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img src={catalog.overviewImage} alt={catalog.lineupTitle[language]} />
          )}
          <figcaption>{lineupLabels.overview}</figcaption>
        </figure>
      </div>
      <div className={`renewal-sub-product-lineup__grid is-count-${catalog.parts.length}`}>
        {catalog.parts.map((part, index) => (
          <article data-sub-reveal key={part.title.en}>
            <figure>
              {part.video ? (
                <video
                  className={part.mediaFit === "cover" ? "is-cover" : undefined}
                  src={part.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={part.poster}
                  aria-label={part.title[language]}
                />
              ) : (
                <img
                  className={part.mediaFit === "cover" ? "is-cover" : undefined}
                  src={part.poster}
                  alt={part.title[language]}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{lineupLabels.motion}</small>
              </figcaption>
            </figure>
            <div>
              <span>{lineupLabels.item}</span>
              <h3>{part.title[language]}</h3>
              <p>{part.application[language]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type SpecialProjectsCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  disclosureLabel: string;
  disclosure: string;
  imageCaption: string;
  principles: Array<{
    number: string;
    kicker: string;
    title: string;
    copy: string;
  }>;
};

const specialProjectsCopy: Record<RenewalLanguage, SpecialProjectsCopy> = {
  ko: {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: "보안 프로젝트\n공개·협의 안내",
    intro:
      "이 페이지는 보안 프로젝트 문의 시 확인하는 제조 검토 항목과 협의 절차를 공개 가능한 범위에서 안내합니다.",
    disclosureLabel: "PUBLIC CAPABILITY OVERVIEW",
    disclosure:
      "보안상 실제 제품, 고객사, 형상, 적용 분야는 공개하지 않습니다. 이 페이지에는 공개 가능한 제조·품질 관리 범위만 안내합니다.",
    imageCaption: "CONCEPT IMAGE · PRODUCT DETAILS NOT DISCLOSED",
    principles: [
      {
        number: "01",
        kicker: "CONFIDENTIAL PROJECT",
        title: "보안 정보 범위",
        copy: "프로젝트 요구 시 도면, 사양 및 변경 이력의 접근 권한과 공유 범위를 구분합니다.",
      },
      {
        number: "02",
        kicker: "PRECISION PROCESS",
        title: "공정 요구사항 검토",
        copy: "프로젝트별 승인 조건이 정해지면 소재, 형상 및 공차를 검토해 가공·측정 기준을 수립합니다.",
      },
      {
        number: "03",
        kicker: "TRACEABILITY SCOPE",
        title: "추적 범위 협의",
        copy: "검사 결과와 작업 이력의 LOT 단위 관리 범위는 고객 요구사항과 승인 조건에 따라 정합니다.",
      },
      {
        number: "04",
        kicker: "PRODUCTION SCOPE",
        title: "생산 범위 협의",
        copy: "시제품 검증, 공정 안정화 및 양산 적용 범위는 프로젝트별 승인 조건에 맞춰 협의합니다.",
      },
    ],
  },
  en: {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: "Disclosure and consultation\nfor confidential projects",
    intro:
      "This page outlines the manufacturing-review items and consultation process used for confidential-project inquiries, within the scope approved for public communication.",
    disclosureLabel: "PUBLIC CAPABILITY OVERVIEW",
    disclosure:
      "For security reasons, actual products, customers, geometries, and application fields are not disclosed. This page presents only the manufacturing and quality-management scope approved for public communication.",
    imageCaption: "CONCEPT IMAGE · PRODUCT DETAILS NOT DISCLOSED",
    principles: [
      {
        number: "01",
        kicker: "CONFIDENTIAL PROJECT",
        title: "Information-security scope",
        copy: "When required by a project, access permissions and sharing scopes are defined for drawings, specifications, and revision histories.",
      },
      {
        number: "02",
        kicker: "PRECISION PROCESS",
        title: "Process-requirement review",
        copy: "Once project-specific approval conditions are defined, material, geometry, and tolerances are reviewed to establish machining and measurement criteria.",
      },
      {
        number: "03",
        kicker: "TRACEABILITY SCOPE",
        title: "Traceability scope",
        copy: "The scope of lot-level control for inspection results and work records is defined according to customer requirements and approval conditions.",
      },
      {
        number: "04",
        kicker: "PRODUCTION SCOPE",
        title: "Production scope",
        copy: "Prototype validation, process stabilization, and production scope are defined according to project-specific approval conditions.",
      },
    ],
  },
  ja: {
    eyebrow: "DEFENSE & SPECIAL PROJECTS",
    title: "機密プロジェクトの\n公開・協議のご案内",
    intro:
      "本ページでは、機密プロジェクトのお問い合わせ時に確認する製造検討項目と協議手順を、公開可能な範囲で案内します。",
    disclosureLabel: "PUBLIC CAPABILITY OVERVIEW",
    disclosure:
      "機密保持のため、実際の製品、顧客、形状、適用分野は公開していません。本ページでは、公開可能な製造・品質管理範囲のみをご案内します。",
    imageCaption: "CONCEPT IMAGE · PRODUCT DETAILS NOT DISCLOSED",
    principles: [
      {
        number: "01",
        kicker: "CONFIDENTIAL PROJECT",
        title: "機密情報の範囲",
        copy: "プロジェクトで要求される場合、図面、仕様、変更履歴のアクセス権限と共有範囲を区分します。",
      },
      {
        number: "02",
        kicker: "PRECISION PROCESS",
        title: "工程要求事項の検討",
        copy: "プロジェクト別の承認条件が定まった後、素材、形状、公差を検討し、加工・測定基準を策定します。",
      },
      {
        number: "03",
        kicker: "TRACEABILITY SCOPE",
        title: "追跡範囲の協議",
        copy: "検査結果と作業履歴のロット単位管理範囲は、顧客要求事項と承認条件に応じて定めます。",
      },
      {
        number: "04",
        kicker: "PRODUCTION SCOPE",
        title: "生産範囲の協議",
        copy: "試作品検証、工程安定化、量産適用範囲は、プロジェクト別の承認条件に応じて定めます。",
      },
    ],
  },
};

function SpecialProjectsBody({ language }: { language: RenewalLanguage }) {
  const copy = specialProjectsCopy[language];

  return (
    <>
      <section className="renewal-sub-special-projects">
        <div className="renewal-sub-special-projects__intro">
          <div className="renewal-sub-special-projects__copy" data-sub-reveal>
            <span>{copy.eyebrow}</span>
            <h2>{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>
          <figure data-sub-reveal>
            <img src={defenseSpecialProjectsImage} alt="" />
            <figcaption>{copy.imageCaption}</figcaption>
          </figure>
        </div>
        <div className="renewal-sub-special-projects__principles">
          {copy.principles.map((principle) => (
            <article data-sub-reveal key={principle.number}>
              <div>
                <span>{principle.number}</span>
                <small>{principle.kicker}</small>
              </div>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="renewal-sub-special-projects__notice" data-sub-reveal>
        <span>{copy.disclosureLabel}</span>
        <p>{copy.disclosure}</p>
      </section>
    </>
  );
}

function ProductDetailBody({
  route,
  content,
  language,
}: {
  route: string;
  content: SiteContent;
  language: RenewalLanguage;
}) {
  if (route === "products/etc") {
    return <SpecialProjectsBody language={language} />;
  }

  const productIndex = productRouteIndex[route] ?? 0;
  const product = content.products[productIndex];
  const displayIndex = productRouteDisplayIndex[route] ?? productIndex + 1;
  const labels = bodyLabels[language];
  const catalog = productPartCatalogByRoute[route];
  const specs = getProductSpecs(catalog, language);
  const specCopy = productSpecSectionCopy[language];
  const qualityStory = catalog?.qualityStory;
  const standards = catalog?.detailTags ?? [];
  const displayTitle = catalog?.detailTitle[language] ?? product.title;
  const displayCopy = catalog?.detailCopy[language] ?? product.copy;
  const displayCategory = catalog?.eyebrow ?? product.category;
  const image = productRouteImages[route] ?? product.image;
  const defaultApplicationLabels = {
    ko: {
      area: "주요 적용 영역",
      note: "차종과 프로그램에 따라 적용 위치와 형상은 달라질 수 있습니다.",
    },
    en: {
      area: "Typical application area",
      note: "Installation position and geometry vary by vehicle and program.",
    },
    ja: {
      area: "代表的な搭載領域",
      note: "搭載位置や形状は車種・プログラムにより異なります。",
    },
  }[language];
  const applicationLabels = route === "products/electric-vehicle"
    ? {
        ko: {
          ...defaultApplicationLabels,
          note: "양산 및 개발·검증 범위는 제품별 고객 승인 단계에 따라 다릅니다.",
        },
        en: {
          ...defaultApplicationLabels,
          note: "The scope of production and development validation varies by product and customer approval stage.",
        },
        ja: {
          ...defaultApplicationLabels,
          note: "量産および開発・検証の範囲は、製品ごとの顧客承認段階により異なります。",
        },
      }[language]
    : defaultApplicationLabels;

  return (
    <>
      <section className="renewal-sub-product-detail">
        <figure data-sub-reveal>
          <span>{String(displayIndex).padStart(2, "0")}</span>
          <img src={image} alt={displayTitle} />
          <figcaption className="renewal-sub-product-detail__application">
            <div>
              <strong>{applicationLabels.area}</strong>
              <small>{applicationLabels.note}</small>
            </div>
          </figcaption>
        </figure>
        <div data-sub-reveal>
          <small>{displayCategory}</small>
          <h2>{displayTitle}</h2>
          <p>{displayCopy}</p>
          <h3>{labels.application}</h3>
          <div className="renewal-sub-product-detail__tags">
            {standards.map((standard) => (
              <span key={standard}>{standard}</span>
            ))}
          </div>
        </div>
      </section>
      <ActualProductLineup route={route} language={language} />
      {specs.length > 0 ? (
        <section className="renewal-sub-spec-range">
          <header data-sub-reveal>
            <span>{specCopy.eyebrow}</span>
            <h2>{specCopy.title}</h2>
            <p>{specCopy.note}</p>
          </header>
          <dl data-sub-reveal>
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          {qualityStory ? (
            <aside className="renewal-sub-spec-range__story" data-sub-reveal>
              <span>{qualityStory.eyebrow}</span>
              <h3>{qualityStory.title[language]}</h3>
              <p>{qualityStory.copy[language]}</p>
            </aside>
          ) : null}
        </section>
      ) : null}
    </>
  );
}

function ProcessMedia({
  image,
  video,
  title,
}: {
  image: string;
  video?: string;
  title: string;
}) {
  if (!video) return <img src={image} alt="" loading="lazy" decoding="async" />;

  return (
    <ViewportLoopVideo
      src={video}
      poster={image}
      aria-label={title}
    />
  );
}

function ManufacturingFilmLibrary({ language }: { language: RenewalLanguage }) {
  const [activeGroup, setActiveGroup] = useState<ManufacturingFilmGroupId>("gear-spline");
  const [cycleRevision, setCycleRevision] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [autoRotationStopped, setAutoRotationStopped] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const copy = manufacturingFilmLibraryCopy[language];
  const visibleFilms = manufacturingFilmLibrary.filter((film) => film.group === activeGroup);

  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(tabs);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isInteracting || reducedMotion || autoRotationStopped) return;

    let timer = 0;
    const scheduleNextGroup = () => {
      window.clearTimeout(timer);
      if (document.visibilityState !== "visible") return;
      timer = window.setTimeout(() => {
        setActiveGroup((currentGroup) => {
          const currentIndex = manufacturingFilmGroupIds.indexOf(currentGroup);
          return manufacturingFilmGroupIds[(currentIndex + 1) % manufacturingFilmGroupIds.length];
        });
      }, 4000);
    };
    const handleVisibilityChange = () => scheduleNextGroup();

    scheduleNextGroup();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeGroup, autoRotationStopped, cycleRevision, isInteracting, isVisible, reducedMotion]);

  // A deliberate tab selection hands control to the visitor: no more auto-rotation afterwards.
  const selectGroup = (groupId: ManufacturingFilmGroupId) => {
    setActiveGroup(groupId);
    setAutoRotationStopped(true);
    setCycleRevision((revision) => revision + 1);
  };

  return (
    <section className="profile-film-library" aria-labelledby="manufacturing-film-library-title">
      <header className="profile-film-library__header" data-sub-reveal>
        <div>
          <span>{copy.eyebrow}</span>
          <h2 id="manufacturing-film-library-title">{copy.title}</h2>
        </div>
        <p>{copy.copy}</p>
      </header>

      <div
        className="profile-film-library__tabs"
        role="tablist"
        aria-label={copy.title}
        ref={tabsRef}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
        onFocusCapture={() => setIsInteracting(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
        }}
      >
        {manufacturingFilmGroupIds.map((groupId) => {
          const filmCount = manufacturingFilmLibrary.filter((film) => film.group === groupId).length;
          const isActive = groupId === activeGroup;

          return (
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="manufacturing-film-panel"
              className={isActive ? "is-active" : undefined}
              key={groupId}
              onClick={() => selectGroup(groupId)}
            >
              <span>{copy.tabs[groupId]}</span>
              <strong>{String(filmCount).padStart(2, "0")}</strong>
            </button>
          );
        })}
      </div>

      <div
        className={`profile-film-library__grid is-count-${visibleFilms.length}`}
        id="manufacturing-film-panel"
        role="tabpanel"
        aria-live={isInteracting ? "polite" : "off"}
      >
        {visibleFilms.map((film, index) => (
          <article key={film.id}>
            <figure>
              <ViewportLoopVideo
                className="profile-film-library__video"
                src={film.video}
                poster={film.poster}
                aria-label={film.title[language]}
                objectFit="cover"
                objectPosition="center"
              />
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{copy.tabs[film.group]}</strong>
              </figcaption>
            </figure>
            <div>
              <small>{copy.tabs[film.group]}</small>
              <h3>{film.title[language]}</h3>
              <p>{film.copy[language]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ManufacturingBody({
  route,
  language,
}: {
  route: string;
  language: RenewalLanguage;
}) {
  const copy = manufacturingPageCopy[language];
  const labels = manufacturingGroupLabels[language];
  const processById = new Map(manufacturingProcesses.map((process) => [process.id, process]));
  const flowProcesses = manufacturingFlowIds.flatMap((id) => {
    const process = processById.get(id);
    return process ? [{ ...process, productionVideo: manufacturingFlowVideos[id] }] : [];
  });
  const inspectionProcesses = inspectionProcessIds.flatMap((id) => {
    const process = processById.get(id);
    return process ? [process] : [];
  });
  const heading =
    route === "manufacturing/equipment"
      ? copy.equipmentTitle
      : route === "manufacturing/inspection"
        ? copy.inspectionTitle
        : copy.title;
  const intro =
    route === "manufacturing/equipment"
      ? copy.equipmentCopy
      : route === "manufacturing/inspection"
        ? copy.inspectionCopy
        : copy.copy;

  const processImageLabel = { ko: "공정 이미지", en: "PROCESS VIEW", ja: "工程イメージ" }[language];
  const equipmentImageLabel = {
    ko: "설비 외관 및 현장",
    en: "EQUIPMENT & SHOP FLOOR",
    ja: "設備外観・生産現場",
  }[language];

  return (
    <>
      <section className="profile-manufacturing-intro" data-sub-reveal>
        <span>{copy.eyebrow}</span>
        <h2>{heading}</h2>
        <p>{intro}</p>
      </section>

      {route === "manufacturing/process" && (
        <>
          <section className="profile-process-flow" aria-label={copy.title}>
            {flowProcesses.map((process, index) => (
              <article data-sub-reveal key={process.id}>
                <div className="profile-process-flow__number">
                  <span>STEP</span>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                </div>
                <figure>
                  <ProcessMedia image={process.image} video={process.productionVideo} title={process.title} />
                </figure>
                <div className="profile-process-flow__content">
                  <small>{labels[process.group]}</small>
                  <h3>{process.title}</h3>
                  <p>{process.copy[language]}</p>
                  <strong>{process.capability[language]}</strong>
                </div>
              </article>
            ))}
          </section>
          <ManufacturingFilmLibrary language={language} />
        </>
      )}

      {route === "manufacturing/equipment" && (
        <>
          <section className="profile-equipment-inventory" aria-label={copy.equipmentTitle}>
            {equipmentInventory.map((group, groupIndex) => {
              const visuals = equipmentVisuals[group.id] ?? [];

              return (
                <article className={groupIndex % 2 === 1 ? "is-reversed" : undefined} data-sub-reveal key={group.id}>
                <figure className="profile-equipment-inventory__visual">
                  <div className={`profile-equipment-inventory__gallery count-${visuals.length}`}>
                    {visuals.map((visual) => (
                      <div className="profile-equipment-inventory__gallery-item" key={visual.label}>
                        <img
                          src={visual.image}
                          alt={`${visual.label} ${equipmentImageLabel}`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span>{visual.label}</span>
                      </div>
                    ))}
                  </div>
                  <figcaption>
                    <span>{equipmentImageLabel}</span>
                    <strong>{String(groupIndex + 1).padStart(2, "0")} / 04</strong>
                  </figcaption>
                </figure>
                <div className="profile-equipment-inventory__body">
                  <header>
                    <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                    <h3>{group.title[language]}</h3>
                    <p>{group.copy[language]}</p>
                  </header>
                  <ul className="profile-equipment-inventory__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                </article>
              );
            })}
          </section>
          <OperationalReliabilitySection language={language} />
        </>
      )}

      {route === "manufacturing/inspection" && (
        <section className="profile-process-grid is-inspection" aria-label={copy.inspectionTitle}>
          {inspectionProcesses.map((process, index) => {
            const inspectionFilm = inspectionFilmByProcessId[process.id];

            return (
              <article data-sub-reveal key={process.id}>
                <figure>
                  <ProcessMedia
                    image={inspectionFilm?.poster ?? process.image}
                    video={inspectionFilm?.video ?? process.video}
                    title={process.title}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </figure>
                <div>
                  <small>{labels[process.group]}</small>
                  <h3>{process.title}</h3>
                  <p>{process.copy[language]}</p>
                  <strong>{process.capability[language]}</strong>
                  <span>{process.makers}</span>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}

function OperationalReliabilitySection({ language }: { language: RenewalLanguage }) {
  const copy = operationalReliability[language];

  return (
    <section className="profile-operational-reliability">
      <header data-sub-reveal>
        <span>{copy.eyebrow}</span>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.copy}</p>
        </div>
      </header>
      <div className="profile-operational-reliability__grid">
        {copy.items.map((item) => (
          <article data-sub-reveal key={item.code}>
            <span>{item.code}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function CapabilityMatrix({
  section,
  className = "",
}: {
  section: QualityCapabilityContent["governance"];
  className?: string;
}) {
  return (
    <section className={`renewal-sub-capability-matrix ${className}`.trim()}>
      <header data-sub-reveal>
        <span>{section.eyebrow}</span>
        <div>
          <h2>{section.title}</h2>
          <p>{section.copy}</p>
        </div>
      </header>
      <div className="renewal-sub-capability-matrix__grid">
        {section.items.map((item) => (
          <article data-sub-reveal key={`${item.code}-${item.title}`}>
            <span>{item.code}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <small>{item.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function QualityMetrologySection({ language }: { language: RenewalLanguage }) {
  const copy = qualityCapabilityCopy[language].measurement;

  return (
    <section className="renewal-sub-metrology">
      <header data-sub-reveal>
        <span>{copy.eyebrow}</span>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.copy}</p>
        </div>
      </header>
      <div className="renewal-sub-metrology__grid">
        {copy.items.map((item, index) => (
          <article data-sub-reveal key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.scope}</p>
            </div>
            <strong>{item.capability}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function EngineeringCapabilitySection({ language }: { language: RenewalLanguage }) {
  const copy = qualityCapabilityCopy[language].engineering;

  return (
    <section className="renewal-sub-engineering-capability">
      <header data-sub-reveal>
        <span>{copy.eyebrow}</span>
        <div>
          <h2>{copy.title}</h2>
          <p>{copy.copy}</p>
        </div>
      </header>
      <ol className="renewal-sub-engineering-capability__stages">
        {copy.stages.map((stage) => (
          <li data-sub-reveal key={stage.code}>
            <span>{stage.code}</span>
            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>
            <small>{stage.detail}</small>
          </li>
        ))}
      </ol>
      <div className="renewal-sub-engineering-capability__details">
        <section data-sub-reveal>
          <h3>{copy.toolsTitle}</h3>
          <div>
            {copy.tools.map((tool) => (
              <article key={tool.title}>
                <span>{tool.label}</span>
                <strong>{tool.title}</strong>
                <p>{tool.copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section data-sub-reveal>
          <h3>{copy.validationTitle}</h3>
          <ul>
            {copy.validation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

function QualityPolicyIcon({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <path d="M17 9h27l12 12v42H17zM44 9v12h12M25 31h22M25 40h14" />
        <path d="m29 52 5 5 12-13" />
      </svg>
    );
  }

  if (stage === 1) {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r="11" />
        <path d="M36 8v8M36 56v8M8 36h8M56 36h8M16 16l6 6M50 50l6 6M56 16l-6 6M22 50l-6 6" />
        <path d="M36 24a12 12 0 1 1-8.5 3.5" />
      </svg>
    );
  }

  if (stage === 2) {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <ellipse cx="24" cy="17" rx="12" ry="6" />
        <path d="M12 17v20c0 3 5 6 12 6s12-3 12-6V17M12 27c0 3 5 6 12 6s12-3 12-6" />
        <path d="M43 51h17M46 43v8M52 35v16M58 28v23" />
        <path d="m42 31 7-7 6 4 7-9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <path d="M18 25a21 21 0 0 1 35-7l5 6M58 14v10H48" />
      <path d="M54 47a21 21 0 0 1-35 7l-5-6M14 58V48h10" />
      <path d="m29 37 5 5 11-13" />
      <circle cx="36" cy="36" r="13" />
    </svg>
  );
}

function QualityPolicyBody({ language }: { language: RenewalLanguage }) {
  const copy = qualityPolicyCopy[language];

  return (
    <>
      <section className="renewal-sub-quality-policy-hero" data-sub-reveal>
        <div className="renewal-sub-quality-policy-hero__heading">
          <span>SEOUL INDUSTRY QUALITY POLICY</span>
          <h2>{copy.headline}</h2>
        </div>
        <div className="renewal-sub-quality-policy-hero__statement">
          <strong>QUALITY<br />FIRST</strong>
          <p>{copy.introduction}</p>
        </div>
        <div className="renewal-sub-quality-policy-hero__standards" aria-label="Quality standards">
          <div>
            <small>AUTOMOTIVE QMS</small>
            <strong>IATF 16949</strong>
          </div>
          <div>
            <small>CUSTOMER QUALITY</small>
            <strong>MSQ</strong>
          </div>
          <div>
            <small>TRACEABILITY</small>
            <strong>LOT LEVEL</strong>
          </div>
        </div>
      </section>

      <section className="renewal-sub-quality-principles">
        <header data-sub-reveal>
          <span>FOUR QUALITY COMMITMENTS</span>
          <h2>{copy.sectionTitle}</h2>
          <p>{copy.sectionCopy}</p>
        </header>
        <div className="renewal-sub-quality-principles__grid">
          <div className="renewal-sub-quality-principles__goal" aria-hidden="true">
            <small>GOAL</small>
            <strong>CONSISTENT</strong>
            <span>QUALITY</span>
          </div>
          {copy.principles.map((item, index) => (
            <article data-sub-reveal key={item.title}>
              <div className="renewal-sub-quality-principles__icon">
                <QualityPolicyIcon stage={index} />
              </div>
              <span>{item.english}</span>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <h3>{item.title}</h3>
              <p>{item.statement}</p>
              <ul>
                {item.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
              <footer>
                <small>{copy.outcomeLabel}</small>
                <b>{item.outcome}</b>
              </footer>
            </article>
          ))}
        </div>
      </section>
      <CapabilityMatrix section={qualityCapabilityCopy[language].governance} className="is-governance" />
      <CapabilityMatrix section={qualityCapabilityCopy[language].credentials} className="is-credentials" />
    </>
  );
}

function QualityFlowIcon({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M25 14h31l15 15v53H25z" />
        <path d="M56 14v15h15M35 39h25M35 49h16" />
        <circle cx="58" cy="62" r="11" />
        <path d="m66 70 8 8M53 62h10M58 57v10" />
      </svg>
    );
  }

  if (stage === 1) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="m19 31 29-15 29 15v35L48 81 19 66z" />
        <path d="m19 31 29 15 29-15M48 46v35M37 25l29 15" />
        <path d="m34 59 9 9 19-21" />
      </svg>
    );
  }

  if (stage === 2) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M18 74h60M23 66V51M34 66V39M45 66V46M56 66V29M67 66V36" />
        <path d="M25 34a24 24 0 0 1 46 0" />
        <circle cx="48" cy="34" r="4" />
        <path d="m48 34 15-11" />
      </svg>
    );
  }

  if (stage === 3) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M24 36h48v39H24zM24 36l24-14 24 14M48 22v14" />
        <path d="m36 55 8 8 17-19" />
        <path d="M17 29V18h11M79 29V18H68M17 68v11h11M79 68v11H68" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <ellipse cx="34" cy="25" rx="17" ry="8" />
      <path d="M17 25v27c0 4 8 8 17 8s17-4 17-8V25M17 38c0 4 8 8 17 8s17-4 17-8" />
      <circle cx="67" cy="42" r="8" />
      <circle cx="67" cy="69" r="8" />
      <path d="M51 34h8M51 53l9 10M67 50v11" />
    </svg>
  );
}

const qualityFlowCodes = ["SPEC", "IQC", "SPC", "OQC", "TRACE"];

function DevelopmentProcessIcon({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M24 14h35l14 14v54H24zM59 14v14h14M35 42h27M35 53h19M35 64h13" />
        <path d="M17 26v42M13 31l4-5 4 5M13 63l4 5 4-5M31 82h35M36 78l-5 4 5 4M61 78l5 4-5 4" />
      </svg>
    );
  }

  if (stage === 1) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="43" cy="48" r="15" />
        <circle cx="43" cy="48" r="5" />
        <path d="M43 25v8M43 63v8M20 48h8M58 48h8M27 32l6 6M53 58l6 6M27 64l6-6M53 38l6-6" />
        <path d="M68 20v55M62 20h12M62 75h12M68 31H58M68 63H58M72 37h8v20h-8" />
      </svg>
    );
  }

  if (stage === 2) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="m22 34 26-14 26 14v31L48 80 22 65zM22 34l26 15 26-15M48 49v31" />
        <path d="m64 59 13 13M74 48a10 10 0 0 0-12 13l12 12a10 10 0 0 0 13-12l-7 7-6-6 7-7a10 10 0 0 0-7-7Z" />
      </svg>
    );
  }

  if (stage === 3) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <rect x="14" y="17" width="25" height="18" />
        <rect x="57" y="17" width="25" height="18" />
        <rect x="36" y="62" width="25" height="18" />
        <path d="M39 26h18M48 26v36M26 35v15h22M70 35v15H48" />
        <path d="m43 70 5 5 8-9" />
      </svg>
    );
  }

  if (stage === 4) {
    return (
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M18 72h60M24 64V50M35 64V39M46 64V48M57 64V31M68 64V42" />
        <path d="M25 31a28 28 0 0 1 46 0M48 32l16-11" />
        <circle cx="48" cy="32" r="4" />
        <path d="m63 76 5 5 11-13" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <path d="M17 78V43l20-12v12l20-12v13l22-10v44zM17 78h62M28 56h10v10H28zM49 56h10v10H49z" />
      <path d="M67 23a24 24 0 0 1 14 19M79 23v19H60M29 22a24 24 0 0 0-14 19M17 22v19h19" />
    </svg>
  );
}

function DevelopmentProcessFlow({ items, language }: { items: DevelopmentFlowItem[]; language: RenewalLanguage }) {
  const copy = developmentRoadmapCopy[language];

  return (
    <section className="renewal-sub-development-roadmap" aria-label={copy.title} data-sub-reveal>
      <header>
        <div>
          <span>{copy.eyebrow}</span>
          <h2>{copy.title}</h2>
        </div>
        <p>{copy.copy}</p>
      </header>
      <div className="renewal-sub-development-roadmap__grid">
        {items.map((item, index) => (
          <article key={item.title}>
            <div className="renewal-sub-development-roadmap__station" aria-hidden="true">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <DevelopmentProcessIcon stage={index} />
              </div>
              <i />
            </div>
            <div className="renewal-sub-development-roadmap__copy">
              <small>{item.phase}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <footer>
                <span>{copy.outputLabel}</span>
                <strong>{item.output}</strong>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessFlow({
  items,
  label,
  visual = false,
}: {
  items: Array<{ title: string; copy: string }>;
  label: string;
  visual?: boolean;
}) {
  return (
    <section
      className={`renewal-sub-process-flow${visual ? " renewal-sub-process-flow--quality" : ""}`}
      aria-label={label}
      data-sub-reveal={visual ? "" : undefined}
    >
      {visual ? (
        <div className="renewal-sub-process-flow__rail" aria-hidden="true">
          <span />
        </div>
      ) : null}
      {items.map((item, index) => (
        <article data-sub-reveal={visual ? undefined : ""} key={item.title}>
          {visual ? (
            <div className="renewal-sub-process-flow__station" aria-hidden="true">
              <span className="renewal-sub-process-flow__index">{String(index + 1).padStart(2, "0")}</span>
              <div className="renewal-sub-process-flow__icon">
                <QualityFlowIcon stage={index} />
              </div>
              <i className="renewal-sub-process-flow__node" />
            </div>
          ) : (
            <span>{String(index + 1).padStart(2, "0")}</span>
          )}
          <div className="renewal-sub-process-flow__copy">
            {visual ? <small>{qualityFlowCodes[index]}</small> : null}
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function QualitySystemBody({ language }: { language: RenewalLanguage }) {
  const labels = bodyLabels[language];

  return (
    <>
      <section className="renewal-sub-section-heading" data-sub-reveal>
        <span>QUALITY ASSURANCE SYSTEM</span>
        <h2>{labels.qualityFlow}</h2>
      </section>
      <ProcessFlow items={qualityFlow[language]} label={labels.qualityFlow} visual />
      <CapabilityMatrix section={qualityCapabilityCopy[language].digitalLoop} className="is-digital-loop" />
      <CapabilityMatrix
        section={qualityCapabilityCopy[language].shopFloorAssurance}
        className="is-shop-floor-assurance"
      />
      <QualityMetrologySection language={language} />
      <CertificatesBody language={language} />
    </>
  );
}

function PreventiveQualityBody({ language }: { language: RenewalLanguage }) {
  const labels = bodyLabels[language];

  return (
    <>
      <section className="renewal-sub-preventive-visual" data-sub-reveal>
        <img src={preventiveQualityImage} alt="" />
        <div>
          <span>PREVENTIVE QUALITY APPROACH</span>
          <strong>PLAN · VERIFY · CONTROL · IMPROVE</strong>
        </div>
      </section>
      <section className="renewal-sub-section-heading" data-sub-reveal>
        <span>PREVENTIVE QUALITY</span>
        <h2>{labels.qualityFlow}</h2>
      </section>
      <ProcessFlow items={preventiveFlow[language]} label={labels.qualityFlow} />
      <CapabilityMatrix section={qualityCapabilityCopy[language].problemSolving} className="is-problem-solving" />
      <CapabilityMatrix section={qualityCapabilityCopy[language].supplierQuality} className="is-supplier-quality" />
    </>
  );
}

function PartsDevelopmentBody({ content, language }: { content: SiteContent; language: RenewalLanguage }) {
  const labels = bodyLabels[language];

  return (
    <>
      <section className="renewal-sub-development">
        <figure data-sub-reveal>
          <img src={precisionImage} alt="" />
          <figcaption>DRAWING TO MASS PRODUCTION</figcaption>
        </figure>
        <div data-sub-reveal>
          <span>R&D CAPABILITY</span>
          <h2>{labels.developmentFlow}</h2>
          <p>{content.solutionHeading.copy}</p>
          <div>
            {["GEAR / SPLINE", "CNC MACHINING", "HEAT TREATMENT", "LASER WELDING", "AUTO INSPECTION"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
      <DevelopmentProcessFlow items={developmentFlow[language]} language={language} />
      <EngineeringCapabilitySection language={language} />
    </>
  );
}

function EnvironmentalBody({ content, language }: { content: SiteContent; language: RenewalLanguage }) {
  const policy = sustainabilityPolicyCopy[language];

  return (
    <>
      <section className="renewal-sub-esg-word" aria-label="ESG">
        <span data-sub-reveal>E</span>
        <span data-sub-reveal>S</span>
        <span data-sub-reveal>G</span>
      </section>
      <section className="renewal-sub-esg-grid">
        {content.esgPillars.map((pillar, index) => (
          <article data-sub-reveal key={pillar.keyword}>
            <div>
              <span>0{index + 1}</span>
              <small>{pillar.eyebrow}</small>
            </div>
            <img src={pillar.image} alt="" />
            <h3>{pillar.title}</h3>
            <p>{pillar.copy}</p>
            <ul>
              {pillar.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <a className="renewal-sub-esg-policy-link" href="/sustainability/policy" data-sub-reveal>
        <span>{policy.statement.eyebrow}</span>
        <div>
          <strong>{policy.statement.title}</strong>
          <p>{policy.statement.copy}</p>
        </div>
        <span className="renewal-sub-esg-policy-link__mark" aria-hidden="true">
          <Icon name="arrow" />
        </span>
      </a>
    </>
  );
}

function SustainabilityPolicyBody({ language }: { language: RenewalLanguage }) {
  const copy = sustainabilityPolicyCopy[language];

  return (
    <>
      <section className="renewal-sub-policy-statement renewal-sub-policy-statement--dark" data-sub-reveal>
        <span>{copy.statement.eyebrow}</span>
        <h2>{copy.statement.title}</h2>
        <p>{copy.statement.copy}</p>
        <div className="renewal-sub-sustainability-meta" aria-label={copy.statement.eyebrow}>
          {copy.meta.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="renewal-sub-sustainability-foundation">
        <div className="renewal-sub-sustainability-foundation__heading" data-sub-reveal>
          <span>{copy.governance.eyebrow}</span>
          <h2>{copy.governance.title}</h2>
          <p>{copy.governance.copy}</p>
        </div>
        <div className="renewal-sub-sustainability-foundation__principles">
          {copy.governance.items.map((item, index) => (
            <article data-sub-reveal key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="renewal-sub-sustainability-pillars" aria-label="ESG">
        {copy.pillars.map((pillar) => (
          <article data-sub-reveal key={pillar.letter}>
            <div>
              <strong>{pillar.letter}</strong>
              <span>{pillar.title}</span>
            </div>
            <h3>{pillar.label}</h3>
            <p>{pillar.copy}</p>
            <ul>
              {pillar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="renewal-sub-sustainability-domains">
        <header data-sub-reveal>
          <span>{copy.domains.eyebrow}</span>
          <h2>{copy.domains.title}</h2>
          <p>{copy.domains.copy}</p>
        </header>
        <div>
          {copy.domains.items.map((item, index) => (
            <article data-sub-reveal key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{item.tag}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="renewal-sub-sustainability-execution">
        <header data-sub-reveal>
          <span>{copy.execution.eyebrow}</span>
          <h2>{copy.execution.title}</h2>
        </header>
        <ol>
          {copy.execution.items.map((item, index) => (
            <li data-sub-reveal key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </li>
          ))}
        </ol>
        <div className="renewal-sub-sustainability-execution__evidence">
          <h3>{copy.execution.evidenceTitle}</h3>
          <div>
            {copy.execution.evidenceItems.map((item) => (
              <article data-sub-reveal key={item.title}>
                <span>{item.tag}</span>
                <h4>{item.title}</h4>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="renewal-sub-sustainability-document" data-sub-reveal>
        <div>
          <span>{copy.document.eyebrow}</span>
          <h2>{copy.document.title}</h2>
          <p>{copy.document.copy}</p>
        </div>
        <div className="renewal-sub-sustainability-document__action">
          <div>
            <span>{copy.document.dateLabel}</span>
            <strong>{copy.document.date}</strong>
          </div>
          <a href={sustainabilityPolicyDocument} download>
            <span>{copy.document.download}</span>
            <Icon name="arrow" />
          </a>
        </div>
      </section>
    </>
  );
}

function AutomotiveBody({ content }: { content: SiteContent }) {
  return (
    <section className="renewal-sub-products">
      {content.products.slice(0, 5).map((product, index) => (
        <article data-sub-reveal key={product.title}>
          <div className="renewal-sub-products__media">
            <img src={productImages[index]} alt="" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <small>{product.category}</small>
            <h3>{product.title}</h3>
            <p>{product.copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function IndustrialBody({ content }: { content: SiteContent }) {
  return (
    <section className="renewal-sub-industrial">
      <figure data-sub-reveal>
        <img src={drivelineImage} alt="" />
        <figcaption>DRAWING BASED MANUFACTURING</figcaption>
      </figure>
      <div>
        {content.solutions.map((solution, index) => (
          <article data-sub-reveal key={solution.id}>
            <span>0{index + 1}</span>
            <div>
              <h3>{solution.title}</h3>
              <p>{solution.copy}</p>
              <small>{solution.tags.join(" · ")}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NewsBody({ language, content }: { language: RenewalLanguage; content: SiteContent }) {
  const posts = useNoticePosts(6);

  return (
    <section className="renewal-sub-news-list">
      {posts.map((post, index) => {
        const translation = post.translations[language] ?? post.translations.ko;
        const fallback = content.mediaItems[index % content.mediaItems.length];
        return (
          <article data-sub-reveal key={post.id}>
            <div>
              <span>{post.category.toUpperCase()}</span>
              <time>{post.date}</time>
            </div>
            <h3>{translation.title}</h3>
            <p>{translation.summary}</p>
            <img src={post.image ?? fallback?.image ?? precisionImage} alt="" />
          </article>
        );
      })}
    </section>
  );
}

type ContactCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  attachNote: string;
  directLabel: string;
  fields: {
    company: string;
    name: string;
    email: string;
    phone: string;
    type: string;
    product: string;
    message: string;
  };
  types: string[];
  products: string[];
  select: string;
  consent: string;
  privacyLink: string;
  submit: string;
  submitNote: string;
  opened: string;
  subjectPrefix: string;
};

const contactCopy: Record<RenewalLanguage, ContactCopy> = {
  ko: {
    eyebrow: "RFQ · TECHNICAL REVIEW",
    title: "견적·기술 검토 문의",
    intro: "도면(STEP·PDF), 연간 예상 수량, 목표 SOP 시점을 함께 보내주시면 검토 후 회신드립니다.",
    attachNote: "도면·사양서 등 첨부 파일은 이메일(sales@seoulind.co.kr)로 보내주십시오.",
    directLabel: "직접 연락",
    fields: {
      company: "회사명",
      name: "담당자 / 직함",
      email: "이메일",
      phone: "연락처",
      type: "문의 유형",
      product: "제품군",
      message: "문의 내용",
    },
    types: ["견적", "기술 검토", "품질 문서", "기타"],
    products: ["STEERING", "POWERTRAIN", "DRIVELINE", "ELECTRIFIED POWERTRAIN", "MACHINED ALUMINUM COMPONENTS", "기타"],
    select: "선택",
    consent: "문의 응대 및 견적 검토를 위한 개인정보 수집·이용에 동의합니다.",
    privacyLink: "개인정보처리방침",
    submit: "메일로 보내기",
    submitNote: "‘메일로 보내기’를 누르면 입력하신 내용이 담긴 메일 작성 창이 열립니다. 도면 파일은 그 메일에 첨부해 주십시오.",
    opened: "메일 작성 창이 열리지 않으면 sales@seoulind.co.kr로 직접 보내주십시오.",
    subjectPrefix: "[문의]",
  },
  en: {
    eyebrow: "RFQ · TECHNICAL REVIEW",
    title: "Quotation and engineering review",
    intro: "Send us your drawings (STEP/PDF), estimated annual volume and target SOP timing, and we will review them and reply.",
    attachNote: "Please e-mail drawings and specifications to sales@seoulind.co.kr.",
    directLabel: "Direct contact",
    fields: {
      company: "Company",
      name: "Name / Title",
      email: "E-mail",
      phone: "Phone",
      type: "Inquiry type",
      product: "Product group",
      message: "Message",
    },
    types: ["Quotation", "Engineering review", "Quality documents", "Other"],
    products: ["STEERING", "POWERTRAIN", "DRIVELINE", "ELECTRIFIED POWERTRAIN", "MACHINED ALUMINUM COMPONENTS", "Other"],
    select: "Select",
    consent: "I agree to the collection and use of my personal information for responding to this inquiry and reviewing the request.",
    privacyLink: "Privacy Policy",
    submit: "Send by e-mail",
    submitNote: "“Send by e-mail” opens your mail client with the details you entered. Please attach drawing files to that message.",
    opened: "If your mail client does not open, please write to sales@seoulind.co.kr directly.",
    subjectPrefix: "[Inquiry]",
  },
  ja: {
    eyebrow: "RFQ · TECHNICAL REVIEW",
    title: "見積り・技術検討のお問い合わせ",
    intro: "図面（STEP・PDF）、年間予定数量、目標SOP時期を併せてお送りいただければ、検討のうえご返信いたします。",
    attachNote: "図面・仕様書などの添付ファイルはメール（sales@seoulind.co.kr）でお送りください。",
    directLabel: "直接のご連絡",
    fields: {
      company: "会社名",
      name: "ご担当者名 / 役職",
      email: "メールアドレス",
      phone: "電話番号",
      type: "お問い合わせ種別",
      product: "製品群",
      message: "お問い合わせ内容",
    },
    types: ["見積り", "技術検討", "品質書類", "その他"],
    products: ["STEERING", "POWERTRAIN", "DRIVELINE", "ELECTRIFIED POWERTRAIN", "MACHINED ALUMINUM COMPONENTS", "その他"],
    select: "選択してください",
    consent: "お問い合わせ対応および見積り検討のための個人情報の収集・利用に同意します。",
    privacyLink: "個人情報保護方針",
    submit: "メールで送信",
    submitNote: "「メールで送信」を押すと、入力内容が入ったメール作成画面が開きます。図面ファイルはそのメールに添付してください。",
    opened: "メール作成画面が開かない場合は、sales@seoulind.co.kr へ直接お送りください。",
    subjectPrefix: "[お問い合わせ]",
  },
};

const contactEmail = "sales@seoulind.co.kr";

function ContactBody({ language }: { language: RenewalLanguage }) {
  const [opened, setOpened] = useState(false);
  const copy = contactCopy[language];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const company = value("company");
    const type = value("type");
    const subject = `${copy.subjectPrefix} ${[type, company].filter(Boolean).join(" · ")}`;
    const lines = [
      `${copy.fields.company}: ${company}`,
      `${copy.fields.name}: ${value("name")}`,
      `${copy.fields.email}: ${value("email")}`,
      `${copy.fields.phone}: ${value("phone")}`,
      `${copy.fields.type}: ${type}`,
      `${copy.fields.product}: ${value("product")}`,
      "",
      `${copy.fields.message}:`,
      value("message"),
    ];
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setOpened(true);
  };

  return (
    <section className="renewal-sub-contact">
      <aside data-sub-reveal>
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p className="renewal-sub-contact__intro">{copy.intro}</p>
        <p>{copy.attachNote}</p>
        <div className="renewal-sub-contact__direct">
          <small>{copy.directLabel}</small>
          <a href="tel:+82313661141">TEL +82 31 366 1141</a>
          <p>FAX +82 31 366 1150</p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </aside>
      <form onSubmit={submit} data-sub-reveal>
        <label>
          <span>{copy.fields.company}</span>
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          <span>{copy.fields.name}</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>{copy.fields.email}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>{copy.fields.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>{copy.fields.type}</span>
          <select name="type" defaultValue="" required>
            <option value="" disabled>
              {copy.select}
            </option>
            {copy.types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{copy.fields.product}</span>
          <select name="product" defaultValue="">
            <option value="">{copy.select}</option>
            {copy.products.map((product) => (
              <option value={product} key={product}>
                {product}
              </option>
            ))}
          </select>
        </label>
        <label className="is-wide">
          <span>{copy.fields.message}</span>
          <textarea name="message" rows={6} required />
        </label>
        <label className="is-wide renewal-sub-contact__consent">
          <input name="consent" type="checkbox" required />
          <span>
            {copy.consent} <a href="/legal/privacy">{copy.privacyLink}</a>
          </span>
        </label>
        <p className="renewal-sub-contact__note">{copy.submitNote}</p>
        <button type="submit">
          <span>{copy.submit}</span>
          <Icon name="arrow" />
        </button>
        {opened && <p className="renewal-sub-contact__success">{copy.opened}</p>}
      </form>
    </section>
  );
}

type PrivacySection = { title: string; items: string[] };

type PrivacyCopy = {
  intro: string;
  sections: PrivacySection[];
  effectiveLabel: string;
  effectiveDate: string;
};

const privacyCopy: Record<RenewalLanguage, PrivacyCopy> = {
  ko: {
    intro:
      "서울산업(주)(이하 ‘회사’)는 「개인정보 보호법」 등 관련 법령을 준수하며, 홈페이지 문의 과정에서 수집되는 개인정보를 다음과 같이 처리합니다.",
    sections: [
      {
        title: "1. 수집하는 개인정보 항목",
        items: ["회사명, 담당자명(직함), 이메일, 연락처, 문의 내용", "문의 양식의 내용은 이용자의 메일 프로그램을 통해 회사 대표 이메일로 전달됩니다."],
      },
      {
        title: "2. 개인정보의 수집·이용 목적",
        items: ["문의 응대 및 견적·기술 검토", "문의 처리 결과 안내와 관련 연락"],
      },
      {
        title: "3. 보유 및 이용 기간",
        items: ["수집·이용 목적이 달성된 후 지체 없이 파기합니다.", "다만 관련 법령에 따라 보관이 필요한 경우에는 해당 기간 동안 보관합니다."],
      },
      {
        title: "4. 개인정보의 제3자 제공",
        items: ["회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다.", "법령에 특별한 규정이 있는 경우는 예외로 합니다."],
      },
      {
        title: "5. 정보주체의 권리",
        items: ["이용자는 언제든지 개인정보의 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.", "요청은 아래 개인정보 보호책임 부서로 연락해 주시면 지체 없이 처리합니다."],
      },
      {
        title: "6. 개인정보 보호책임 부서",
        items: ["부서: 경영지원팀", "이메일: sales@seoulind.co.kr", "전화: +82-31-366-1141"],
      },
    ],
    effectiveLabel: "시행일",
    effectiveDate: "2026년 8월 18일",
  },
  en: {
    intro:
      "Seoul Industry Co., Ltd. (the “Company”) complies with the Personal Information Protection Act of Korea and related laws, and handles personal information collected through website inquiries as follows.",
    sections: [
      {
        title: "1. Personal information collected",
        items: ["Company name, contact person (title), e-mail address, phone number and the content of the inquiry", "Inquiry-form content is delivered to the Company’s e-mail address through the user’s own mail client."],
      },
      {
        title: "2. Purpose of collection and use",
        items: ["Responding to inquiries and reviewing quotation and engineering requests", "Notifying the outcome of an inquiry and related follow-up contact"],
      },
      {
        title: "3. Retention period",
        items: ["Personal information is destroyed without delay once the purpose of collection has been fulfilled.", "Where retention is required by applicable law, it is kept for the period prescribed by that law."],
      },
      {
        title: "4. Provision to third parties",
        items: ["The Company does not provide personal information to third parties.", "Exceptions apply only where specifically required by law."],
      },
      {
        title: "5. Rights of data subjects",
        items: ["Users may request access to, correction or deletion of, or suspension of processing of their personal information at any time.", "Requests sent to the department below are handled without delay."],
      },
      {
        title: "6. Department responsible for personal information",
        items: ["Department: Management Support Team", "E-mail: sales@seoulind.co.kr", "Tel: +82-31-366-1141"],
      },
    ],
    effectiveLabel: "Effective date",
    effectiveDate: "18 August 2026",
  },
  ja: {
    intro:
      "ソウル産業株式会社（以下「当社」）は、韓国の「個人情報保護法」など関連法令を遵守し、ウェブサイトのお問い合わせを通じて取得する個人情報を次のとおり取り扱います。",
    sections: [
      {
        title: "1. 取得する個人情報の項目",
        items: ["会社名、ご担当者名（役職）、メールアドレス、電話番号、お問い合わせ内容", "お問い合わせフォームの内容は、利用者ご自身のメールソフトを通じて当社の代表メールアドレスに送信されます。"],
      },
      {
        title: "2. 取得・利用の目的",
        items: ["お問い合わせへの対応および見積り・技術検討", "お問い合わせの処理結果のご案内と関連するご連絡"],
      },
      {
        title: "3. 保有および利用期間",
        items: ["取得・利用目的を達成した後、遅滞なく破棄します。", "ただし、関連法令により保存が必要な場合は、当該期間保存します。"],
      },
      {
        title: "4. 第三者への提供",
        items: ["当社は利用者の個人情報を第三者に提供しません。", "法令に特別な定めがある場合を除きます。"],
      },
      {
        title: "5. 情報主体の権利",
        items: ["利用者はいつでも、個人情報の閲覧、訂正、削除、処理停止を求めることができます。", "下記の個人情報保護責任部署にご連絡いただければ、遅滞なく対応します。"],
      },
      {
        title: "6. 個人情報保護責任部署",
        items: ["部署：経営支援チーム", "メール：sales@seoulind.co.kr", "電話：+82-31-366-1141"],
      },
    ],
    effectiveLabel: "施行日",
    effectiveDate: "2026年8月18日",
  },
};

function PrivacyBody({ language }: { language: RenewalLanguage }) {
  const copy = privacyCopy[language];
  return (
    <section className="renewal-sub-privacy">
      <p className="renewal-sub-privacy__intro" data-sub-reveal>
        {copy.intro}
      </p>
      <div className="renewal-sub-privacy__sections">
        {copy.sections.map((section) => (
          <article data-sub-reveal key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="renewal-sub-privacy__effective" data-sub-reveal>
        <span>{copy.effectiveLabel}</span>
        <strong>{copy.effectiveDate}</strong>
      </p>
    </section>
  );
}

function RecruitGuideBody({ language }: { language: RenewalLanguage }) {
  const copy = recruitCopy[language];
  return (
    <>
      <section className="renewal-sub-recruit-values">
        {copy.values.map((value, index) => (
          <article data-sub-reveal key={value.title}>
            <span>0{index + 1}</span>
            <h3>{value.title}</h3>
            <p>{value.copy}</p>
          </article>
        ))}
      </section>
      <section className="renewal-sub-recruit-flow" data-sub-reveal>
        {copy.steps.map((step, index) => (
          <div key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </section>
      <section className="renewal-sub-benefits">
        {copy.benefits.map((benefit) => (
          <span data-sub-reveal key={benefit}>
            {benefit}
          </span>
        ))}
      </section>
    </>
  );
}

function JobsBody({ language }: { language: RenewalLanguage }) {
  const copy = recruitCopy[language];
  const posting = copy.posting;
  return (
    <section className="renewal-sub-postings">
      {copy.jobs.map((job, index) => {
        return (
          <article data-sub-reveal key={job.title}>
            <header>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{job.field}</small>
                <h3>{job.title}</h3>
                <p>{job.copy}</p>
              </div>
              <strong>{job.status}</strong>
            </header>
            <div className="renewal-sub-postings__body">
              <dl>
                <div>
                  <dt>{posting.duties}</dt>
                  <dd>
                    <ul>
                      {job.duties.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>{posting.requirements}</dt>
                  <dd>
                    <ul>
                      {job.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt>{posting.preferred}</dt>
                  <dd>
                    <ul>
                      {job.preferred.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              <aside>
                <dl>
                <div>
                  <dt>{posting.location}</dt>
                  <dd>{posting.locationValue}</dd>
                </div>
                <div>
                  <dt>{posting.employment}</dt>
                  <dd>{posting.employmentValue}</dd>
                </div>
                <div>
                  <dt>{posting.apply}</dt>
                  <dd>{posting.applyValue}</dd>
                </div>
                </dl>
                <a href={posting.applyLink} target="_blank" rel="noopener noreferrer">
                  <span>{posting.applyLinkLabel}</span>
                  <Icon name="arrow" />
                </a>
              </aside>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function RecruitmentBody({ language }: { language: RenewalLanguage }) {
  return (
    <>
      <RecruitGuideBody language={language} />
      <section className="renewal-sub-section-heading" data-sub-reveal>
        <span>OPEN POSITIONS</span>
        <h2>{bodyLabels[language].recruitmentOpenings}</h2>
      </section>
      <JobsBody language={language} />
    </>
  );
}

function BenefitsBody({ language }: { language: RenewalLanguage }) {
  const copy = recruitCopy[language];

  return (
    <>
      <section className="renewal-sub-benefit-lead" data-sub-reveal>
        <span>WORK & GROWTH</span>
        <h2>{bodyLabels[language].welfare}</h2>
        <p>
          {language === "ko"
            ? "현장의 경험이 개인의 성장으로 이어지고, 그 성장이 다시 제조 경쟁력이 되는 환경을 만듭니다."
            : language === "ja"
              ? "現場での経験が個人の成長につながり、その成長が製造競争力の向上につながる環境を整えます。"
              : "We create an environment where shop-floor experience supports personal growth and stronger manufacturing capability."}
        </p>
      </section>
      <section className="renewal-sub-benefits renewal-sub-benefits--large">
        {copy.benefits.map((benefit, index) => (
          <span data-sub-reveal key={benefit}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <strong>{benefit}</strong>
          </span>
        ))}
      </section>
    </>
  );
}

function RouteBody({
  route,
  language,
  content,
}: {
  route: string;
  language: RenewalLanguage;
  content: SiteContent;
}) {
  if (route === "company/overview") return <CompanyOverviewBody language={language} />;
  if (route === "company/ceo") return <CeoBody language={language} />;
  if (route === "company/history") return <HistoryBody content={content} />;
  if (route === "company/location") return <LocationBody language={language} />;
  if (route === "company/notices") return <NewsBody language={language} content={content} />;
  if (route === "support/contact") return <ContactBody language={language} />;
  if (route === "legal/privacy") return <PrivacyBody language={language} />;
  if (route in productRouteIndex) return <ProductDetailBody route={route} content={content} language={language} />;
  if (route.startsWith("manufacturing/")) return <ManufacturingBody route={route} language={language} />;
  if (route === "quality/policy") return <QualityPolicyBody language={language} />;
  if (route === "quality/system") return <QualitySystemBody language={language} />;
  if (route === "quality/preventive") return <PreventiveQualityBody language={language} />;
  if (route === "rnd/parts-development") return <PartsDevelopmentBody content={content} language={language} />;
  if (route === "recruit/information") return <RecruitmentBody language={language} />;
  if (route === "recruit/benefits") return <BenefitsBody language={language} />;
  if (route === "esg/information") return <EnvironmentalBody content={content} language={language} />;
  if (route === "sustainability/policy") return <SustainabilityPolicyBody language={language} />;
  return <GreetingBody content={content} />;
}

function RenewalSubNavigation({ route, language }: { route: string; language: RenewalLanguage }) {
  const { group, child } = findMenuByRoute(route, language);
  const directGroup = group.children.length === 1 && group.children[0].href === group.href;
  const listed = group.children.some((item) => resolveMenuRoute(item.href) === route);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const activeItem = activeItemRef.current;
    const container = activeItem?.parentElement;
    if (!activeItem || !container) return;
    container.scrollTo({
      left: activeItem.offsetLeft - (container.clientWidth - activeItem.clientWidth) / 2,
      behavior: "auto",
    });
  }, [route, language]);

  if (directGroup || !listed) return null;

  return (
    <div className="renewal-sub-navigation">
      <nav
        className="renewal-sub-depth"
        aria-label={`${group.label} submenu`}
        style={{ "--renewal-sub-depth-count": group.children.length } as React.CSSProperties}
      >
        {group.children.map((item) => (
          <a
            className={`${item.label === child.label ? "is-active" : ""}${item.href.includes("products/defense") ? " is-defense" : item.href.includes("products/electric-vehicle") ? " is-electrified" : item.href.includes("products/balance-shaft-module") ? " is-aluminum" : item.href.includes("products/") ? " is-core-product" : ""}`.trim()}
            href={toRenewalHref(item.href, language)}
            ref={item.label === child.label ? activeItemRef : undefined}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function NextPage({ route, language }: { route: string; language: RenewalLanguage }) {
  const flat = getSiteMenuGroups(language).flatMap((group) => group.children.map((child) => ({ group: group.label, child })));
  const currentIndex = flat.findIndex((item) => resolveMenuRoute(item.child.href) === route);
  const next = flat[(currentIndex + 1 + flat.length) % flat.length];

  return (
    <a className="renewal-sub-next" href={toRenewalHref(next.child.href, language)}>
      <span>{uiCopy[language].next}</span>
      <div>
        <small>{next.group}</small>
        <strong>{next.child.label}</strong>
      </div>
      <Icon name="arrow" />
    </a>
  );
}

/** Page configs for routes that pageConfig.ts does not know about (footer / legal pages). */
const localPageConfigs: Record<string, Record<RenewalLanguage, PageConfig>> = {
  "legal/privacy": {
    ko: {
      route: "legal/privacy",
      category: "LEGAL",
      groupTitle: "법적 고지",
      eyebrow: "Privacy Policy",
      title: "개인정보처리방침",
      lead: "서울산업(주)는 홈페이지 문의 과정에서 수집되는 개인정보를 관련 법령에 따라 안전하게 처리합니다.",
      heroCopy: "수집 항목, 이용 목적, 보유 기간, 제3자 제공 여부와 개인정보 보호책임 부서를 안내합니다.",
      image: seoulIndustryFacadeImage,
      imagePosition: "center 55%",
    },
    en: {
      route: "legal/privacy",
      category: "LEGAL",
      groupTitle: "Legal",
      eyebrow: "Privacy Policy",
      title: "Privacy Policy",
      lead: "Seoul Industry handles the personal information collected through website inquiries in accordance with applicable law.",
      heroCopy: "This page describes what we collect, why, how long we keep it, whether it is shared, and whom to contact.",
      image: seoulIndustryFacadeImage,
      imagePosition: "center 55%",
    },
    ja: {
      route: "legal/privacy",
      category: "LEGAL",
      groupTitle: "法的事項",
      eyebrow: "Privacy Policy",
      title: "個人情報保護方針",
      lead: "ソウル産業は、ウェブサイトのお問い合わせを通じて取得する個人情報を関連法令に基づき適切に取り扱います。",
      heroCopy: "取得項目、利用目的、保有期間、第三者提供の有無、個人情報保護責任部署についてご案内します。",
      image: seoulIndustryFacadeImage,
      imagePosition: "center 55%",
    },
  },
};

function resolvePageConfig(route: string, language: RenewalLanguage): PageConfig {
  return localPageConfigs[route]?.[language] ?? getPageConfig(route, language);
}

function readInitialLanguage(): RenewalLanguage {
  if (typeof window === "undefined") return defaultLanguage;
  const current = parseLocation().language;
  if (isLanguageCode(current)) return current;
  const stored = getStoredLanguage();
  return isLanguageCode(stored) ? stored : defaultLanguage;
}

export default function RenewalSubPage({ route }: RenewalSubPageProps) {
  const cleanRoute = resolveMenuRoute(route) || "company/ceo";
  const reducedMotion = usePrefersReducedMotion();
  const [language, setLanguage] = useState<RenewalLanguage>(readInitialLanguage);
  const content = siteContent[language];
  const config = useMemo(() => {
    return resolvePageConfig(cleanRoute, language);
  }, [cleanRoute, language]);
  const rootRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (next: RenewalLanguage) => {
    setLanguage(next);
    setSiteLanguage(next);
  };

  useLenisScroll(!reducedMotion);
  useSubpageReveal(cleanRoute, language);

  useEffect(() => {
    document.body.classList.add("renewal-active");
    jumpToPageTop();
    return () => document.body.classList.remove("renewal-active");
  }, [cleanRoute, language]);

  return (
    <div className="renewal-page renewal-subpage" data-language={language} ref={rootRef}>
      <RenewalSiteHeader language={language} onLanguageChange={changeLanguage} currentRoute={cleanRoute} />
      <main key={`${cleanRoute}-${language}`}>
        <section
          className={`renewal-sub-hero${cleanRoute.startsWith("products/") ? " renewal-sub-hero--product" : ""}`}
          style={
            {
              "--renewal-sub-image": `url(${config.image})`,
              "--renewal-sub-position": config.imagePosition ?? "center",
            } as React.CSSProperties
          }
        >
          <div className="renewal-sub-hero__image" />
          <div className="renewal-sub-hero__shade" />
          <div className="renewal-sub-hero__index">
            <span>{config.category}</span>
            <strong>{config.eyebrow}</strong>
          </div>
          <div className="renewal-sub-hero__content">
            <span>{config.groupTitle}</span>
            <h1>{config.title}</h1>
            <p>{config.heroCopy}</p>
          </div>
          <div className="renewal-sub-hero__line" aria-hidden="true">
            <span />
          </div>
        </section>

        <RenewalSubNavigation route={cleanRoute} language={language} />

        {cleanRoute !== "products/etc" ? (
          <section className="renewal-sub-intro">
            <div className="renewal-sub-intro__title" data-sub-reveal>
              <span>{config.eyebrow}</span>
              <h2>{config.introTitle ?? config.title}</h2>
            </div>
            <div className="renewal-sub-intro__copy" data-sub-reveal>
              <strong>
                {config.lead.split("\n").map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </strong>
              <p>{config.introCopy ?? config.heroCopy}</p>
            </div>
          </section>
        ) : null}

        <div className="renewal-sub-body">
          <RouteBody route={cleanRoute} language={language} content={content} />
        </div>

        <NextPage route={cleanRoute} language={language} />
      </main>
      <RenewalSiteFooter language={language} />
    </div>
  );
}
