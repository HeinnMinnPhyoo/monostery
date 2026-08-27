import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/public/EventDetail";
import { getPublishedEventById } from "@/lib/queries";
import { excerpt } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const event = await getPublishedEventById(id);
  if (!event) return { title: "ပွဲတော်" };

  return {
    title: event.title_my,
    description: excerpt(event.description_my || event.description_en, 160),
    openGraph: {
      title: event.title_my,
      description: excerpt(event.description_my || event.description_en, 160),
      images: event.cover_url ? [event.cover_url] : undefined
    }
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = await getPublishedEventById(id);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
