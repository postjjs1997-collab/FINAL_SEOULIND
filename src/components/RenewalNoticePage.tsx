import { type ChangeEvent, type FormEvent, type SyntheticEvent, useEffect, useMemo, useState } from "react";
import { defaultLanguage, isLanguageCode, type LanguageCode } from "../data/brainall";
import {
  checkNoticeAdminSession,
  fetchNoticePosts,
  getNoticePosts,
  loginNoticeAdmin,
  logoutNoticeAdmin,
  makeNoticeId,
  noticeCategoryKickers,
  noticeCategoryLabels,
  noticePostFallbackImage,
  noticePostImage,
  resetNoticePosts,
  saveNoticePosts,
  sortNoticePosts,
  uploadNoticeImage,
  type NoticeCategory,
  type NoticePost,
  type NoticeTranslation,
} from "../data/notices";
import {
  RenewalSiteFooter,
  RenewalSiteHeader,
  type RenewalLanguage,
} from "./RenewalShell";
import "../styles/renewal.css";
import "../styles/renewal-notices.css";

type RenewalNoticePageProps = {
  route: string;
};

type NoticeCopy = {
  eyebrow: string;
  title: string;
  description: string;
  manage: string;
  read: string;
  backToList: string;
  notFound: string;
  notFoundDescription: string;
  loginTitle: string;
  loginDescription: string;
  id: string;
  password: string;
  login: string;
  loginFailed: string;
  loginChecking: string;
  logout: string;
  newPost: string;
  restoreDefaults: string;
  restoreConfirm: string;
  delete: string;
  deleteConfirm: string;
  save: string;
  saving: string;
  saved: string;
  postList: string;
  editor: string;
  category: string;
  date: string;
  pinned: string;
  published: string;
  publishedStatus: string;
  unpublishedStatus: string;
  publishHint: string;
  coverImage: string;
  imageUrl: string;
  uploadImage: string;
  uploading: string;
  uploaded: string;
  removeImage: string;
  titleLabel: string;
  summary: string;
  body: string;
  language: string;
  edit: string;
  cancel: string;
  createHint: string;
  editHint: string;
  noPosts: string;
  loadError: string;
  retryLoad: string;
  saveError: string;
  uploadError: string;
};

const languageCodes: LanguageCode[] = ["ko", "en", "ja"];
const categoryOrder: NoticeCategory[] = [
  "notice",
  "products",
  "quality",
  "manufacturing",
  "resources",
];

