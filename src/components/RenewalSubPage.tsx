import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import certificationImage from "../../certification.png";
import iatfCertificateImage from "../../assets/certificates/iatf-16949-seoul-industry.png";
import iatfCertificatePdf from "../../assets/certificates/iatf-16949-seoul-industry.pdf";
import msqCertificateImage from "../../assets/certificates/msq-seoul-industry-2025.png";
import balanceModuleImage from "../../housing.png";
import automotiveImage from "../../electric vehicle.png";
import steeringImage from "../../steering.png";
import drivelineImage from "../../driveline.png";
import powertrainImage from "../../assets/product-lineup/powertrain.jpg";
import precisionImage from "../../precision-inside-mobility.jpg";
import Icon from "./Icons";
import { getPageConfig } from "./MenuPage";
import { RenewalSiteFooter, RenewalSiteHeader, toRenewalHref, type RenewalLanguage } from "./RenewalShell";
import { defaultLanguage, isLanguageCode, siteContent, type SiteContent } from "../data/siteContent";
import { getNoticePosts } from "../data/notices";
import { findMenuByRoute, getSiteMenuGroups, resolveMenuRoute } from "../data/navigation";
import { useLenisScroll } from "../motion/useLenisScroll";
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
    home: "리뉴얼 홈",
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
    home: "Renewal Home",
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
    home: "リニューアルホーム",
    overview: "OVERVIEW",
    standards: "運営基準",
    process: "製造フロー",
    details: "詳細",
    next: "次のページ",
    view: "詳しく見る",
    contact: "プロジェクト相談",
    submit: "お問い合わせを送信",
    sent: "お問い合わせを受け付けました。確認後、担当者よりご連絡いたします。",
    fields: { company: "会社名", name: "担当者名", email: "メール", phone: "連絡先", subject: "お問い合わせ分野", message: "お問い合わせ内容" },
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
    heading: "원본으로 확인하는 서울산업 품질 인증",
    intro: "자동차 부품 양산에 필요한 품질경영 체계와 고객사 공급 품질 기준을 실제 인증서로 확인할 수 있습니다.",
    originalLabel: "인증서 원본 보기",
    items: [
      {
        eyebrow: "AUTOMOTIVE QUALITY MANAGEMENT",
        title: "IATF 16949:2016",
        copy: "Intertek가 서울산업의 조향·엔진·변속기 부품 제조 및 가공 품질경영시스템을 인증했습니다.",
        metadata: ["인증번호 2022-0205", "유효기간 2027.05.23"],
        alt: "서울산업 IATF 16949:2016 인증서",
      },
      {
        eyebrow: "MOBIS SUPPLIER QUALITY",
        title: "MSQ 인증",
        copy: "현대모비스 협력사 품질 인증평가에서 가공 분야 G등급을 취득한 서울산업의 MSQ 인증서입니다.",
        metadata: ["인증번호 MWK0276", "발급일 2025.01.08"],
        alt: "서울산업 MSQ 인증서",
      },
    ],
  },
  en: {
    heading: "Verified quality certifications",
    intro: "Review the original certificates covering Seoul Industry's automotive quality management system and supplier quality capability.",
    originalLabel: "View original certificate",
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
    ],
  },
  ja: {
    heading: "原本で確認する品質認証",
    intro: "自動車部品量産に必要な品質マネジメントシステムと顧客の供給品質基準を、実際の認証書で確認できます。",
    originalLabel: "認証書の原本を見る",
    items: [
      {
        eyebrow: "AUTOMOTIVE QUALITY MANAGEMENT",
        title: "IATF 16949:2016",
        copy: "Intertekが、操舵・エンジン・トランスミッション部品の製造および加工に関するソウル産業の品質マネジメントシステムを認証しました。",
        metadata: ["認証番号 2022-0205", "有効期限 2027.05.23"],
        alt: "ソウル産業 IATF 16949:2016認証書",
      },
      {
        eyebrow: "MOBIS SUPPLIER QUALITY",
        title: "MSQ認証",
        copy: "現代モービスの協力会社品質認証評価において、加工分野G等級を取得したソウル産業のMSQ認証書です。",
        metadata: ["認証番号 MWK0276", "発行日 2025.01.08"],
        alt: "ソウル産業 MSQ認証書",
      },
    ],
  },
};

const certificateAssets = [
  { image: iatfCertificateImage, href: iatfCertificatePdf },
  { image: msqCertificateImage, href: msqCertificateImage },
];

