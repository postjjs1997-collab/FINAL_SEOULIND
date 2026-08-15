import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import BrainallLogo from "./BrainallLogo";
import Icon from "./Icons";
import { defaultLanguage, isLanguageCode, languages, type LanguageCode } from "../data/brainall";
import {
  checkNoticeAdminSession,
  fetchNoticePosts,
  getNoticePosts,
  loginNoticeAdmin,
  logoutNoticeAdmin,
  makeNoticeId,
  newsCategoryLabels,
  noticeCategoryKickers,
  noticePostImage,
  resetNoticePosts,
  saveNoticePosts,
  sortNoticePosts,
  uploadNoticeImage,
  type NoticeCategory,
  type NoticePost,
  type NoticeTranslation,
} from "../data/notices";
import { applyLanguageAndRestartHome } from "../utils/languageNavigation";

type NewsPageProps = {
  route: string;
};

type NoticePageCopy = {
  home: string;
  admin: string;
  list: string;
  adminLogin: string;
  adminDashboard: string;
  adminHelp: string;
  adminId: string;
  adminPassword: string;
  login: string;
  logout: string;
  loginError: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCopy: string;
  postsCount: string;
  pinned: string;
  categories: string;
  readMore: string;
  backToList: string;
  editInAdmin: string;
  newPost: string;
  savePost: string;
  resetDefaults: string;
  deletePost: string;
  deleteConfirm: string;
  resetConfirm: string;
  formCategory: string;
  formDate: string;
  formImage?: string;
  formPinned: string;
  formTitle: string;
  formSummary: string;
  formBody: string;
  formLanguage: string;
  emptyTitle: string;
};

const noticePageCopy: Record<LanguageCode, NoticePageCopy> = {
  ko: {
    home: "메인으로",
    admin: "관리자",
    list: "공지 목록",
    adminLogin: "관리자 로그인",
    adminDashboard: "공지 관리",
    adminHelp: "공지와 뉴스는 저장 즉시 메인 섹션과 이 페이지에 반영됩니다.",
    adminId: "아이디",
    adminPassword: "비밀번호",
    login: "로그인",
    logout: "로그아웃",
    loginError: "아이디 또는 비밀번호를 확인해 주세요.",
    heroEyebrow: "NEWSROOM",
    heroTitle: "서울산업 공지사항",
    heroCopy: "제품군, 개발 대응, 품질·양산 흐름과 관련된 서울산업의 최신 소식을 확인하세요.",
    postsCount: "등록된 소식",
    pinned: "중요",
    categories: "카테고리",
    readMore: "자세히 보기",
    backToList: "목록으로 돌아가기",
    editInAdmin: "관리자 화면에서 수정",
    newPost: "새 글 작성",
    savePost: "저장하기",
    resetDefaults: "기본 글 복원",
    deletePost: "삭제",
    deleteConfirm: "이 공지를 삭제할까요?",
    resetConfirm: "기본 공지 데이터로 되돌릴까요?",
    formCategory: "분류",
    formDate: "날짜",
    formPinned: "상단 고정",
    formTitle: "제목",
    formSummary: "요약",
    formBody: "본문",
    formLanguage: "언어별 내용",
    emptyTitle: "제목 없는 공지",
  },
  en: {
    home: "Main Site",
    admin: "Admin",
    list: "Notices",
    adminLogin: "Admin Login",
    adminDashboard: "Notice Manager",
    adminHelp: "Saved posts appear immediately on this page and in the main News & Notice section.",
    adminId: "Admin ID",
    adminPassword: "Password",
    login: "Log In",
    logout: "Log Out",
    loginError: "Please check the admin ID or password.",
    heroEyebrow: "NEWSROOM",
    heroTitle: "Seoul Industry Notices",
    heroCopy: "Company notices on product programs, development, quality control, and production.",
    postsCount: "Published Updates",
    pinned: "Pinned",
    categories: "Categories",
    readMore: "Read More",
    backToList: "Back to Notices",
    editInAdmin: "Edit in Admin",
    newPost: "New Post",
    savePost: "Save Post",
    resetDefaults: "Restore Defaults",
    deletePost: "Delete",
    deleteConfirm: "Delete this notice?",
    resetConfirm: "Restore the default notice data?",
    formCategory: "Category",
    formDate: "Date",
    formPinned: "Pin to top",
    formTitle: "Title",
    formSummary: "Summary",
    formBody: "Body",
    formLanguage: "Localized Content",
    emptyTitle: "Untitled Notice",
  },
  ja: {
    home: "メインへ",
    admin: "管理者",
    list: "お知らせ一覧",
    adminLogin: "管理者ログイン",
    adminDashboard: "お知らせ管理",
    adminHelp: "保存した内容は、このページとメインの「ニュース・お知らせ」欄にすぐ反映されます。",
    adminId: "ID",
    adminPassword: "パスワード",
    login: "ログイン",
    logout: "ログアウト",
    loginError: "IDまたはパスワードをご確認ください。",
    heroEyebrow: "NEWSROOM",
    heroTitle: "ソウル産業のお知らせ",
    heroCopy: "製品群、開発対応、品質管理、量産プロセスに関するお知らせをご確認ください。",
    postsCount: "公開中のお知らせ",
    pinned: "重要",
    categories: "カテゴリー",
    readMore: "詳しく見る",
    backToList: "一覧へ戻る",
    editInAdmin: "管理画面で編集",
    newPost: "新規作成",
    savePost: "保存する",
    resetDefaults: "初期データに戻す",
    deletePost: "削除",
    deleteConfirm: "このお知らせを削除しますか？",
    resetConfirm: "初期のお知らせデータに戻しますか？",
    formCategory: "分類",
    formDate: "日付",
    formPinned: "上部に固定",
    formTitle: "タイトル",
    formSummary: "概要",
    formBody: "本文",
    formLanguage: "言語別内容",
    emptyTitle: "タイトル未設定",
  },
};