const noticeCopy: Record<RenewalLanguage, NoticeCopy> = {
  ko: {
    eyebrow: "NEWSROOM",
    title: "서울산업 공지사항",
    description: "제품, 생산, 품질, 채용 등 서울산업의 주요 소식을 확인하실 수 있습니다.",
    manage: "공지 관리",
    read: "자세히 보기",
    backToList: "공지사항 목록",
    notFound: "게시글을 찾을 수 없습니다.",
    notFoundDescription: "삭제되었거나 주소가 변경된 게시글입니다.",
    loginTitle: "공지사항 관리",
    loginDescription: "관리자 계정으로 로그인하면 게시글 작성·수정·게시중지·삭제를 관리할 수 있습니다.",
    id: "관리자 아이디",
    password: "비밀번호",
    login: "로그인",
    loginFailed: "아이디 또는 비밀번호를 확인해 주세요.",
    loginChecking: "권한을 확인하고 있습니다.",
    logout: "로그아웃",
    newPost: "새 게시글",
    restoreDefaults: "초기 게시글 복원",
    restoreConfirm: "현재 게시글을 초기 목록으로 되돌릴까요? 이 작업은 되돌릴 수 없습니다.",
    delete: "삭제",
    deleteConfirm: "이 게시글을 삭제할까요?",
    save: "게시글 저장",
    saving: "저장 중...",
    saved: "게시글이 저장되었습니다.",
    postList: "게시글 목록",
    editor: "게시글 편집",
    category: "분류",
    date: "게시일",
    pinned: "목록 상단에 고정",
    published: "공개 게시",
    publishedStatus: "공개",
    unpublishedStatus: "비공개",
    publishHint: "체크를 끄고 저장하면 글을 삭제하지 않고 공개 목록에서 내릴 수 있습니다.",
    coverImage: "대표 이미지",
    imageUrl: "이미지 주소",
    uploadImage: "이미지 업로드",
    uploading: "업로드 중...",
    uploaded: "이미지가 업로드되었습니다. 게시글 저장을 눌러 반영해 주세요.",
    removeImage: "이미지 삭제",
    titleLabel: "제목",
    summary: "요약",
    body: "본문",
    language: "작성 언어",
    edit: "수정",
    cancel: "목록으로",
    createHint: "새 게시글을 작성하고 있습니다.",
    editHint: "선택한 게시글을 수정하고 있습니다.",
    noPosts: "등록된 게시글이 없습니다.",
    loadError: "공지사항을 불러오지 못했습니다.",
    retryLoad: "다시 불러오기",
    saveError: "게시글을 저장하지 못했습니다.",
    uploadError: "이미지를 업로드하지 못했습니다.",
  },
  en: {
    eyebrow: "NEWSROOM",
    title: "News & Notices",
    description: "Find the latest news from Seoul Industry, including product, manufacturing, quality, and recruitment updates.",
    manage: "Manage notices",
    read: "Read more",
    backToList: "All notices",
    notFound: "This post is not available.",
    notFoundDescription: "It may have been removed or its address may have changed.",
    loginTitle: "Notice management",
    loginDescription: "Sign in to create, edit, unpublish, and delete notices.",
    id: "Administrator ID",
    password: "Password",
    login: "Sign in",
    loginFailed: "Check your administrator ID and password.",
    loginChecking: "Checking access...",
    logout: "Sign out",
    newPost: "New post",
    restoreDefaults: "Restore default posts",
    restoreConfirm: "Restore the initial notice list? This cannot be undone.",
    delete: "Delete",
    deleteConfirm: "Delete this post?",
    save: "Save post",
    saving: "Saving...",
    saved: "The post has been saved.",
    postList: "Posts",
    editor: "Post editor",
    category: "Category",
    date: "Date",
    pinned: "Pin to top of list",
    published: "Published",
    publishedStatus: "Public",
    unpublishedStatus: "Unpublished",
    publishHint: "Turn this off and save to remove the post from the public list without deleting it.",
    coverImage: "Cover image",
    imageUrl: "Image URL",
    uploadImage: "Upload image",
    uploading: "Uploading...",
    uploaded: "The image has been uploaded. Save the post to apply it.",
    removeImage: "Remove image",
    titleLabel: "Title",
    summary: "Summary",
    body: "Body",
    language: "Editing language",
    edit: "Edit",
    cancel: "Back to list",
    createHint: "Creating a new post.",
    editHint: "Editing the selected post.",
    noPosts: "No notices have been registered.",
    loadError: "Unable to load notices.",
    retryLoad: "Try again",
    saveError: "Unable to save the post.",
    uploadError: "Unable to upload the image.",
  },
  ja: {
    eyebrow: "NEWSROOM",
    title: "お知らせ",
    description: "製品、生産、品質、採用など、ソウル産業の最新情報をご案内します。",
    manage: "お知らせ管理",
    read: "詳しく見る",
    backToList: "お知らせ一覧",
    notFound: "記事が見つかりません。",
    notFoundDescription: "削除されたか、URLが変更された可能性があります。",
    loginTitle: "お知らせ管理",
    loginDescription: "管理者アカウントでログインすると、記事の作成・編集・非公開・削除を管理できます。",
    id: "管理者ID",
    password: "パスワード",
    login: "ログイン",
    loginFailed: "管理者IDまたはパスワードをご確認ください。",
    loginChecking: "権限を確認しています...",
    logout: "ログアウト",
    newPost: "新規記事",
    restoreDefaults: "初期記事に戻す",
    restoreConfirm: "現在の記事を初期状態に戻しますか？この操作は元に戻せません。",
    delete: "削除",
    deleteConfirm: "この記事を削除しますか？",
    save: "記事を保存",
    saving: "保存中...",
    saved: "記事を保存しました。",
    postList: "記事一覧",
    editor: "記事編集",
    category: "分類",
    date: "公開日",
    pinned: "一覧の先頭に固定",
    published: "公開する",
    publishedStatus: "公開",
    unpublishedStatus: "非公開",
    publishHint: "チェックを外して保存すると、記事を削除せず公開一覧から取り下げられます。",
    coverImage: "メイン画像",
    imageUrl: "画像URL",
    uploadImage: "画像をアップロード",
    uploading: "アップロード中...",
    uploaded: "画像をアップロードしました。記事を保存すると反映されます。",
    removeImage: "画像を削除",
    titleLabel: "タイトル",
    summary: "概要",
    body: "本文",
    language: "編集言語",
    edit: "編集",
    cancel: "一覧へ戻る",
    createHint: "新しい記事を作成しています。",
    editHint: "選択した記事を編集しています。",
    noPosts: "登録された記事はありません。",
    loadError: "お知らせを読み込めませんでした。",
    retryLoad: "再読み込み",
    saveError: "記事を保存できませんでした。",
    uploadError: "画像をアップロードできませんでした。",
  },
};

