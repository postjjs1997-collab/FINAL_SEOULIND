import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import certificationImage from "../../certification.png";
import balanceModuleImage from "../../housing.png";
import automotiveImage from "../../electric vehicle.png";
import steeringImage from "../../steering.png";
import drivelineImage from "../../driveline.png";
import precisionImage from "../../precision-inside-mobility.jpg";
import Icon from "./Icons";
import { getPageConfig } from "./MenuPage";
import { RenewalSiteFooter, RenewalSiteHeader, toRenewalHref, type RenewalLanguage } from "./RenewalShell";
import { defaultLanguage, isLanguageCode, siteContent, type SiteContent } from "../data/siteContent";
import { getNoticePosts } from "../data/notices";
import { findMenuByRoute, getSiteMenuGroups } from "../data/navigation";
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

const certificateDetails: Record<RenewalLanguage, Array<{ title: string; copy: string }>> = {
  ko: [
    { title: "IATF 16949:2016", copy: "자동차 산업 품질경영 시스템 기준에 맞춘 제조 품질 관리 체계" },
    { title: "ISO 14001:2015", copy: "환경영향과 자원 사용을 관리하기 위한 환경경영 시스템" },
    { title: "ISO 9001", copy: "제품과 공정 품질을 일관되게 유지하기 위한 품질경영 기준" },
    { title: "SQ 인증", copy: "현대모비스 협력사 품질 기준에 맞춘 특수공정 관리 체계" },
    { title: "INNOBIZ", copy: "기술혁신형 중소기업으로서의 제조 기술 역량 인증" },
    { title: "VDA 6.3", copy: "자동차 부품 제조 공정의 프로세스 감사 대응 기준" },
    { title: "CQI-9", copy: "고주파 열처리 특수공정의 품질 평가 및 관리 기준" },
    { title: "CQI-15", copy: "레이저 용접 특수공정의 품질 평가 및 관리 기준" },
  ],
  en: [
    { title: "IATF 16949:2016", copy: "Automotive quality management system for controlled manufacturing operations" },
    { title: "ISO 14001:2015", copy: "Environmental management system for impacts, resources, and compliance" },
    { title: "ISO 9001", copy: "Quality management standard for consistent products and processes" },
    { title: "SQ Certification", copy: "Special-process quality system aligned with Hyundai Mobis supplier standards" },
    { title: "INNOBIZ", copy: "Technology innovation certification for manufacturing capability" },
    { title: "VDA 6.3", copy: "Process audit standard for automotive component manufacturing" },
    { title: "CQI-9", copy: "Special-process assessment standard for induction heat treatment" },
    { title: "CQI-15", copy: "Special-process assessment standard for laser welding" },
  ],
  ja: [
    { title: "IATF 16949:2016", copy: "自動車産業の品質マネジメントシステムに基づく製造品質管理体系" },
    { title: "ISO 14001:2015", copy: "環境影響と資源使用を管理する環境マネジメントシステム" },
    { title: "ISO 9001", copy: "製品と工程品質を一貫して維持するための品質基準" },
    { title: "SQ認証", copy: "現代モービスの協力会社品質基準に合わせた特殊工程管理体系" },
    { title: "INNOBIZ", copy: "技術革新型中小企業としての製造技術力認証" },
    { title: "VDA 6.3", copy: "自動車部品製造工程のプロセス監査基準" },
    { title: "CQI-9", copy: "高周波熱処理の特殊工程品質評価基準" },
    { title: "CQI-15", copy: "レーザー溶接の特殊工程品質評価基準" },
  ],
};

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

function GreetingBody({ content, config }: { content: SiteContent; config: ReturnType<typeof getPageConfig> }) {
  return (
    <>
      <section className="renewal-sub-statement">
        <div data-sub-reveal>
          <span>SEOUL INDUSTRY · SINCE 1985</span>
          <h2>{config.lead}</h2>
        </div>
        <figure data-sub-reveal>
          <img src={precisionImage} alt="" />
        </figure>
        <p data-sub-reveal>{config.heroCopy}</p>
      </section>
      <CapabilityGrid content={content} />
    </>
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
  return (
    <>
      <section className="renewal-sub-cert-visual" data-sub-reveal>
        <div>
          <span>QUALITY SYSTEM</span>
          <h2>Certified manufacturing standards</h2>
        </div>
        <img src={certificationImage} alt="Seoul Industry certification overview" />
      </section>
      <section className="renewal-sub-cert-grid">
        {certificateDetails[language].map((certificate, index) => (
          <article data-sub-reveal key={certificate.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{certificate.title}</h3>
            <p>{certificate.copy}</p>
          </article>
        ))}
      </section>
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
          <a href="#/support/contact">
            <Icon name="arrow" />
          </a>
        </article>
      ))}
    </section>
  );
}

