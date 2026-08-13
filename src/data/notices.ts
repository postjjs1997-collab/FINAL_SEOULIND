import { defaultLanguage, type LanguageCode, type MediaItem } from "./brainall";
import { upload } from "@vercel/blob/client";
import newsFactoryImage from "../../assets/manufacturing/hero/production-process-cnc.jpg";
import newsInspectionImage from "../../assets/process-videos/inspection-00-04.jpg";
import newsCorporateImage from "../../assets/company-profile/seoul-industry-facade-sign.webp";

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

const newsImages = {
  factory: newsFactoryImage,
  research: newsInspectionImage,
  conference: newsCorporateImage,
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
        summary: "The renewed site will present our manufacturing capabilities and global OEM support more clearly.",
        body: "Seoul Industry is preparing a renewed website where customers can review our precision automotive component manufacturing, product groups, process capabilities, quality systems, and global OEM partnerships in one place.",
      },
      ja: {
        title: "ソウル産業の新しいホームページを準備しています",
        summary: "製造力とグローバルOEM対応体制をより分かりやすくお伝えするため、サイトを改編しています。",
        body: "ソウル産業は、自動車部品の精密加工を基盤とするOEM製造パートナーとして、製品群、工程、品質対応、グローバル協力情報を分かりやすく確認できる新しいホームページを準備しています。",
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
        title: "자동차 정밀가공 제품 체계 소개",
        summary: "Steering·Powertrain·Driveline과 전동화·알루미늄 가공 역량을 함께 소개합니다.",
        body: "서울산업은 Steering, Powertrain, Driveline의 3대 핵심 제품군을 중심으로 정밀가공 부품을 생산합니다. 전동화 플랫폼용 샤프트는 설계 검토와 시제품 검증에 대응하며, EV Oil Pump와 BSM용 알루미늄 하우징·오일 펌프까지 가공 범위를 확장합니다.",
      },
      en: {
        title: "Automotive precision-component portfolio",
        summary: "Steering, Powertrain, and Driveline are presented with electrified and machined-aluminum capabilities.",
        body: "Seoul Industry produces precision components across three core families: Steering, Powertrain, and Driveline. Electrified-platform shafts support design review and prototype validation, while the machined-aluminum range includes EV oil-pump and BSM housings and oil pumps.",
      },
      ja: {
        title: "自動車精密加工製品ポートフォリオ",
        summary: "Steering・Powertrain・Drivelineに電動化・アルミ加工の対応力を加えてご紹介します。",
        body: "ソウル産業はSteering、Powertrain、Drivelineの3大中核製品群を中心に精密加工部品を生産します。電動化プラットフォーム向けシャフトは設計検討・試作検証に対応し、EV Oil PumpおよびBSM向けアルミハウジング・オイルポンプまで加工範囲を広げています。",
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
        summary: "From drawing review to sample production, inspection, and mass-production transfer.",
        body: "Customer drawings are reviewed against development requirements, sample verification, dimensional inspection, LOT-level quality control, and mass-production standards to support dependable delivery.",
      },
      ja: {
        title: "図面ベースのOEM開発対応と品質検査プロセス",
        summary: "図面検討から試作、寸法検査、量産移行までの品質フローをご案内します。",
        body: "お客様の図面を基準に開発条件を確認し、試作、寸法確認、LOT管理、量産品質基準まで連携させることで、納品信頼性を高めます。",
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
        body: "Automotive OEM supply requires repeat accuracy, surface quality, and delivery stability to be controlled together. Seoul Industry records process conditions and links them with inspection flow to stabilize mass-production quality.",
      },
      ja: {
        title: "自動車部品の量産工程における反復精度管理",
        summary: "寸法ばらつきと表面品質を安定して管理する製造基準について説明します。",
        body: "自動車部品のOEM供給では、反復精度、表面品質、納期安定性を一体で管理する必要があります。ソウル産業は工程条件を記録し、検査フローと連携して量産品質を安定させます。",
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
        body: "Driveline components require coordinated review of power delivery, assembly conditions, surface quality, and repeat accuracy. Seoul Industry supports drawing-based machining and mass-production programs.",
      },
      ja: {
        title: "ドライブライン部品と動力伝達系加工ガイド",
        summary: "加工安定性と組立品質のための基本確認項目をまとめました。",
        body: "ドライブライン部品では、動力伝達、組立条件、表面品質、反復精度を総合的に確認する必要があります。ソウル産業は図面ベースの加工と量産プログラムを支援します。",
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
        summary: "We strengthened the operating flow from development support to mass-production quality.",
        body: "Seoul Industry is tying drawing review, process conditions, quality records, and delivery together more tightly for automotive OEM production.\n\nThe update makes it easier for customers to see our product groups, manufacturing capabilities, and quality systems at a glance, while we reinforce process stability and record-keeping.",
      },
      ja: {
        title: "ソウル産業、精密加工の生産体制を高度化",
        summary: "開発対応から量産品質まで一つの流れで管理する製造基準を強化しました。",
        body: "ソウル産業は、自動車部品OEM生産に必要な図面検討、工程条件、品質記録、納期対応をより明確につなげています。\n\n今回の更新により、製品群、製造力、品質対応の流れを確認しやすくし、反復生産に必要な工程安定性と記録管理基準を強化します。",
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
        title: "전동화·알루미늄 가공 대응 범위 확대",
        summary: "기존 3대 제품군에 전동화 개발 부품과 Machined Aluminum Components 역량을 확장했습니다.",
        body: "Steering, Powertrain, Driveline의 양산 역량을 기반으로 HEV·PHEV·BEV용 샤프트의 설계 검토와 시제품 검증에 대응합니다.\n\nEV Oil Pump Housing·Cover와 BSM Housing·Oil Pump의 알루미늄 정밀가공도 함께 제공합니다.",
      },
      en: {
        title: "Expanded electrified and machined-aluminum capabilities",
        summary: "Electrified development parts and machined aluminum extend the three core product families.",
        body: "Steering, Powertrain, and Driveline production capabilities support design review and prototype validation for HEV, PHEV, and BEV shafts.\n\nThe machined-aluminum range also covers EV oil-pump housings and covers plus BSM housings and oil pumps.",
      },
      ja: {
        title: "電動化・アルミ加工の対応範囲を拡大",
        summary: "3大中核製品群に電動化開発部品とMachined Aluminum Componentsの対応力を加えました。",
        body: "Steering、Powertrain、Drivelineの量産力を基盤に、HEV・PHEV・BEV向けシャフトの設計検討・試作検証に対応します。\n\nEV Oil Pump Housing・CoverとBSM Housing・Oil Pumpのアルミ精密加工も提供します。",
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
        body: "ソウル産業は検査結果を単なる確認にとどめず、工程条件と連携させることで量産品質のばらつきを抑えます。\n\n顧客納入基準に合わせた寸法検査、形状確認、組立品質の確認により、出荷前の品質安定性を高めます。",
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
        title: "Updated reference materials for global OEM partners",
        summary: "Product, process, and quality information has been organized for customers and partners.",
        body: "Seoul Industry organized product group, process flow, and quality materials so global OEM customers and partners can review key information quickly.\n\nThe update clarifies our manufacturing partnership from development support to mass-production supply.",
      },
      ja: {
        title: "グローバルOEM対応資料を更新",
        summary: "顧客と協力会社が確認できる製品群、工程、品質情報を整理しました。",
        body: "ソウル産業は、グローバルOEM顧客と協力会社が必要な情報をすばやく確認できるよう、製品群、工程フロー、品質資料を整理しました。\n\n開発対応から量産供給までつながる製造パートナーシップの基準をより明確に提供します。",
      },
    },
  },
];

