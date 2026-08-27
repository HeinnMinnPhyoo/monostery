import { HomePage } from "@/components/public/HomePage";
import { getPublishedEvents, getPublishedPosts, splitEvents } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [posts, events] = await Promise.all([getPublishedPosts(3), getPublishedEvents()]);
  const { upcoming } = splitEvents(events);

  return <HomePage posts={posts} upcomingEvents={upcoming.slice(0, 3)} />;
}
