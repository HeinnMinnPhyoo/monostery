import type { Metadata } from "next";
import { PostsIndex } from "@/components/public/PostsIndex";
import { getPublishedPosts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "သတင်းများ",
  description: "အောင်သုခ မြန်မာကျောင်း၏ နောက်ဆုံးသတင်းများ"
};

export default async function PostsPage() {
  const posts = await getPublishedPosts();
  return <PostsIndex posts={posts} />;
}
