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
import { findMenuByRoute, siteMenuGroups } from "../data/navigation";

type MenuPageProps = {
  route: string;
};

type PageConfig = {
  route: string;
  eyebrow: string;
  title: string;
  lead: string;
  heroCopy: string;
  image: string;
};

const pageConfigs: Record<string, PageConfig> = {
  "company/greeting": {
    route: "company/greeting",
    eyebrow: "CEO Message",
    title: "인사말",
    lead: "정밀가공의 기본을 지키며 고객사의 개발 일정과 양산 계획을 함께 완성하는 제조 파트너가 되겠습니다.",
    heroCopy: "서울산업은 자동차 부품 OEM 생산에서 요구되는 반복 정밀도, 품질 기준, 납기 대응을 하나의 흐름으로 관리합니다.",
    image: precisionHeroImage,
  },
  "company/history": {
    route: "company/history",
    eyebrow: "History",
    title: "회사연혁",
    lead: "1985년부터 쌓아온 정밀가공 경험을 바탕으로 국내외 자동차 부품 공급망 안에서 제조 기반을 확장해 왔습니다.",
    heroCopy: "조향부품 양산에서 시작해 품질 인증, 글로벌 고객 대응, 전동화 부품까지 서울산업의 시간은 제조 역량의 축적입니다.",
    image: balanceModuleImage,
  },
  "company/certificates": {
    route: "company/certificates",
    eyebrow: "Certification",
    title: "인증서",
    lead: "품질, 환경, 기술 역량을 기준으로 관리하며 고객이 신뢰할 수 있는 제조 체계를 유지합니다.",
    heroCopy: "인증은 결과가 아니라 매일 같은 기준으로 공정을 움직이게 하는 서울산업의 운영 방식입니다.",
    image: certificationImage,
  },
  "sustainability/environmental": {
    route: "sustainability/environmental",
    eyebrow: "Environmental",
    title: "Environmental",
    lead: "에너지와 자원 사용을 줄이고 공정 효율을 높여 지속가능한 정밀가공 현장을 만들어 갑니다.",
    heroCopy: "환경 관리 기준을 생산 현장 안에 두고, 효율적인 공정 운영으로 제조 과정의 부담을 낮춥니다.",
    image: precisionHeroImage,
  },
  "sustainability/governance": {
    route: "sustainability/governance",
    eyebrow: "Governance",
    title: "Governance",
    lead: "도면, 품질, 납기, 거래 기준을 투명하게 관리해 장기적인 OEM 파트너십을 만듭니다.",
    heroCopy: "서울산업은 공정 이력과 품질 기록을 명확히 남기고 고객 요구사항을 책임 있게 관리합니다.",
    image: drivelineImage,
  },
  "sustainability/esg-report": {
    route: "sustainability/esg-report",
    eyebrow: "ESG Report",
    title: "ESG보고서",
    lead: "정밀가공 기업으로서 환경, 안전, 투명한 기준을 중심으로 지속가능경영 활동을 정리합니다.",
    heroCopy: "서울산업의 ESG 방향은 현장에서 지켜지는 기준과 고객에게 전달되는 신뢰를 함께 높이는 데 있습니다.",
    image: steeringImage,
  },
  "products/automotive": {
    route: "products/automotive",
    eyebrow: "Automotive",
    title: "자동차",
    lead: "BSM, EV, Steering, Powertrain, Driveline 등 자동차 주요 시스템에 필요한 정밀 가공 부품을 생산합니다.",
    heroCopy: "도면 검토부터 샘플, 양산, 검사, 출하까지 자동차 부품 OEM 생산의 흐름을 안정적으로 연결합니다.",
    image: automotiveImage,
  },
  "products/industrial": {
    route: "products/industrial",
    eyebrow: "Industrial Machinery",
    title: "산업기계",
    lead: "고객 도면과 사용 환경에 맞춘 정밀 가공 부품으로 산업 현장의 동력 전달과 설비 안정성을 지원합니다.",
    heroCopy: "반복 정밀도, 표면 품질, 내구 조건을 기준으로 산업기계 부품의 생산 흐름을 설계합니다.",
    image: drivelineImage,
  },
  "support/news": {
    route: "support/news",
    eyebrow: "News",
    title: "News",
    lead: "제품군, 제조 공정, 품질 대응과 관련된 서울산업의 새로운 소식을 확인하세요.",
    heroCopy: "서울산업의 제조 역량과 고객지원 정보를 빠르게 볼 수 있도록 주요 소식을 모았습니다.",
    image: precisionHeroImage,
  },
  "support/contact": {
    route: "support/contact",
    eyebrow: "Contact",
    title: "문의하기",
    lead: "제품 개발, 양산 검토, 견적, 품질 관련 문의를 남겨 주시면 담당자가 확인 후 연락드립니다.",
    heroCopy: "도면과 생산 조건을 함께 공유해 주시면 더 정확한 검토와 회신이 가능합니다.",
    image: balanceModuleImage,
  },
  "recruit/guide": {
    route: "recruit/guide",
    eyebrow: "Recruit",
    title: "채용안내",
    lead: "정밀가공 현장과 품질 기준을 함께 만들어 갈 동료를 기다립니다.",
    heroCopy: "서울산업은 오래 갈 수 있는 제조 역량을 사람의 숙련도와 책임감에서 시작한다고 믿습니다.",
    image: steeringImage,
  },
  "recruit/jobs": {
    route: "recruit/jobs",
    eyebrow: "Job Opening",
    title: "채용공고",
    lead: "현재 모집 중인 직무와 지원 정보를 확인하세요.",
    heroCopy: "생산, 품질, 개발, 관리 각 영역에서 서울산업의 다음 제조 기준을 함께 만들 인재를 찾습니다.",
    image: drivelineImage,
  },
};

