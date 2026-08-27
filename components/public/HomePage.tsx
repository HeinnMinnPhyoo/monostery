"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { GALLERY_IMAGES } from "@/lib/i18n/translations";
import { excerpt, formatDate, pickLocale } from "@/lib/utils";
import type { EventItem, Post } from "@/lib/types";

type HomePageProps = {
  posts: Post[];
  upcomingEvents: EventItem[];
};

export function HomePage({ posts, upcomingEvents }: HomePageProps) {
  const { t, lang } = useLanguage();

  return (
    <>
      <header className="hero" id="top">
        <SiteNavInner />
        <div className="hero-content">
          <p className="tag">{t("heroTag")}</p>
          <h2>{t("heroTitle")}</h2>
          <p>{t("heroText")}</p>
        </div>
      </header>

      <main className="page-main">
        <section className="section card">
          <h3>{t("aboutTitle")}</h3>
          <p>{t("aboutText")}</p>
        </section>

        <section className="section">
          <div className="section-head">
            <h3>{t("upcomingTitle")}</h3>
            <Link href="/events">{t("viewAll")}</Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="empty-state">{t("emptyEvents")}</p>
          ) : (
            <div className="card-grid">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} className="card content-card">
                  {event.cover_url ? <img src={event.cover_url} alt="" /> : null}
                  <div className="content-card-body">
                    <p className="muted">{formatDate(event.starts_at, lang)}</p>
                    <h3>{pickLocale(lang, event.title_my, event.title_en)}</h3>
                    <p>
                      {excerpt(pickLocale(lang, event.description_my, event.description_en) || t("readMore"))}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-head">
            <h3>{t("latestPostsTitle")}</h3>
            <Link href="/posts">{t("viewAll")}</Link>
          </div>
          {posts.length === 0 ? (
            <p className="empty-state">{t("emptyPosts")}</p>
          ) : (
            <div className="card-grid">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.slug}`} className="card content-card">
                  {post.cover_url ? <img src={post.cover_url} alt="" /> : null}
                  <div className="content-card-body">
                    <p className="muted">
                      {post.published_at ? formatDate(post.published_at, lang) : ""}
                    </p>
                    <h3>{pickLocale(lang, post.title_my, post.title_en)}</h3>
                    <p>{excerpt(pickLocale(lang, post.body_my, post.body_en))}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="section details">
          <article className="card">
            <h3>{t("addressTitle")}</h3>
            <p>{t("addressText")}</p>
          </article>
          <article className="card">
            <h3>{t("scheduleTitle")}</h3>
            <ul>
              <li>{t("schedule1")}</li>
              <li>{t("schedule2")}</li>
              <li>{t("schedule3")}</li>
              <li>{t("schedule4")}</li>
            </ul>
          </article>
        </section>

        <section className="section" id="gallery">
          <h3>{t("galleryTitle")}</h3>
          <div className="gallery">
            {GALLERY_IMAGES.map((image) => (
              <img key={image.src} src={image.src} alt={lang === "en" ? image.altEn : image.altMy} />
            ))}
          </div>
        </section>

        <section className="section card" id="contact">
          <h3>{t("contactTitle")}</h3>
          <p>{t("contactText")}</p>
          <p className="address">{t("addressPin")}</p>
          <p className="social-link">
            <a
              href="https://www.facebook.com/7s1rygnaw9"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("facebookLabel")}
            </a>
          </p>
        </section>
      </main>
    </>
  );
}

function SiteNavInner() {
  const { t, lang, setLang } = useLanguage();

  return (
    <nav className="nav">
      <h1>{t("siteName")}</h1>
      <div className="nav-actions">
        <div className="nav-links">
          <Link href="/">{t("navHome")}</Link>
          <Link href="/posts">{t("navPosts")}</Link>
          <Link href="/events">{t("navEvents")}</Link>
          <a href="#gallery">{t("navGallery")}</a>
        </div>
        <div className="lang-switch" aria-label="Language switcher">
          <button
            type="button"
            className={`lang-btn${lang === "my" ? " active" : ""}`}
            onClick={() => setLang("my")}
          >
            မြန်မာ
          </button>
          <button
            type="button"
            className={`lang-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
          >
            English
          </button>
        </div>
        <a href="#contact" className="btn">
          {t("contactBtn")}
        </a>
      </div>
    </nav>
  );
}
