import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import certificationImage from "../../certification.png";
import drivelineImage from "../../driveline.png";
import automotiveImage from "../../electric vehicle.png";
import balanceModuleImage from "../../housing.png";
import precisionHeroImage from "../../precision-inside-mobility.jpg";
import steeringImage from "../../steering.png";
import BrainallLogo from "./BrainallLogo";
import Header from "./Header";
import Icon from "./Icons";
import { defaultLanguage, isLanguageCode, siteContent, type LanguageCode } from "../data/siteContent";
import { getNoticePosts, newsCategoryLabels, noticeCategoryKickers } from "../data/notices";
import { findMenuByRoute, getSiteMenuGroups } from "../data/navigation";

type MenuPageProps = {
  route: string;
};

type PageConfig = {
  route: string;
  category: string;
  groupTitle: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroCopy: string;
  image: string;
  imagePosition?: string;
};

const menuHeroImage = (id: string, width = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const menuHeroImages = {
  factory: menuHeroImage("photo-1504917595217-d4dc5ebe6122"),
  precision: menuHeroImage("photo-1581092580497-e0d23cbdf1dc"),
  measurement: menuHeroImage("photo-1581092580497-e0d23cbdf1dc"),
  documents: menuHeroImage("photo-1450101499163-c8848c66ca85"),
  solar: menuHeroImage("photo-1497435334941-8c899ee9e8e9"),
  governance: menuHeroImage("photo-1517048676732-d65bc937f952"),
  report: menuHeroImage("photo-1552664730-d307ca884978"),
  industrial: menuHeroImage("photo-1513828583688-c52646db42da"),
  news: menuHeroImage("photo-1556761175-b413da4baf72"),
  contact: menuHeroImage("photo-1517245386807-bb43f82c33c4"),
  recruit: menuHeroImage("photo-1521737604893-d14cc237f11d"),
  jobs: menuHeroImage("photo-1552664730-d307ca884978"),
};

const pageConfigs: Record<string, PageConfig> = {
  "company/greeting": {
    route: "company/greeting",
    category: "ABOUT US",
    groupTitle: "회사소개",
    eyebrow: "CEO Message",
    title: "인사말",
    lead: "최고의 품질과 정밀가공 기술로 자동차 부품 OEM 시장에서 신뢰받는 제조 파트너가 되겠습니다.",
    heroCopy: "도면 검토부터 양산 공급까지, 고객사의 생산 계획에 맞춰 흔들림 없는 제조 흐름을 만듭니다.",
    image: menuHeroImages.factory,
    imagePosition: "center 56%",
  },
  "company/history": {
    route: "company/history",
    category: "ABOUT US",
    groupTitle: "회사소개",
    eyebrow: "History",
    title: "회사연혁",
    lead: "1985년 설립 이후 자동차 부품 정밀가공과 OEM 양산 공급 역량을 축적해 왔습니다.",
    heroCopy: "조향부품 양산에서 시작해 품질 인증, 글로벌 고객 대응, 생산 기술 고도화까지 서울산업의 제조 기반은 꾸준히 확장되고 있습니다.",
    image: menuHeroImages.documents,
    imagePosition: "center 48%",
  },
  "company/certificates": {
    route: "company/certificates",
    category: "ABOUT US",
    groupTitle: "회사소개",
    eyebrow: "Certification",
    title: "인증서",
    lead: "품질·환경·기술 기준을 기반으로 고객이 요구하는 제조 신뢰성을 유지합니다.",
    heroCopy: "인증은 결과가 아니라 매일 같은 기준으로 공정을 움직이게 하는 서울산업의 운영 방식입니다.",
    image: menuHeroImages.measurement,
    imagePosition: "center 45%",
  },
  "sustainability/environmental": {
    route: "sustainability/environmental",
    category: "ESG",
    groupTitle: "지속가능 경영",
    eyebrow: "Environmental",
    title: "Environmental",
    lead: "에너지와 자원 사용을 줄이고 공정 효율을 높여 지속 가능한 정밀가공 현장을 만들어 갑니다.",
    heroCopy: "환경 관리 기준을 생산 현장 안에 두고, 효율적인 공정 운영으로 제조 과정의 부담을 낮춥니다.",
    image: menuHeroImages.solar,
    imagePosition: "center 50%",
  },
  "sustainability/governance": {
    route: "sustainability/governance",
    category: "ESG",
    groupTitle: "지속가능 경영",
    eyebrow: "Governance",
    title: "Governance",
    lead: "도면, 품질, 납기, 거래 기준을 투명하게 관리해 장기적인 OEM 파트너십을 만듭니다.",
    heroCopy: "공정 이력과 품질 기록을 명확히 남기고, 고객 요구사항을 책임 있게 관리합니다.",
    image: menuHeroImages.governance,
    imagePosition: "center 48%",
  },
  "sustainability/esg-report": {
    route: "sustainability/esg-report",
    category: "ESG",
    groupTitle: "지속가능 경영",
    eyebrow: "ESG Report",
    title: "ESG보고서",
    lead: "환경, 안전, 품질 기록, 투명한 거래 기준을 중심으로 서울산업의 지속가능경영 방향을 정리합니다.",
    heroCopy: "현장에서 지켜지는 기준과 고객에게 전달되는 신뢰를 함께 높이기 위해 ESG 활동을 관리합니다.",
    image: menuHeroImages.report,
    imagePosition: "center 48%",
  },
  "products/automotive": {
    route: "products/automotive",
    category: "PRODUCT",
    groupTitle: "제품소개",
    eyebrow: "Automotive",
    title: "자동차",
    lead: "BSM, EV, Steering, Powertrain, Driveline 등 자동차 주요 시스템에 필요한 정밀 가공 부품을 생산합니다.",
    heroCopy: "도면 검토부터 샘플, 양산, 검사, 출하까지 자동차 부품 OEM 생산의 흐름을 안정적으로 연결합니다.",
    image: menuHeroImages.precision,
    imagePosition: "center 45%",
  },
  "products/industrial": {
    route: "products/industrial",
    category: "PRODUCT",
    groupTitle: "제품소개",
    eyebrow: "Industrial Machinery",
    title: "산업기계",
    lead: "고객 도면과 사용 환경에 맞춘 정밀 가공 부품으로 산업 현장의 동력 전달과 설비 안정성을 지원합니다.",
    heroCopy: "반복 정밀도, 표면 품질, 내구 조건을 기준으로 산업기계 부품의 생산 흐름을 설계합니다.",
    image: menuHeroImages.industrial,
    imagePosition: "center 52%",
  },
  "support/news": {
    route: "support/news",
    category: "COMMUNITY",
    groupTitle: "고객지원",
    eyebrow: "News",
    title: "News",
    lead: "제품군, 제조 공정, 품질 대응과 관련된 서울산업의 새로운 소식을 확인하세요.",
    heroCopy: "서울산업의 제조 역량과 고객지원 정보를 빠르게 볼 수 있도록 주요 소식을 모았습니다.",
    image: menuHeroImages.news,
    imagePosition: "center 46%",
  },
  "support/contact": {
    route: "support/contact",
    category: "COMMUNITY",
    groupTitle: "고객지원",
    eyebrow: "Contact",
    title: "문의하기",
    lead: "제품 개발, 양산 검토, 견적, 품질 관련 문의를 남겨 주시면 담당자가 확인 후 연락드립니다.",
    heroCopy: "도면과 생산 조건을 함께 공유해 주시면 더 정확한 검토와 회신이 가능합니다.",
    image: menuHeroImages.contact,
    imagePosition: "center 52%",
  },
  "recruit/guide": {
    route: "recruit/guide",
    category: "RECRUITMENT",
    groupTitle: "인재채용",
    eyebrow: "Recruit",
    title: "채용안내",
    lead: "정밀가공 현장과 품질 기준을 함께 만들어 갈 동료를 기다립니다.",
    heroCopy: "서울산업은 제조 역량이 사람의 숙련과 책임감에서 시작된다고 믿습니다.",
    image: menuHeroImages.recruit,
    imagePosition: "center 50%",
  },
  "recruit/jobs": {
    route: "recruit/jobs",
    category: "RECRUITMENT",
    groupTitle: "인재채용",
    eyebrow: "Job Opening",
    title: "채용공고",
    lead: "현재 모집 중인 직무와 지원 정보를 확인하세요.",
    heroCopy: "생산, 품질, 개발, 관리 영역에서 서울산업의 다음 제조 기준을 함께 만들 인재를 찾습니다.",
    image: menuHeroImages.jobs,
    imagePosition: "center 50%",
  },
};

const pageConfigTranslations: Record<Exclude<LanguageCode, "ko">, Record<string, Partial<PageConfig>>> = {
  en: {
    "company/greeting": {
      groupTitle: "Company",
      title: "Greeting",
      lead: "We aim to be a trusted manufacturing partner in the automotive OEM market through quality and precision machining.",
      heroCopy: "From drawing review to mass-production supply, we build a reliable manufacturing flow aligned with customer production plans.",
    },
    "company/history": {
      groupTitle: "Company",
      title: "History",
      lead: "Since 1985, Seoul Industry has built precision machining and OEM supply capability for automotive components.",
      heroCopy: "Starting with steering component production, Seoul Industry has expanded through quality certification, global customer response, and advanced production technology.",
    },
    "company/certificates": {
      groupTitle: "Company",
      title: "Certificates",
      lead: "We maintain manufacturing reliability based on quality, environmental, and technology standards.",
      heroCopy: "Certification is not a result alone; it is the operating discipline that keeps each process moving by the same standard every day.",
    },
    "sustainability/environmental": {
      groupTitle: "Sustainability",
      title: "Environmental",
      lead: "We reduce energy and resource use while improving process efficiency for sustainable precision machining.",
      heroCopy: "Environmental standards are built into the production floor, lowering manufacturing burden through efficient process operation.",
    },
    "sustainability/governance": {
      groupTitle: "Sustainability",
      title: "Governance",
      lead: "We manage drawings, quality, delivery, and transaction standards transparently to build long-term OEM partnerships.",
      heroCopy: "Process history and quality records are kept clearly, and customer requirements are managed responsibly.",
    },
    "sustainability/esg-report": {
      groupTitle: "Sustainability",
      title: "ESG Report",
      lead: "Our ESG direction is organized around environment, safety, quality records, and transparent transaction standards.",
      heroCopy: "We manage ESG activities to strengthen standards practiced on site and the trust delivered to customers.",
    },
    "products/automotive": {
      groupTitle: "Products",
      title: "Automotive",
      lead: "We manufacture precision-machined parts for core automotive systems including BSM, EV, Steering, Powertrain, and Driveline.",
      heroCopy: "From drawing review, samples, mass production, inspection, and shipment, we connect the full OEM production flow for automotive components.",
    },
    "products/industrial": {
      groupTitle: "Products",
      title: "Industrial Machinery",
      lead: "We support power transmission and equipment stability with precision-machined parts matched to customer drawings and use conditions.",
      heroCopy: "Production flows for industrial machinery parts are designed around repeat accuracy, surface quality, and durability requirements.",
    },
    "support/news": {
      groupTitle: "Support",
      title: "News",
      lead: "Find the latest Seoul Industry updates on product groups, manufacturing processes, and quality response.",
      heroCopy: "Key news is organized so customers can quickly review Seoul Industry's manufacturing capability and support information.",
    },
    "support/contact": {
      groupTitle: "Support",
      title: "Contact",
      lead: "Send inquiries about product development, mass-production review, quotations, and quality topics.",
      heroCopy: "Share drawings and production conditions together so we can review the scope more accurately.",
    },
    "recruit/guide": {
      groupTitle: "Recruitment",
      title: "Careers",
      lead: "We are looking for colleagues who will build precision machining sites and quality standards together.",
      heroCopy: "Seoul Industry believes manufacturing capability begins with people, training, and responsibility.",
    },
    "recruit/jobs": {
      groupTitle: "Recruitment",
      title: "Job Openings",
      lead: "Check current open roles and application information.",
      heroCopy: "We are looking for people who will build Seoul Industry's next manufacturing foundation across production, quality, development, and management.",
    },
  },
  ja: {
    "company/greeting": {
      groupTitle: "会社紹介",
      title: "ご挨拶",
      lead: "最高の品質と精密加工技術で、自動車部品OEM市場において信頼される製造パートナーを目指します。",
      heroCopy: "図面検討から量産供給まで、顧客の生産計画に合わせた安定した製造フローをつくります。",
    },
    "company/history": {
      groupTitle: "会社紹介",
      title: "会社沿革",
      lead: "1985年の設立以来、自動車部品の精密加工とOEM量産供給の力を積み重ねてきました。",
      heroCopy: "ステアリング部品の量産を起点に、品質認証、グローバル顧客対応、生産技術の高度化まで製造基盤を広げてきました。",
    },
    "company/certificates": {
      groupTitle: "会社紹介",
      title: "認証書",
      lead: "品質・環境・技術基準をもとに、顧客が求める製造信頼性を維持します。",
      heroCopy: "認証は結果だけではなく、毎日同じ基準で工程を動かすソウル産業の運営方式です。",
    },
    "sustainability/environmental": {
      groupTitle: "持続可能経営",
      title: "Environmental",
      lead: "エネルギーと資源の使用を減らし、工程効率を高めながら持続可能な精密加工現場をつくります。",
      heroCopy: "環境管理基準を生産現場の中に置き、効率的な工程運営で製造過程の負担を下げます。",
    },
    "sustainability/governance": {
      groupTitle: "持続可能経営",
      title: "Governance",
      lead: "図面、品質、納期、取引基準を透明に管理し、長期的なOEMパートナーシップを築きます。",
      heroCopy: "工程履歴と品質記録を明確に残し、顧客要求事項を責任を持って管理します。",
    },
    "sustainability/esg-report": {
      groupTitle: "持続可能経営",
      title: "ESGレポート",
      lead: "環境、安全、品質記録、透明な取引基準を中心に、ソウル産業の持続可能経営の方向を整理します。",
      heroCopy: "現場で守られる基準と顧客へ伝わる信頼をともに高めるため、ESG活動を管理します。",
    },
    "products/automotive": {
      groupTitle: "製品紹介",
      title: "自動車",
      lead: "BSM、EV、Steering、Powertrain、Drivelineなど、自動車主要システムに必要な精密加工部品を生産します。",
      heroCopy: "図面検討からサンプル、量産、検査、出荷まで、自動車部品OEM生産の流れを安定してつなぎます。",
    },
    "products/industrial": {
      groupTitle: "製品紹介",
      title: "産業機械",
      lead: "顧客図面と使用環境に合わせた精密加工部品で、産業現場の動力伝達と設備安定性を支えます。",
      heroCopy: "反復精度、表面品質、耐久条件を基準に、産業機械部品の生産フローを設計します。",
    },
    "support/news": {
      groupTitle: "お客様サポート",
      title: "News",
      lead: "製品群、製造工程、品質対応に関するソウル産業の最新情報をご確認ください。",
      heroCopy: "ソウル産業の製造力とサポート情報をすばやく確認できるよう、主要ニュースをまとめています。",
    },
    "support/contact": {
      groupTitle: "お客様サポート",
      title: "お問い合わせ",
      lead: "製品開発、量産検討、見積り、品質関連のお問い合わせをお送りください。",
      heroCopy: "図面と生産条件を一緒に共有いただくと、より正確な検討と返信が可能です。",
    },
    "recruit/guide": {
      groupTitle: "採用情報",
      title: "採用案内",
      lead: "精密加工の現場と品質基準をともにつくる仲間をお待ちしています。",
      heroCopy: "ソウル産業は、製造力は人の熟練と責任感から始まると考えています。",
    },
    "recruit/jobs": {
      groupTitle: "採用情報",
      title: "採用公告",
      lead: "現在募集している職務と応募情報をご確認ください。",
      heroCopy: "生産、品質、開発、管理領域でソウル産業の次の製造基盤をともにつくる人材を探しています。",
    },
  },
};

function getPageConfig(route: string, language: LanguageCode): PageConfig {
  const base = pageConfigs[route] ?? pageConfigs["company/greeting"];
  const translation = language === "ko" ? undefined : pageConfigTranslations[language]?.[base.route];
  return { ...base, ...translation };
}

const menuUiCopy: Record<LanguageCode, { home: string; categoryNav: string; depthNavSuffix: string; footerNav: string }> = {
  ko: {
    home: "홈으로 이동",
    categoryNav: "대분류 메뉴",
    depthNavSuffix: "하위 메뉴",
    footerNav: "하단 메뉴",
  },
  en: {
    home: "Go to home",
    categoryNav: "Category menu",
    depthNavSuffix: "submenu",
    footerNav: "Footer menu",
  },
  ja: {
    home: "ホームへ移動",
    categoryNav: "カテゴリーメニュー",
    depthNavSuffix: "下位メニュー",
    footerNav: "フッターメニュー",
  },
};

const businessFields = [
  { index: "01", en: "Automotive", ko: "자동차", copy: "조향, 동력전달, 전동화 플랫폼에 적용되는 자동차 부품 정밀가공" },
  { index: "02", en: "Industrial", ko: "산업기계", copy: "고객 도면과 사용 조건에 맞춘 산업기계용 가공 부품" },
  { index: "03", en: "Quality", ko: "품질검사", copy: "LOT 단위 검사와 공정 이력 기록을 통한 양산 품질 관리" },
  { index: "04", en: "OEM Supply", ko: "OEM 공급", copy: "개발 검토부터 포장·출하까지 이어지는 공급 대응" },
];

const historyBlocks = [
  {
    period: "1985 ~ 1999",
    image: menuHeroImages.documents,
    items: ["서울산업 설립", "자동차 조향부품 양산 시작", "정밀가공 기반 제조 설비 구축"],
  },
  {
    period: "2000 ~ 2009",
    image: menuHeroImages.measurement,
    items: ["ISO 14001 인증 취득", "IATF/TS 16949 인증 취득", "기업부설연구소 설립", "ZF, AAM, Nexteer, Hyundai Mobis 등 거래 기반 확대"],
  },
  {
    period: "2010 ~ 2019",
    image: menuHeroImages.precision,
    items: ["현대모비스 SQ 인증 취득", "3천만불 수출의 탑 수상", "AL 다이캐스팅 사업 진출", "GKN Driveline, Spartan 등 고객 네트워크 확대"],
  },
  {
    period: "2020 ~ 현재",
    image: menuHeroImages.factory,
    items: ["INNOBIZ 인증 취득", "글로벌 고객사 신규 거래 확대", "자동차 부품 정밀가공 양산 체계 고도화"],
  },
];

const certificateCards = [
  { title: "IATF 16949:2016", copy: "자동차 산업 품질경영 시스템 기준에 맞춘 제조 품질 관리 체계" },
  { title: "ISO 14001:2015", copy: "환경영향과 자원 사용을 관리하기 위한 환경경영 시스템" },
  { title: "ISO 9001", copy: "원본 품질시스템 기준에 포함된 기본 품질경영 시스템 인증" },
  { title: "SQ 인증", copy: "현대모비스 열처리·고주파열처리 협력사 품질 인증" },
  { title: "INNOBIZ", copy: "기술 혁신형 중소기업으로서의 제조 기술 역량 인증" },
  { title: "VDA 6.3", copy: "자동차 부품 제조 공정의 프로세스 감사 대응 기준" },
  { title: "CQI-9", copy: "Induction Hardening 열처리 특수공정 품질 평가 기준" },
  { title: "CQI-15", copy: "Laser Welding 용접 특수공정 품질 평가 기준" },
];

const environmentalSteps = [
  "평가 대상 선정 및 사전 준비",
  "공정별 환경영향과 리스크 파악",
  "유해·위험요인별 영향도 추정",
  "허용 가능 여부와 우선순위 결정",
  "개선 대책 수립 및 현장 실행",
  "실행 결과 기록과 정기 점검",
];

const environmentalMetrics = [
  ["환경법규", "위반 건수", "0건", "현장 기준 정기 점검"],
  ["에너지", "전력·연료 사용량", "월별 관리", "설비 가동 효율 개선"],
  ["폐기물", "재활용·배출 흐름", "공정별 관리", "분리·기록 기준 유지"],
  ["화학물질", "MSDS·소분용기", "현장 비치", "교육 및 표지 관리"],
];

const governanceCards = [
  { title: "품질 기록", copy: "도면 변경, 검사 결과, 공정 이력을 체계적으로 남겨 고객 요구사항에 대응합니다." },
  { title: "투명한 거래", copy: "협력사와 고객 사이의 납기, 품질, 거래 기준을 명확히 공유합니다." },
  { title: "책임 있는 운영", copy: "현장 안전과 윤리 기준을 함께 관리하며 오래 가는 제조 파트너십을 만듭니다." },
];

const esgReports = [
  { year: "2026", title: "ESG 경영 방향", copy: "환경, 안전, 품질 기록, 투명한 거래 기준을 중심으로 서울산업의 운영 방향을 정리합니다." },
  { year: "2025", title: "현장 개선 활동", copy: "에너지 절감, 불량 감소, 작업자 안전 개선 활동을 항목별로 관리합니다." },
  { year: "2024", title: "품질·윤리 기준", copy: "고객 요구사항과 공정 이력을 명확하게 남기는 품질 운영 기준을 정리합니다." },
];

const automotiveProducts = [
  { title: "Balance Shaft Module", label: "BSM", copy: "진동 저감과 동력 효율을 위한 모듈 하우징, 샤프트 관련 정밀 가공 부품", image: balanceModuleImage },
  { title: "Electric Vehicle", label: "EV", copy: "전동화 플랫폼의 조립성과 내구 조건을 고려한 EV 정밀 가공 부품", image: automotiveImage },
  { title: "Steering", label: "STEERING", copy: "조향 응답성과 내구성을 위한 Pinion Shaft 계열 및 조향 관련 부품", image: steeringImage },
  { title: "Driveline", label: "DRIVELINE", copy: "동력 전달계의 반복 정밀도와 표면 품질을 기준으로 생산하는 드라이브라인 부품", image: drivelineImage },
];

const industrialProcesses = [
  { title: "도면 기반 개발", copy: "고객 도면과 사용 조건을 검토해 소재, 공차, 표면 품질 기준을 생산 가능한 공정 조건으로 전환합니다." },
  { title: "정밀 가공", copy: "반복 생산에서 치수 편차와 재가공을 줄이기 위해 설비 조건과 가공 기준을 표준화합니다." },
  { title: "검사·출하 관리", copy: "LOT 관리, 검사 기록, 포장 기준을 함께 확인해 산업기계 부품의 안정 공급을 지원합니다." },
];

const recruitValues = [
  { title: "Challenge", label: "도전", copy: "현장의 문제를 피하지 않고 더 나은 공정 기준을 찾는 사람", keywords: ["도전", "열정", "의지"] },
  { title: "Creativity", label: "창의", copy: "정해진 방식에 머무르지 않고 개선 아이디어를 실행하는 사람", keywords: ["아이디어", "개선", "자율"] },
  { title: "Communication", label: "소통", copy: "품질과 납기 목표를 위해 동료와 정확하게 협업하는 사람", keywords: ["존중", "정직", "책임"] },
];

const benefits = ["4대보험", "건강검진", "통근 지원", "경조 지원", "휴가 제도", "교육 지원", "장기근속 포상", "기념일 선물"];

const recruitSteps = [
  { title: "모집공고", copy: "홈페이지와 채용 채널을 통해 모집 직무를 공지합니다." },
  { title: "원서접수", copy: "지원서와 자기소개서를 접수하고 기본 요건을 확인합니다." },
  { title: "서류전형", copy: "직무 적합성, 경력, 성장 가능성을 종합적으로 검토합니다." },
  { title: "면접전형", copy: "기본 역량과 현장 적응력, 협업 방식을 확인합니다." },
  { title: "최종합격", copy: "최종 합격자에게 근무 조건과 입사 일정을 안내합니다." },
];

const jobPosts = [
  { field: "생산기술", title: "정밀가공 생산기술 담당", status: "상시채용", work: "공정 조건 관리, 설비 셋업, 생산성 개선" },
  { field: "품질관리", title: "자동차 부품 품질관리 담당", status: "접수중", work: "치수 검사, LOT 관리, 고객 품질 대응" },
  { field: "생산관리", title: "OEM 양산 납기관리 담당", status: "상시채용", work: "생산계획, 출하 일정, 협력사 커뮤니케이션" },
];

function normalizeRoute(route: string) {
  return route.replace(/^#\/?/, "").replace(/\/$/, "") || "company/greeting";
}

function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span className="scroll-progress__bar" ref={barRef} />
    </div>
  );
}

