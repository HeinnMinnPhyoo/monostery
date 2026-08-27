"use client";

import { SiteNav } from "@/components/public/SiteNav";
import { useLanguage } from "@/lib/i18n/language-context";
import { formatDate, pickLocale } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

export function EventDetail({ event }: { event: EventItem }) {
  const { t, lang } = useLanguage();
  const title = pickLocale(lang, event.title_my, event.title_en);
  const description = pickLocale(lang, event.description_my, event.description_en);
  const location = pickLocale(lang, event.location_my, event.location_en);

  return (
    <>
      <header className="page-header" id="top">
        <SiteNav />
      </header>
      <main className="inner-main">
        <article className="card">
          {event.cover_url ? (
            <div className="article-hero">
              <img src={event.cover_url} alt="" />
            </div>
          ) : null}
          <h2>{title}</h2>
          <p>
            <strong>{t("eventWhen")}:</strong> {formatDate(event.starts_at, lang)}
            {event.ends_at ? ` – ${formatDate(event.ends_at, lang)}` : ""}
          </p>
          {location ? (
            <p>
              <strong>{t("eventWhere")}:</strong> {location}
            </p>
          ) : null}
          <div className="article-body">{description}</div>
        </article>
      </main>
    </>
  );
}
