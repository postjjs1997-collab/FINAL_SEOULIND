import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import certificationImage from "../../certification.png";
import drivelineImage from "../../assets/product-lineup/driveline.jpg";
import automotiveImage from "../../assets/product-lineup/electric-vehicle.jpg";
import balanceModuleImage from "../../assets/product-lineup/balance-module.jpg";
import powertrainImage from "../../assets/product-lineup/powertrain.jpg";
import precisionHeroImage from "../../precision-inside-mobility.jpg";
import steeringImage from "../../assets/product-lineup/steering.jpg";
import factoryOverviewImage from "../../assets/company-profile/factory.webp";
import seoulIndustryFacadeImage from "../../assets/company-profile/seoul-industry-facade-sign.webp";
import manufacturingProcessHeroImage from "../../assets/manufacturing/hero/production-process-cnc.jpg";
import manufacturingEquipmentHeroImage from "../../assets/manufacturing/hero/equipment-automation.jpg";
import manufacturingInspectionHeroImage from "../../assets/manufacturing/hero/inspection-technology.jpg";
import BrainallLogo from "./BrainallLogo";
import Header from "./Header";
import Icon from "./Icons";
import { defaultLanguage, isLanguageCode, siteContent, type LanguageCode } from "../data/siteContent";
import { getNoticePosts, newsCategoryLabels, noticeCategoryKickers } from "../data/notices";
import { findMenuByRoute, getSiteMenuGroups } from "../data/navigation";
import { gsap, ScrollTrigger } from "../motion/gsap";

type MenuPageProps = {
  route: string;
};