function PageHero({ config }: { config: PageConfig }) {
  const heroStyle = {
    "--menu-hero-image": `url(${config.image})`,
    "--menu-hero-position": config.imagePosition ?? "center",
  } as CSSProperties;

  return (
    <section className="menu-hero menu-hero--daedong" style={heroStyle}>
      <div className="menu-hero__image" aria-hidden="true" />
      <div className="menu-hero__inner">
        <span className="menu-hero__eyebrow">{config.category}</span>
        <h1>{config.groupTitle}</h1>
        <p>{config.heroCopy}</p>
      </div>
    </section>
  );
}

function PageLocation({ route, language }: { route: string; language: LanguageCode }) {
  const { group, child } = findMenuByRoute(route, language);
  const ui = menuUiCopy[language];

  return (
    <div className="menu-location">
      <div className="menu-location__inner">
        <a className="menu-location__home" href="#/" aria-label={ui.home}>
          <BrainallLogo />
        </a>
        <span>{group.label}</span>
        <strong>{child.label}</strong>
      </div>
    </div>
  );
}

function CategoryNavigation({ route, language }: { route: string; language: LanguageCode }) {
  const { group } = findMenuByRoute(route, language);
  const menuGroups = getSiteMenuGroups(language);

  return (
    <nav className="menu-category-nav" aria-label={menuUiCopy[language].categoryNav}>
      <div className="menu-category-nav__inner">
        {menuGroups.map((item) => (
          <a className={item.href === group.href ? "is-active" : ""} href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function DepthNavigation({ route, language }: { route: string; language: LanguageCode }) {
  const { group } = findMenuByRoute(route, language);

  return (
    <nav className="menu-depth-nav" aria-label={`${group.label} ${menuUiCopy[language].depthNavSuffix}`}>
      <div className="menu-depth-nav__inner">
        {group.children.map((item) => {
          const cleanHref = item.href.replace(/^#\//, "");
          return (
            <a className={cleanHref === route ? "is-active" : ""} href={item.href} key={item.href}>
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function PageTitle({ config }: { config: PageConfig }) {
  return (
    <div className="menu-title-box menu-reveal">
      <span>{config.eyebrow}</span>
      <h2>{config.title}</h2>
      <p>{config.lead}</p>
    </div>
  );
}

function GreetingContent() {
  return (
    <>
      <div className="menu-greeting menu-reveal">
        <div className="menu-greeting__headline">
          <span>SEOUL INDUSTRY</span>
          <h3>
            최고의 품질과 기술력으로
            <br />
            자동차 부품 OEM 시장을 선도하는 기업
          </h3>
        </div>
        <div className="menu-greeting__photo">
          <img src={precisionHeroImage} alt="서울산업 정밀가공 현장" />
        </div>
        <div className="menu-greeting__copy">
          <strong>서울산업 대표이사</strong>
          <h4>정밀가공 기술을 기반으로 성장해 온 자동차 부품 제조 기업</h4>
          <p>
            서울산업은 1985년 설립 이후 자동차 주요 부품의 정밀가공과 OEM 양산 공급을 중심으로 성장해 왔습니다.
            축적된 가공 기술과 품질 중심의 제조 역량을 바탕으로 국내외 고객사의 생산 계획에 맞춰 안정적인 부품 공급을 이어가고 있습니다.
          </p>
          <h4>실행력을 바탕으로 고객의 생산 흐름을 책임지는 제조 파트너</h4>
          <p>
            자동차 산업은 전동화, 경량화, 고정밀 부품 수요 확대에 따라 더 높은 반복 정밀도와 납기 대응을 요구하고 있습니다.
            서울산업은 도면 검토, 공정 설계, 검사, 포장, 출하까지 이어지는 제조 흐름을 한 기준으로 관리하며 고객과 함께 성장하겠습니다.
          </p>
        </div>
      </div>
      <section className="menu-business menu-reveal" aria-label="사업분야">
        <span className="menu-small-label">Business</span>
        <h3>사업분야</h3>
        <div>
          {businessFields.map((field) => (
            <article key={field.index}>
              <b>{field.index}</b>
              <span>{field.en}</span>
              <strong>{field.ko}</strong>
              <p>{field.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function HistoryContent() {
  return (
    <section className="menu-history-daedong menu-reveal" aria-label="서울산업 연혁">
      <span className="menu-small-label">History</span>
      <h3>연혁</h3>
      {historyBlocks.map((block) => (
        <article key={block.period}>
          <div className="menu-history-daedong__media">
            <img src={block.image} alt="" />
          </div>
          <div className="menu-history-daedong__body">
            <strong>{block.period}</strong>
            <ul>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}

function CertificatesContent() {
  return (
    <>
      <div className="menu-cert-layout menu-reveal">
        <div>
          <span className="menu-small-label">Quality Standard</span>
          <h3>고객이 요구하는 기준을 매일의 공정으로 관리합니다.</h3>
          <p>품질과 환경 인증, 기술 혁신 인증을 바탕으로 자동차 부품 OEM 생산에 필요한 제조 기준을 유지합니다.</p>
        </div>
        <img src={certificationImage} alt="서울산업 인증서 이미지" />
      </div>
      <div className="menu-card-grid menu-reveal">
        {certificateCards.map((card) => (
          <article className="menu-info-card" key={card.title}>
            <span>{card.title}</span>
            <p>{card.copy}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function EnvironmentalContent() {
  return (
    <>
      <section className="menu-esg-intro menu-reveal">
        <span className="menu-small-label">ESG</span>
        <h3>ESG 경영</h3>
        <p>
          서울산업은 원재료 입고부터 가공, 검사, 출하까지의 제조 흐름에서 발생할 수 있는 환경 영향을 관리하고
          에너지 사용과 폐기물 배출을 줄이기 위한 현장 기준을 운영합니다.
        </p>
      </section>
      <section className="menu-policy menu-reveal">
        <div>
          <span className="menu-small-label">ENVIRONMENTAL</span>
          <h3>환경경영 정책</h3>
          <p>
            제조 현장에서 확인되는 에너지 사용, 화학물질 취급, 폐기물 발생, 자원 사용 흐름을 정기적으로 점검하고
            법규 준수와 공정 효율 개선을 함께 추진합니다.
          </p>
        </div>
        <div className="menu-policy__steps">
          {environmentalSteps.map((step, index) => (
            <article key={step}>
              <span>STEP {String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="menu-data-table menu-reveal" aria-label="환경 관리 지표">
        <h3>환경 관리 항목</h3>
        {environmentalMetrics.map(([category, indicator, status, memo]) => (
          <article key={`${category}-${indicator}`}>
            <span>{category}</span>
            <strong>{indicator}</strong>
            <b>{status}</b>
            <p>{memo}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function GovernanceContent() {
  return (
    <div className="menu-card-grid menu-reveal">
      {governanceCards.map((card) => (
        <article className="menu-icon-card" key={card.title}>
          <Icon name="shield" />
          <strong>{card.title}</strong>
          <p>{card.copy}</p>
        </article>
      ))}
    </div>
  );
}

function EsgReportContent() {
  return (
    <div className="menu-report-list menu-reveal">
      {esgReports.map((report) => (
        <a href="#/sustainability/esg-report" key={report.year}>
          <span>{report.year}</span>
          <strong>{report.title}</strong>
          <p>{report.copy}</p>
          <Icon name="arrow" />
        </a>
      ))}
    </div>
  );
}

function ProductsContent({ route }: { route: string }) {
  if (route.endsWith("industrial")) {
    return (
      <div className="menu-industrial menu-reveal">
        <div className="menu-industrial__visual">
          <img src={drivelineImage} alt="산업기계 정밀가공 부품 이미지" />
        </div>
        <div className="menu-industrial__list">
          {industrialProcesses.map((card, index) => (
            <article key={card.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{card.title}</strong>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="menu-product-filter menu-reveal" aria-label="제품 구분">
        <a className="is-active" href="#/products/automotive">
          전기차
        </a>
        <a href="#/products/automotive">내연기관차</a>
      </div>
      <div className="menu-product-grid menu-reveal">
        {automotiveProducts.map((product) => (
          <article className="menu-product-card" key={product.title}>
            <img src={product.image} alt={`${product.title} 제품 이미지`} />
            <div>
              <span>{product.label}</span>
              <strong>{product.title}</strong>
              <p>{product.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <a className="menu-back-link menu-reveal" href="#/products/automotive">
        목록으로
      </a>
    </>
  );
}

function NewsContent() {
  const posts = useMemo(() => getNoticePosts().slice(0, 5), []);

  return (
    <section className="menu-board menu-reveal" aria-label="공지사항">
      <div className="menu-board__head">
        <span className="menu-small-label">Notice</span>
        <h3>공지사항</h3>
        <label>
          <span>게시판 검색</span>
          <input type="search" placeholder="검색어를 입력하세요" />
        </label>
      </div>
      <div className="menu-news-list">
        {posts.map((post) => {
          const translation = post.translations.ko;
          return (
            <a href={`#/news/${post.id}`} key={post.id}>
              <span>{noticeCategoryKickers[post.category]}</span>
              <strong>{translation.title}</strong>
              <p>{translation.summary}</p>
              <time>{post.date}</time>
            </a>
          );
        })}
        <a className="menu-news-list__more" href="#/news">
          <span>{newsCategoryLabels.ko.notice}</span>
          <strong>전체 소식 보기</strong>
          <p>공지사항과 제품, 품질, 제조 관련 게시글을 한 곳에서 확인합니다.</p>
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}

function ContactContent() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
  };

  return (
    <div className="menu-contact menu-reveal">
      <aside>
        <span>CONTACT INFO</span>
        <h3>제품 검토와 양산 문의를 남겨 주세요.</h3>
        <dl>
          <div>
            <dt>대표전화</dt>
            <dd>031-366-1141</dd>
          </div>
          <div>
            <dt>문의분야</dt>
            <dd>제품 개발 · 견적 · 품질 · 채용</dd>
          </div>
          <div>
            <dt>회신안내</dt>
            <dd>접수 후 담당자가 내용을 확인해 연락드립니다.</dd>
          </div>
        </dl>
      </aside>
      <form onSubmit={onSubmit}>
        <label>
          <span>회사명</span>
          <input name="company" required />
        </label>
        <label>
          <span>담당자</span>
          <input name="name" required />
        </label>
        <label>
          <span>연락처</span>
          <input name="phone" required />
        </label>
        <label>
          <span>이메일</span>
          <input name="email" type="email" required />
        </label>
        <label className="menu-contact__wide">
          <span>문의내용</span>
          <textarea name="message" rows={7} required />
        </label>
        <button className="menu-submit" type="submit">
          문의 보내기
          <Icon name="arrow" />
        </button>
      </form>
    </div>
  );
}

function RecruitGuideContent() {
  return (
    <>
      <section className="menu-recruit-values menu-reveal">
        <span className="menu-small-label">Core Value</span>
        <h3>서울산업 인재상</h3>
        <div>
          {recruitValues.map((value) => (
            <article key={value.title}>
              <Icon name="chart" />
              <span>{value.title}</span>
              <strong>{value.label}</strong>
              <p>{value.copy}</p>
              <ul>
                {value.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="menu-benefit menu-reveal">
        <span className="menu-small-label">Benefit</span>
        <h3>복리후생</h3>
        <div>
          {benefits.map((benefit) => (
            <article key={benefit}>{benefit}</article>
          ))}
        </div>
      </section>
      <section className="menu-process menu-reveal">
        <span className="menu-small-label">PROCESS</span>
        <h3>채용 프로세스</h3>
        <div className="menu-recruit-steps">
          {recruitSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function JobsContent() {
  return (
    <div className="menu-job-list menu-reveal">
      {jobPosts.map((job) => (
        <article key={job.title}>
          <span>{job.field}</span>
          <strong>{job.title}</strong>
          <p>{job.work}</p>
          <b>{job.status}</b>
        </article>
      ))}
    </div>
  );
}

function PageBody({ route }: { route: string }) {
  if (route.startsWith("company/greeting")) return <GreetingContent />;
  if (route.startsWith("company/history")) return <HistoryContent />;
  if (route.startsWith("company/certificates")) return <CertificatesContent />;
  if (route.startsWith("sustainability/environmental")) return <EnvironmentalContent />;
  if (route.startsWith("sustainability/governance")) return <GovernanceContent />;
  if (route.startsWith("sustainability/esg-report")) return <EsgReportContent />;
  if (route.startsWith("products/")) return <ProductsContent route={route} />;
  if (route.startsWith("support/news")) return <NewsContent />;
  if (route.startsWith("support/contact")) return <ContactContent />;
  if (route.startsWith("recruit/guide")) return <RecruitGuideContent />;
  if (route.startsWith("recruit/jobs")) return <JobsContent />;
  return <GreetingContent />;
}

function MenuFooter({ language }: { language: LanguageCode }) {
  const menuGroups = getSiteMenuGroups(language);

  return (
    <footer className="menu-footer">
      <div>
        <BrainallLogo />
        <strong>SEOUL INDUSTRY</strong>
      </div>
      <p>Precision Automotive Components OEM · Since 1985</p>
      <nav aria-label={menuUiCopy[language].footerNav}>
        {menuGroups.map((group) => (
          <a href={group.href} key={group.href}>
            {group.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}

export default function MenuPage({ route }: MenuPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cleanRoute = normalizeRoute(route);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const stored = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(stored) ? stored : defaultLanguage;
  });
  const content = siteContent[language];
  const config = getPageConfig(cleanRoute, language);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [cleanRoute]);

  useEffect(() => {
    const currentLanguage = isLanguageCode(language) ? language : defaultLanguage;
    const languageOption = currentLanguage === "ko" ? "ko" : currentLanguage === "ja" ? "ja" : "en";
    document.documentElement.lang = languageOption;
    window.localStorage.setItem("seoulind-language", currentLanguage);
  }, [language]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".menu-reveal"));

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
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
      { threshold: 0.08, rootMargin: "0px 0px 16% 0px" },
    );

    items.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 80, 320)}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [cleanRoute]);

  return (
    <div className="menu-page" ref={rootRef}>
      <ScrollProgress />
      <Header content={content} language={language} onLanguageChange={setLanguage} variant="sub" />
      <main>
        <PageHero config={config} />
        <PageLocation route={cleanRoute} language={language} />
        <CategoryNavigation route={cleanRoute} language={language} />
        <DepthNavigation route={cleanRoute} language={language} />
        <section className="menu-content-section">
          <PageTitle config={config} />
          <PageBody route={cleanRoute} />
        </section>
      </main>
      <MenuFooter language={language} />
    </div>
  );
}
