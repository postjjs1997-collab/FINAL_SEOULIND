import { defaultLanguage, type LanguageCode, type MediaItem } from "./brainall";

export type NoticeCategory = "notice" | "products" | "quality" | "manufacturing" | "resources";

export type NoticeTranslation = {
  title: string;
  summary: string;
  body: string;
};

export type NoticePost = {
  id: string;
  category: NoticeCategory;
  date: string;
  image?: string;
  pinned: boolean;
  translations: Record<LanguageCode, NoticeTranslation>;
};

export const noticeCategoryLabels: Record<LanguageCode, Record<NoticeCategory, string>> = {
  ko: {
    notice: "공지",
    products: "제품",
    quality: "품질",
    manufacturing: "제조",
    resources: "자료",
  },
  en: {
    notice: "Notice",
    products: "Products",
    quality: "Quality",
    manufacturing: "Manufacturing",
    resources: "Resources",
  },
  ja: {
    notice: "お知らせ",
    products: "製品",
    quality: "品質",
    manufacturing: "製造",
    resources: "資料",
  },
};

export const newsCategoryLabels: Record<LanguageCode, Record<NoticeCategory, string>> = {
  ko: {
    notice: "기업",
    products: "제품",
    quality: "품질",
    manufacturing: "제조",
    resources: "자료",
  },
  en: {
    notice: "Enterprise",
    products: "Product",
    quality: "Quality",
    manufacturing: "Manufacturing",
    resources: "Resource",
  },
  ja: {
    notice: "企業",
    products: "製品",
    quality: "品質",
    manufacturing: "製造",
    resources: "資料",
  },
};

export const noticeCategoryKickers: Record<NoticeCategory, string> = {
  notice: "ENTERPRISE",
  products: "PRODUCT",
  quality: "QUALITY",
  manufacturing: "MANUFACTURING",
  resources: "RESOURCES",
};