export type PageConfig = {
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
    eyebrow: "Sustainability",
    title: "ESG 경영",
    lead: "환경, 안전, 품질, 윤리, 협력사 기준을 하나의 운영 체계로 연결해 지속 가능한 OEM 제조 흐름을 만듭니다.",
    heroCopy: "서울산업은 현장의 기록과 개선 활동을 기반으로 고객이 오래 신뢰할 수 있는 정밀가공 파트너십을 만들어 갑니다.",
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
      title: "ESG Management",
      lead: "We connect environment, safety, quality, ethics, and partner standards into one operating system for sustainable OEM manufacturing.",
      heroCopy: "Seoul Industry builds lasting precision-machining partnerships through site records, improvement actions, and responsible production standards.",
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
      title: "ESG経営",
      lead: "環境、安全、品質、倫理、協力会社基準を一つの運営体系につなげ、持続可能なOEM製造フローを構築します。",
      heroCopy: "ソウル産業は現場記録と改善活動を基盤に、長く信頼される精密加工パートナーシップをつくります。",
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

const expandedPageConfigs: Record<string, PageConfig> = {
  "company/overview": {
    route: "company/overview",
    category: "COMPANY",
    groupTitle: "기업정보",
    eyebrow: "Company Overview",
    title: "회사개요",
    lead: "서울산업은 엔진과 모터의 동력을 전달하는 샤프트, 기어, 스플라인, 하우징을 생산하는 자동차 부품 정밀가공 기업입니다.",
    heroCopy: "1985년부터 개발 검토, 정밀가공, 열처리, 자동검사와 양산 공급을 하나의 제조 흐름으로 연결해 왔습니다.",
    image: factoryOverviewImage,
    imagePosition: "center",
  },
  "company/ceo": {
    route: "company/ceo",
    category: "COMPANY",
    groupTitle: "기업정보",
    eyebrow: "CEO Message",
    title: "CEO인사말",
    lead: "고객의 신뢰를 바탕으로 지속가능한 성장을 추구합니다.",
    heroCopy: "화합으로 창조하는 기업이라는 경영 철학으로 최고의 품질과 사회에 공헌하는 Global Leader가 되겠습니다.",
    image: seoulIndustryFacadeImage,
    imagePosition: "center 38%",
  },
  "company/history": {
    ...pageConfigs["company/history"],
    groupTitle: "기업정보",
  },
  "company/location": {
    route: "company/location",
    category: "COMPANY",
    groupTitle: "기업정보",
    eyebrow: "Location",
    title: "찾아오시는길",
    lead: "서울산업 본사와 정밀가공 생산공장은 경기도 화성시 양감면에 위치합니다.",
    heroCopy: "방문 전 담당자와 일정을 협의해 주시면 출입과 미팅을 원활하게 안내해 드립니다.",
    image: menuHeroImages.industrial,
    imagePosition: "center 58%",
  },
  "company/notices": {
    route: "company/notices",
    category: "COMPANY",
    groupTitle: "기업정보",
    eyebrow: "Notice",
    title: "공지사항",
    lead: "서울산업의 주요 소식과 제품·품질·채용 관련 안내를 확인할 수 있습니다.",
    heroCopy: "고객과 협력사에 필요한 회사 정보를 정확하고 신속하게 전달합니다.",
    image: menuHeroImages.news,
    imagePosition: "center 46%",
  },
  "products/electric-vehicle": {
    route: "products/electric-vehicle",
    category: "PRODUCT",
    groupTitle: "제품정보",
    eyebrow: "Electric Vehicle",
    title: "ELECTRIC VEHICLE",
    lead: "전동화 플랫폼의 감속기, e-Drive, EV 구동축에 적용되는 정밀가공 부품을 생산합니다.",
    heroCopy: "조립 정합성, 반복 정밀도, 내구 조건을 고려해 전기차 구동계의 안정적인 양산 품질을 확보합니다.",
    image: automotiveImage,
    imagePosition: "center",
  },
  "products/powertrain": {
    route: "products/powertrain",
    category: "PRODUCT",
    groupTitle: "제품정보",
    eyebrow: "Powertrain",
    title: "POWERTRAIN",
    lead: "엔진과 동력전달계의 열·진동 조건을 견디는 하우징, 기어, 샤프트 계열 부품을 생산합니다.",
    heroCopy: "가공 조건과 검사 데이터를 연결해 장기 양산에서도 흔들리지 않는 동력계 부품 품질을 유지합니다.",
    image: powertrainImage,
    imagePosition: "center 70%",
  },
  "products/driveline": {
    route: "products/driveline",
    category: "PRODUCT",
    groupTitle: "제품정보",
    eyebrow: "Driveline",
    title: "DRIVELINE",
    lead: "변속기 샤프트, 하프·스텁 액슬 등 바퀴까지 동력을 전달하는 구동계 부품을 정밀가공합니다.",
    heroCopy: "동심도, 런아웃, 스플라인과 표면 품질을 관리해 구동계 조립 신뢰성을 높입니다.",
    image: drivelineImage,
    imagePosition: "center",
  },
  "products/balance-shaft-module": {
    route: "products/balance-shaft-module",
    category: "PRODUCT",
    groupTitle: "제품정보",
    eyebrow: "Balance Shaft Module",
    title: "BALANCE SHAFT MODULE",
    lead: "엔진 진동과 소음을 줄이는 밸런스 샤프트 모듈용 알루미늄 하우징과 정밀가공 부품을 생산합니다.",
    heroCopy: "복합 형상, 조립면, 베어링부의 치수 정합성을 관리해 모듈의 회전 안정성과 내구성을 확보합니다.",
    image: balanceModuleImage,
    imagePosition: "center",
  },
  "products/steering": {
    route: "products/steering",
    category: "PRODUCT",
    groupTitle: "제품정보",
    eyebrow: "Steering",
    title: "STEERING",
    lead: "Pinion Shaft, Torsion Bar 등 조향 응답성과 안전 품질을 좌우하는 핵심 부품을 생산합니다.",
    heroCopy: "기어·스플라인 가공, 열처리, 런아웃 검사를 연결해 조향 입력이 정확하게 전달되도록 관리합니다.",
    image: steeringImage,
    imagePosition: "center",
  },
  "products/etc": {
    route: "products/etc",
    category: "PRODUCT",
    groupTitle: "제품정보",
    eyebrow: "Custom OEM",
    title: "ETC",
    lead: "고객 도면과 적용 환경에 맞춰 기어, 스플라인, 샤프트, 하우징 계열의 맞춤 정밀가공을 수행합니다.",
    heroCopy: "개발 검토부터 시제품, 공정 설계, 양산 이관까지 프로젝트 조건에 맞춘 생산 방식을 제안합니다.",
    image: menuHeroImages.precision,
    imagePosition: "center 48%",
  },
  "manufacturing/process": {
    route: "manufacturing/process",
    category: "MANUFACTURING",
    groupTitle: "생산기술",
    eyebrow: "Production Process",
    title: "생산공정",
    lead: "선삭에서 기어·스플라인, 연삭, 열처리, 교정과 검사까지 부품별 공정을 연속된 품질 흐름으로 설계합니다.",
    heroCopy: "각 공정의 결과를 다음 공정의 기준과 연결해 장기 양산에서도 반복 정밀도와 표면 품질을 유지합니다.",
    image: manufacturingProcessHeroImage,
    imagePosition: "center 50%",
  },
  "manufacturing/equipment": {
    route: "manufacturing/equipment",
    category: "MANUFACTURING",
    groupTitle: "생산기술",
    eyebrow: "Equipment & Automation",
    title: "보유설비·자동화",
    lead: "부품 형상과 품질 기준에 맞춘 CNC, 기어가공, 연삭, 열처리, 자동화 설비를 공정 목적별로 운영합니다.",
    heroCopy: "설비 조건과 전용 치공구, 자동 이송과 측정을 연결해 공정 편차와 작업 의존도를 줄입니다.",
    image: manufacturingEquipmentHeroImage,
    imagePosition: "center 48%",
  },
  "manufacturing/inspection": {
    route: "manufacturing/inspection",
    category: "MANUFACTURING",
    groupTitle: "생산기술",
    eyebrow: "Inspection Technology",
    title: "검사기술",
    lead: "치수와 기하공차, 기어 형상, 런아웃과 균열을 자동검사·CMM·전용 측정 장비로 확인합니다.",
    heroCopy: "측정 데이터를 교정과 공정조건, 출하 판정에 다시 연결해 예방 중심의 품질 흐름을 운영합니다.",
    image: manufacturingInspectionHeroImage,
    imagePosition: "center 52%",
  },
  "quality/policy": {
    route: "quality/policy",
    category: "QUALITY",
    groupTitle: "품질보증",
    eyebrow: "Quality Policy",
    title: "품질방침",
    lead: "고객 요구사항을 정확히 이해하고, 공정에서 품질을 만들며, 데이터로 신뢰를 증명합니다.",
    heroCopy: "예방 중심의 품질관리와 지속적인 공정 개선으로 고객의 양산 계획을 안정적으로 지원합니다.",
    image: menuHeroImages.measurement,
    imagePosition: "center 45%",
  },
  "quality/system": {
    route: "quality/system",
    category: "QUALITY",
    groupTitle: "품질보증",
    eyebrow: "Quality System",
    title: "품질시스템",
    lead: "도면 검토, 수입검사, 공정검사, 최종검사, LOT 추적을 하나의 품질 흐름으로 운영합니다.",
    heroCopy: "IATF 16949, ISO 14001, SQ와 고객별 품질 기준을 제조 공정의 일상적인 관리 항목으로 연결합니다.",
    image: menuHeroImages.measurement,
    imagePosition: "center 45%",
  },
  "quality/preventive": {
    route: "quality/preventive",
    category: "QUALITY",
    groupTitle: "품질보증",
    eyebrow: "Preventive Quality",
    title: "예방품질활동",
    lead: "문제가 발생한 뒤 대응하는 품질을 넘어, 개발과 양산 준비 단계에서 위험요인을 먼저 제거합니다.",
    heroCopy: "공정 FMEA, 관리계획, 초도품 검증, SPC, 변경점 관리를 통해 재발과 유출 가능성을 낮춥니다.",
    image: menuHeroImages.documents,
    imagePosition: "center 48%",
  },
  "rnd/parts-development": {
    route: "rnd/parts-development",
    category: "R&D",
    groupTitle: "연구개발",
    eyebrow: "Parts Development",
    title: "부품개발",
    lead: "고객 도면과 요구 사양을 제조 가능한 공정으로 전환하고 시제품부터 양산까지 연결합니다.",
    heroCopy: "가공성 검토, 치공구·검사구 설계, 시제품 검증, 공정 능력 확인을 통해 개발 리스크를 줄입니다.",
    image: menuHeroImages.precision,
    imagePosition: "center 50%",
  },
  "recruit/information": {
    route: "recruit/information",
    category: "CAREERS",
    groupTitle: "채용정보",
    eyebrow: "Recruitment",
    title: "채용정보",
    lead: "생산, 품질, 개발, 관리가 함께 움직이는 서울산업에서 제조의 다음 기준을 만들 인재를 찾습니다.",
    heroCopy: "기준을 지키고 개선을 이어가며 동료와 함께 결과를 완성하는 사람을 기다립니다.",
    image: menuHeroImages.recruit,
    imagePosition: "center 50%",
  },
  "recruit/benefits": {
    route: "recruit/benefits",
    category: "CAREERS",
    groupTitle: "채용정보",
    eyebrow: "Benefits",
    title: "복지제도",
    lead: "임직원이 안정적으로 일하고 기술과 경험을 오래 축적할 수 있도록 실질적인 복지를 운영합니다.",
    heroCopy: "건강, 성장, 생활, 장기근속을 지원해 사람과 제조 역량이 함께 성장하는 환경을 만듭니다.",
    image: menuHeroImages.jobs,
    imagePosition: "center 50%",
  },
  "esg/information": {
    route: "esg/information",
    category: "ESG",
    groupTitle: "ESG 정보",
    eyebrow: "ESG Information",
    title: "ESG 정보",
    lead: "환경, 안전, 품질, 윤리, 협력사 기준을 제조 현장의 운영 체계 안에서 함께 관리합니다.",
    heroCopy: "정밀가공 과정의 환경 부담을 줄이고 안전한 작업환경과 투명한 거래 기준을 지속적으로 강화합니다.",
    image: menuHeroImages.solar,
    imagePosition: "center 50%",
  },
  "sustainability/policy": {
    route: "sustainability/policy",
    category: "SUSTAINABILITY",
    groupTitle: "지속가능경영정책",
    eyebrow: "Sustainability Policy",
    title: "지속가능경영정책",
    lead: "환경·사회·지배구조와 SAQ 5.0 요구사항을 사업 운영과 공급망 전반에 반영합니다.",
    heroCopy: "전 임직원과 사업장, 운영 활동, 협력사가 함께 준수하는 지속가능경영 원칙을 수립하고 지속적으로 개선합니다.",
    image: menuHeroImages.governance,
    imagePosition: "center 48%",
  },
};

const expandedPageConfigTranslations: Record<Exclude<LanguageCode, "ko">, Record<string, Partial<PageConfig>>> = {
  en: {
    "company/overview": { groupTitle: "Company", title: "Company Overview", lead: "Seoul Industry precision-machines automotive shafts, gears, splines, and housings that transfer power from engines and motors.", heroCopy: "Since 1985, feasibility review, machining, heat treatment, automatic inspection, and volume supply have operated as one connected manufacturing flow." },
    "company/ceo": { groupTitle: "Company", title: "CEO Message", lead: "We pursue continuous growth based on our customers' trust.", heroCopy: "Creating through harmony, we strive to deliver the highest quality and become a Global Leader that contributes to society." },
    "company/history": { groupTitle: "Company" },
    "company/location": { groupTitle: "Company", title: "Location", lead: "Seoul Industry's head office and precision-machining plant are located in Yanggam-myeon, Hwaseong.", heroCopy: "Please coordinate your visit in advance so we can arrange site access and meetings smoothly." },
    "company/notices": { groupTitle: "Company", title: "Notices", lead: "Review Seoul Industry updates on products, quality, recruitment, and company operations.", heroCopy: "We provide customers and partners with accurate company information in a timely manner." },
    "products/electric-vehicle": { groupTitle: "Products", lead: "Precision-machined parts for reduction gears, e-Drive systems, and EV axles.", heroCopy: "Assembly fit, repeat accuracy, and durability are controlled for stable EV drivetrain production." },
    "products/powertrain": { groupTitle: "Products", lead: "Housings, gears, and shafts engineered for powertrain heat and vibration conditions.", heroCopy: "Process settings and inspection data are connected to hold quality over long production runs." },
    "products/driveline": { groupTitle: "Products", lead: "Precision transmission shafts, half shafts, and stub axles that carry power to the wheels.", heroCopy: "Concentricity, runout, splines, and surface quality are controlled for reliable driveline assembly." },
    "products/balance-shaft-module": { groupTitle: "Products", lead: "Aluminum housings and machined parts for balance shaft modules that reduce engine vibration and noise.", heroCopy: "Complex geometry, assembly faces, and bearing areas are controlled for rotational stability and durability." },
    "products/steering": { groupTitle: "Products", lead: "Critical steering parts including pinion shafts and torsion bars.", heroCopy: "Gear and spline machining, heat treatment, and runout inspection keep steering input precise." },
    "products/etc": { groupTitle: "Products", lead: "Custom machining for gears, splines, shafts, and housings based on customer drawings.", heroCopy: "We propose production methods from feasibility review and prototypes through process design and mass production." },
    "manufacturing/process": { groupTitle: "Manufacturing", title: "Production Process", lead: "Turning, gear and spline machining, grinding, heat treatment, straightening, and inspection are designed as one connected quality flow.", heroCopy: "The output of each operation becomes the standard for the next, maintaining repeat accuracy and surface quality over long production runs." },
    "manufacturing/equipment": { groupTitle: "Manufacturing", title: "Equipment & Automation", lead: "CNC, gear machining, grinding, heat treatment, and automation equipment are configured around part geometry and quality criteria.", heroCopy: "Equipment settings, dedicated fixtures, transfer automation, and measurement reduce process variation and operator dependency." },
    "manufacturing/inspection": { groupTitle: "Manufacturing", title: "Inspection Technology", lead: "Dimensions, GD&T, gear geometry, runout, and cracks are checked through automated inspection, CMM, and dedicated metrology.", heroCopy: "Measurement data feeds back into correction, process conditions, and shipment decisions for preventive quality control." },
    "quality/policy": { groupTitle: "Quality", title: "Quality Policy", lead: "Understand customer requirements, build quality into the process, and prove reliability with data.", heroCopy: "Preventive quality control and continuous process improvement support stable customer production." },
    "quality/system": { groupTitle: "Quality", title: "Quality System", lead: "Drawing review, incoming inspection, process checks, final inspection, and LOT traceability operate as one system.", heroCopy: "IATF 16949, ISO 14001, SQ, and customer requirements are connected to everyday manufacturing controls." },
    "quality/preventive": { groupTitle: "Quality", title: "Preventive Quality", lead: "We remove risks during development and production preparation before defects occur.", heroCopy: "Process FMEA, control plans, first-article validation, SPC, and change control reduce recurrence and escape risk." },
    "rnd/parts-development": { groupTitle: "R&D", title: "Parts Development", lead: "Customer drawings and specifications are translated into manufacturable processes from prototype to production.", heroCopy: "Feasibility, tooling, gauges, prototype validation, and process capability checks reduce development risk." },
    "recruit/information": { groupTitle: "Careers", title: "Recruitment", lead: "We are looking for people who will build the next manufacturing standard across production, quality, development, and administration.", heroCopy: "Join colleagues who keep standards, continue improving, and finish results together." },
    "recruit/benefits": { groupTitle: "Careers", title: "Benefits", lead: "Practical benefits help employees work with stability and build skills over time.", heroCopy: "Health, growth, daily life, and long-service programs support people and manufacturing capability together." },
    "esg/information": { groupTitle: "ESG Information", title: "ESG Information", lead: "Environment, safety, quality, ethics, and supplier standards are managed within one operating system.", heroCopy: "We reduce machining impacts while strengthening workplace safety and transparent business standards." },
    "sustainability/policy": { groupTitle: "Sustainability Policy", title: "Sustainability Policy", lead: "Environmental, social, governance, and SAQ 5.0 requirements are integrated across our operations and supply chain.", heroCopy: "The policy applies to every employee, business site, operation, and supplier and is strengthened through continuous improvement." },
  },
  ja: {
    "company/overview": { groupTitle: "企業情報", title: "会社概要", lead: "ソウル産業は、エンジンとモーターの動力を伝えるシャフト、ギヤ、スプライン、ハウジングを精密加工する自動車部品メーカーです。", heroCopy: "1985年から、製造検討、精密加工、熱処理、自動検査、量産供給を一つの製造フローにつなげています。" },
    "company/ceo": { groupTitle: "企業情報", title: "CEOメッセージ", lead: "お客様の信頼を基盤に、持続可能な成長を追求します。", heroCopy: "調和から創造するという経営哲学のもと、最高の品質を実現し、社会に貢献するGlobal Leaderを目指します。" },
    "company/history": { groupTitle: "企業情報" },
    "company/location": { groupTitle: "企業情報", title: "アクセス", lead: "ソウル産業の本社と精密加工工場は京畿道華城市楊甘面にあります。", heroCopy: "ご訪問前に担当者と日程をご調整いただくと、入場と打ち合わせを円滑にご案内できます。" },
    "company/notices": { groupTitle: "企業情報", title: "お知らせ", lead: "製品、品質、採用、会社運営に関するソウル産業の主要情報をご覧いただけます。", heroCopy: "お客様と協力会社に必要な会社情報を正確かつ迅速にお伝えします。" },
    "products/electric-vehicle": { groupTitle: "製品情報", lead: "減速機、e-Drive、EV駆動軸に適用される精密加工部品を生産します。", heroCopy: "組立整合性、反復精度、耐久条件を管理し、EV駆動系の安定した量産品質を確保します。" },
    "products/powertrain": { groupTitle: "製品情報", lead: "パワートレインの熱・振動条件に対応するハウジング、ギヤ、シャフト部品を生産します。", heroCopy: "加工条件と検査データをつなぎ、長期量産でも安定した品質を維持します。" },
    "products/driveline": { groupTitle: "製品情報", lead: "トランスミッションシャフト、ハーフ・スタブアクスルなどの駆動系部品を精密加工します。", heroCopy: "同心度、振れ、スプライン、表面品質を管理し、駆動系の組立信頼性を高めます。" },
    "products/balance-shaft-module": { groupTitle: "製品情報", lead: "エンジンの振動と騒音を低減するバランスシャフトモジュール部品を生産します。", heroCopy: "複合形状、組立面、ベアリング部の寸法を管理し、回転安定性と耐久性を確保します。" },
    "products/steering": { groupTitle: "製品情報", lead: "Pinion Shaft、Torsion Barなど操舵応答と安全性を左右する部品を生産します。", heroCopy: "ギヤ・スプライン加工、熱処理、振れ検査をつなぎ、操舵入力を正確に伝えます。" },
    "products/etc": { groupTitle: "製品情報", lead: "顧客図面に合わせてギヤ、スプライン、シャフト、ハウジングをカスタム加工します。", heroCopy: "開発検討、試作、工程設計、量産移管までプロジェクトに合う生産方式を提案します。" },
    "manufacturing/process": { groupTitle: "生産技術", title: "生産工程", lead: "旋削、ギヤ・スプライン加工、研削、熱処理、矯正、検査を一つの品質フローとして設計します。", heroCopy: "各工程の結果を次工程の基準につなげ、長期量産でも反復精度と表面品質を維持します。" },
    "manufacturing/equipment": { groupTitle: "生産技術", title: "保有設備・自動化", lead: "部品形状と品質基準に合わせ、CNC、ギヤ加工、研削、熱処理、自動化設備を運用します。", heroCopy: "設備条件、専用治具、自動搬送、測定をつなげて工程ばらつきと作業依存を抑えます。" },
    "manufacturing/inspection": { groupTitle: "生産技術", title: "検査技術", lead: "寸法、幾何公差、ギヤ形状、振れ、亀裂を自動検査、CMM、専用測定設備で確認します。", heroCopy: "測定データを矯正、工程条件、出荷判定に戻し、予防中心の品質フローを運用します。" },
    "quality/policy": { groupTitle: "品質保証", title: "品質方針", lead: "顧客要求を正確に理解し、工程で品質を造り込み、データで信頼を証明します。", heroCopy: "予防中心の品質管理と継続的な工程改善で安定した量産を支えます。" },
    "quality/system": { groupTitle: "品質保証", title: "品質システム", lead: "図面検討、受入検査、工程検査、最終検査、LOT追跡を一つの品質フローで運営します。", heroCopy: "IATF 16949、ISO 14001、SQと顧客品質基準を日常の工程管理につなげます。" },
    "quality/preventive": { groupTitle: "品質保証", title: "予防品質活動", lead: "問題発生後の対応を超え、開発と量産準備段階でリスクを先に取り除きます。", heroCopy: "工程FMEA、管理計画、初品検証、SPC、変更点管理で再発と流出を抑えます。" },
    "rnd/parts-development": { groupTitle: "研究開発", title: "部品開発", lead: "顧客図面と要求仕様を製造可能な工程へ変換し、試作から量産までつなぎます。", heroCopy: "加工性、治工具、検査具、試作検証、工程能力の確認で開発リスクを低減します。" },
    "recruit/information": { groupTitle: "採用情報", title: "採用情報", lead: "生産、品質、開発、管理が連携するソウル産業で次の製造基準をつくる人材を募集します。", heroCopy: "基準を守り、改善を続け、仲間と結果を完成させる方をお待ちしています。" },
    "recruit/benefits": { groupTitle: "採用情報", title: "福利厚生", lead: "従業員が安定して働き、技術と経験を長く蓄積できる実質的な福利厚生を運営します。", heroCopy: "健康、成長、生活、長期勤続を支援し、人と製造力がともに成長する環境をつくります。" },
    "esg/information": { groupTitle: "ESG情報", title: "ESG情報", lead: "環境、安全、品質、倫理、協力会社基準を製造現場の運営体系で管理します。", heroCopy: "精密加工の環境負荷を抑え、安全な職場と透明な取引基準を強化します。" },
    "sustainability/policy": { groupTitle: "持続可能経営方針", title: "持続可能経営方針", lead: "環境・社会・ガバナンスおよびSAQ 5.0の要件を事業運営とサプライチェーン全体に反映します。", heroCopy: "全従業員、事業所、事業活動、協力会社がともに遵守する原則を定め、継続的に改善します。" },
  },
};

export function getPageConfig(route: string, language: LanguageCode): PageConfig {
  const base = expandedPageConfigs[route] ?? pageConfigs[route] ?? expandedPageConfigs["company/ceo"];
  const legacyTranslation = language === "ko" ? undefined : pageConfigTranslations[language]?.[base.route];
  const expandedTranslation = language === "ko" ? undefined : expandedPageConfigTranslations[language]?.[base.route];
  return { ...base, ...legacyTranslation, ...expandedTranslation };
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

const environmentalPrograms = [
  { title: "조직체계", copy: "생산, 품질, 관리 담당자가 환경 이슈를 함께 확인하고 개선 항목을 현장 기준으로 반영합니다.", note: "정기 점검 / 개선 이력 관리" },
  { title: "리스크 완화", copy: "가공, 세척, 포장, 출하 과정에서 발생 가능한 환경 영향을 단계별로 확인하고 우선순위를 정합니다.", note: "공정별 위험요인 관리" },
  { title: "화학물질 관리", copy: "MSDS, 소분용기 표기, 작업공정별 관리요령을 현장에 비치해 취급 기준을 명확히 합니다.", note: "교육 / 표지 / 보관 기준" },
];

const esgPillars = [
  {
    letter: "E",
    title: "Environmental",
    label: "환경안전보건",
    copy: "에너지, 자원, 폐기물, 화학물질 사용 흐름을 공정 안에서 점검하고 환경 부담을 줄입니다.",
    image: menuHeroImages.solar,
    points: ["ISO 14001 기반 환경경영", "공정별 환경영향 점검", "작업장 안전 기준 운영"],
  },
  {
    letter: "S",
    title: "Social",
    label: "동반성장과 현장 책임",
    copy: "임직원 안전, 협력사 소통, 고객 납기 대응을 지속 가능한 제조 파트너십의 기준으로 둡니다.",
    image: menuHeroImages.factory,
    points: ["안전한 작업 환경", "협력사 커뮤니케이션", "고객 공급 안정성"],
  },
  {
    letter: "G",
    title: "Governance",
    label: "윤리·투명경영",
    copy: "도면, 품질, 납기, 거래 기준을 투명하게 기록하고 책임 있는 의사결정 체계를 유지합니다.",
    image: menuHeroImages.governance,
    points: ["윤리헌장과 실천지침", "품질·LOT 기록 관리", "리스크 예방과 조치 이력"],
  },
];

const esgManagementCards = [
  {
    index: "01",
    title: "윤리경영",
    en: "Ethical Management",
    copy: "고객, 협력사, 임직원, 지역사회와의 관계에서 지켜야 할 윤리 기준을 문서화하고 업무 판단 기준으로 적용합니다.",
  },
  {
    index: "02",
    title: "품질경영",
    en: "Quality Management",
    copy: "IATF 16949, SQ, VDA 6.3 등 고객 품질 기준과 연계해 검사 기록, LOT 이력, 변경 관리를 체계화합니다.",
  },
  {
    index: "03",
    title: "환경안전보건",
    en: "EHS",
    copy: "환경 영향과 작업 위험 요소를 함께 점검하고 설비, 공정, 작업 기준을 개선 항목으로 연결합니다.",
  },
  {
    index: "04",
    title: "동반성장·사회책임",
    en: "Partnership",
    copy: "명확한 품질·납기 기준을 공유하며 협력사와 고객사가 같은 생산 흐름 안에서 움직일 수 있게 관리합니다.",
  },
  {
    index: "05",
    title: "투명한 소통",
    en: "Reporting Channel",
    copy: "품질, 윤리, 안전, 거래 기준에서 발생하는 이슈를 접수하고 원인, 조치, 재발방지까지 기록합니다.",
  },
];

const esgFlowSteps = [
  { label: "Identify", title: "이슈 식별", copy: "공정, 품질, 안전, 환경, 거래 기준에서 발생 가능한 리스크를 업무 단계별로 확인합니다." },
  { label: "Assess", title: "영향 평가", copy: "고객 납기, 품질 신뢰, 현장 안전, 환경 부담에 미치는 영향을 기준으로 우선순위를 정합니다." },
  { label: "Improve", title: "개선 실행", copy: "담당 부서가 원인, 임시 조치, 개선 기준, 재발 방지 대책을 정리하고 실행합니다." },
  { label: "Record", title: "기록과 공유", copy: "조치 결과와 개선 이력을 남기고 고객 요구사항, 인증 기준, 내부 교육과 연결합니다." },
];

const esgStandardBadges = ["ISO 14001", "IATF 16949", "ISO 9001", "SQ", "INNOBIZ", "VDA 6.3", "CQI-9", "CQI-15"];

type EsgPageCopy = {
  landingEyebrow: string;
  landingTitle: string[];
  landingCopy: string;
  badgeLabel: string;
  visualLabel: string;
  systemEyebrow: string;
  systemTitle: string;
  systemCopy: string;
  flowEyebrow: string;
  flowTitle: string;
  practiceEyebrow: string;
  practiceTitle: string;
  practiceCopy: string;
  metricsTitle: string;
  pillars: typeof esgPillars;
  managementCards: typeof esgManagementCards;
  flowSteps: typeof esgFlowSteps;
  environmentalSteps: typeof environmentalSteps;
  environmentalPrograms: typeof environmentalPrograms;
  environmentalMetrics: typeof environmentalMetrics;
  badges: string[];
};

const esgPageCopy: Record<LanguageCode, EsgPageCopy> = {
  ko: {
    landingEyebrow: "SUSTAINABILITY MANAGEMENT",
    landingTitle: ["정밀가공의 기준을", "지속가능한 제조로 연결합니다."],
    landingCopy:
      "서울산업은 환경, 안전, 품질, 윤리, 협력사 기준을 하나의 운영 체계로 묶어 고객이 신뢰할 수 있는 OEM 생산 흐름을 만듭니다. 현장에서 지켜지는 작은 기록이 장기 파트너십의 기준이 되도록 관리합니다.",
    badgeLabel: "서울산업 ESG 연계 인증",
    visualLabel: "SEOUL INDUSTRY ESG",
    systemEyebrow: "ESG MANAGEMENT SYSTEM",
    systemTitle: "서울산업 ESG 운영 체계",
    systemCopy: "세부 항목은 보여주기 위한 문구가 아니라, 고객 도면 검토부터 양산, 검사, 출하까지 이어지는 제조 흐름 안에서 매일 확인되는 기준입니다.",
    flowEyebrow: "PROCESS",
    flowTitle: "이슈를 기록하고 개선까지 연결합니다.",
    practiceEyebrow: "ENVIRONMENTAL PRACTICE",
    practiceTitle: "환경안전보건 실행 항목",
    practiceCopy:
      "제조 현장에서 확인되는 에너지 사용, 화학물질 취급, 폐기물 발생, 작업 안전 요소를 정기적으로 점검하고 법규 준수와 공정 효율 개선을 함께 추진합니다.",
    metricsTitle: "환경 관리 항목",
    pillars: esgPillars,
    managementCards: esgManagementCards,
    flowSteps: esgFlowSteps,
    environmentalSteps,
    environmentalPrograms,
    environmentalMetrics,
    badges: esgStandardBadges,
  },
  en: {
    landingEyebrow: "SUSTAINABILITY MANAGEMENT",
    landingTitle: ["Precision standards", "connected to sustainable manufacturing."],
    landingCopy:
      "Seoul Industry connects environment, safety, quality, ethics, and partner standards into one operating system, building OEM production flows customers can trust over time.",
    badgeLabel: "Seoul Industry ESG-linked standards",
    visualLabel: "SEOUL INDUSTRY ESG",
    systemEyebrow: "ESG MANAGEMENT SYSTEM",
    systemTitle: "Seoul Industry ESG Operating System",
    systemCopy: "These are not presentation-only messages. They are daily operating standards across drawing review, mass production, inspection, and shipment.",
    flowEyebrow: "PROCESS",
    flowTitle: "We record issues and connect them to improvement.",
    practiceEyebrow: "ENVIRONMENTAL PRACTICE",
    practiceTitle: "EHS Action Items",
    practiceCopy:
      "We regularly check energy use, chemical handling, waste generation, and workplace safety factors while improving compliance and process efficiency.",
    metricsTitle: "Environmental Management Items",
    pillars: [
      {
        letter: "E",
        title: "Environmental",
        label: "EHS",
        copy: "We monitor energy, resource, waste, and chemical flows in each process to reduce environmental burden.",
        image: menuHeroImages.solar,
        points: ["ISO 14001-based operation", "Process-level impact checks", "Workplace safety standards"],
      },
      {
        letter: "S",
        title: "Social",
        label: "Responsible Partnership",
        copy: "Employee safety, supplier communication, and stable customer delivery are treated as core partnership standards.",
        image: menuHeroImages.factory,
        points: ["Safe workplace", "Supplier communication", "Stable customer supply"],
      },
      {
        letter: "G",
        title: "Governance",
        label: "Ethics and Transparency",
        copy: "We record drawings, quality, delivery, and transaction standards transparently and maintain accountable decisions.",
        image: menuHeroImages.governance,
        points: ["Ethics charter and guidelines", "Quality and LOT records", "Risk prevention history"],
      },
    ],
    managementCards: [
      { index: "01", title: "Ethical Management", en: "Ethical Management", copy: "We document ethical standards for customers, suppliers, employees, and communities and apply them in daily decisions." },
      { index: "02", title: "Quality Management", en: "Quality Management", copy: "Inspection records, LOT history, and change control are connected to customer standards such as IATF 16949, SQ, and VDA 6.3." },
      { index: "03", title: "EHS", en: "EHS", copy: "Environmental impacts and workplace risks are checked together and linked to facility, process, and work-standard improvements." },
      { index: "04", title: "Shared Growth", en: "Partnership", copy: "Clear quality and delivery standards are shared so suppliers and customers can move within one production flow." },
      { index: "05", title: "Transparent Communication", en: "Reporting Channel", copy: "Quality, ethics, safety, and transaction issues are received, investigated, corrected, and recorded through follow-up actions." },
    ],
    flowSteps: [
      { label: "Identify", title: "Issue Identification", copy: "We identify risks by work stage across process, quality, safety, environment, and transaction standards." },
      { label: "Assess", title: "Impact Assessment", copy: "Priorities are set by impact on delivery, quality trust, workplace safety, and environmental burden." },
      { label: "Improve", title: "Improvement Action", copy: "Responsible teams define causes, temporary actions, improvement standards, and recurrence prevention." },
      { label: "Record", title: "Record and Share", copy: "Results and improvement history are connected to customer requirements, certification standards, and training." },
    ],
    environmentalSteps: ["Select scope and prepare", "Identify environmental impact and risk by process", "Estimate impact by hazard factor", "Set acceptability and priority", "Plan and execute improvements", "Record results and inspect regularly"],
    environmentalPrograms: [
      { title: "Organization", copy: "Production, quality, and administration teams review environmental issues together and reflect improvements in site standards.", note: "Regular checks / improvement history" },
      { title: "Risk Mitigation", copy: "Environmental impacts in machining, washing, packing, and shipment are checked step by step and prioritized.", note: "Process-level risk control" },
      { title: "Chemical Management", copy: "MSDS, container labeling, and work process handling rules are kept on site to clarify handling standards.", note: "Training / labeling / storage" },
    ],
    environmentalMetrics: [
      ["Environmental Law", "Violation Count", "0 cases", "Regular site standard checks"],
      ["Energy", "Power and fuel use", "Monthly tracking", "Equipment efficiency improvement"],
      ["Waste", "Recycling and discharge flow", "Process-level control", "Sorting and record standards"],
      ["Chemicals", "MSDS and containers", "On-site availability", "Training and labeling control"],
    ],
    badges: esgStandardBadges,
  },
  ja: {
    landingEyebrow: "SUSTAINABILITY MANAGEMENT",
    landingTitle: ["精密加工の基準を", "持続可能な製造へつなげます。"],
    landingCopy:
      "ソウル産業は環境、安全、品質、倫理、協力会社基準を一つの運営体系にまとめ、顧客が長く信頼できるOEM生産フローを構築します。",
    badgeLabel: "ソウル産業 ESG関連基準",
    visualLabel: "SEOUL INDUSTRY ESG",
    systemEyebrow: "ESG MANAGEMENT SYSTEM",
    systemTitle: "ソウル産業 ESG運営体系",
    systemCopy: "各項目は見せるための文章ではなく、図面検討から量産、検査、出荷まで毎日確認される製造基準です。",
    flowEyebrow: "PROCESS",
    flowTitle: "課題を記録し、改善までつなげます。",
    practiceEyebrow: "ENVIRONMENTAL PRACTICE",
    practiceTitle: "環境安全衛生の実行項目",
    practiceCopy:
      "製造現場で確認されるエネルギー使用、化学物質取扱い、廃棄物発生、作業安全要素を定期的に点検し、法規遵守と工程効率改善を進めます。",
    metricsTitle: "環境管理項目",
    pillars: [
      {
        letter: "E",
        title: "Environmental",
        label: "環境安全衛生",
        copy: "エネルギー、資源、廃棄物、化学物質の流れを工程内で点検し、環境負担を低減します。",
        image: menuHeroImages.solar,
        points: ["ISO 14001基盤の環境経営", "工程別環境影響点検", "作業場安全基準運営"],
      },
      {
        letter: "S",
        title: "Social",
        label: "共生と現場責任",
        copy: "従業員安全、協力会社との意思疎通、顧客納期対応を持続可能な製造パートナーシップの基準にします。",
        image: menuHeroImages.factory,
        points: ["安全な作業環境", "協力会社コミュニケーション", "安定した顧客供給"],
      },
      {
        letter: "G",
        title: "Governance",
        label: "倫理・透明経営",
        copy: "図面、品質、納期、取引基準を透明に記録し、責任ある意思決定体系を維持します。",
        image: menuHeroImages.governance,
        points: ["倫理憲章と実践指針", "品質・LOT記録管理", "リスク予防と措置履歴"],
      },
    ],
    managementCards: [
      { index: "01", title: "倫理経営", en: "Ethical Management", copy: "顧客、協力会社、従業員、地域社会との関係で守る倫理基準を文書化し、業務判断に適用します。" },
      { index: "02", title: "品質経営", en: "Quality Management", copy: "IATF 16949、SQ、VDA 6.3など顧客品質基準と連携し、検査記録、LOT履歴、変更管理を体系化します。" },
      { index: "03", title: "環境安全衛生", en: "EHS", copy: "環境影響と作業リスクを一緒に点検し、設備、工程、作業基準の改善項目へつなげます。" },
      { index: "04", title: "共生・社会責任", en: "Partnership", copy: "明確な品質・納期基準を共有し、協力会社と顧客が同じ生産フローで動けるよう管理します。" },
      { index: "05", title: "透明な疎通", en: "Reporting Channel", copy: "品質、倫理、安全、取引基準の課題を受け付け、原因、措置、再発防止まで記録します。" },
    ],
    flowSteps: [
      { label: "Identify", title: "課題識別", copy: "工程、品質、安全、環境、取引基準で発生し得るリスクを業務段階別に確認します。" },
      { label: "Assess", title: "影響評価", copy: "顧客納期、品質信頼、現場安全、環境負担への影響を基準に優先順位を決めます。" },
      { label: "Improve", title: "改善実行", copy: "担当部門が原因、暫定措置、改善基準、再発防止策を整理して実行します。" },
      { label: "Record", title: "記録と共有", copy: "措置結果と改善履歴を残し、顧客要求、認証基準、社内教育へつなげます。" },
    ],
    environmentalSteps: ["対象選定と事前準備", "工程別環境影響とリスク把握", "有害・危険要因別の影響度推定", "許容可否と優先順位決定", "改善対策の策定と実行", "実行結果記録と定期点検"],
    environmentalPrograms: [
      { title: "組織体系", copy: "生産、品質、管理担当者が環境課題を一緒に確認し、改善項目を現場基準へ反映します。", note: "定期点検 / 改善履歴管理" },
      { title: "リスク低減", copy: "加工、洗浄、包装、出荷過程で発生し得る環境影響を段階別に確認し、優先順位を定めます。", note: "工程別危険要因管理" },
      { title: "化学物質管理", copy: "MSDS、小分け容器表示、作業工程別管理要領を現場に備え、取扱基準を明確にします。", note: "教育 / 表示 / 保管基準" },
    ],
    environmentalMetrics: [
      ["環境法規", "違反件数", "0件", "現場基準の定期点検"],
      ["エネルギー", "電力・燃料使用量", "月別管理", "設備稼働効率改善"],
      ["廃棄物", "リサイクル・排出フロー", "工程別管理", "分別・記録基準維持"],
      ["化学物質", "MSDS・小分け容器", "現場備置", "教育と表示管理"],
    ],
    badges: esgStandardBadges,
  },
};

const governanceCards = [
  { title: "윤리헌장", copy: "임직원이 고객, 협력사, 지역사회와의 관계에서 지켜야 할 기본 원칙을 명확히 합니다." },
  { title: "윤리규범", copy: "품질 기록, 납기, 거래, 정보보안, 이해상충 방지 기준을 일상 업무의 판단 기준으로 삼습니다." },
  { title: "실천지침", copy: "현장에서 바로 확인할 수 있는 보고, 승인, 기록, 개선 절차를 기준화해 실행력을 높입니다." },
];

const governanceStakeholders = [
  { label: "01", title: "국가와 사회", copy: "법규를 준수하고 책임 있는 제조 활동으로 지역사회와 신뢰를 쌓습니다." },
  { label: "02", title: "고객", copy: "도면, 품질, 납기, 변경 이력을 투명하게 관리해 안정적인 OEM 공급을 이어갑니다." },
  { label: "03", title: "협력사", copy: "공정한 거래 기준과 명확한 품질 기준을 공유해 장기 파트너십을 만듭니다." },
  { label: "04", title: "임직원", copy: "안전한 현장, 책임 있는 의사결정, 부당한 차별 없는 조직 문화를 지향합니다." },
  { label: "05", title: "정보와 기록", copy: "고객 도면, 검사 결과, LOT 이력 등 핵심 정보를 정해진 권한과 절차로 관리합니다." },
];

const governanceRiskSteps = [
  { title: "리스크 식별", copy: "고객 요구사항, 도면 변경, 품질 이슈, 납기 변동, 협력사 이슈를 업무 단계별로 확인합니다." },
  { title: "리스크 대응", copy: "이슈 발생 시 유관 담당자가 원인, 영향 범위, 임시 조치, 재발 방지 대책을 함께 정리합니다." },
  { title: "사후관리", copy: "조치 결과와 개선 이력을 기록하고 동일 문제가 반복되지 않도록 기준서와 현장 교육에 반영합니다." },
];

const governanceIndicators = [
  ["윤리/반부패 신고 현황", "신고 및 확인 체계", "상시 운영", "접수, 조사, 조치 이력을 분리해 관리"],
  ["공정거래 교육 현황", "협력사 거래 기준", "정기 점검", "발주, 납기, 품질 기준의 명확한 공유"],
  ["컴플라이언스", "법규·인증 기준", "정기 확인", "IATF, ISO, SQ 등 인증 기준과 연결"],
  ["정보보안경영", "도면·고객자료 권한", "권한 관리", "자료 접근과 전달 경로를 제한"],
  ["품질기록", "검사·LOT 이력", "공정별 관리", "고객 요구사항과 변경 이력 추적"],
  ["리스크관리", "이슈 대응 및 재발방지", "기록 유지", "원인 분석, 조치, 사후 검증까지 관리"],
];

const esgReports = [
  { year: "2026", title: "서울산업 ESG 운영 방향", copy: "환경경영, 안전한 현장, 품질 기록, 준법 거래 기준을 한 문서 흐름으로 정리합니다." },
  { year: "2025", title: "현장 개선 활동", copy: "에너지 사용, 폐기물 관리, 불량 감소, 작업 안전 개선 활동을 항목별로 관리합니다." },
  { year: "2024", title: "품질·윤리 기준", copy: "고객 요구사항, 공정 이력, 협력사 거래 기준을 명확하게 남기는 운영 기준을 정리합니다." },
];

const esgDisclosureRows = [
  ["환경", "에너지·폐기물·화학물질", "운영 기준", "ISO 14001 기반 관리 항목"],
  ["사회", "안전·인권·협력사", "관리 항목", "현장 안전과 협력사 커뮤니케이션"],
  ["지배구조", "윤리·준법·리스크", "운영 기준", "품질 기록과 공정거래 기준"],
  ["품질", "인증·고객 요구사항", "연계 관리", "IATF, SQ, ISO 인증 체계와 연결"],
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

type RecruitValue = {
  title: string;
  label: string;
  copy: string;
  keywords: string[];
};

type RecruitStep = {
  title: string;
  copy: string;
};

type RecruitSystem = {
  title: string;
  copy: string;
  note: string;
};

type RecruitBenefitGroup = {
  title: string;
  items: string[];
};

type RecruitJob = {
  field: string;
  title: string;
  status: string;
  work: string;
  meta: string;
};

type RecruitPageCopy = {
  heroEyebrow: string;
  heroTitle: string[];
  heroCopy: string;
  heroCta: string;
  heroCtaHref: string;
  heroStatLabel: string;
  heroStats: Array<[string, string]>;
  processEyebrow: string;
  processTitle: string;
  processCopy: string;
  steps: RecruitStep[];
  valuesEyebrow: string;
  valuesTitle: string;
  valuesCopy: string;
  values: RecruitValue[];
  peopleEyebrow: string;
  peopleTitle: string;
  peopleCopy: string;
  peopleBullets: string[];
  systemEyebrow: string;
  systemTitle: string;
  systems: RecruitSystem[];
  benefitEyebrow: string;
  benefitTitle: string;
  benefitCopy: string;
  benefitGroups: RecruitBenefitGroup[];
  jobsEyebrow: string;
  jobsTitle: string;
  jobsCopy: string;
  jobsCta: string;
  jobs: RecruitJob[];
  jobsGuideTitle: string;
  jobsGuideItems: string[];
};

const recruitPageCopy: Record<LanguageCode, RecruitPageCopy> = {
  ko: {
    heroEyebrow: "SEOUL INDUSTRY RECRUITMENT",
    heroTitle: ["정밀가공의 현장에서", "미래의 움직임을 함께 만듭니다."],
    heroCopy:
      "서울산업은 자동차 부품 정밀가공 현장에서 품질, 납기, 개선을 함께 만들어 갈 사람을 기다립니다. 좋은 제조는 좋은 장비만으로 완성되지 않고, 현장을 이해하는 사람의 태도에서 시작됩니다.",
    heroCta: "채용공고 보기",
    heroCtaHref: "#/recruit/information",
    heroStatLabel: "PEOPLE FIRST",
    heroStats: [
      ["1985", "제조 기반"],
      ["OEM", "글로벌 고객 대응"],
      ["1 TEAM", "생산·품질·기술 협업"],
    ],
    processEyebrow: "PROCESS",
    processTitle: "채용 프로세스",
    processCopy: "직무 적합성과 현장 협업 역량을 함께 확인하며, 지원자에게 필요한 안내를 단계별로 제공합니다.",
    steps: [
      { title: "지원 접수", copy: "채용공고 확인 후 이력서와 자기소개서를 제출합니다." },
      { title: "서류 검토", copy: "직무 경험, 기본 역량, 성장 가능성을 종합적으로 검토합니다." },
      { title: "면접 전형", copy: "담당 부서와 함께 현장 이해도, 책임감, 협업 방식을 확인합니다." },
      { title: "입사 안내", copy: "처우, 필요 서류, 입사 일정과 배치 부서를 안내합니다." },
    ],
    valuesEyebrow: "EMPLOYMENT INFORMATION",
    valuesTitle: "서울산업 인재상",
    valuesCopy: "현장 문제를 정확히 보고, 기준을 세우며, 동료와 함께 더 나은 제조 흐름을 만드는 사람을 찾습니다.",
    values: [
      { title: "Challenging", label: "도전", copy: "새로운 공정 조건과 고객 요구를 피하지 않고 개선안을 찾는 사람", keywords: ["도전", "실행", "개선"] },
      { title: "Professional", label: "전문성", copy: "맡은 직무의 기준을 깊게 이해하고 꾸준히 숙련도를 높이는 사람", keywords: ["숙련", "책임", "학습"] },
      { title: "Integrity", label: "정직", copy: "품질 기록과 현장 기준을 투명하게 지키며 신뢰를 만드는 사람", keywords: ["기록", "기준", "신뢰"] },
      { title: "Collaboration", label: "소통", copy: "생산, 품질, 기술 부서와 정확히 소통하며 납기 목표를 맞추는 사람", keywords: ["협업", "존중", "공유"] },
    ],
    peopleEyebrow: "PEOPLE AND SHOP FLOOR",
    peopleTitle: "사람과 현장을 중시하는 서울산업",
    peopleCopy:
      "서울산업은 축적된 제조 경험을 다음 세대의 숙련으로 연결하기 위해 현장 교육, 품질 의식, 안전한 작업 문화를 중요하게 봅니다. 빠르게 변하는 자동차 부품 시장에서 가장 오래 남는 경쟁력은 사람입니다.",
    peopleBullets: ["현장 중심 직무 교육", "품질 기준과 기록 습관", "안전하고 책임 있는 작업 문화", "고객 납기 대응을 위한 부서 간 협업"],
    systemEyebrow: "HR SYSTEM",
    systemTitle: "인사제도",
    systems: [
      { title: "급여제도", copy: "직무와 역량, 회사 운영 기준에 맞춰 합리적인 보상 체계를 운영합니다.", note: "월 급여 / 수당 / 성과 기준" },
      { title: "평가제도", copy: "업무 태도, 직무 숙련, 품질 개선 기여도를 함께 반영합니다.", note: "직무 역량 / 협업 / 개선" },
      { title: "승격제도", copy: "근속 기간뿐 아니라 실질적인 역할 수행과 성과를 함께 검토합니다.", note: "역량 기반 성장" },
      { title: "교육훈련", copy: "신규 입사자와 직무 담당자가 현장 기준을 빠르게 익힐 수 있도록 지원합니다.", note: "현장 교육 / 품질 교육" },
    ],
    benefitEyebrow: "BENEFIT",
    benefitTitle: "복리후생제도",
    benefitCopy: "임직원이 안정적으로 업무에 집중하고 생활의 균형을 유지할 수 있도록 기본 복지와 현장 지원 제도를 운영합니다.",
    benefitGroups: [
      { title: "법정 복리후생", items: ["국민연금", "건강보험", "고용보험", "산재보험", "퇴직연금"] },
      { title: "생활 지원", items: ["건강검진", "경조 지원", "휴가 제도", "기념일 선물"] },
      { title: "근무 지원", items: ["통근 지원", "식사 지원", "근무복 지급", "현장 안전용품"] },
      { title: "성장 지원", items: ["직무 교육", "품질 교육", "장기근속 포상", "자격 역량 지원"] },
    ],
    jobsEyebrow: "JOB OPENINGS",
    jobsTitle: "현재 모집 직무",
    jobsCopy: "생산, 품질, 생산관리 영역에서 서울산업의 제조 기준을 함께 만들 인재를 찾습니다.",
    jobsCta: "문의하기",
    jobs: [
      { field: "생산기술", title: "정밀가공 생산기술 담당", status: "상시채용", work: "공정 조건 관리, 설비 셋업, 생산성 개선", meta: "경력/신입 협의" },
      { field: "품질관리", title: "자동차 부품 품질관리 담당", status: "접수중", work: "치수 검사, LOT 관리, 고객 품질 대응", meta: "품질 문서 이해 우대" },
      { field: "생산관리", title: "OEM 양산 납기관리 담당", status: "상시채용", work: "생산계획, 출하 일정, 협력사 커뮤니케이션", meta: "제조업 경험 우대" },
    ],
    jobsGuideTitle: "지원 안내",
    jobsGuideItems: ["채용공고 확인", "이력서와 자기소개서 준비", "담당자 검토 후 개별 연락", "면접 및 입사 일정 협의"],
  },
  en: {
    heroEyebrow: "SEOUL INDUSTRY RECRUITMENT",
    heroTitle: ["On the precision machining floor", "we build tomorrow's movement together."],
    heroCopy:
      "Seoul Industry is looking for people who will build quality, delivery, and improvement together on the precision machining floor. Strong manufacturing starts with people who understand the site.",
    heroCta: "View Openings",
    heroCtaHref: "#/recruit/information",
    heroStatLabel: "PEOPLE FIRST",
    heroStats: [
      ["1985", "Manufacturing base"],
      ["OEM", "Global customer response"],
      ["1 TEAM", "Production, quality, and engineering"],
    ],
    processEyebrow: "PROCESS",
    processTitle: "Recruitment Process",
    processCopy: "We review job fit and collaboration capability together, with clear guidance at each stage.",
    steps: [
      { title: "Apply", copy: "Submit your resume and introduction after checking the opening." },
      { title: "Document Review", copy: "We review experience, core capability, and growth potential." },
      { title: "Interview", copy: "The team checks site understanding, responsibility, and collaboration style." },
      { title: "Onboarding", copy: "Compensation, required documents, start date, and placement are guided." },
    ],
    valuesEyebrow: "EMPLOYMENT INFORMATION",
    valuesTitle: "Talent Profile",
    valuesCopy: "We look for people who understand site issues, set standards, and build better manufacturing flow with colleagues.",
    values: [
      { title: "Challenging", label: "Challenge", copy: "Finds improvement paths instead of avoiding new process or customer requirements.", keywords: ["Challenge", "Action", "Improve"] },
      { title: "Professional", label: "Professionalism", copy: "Understands the role deeply and keeps building practical skill.", keywords: ["Skill", "Ownership", "Learning"] },
      { title: "Integrity", label: "Integrity", copy: "Maintains quality records and site standards transparently.", keywords: ["Record", "Standard", "Trust"] },
      { title: "Collaboration", label: "Communication", copy: "Works accurately across production, quality, and engineering to meet delivery goals.", keywords: ["Teamwork", "Respect", "Share"] },
    ],
    peopleEyebrow: "PEOPLE AND SHOP FLOOR",
    peopleTitle: "A company that values people and the site",
    peopleCopy:
      "Seoul Industry connects accumulated manufacturing experience to the next generation of skills through site training, quality awareness, and safe work culture.",
    peopleBullets: ["Site-centered job training", "Quality standards and record habits", "Safe and responsible work culture", "Cross-team delivery response"],
    systemEyebrow: "HR SYSTEM",
    systemTitle: "HR System",
    systems: [
      { title: "Compensation", copy: "A rational compensation system aligned with role, capability, and company standards.", note: "Salary / allowance / performance" },
      { title: "Evaluation", copy: "Work attitude, role skill, and contribution to quality improvement are reviewed together.", note: "Capability / collaboration / improvement" },
      { title: "Promotion", copy: "Actual role performance and results are considered together with tenure.", note: "Capability-based growth" },
      { title: "Training", copy: "New hires and role owners are supported to learn site standards quickly.", note: "Site training / quality training" },
    ],
    benefitEyebrow: "BENEFIT",
    benefitTitle: "Benefits",
    benefitCopy: "We operate basic welfare and site support programs so employees can focus steadily and maintain balance.",
    benefitGroups: [
      { title: "Statutory Benefits", items: ["National pension", "Health insurance", "Employment insurance", "Industrial accident insurance", "Retirement pension"] },
      { title: "Life Support", items: ["Health checkup", "Family event support", "Leave programs", "Anniversary gifts"] },
      { title: "Work Support", items: ["Commuting support", "Meal support", "Uniforms", "Safety supplies"] },
      { title: "Growth Support", items: ["Job training", "Quality training", "Long-service awards", "Certification support"] },
    ],
    jobsEyebrow: "JOB OPENINGS",
    jobsTitle: "Current Openings",
    jobsCopy: "We are looking for people who will build Seoul Industry's manufacturing standards across production, quality, and production control.",
    jobsCta: "Contact Us",
    jobs: [
      { field: "Production Engineering", title: "Precision Machining Production Engineer", status: "Always Open", work: "Process conditions, equipment setup, productivity improvement", meta: "New/experienced candidates" },
      { field: "Quality Control", title: "Automotive Parts Quality Specialist", status: "Open", work: "Dimensional inspection, LOT management, customer quality response", meta: "Quality documentation preferred" },
      { field: "Production Control", title: "OEM Production Schedule Coordinator", status: "Always Open", work: "Production planning, shipment schedule, partner communication", meta: "Manufacturing experience preferred" },
    ],
    jobsGuideTitle: "Application Guide",
    jobsGuideItems: ["Check openings", "Prepare resume and introduction", "Individual contact after review", "Interview and start-date discussion"],
  },
  ja: {
    heroEyebrow: "SEOUL INDUSTRY RECRUITMENT",
    heroTitle: ["精密加工の現場から", "未来の動きをともにつくります。"],
    heroCopy:
      "ソウル産業は、自動車部品の精密加工現場で品質、納期、改善をともにつくる仲間を待っています。良い製造は設備だけでなく、現場を理解する人の姿勢から始まります。",
    heroCta: "採用公告を見る",
    heroCtaHref: "#/recruit/information",
    heroStatLabel: "PEOPLE FIRST",
    heroStats: [
      ["1985", "製造基盤"],
      ["OEM", "グローバル顧客対応"],
      ["1 TEAM", "生産・品質・技術協業"],
    ],
    processEyebrow: "PROCESS",
    processTitle: "採用プロセス",
    processCopy: "職務適合性と現場での協業力をともに確認し、段階別に必要な案内を行います。",
    steps: [
      { title: "応募受付", copy: "採用公告を確認し、履歴書と自己紹介書を提出します。" },
      { title: "書類検討", copy: "職務経験、基本能力、成長可能性を総合的に検討します。" },
      { title: "面接選考", copy: "担当部署とともに現場理解、責任感、協業方式を確認します。" },
      { title: "入社案内", copy: "処遇、必要書類、入社日程、配属部署を案内します。" },
    ],
    valuesEyebrow: "EMPLOYMENT INFORMATION",
    valuesTitle: "ソウル産業の人材像",
    valuesCopy: "現場課題を正確に見て、基準を立て、仲間とより良い製造フローをつくる人を求めています。",
    values: [
      { title: "Challenging", label: "挑戦", copy: "新しい工程条件と顧客要求を避けず、改善案を探す人", keywords: ["挑戦", "実行", "改善"] },
      { title: "Professional", label: "専門性", copy: "担当職務の基準を深く理解し、熟練度を高め続ける人", keywords: ["熟練", "責任", "学習"] },
      { title: "Integrity", label: "誠実", copy: "品質記録と現場基準を透明に守り、信頼をつくる人", keywords: ["記録", "基準", "信頼"] },
      { title: "Collaboration", label: "疎通", copy: "生産、品質、技術部署と正確に連携し、納期目標を合わせる人", keywords: ["協業", "尊重", "共有"] },
    ],
    peopleEyebrow: "PEOPLE AND SHOP FLOOR",
    peopleTitle: "人と現場を重視するソウル産業",
    peopleCopy:
      "ソウル産業は、積み重ねた製造経験を次世代の熟練へつなげるため、現場教育、品質意識、安全な作業文化を重視します。",
    peopleBullets: ["現場中心の職務教育", "品質基準と記録習慣", "安全で責任ある作業文化", "顧客納期対応のための部署間協業"],
    systemEyebrow: "HR SYSTEM",
    systemTitle: "人事制度",
    systems: [
      { title: "給与制度", copy: "職務と能力、会社運営基準に合わせた合理的な報酬体系を運営します。", note: "月給 / 手当 / 成果基準" },
      { title: "評価制度", copy: "業務姿勢、職務熟練、品質改善への貢献度をともに反映します。", note: "職務能力 / 協業 / 改善" },
      { title: "昇格制度", copy: "勤続期間だけでなく、実質的な役割遂行と成果をともに検討します。", note: "能力基盤の成長" },
      { title: "教育訓練", copy: "新入社員と職務担当者が現場基準を早く習得できるよう支援します。", note: "現場教育 / 品質教育" },
    ],
    benefitEyebrow: "BENEFIT",
    benefitTitle: "福利厚生制度",
    benefitCopy: "社員が安定して業務に集中し、生活のバランスを保てるよう基本福利と現場支援制度を運営します。",
    benefitGroups: [
      { title: "法定福利厚生", items: ["国民年金", "健康保険", "雇用保険", "産災保険", "退職年金"] },
      { title: "生活支援", items: ["健康診断", "慶弔支援", "休暇制度", "記念日ギフト"] },
      { title: "勤務支援", items: ["通勤支援", "食事支援", "作業服支給", "安全用品"] },
      { title: "成長支援", items: ["職務教育", "品質教育", "長期勤続褒賞", "資格能力支援"] },
    ],
    jobsEyebrow: "JOB OPENINGS",
    jobsTitle: "現在募集職務",
    jobsCopy: "生産、品質、生産管理領域でソウル産業の製造基準をともにつくる人材を探しています。",
    jobsCta: "お問い合わせ",
    jobs: [
      { field: "生産技術", title: "精密加工 生産技術担当", status: "常時採用", work: "工程条件管理、設備セットアップ、生産性改善", meta: "経験者/新入 協議" },
      { field: "品質管理", title: "自動車部品 品質管理担当", status: "受付中", work: "寸法検査、LOT管理、顧客品質対応", meta: "品質文書理解 優遇" },
      { field: "生産管理", title: "OEM量産 納期管理担当", status: "常時採用", work: "生産計画、出荷日程、協力会社コミュニケーション", meta: "製造業経験 優遇" },
    ],
    jobsGuideTitle: "応募案内",
    jobsGuideItems: ["採用公告確認", "履歴書と自己紹介書準備", "担当者検討後に個別連絡", "面接および入社日程協議"],
  },
};

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

function EnvironmentalContent({ language }: { language: LanguageCode }) {
  const copy = esgPageCopy[language] ?? esgPageCopy.ko;

  return (
    <>
      <section className="menu-esg-landing menu-reveal">
        <div className="menu-esg-landing__copy">
          <span className="menu-small-label">{copy.landingEyebrow}</span>
          <h3>
            {copy.landingTitle.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h3>
          <p>{copy.landingCopy}</p>
          <div className="menu-esg-landing__badges" aria-label={copy.badgeLabel}>
            {copy.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>
        <div className="menu-esg-landing__visual" aria-hidden="true">
          <img src={menuHeroImages.solar} alt="" />
          <div className="menu-esg-landing__letters">
            {copy.pillars.map((pillar) => (
              <b key={pillar.letter}>{pillar.letter}</b>
            ))}
          </div>
          <strong>{copy.visualLabel}</strong>
        </div>
      </section>

      <section className="menu-esg-pillars menu-reveal" aria-label={copy.badgeLabel}>
        {copy.pillars.map((pillar) => (
          <article className="menu-esg-pillar-card" key={pillar.letter}>
            <div>
              <img src={pillar.image} alt="" />
              <b>{pillar.letter}</b>
            </div>
            <span>{pillar.title}</span>
            <strong>{pillar.label}</strong>
            <p>{pillar.copy}</p>
            <ul>
              {pillar.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="menu-esg-system menu-reveal">
        <div className="menu-esg-system__head">
          <span className="menu-small-label">{copy.systemEyebrow}</span>
          <h3>{copy.systemTitle}</h3>
          <p>{copy.systemCopy}</p>
        </div>
        <div className="menu-esg-system__grid">
          {copy.managementCards.map((card) => (
            <article key={card.index}>
              <span>{card.index}</span>
              <small>{card.en}</small>
              <strong>{card.title}</strong>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-esg-flow menu-reveal" aria-label={copy.flowTitle}>
        <div>
          <span className="menu-small-label">{copy.flowEyebrow}</span>
          <h3>{copy.flowTitle}</h3>
        </div>
        <ol>
          {copy.flowSteps.map((step, index) => (
            <li key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{step.label}</b>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="menu-policy menu-reveal">
        <div>
          <span className="menu-small-label">{copy.practiceEyebrow}</span>
          <h3>{copy.practiceTitle}</h3>
          <p>{copy.practiceCopy}</p>
        </div>
        <div className="menu-policy__steps">
          {copy.environmentalSteps.map((step, index) => (
            <article key={step}>
              <span>STEP {String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-card-grid menu-reveal" aria-label={copy.systemTitle}>
        {copy.environmentalPrograms.map((program) => (
          <article className="menu-icon-card" key={program.title}>
            <Icon name="leaf" />
            <strong>{program.title}</strong>
            <p>{program.copy}</p>
            <span className="menu-card-note">{program.note}</span>
          </article>
        ))}
      </section>
      <section className="menu-data-table menu-reveal" aria-label={copy.metricsTitle}>
        <h3>{copy.metricsTitle}</h3>
        {copy.environmentalMetrics.map(([category, indicator, status, memo]) => (
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
    <>
      <section className="menu-esg-intro menu-reveal">
        <span className="menu-small-label">GOVERNANCE SYSTEM</span>
        <h3>인권·윤리 경영</h3>
        <p>
          서울산업은 윤리경영, 준법 거래, 품질 기록, 리스크 관리를 하나의 운영 기준으로 연결합니다.
          고객 도면과 공정 이력, 협력사 거래 기준, 현장 안전 기준을 투명하게 관리해 장기적인 OEM 파트너십을 만듭니다.
        </p>
      </section>

      <section className="menu-policy menu-reveal">
        <div>
          <span className="menu-small-label">ETHICAL MANAGEMENT</span>
          <h3>이해관계자 책임</h3>
          <p>
            모든 의사결정은 고객 품질, 협력사 신뢰, 임직원 안전, 법규 준수, 정보 보호를 기준으로 검토합니다.
            현장의 작은 기록까지 남기는 것이 투명한 운영의 시작입니다.
          </p>
        </div>
        <div className="menu-policy__steps">
          {governanceStakeholders.map((item) => (
            <article key={item.title}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-section-heading menu-reveal">
        <span className="menu-small-label">CODE OF ETHICS</span>
        <h3>윤리 강령</h3>
        <p>
          윤리강령은 임직원의 판단 기준을 문서화하고, 고객·협력사·현장 사이에서 발생할 수 있는 이해상충과 불공정 거래를 예방하기 위한 운영 기준입니다.
        </p>
      </section>

      <section className="menu-card-grid menu-reveal" aria-label="윤리 강령">
        {governanceCards.map((card) => (
          <article className="menu-icon-card" key={card.title}>
            <Icon name="shield" />
            <strong>{card.title}</strong>
            <p>{card.copy}</p>
          </article>
        ))}
      </section>

      <section className="menu-policy menu-reveal">
        <div>
          <span className="menu-small-label">RISK MANAGEMENT</span>
          <h3>준법경영체계와 리스크 관리</h3>
          <p>
            품질, 납기, 공정 변경, 안전, 거래 기준에서 발생할 수 있는 리스크를 선제적으로 확인하고
            조치 결과를 남겨 같은 문제가 반복되지 않도록 관리합니다.
          </p>
        </div>
        <div className="menu-policy__steps">
          {governanceRiskSteps.map((step, index) => (
            <article key={step.title}>
              <span>STEP {String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-data-table menu-reveal" aria-label="Governance 관리 지표">
        <h3>윤리·준법 관리 현황</h3>
        {governanceIndicators.map(([category, indicator, status, memo]) => (
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

function EsgReportContent() {
  return (
    <>
      <section className="menu-esg-intro menu-reveal">
        <span className="menu-small-label">ESG REPORT</span>
        <h3>지속가능경영 공개 항목</h3>
        <p>
          서울산업의 ESG 보고서는 제조 현장에서 실제로 관리되는 환경, 안전, 품질, 윤리, 준법 항목을 중심으로 구성합니다.
          보고서 형식은 다운로드형 자료와 연도별 개선 항목을 함께 보여주는 방식으로 확장할 수 있습니다.
        </p>
      </section>
      <div className="menu-report-list menu-reveal">
        {esgReports.map((report) => (
          <a href="#/sustainability/policy" key={report.year}>
            <span>{report.year}</span>
            <strong>{report.title}</strong>
            <p>{report.copy}</p>
            <Icon name="arrow" />
          </a>
        ))}
      </div>
      <section className="menu-data-table menu-reveal" aria-label="ESG 공개 항목">
        <h3>ESG 공개 항목</h3>
        {esgDisclosureRows.map(([category, indicator, status, memo]) => (
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
        <a className="is-active" href="#/products/electric-vehicle">
          전기차
        </a>
        <a href="#/products/electric-vehicle">내연기관차</a>
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
      <a className="menu-back-link menu-reveal" href="#/products/electric-vehicle">
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

function RecruitGuideContent({ language }: { language: LanguageCode }) {
  const copy = recruitPageCopy[language] ?? recruitPageCopy.ko;

  return (
    <>
      <section className="menu-recruit-visual menu-reveal">
        <div className="menu-recruit-visual__copy">
          <span className="menu-small-label">{copy.heroEyebrow}</span>
          <h3>
            {copy.heroTitle.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h3>
          <p>{copy.heroCopy}</p>
          <a href={copy.heroCtaHref}>
            {copy.heroCta}
            <Icon name="arrow" />
          </a>
        </div>
        <div className="menu-recruit-visual__image" aria-hidden="true">
          <img src={menuHeroImages.recruit} alt="" />
          <div>
            <span>{copy.heroStatLabel}</span>
            {copy.heroStats.map(([value, label]) => (
              <article key={value}>
                <strong>{value}</strong>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="menu-recruit-flow menu-reveal">
        <div>
          <span className="menu-small-label">{copy.processEyebrow}</span>
          <h3>{copy.processTitle}</h3>
          <p>{copy.processCopy}</p>
        </div>
        <div className="menu-recruit-steps">
          {copy.steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-recruit-values menu-reveal">
        <span className="menu-small-label">{copy.valuesEyebrow}</span>
        <h3>{copy.valuesTitle}</h3>
        <p className="menu-section-lead">{copy.valuesCopy}</p>
        <div>
          {copy.values.map((value) => (
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

      <section className="menu-recruit-people menu-reveal">
        <div className="menu-recruit-people__media" aria-hidden="true">
          <img src={menuHeroImages.precision} alt="" />
          <strong>SEOUL INDUSTRY</strong>
        </div>
        <div className="menu-recruit-people__copy">
          <span className="menu-small-label">{copy.peopleEyebrow}</span>
          <h3>{copy.peopleTitle}</h3>
          <p>{copy.peopleCopy}</p>
          <ul>
            {copy.peopleBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="menu-recruit-system menu-reveal">
        <span className="menu-small-label">{copy.systemEyebrow}</span>
        <h3>{copy.systemTitle}</h3>
        <div>
          {copy.systems.map((system, index) => (
            <article key={system.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{system.title}</strong>
              <p>{system.copy}</p>
              <b>{system.note}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="menu-benefit menu-reveal">
        <span className="menu-small-label">{copy.benefitEyebrow}</span>
        <h3>{copy.benefitTitle}</h3>
        <p className="menu-section-lead">{copy.benefitCopy}</p>
        <div>
          {copy.benefitGroups.map((group) => (
            <article key={group.title}>
              <strong>{group.title}</strong>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function JobsContent({ language }: { language: LanguageCode }) {
  const copy = recruitPageCopy[language] ?? recruitPageCopy.ko;

  return (
    <>
      <section className="menu-jobs-hero menu-reveal">
        <div>
          <span className="menu-small-label">{copy.jobsEyebrow}</span>
          <h3>{copy.jobsTitle}</h3>
          <p>{copy.jobsCopy}</p>
        </div>
        <a href="#/company/location">
          {copy.jobsCta}
          <Icon name="arrow" />
        </a>
      </section>

      <section className="menu-job-list menu-reveal">
        {copy.jobs.map((job) => (
          <article key={job.title}>
            <span>{job.field}</span>
            <strong>{job.title}</strong>
            <p>{job.work}</p>
            <small>{job.meta}</small>
            <b>{job.status}</b>
          </article>
        ))}
      </section>

      <section className="menu-jobs-guide menu-reveal">
        <h3>{copy.jobsGuideTitle}</h3>
        <ol>
          {copy.jobsGuideItems.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function PageBody({ route, language }: { route: string; language: LanguageCode }) {
  if (route.startsWith("company/greeting")) return <GreetingContent />;
  if (route.startsWith("company/history")) return <HistoryContent />;
  if (route.startsWith("company/certificates")) return <CertificatesContent />;
  if (route.startsWith("sustainability/environmental")) return <EnvironmentalContent language={language} />;
  if (route.startsWith("sustainability/governance")) return <GovernanceContent />;
  if (route.startsWith("sustainability/esg-report")) return <EsgReportContent />;
  if (route.startsWith("products/")) return <ProductsContent route={route} />;
  if (route.startsWith("support/news")) return <NewsContent />;
  if (route.startsWith("support/contact")) return <ContactContent />;
  if (route.startsWith("recruit/guide")) return <RecruitGuideContent language={language} />;
  if (route.startsWith("recruit/jobs")) return <JobsContent language={language} />;
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      root.classList.add("menu-page--reduced-motion");
      return;
    }

    root.classList.remove("menu-page--reduced-motion");

    const ctx = gsap.context(() => {
      gsap.set(".menu-hero", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".menu-hero__image", {
        scale: 1.15,
        yPercent: -3,
        filter: "saturate(0.58) contrast(1.08) brightness(0.52) blur(10px)",
      });
      gsap.set(".menu-hero__eyebrow, .menu-hero h1, .menu-hero p", {
        autoAlpha: 0,
        y: 34,
        filter: "blur(9px)",
      });
      gsap.set(".menu-location, .menu-category-nav, .menu-depth-nav", {
        autoAlpha: 0,
        y: -18,
        filter: "blur(7px)",
      });
      gsap.set(".menu-category-nav a, .menu-depth-nav a", {
        autoAlpha: 0,
        yPercent: 82,
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(".menu-hero", {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          ease: "expo.out",
        })
        .to(
          ".menu-hero__image",
          {
            scale: 1.055,
            yPercent: 0,
            filter: "saturate(0.84) contrast(1.06) brightness(0.78) blur(0px)",
            duration: 1.18,
            ease: "power3.out",
          },
          "<",
        )
        .to(
          ".menu-hero__eyebrow, .menu-hero h1, .menu-hero p",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.76,
            stagger: 0.08,
          },
          "<0.2",
        )
        .to(
          ".menu-location, .menu-category-nav, .menu-depth-nav",
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            stagger: 0.06,
          },
          "<0.38",
        )
        .to(
          ".menu-category-nav a, .menu-depth-nav a",
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.58,
            stagger: 0.025,
            ease: "power4.out",
          },
          "<0.12",
        );

      gsap.utils
        .toArray<HTMLElement>(".menu-photo-card img, .menu-cert-layout > img, .menu-product-card img, .menu-industrial__visual img, .menu-history-daedong__media img, .menu-esg-landing__visual img, .menu-esg-pillar-card img, .menu-recruit-visual__image img, .menu-recruit-people__media img")
        .forEach((image) => {
          const trigger =
            image.closest<HTMLElement>(".menu-photo-card, .menu-cert-layout, .menu-product-card, .menu-industrial__visual, .menu-history-daedong__media, .menu-esg-landing__visual, .menu-esg-pillar-card, .menu-recruit-visual__image, .menu-recruit-people__media") ?? image;

          gsap.fromTo(
            image,
            { yPercent: -4, scale: 1.12 },
            {
              yPercent: 4,
              scale: 1.04,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
    }, root);

    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, [cleanRoute, language]);

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
          <PageBody route={cleanRoute} language={language} />
        </section>
      </main>
      <MenuFooter language={language} />
    </div>
  );
}