const governanceCopy: Record<RenewalLanguage, Array<{ title: string; copy: string; tag: string }>> = {
  ko: [
    { title: "윤리헌장", copy: "고객, 협력사, 임직원과의 관계에서 지켜야 할 기본 원칙을 명확히 합니다.", tag: "ETHICS" },
    { title: "투명한 기록", copy: "도면 변경, 검사 결과, LOT 이력, 납기 정보를 정해진 절차로 관리합니다.", tag: "RECORD" },
    { title: "공정한 거래", copy: "발주, 품질, 납기 기준을 명확히 공유하고 책임 있는 거래 관계를 유지합니다.", tag: "FAIRNESS" },
    { title: "리스크 대응", copy: "원인, 임시 조치, 개선 기준, 재발 방지까지 하나의 이력으로 연결합니다.", tag: "RISK" },
  ],
  en: [
    { title: "Ethics Charter", copy: "We clarify the principles governing relationships with customers, suppliers, and employees.", tag: "ETHICS" },
    { title: "Transparent Records", copy: "Drawing changes, inspection results, LOT history, and delivery data follow defined procedures.", tag: "RECORD" },
    { title: "Fair Transactions", copy: "Purchase, quality, and delivery standards are shared clearly and managed responsibly.", tag: "FAIRNESS" },
    { title: "Risk Response", copy: "Causes, temporary actions, improvements, and recurrence prevention remain in one history.", tag: "RISK" },
  ],
  ja: [
    { title: "倫理憲章", copy: "顧客、協力会社、従業員との関係で守る基本原則を明確にします。", tag: "ETHICS" },
    { title: "透明な記録", copy: "図面変更、検査結果、LOT履歴、納期情報を定められた手順で管理します。", tag: "RECORD" },
    { title: "公正な取引", copy: "発注、品質、納期基準を明確に共有し、責任ある取引関係を維持します。", tag: "FAIRNESS" },
    { title: "リスク対応", copy: "原因、暫定措置、改善、再発防止までを一つの履歴につなげます。", tag: "RISK" },
  ],
};

const reportCopy: Record<RenewalLanguage, Array<{ year: string; title: string; copy: string }>> = {
  ko: [
    { year: "2026", title: "서울산업 ESG 운영 방향", copy: "환경경영, 안전한 현장, 품질 기록, 준법 거래 기준을 하나의 운영 흐름으로 정리합니다." },
    { year: "2025", title: "현장 개선 활동", copy: "에너지 사용, 폐기물 관리, 불량 감소, 작업 안전 개선 활동을 항목별로 관리합니다." },
    { year: "2024", title: "품질·윤리 기준", copy: "고객 요구사항, 공정 이력, 협력사 거래 기준을 명확하게 남기는 기준을 정리합니다." },
  ],
  en: [
    { year: "2026", title: "Seoul Industry ESG Direction", copy: "Environment, workplace safety, quality records, and compliance are organized into one operating flow." },
    { year: "2025", title: "Site Improvement Activities", copy: "Energy, waste, defect reduction, and workplace safety actions are managed by category." },
    { year: "2024", title: "Quality and Ethics Standards", copy: "Customer requirements, process history, and supplier transaction standards are documented clearly." },
  ],
  ja: [
    { year: "2026", title: "ソウル産業 ESG運営方針", copy: "環境経営、安全な現場、品質記録、コンプライアンスを一つの運営フローに整理します。" },
    { year: "2025", title: "現場改善活動", copy: "エネルギー、廃棄物、不良低減、作業安全の改善活動を項目別に管理します。" },
    { year: "2024", title: "品質・倫理基準", copy: "顧客要求、工程履歴、協力会社との取引基準を明確に記録します。" },
  ],
};

const recruitCopy: Record<
  RenewalLanguage,
  {
    values: Array<{ title: string; copy: string }>;
    steps: string[];
    jobs: Array<{ title: string; field: string; status: string; copy: string }>;
    benefits: string[];
  }
