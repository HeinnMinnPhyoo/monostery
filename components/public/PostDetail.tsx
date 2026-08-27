"use client";

import { SiteNav } from "@/components/public/SiteNav";
import { useLanguage } from "@/lib/i18n/language-context";
import { formatDate, pickLocale } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function PostDetail({ post }: { post: Post }) {
  const { t, lang } = useLanguage();
  const title = pickLocale(lang, post.title_my, post.title_en);
  const body = pickLocale(lang, post.body_my, post.body_en);

  return (
    <>
      <header className="page-header" id="top">
        <SiteNav />
      </header>
      <main className="inner-main">
        <article className="card">
          {post.cover_url ? (
            <div className="article-hero">
              <img src={post.cover_url} alt="" />
            </div>
          ) : null}
          <p className="muted">
            {t("publishedOn")}{" "}
            {post.published_at ? formatDate(post.published_at, lang) : ""}
          </p>
          <h2>{title}</h2>
          <div className="article-body">{body}</div>
        </article>
      </main>
    </>
  );
}