const productCards = [
  {
    title: "Balance Shaft Module",
    label: "BSM",
    copy: "진동 저감과 동력 효율을 위한 모듈 하우징, 샤프트, 관련 정밀 가공 부품을 생산합니다.",
    image: balanceModuleImage,
  },
  {
    title: "Electric Vehicle",
    label: "EV",
    copy: "전동화 플랫폼의 조립성과 내구 조건을 고려한 EV 정밀 가공 부품을 대응합니다.",
    image: automotiveImage,
  },
  {
    title: "Steering",
    label: "STEERING",
    copy: "조향 응답성과 내구성을 위한 Pinion Shaft 계열 부품과 조향 관련 부품을 공급합니다.",
    image: steeringImage,
  },
  {
    title: "Driveline",
    label: "DRIVELINE",
    copy: "동력 전달계의 반복 정밀도와 표면 품질을 기준으로 드라이브라인 부품을 생산합니다.",
    image: drivelineImage,
  },
];

const industrialCards = [
  {
    title: "도면 기반 가공",
    copy: "고객 도면과 사용 조건을 검토해 소재, 공차, 표면 품질 기준을 공정 조건으로 전환합니다.",
  },
  {
    title: "반복 생산 관리",
    copy: "초도품 검토부터 양산 전환까지 치수 변동과 공정 편차를 낮추는 기준을 유지합니다.",
  },
  {
    title: "출하 품질 대응",
    copy: "LOT 관리, 검사 기록, 납기 흐름을 함께 확인해 산업기계 부품의 안정 공급을 지원합니다.",
  },
];

const certificateCards = [
  { title: "IATF 16949", copy: "자동차 산업 품질경영 시스템 기준에 맞춘 제조 품질 관리 체계" },
  { title: "ISO 14001", copy: "환경영향과 자원 사용을 관리하는 환경경영 시스템" },
  { title: "SQ 인증", copy: "고객 품질 기준에 맞춘 자동차 부품 협력사 품질 인증" },
  { title: "INNOBIZ", copy: "기술 혁신형 중소기업으로서의 제조 기술 역량 인증" },
];

