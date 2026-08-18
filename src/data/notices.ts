import { defaultLanguage, type LanguageCode, type MediaItem } from "./brainall";
import { upload } from "@vercel/blob/client";
import companyFactoryImage from "../../assets/company-profile/factory.webp";
import automationGantryImage from "../../assets/company-deck/automation-gantry-line.webp";
import automaticInspectionImage from "../../assets/company-deck/automatic-inspection-cell.jpg";
import inductionHardeningImage from "../../assets/company-profile/process/induction-hardening.webp";
import electrifiedLinkShaftImage from "../../assets/product-catalog/electrified/link-shaft.jpg";

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

// Bundled default posts. Every statement below is drawn from facts already published on the
// site (history eras, quality credentials, product catalog); the dates are publish dates and
// follow the existing pattern — they do not claim event dates.
export const curatedNoticePosts: NoticePost[] = [
  {
    id: "quality-certifications-2026",
    category: "quality",
    date: "2026-08-14",
    image: automaticInspectionImage,
    pinned: true,
    published: true,
    translations: {
      ko: {
        title: "IATF 16949·ISO 14001·MSQ — 서울산업 품질·환경 인증 체계 안내",
        summary: "자동차 품질경영시스템 IATF 16949, 환경경영시스템 ISO 14001, 현대모비스 협력사 품질인증 MSQ를 기반으로 양산 품질과 특수공정을 관리합니다.",
        body: "서울산업은 2004년 ISO/TS 16949와 ISO 14001 인증을 취득한 이후 자동차 부품 양산을 위한 품질·환경 경영 체계를 유지해 왔습니다. 현재는 IATF 16949 자동차 품질경영시스템과 ISO 14001 환경경영시스템, 현대모비스 협력사 품질인증(MSQ, 가공 분야 G등급)을 운영하고 있으며, INNOBIZ(기술혁신형 중소기업) 인증도 보유하고 있습니다.\n\n고주파 열처리·템퍼링과 레이저 용접 등 특수공정은 CQI-9·CQI-15 기준에 따라 공정 조건, 교정, 검증 결과를 기록으로 관리하고, VDA 6.3 관점의 공정 감사로 리스크와 공정 성숙도를 점검합니다. 고객별 요구사항과 APQP/PPAP, 변경 관리도 같은 품질 체계 안에서 운영합니다.",
      },
      en: {
        title: "IATF 16949, ISO 14001, and MSQ: Seoul Industry’s quality and environmental certifications",
        summary: "Volume production and special processes are managed under the IATF 16949 automotive QMS, the ISO 14001 environmental management system, and Hyundai Mobis MSQ supplier-quality certification.",
        body: "Seoul Industry earned ISO/TS 16949 and ISO 14001 certification in 2004 and has maintained quality and environmental management systems for automotive volume production ever since. Today the company operates under IATF 16949, ISO 14001, and Hyundai Mobis MSQ supplier-quality certification (machining grade G), and also holds INNOBIZ certification as a technology-innovative SME.\n\nSpecial processes such as induction hardening, tempering, and laser welding are controlled to CQI-9 and CQI-15, with process parameters, calibration, and validation results kept on record. VDA 6.3-based process audits check risks and process maturity, and customer-specific requirements, APQP/PPAP, and change control are run within the same quality system.",
      },
      ja: {
        title: "IATF 16949・ISO 14001・MSQ — ソウル産業の品質・環境認証体制のご案内",
        summary: "自動車品質マネジメントシステムIATF 16949、環境マネジメントシステムISO 14001、現代モービスのサプライヤー品質認証MSQを基盤に、量産品質と特殊工程を管理しています。",
        body: "ソウル産業は2004年にISO/TS 16949とISO 14001の認証を取得して以来、自動車部品量産のための品質・環境マネジメント体制を維持してきました。現在はIATF 16949自動車品質マネジメントシステム、ISO 14001環境マネジメントシステム、現代モービスのサプライヤー品質認証（MSQ、加工分野G等級）を運用し、INNOBIZ（技術革新型中小企業）認証も保有しています。\n\n高周波焼入れ・焼戻しやレーザー溶接などの特殊工程は、CQI-9・CQI-15に基づいて工程条件、校正、検証結果を記録として管理し、VDA 6.3の視点による工程監査でリスクと工程成熟度を点検しています。顧客固有要求事項、APQP/PPAP、変更管理も同じ品質体制のもとで運用します。",
      },
    },
  },
  {
    id: "phev-link-shaft-electrified-2026",
    category: "products",
    date: "2026-08-11",
    image: electrifiedLinkShaftImage,
    pinned: false,
    published: true,
    translations: {
      ko: {
        title: "PHEV 기어박스용 링크 샤프트 양산과 전동화 파워트레인 부품 대응",
        summary: "2022년 PHEV 기어박스용 링크 샤프트 양산을 시작한 이후, EV 감속기용 오일 펌프 하우징·커버와 전동화 파워트레인용 샤프트로 대응 범위를 넓히고 있습니다.",
        body: "서울산업은 2022년 PHEV 기어박스용 링크 샤프트 양산을 시작하며 전동화 파워트레인 부품 공급을 본격화했습니다. 2025년부터는 ICE·HEV·PHEV·BEV 프로그램 전반에서 신규 고객 개발을 진행하고 있습니다.\n\n현재 EV 감속기용 오일 펌프 하우징·커버는 양산 공정으로 가공하고, 전동화 파워트레인용 기어 샤프트·코액시얼 샤프트는 설계 검토와 시제품 제작·검증에 대응하고 있습니다. 시제품은 기어 정밀도, 스플라인 형상, 런아웃, 표면 상태를 중심으로 검증하며, 양산 부품과 시제품의 승인 단계는 제품 성격에 맞춰 별도로 운영합니다.",
      },
      en: {
        title: "PHEV gearbox link-shaft production and electrified-powertrain components",
        summary: "Since launching PHEV gearbox link-shaft production in 2022, Seoul Industry has extended its scope to EV reduction-gear oil-pump housings and covers and electrified-powertrain shafts.",
        body: "Seoul Industry launched volume production of link shafts for PHEV gearboxes in 2022, marking a full step into electrified-powertrain components. From 2025 the company has been developing new customers across ICE, HEV, PHEV, and BEV programs.\n\nToday, oil-pump housings and covers for EV reduction gears are machined on series-production processes, while electrified-powertrain gear shafts and coaxial shafts are supported through design review, prototype production, and validation. Prototypes are evaluated for gear accuracy, spline geometry, runout, and surface condition, and approval stages for production parts and prototypes are managed separately according to product type.",
      },
      ja: {
        title: "PHEVギヤボックス用リンクシャフトの量産と電動化パワートレイン部品への対応",
        summary: "2022年にPHEVギヤボックス用リンクシャフトの量産を開始して以来、EV減速機用オイルポンプのハウジング・カバーや電動化パワートレイン向けシャフトへ対応範囲を広げています。",
        body: "ソウル産業は2022年にPHEVギヤボックス用リンクシャフトの量産を開始し、電動化パワートレイン部品の供給を本格化しました。2025年からはICE・HEV・PHEV・BEVの各プログラムで新規顧客の開拓を進めています。\n\n現在、EV減速機用オイルポンプのハウジング・カバーは量産工程で加工し、電動化パワートレイン向けのギヤシャフト・コアキシャルシャフトは設計検討と試作・検証に対応しています。試作品はギヤ精度、スプライン形状、振れ、表面状態を中心に検証し、量産部品と試作品の承認段階は製品特性に応じて個別に運用しています。",
      },
    },
  },
  {
    id: "special-process-in-house-2026",
    category: "manufacturing",
    date: "2026-08-07",
    image: inductionHardeningImage,
    pinned: false,
    published: true,
    translations: {
      ko: {
        title: "CQI-9 사내 고주파 열처리와 CQI-15 레이저 용접 — 특수공정 사내 운영 체계",
        summary: "고주파 경화·저온 템퍼링과 레이저 용접·조립을 사내 공정으로 운영하고, 자동 교정과 전용 자동 검사까지 하나의 생산 흐름으로 연결합니다.",
        body: "서울산업은 필요한 부위만 선택적으로 경화하는 고주파 열처리와 저온 템퍼링을 CQI-9 기준에 따라 사내에서 운영합니다. 공정 조건, 설비 교정, 검증 결과를 추적 가능한 기록으로 관리하고, 제품 요구에 따라 자분탐상검사(MPI), 경도 측정, 금속조직 검사로 열처리 결과를 확인합니다.\n\n드라이브라인 디스크 캐리어 조립체에는 CQI-15 기준의 사내 레이저 용접·조립 공정을 적용하며, 용접부 단면과 용입 깊이를 확인합니다. 열처리 후 샤프트는 서보 프레스와 자동 측정을 반복하는 자동 교정으로 런아웃을 관리하고, 제품별 전용 검사기의 최종 자동 검사 데이터를 생산 이력과 연결합니다.",
      },
      en: {
        title: "In-house induction hardening to CQI-9 and laser welding to CQI-15: how special processes are run",
        summary: "Induction hardening with low-temperature tempering and laser welding and assembly are run in-house, linked with automatic straightening and dedicated automated inspection in a single production flow.",
        body: "Seoul Industry runs induction hardening—selectively hardening only the required areas—and low-temperature tempering in-house to CQI-9. Process parameters, equipment calibration, and validation results are kept as traceable records, and heat-treatment results are confirmed by magnetic-particle inspection (MPI), hardness testing, and metallurgical examination as each product requires.\n\nDriveline disc-carrier assemblies are laser-welded and assembled in-house to CQI-15, with weld cross-sections and penetration depth examined. After heat treatment, shafts pass through automatic straightening that alternates servo-press correction with measurement to control runout, and final automated inspection data from product-specific machines is linked to production history.",
      },
      ja: {
        title: "CQI-9に基づく社内高周波焼入れとCQI-15レーザー溶接 — 特殊工程の社内運用体制",
        summary: "高周波焼入れ・低温焼戻しとレーザー溶接・組立を社内工程として運用し、自動矯正と専用自動検査まで一つの生産フローでつなぎます。",
        body: "ソウル産業は、必要な部位だけを選択的に硬化させる高周波焼入れと低温焼戻しを、CQI-9に基づいて社内で運用しています。工程条件、設備校正、検証結果を追跡可能な記録として管理し、製品要求に応じて磁粉探傷検査（MPI）、硬さ測定、金属組織検査で熱処理結果を確認します。\n\nドライブラインのディスクキャリア組立品にはCQI-15に基づく社内レーザー溶接・組立工程を適用し、溶接部の断面と溶込み深さを確認します。熱処理後のシャフトは、サーボプレスと自動測定を繰り返す自動矯正で振れを管理し、製品別専用検査機の最終自動検査データを生産履歴と結び付けています。",
      },
    },
  },
  {
    id: "global-supplier-registrations-2026",
    category: "notice",
    date: "2026-08-04",
    image: companyFactoryImage,
    pinned: false,
    published: true,
    translations: {
      ko: {
        title: "1985년 설립 이후 이어 온 글로벌 협력업체 등록 이력",
        summary: "1987년 TRW Korea 협력업체 등록을 시작으로 북미·아시아·유럽 고객 프로그램으로 공급 범위를 넓혀 온 서울산업의 글로벌 대응 이력을 소개합니다.",
        body: "서울산업은 1985년 설립 이후 1987년 TRW Korea 협력업체 등록, 1990년 조향 부품 사업 진출을 거쳐 2003년 TRW 미국·일본·말레이시아, 2004년 Metaldyne 미국·한국, 2007년 Nexteer·ThyssenKrupp Presta·Magna Powertrain 협력업체로 등록되며 글로벌 OEM 대응 기반을 구축했습니다.\n\n2012년 GKN Driveline 유럽·미국, 2014년 Spartan LTM 미국, 2021년 AAM 미국·한국 협력업체 등록으로 드라이브라인과 전동화 프로그램까지 영역을 넓혔습니다. 현재는 화성 제조 거점을 중심으로 북미·아시아·유럽 세 지역의 고객 프로그램에 대해 도면 검토부터 양산 공급까지 하나의 흐름으로 대응하고 있습니다.",
      },
      en: {
        title: "Global supplier registrations since our founding in 1985",
        summary: "From registration with TRW Korea in 1987 to programs across North America, Asia, and Europe: how Seoul Industry’s global supply footprint has grown.",
        body: "Founded in 1985, Seoul Industry registered as a supplier to TRW Korea in 1987 and entered the steering-component sector in 1990. Registrations with TRW in the United States, Japan, and Malaysia (2003), Metaldyne in the United States and Korea (2004), and Nexteer, ThyssenKrupp Presta, and Magna Powertrain (2007) established its base for global OEM programs.\n\nRegistrations with GKN Driveline in Europe and the United States (2012), Spartan LTM in the United States (2014), and AAM in the United States and Korea (2021) extended the company’s scope into driveline and electrified programs. Today, from the Hwaseong manufacturing base, customer programs in North America, Asia, and Europe are supported in one continuous flow from drawing review to volume supply.",
      },
      ja: {
        title: "1985年の設立以来続く、グローバルサプライヤー登録の歩み",
        summary: "1987年のTRW Koreaサプライヤー登録を起点に、北米・アジア・欧州の顧客プログラムへ供給範囲を広げてきたソウル産業のグローバル対応の歩みをご紹介します。",
        body: "ソウル産業は1985年の設立後、1987年にTRW Koreaのサプライヤーとして登録され、1990年にステアリング部品事業へ参入しました。2003年のTRW米国・日本・マレーシア、2004年のMetaldyne米国・韓国、2007年のNexteer・ThyssenKrupp Presta・Magna Powertrainへの登録を通じて、グローバルOEM対応の基盤を築きました。\n\n2012年のGKN Driveline欧州・米国、2014年のSpartan LTM米国、2021年のAAM米国・韓国への登録により、ドライブラインと電動化プログラムへ領域を広げました。現在は華城の生産拠点を中心に、北米・アジア・欧州の3地域の顧客プログラムに対し、図面検討から量産供給までを一つの流れで対応しています。",
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
