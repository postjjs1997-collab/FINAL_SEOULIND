import { defaultLanguage, type LanguageCode, type MediaItem } from "./brainall";
import { upload } from "@vercel/blob/client";
import companyFactoryImage from "../../assets/company-profile/factory.webp";
import automationGantryImage from "../../assets/company-deck/automation-gantry-line.webp";
import automaticInspectionImage from "../../assets/company-deck/automatic-inspection-cell.jpg";

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
  published: boolean;
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
    notice: "Corporate",
    products: "Products",
    quality: "Quality",
    manufacturing: "Manufacturing",
    resources: "Resources",
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

const noticeFallbackImages: Record<NoticeCategory, string> = {
  notice: companyFactoryImage,
  products: automationGantryImage,
  quality: automaticInspectionImage,
  manufacturing: automationGantryImage,
  resources: companyFactoryImage,
};

export const curatedNoticePosts: NoticePost[] = [
  {
    id: "integrated-manufacturing-2026",
    category: "notice",
    date: "2026-08-14",
    image: companyFactoryImage,
    pinned: true,
    published: true,
    translations: {
      ko: {
        title: "도면 검토부터 양산 공급까지, 서울산업의 통합 정밀가공 체계",
        summary: "경기도 화성 생산 거점을 중심으로 개발 타당성 검토, 공정 설계, 정밀가공, 검사, 양산 공급을 하나의 흐름으로 연결합니다.",
        body: "서울산업은 1985년 설립 이후 샤프트, 허브, 디스크 캐리어와 알루미늄 주조 가공 부품을 중심으로 자동차용 정밀 부품을 생산해 왔습니다.\n\n고객 도면과 제품 요구 사항을 바탕으로 가공 순서, 가공 기준면, 지그·고정구와 클램핑 방식, 가공 조건을 설계하고 생산 검증과 검사까지 연결합니다. 단조와 열처리 등 외부 공정도 동일한 생산 계획과 관리 기준 안에서 조율합니다.",
      },
      en: {
        title: "From drawing review to volume supply: Seoul Industry’s integrated precision-machining system",
        summary: "From our manufacturing base in Hwaseong, Korea, we connect feasibility review, process design, precision machining, inspection, and volume supply in one continuous flow.",
        body: "Since 1985, Seoul Industry has produced precision automotive components including shafts, hubs, disk carriers, and machined aluminum castings.\n\nBased on customer drawings and product requirements, we define process sequences, machining datums, fixtures, clamping methods, and operating parameters, then connect production validation with inspection. External processes such as forging and heat treatment are coordinated under the same manufacturing plan and control standards.",
      },
      ja: {
        title: "図面検討から量産供給まで、ソウル産業の一貫精密加工体制",
        summary: "京畿道華城市の生産拠点を中心に、実現可能性の検討、工程設計、精密加工、検査、量産供給を一つの流れでつなぎます。",
        body: "ソウル産業は1985年の創業以来、シャフト、ハブ、ディスクキャリア、アルミダイカスト加工部品を中心に、自動車用精密部品を生産してきました。\n\nお客様の図面と製品要件をもとに、加工順序、加工基準面、治具・クランプ方法、加工条件を設計し、生産検証から検査まで一貫して対応します。鍛造・熱処理などの外部工程も同じ生産計画と管理基準のもとで調整します。",
      },
    },
  },
  {
    id: "automation-production-line-2026",
    category: "manufacturing",
    date: "2026-08-11",
    image: automationGantryImage,
    pinned: false,
    published: true,
    translations: {
      ko: {
        title: "갠트리·로봇 자동화를 적용한 정밀가공 양산 라인",
        summary: "로딩과 언로딩, 공정 간 이송, 셀 검사를 전용 생산 라인에 연결해 생산성과 공정 안정성을 함께 관리합니다.",
        body: "서울산업은 CNC 선반과 머시닝 센터, 기어·스플라인 가공, 연삭과 표면 마무리 공정을 제품 요구 사항에 맞춰 구성합니다.\n\n전용 라인에서는 갠트리와 로봇 핸들링이 로딩·언로딩 및 공정 간 이송을 담당합니다. 공정 내 검사 데이터를 선행 공정에 피드백하고 보정에 활용해 반복 정밀도와 공정 안정성을 관리합니다.",
      },
      en: {
        title: "Precision production lines with gantry and robotic automation",
        summary: "Dedicated production lines connect loading, unloading, inter-process transfer, and cell inspection to support both productivity and process stability.",
        body: "Seoul Industry configures CNC lathes and machining centers, gear and spline machining, grinding, and surface-finishing processes according to each product's requirements.\n\nWithin dedicated lines, gantry and robotic handling systems perform loading, unloading, and inter-process transfer. In-process inspection data is fed back to preceding operations and used for compensation to maintain repeatability and process stability.",
      },
      ja: {
        title: "ガントリー・ロボット自動化を導入した精密加工量産ライン",
        summary: "ローディング、アンローディング、工程間搬送、セル検査を専用ラインでつなぎ、生産性と工程安定性を管理します。",
        body: "ソウル産業は、CNC旋盤・マシニングセンタ、ギヤ・スプライン加工、研削・表面仕上げなどの工程を製品要件に合わせて構成します。\n\n専用ラインでは、ガントリーおよびロボットハンドリングがローディング、アンローディング、工程間搬送を担います。工程内検査データを前工程へフィードバックし、補正に活用することで、繰り返し精度と工程安定性を確保します。",
      },
    },
  },
  {
    id: "inspection-traceability-2026",
    category: "quality",
    date: "2026-08-07",
    image: automaticInspectionImage,
    pinned: false,
    published: true,
    translations: {
      ko: {
        title: "자동검사 데이터로 완성하는 출하 품질과 추적성",
        summary: "공정 내 셀 검사와 최종 검사를 연결해 치수·형상·공정 누락을 확인하고, 측정 기록과 LOT 추적성을 관리합니다.",
        body: "공정 내 셀 검사에서는 에어 게이지 등을 활용해 측정 데이터를 수집하고 선행 공정에 피드백합니다. 필요한 경우 자동 보정과 SPC 관리에도 활용합니다.\n\n최종 검사에서는 GD&T 측정, 균열과 공정 누락 확인, 데이터 기록, LOT 마킹을 통해 출하 전 품질을 확인합니다. CMM, 기어 측정, 경도·금속 조직 검사도 중요 특성 검증에 활용합니다.",
      },
      en: {
        title: "Using automated inspection data to ensure outgoing quality and traceability",
        summary: "In-process cell inspection and final inspection work together to verify dimensions, geometry, and missed operations while maintaining measurement records and lot traceability.",
        body: "During in-process cell inspection, measurement data is collected using air gauges and related systems, then fed back to preceding operations. Where required, the data supports automatic compensation and SPC control.\n\nFinal inspection verifies outgoing quality through GD&T measurement, detection of cracks and omitted process steps, data recording, and lot marking. CMM, gear measurement, hardness testing, and metallurgical examination also support validation of critical characteristics.",
      },
      ja: {
        title: "自動検査データで確保する出荷品質とトレーサビリティ",
        summary: "工程内セル検査と最終検査を連携し、寸法・幾何特性・工程抜けを確認するとともに、測定記録とロットトレーサビリティを管理します。",
        body: "工程内セル検査では、エアゲージなどで測定データを収集し、前工程へフィードバックします。必要に応じて自動補正およびSPC管理に活用します。\n\n最終検査では、GD&T測定、亀裂・工程抜けの検出、データ記録、ロットマーキングにより出荷前品質を確認します。CMM、ギヤ測定、硬度・金属組織検査も重要特性の検証に活用します。",
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

function normalizeNoticePost(post: NoticePost): NoticePost {
  return {
    ...post,
    image: post.image?.trim() || undefined,
    published: post.published !== false,
  };
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

export async function fetchNoticePosts(options: { includeUnpublished?: boolean } = {}) {
  const query = options.includeUnpublished ? "?includeUnpublished=1" : "";
  const response = await fetch(`/api/notices${query}`, { cache: "no-store" });
  if (!response.ok) throw new Error("공지사항을 불러오지 못했습니다.");
  const data = (await response.json()) as { posts?: unknown };
  if (!Array.isArray(data.posts) || !data.posts.every(isNoticePost)) return sortNoticePosts(curatedNoticePosts);
  return sortNoticePosts(data.posts.map(normalizeNoticePost));
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
  return post.image?.trim() || noticeFallbackImages[post.category];
}

export function noticePostFallbackImage(post: NoticePost) {
  return noticeFallbackImages[post.category];
}

export function makeNoticeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `notice-${Date.now()}`;
}