const esgReports = [
  { year: "2026", title: "ESG 운영 방향", copy: "환경, 안전, 품질 기록, 투명한 거래 기준을 중심으로 운영 방향을 정리합니다." },
  { year: "2025", title: "현장 개선 활동", copy: "에너지 절감, 불량 저감, 작업장 안전 개선 활동을 항목별로 관리합니다." },
  { year: "2024", title: "품질·윤리 기준", copy: "고객 요구사항과 공정 이력을 명확하게 남기는 품질 운영 기준을 정리합니다." },
];

const recruitSteps = [
  { title: "지원 접수", copy: "채용공고 확인 후 이력서와 자기소개서를 제출합니다." },
  { title: "서류 검토", copy: "직무 적합성과 경력, 성장 가능성을 함께 검토합니다." },
  { title: "면접", copy: "실무 이해도와 협업 방식, 현장 적응력을 중심으로 대화합니다." },
  { title: "입사 안내", copy: "최종 합격 후 근무 조건과 입사 일정을 안내합니다." },
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
  return (
    <section className="menu-hero" style={{ "--menu-hero-image": `url(${config.image})` } as CSSProperties}>
      <div className="menu-hero__image" aria-hidden="true" />
      <div className="menu-hero__inner">
        <span className="menu-hero__eyebrow">{config.eyebrow}</span>
        <h1>{config.title}</h1>
        <p>{config.heroCopy}</p>
      </div>
    </section>
  );
}

function PageLocation({ route }: { route: string }) {
  const { group, child } = findMenuByRoute(route);

  return (
    <div className="menu-location">
      <div className="menu-location__inner">
        <a className="menu-location__home" href="#/" aria-label="홈으로 이동">
          <BrainallLogo />
        </a>
        <span>{group.label}</span>
        <strong>{child.label}</strong>
      </div>
    </div>
  );
}

function DepthNavigation({ route }: { route: string }) {
  const { group } = findMenuByRoute(route);

  return (
    <nav className="menu-depth-nav" aria-label={`${group.label} 하위 메뉴`}>
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
    <div className="menu-grid-2 menu-reveal">
      <div className="menu-statement">
        <span>SEOUL INDUSTRY</span>
        <h3>정밀함을 공정으로 만들고, 신뢰를 납품으로 증명합니다.</h3>
        <p>
          서울산업은 자동차 부품 정밀가공을 기반으로 고객 도면 검토, 샘플 제작, 양산 조건 설정, 품질 검사, 출하까지 이어지는 과정을 책임 있게 관리합니다.
          작은 치수 편차가 완성차의 신뢰로 이어진다는 마음으로, 매일 같은 기준의 제조 현장을 만들겠습니다.
        </p>
      </div>
      <div className="menu-photo-card">
        <img src={precisionHeroImage} alt="정밀가공 부품과 제조 현장 이미지" />
      </div>
      <div className="menu-value-card">
        <b>01</b>
        <strong>도면 기반 개발 대응</strong>
        <p>고객 요구사항과 공차 조건을 검토해 생산 가능한 공정 기준으로 연결합니다.</p>
      </div>
      <div className="menu-value-card">
        <b>02</b>
        <strong>반복 정밀도 관리</strong>
        <p>설비 조건과 검사 결과를 함께 기록해 양산 중 품질 흔들림을 줄입니다.</p>
      </div>
    </div>
  );
}