const newsPageCopy: Record<LanguageCode, NoticePageCopy> = {
  ko: {
    ...noticePageCopy.ko,
    home: "메인",
    admin: "관리자",
    list: "News",
    adminLogin: "관리자 로그인",
    adminDashboard: "뉴스 관리",
    adminHelp: "저장한 뉴스는 이 페이지와 메인 NEWS 섹션에 바로 반영됩니다.",
    adminId: "아이디",
    adminPassword: "비밀번호",
    login: "로그인",
    logout: "로그아웃",
    loginError: "아이디 또는 비밀번호를 확인해 주세요.",
    heroEyebrow: "SEOULIND NEWS",
    heroTitle: "NEWS",
    heroCopy: "서울산업의 제품, 제조 공정, 품질 대응, 글로벌 OEM 소식을 확인하세요.",
    postsCount: "등록된 뉴스",
    pinned: "중요",
    categories: "카테고리",
    readMore: "자세히 보기",
    backToList: "NEWS 목록으로",
    editInAdmin: "관리자 화면에서 수정",
    newPost: "새 뉴스 작성",
    savePost: "저장하기",
    resetDefaults: "기본 뉴스 복원",
    deletePost: "삭제",
    deleteConfirm: "이 뉴스를 삭제할까요?",
    resetConfirm: "기본 뉴스 데이터로 되돌릴까요?",
    formCategory: "분류",
    formDate: "날짜",
    formImage: "대표 이미지 URL",
    formPinned: "상단 고정",
    formTitle: "제목",
    formSummary: "요약",
    formBody: "본문",
    formLanguage: "언어별 내용",
    emptyTitle: "제목 없는 뉴스",
  },
  en: {
    ...noticePageCopy.en,
    list: "News",
    adminDashboard: "News Manager",
    adminHelp: "Saved news posts appear immediately on this page and in the main NEWS section.",
    heroEyebrow: "SEOULIND NEWS",
    heroTitle: "NEWS",
    heroCopy: "Updates on Seoul Industry products, manufacturing, quality, and global OEM partnerships.",
    postsCount: "Published News",
    readMore: "View Details",
    newPost: "New Article",
    resetDefaults: "Restore Defaults",
    formImage: "Cover image URL",
    emptyTitle: "Untitled News",
  },
  ja: {
    ...noticePageCopy.ja,
    home: "メイン",
    admin: "管理者",
    list: "News",
    adminLogin: "管理者ログイン",
    adminDashboard: "NEWS管理",
    adminHelp: "保存したニュースは、このページとメインNEWSセクションにすぐ反映されます。",
    adminId: "ID",
    adminPassword: "パスワード",
    login: "ログイン",
    logout: "ログアウト",
    loginError: "IDまたはパスワードを確認してください。",
    heroEyebrow: "SEOULIND NEWS",
    heroTitle: "NEWS",
    heroCopy: "ソウル産業の製品、製造工程、品質対応、グローバルOEMに関する最新情報をご確認ください。",
    postsCount: "公開ニュース",
    pinned: "重要",
    categories: "カテゴリー",
    readMore: "詳しく見る",
    backToList: "NEWS一覧へ",
    editInAdmin: "管理画面で編集",
    newPost: "新規記事",
    savePost: "保存",
    resetDefaults: "初期ニュースに戻す",
    deletePost: "削除",
    deleteConfirm: "このニュースを削除しますか？",
    resetConfirm: "初期ニュースデータに戻しますか？",
    formCategory: "分類",
    formDate: "日付",
    formImage: "メイン画像URL",
    formPinned: "上部固定",
    formTitle: "タイトル",
    formSummary: "要約",
    formBody: "本文",
    formLanguage: "言語別内容",
    emptyTitle: "無題のニュース",
  },
};