function isNoticePost(value: unknown): value is NoticePost {
  if (!value || typeof value !== "object") return false;
  const post = value as NoticePost;
  return typeof post.id === "string" && typeof post.date === "string" && typeof post.category === "string" && !!post.translations;
}

export function getNoticePosts() {
  return curatedNoticePosts;
}

function announceNoticeUpdate(posts: NoticePost[]) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("seoulind-notices-updated", { detail: posts }));
  try {
    const channel = new BroadcastChannel("seoulind-notices");
    channel.postMessage("updated");
    channel.close();
  } catch {
    // BroadcastChannel is optional; same-page updates still work through the custom event.
  }
}

export async function fetchNoticePosts() {
  const response = await fetch("/api/notices", { cache: "no-store" });
  if (!response.ok) throw new Error("공지사항을 불러오지 못했습니다.");
  const data = (await response.json()) as { posts?: unknown };
  if (!Array.isArray(data.posts) || !data.posts.every(isNoticePost)) return sortNoticePosts(curatedNoticePosts);
  return sortNoticePosts(data.posts.map((post) => ({ ...post, image: post.image?.trim() || undefined })));
}

export async function saveNoticePosts(posts: NoticePost[]) {
  const response = await fetch("/api/notices", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posts }),
  });
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "공지사항을 저장하지 못했습니다.");
  }
  const data = (await response.json()) as { posts: NoticePost[] };
  const saved = sortNoticePosts(data.posts);
  announceNoticeUpdate(saved);
  return saved;
}

export async function resetNoticePosts() {
  return saveNoticePosts(curatedNoticePosts);
}

export async function checkNoticeAdminSession() {
  const response = await fetch("/api/admin/session", { cache: "no-store" });
  if (!response.ok) return false;
  const data = (await response.json()) as { authenticated?: boolean };
  return data.authenticated === true;
}

export async function loginNoticeAdmin(id: string, password: string) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  return response.ok;
}

export async function logoutNoticeAdmin() {
  await fetch("/api/admin/logout", { method: "POST" });
}

export async function uploadNoticeImage(file: File, onProgress?: (percentage: number) => void) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const result = await upload(`notices/images/${Date.now()}-${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/admin/upload",
    multipart: file.size > 4 * 1024 * 1024,
    onUploadProgress: ({ percentage }) => onProgress?.(percentage),
  });
  return result.url;
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