const languageLabels: Record<LanguageCode, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
};

function getTodayInSeoul() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
  }).format(new Date());
}

function emptyTranslation(): NoticeTranslation {
  return {
    title: "",
    summary: "",
    body: "",
  };
}

function createEmptyNotice(): NoticePost {
  return {
    id: makeNoticeId(),
    category: "notice",
    date: getTodayInSeoul(),
    image: "",
    pinned: false,
    published: false,
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
  return (
    post.translations[language] ??
    post.translations[defaultLanguage] ??
    Object.values(post.translations)[0] ??
    emptyTranslation()
  );
}

function normalizeTranslation(
  translation: NoticeTranslation | undefined,
  fallback: NoticeTranslation,
  emptyTitle: string,
): NoticeTranslation {
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

function formatDate(date: string, language: RenewalLanguage) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.valueOf())) {
    return date;
  }

  return new Intl.DateTimeFormat(
    language === "ko" ? "ko-KR" : language === "ja" ? "ja-JP" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ).format(parsed);
}

function noticeParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function handleNoticeImageError(event: SyntheticEvent<HTMLImageElement>, post: NoticePost) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") {
    image.hidden = true;
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.src = noticePostFallbackImage(post);
}

export default function RenewalNoticePage({ route }: RenewalNoticePageProps) {
  const [language, setLanguage] = useState<RenewalLanguage>(() => {
    const stored = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(stored) ? stored : defaultLanguage;
  });
  const [posts, setPosts] = useState<NoticePost[]>(() => sortNoticePosts(getNoticePosts()));
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({ id: "", password: "" });
  const [draft, setDraft] = useState<NoticePost>(createEmptyNotice);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formLanguage, setFormLanguage] = useState<LanguageCode>("ko");
  const [adminReloadKey, setAdminReloadKey] = useState(0);

  const parts = route.split("/");
  const isAdminRoute = parts[2] === "admin";
  const postId = isAdminRoute ? "" : parts[2] ?? "";
  const copy = noticeCopy[language];
  const sortedPosts = useMemo(() => sortNoticePosts(posts), [posts]);
  const selectedPost = useMemo(
    () => sortedPosts.find((post) => post.id === postId),
    [postId, sortedPosts],
  );
  const formTranslation = translationFor(draft, formLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("seoulind-language", language);
  }, [language]);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    let active = true;

    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const nextPosts = await fetchNoticePosts();
        if (active) {
          setPosts(nextPosts);
          setError("");
        }
      } catch {
        if (active) {
          setPosts(sortNoticePosts(getNoticePosts()));
          setError(isAdminRoute ? copy.loadError : "");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadPosts();
    return () => {
      active = false;
    };
  }, [copy.loadError, isAdminRoute]);

  useEffect(() => {
    const syncPosts = (event: Event) => {
      const nextPosts = (event as CustomEvent<NoticePost[]>).detail;
      if (Array.isArray(nextPosts)) {
        const visiblePosts = isAdminRoute
          ? nextPosts
          : nextPosts.filter((post) => post.published);
        setPosts(sortNoticePosts(visiblePosts));
      }
    };

    window.addEventListener("seoulind-notices-updated", syncPosts);
    return () => {
      window.removeEventListener("seoulind-notices-updated", syncPosts);
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute) {
      return;
    }

    let active = true;
    setIsAuthChecking(true);

    void checkNoticeAdminSession()
      .then((authed) => {
        if (active) {
          setIsAuthed(authed);
        }
      })
      .catch(() => {
        if (active) {
          setIsAuthed(false);
        }
      })
      .finally(() => {
        if (active) {
          setIsAuthChecking(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute || !isAuthed) {
      return;
    }

    let active = true;
    setIsLoading(true);
    setError("");
    void fetchNoticePosts({ includeUnpublished: true })
      .then((nextPosts) => {
        if (active) {
          setPosts(nextPosts);
          setEditingId(null);
          setIsCreating(false);
          setDraft(createEmptyNotice());
          setError("");
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(copy.loadError);
        }
      });

    return () => {
      active = false;
    };
  }, [adminReloadKey, copy.loadError, isAdminRoute, isAuthed]);

  useEffect(() => {
    if (!isAdminRoute || isCreating || editingId || sortedPosts.length === 0) {
      return;
    }

    const firstPost = sortedPosts[0];
    setEditingId(firstPost.id);
    setDraft(cloneNotice(firstPost));
  }, [editingId, isAdminRoute, isCreating, sortedPosts]);

  const openEditor = (post: NoticePost) => {
    setEditingId(post.id);
    setIsCreating(false);
    setDraft(cloneNotice(post));
    setFormLanguage(language);
    setStatus("");
    setError("");
  };

  const startNewPost = () => {
    setEditingId(null);
    setIsCreating(true);
    setDraft(createEmptyNotice());
    setFormLanguage(language);
    setStatus("");
    setError("");
  };

  const updateTranslation = (
    key: keyof NoticeTranslation,
    value: string,
  ) => {
    setDraft((current) => ({
      ...current,
      translations: {
        ...current.translations,
        [formLanguage]: {
          ...translationFor(current, formLanguage),
          [key]: value,
        },
      },
    }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBusy(true);
    setError("");
    setStatus("");

    try {
      const authed = await loginNoticeAdmin(loginForm.id, loginForm.password);
      if (!authed) {
        setError(copy.loginFailed);
        return;
      }

      setLoginForm({ id: "", password: "" });
      setIsLoading(true);
      setIsAuthed(true);
    } catch {
      setError(copy.loginFailed);
    } finally {
      setIsBusy(false);
    }
  };

  const handleLogout = async () => {
    setIsBusy(true);
    try {
      await logoutNoticeAdmin();
      setIsAuthed(false);
      setStatus("");
      setError("");
    } finally {
      setIsBusy(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextDraft = normalizePost(draft, copy.titleLabel);

    if (!nextDraft.translations.ko.title || !nextDraft.translations.ko.summary) {
      setError(language === "ko" ? "한국어 제목과 요약을 입력해 주세요." : copy.saveError);
      return;
    }

    setIsBusy(true);
    setError("");
    setStatus("");

    try {
      const nextPosts = editingId
        ? posts.map((post) => (post.id === editingId ? nextDraft : post))
        : [nextDraft, ...posts];
      const savedPosts = await saveNoticePosts(nextPosts);
      setPosts(savedPosts);
      setEditingId(nextDraft.id);
      setIsCreating(false);
      setDraft(cloneNotice(nextDraft));
      setStatus(copy.saved);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : copy.saveError);
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId || !window.confirm(copy.deleteConfirm)) {
      return;
    }

    setIsBusy(true);
    setError("");
    setStatus("");

    try {
      const savedPosts = await saveNoticePosts(posts.filter((post) => post.id !== editingId));
      setPosts(savedPosts);
      setEditingId(null);
      setIsCreating(false);
      setDraft(createEmptyNotice());
      setStatus(copy.saved);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : copy.saveError);
    } finally {
      setIsBusy(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm(copy.restoreConfirm)) {
      return;
    }

    setIsBusy(true);
    setError("");
    setStatus("");

    try {
      const savedPosts = await resetNoticePosts();
      setPosts(savedPosts);
      setEditingId(null);
      setIsCreating(false);
      setStatus(copy.saved);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : copy.saveError);
    } finally {
      setIsBusy(false);
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError("");
    setStatus("");

    try {
      const imageUrl = await uploadNoticeImage(file, setUploadProgress);
      setDraft((current) => ({
        ...current,
        image: imageUrl,
      }));
      setStatus(copy.uploaded);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : copy.uploadError);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const listContent = (
    <>
      <section className="notice-masthead">
        <div className="notice-masthead__inner">
          <p className="notice-masthead__eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
          <a className="notice-masthead__manage" href="#/company/notices/admin">
            {copy.manage}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="notice-list-section" aria-label={copy.title}>
        {error ? <p className="notice-feedback notice-feedback--error">{error}</p> : null}
        {isLoading ? (
          <div className="notice-loading" aria-live="polite">
            <span />
            <span />
            <span />
          </div>
        ) : sortedPosts.length > 0 ? (
          <div className="notice-grid">
            {sortedPosts.map((post) => {
              const translation = translationFor(post, language);
              return (
                <a
                  className="notice-card"
                  href={`#/company/notices/${post.id}`}
                  key={post.id}
                >
                  <div className="notice-card__media">
                    <img
                      alt={translation.title}
                      onError={(event) => handleNoticeImageError(event, post)}
                      src={noticePostImage(post)}
                    />
                  </div>
                  <div className="notice-card__content">
                    <div className="notice-card__meta">
                      <span>{noticeCategoryKickers[post.category]}</span>
                      <time dateTime={post.date}>{formatDate(post.date, language)}</time>
                    </div>
                    <h2>{translation.title}</h2>
                    <p>{translation.summary}</p>
                    <span className="notice-card__read">
                      {copy.read}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="notice-empty">{copy.noPosts}</p>
        )}
      </section>
    </>
  );

  const detailContent = selectedPost ? (
    <article className="notice-detail">
      <div className="notice-detail__topbar">
        <a href="#/company/notices">← {copy.backToList}</a>
        <a href={`#/company/notices/admin`}>{copy.manage}</a>
      </div>
      <header className="notice-detail__header">
        <div>
          <p>{noticeCategoryKickers[selectedPost.category]}</p>
          <time dateTime={selectedPost.date}>{formatDate(selectedPost.date, language)}</time>
        </div>
        <h1>{translationFor(selectedPost, language).title}</h1>
        <p>{translationFor(selectedPost, language).summary}</p>
      </header>
      <div className="notice-detail__media">
        <img
          alt={translationFor(selectedPost, language).title}
          onError={(event) => handleNoticeImageError(event, selectedPost)}
          src={noticePostImage(selectedPost)}
        />
      </div>
      <div className="notice-detail__body">
        {noticeParagraphs(translationFor(selectedPost, language).body).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  ) : (
    <section className="notice-not-found">
      <p>{copy.eyebrow}</p>
      <h1>{copy.notFound}</h1>
      <span>{copy.notFoundDescription}</span>
      <a href="#/company/notices">{copy.backToList}</a>
    </section>
  );

  const loginContent = (
    <section className="notice-admin-login">
      <div>
        <p>{copy.eyebrow}</p>
        <h1>{copy.loginTitle}</h1>
        <span>{copy.loginDescription}</span>
      </div>
      <form onSubmit={handleLogin}>
        <label>
          <span>{copy.id}</span>
          <input
            autoComplete="username"
            onChange={(event) =>
              setLoginForm((current) => ({ ...current, id: event.target.value }))
            }
            required
            value={loginForm.id}
          />
        </label>
        <label>
          <span>{copy.password}</span>
          <input
            autoComplete="current-password"
            onChange={(event) =>
              setLoginForm((current) => ({ ...current, password: event.target.value }))
            }
            required
            type="password"
            value={loginForm.password}
          />
        </label>
        {error ? <p className="notice-feedback notice-feedback--error">{error}</p> : null}
        <button disabled={isBusy} type="submit">
          {copy.login}
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </section>
  );

  const adminContent = isAuthChecking ? (
    <div className="notice-admin-loading">{copy.loginChecking}</div>
  ) : !isAuthed ? (
    loginContent
  ) : isLoading ? (
    <div className="notice-admin-loading">
      <p>{error || copy.loginChecking}</p>
      {error ? (
        <div className="notice-admin-loading__actions">
          <button
            className="notice-button"
            onClick={() => {
              setError("");
              setAdminReloadKey((current) => current + 1);
            }}
            type="button"
          >
            {copy.retryLoad}
          </button>
          <button className="notice-button notice-button--outline" onClick={handleLogout} type="button">
            {copy.logout}
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <section className="notice-admin">
      <header className="notice-admin__header">
        <div>
          <p>{copy.eyebrow}</p>
          <h1>{copy.loginTitle}</h1>
        </div>
        <div className="notice-admin__header-actions">
          <button className="notice-button notice-button--outline" onClick={handleReset} type="button">
            {copy.restoreDefaults}
          </button>
          <button className="notice-button notice-button--outline" onClick={handleLogout} type="button">
            {copy.logout}
          </button>
        </div>
      </header>

      <div className="notice-admin__workspace">
        <aside className="notice-admin__list">
          <div className="notice-admin__list-heading">
            <h2>{copy.postList}</h2>
            <button className="notice-icon-button" onClick={startNewPost} title={copy.newPost} type="button">
              <span aria-hidden="true">+</span>
              <span className="sr-only">{copy.newPost}</span>
            </button>
          </div>
          <div className="notice-admin__posts">
            {sortedPosts.map((post) => {
              const translation = translationFor(post, language);
              const isSelected = !isCreating && post.id === editingId;
              return (
                <button
                  aria-pressed={isSelected}
                  className={`notice-admin-post${isSelected ? " is-selected" : ""}`}
                  key={post.id}
                  onClick={() => openEditor(post)}
                  type="button"
                >
                  <div className="notice-admin-post__meta">
                    <span>{noticeCategoryLabels[language][post.category]}</span>
                    <span className={post.published ? "is-public" : "is-private"}>
                      {post.published ? copy.publishedStatus : copy.unpublishedStatus}
                    </span>
                  </div>
                  <strong>{translation.title}</strong>
                  <time dateTime={post.date}>{post.date}</time>
                </button>
              );
            })}
          </div>
        </aside>

        <form className="notice-editor" onSubmit={handleSave}>
          <div className="notice-editor__heading">
            <div>
              <p>{isCreating ? copy.createHint : copy.editHint}</p>
              <h2>{copy.editor}</h2>
            </div>
            {editingId ? (
              <button className="notice-button notice-button--danger" onClick={handleDelete} type="button">
                {copy.delete}
              </button>
            ) : null}
          </div>

          <div className="notice-editor__fields notice-editor__fields--meta">
            <label>
              <span>{copy.category}</span>
              <select
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    category: event.target.value as NoticeCategory,
                  }))
                }
                value={draft.category}
              >
                {categoryOrder.map((category) => (
                  <option key={category} value={category}>
                    {noticeCategoryLabels[language][category]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{copy.date}</span>
              <input
                onChange={(event) =>
                  setDraft((current) => ({ ...current, date: event.target.value }))
                }
                required
                type="date"
                value={draft.date}
              />
            </label>
            <label className="notice-checkbox">
              <input
                checked={draft.pinned}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, pinned: event.target.checked }))
                }
                type="checkbox"
              />
              <span>{copy.pinned}</span>
            </label>
            <label className="notice-checkbox">
              <input
                checked={draft.published}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, published: event.target.checked }))
                }
                type="checkbox"
              />
              <span>{copy.published}</span>
            </label>
          </div>
          <p className="notice-editor__publish-hint">{copy.publishHint}</p>

          <div className="notice-editor__image">
            <div>
              <span>{copy.coverImage}</span>
              {draft.image ? (
                <img alt="" src={draft.image} />
              ) : (
                <div className="notice-editor__image-empty">{copy.coverImage}</div>
              )}
            </div>
            <div className="notice-editor__image-controls">
              <label>
                <span>{copy.imageUrl}</span>
                <input
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, image: event.target.value }))
                  }
                  inputMode="url"
                  placeholder="https:// 또는 /assets/..."
                  type="text"
                  value={draft.image ?? ""}
                />
              </label>
              <label className="notice-upload-button">
                <input
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  disabled={isUploading}
                  onChange={handleImageUpload}
                  type="file"
                />
                <span>
                  {isUploading
                    ? `${copy.uploading} ${Math.round(uploadProgress)}%`
                    : copy.uploadImage}
                </span>
              </label>
              {draft.image ? (
                <button
                  className="notice-text-button"
                  onClick={() => setDraft((current) => ({ ...current, image: "" }))}
                  type="button"
                >
                  {copy.removeImage}
                </button>
              ) : null}
            </div>
          </div>

          <div className="notice-language-tabs" aria-label={copy.language}>
            {languageCodes.map((code) => (
              <button
                aria-pressed={formLanguage === code}
                className={formLanguage === code ? "is-active" : ""}
                key={code}
                onClick={() => setFormLanguage(code)}
                type="button"
              >
                {languageLabels[code]}
              </button>
            ))}
          </div>

          <div className="notice-editor__fields">
            <label>
              <span>{copy.titleLabel}</span>
              <input
                onChange={(event) => updateTranslation("title", event.target.value)}
                required={formLanguage === "ko"}
                value={formTranslation.title}
              />
            </label>
            <label>
              <span>{copy.summary}</span>
              <textarea
                onChange={(event) => updateTranslation("summary", event.target.value)}
                required={formLanguage === "ko"}
                rows={3}
                value={formTranslation.summary}
              />
            </label>
            <label>
              <span>{copy.body}</span>
              <textarea
                onChange={(event) => updateTranslation("body", event.target.value)}
                rows={10}
                value={formTranslation.body}
              />
            </label>
          </div>

          {error ? <p className="notice-feedback notice-feedback--error">{error}</p> : null}
          {status ? <p className="notice-feedback notice-feedback--success">{status}</p> : null}
          <div className="notice-editor__submit">
            <button className="notice-button" disabled={isBusy || isUploading} type="submit">
              {isBusy ? copy.saving : copy.save}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );

  return (
    <div className="renewal-notice-page">
      <RenewalSiteHeader
        currentRoute="company/notices"
        language={language}
        onLanguageChange={setLanguage}
      />
      <main className="notice-route">
        {isAdminRoute ? adminContent : postId ? detailContent : listContent}
      </main>
      <RenewalSiteFooter language={language} />
    </div>
  );
}