function HistoryContent() {
  const eras = siteContent.ko.historyEras;

  return (
    <div className="menu-history menu-reveal">
      {eras.map((era) => (
        <article className="menu-history__era" key={era.period}>
          <div className="menu-history__year">{era.period}</div>
          <div className="menu-history__body">
            <h3>{era.title}</h3>
            <p>{era.summary}</p>
            <ul>
              {era.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}

function CertificatesContent() {
  return (
    <>
      <div className="menu-cert-layout menu-reveal">
        <div>
          <span className="menu-small-label">Quality Standard</span>
          <h3>고객이 요구하는 기준을 매일의 공정으로 관리합니다.</h3>
          <p>품질과 환경 인증, 기술 혁신 인증을 바탕으로 자동차 부품 OEM 생산에 필요한 기준을 유지합니다.</p>
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

function SustainabilityContent({ route }: { route: string }) {
  if (route.endsWith("governance")) {
    return (
      <div className="menu-card-grid menu-reveal">
        {[
          ["품질 기록", "도면 변경, 검사 결과, 공정 이력을 체계적으로 남겨 고객 요구사항에 대응합니다."],
          ["투명한 거래", "협력사와 고객 사이의 납기, 품질, 거래 기준을 명확하게 관리합니다."],
          ["책임 있는 운영", "현장 안전과 윤리 기준을 함께 보며 지속가능한 제조 기반을 유지합니다."],
        ].map(([title, copy]) => (
          <article className="menu-icon-card" key={title}>
            <Icon name="shield" />
            <strong>{title}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    );
  }

  if (route.endsWith("esg-report")) {
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

  return (
    <div className="menu-card-grid menu-reveal">
      {[
        ["에너지 절감", "설비 가동 효율과 공정 안정화를 함께 관리해 불필요한 에너지 사용을 줄입니다."],
        ["자원 관리", "재작업과 폐기 손실을 낮추고 소재 사용 흐름을 더 정교하게 관리합니다."],
        ["현장 기준", "환경 규제와 내부 기준을 생산 현장 안에서 확인하고 개선합니다."],
      ].map(([title, copy]) => (
        <article className="menu-icon-card" key={title}>
          <Icon name="leaf" />
          <strong>{title}</strong>
          <p>{copy}</p>
        </article>
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
          {industrialCards.map((card, index) => (
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
    <div className="menu-product-grid menu-reveal">
      {productCards.map((product) => (
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
  );
}

function NewsContent() {
  const posts = useMemo(() => getNoticePosts().slice(0, 5), []);

  return (
    <div className="menu-news-list menu-reveal">
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
            <dt>주소</dt>
            <dd>경기도 화성시 정밀가공 제조 현장</dd>
          </div>
          <div>
            <dt>문의분야</dt>
            <dd>제품 개발 · 견적 · 품질 · 채용</dd>
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

function RecruitContent({ route }: { route: string }) {
  if (route.endsWith("jobs")) {
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

  return (
    <div className="menu-recruit-steps menu-reveal">
      {recruitSteps.map((step, index) => (
        <article key={step.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step.title}</strong>
          <p>{step.copy}</p>
        </article>
      ))}
    </div>
  );
}

function PageBody({ route }: { route: string }) {
  if (route.startsWith("company/greeting")) return <GreetingContent />;
  if (route.startsWith("company/history")) return <HistoryContent />;
  if (route.startsWith("company/certificates")) return <CertificatesContent />;
  if (route.startsWith("sustainability/")) return <SustainabilityContent route={route} />;
  if (route.startsWith("products/")) return <ProductsContent route={route} />;
  if (route.startsWith("support/news")) return <NewsContent />;
  if (route.startsWith("support/contact")) return <ContactContent />;
  if (route.startsWith("recruit/")) return <RecruitContent route={route} />;
  return <GreetingContent />;
}

function MenuFooter() {
  return (
    <footer className="menu-footer">
      <div>
        <BrainallLogo />
        <strong>SEOUL INDUSTRY</strong>
      </div>
      <p>Precision Automotive Components OEM · Since 1985</p>
      <nav aria-label="하단 메뉴">
        {siteMenuGroups.map((group) => (
          <a href={group.href} key={group.label}>
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
  const config = pageConfigs[cleanRoute] ?? pageConfigs["company/greeting"];
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const stored = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(stored) ? stored : defaultLanguage;
  });
  const content = siteContent[language];

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
        <PageLocation route={cleanRoute} />
        <DepthNavigation route={cleanRoute} />
        <section className="menu-content-section">
          <PageTitle config={config} />
          <PageBody route={cleanRoute} />
        </section>
      </main>
      <MenuFooter />
    </div>
  );
}