> = {
  ko: {
    values: [
      { title: "기준을 지키는 사람", copy: "도면과 공정 기준을 정확하게 이해하고 약속한 품질을 반복합니다." },
      { title: "개선을 이어가는 사람", copy: "현장의 작은 불편과 품질 흔들림을 발견하고 더 나은 방법을 제안합니다." },
      { title: "함께 완성하는 사람", copy: "생산, 품질, 개발, 관리가 하나의 흐름으로 움직이도록 소통합니다." },
    ],
    steps: ["지원서 접수", "서류 검토", "실무 면접", "입사 협의"],
    jobs: [
      { title: "정밀가공 생산기술", field: "생산·기술", status: "상시채용", copy: "공정 조건, 설비 셋업, 생산성 개선" },
      { title: "자동차부품 품질관리", field: "품질", status: "상시채용", copy: "수입·공정·출하검사, 고객 품질 대응" },
      { title: "생산관리·자재", field: "생산관리", status: "인재등록", copy: "생산계획, 자재 흐름, 납기 관리" },
    ],
    benefits: ["직무·품질 교육", "건강검진", "경조사 지원", "통근·식사 지원", "장기근속 포상", "자격증 지원"],
  },
  en: {
    values: [
      { title: "Keep the Standard", copy: "Understand drawings and process rules precisely and repeat the promised quality." },
      { title: "Continue Improving", copy: "Find small site issues and quality variation, then suggest better methods." },
      { title: "Build Together", copy: "Connect production, quality, development, and administration through clear communication." },
    ],
    steps: ["Application", "Document Review", "Interview", "Offer Discussion"],
    jobs: [
      { title: "Precision Machining Engineer", field: "Production · Engineering", status: "Always Open", copy: "Process conditions, equipment setup, and productivity improvement" },
      { title: "Automotive Quality Engineer", field: "Quality", status: "Always Open", copy: "Incoming, process, shipment inspection, and customer response" },
      { title: "Production and Materials", field: "Production Control", status: "Talent Pool", copy: "Production planning, material flow, and delivery management" },
    ],
    benefits: ["Job and quality training", "Health checks", "Family event support", "Commuting and meals", "Long-service awards", "Certification support"],
  },
  ja: {
    values: [
      { title: "基準を守る人", copy: "図面と工程基準を正確に理解し、約束した品質を繰り返します。" },
      { title: "改善を続ける人", copy: "現場の小さな不便や品質変動を見つけ、より良い方法を提案します。" },
      { title: "共に完成する人", copy: "生産、品質、開発、管理が一つの流れで動くように意思疎通します。" },
    ],
    steps: ["応募受付", "書類検討", "実務面接", "入社協議"],
    jobs: [
      { title: "精密加工生産技術", field: "生産・技術", status: "常時採用", copy: "工程条件、設備セットアップ、生産性改善" },
      { title: "自動車部品品質管理", field: "品質", status: "常時採用", copy: "受入・工程・出荷検査、顧客品質対応" },
      { title: "生産管理・資材", field: "生産管理", status: "人材登録", copy: "生産計画、資材フロー、納期管理" },
    ],
    benefits: ["職務・品質教育", "健康診断", "慶弔支援", "通勤・食事支援", "長期勤続表彰", "資格取得支援"],
  },
};

const productImages = [balanceModuleImage, automotiveImage, steeringImage, drivelineImage];