const adminActionCopy: Record<
  LanguageCode,
  {
    loginSuccess: string;
    saveSuccess: string;
    saveError: string;
    deleteSuccess: string;
    deleteError: string;
    resetSuccess: string;
    resetError: string;
    uploadSuccess: string;
    uploadError: string;
  }
> = {
  ko: {
    loginSuccess: "관리자 로그인이 완료되었습니다.",
    saveSuccess: "뉴스가 저장되어 사이트에 반영되었습니다.",
    saveError: "저장 중 오류가 발생했습니다.",
    deleteSuccess: "뉴스가 삭제되었습니다.",
    deleteError: "삭제 중 오류가 발생했습니다.",
    resetSuccess: "기본 뉴스로 복원되었습니다.",
    resetError: "복원 중 오류가 발생했습니다.",
    uploadSuccess: "대표 이미지 업로드가 완료되었습니다. 게시글을 저장하면 반영됩니다.",
    uploadError: "이미지 업로드에 실패했습니다.",
  },
  en: {
    loginSuccess: "Administrator login complete.",
    saveSuccess: "The news article has been saved and published to the site.",
    saveError: "An error occurred while saving.",
    deleteSuccess: "The news article has been deleted.",
    deleteError: "An error occurred while deleting.",
    resetSuccess: "The default news articles have been restored.",
    resetError: "An error occurred while restoring the defaults.",
    uploadSuccess: "The cover image has been uploaded. Save the post to publish it.",
    uploadError: "The image could not be uploaded.",
  },
  ja: {
    loginSuccess: "管理者としてログインしました。",
    saveSuccess: "ニュースを保存し、サイトに反映しました。",
    saveError: "保存中にエラーが発生しました。",
    deleteSuccess: "ニュースを削除しました。",
    deleteError: "削除中にエラーが発生しました。",
    resetSuccess: "初期のニュースを復元しました。",
    resetError: "復元中にエラーが発生しました。",
    uploadSuccess: "メイン画像をアップロードしました。記事を保存すると反映されます。",
    uploadError: "画像をアップロードできませんでした。",
  },
};

const languageCodes: LanguageCode[] = ["ko", "en", "ja"];
const categoryOrder: NoticeCategory[] = ["notice", "products", "quality", "manufacturing", "resources"];

function getTodayInSeoul() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());
}

function emptyTranslation(): NoticeTranslation {
  return { title: "", summary: "", body: "" };
}

function createEmptyNotice(): NoticePost {
  return {
    id: makeNoticeId(),
    category: "notice",
    date: getTodayInSeoul(),
    image: "",
    pinned: false,
    published: true,
    translations: {
      ko: emptyTranslation(),
      en: emptyTranslation(),
      ja: emptyTranslation(),
    },
  };
}

function cloneNotice(post: NoticePost): NoticePost {
  return JSON.parse(JSON.stringify(post)) as NoticePost;
}

function translationFor(post: NoticePost, language: LanguageCode): NoticeTranslation {
  return post.translations[language] ?? post.translations[defaultLanguage] ?? Object.values(post.translations)[0] ?? emptyTranslation();
}

function normalizeTranslation(translation: NoticeTranslation | undefined, fallback: NoticeTranslation, emptyTitle: string): NoticeTranslation {
  return {
    title: (translation?.title || fallback.title || emptyTitle).trim(),
    summary: (translation?.summary || fallback.summary || "").trim(),
    body: (translation?.body || fallback.body || fallback.summary || "").trim(),
  };
}

