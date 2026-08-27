"use client";

import Link from "next/link";
import { SiteNav } from "@/components/public/SiteNav";
import { useLanguage } from "@/lib/i18n/language-context";
import { excerpt, formatDate, pickLocale } from "@/lib/utils";
import type { EventItem } from "@/lib/types";

export function EventsIndex({
  upcoming,
  past
}: {
  upcoming: EventItem[];
  past: EventItem[];
}) {
  const { t, lang } = useLanguage();

  return (
    <>
      <header className="page-header" id="top">
        <SiteNav />
      </header>
      <main className="inner-main">
        <section className="section">
          <h2>{t("upcomingTitle")}</h2>
          {upcoming.length === 0 ? (
            <p className="empty-state">{t("emptyEvents")}</p>
          ) : (
            <div className="card-grid">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} lang={lang} />
              ))}
            </div>
          )}
        </section>

        {past.length > 0 ? (
          <section className="section">
            <h2>{t("pastEventsTitle")}</h2>
            <div className="card-grid">
              {past.map((event) => (
                <EventCard key={event.id} event={event} lang={lang} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

function EventCard({ event, lang }: { event: EventItem; lang: "my" | "en" }) {
  return (
    <Link href={`/events/${event.id}`} className="card content-card">
      {event.cover_url ? <img src={event.cover_url} alt="" /> : null}
      <div className="content-card-body">
        <p className="muted">{formatDate(event.starts_at, lang)}</p>
        <h3>{pickLocale(lang, event.title_my, event.title_en)}</h3>
        <p>{excerpt(pickLocale(lang, event.description_my, event.description_en))}</p>
      </div>
    </Link>
  );
}