const unsplash = (id: string, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const newsImages = {
  factory: unsplash("photo-1581092160607-ee22621dd758"),
  research: unsplash("photo-1581092580497-e0d23cbdf1dc"),
  conference: unsplash("photo-1515187029135-18ee286d815b"),
};

export const defaultNoticePosts: NoticePost[] = [
  {
    id: "renewal-2026",
    category: "notice",
    date: "2026-05-28",
    pinned: true,
    translations: {
      ko: {
        title: "서울산업 신규 홈페이지 개편 준비 중입니다",
        summary: "서울산업의 제조 역량과 글로벌 OEM 대응 체계를 더 명확하게 전달하기 위한 홈페이지 개편을 준비하고 있습니다.",
        body: "서울산업은 자동차 부품 정밀가공 기반의 OEM 제조 파트너로서 제품군, 공정, 품질 대응, 글로벌 협력 정보를 한 화면에서 확인할 수 있도록 신규 홈페이지를 준비하고 있습니다. 개편 이후에는 제품군별 자료와 주요 소식을 더 빠르게 안내할 예정입니다.",
      },
      en: {
        title: "Seoul Industry is preparing a renewed global website",
        summary: "The renewed site will present our manufacturing capability and global OEM response more clearly.",
        body: "Seoul Industry is preparing a renewed website for customers to review our precision automotive component manufacturing, product groups, process capability, quality response, and global OEM partnerships in one place.",
      },
      ja: {
        title: "ソウル産業の新しいホームページを準備しています",
        summary: "製造力とグローバルOEM対応体制をより分かりやすく伝えるため、サイトを改編しています。",
        body: "ソウル産業は自動車部品の精密加工を基盤とするOEM製造パートナーとして、製品群、工程、品質対応、グローバル協力情報を分かりやすく確認できる新しいホームページを準備しています。",
      },
    },
  },
  {
    id: "product-lineup-2026",
    category: "products",
    date: "2026-05-21",
    pinned: false,
    translations: {
      ko: {
        title: "BSM, EV, Steering 제품군 정밀가공 라인업 소개",
        summary: "Balance Shaft Module, 전기차 부품, 조향 부품 등 서울산업의 주요 제품군을 소개합니다.",
        body: "서울산업은 BSM, EV, Steering, Powertrain, Driveline 등 자동차 주요 시스템에 필요한 정밀 가공 부품을 OEM 방식으로 생산합니다. 제품별 도면 조건과 양산 기준을 검토해 안정적인 공급 흐름을 만듭니다.",
      },
      en: {
        title: "Precision-machined BSM, EV, and steering parts lineup",
        summary: "A short overview of Seoul Industry's core automotive component groups.",
        body: "Seoul Industry manufactures precision components for BSM, EV platforms, steering, powertrain, and driveline systems. We review drawing conditions and production standards for stable OEM supply.",
      },
      ja: {
        title: "BSM、EV、ステアリング製品群の精密加工ラインアップ",
        summary: "ソウル産業の主要な自動車部品ラインアップをご紹介します。",
        body: "ソウル産業はBSM、EV、ステアリング、パワートレイン、ドライブラインなど、自動車の主要システムに必要な精密加工部品をOEM方式で生産しています。",
      },
    },
  },
  {
    id: "quality-process-2026",
    category: "quality",
    date: "2026-05-15",
    pinned: false,
    translations: {
      ko: {
        title: "도면 기반 OEM 개발 대응과 품질 검사 프로세스",
        summary: "도면 검토부터 샘플 제작, 치수 검사, 양산 전환까지 이어지는 품질 흐름을 안내합니다.",
        body: "고객 도면을 기준으로 개발 조건을 검토하고, 샘플 제작과 치수 확인, LOT 관리, 양산 품질 기준까지 연결해 반복 정밀도와 납품 신뢰도를 높입니다.",
      },
      en: {
        title: "Drawing-based OEM development and inspection process",
        summary: "From drawing review to sample production, inspection, and mass production.",
        body: "We review customer drawings, verify samples and dimensions, manage LOT-level quality, and connect inspection data to mass-production standards for dependable delivery.",
      },
      ja: {
        title: "図面ベースのOEM開発対応と品質検査プロセス",
        summary: "図面検討から試作、寸法検査、量産移行までの品質フローをご案内します。",
        body: "お客様の図面を基準に開発条件を確認し、試作、寸法確認、LOT管理、量産品質基準まで連携して納品信頼性を高めます。",
      },
    },
  },
  {
    id: "repeat-accuracy-2026",
    category: "manufacturing",
    date: "2026-05-09",
    pinned: false,
    translations: {
      ko: {
        title: "자동차 부품 양산 공정에서 중요한 반복 정밀도 관리",
        summary: "반복 생산 조건에서 치수 편차와 표면 품질을 안정적으로 관리하는 제조 기준을 설명합니다.",
        body: "자동차 부품 OEM 공급에서는 반복 정밀도, 표면 품질, 납기 안정성이 함께 관리되어야 합니다. 서울산업은 공정 조건을 기록하고 검사 흐름과 연결해 양산 품질을 안정화합니다.",
      },
      en: {
        title: "Managing repeat accuracy in automotive component production",
        summary: "Manufacturing standards for dimensional consistency and surface quality.",
        body: "Automotive OEM supply requires repeat accuracy, surface quality, and delivery stability. Seoul Industry records process conditions and connects them with inspection flow to stabilize mass production.",
      },
      ja: {
        title: "自動車部品の量産工程における反復精度管理",
        summary: "寸法ばらつきと表面品質を安定して管理する製造基準について説明します。",
        body: "自動車部品のOEM供給では、反復精度、表面品質、納期安定性を同時に管理する必要があります。ソウル産業は工程条件を記録し、検査フローと連携して量産品質を安定させます。",
      },
    },
  },
  {
    id: "driveline-guide-2026",
    category: "resources",
    date: "2026-04-30",
    pinned: false,
    translations: {
      ko: {
        title: "Driveline 부품과 동력 전달계 가공 안내",
        summary: "동력 전달 부품의 가공 안정성과 조립 품질을 위한 기본 검토 항목을 정리했습니다.",
        body: "Driveline 계열 부품은 동력 전달 흐름, 조립 조건, 표면 품질, 반복 정밀도를 함께 검토해야 합니다. 서울산업은 도면 기반의 맞춤 가공과 양산 대응을 통해 안정적인 부품 공급을 지원합니다.",
      },
      en: {
        title: "Driveline components and power-delivery machining guide",
        summary: "Key review points for machining stability and assembly quality.",
        body: "Driveline components require coordinated review of power delivery, assembly conditions, surface quality, and repeat accuracy. Seoul Industry supports drawing-based machining and mass-production response.",
      },
      ja: {
        title: "ドライブライン部品と動力伝達系加工ガイド",
        summary: "加工安定性と組立品質のための基本確認項目をまとめました。",
        body: "ドライブライン部品では、動力伝達、組立条件、表面品質、反復精度を総合的に確認する必要があります。ソウル産業は図面ベースの加工と量産対応を支援します。",
      },
    },
  },
];

export const curatedNoticePosts: NoticePost[] = [
  {
    id: "precision-system-2026",
    category: "notice",
    date: "2026-05-29",
    image: newsImages.factory,
    pinned: true,
    translations: {
      ko: {
        title: "서울산업, 정밀가공 생산 체계 고도화",
        summary: "개발 대응부터 양산 품질까지 한 흐름으로 관리하는 제조 기준을 강화했습니다.",
        body: "서울산업은 자동차 부품 OEM 생산에서 요구되는 도면 검토, 공정 조건, 품질 기록, 납기 대응을 더 명확하게 연결하고 있습니다.\n\n이번 개편은 고객이 제품군과 제조 역량, 품질 대응 흐름을 한눈에 확인할 수 있도록 정리한 것이며, 반복 생산에서 중요한 공정 안정성과 기록 관리 기준을 함께 강화합니다.",
      },
      en: {
        title: "Seoul Industry advances its precision manufacturing system",
        summary: "We strengthened a connected operating flow from development response to mass-production quality.",
        body: "Seoul Industry is connecting drawing review, process conditions, quality records, and delivery response more clearly for automotive OEM production.\n\nThe update helps customers review product groups, manufacturing capability, and quality response in one flow while reinforcing process stability and record management standards.",
      },
      ja: {
        title: "ソウル産業、精密加工の生産体制を高度化",
        summary: "開発対応から量産品質まで一つの流れで管理する製造基準を強化しました。",
        body: "ソウル産業は、自動車部品OEM生産に必要な図面検討、工程条件、品質記録、納期対応をより明確につなげています。\n\n今回の更新により、製品群と製造力、品質対応の流れを確認しやすくし、反復生産に必要な工程安定性と記録管理基準を強化します。",
      },
    },
  },
  {
    id: "lineup-expansion-2026",
    category: "products",
    date: "2026-05-24",
    pinned: false,
    translations: {
      ko: {
        title: "BSM·EV 핵심 부품 라인업 확대",
        summary: "정밀가공 기반의 BSM, EV, Steering, Powertrain 부품 대응 범위를 넓혔습니다.",
        body: "서울산업은 Balance Shaft Module, EV 플랫폼, Steering, Powertrain, Driveline 계열의 정밀가공 부품을 OEM 요구 조건에 맞춰 생산합니다.\n\n제품별 도면 조건과 생산 기준을 검토해 안정적인 반복 생산과 납기 대응이 가능하도록 관리합니다.",
      },
      en: {
        title: "Expanded BSM and EV core component lineup",
        summary: "Our response scope now covers more BSM, EV, steering, and powertrain precision parts.",
        body: "Seoul Industry manufactures precision parts for BSM, EV platforms, steering, powertrain, and driveline systems under OEM requirements.\n\nWe review drawing conditions and production standards by product group to support stable repeat production and delivery.",
      },
      ja: {
        title: "BSM・EV主要部品ラインアップを拡大",
        summary: "精密加工を基盤にBSM、EV、Steering、Powertrain部品の対応範囲を広げました。",
        body: "ソウル産業は、BSM、EVプラットフォーム、Steering、Powertrain、Driveline系の精密加工部品をOEM要求条件に合わせて生産します。\n\n製品別の図面条件と生産基準を確認し、安定した反復生産と納期対応を管理します。",
      },
    },
  },
  {
    id: "quality-flow-2026",
    category: "quality",
    date: "2026-05-18",
    image: newsImages.research,
    pinned: false,
    translations: {
      ko: {
        title: "검사 데이터 기반 품질 흐름 강화",
        summary: "치수, 형상, 조립 품질을 LOT별로 확인하고 공정 조건과 연결합니다.",
        body: "서울산업은 검사 결과를 단순 확인에 그치지 않고 공정 조건과 연결해 양산 품질의 변동을 줄입니다.\n\n고객 납품 기준에 맞춘 치수 검사, 형상 확인, 조립 품질 검토를 통해 출하 전 품질 안정성을 높입니다.",
      },
      en: {
        title: "Quality flow strengthened with inspection data",
        summary: "Dimensional, geometric, and assembly quality are checked by lot and linked to process conditions.",
        body: "Seoul Industry connects inspection results with process conditions rather than treating them as isolated checks.\n\nDimensional inspection, geometry review, and assembly-quality checks help stabilize outgoing quality before shipment.",
      },
      ja: {
        title: "検査データ基盤の品質フローを強化",
        summary: "寸法、形状、組立品質をLOT別に確認し、工程条件と連携します。",
        body: "ソウル産業は検査結果を単なる確認にとどめず、工程条件と連携して量産品質のばらつきを抑えます。\n\n顧客納入基準に合わせた寸法検査、形状確認、組立品質の検討により、出荷前の品質安定性を高めます。",
      },
    },
  },
  {
    id: "repeat-accuracy-2026",
    category: "manufacturing",
    date: "2026-05-10",
    image: newsImages.conference,
    pinned: false,
    translations: {
      ko: {
        title: "반복 정밀도를 위한 가공 조건 표준화",
        summary: "자동차 부품 양산에서 중요한 반복 정밀도와 표면 품질 기준을 관리합니다.",
        body: "자동차 부품 OEM 공급에서는 반복 정밀도, 표면 품질, 납기 안정성이 함께 관리되어야 합니다.\n\n서울산업은 공정 조건을 기록하고 검사 흐름과 연결해 양산 품질을 안정화합니다.",
      },
      en: {
        title: "Standardized machining conditions for repeat accuracy",
        summary: "We manage repeat accuracy and surface-quality standards for automotive mass production.",
        body: "Automotive OEM supply requires repeat accuracy, surface quality, and delivery stability to be controlled together.\n\nSeoul Industry records process conditions and connects them with inspection flow to stabilize mass-production quality.",
      },
      ja: {
        title: "反復精度のための加工条件を標準化",
        summary: "自動車部品の量産で重要な反復精度と表面品質基準を管理します。",
        body: "自動車部品OEM供給では、反復精度、表面品質、納期安定性を合わせて管理する必要があります。\n\nソウル産業は工程条件を記録し、検査フローと連携して量産品質を安定化します。",
      },
    },
  },
  {
    id: "global-oem-update-2026",
    category: "resources",
    date: "2026-04-30",
    pinned: false,
    translations: {
      ko: {
        title: "글로벌 OEM 대응 자료 업데이트",
        summary: "고객사와 협력사가 확인할 수 있는 제품군, 공정, 품질 정보를 정리했습니다.",
        body: "서울산업은 글로벌 OEM 고객과 협력사가 필요한 정보를 빠르게 확인할 수 있도록 제품군, 공정 흐름, 품질 대응 자료를 정리했습니다.\n\n개발 대응부터 양산 공급까지 이어지는 제조 파트너십의 기준을 더 명확하게 제공합니다.",
      },
      en: {
        title: "Global OEM response materials updated",
        summary: "Product, process, and quality information has been organized for customers and partners.",
        body: "Seoul Industry organized product group, process flow, and quality response materials so global OEM customers and partners can review key information quickly.\n\nThe update clarifies our manufacturing partnership from development response to mass-production supply.",
      },
      ja: {
        title: "グローバルOEM対応資料を更新",
        summary: "顧客と協力会社が確認できる製品群、工程、品質情報を整理しました。",
        body: "ソウル産業は、グローバルOEM顧客と協力会社が必要な情報をすばやく確認できるよう、製品群、工程フロー、品質対応資料を整理しました。\n\n開発対応から量産供給までつながる製造パートナーシップの基準をより明確に提供します。",
      },
    },
  },
];

const storageKey = "seoulind-notice-posts";

function isNoticePost(value: unknown): value is NoticePost {
  if (!value || typeof value !== "object") return false;
  const post = value as NoticePost;
  return typeof post.id === "string" && typeof post.date === "string" && typeof post.category === "string" && !!post.translations;
}

export function getNoticePosts() {
  if (typeof window === "undefined") return curatedNoticePosts;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return curatedNoticePosts;
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed) || !parsed.every(isNoticePost)) return curatedNoticePosts;
    const hasLegacyDefaultData = parsed.some((post) => post.id === "renewal-2026" && !post.image);
    const hasLegacyNewsImages = parsed.some(
      (post) =>
        ["precision-system-2026", "lineup-expansion-2026", "quality-flow-2026", "repeat-accuracy-2026", "global-oem-update-2026"].includes(post.id) &&
        post.image &&
        !post.image.includes("images.unsplash.com"),
    );
    if (hasLegacyDefaultData) return curatedNoticePosts;
    if (hasLegacyNewsImages) return curatedNoticePosts;
    return parsed.map((post) => ({ ...post, image: post.image?.trim() || undefined }));
  } catch {
    return curatedNoticePosts;
  }
}

export function saveNoticePosts(posts: NoticePost[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(posts));
  window.dispatchEvent(new Event("seoulind-notices-updated"));
}

export function resetNoticePosts() {
  saveNoticePosts(curatedNoticePosts);
}

export function sortNoticePosts(posts: NoticePost[]) {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.date.localeCompare(a.date);
  });
}

export function noticePostsToMediaItems(posts: NoticePost[], language: LanguageCode): Array<MediaItem & { id: string }> {
  return sortNoticePosts(posts).map((post) => {
    const translation = post.translations[language] ?? post.translations[defaultLanguage];
    return {
      id: post.id,
      type: newsCategoryLabels[language][post.category],
      kicker: noticeCategoryKickers[post.category],
      title: translation.title,
      summary: translation.summary,
      date: post.date,
      image: noticePostImage(post),
    };
  });
}

export function noticePostImage(post: NoticePost) {
  return post.image?.trim() || undefined;
}

export function makeNoticeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `notice-${Date.now()}`;
}