function normalizePost(post: NoticePost, emptyTitle: string): NoticePost {
  const fallback = translationFor(post, defaultLanguage);
  return {
    ...post,
    id: post.id || makeNoticeId(),
    date: post.date || getTodayInSeoul(),
    image: post.image?.trim() || undefined,
    published: post.published !== false,
    translations: {
      ko: normalizeTranslation(post.translations.ko, fallback, emptyTitle),
      en: normalizeTranslation(post.translations.en, fallback, emptyTitle),
      ja: normalizeTranslation(post.translations.ja, fallback, emptyTitle),
    },
  };
}

function NoticeTopbar({
  language,
  onLanguageChange,
  copy,
}: {
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
  copy: NoticePageCopy;
}) {
  return (
    <header className="notice-topbar">
      <a
        className="notice-topbar__brand"
        href="#/"
        aria-label={language === "ko" ? "서울산업 홈" : language === "ja" ? "ソウル産業ホーム" : "Seoul Industry home"}
      >
        <BrainallLogo />
      </a>
      <nav
        className="notice-topbar__nav"
        aria-label={language === "ko" ? "뉴스 페이지 메뉴" : language === "ja" ? "ニュースページメニュー" : "News page navigation"}
      >
        <a href="#/">{copy.home}</a>
        <a href="#/news">{copy.list}</a>
        <a href="#/company/notices/admin">{copy.admin}</a>
      </nav>
      <div className="notice-language" aria-label={language === "ko" ? "언어 선택" : language === "ja" ? "言語選択" : "Language selection"}>
        {languages.map((item) => (
          <button
            className={item.code === language ? "is-active" : ""}
            type="button"
            key={item.code}
            onClick={() => applyLanguageAndRestartHome(item.code, onLanguageChange)}
            aria-pressed={item.code === language}
          >
            {item.shortLabel}
          </button>
        ))}
      </div>
    </header>
  );
}