function RouteBody({
  route,
  language,
  content,
  config,
}: {
  route: string;
  language: RenewalLanguage;
  content: SiteContent;
  config: ReturnType<typeof getPageConfig>;
}) {
  if (route === "company/greeting") return <GreetingBody content={content} config={config} />;
  if (route === "company/history") return <HistoryBody content={content} />;
  if (route === "company/certificates") return <CertificatesBody language={language} />;
  if (route === "sustainability/environmental") return <EnvironmentalBody content={content} />;
  if (route === "sustainability/governance") return <GovernanceBody language={language} />;
  if (route === "sustainability/esg-report") return <ReportBody language={language} />;
  if (route === "products/automotive") return <AutomotiveBody content={content} />;
  if (route === "products/industrial") return <IndustrialBody content={content} />;
  if (route === "support/news") return <NewsBody language={language} content={content} />;
  if (route === "support/contact") return <ContactBody language={language} />;
  if (route === "recruit/guide") return <RecruitGuideBody language={language} />;
  if (route === "recruit/jobs") return <JobsBody language={language} />;
  return <GreetingBody content={content} config={config} />;
}

function RenewalSubNavigation({ route, language }: { route: string; language: RenewalLanguage }) {
  const groups = getSiteMenuGroups(language);
  const { group, child } = findMenuByRoute(route, language);

  return (
    <div className="renewal-sub-navigation">
      <div className="renewal-sub-breadcrumb">
        <a href="#/">{uiCopy[language].home}</a>
        <span>{group.label}</span>
        <strong>{child.label}</strong>
      </div>
      <nav className="renewal-sub-categories" aria-label="Renewal categories">
        {groups.map((item) => (
          <a className={item.label === group.label ? "is-active" : ""} href={toRenewalHref(item.href)} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
      <nav className="renewal-sub-depth" aria-label={`${group.label} submenu`}>
        {group.children.map((item) => (
          <a className={item.label === child.label ? "is-active" : ""} href={toRenewalHref(item.href)} key={item.label}>
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
  const cleanRoute = route.replace(/^renewal\/?/, "").replace(/\/$/, "") || "company/greeting";
  const reducedMotion = usePrefersReducedMotion();
  const [language, setLanguage] = useState<RenewalLanguage>(() => {
    if (typeof window === "undefined") return defaultLanguage;
    const saved = window.localStorage.getItem("seoulind-language");
    return isLanguageCode(saved) ? saved : defaultLanguage;
  });
  const content = siteContent[language];
  const config = useMemo(() => {
    const pageConfig = getPageConfig(cleanRoute, language);
    if (cleanRoute !== "sustainability/governance") return pageConfig;

    return {
      ...pageConfig,
      title: language === "ko" ? "윤리경영" : language === "ja" ? "ガバナンス" : pageConfig.title,
    };
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
        <section className="renewal-sub-hero" style={{ "--renewal-sub-image": `url(${config.image})` } as React.CSSProperties}>
          <div className="renewal-sub-hero__image" />
          <div className="renewal-sub-hero__shade" />
          <div className="renewal-sub-hero__index">
            <span>{config.category}</span>
            <strong>{config.groupTitle}</strong>
          </div>
          <div className="renewal-sub-hero__content">
            <span>{config.eyebrow}</span>
            <h1>{config.title}</h1>
            <p>{config.heroCopy}</p>
          </div>
          <div className="renewal-sub-hero__line" aria-hidden="true">
            <span />
          </div>
        </section>

        <RenewalSubNavigation route={cleanRoute} language={language} />

        <section className="renewal-sub-intro">
          <span data-sub-reveal>{uiCopy[language].overview}</span>
          <h2 data-sub-reveal>{config.lead}</h2>
          <p data-sub-reveal>{config.heroCopy}</p>
        </section>

        <div className="renewal-sub-body">
          <RouteBody route={cleanRoute} language={language} content={content} config={config} />
        </div>

        <NextPage route={cleanRoute} language={language} />
      </main>
      <RenewalSiteFooter language={language} />
    </div>
  );
}
