import type { Metadata } from "next";
import { EventsIndex } from "@/components/public/EventsIndex";
import { getPublishedEvents, splitEvents } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ပွဲတော်များ",
  description: "လာမည့်ပွဲတော်များနှင့် ပြီးသွားသော ပွဲများ"
};

export default async function EventsPage() {
  const events = await getPublishedEvents();
  const { upcoming, past } = splitEvents(events);
  return <EventsIndex upcoming={upcoming} past={past} />;
}