const ceoCopy: Record<RenewalLanguage, { quote: string; paragraphs: string[]; sign: string }> = {
  ko: {
    quote: "고객의 신뢰를 바탕으로 지속가능한 성장을 추구합니다.",
    paragraphs: [
      "안녕하십니까! 저희 서울산업 홈페이지를 찾아주셔서 감사합니다.",
      "서울산업㈜는 1985년 자동차 부품 정밀 가공 업체로 설립되었습니다.",
      "30년간의 정밀 가공 노하우로 국내 완성차 Maker와 유럽(독일, 이태리), 북·남미(미국, 캐나다, 멕시코), 아시아(일본, 중국) 등 Global Maker와의 견고한 파트너십 형성으로 지속적인 수출 향상 기업으로 성장하고 있습니다.",
      "전 임직원의 끊임없는 연구개발과 신기술 축적으로 고객이 원하는 품질 요구 사양을 명확히 이해하고 최적의 품질 수준을 유지하여, 대한민국을 넘어 세계 속의 자동차 부품 회사로 발돋움하기 위해 전 임직원이 창의적인 사고와 고객 중심적인 품질 수준으로 보답하도록 하겠습니다.",
      "화합으로 창조하는 기업이라는 경영 철학으로 고객이 원하는 최고의 품질과 사회에 공헌하는 Global Leader 기업이 될 수 있도록 최선을 다하겠습니다.",
    ],
    sign: "서울산업(주) 대표이사 김을식",
  },
  en: {
    quote: "We aim for continuous growth based on our customers' trust.",
    paragraphs: [
      "Dear Customer, Seoul Industry is a company which creates in harmony.",
      "Seoul Industry has been in the automotive industry for about 30 years, serving our valued customers across the world. This has only been possible because we have worked to meet our customers' requirements and expectations for quality and reliability.",
      "Doing so has been my goal, and it will remain the goal of all our employees. For you, we will continue to improve our quality so that your products are safe and reliable.",
      "Thank you.",
    ],
    sign: "Best Regards, Eulsik Kim",
  },
  ja: {
    quote: "お客様の信頼を基盤に、持続可能な成長を追求します。",
    paragraphs: [
      "こんにちは。ソウル産業のウェブサイトをご訪問いただき、ありがとうございます。",
      "ソウル産業株式会社は1985年、自動車部品の精密加工会社として設立されました。",
      "30年にわたり蓄積した精密加工ノウハウをもとに、韓国の完成車メーカーをはじめ、欧州（ドイツ、イタリア）、北・南米（米国、カナダ、メキシコ）、アジア（日本、中国）などのグローバルメーカーと強固なパートナーシップを築き、輸出を持続的に拡大する企業へ成長しています。",
      "全社員の絶え間ない研究開発と新技術の蓄積により、お客様が求める品質仕様を明確に理解し、最適な品質水準を維持します。韓国を越えて世界の自動車部品企業へと飛躍するため、創造的な発想とお客様中心の品質でお応えしてまいります。",
      "「調和から創造する企業」という経営哲学のもと、お客様が求める最高の品質を実現し、社会に貢献するGlobal Leaderとなれるよう最善を尽くします。",
    ],
    sign: "ソウル産業株式会社 代表取締役 キム・ウルシク",
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

const productRouteImages: Record<string, string> = {
  "products/balance-shaft-module": balanceModuleImage,
  "products/electric-vehicle": automotiveImage,
  "products/steering": steeringImage,
  "products/powertrain": powertrainImage,
  "products/driveline": drivelineImage,
  "products/etc": precisionImage,
};

const productStandards: Record<string, string[]> = {
  "products/electric-vehicle": ["e-DRIVE HOUSING", "REDUCTION GEAR", "EV HALF SHAFT", "ASSEMBLY FIT"],
  "products/powertrain": ["HOUSING", "SHAFT", "GEAR / SPLINE", "HEAT & VIBRATION"],
  "products/driveline": ["OUTPUT SHAFT", "HALF / STUB AXLE", "RUNOUT", "SPLINE QUALITY"],
  "products/balance-shaft-module": ["AL HOUSING", "BEARING BORE", "ASSEMBLY FACE", "VIBRATION CONTROL"],
  "products/steering": ["PINION SHAFT", "TORSION BAR", "GEAR PROFILE", "SAFETY CHARACTERISTIC"],
  "products/etc": ["DRAWING REVIEW", "PROTOTYPE", "PROCESS DESIGN", "CUSTOM OEM"],
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
    application: "적용·관리 기준",
    manufacturing: "제품별 제조 대응",
    qualityFlow: "품질 운영 흐름",
    policyStatement: "서울산업 품질방침",
    developmentFlow: "부품개발 프로세스",
    office: "본사·공장",
    directions: "방문 안내",
    map: "지도에서 보기",
    recruitmentOpenings: "모집 직무",
    welfare: "복지 지원",
  },
  en: {
    application: "Application & Controls",
    manufacturing: "Manufacturing Response",
    qualityFlow: "Quality Operating Flow",
    policyStatement: "Seoul Industry Quality Policy",
    developmentFlow: "Parts Development Process",
    office: "Head Office & Factory",
    directions: "Visit Information",
    map: "Open Map",
    recruitmentOpenings: "Open Roles",
    welfare: "Employee Support",
  },
  ja: {
    application: "適用・管理基準",
    manufacturing: "製品別製造対応",
    qualityFlow: "品質運営フロー",
    policyStatement: "ソウル産業 品質方針",
    developmentFlow: "部品開発プロセス",
    office: "本社・工場",
    directions: "訪問案内",
    map: "地図で見る",
    recruitmentOpenings: "募集職種",
    welfare: "福利厚生",
  },
};

const qualityPrinciples: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "고객 요구 우선", copy: "도면, 사양, 특별특성, 납품 기준을 개발 단계에서 명확히 확인합니다." },
    { title: "공정에서 완성", copy: "검사에만 의존하지 않고 표준화된 조건과 작업 기준으로 품질을 만듭니다." },
    { title: "데이터로 검증", copy: "주요 치수와 형상, 설비 조건, LOT 이력을 연결해 결과를 추적합니다." },
    { title: "지속적인 개선", copy: "불량 원인과 변경점을 기록하고 재발방지 활동을 표준에 반영합니다." },
  ],
  en: [
    { title: "Customer Requirements", copy: "Drawings, specifications, special characteristics, and delivery standards are confirmed early." },
    { title: "Built in Process", copy: "Quality is created through standardized conditions and work rules, not inspection alone." },
    { title: "Verified by Data", copy: "Key dimensions, geometry, equipment conditions, and LOT history remain traceable." },
    { title: "Continuous Improvement", copy: "Defect causes and changes are recorded, and prevention actions update the standard." },
  ],
  ja: [
    { title: "顧客要求優先", copy: "図面、仕様、特殊特性、納入基準を開発段階で明確に確認します。" },
    { title: "工程で完成", copy: "検査だけに頼らず、標準化した条件と作業基準で品質を造り込みます。" },
    { title: "データで検証", copy: "主要寸法、形状、設備条件、LOT履歴をつなぎ、結果を追跡します。" },
    { title: "継続的改善", copy: "不良原因と変更点を記録し、再発防止を標準へ反映します。" },
  ],
};