export default function NewsPage({ route }: NewsPageProps) {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const stored = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(stored) ? stored : defaultLanguage;
  });
  const [posts, setPosts] = useState<NoticePost[]>(() => sortNoticePosts(getNoticePosts()));
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [adminStatus, setAdminStatus] = useState("");
  const [loginForm, setLoginForm] = useState({ id: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [draft, setDraft] = useState<NoticePost>(() => createEmptyNotice());
  const [editingId, setEditingId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const copy = newsPageCopy[language];
  const actionCopy = adminActionCopy[language];
  const sortedPosts = useMemo(() => sortNoticePosts(posts), [posts]);
  const routeParts = route.split("/");
  const isAdminRoute = routeParts[1] === "admin";
  const postId = isAdminRoute ? "" : routeParts[1] ?? "";
  const selectedPost = postId ? sortedPosts.find((post) => post.id === postId) : undefined;

  useEffect(() => {
    const option = languages.find((item) => item.code === language);
    document.documentElement.lang = option?.htmlLang ?? language;
    window.localStorage.setItem("seoulind-language", language);
  }, [language]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  useEffect(() => {
    let active = true;
    const loadPosts = async () => {
      try {
        const nextPosts = await fetchNoticePosts();
        if (active) setPosts(nextPosts);
      } catch {
        // Curated notices remain visible while a network request is unavailable.
      }
    };
    const syncPosts = (event: Event) => {
      const nextPosts = (event as CustomEvent<NoticePost[]>).detail;
      if (Array.isArray(nextPosts)) {
        const visiblePosts = isAdminRoute
          ? nextPosts
          : nextPosts.filter((post) => post.published);
        setPosts(sortNoticePosts(visiblePosts));
      }
      else void loadPosts();
    };
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("seoulind-notices") : null;

    void loadPosts();
    window.addEventListener("seoulind-notices-updated", syncPosts);
    if (channel) channel.onmessage = () => void loadPosts();

    return () => {
      active = false;
      window.removeEventListener("seoulind-notices-updated", syncPosts);
      channel?.close();
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute) return;
    let active = true;
    setIsAuthChecking(true);
    checkNoticeAdminSession()
      .then((authenticated) => {
        if (active) setIsAuthed(authenticated);
      })
      .finally(() => {
        if (active) setIsAuthChecking(false);
      });
    return () => {
      active = false;
    };
  }, [isAdminRoute]);

  const categoryCounts = useMemo(
    () =>
      categoryOrder.map((category) => ({
        category,
        count: sortedPosts.filter((post) => post.category === category).length,
      })),
    [sortedPosts],
  );

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);
    setLoginError("");
    try {
      const authenticated = await loginNoticeAdmin(loginForm.id, loginForm.password);
      if (!authenticated) {
        setLoginError(copy.loginError);
        return;
      }
      setIsAuthed(true);
      setLoginForm({ id: "", password: "" });
      setAdminStatus(actionCopy.loginSuccess);
    } finally {
      setIsBusy(false);
    }
  };

  const handleLogout = async () => {
    await logoutNoticeAdmin();
    setIsAuthed(false);
    setAdminStatus("");
  };

  const handleEdit = (post: NoticePost) => {
    setEditingId(post.id);
    setDraft(cloneNotice(post));
  };

  const handleNew = () => {
    setEditingId(null);
    setDraft(createEmptyNotice());
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizePost(draft, copy.emptyTitle);
    const exists = posts.some((post) => post.id === normalized.id);
    const nextPosts = exists ? posts.map((post) => (post.id === normalized.id ? normalized : post)) : [normalized, ...posts];
    setIsBusy(true);
    setAdminStatus("");
    try {
      const saved = await saveNoticePosts(sortNoticePosts(nextPosts));
      setPosts(saved);
      setEditingId(normalized.id);
      setDraft(cloneNotice(normalized));
      setAdminStatus(actionCopy.saveSuccess);
    } catch (error) {
      setAdminStatus(error instanceof Error ? error.message : actionCopy.saveError);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async (postIdToDelete: string) => {
    if (!window.confirm(copy.deleteConfirm)) return;
    const nextPosts = sortNoticePosts(posts.filter((post) => post.id !== postIdToDelete));
    setIsBusy(true);
    setAdminStatus("");
    try {
      const saved = await saveNoticePosts(nextPosts);
      setPosts(saved);
      if (editingId === postIdToDelete) handleNew();
      setAdminStatus(actionCopy.deleteSuccess);
    } catch (error) {
      setAdminStatus(error instanceof Error ? error.message : actionCopy.deleteError);
    } finally {
      setIsBusy(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm(copy.resetConfirm)) return;
    setIsBusy(true);
    setAdminStatus("");
    try {
      const nextPosts = await resetNoticePosts();
      setPosts(nextPosts);
      handleNew();
      setAdminStatus(actionCopy.resetSuccess);
    } catch (error) {
      setAdminStatus(error instanceof Error ? error.message : actionCopy.resetError);
    } finally {
      setIsBusy(false);
    }
  };

  const handleImageUpload = async (file: File | undefined) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);
    setAdminStatus("");
    try {
      const image = await uploadNoticeImage(file, setUploadProgress);
      setDraft((current) => ({ ...current, image }));
      setAdminStatus(actionCopy.uploadSuccess);
    } catch (error) {
      setAdminStatus(error instanceof Error ? error.message : actionCopy.uploadError);
    } finally {
      setIsUploading(false);
    }
  };

  const updateDraftTranslation = (code: LanguageCode, field: keyof NoticeTranslation, value: string) => {
    setDraft((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [code]: {
          ...(current.translations[code] ?? emptyTranslation()),
          [field]: value,
        },
      },
    }));
  };

  const scrollNewsCards = (direction: -1 | 1) => {
    const node = listRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.82, behavior: "smooth" });
  };

  const renderList = () => (
    <section className="notice-news" aria-label={copy.list}>
      <div className="notice-news__head">
        <div>
          <span>{copy.heroEyebrow}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroCopy}</p>
        </div>
        <div
          className="notice-news__arrows"
          aria-label={language === "ko" ? "뉴스 이동" : language === "ja" ? "ニュースの移動" : "News controls"}
        >
          <button
            type="button"
            onClick={() => scrollNewsCards(-1)}
            aria-label={language === "ko" ? "이전 뉴스" : language === "ja" ? "前のニュース" : "Previous news"}
          >
            <Icon name="arrow" />
          </button>
          <button
            type="button"
            onClick={() => scrollNewsCards(1)}
            aria-label={language === "ko" ? "다음 뉴스" : language === "ja" ? "次のニュース" : "Next news"}
          >
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      <div className="notice-news__rail" ref={listRef}>
        {sortedPosts.map((post) => {
          const translation = translationFor(post, language);
          const image = noticePostImage(post);

          return (
            <a className="notice-news-card" href={`#/news/${post.id}`} key={post.id}>
              <div className="notice-news-card__top">
                <strong>{noticeCategoryKickers[post.category]}</strong>
                <span>{newsCategoryLabels[language][post.category]}</span>
              </div>
              <div className="notice-news-card__body">
                <h2>{translation.title}</h2>
                <time>{post.date.replaceAll("-", ".")}.</time>
              </div>
              <figure className={image ? undefined : "is-logo"}>
                {image ? <img src={image} alt="" loading="lazy" /> : <BrainallLogo className="news-logo-placeholder" />}
              </figure>
            </a>
          );
        })}
      </div>

      <div className="notice-news__bottom">
        <div className="notice-news__categories" aria-label={copy.categories}>
          {categoryCounts.map(({ category, count }) => (
            <span key={category}>
              {newsCategoryLabels[language][category]} <b>{count}</b>
            </span>
          ))}
        </div>
        <a className="notice-news__view" href="#/company/notices/admin">
          {copy.admin}
          <Icon name="arrow" />
        </a>
      </div>
    </section>
  );

  const renderDetail = (post: NoticePost) => {
    const translation = translationFor(post, language);
    const image = noticePostImage(post);

    return (
      <section className="notice-detail">
        <a className="notice-back" href="#/news">
          <Icon name="arrow" />
          {copy.backToList}
        </a>
        <article className="notice-detail__article">
          <div className="notice-detail__meta">
            <span>{newsCategoryLabels[language][post.category]}</span>
            {post.pinned && <b>{copy.pinned}</b>}
            <time>{post.date}</time>
          </div>
          <h1>{translation.title}</h1>
          <p className="notice-detail__summary">{translation.summary}</p>
          <figure className={`notice-detail__image${image ? "" : " is-logo"}`}>
            {image ? <img src={image} alt="" /> : <BrainallLogo className="news-logo-placeholder" />}
          </figure>
          <div className="notice-detail__body">
            {translation.body.split(/\n+/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a className="notice-detail__admin" href="#/company/notices/admin">
            {copy.editInAdmin}
            <Icon name="arrow" />
          </a>
        </article>
      </section>
    );
  };

  const renderAdmin = () => {
    if (isAuthChecking) {
      return (
        <section className="notice-admin-login is-checking" aria-live="polite">
          <div>
            <span>{copy.admin}</span>
            <h1>
              {language === "ko"
                ? "관리자 권한을 확인하고 있습니다."
                : language === "ja"
                  ? "管理者権限を確認しています。"
                  : "Checking administrator access."}
            </h1>
          </div>
        </section>
      );
    }

    if (!isAuthed) {
      return (
        <section className="notice-admin-login">
          <div>
            <span>{copy.admin}</span>
            <h1>{copy.adminLogin}</h1>
            <p>{copy.adminHelp}</p>
          </div>
          <form onSubmit={handleLogin}>
            <label>
              <span>{copy.adminId}</span>
              <input value={loginForm.id} onChange={(event) => setLoginForm((current) => ({ ...current, id: event.target.value }))} />
            </label>
            <label>
              <span>{copy.adminPassword}</span>
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
              />
            </label>
            {loginError && <strong>{loginError}</strong>}
            <button type="submit" disabled={isBusy}>
              {isBusy ? (language === "ko" ? "확인 중..." : language === "ja" ? "確認中..." : "Checking...") : copy.login}
            </button>
          </form>
        </section>
      );
    }

    return (
      <section className="notice-admin">
        <div className="notice-admin__head">
          <div>
            <span>{copy.admin}</span>
            <h1>{copy.adminDashboard}</h1>
            <p>{copy.adminHelp}</p>
          </div>
          <div>
            <button type="button" onClick={handleNew} disabled={isBusy || isUploading}>
              {copy.newPost}
            </button>
            <button type="button" onClick={handleReset} disabled={isBusy || isUploading}>
              {copy.resetDefaults}
            </button>
            <button type="button" onClick={handleLogout} disabled={isBusy || isUploading}>
              {copy.logout}
            </button>
          </div>
        </div>

        {adminStatus && <p className="notice-admin__status" aria-live="polite">{adminStatus}</p>}

        <div className="notice-admin__grid">
          <aside className="notice-admin__posts">
            {sortedPosts.map((post) => {
              const translation = translationFor(post, language);

              return (
                <div className={post.id === editingId ? "is-active" : ""} key={post.id}>
                  <button type="button" onClick={() => handleEdit(post)}>
                    <span>{newsCategoryLabels[language][post.category]}</span>
                    <strong>{translation.title}</strong>
                    <time>{post.date}</time>
                  </button>
                  <button type="button" onClick={() => handleDelete(post.id)} disabled={isBusy || isUploading}>
                    {copy.deletePost}
                  </button>
                </div>
              );
            })}
          </aside>

          <form className="notice-editor" onSubmit={handleSave}>
            <div className="notice-editor__settings">
              <label>
                <span>{copy.formCategory}</span>
                <select value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value as NoticeCategory }))}>
                  {categoryOrder.map((category) => (
                    <option value={category} key={category}>
                      {newsCategoryLabels[language][category]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{copy.formDate}</span>
                <input type="date" value={draft.date} onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} />
              </label>
              <label className="notice-editor__image">
                <span>{copy.formImage ?? "Cover image URL"}</span>
                <input value={draft.image ?? ""} onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))} />
              </label>
              <label className="notice-editor__upload">
                <span>{language === "ko" ? "대표 이미지 파일" : language === "ja" ? "メイン画像ファイル" : "Cover image file"}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={isUploading || isBusy}
                  onChange={(event) => {
                    void handleImageUpload(event.target.files?.[0]);
                    event.currentTarget.value = "";
                  }}
                />
                <small>
                  {isUploading
                    ? language === "ko"
                      ? `업로드 중 ${Math.round(uploadProgress)}%`
                      : language === "ja"
                        ? `アップロード中 ${Math.round(uploadProgress)}%`
                        : `Uploading ${Math.round(uploadProgress)}%`
                    : language === "ko"
                      ? "JPG, PNG, WEBP, GIF / 최대 8MB"
                      : language === "ja"
                        ? "JPG、PNG、WEBP、GIF / 最大8MB"
                        : "JPG, PNG, WEBP, GIF / up to 8 MB"}
                </small>
              </label>
              <label className="notice-editor__check">
                <input type="checkbox" checked={draft.pinned} onChange={(event) => setDraft((current) => ({ ...current, pinned: event.target.checked }))} />
                <span>{copy.formPinned}</span>
              </label>
            </div>

            {draft.image && (
              <figure className="notice-editor__preview">
                <img
                  src={draft.image}
                  alt={
                    language === "ko"
                      ? "대표 이미지 미리보기"
                      : language === "ja"
                        ? "メイン画像のプレビュー"
                        : "Cover image preview"
                  }
                />
                <button type="button" onClick={() => setDraft((current) => ({ ...current, image: "" }))}>
                  {language === "ko" ? "이미지 제거" : language === "ja" ? "画像を削除" : "Remove image"}
                </button>
              </figure>
            )}

            <h2>{copy.formLanguage}</h2>
            {languageCodes.map((code) => {
              const translation = draft.translations[code] ?? emptyTranslation();
              const languageLabel = languages.find((item) => item.code === code)?.shortLabel ?? code.toUpperCase();

              return (
                <fieldset className="notice-editor__language" key={code}>
                  <legend>{languageLabel}</legend>
                  <label>
                    <span>{copy.formTitle}</span>
                    <input value={translation.title} onChange={(event) => updateDraftTranslation(code, "title", event.target.value)} />
                  </label>
                  <label>
                    <span>{copy.formSummary}</span>
                    <textarea rows={3} value={translation.summary} onChange={(event) => updateDraftTranslation(code, "summary", event.target.value)} />
                  </label>
                  <label>
                    <span>{copy.formBody}</span>
                    <textarea rows={7} value={translation.body} onChange={(event) => updateDraftTranslation(code, "body", event.target.value)} />
                  </label>
                </fieldset>
              );
            })}

            <button className="notice-editor__submit" type="submit" disabled={isBusy || isUploading}>
              {isBusy ? (language === "ko" ? "저장 중..." : language === "ja" ? "保存中..." : "Saving...") : copy.savePost}
            </button>
          </form>
        </div>
      </section>
    );
  };

  return (
    <div className="notice-page">
      <NoticeTopbar language={language} onLanguageChange={setLanguage} copy={copy} />
      <main className="notice-shell">
        {isAdminRoute ? renderAdmin() : selectedPost ? renderDetail(selectedPost) : renderList()}
      </main>
    </div>
  );
}
