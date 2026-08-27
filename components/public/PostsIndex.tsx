"use client";

import Link from "next/link";
import { SiteNav } from "@/components/public/SiteNav";
import { useLanguage } from "@/lib/i18n/language-context";
import { excerpt, formatDate, pickLocale } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function PostsIndex({ posts }: { posts: Post[] }) {
  const { t, lang } = useLanguage();

  return (
    <>
      <header className="page-header" id="top">
        <SiteNav />
      </header>
      <main className="inner-main">
        <h2>{t("navPosts")}</h2>
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
      </main>
    </>
  );
}