const qualityFlow: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "도면·사양 검토", copy: "고객 요구와 특별특성, 검사 기준을 개발 단계에서 확인합니다." },
    { title: "수입·초도 검사", copy: "소재와 외주 공정, 초도품이 승인 기준에 맞는지 검증합니다." },
    { title: "공정 품질 관리", copy: "Air Gauge, 비전, 치수 측정과 SPC로 공정 상태를 확인합니다." },
    { title: "최종·출하 검사", copy: "최종 치수와 외관, 포장, 식별표를 확인한 뒤 출하합니다." },
    { title: "LOT 추적", copy: "검사 결과와 설비 조건, 작업 이력을 LOT 단위로 연결합니다." },
  ],
  en: [
    { title: "Drawing Review", copy: "Customer requirements, special characteristics, and inspection criteria are confirmed." },
    { title: "Incoming & First Article", copy: "Materials, outsourced processes, and first articles are validated against approval criteria." },
    { title: "Process Quality", copy: "Air gauges, vision systems, dimensional checks, and SPC monitor process conditions." },
    { title: "Final & Shipment", copy: "Final dimensions, appearance, packing, and identification are checked before shipment." },
    { title: "LOT Traceability", copy: "Inspection, equipment, and work history are connected by production lot." },
  ],
  ja: [
    { title: "図面・仕様検討", copy: "顧客要求、特殊特性、検査基準を開発段階で確認します。" },
    { title: "受入・初品検査", copy: "素材、外注工程、初品を承認基準に照らして検証します。" },
    { title: "工程品質管理", copy: "Air Gauge、画像、寸法測定、SPCで工程状態を確認します。" },
    { title: "最終・出荷検査", copy: "最終寸法、外観、梱包、識別票を確認して出荷します。" },
    { title: "LOT追跡", copy: "検査結果、設備条件、作業履歴をLOT単位でつなぎます。" },
  ],
};

const preventiveFlow: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "위험요인 식별", copy: "공정 FMEA와 과거 불량 이력을 바탕으로 잠재 위험을 먼저 찾습니다." },
    { title: "관리계획 수립", copy: "특별특성, 검사 주기, 반응 계획, 담당자를 관리계획에 명확히 둡니다." },
    { title: "초도품 검증", copy: "설비·치공구 조건과 측정 결과를 확인해 양산 승인 전에 문제를 제거합니다." },
    { title: "SPC·자동 보정", copy: "측정 데이터를 기록하고 필요 시 자동 오프셋으로 공정 변동을 줄입니다." },
    { title: "변경점·재발방지", copy: "4M 변경과 이상 발생 시 원인, 조치, 효과 확인을 하나의 이력으로 관리합니다." },
  ],
  en: [
    { title: "Identify Risk", copy: "Process FMEA and prior defect history reveal potential risks before launch." },
    { title: "Control Plan", copy: "Special characteristics, inspection frequency, reaction plans, and owners are defined." },
    { title: "First-Article Validation", copy: "Equipment, tooling, and measurement results are verified before production approval." },
    { title: "SPC & Auto Offset", copy: "Measurement data and automatic offset control reduce process variation." },
    { title: "Change & Prevention", copy: "4M changes and abnormalities are managed from cause through effectiveness review." },
  ],
  ja: [
    { title: "リスク特定", copy: "工程FMEAと過去不良履歴から潜在リスクを先に見つけます。" },
    { title: "管理計画", copy: "特殊特性、検査周期、反応計画、担当者を明確にします。" },
    { title: "初品検証", copy: "設備・治工具条件と測定結果を確認し、量産承認前に問題を除去します。" },
    { title: "SPC・自動補正", copy: "測定データと自動オフセットで工程変動を抑えます。" },
    { title: "変更・再発防止", copy: "4M変更と異常を原因、措置、効果確認まで一つの履歴で管理します。" },
  ],
};

const developmentFlow: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "요구사항 분석", copy: "도면, 소재, 특별특성, 목표 물량과 납기를 검토합니다." },
    { title: "가공성 검토", copy: "공정 순서, 설비, 공구, 치공구와 검사 방법을 설계합니다." },
    { title: "시제품 제작", copy: "초도 가공과 측정으로 형상, 조립성, 핵심 치수를 검증합니다." },
    { title: "공정 설계", copy: "PFMEA, 관리계획, 작업표준과 LOT 추적 기준을 확정합니다." },
    { title: "양산 검증", copy: "공정 능력과 반복 생산성, 포장·출하 조건을 확인합니다." },
    { title: "양산 이관", copy: "승인 조건을 현장 표준으로 연결하고 변경점을 지속 관리합니다." },
  ],
  en: [
    { title: "Requirement Analysis", copy: "Drawings, material, special characteristics, volume, and timing are reviewed." },
    { title: "Feasibility", copy: "Process sequence, equipment, tools, fixtures, and inspection methods are designed." },
    { title: "Prototype", copy: "Initial machining and measurement validate geometry, assembly, and key dimensions." },
    { title: "Process Design", copy: "PFMEA, control plans, work standards, and LOT traceability are finalized." },
    { title: "Production Validation", copy: "Capability, repeat output, packing, and shipment conditions are confirmed." },
    { title: "Launch", copy: "Approved conditions become site standards, and changes remain controlled." },
  ],
  ja: [
    { title: "要求分析", copy: "図面、素材、特殊特性、目標数量、納期を検討します。" },
    { title: "加工性検討", copy: "工程順序、設備、工具、治工具、検査方法を設計します。" },
    { title: "試作", copy: "初品加工と測定で形状、組立性、主要寸法を検証します。" },
    { title: "工程設計", copy: "PFMEA、管理計画、作業標準、LOT追跡基準を確定します。" },
    { title: "量産検証", copy: "工程能力、反復生産性、梱包・出荷条件を確認します。" },
    { title: "量産移管", copy: "承認条件を現場標準につなぎ、変更点を継続管理します。" },
  ],
};

const locationCopy: Record<RenewalLanguage, { address: string; visit: string; email: string }> = {
  ko: {
    address: "경기도 화성시 양감면 요당길 320번길 51 서울산업(주)",
    visit: "공장 방문은 사전 협의가 필요합니다. 도착 전 담당자에게 연락해 주십시오.",
    email: "admin@seoulind.co.kr",
  },
  en: {
    address: "51, Yodang-gil 320beon-gil, Yanggam-myeon, Hwaseong-si, Gyeonggi-do, Korea",
    visit: "Factory visits require advance coordination. Please contact your representative before arrival.",
    email: "admin@seoulind.co.kr",
  },
  ja: {
    address: "韓国 京畿道 華城市 楊甘面 ヨダンギル320番ギル51 ソウル産業",
    visit: "工場訪問は事前調整が必要です。到着前に担当者へご連絡ください。",
    email: "admin@seoulind.co.kr",
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

function CeoBody({ language }: { language: RenewalLanguage }) {
  const copy = ceoCopy[language];

  return (
    <section className="renewal-sub-ceo">
      <div className="renewal-sub-ceo__visual" data-sub-reveal>
        <img src={precisionImage} alt="" />
        <span>SINCE 1985 · SEOUL INDUSTRY</span>
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

function LocationBody({ language }: { language: RenewalLanguage }) {
  const copy = locationCopy[language];
  const labels = bodyLabels[language];
  const mapQuery = "서울산업(주), 경기도 화성시 양감면 요당길 320번길 51";
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
          <a href={mapUrl} target="_blank" rel="noreferrer">{copy.address}</a>
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
    </section>
  );
}

function HistoryBody({ content }: { content: SiteContent }) {
  return (
    <section className="renewal-sub-history">
      <div className="renewal-sub-history__since" data-sub-reveal>
        <span>{content.historyHeading.eyebrow}</span>
        <strong>{content.historyHeading.since}</strong>
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
        <span>CERTIFIED QUALITY SYSTEM</span>
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
                <img src={certificateAssets[index].image} alt={certificate.alt} />
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

function ProductDetailBody({
  route,
  content,
  language,
}: {
  route: string;
  content: SiteContent;
  language: RenewalLanguage;
}) {
  const productIndex = productRouteIndex[route] ?? 0;
  const product = content.products[productIndex];
  const image = productRouteImages[route] ?? product.image;
  const standards = productStandards[route] ?? [];
  const labels = bodyLabels[language];

  return (
    <>
      <section className="renewal-sub-product-detail">
        <figure data-sub-reveal>
          <span>{String(productIndex + 1).padStart(2, "0")}</span>
          <img src={image} alt={product.title} />
        </figure>
        <div data-sub-reveal>
          <small>{product.category}</small>
          <h2>{product.title}</h2>
          <p>{product.copy}</p>
          <h3>{labels.application}</h3>
          <div className="renewal-sub-product-detail__tags">
            {standards.map((standard) => (
              <span key={standard}>{standard}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="renewal-sub-section-heading" data-sub-reveal>
        <span>PROCESS STANDARD</span>
        <h2>{labels.manufacturing}</h2>
      </section>
      <CapabilityGrid content={content} />
    </>
  );
}

function QualityPolicyBody({ language }: { language: RenewalLanguage }) {
  const labels = bodyLabels[language];
  const principles = qualityPrinciples[language];

  return (
    <>
      <section className="renewal-sub-policy-statement" data-sub-reveal>
        <span>QUALITY FIRST</span>
        <h2>{labels.policyStatement}</h2>
        <p>
          {language === "ko"
            ? "고객이 요구하는 품질을 정확히 이해하고 모든 공정에서 표준을 준수하며, 예방과 개선을 통해 무결점 품질을 지향합니다."
            : language === "ja"
              ? "顧客が求める品質を正確に理解し、すべての工程で標準を守り、予防と改善を通じてゼロディフェクトを目指します。"
              : "We understand customer quality requirements, follow standards in every process, and pursue zero defects through prevention and improvement."}
        </p>
      </section>
      <section className="renewal-sub-governance">
        {principles.map((item, index) => (
          <article data-sub-reveal key={item.title}>
            <span>QUALITY PRINCIPLE</span>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function ProcessFlow({
  items,
  label,
}: {
  items: Array<{ title: string; copy: string }>;
  label: string;
}) {
  return (
    <section className="renewal-sub-process-flow" aria-label={label}>
      {items.map((item, index) => (
        <article data-sub-reveal key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
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
      <ProcessFlow items={qualityFlow[language]} label={labels.qualityFlow} />
      <CertificatesBody language={language} />
    </>
  );
}

function PreventiveQualityBody({ language }: { language: RenewalLanguage }) {
  const labels = bodyLabels[language];

  return (
    <>
      <section className="renewal-sub-preventive-visual" data-sub-reveal>
        <img src={certificationImage} alt="" />
        <div>
          <span>ZERO DEFECT APPROACH</span>
          <strong>PLAN · VERIFY · CONTROL · IMPROVE</strong>
        </div>
      </section>
      <section className="renewal-sub-section-heading" data-sub-reveal>
        <span>PREVENTIVE QUALITY</span>
        <h2>{labels.qualityFlow}</h2>
      </section>
      <ProcessFlow items={preventiveFlow[language]} label={labels.qualityFlow} />
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
      <ProcessFlow items={developmentFlow[language]} label={labels.developmentFlow} />
    </>
  );
}

function EnvironmentalBody({ content }: { content: SiteContent }) {
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
    </>
  );
}

function GovernanceBody({ language }: { language: RenewalLanguage }) {
  return (
    <section className="renewal-sub-governance">
      {governanceCopy[language].map((item, index) => (
        <article data-sub-reveal key={item.title}>
          <span>{item.tag}</span>
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </section>
  );
}

function ReportBody({ language }: { language: RenewalLanguage }) {
  return (
    <section className="renewal-sub-reports">
      {reportCopy[language].map((report, index) => (
        <article data-sub-reveal key={report.year}>
          <strong>{report.year}</strong>
          <div>
            <span>REPORT 0{index + 1}</span>
            <h3>{report.title}</h3>
            <p>{report.copy}</p>
          </div>
          <span className="renewal-sub-reports__mark" aria-hidden="true">
            <Icon name="arrow" />
          </span>
        </article>
      ))}
    </section>
  );
}

function AutomotiveBody({ content }: { content: SiteContent }) {
  return (
    <section className="renewal-sub-products">
      {content.products.slice(0, 4).map((product, index) => (
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
  const posts = getNoticePosts().slice(0, 6);

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

function ContactBody({ language }: { language: RenewalLanguage }) {
  const [sent, setSent] = useState(false);
  const copy = uiCopy[language];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="renewal-sub-contact">
      <aside data-sub-reveal>
        <span>SEOUL INDUSTRY</span>
        <h2>{copy.contact}</h2>
        <a href="tel:+82313661141">+82 31 366 1141</a>
      </aside>
      <form onSubmit={submit} data-sub-reveal>
        <label>
          <span>{copy.fields.company}</span>
          <input name="company" required />
        </label>
        <label>
          <span>{copy.fields.name}</span>
          <input name="name" required />
        </label>
        <label>
          <span>{copy.fields.email}</span>
          <input name="email" type="email" required />
        </label>
        <label>
          <span>{copy.fields.phone}</span>
          <input name="phone" />
        </label>
        <label className="is-wide">
          <span>{copy.fields.subject}</span>
          <input name="subject" required />
        </label>
        <label className="is-wide">
          <span>{copy.fields.message}</span>
          <textarea name="message" rows={6} required />
        </label>
        <button type="submit">
          <span>{copy.submit}</span>
          <Icon name="arrow" />
        </button>
        {sent && <p className="renewal-sub-contact__success">{copy.sent}</p>}
      </form>
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
  return (
    <section className="renewal-sub-jobs">
      {copy.jobs.map((job, index) => (
        <article data-sub-reveal key={job.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <small>{job.field}</small>
            <h3>{job.title}</h3>
            <p>{job.copy}</p>
          </div>
          <strong>{job.status}</strong>
          <a href="mailto:admin@seoulind.co.kr">
            <Icon name="arrow" />
          </a>
        </article>
      ))}
    </section>
  );
}

function RecruitmentBody({ language }: { language: RenewalLanguage }) {
  return (
    <>
      <RecruitGuideBody language={language} />
      <section className="renewal-sub-section-heading" data-sub-reveal>
        <span>OPEN POSITION</span>
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
            ? "현장의 경험이 개인의 성장으로 이어지고, 개인의 성장이 다시 제조 경쟁력이 되도록 지원합니다."
            : language === "ja"
              ? "現場での経験が個人の成長につながり、その成長が製造競争力へ戻る環境を支援します。"
              : "We help shop-floor experience become personal growth, and personal growth become stronger manufacturing capability."}
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

function SustainabilityPolicyBody({ language }: { language: RenewalLanguage }) {
  return (
    <>
      <section className="renewal-sub-policy-statement renewal-sub-policy-statement--dark" data-sub-reveal>
        <span>RESPONSIBLE MANUFACTURING</span>
        <h2>
          {language === "ko"
            ? "제조의 모든 결정에 환경·안전·품질·윤리 기준을 함께 둡니다."
            : language === "ja"
              ? "製造のすべての判断に、環境・安全・品質・倫理の基準を置きます。"
              : "Every manufacturing decision considers environment, safety, quality, and ethics."}
        </h2>
      </section>
      <GovernanceBody language={language} />
      <ReportBody language={language} />
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
  if (route === "company/ceo") return <CeoBody language={language} />;
  if (route === "company/history") return <HistoryBody content={content} />;
  if (route === "company/location") return <LocationBody language={language} />;
  if (route === "company/notices") return <NewsBody language={language} content={content} />;
  if (route in productRouteIndex) return <ProductDetailBody route={route} content={content} language={language} />;
  if (route === "quality/policy") return <QualityPolicyBody language={language} />;
  if (route === "quality/system") return <QualitySystemBody language={language} />;
  if (route === "quality/preventive") return <PreventiveQualityBody language={language} />;
  if (route === "rnd/parts-development") return <PartsDevelopmentBody content={content} language={language} />;
  if (route === "recruit/information") return <RecruitmentBody language={language} />;
  if (route === "recruit/benefits") return <BenefitsBody language={language} />;
  if (route === "esg/information") return <EnvironmentalBody content={content} />;
  if (route === "sustainability/policy") return <SustainabilityPolicyBody language={language} />;
  return <GreetingBody content={content} />;
}

function RenewalSubNavigation({ route, language }: { route: string; language: RenewalLanguage }) {
  const { group, child } = findMenuByRoute(route, language);
  const directGroup = group.children.length === 1 && group.children[0].href === group.href;
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

  if (directGroup) return null;

  return (
    <div className="renewal-sub-navigation">
      <nav
        className="renewal-sub-depth"
        aria-label={`${group.label} submenu`}
        style={{ "--renewal-sub-depth-count": group.children.length } as React.CSSProperties}
      >
        {group.children.map((item) => (
          <a
            className={item.label === child.label ? "is-active" : ""}
            href={toRenewalHref(item.href)}
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
  const currentIndex = flat.findIndex((item) => item.child.href.replace(/^#\/?/, "") === route);
  const next = flat[(currentIndex + 1 + flat.length) % flat.length];

  return (
    <a className="renewal-sub-next" href={toRenewalHref(next.child.href)}>
      <span>{uiCopy[language].next}</span>
      <div>
        <small>{next.group}</small>
        <strong>{next.child.label}</strong>
      </div>
      <Icon name="arrow" />
    </a>
  );
}

export default function RenewalSubPage({ route }: RenewalSubPageProps) {
  const cleanRoute = resolveMenuRoute(route) || "company/ceo";
  const reducedMotion = usePrefersReducedMotion();
  const [language, setLanguage] = useState<RenewalLanguage>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const saved = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(saved) ? saved : defaultLanguage;
  });
  const content = siteContent[language];
  const config = useMemo(() => {
    return getPageConfig(cleanRoute, language);
  }, [cleanRoute, language]);
  const rootRef = useRef<HTMLDivElement>(null);

  useLenisScroll(!reducedMotion);
  useSubpageReveal(cleanRoute, language);

  useEffect(() => {
    document.body.classList.add("renewal-active");
    document.documentElement.lang = language === "ko" ? "ko-KR" : language === "ja" ? "ja-JP" : "en";
    window.localStorage.setItem("seoulind-language", language);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => document.body.classList.remove("renewal-active");
  }, [cleanRoute, language]);

  return (
    <div className="renewal-page renewal-subpage" data-language={language} ref={rootRef}>
      <RenewalSiteHeader language={language} onLanguageChange={setLanguage} currentRoute={cleanRoute} />
      <main key={`${cleanRoute}-${language}`}>
        <section
          className="renewal-sub-hero"
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

        <section className="renewal-sub-intro">
          <div className="renewal-sub-intro__title" data-sub-reveal>
            <span>{config.eyebrow}</span>
            <h2>{config.title}</h2>
          </div>
          <div className="renewal-sub-intro__copy" data-sub-reveal>
            <strong>{config.lead}</strong>
            <p>{config.heroCopy}</p>
          </div>
        </section>

        <div className="renewal-sub-body">
          <RouteBody route={cleanRoute} language={language} content={content} />
        </div>

        <NextPage route={cleanRoute} language={language} />
      </main>
      <RenewalSiteFooter language={language} />
    </div>
  );
}
