import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostDetail } from "@/components/public/PostDetail";
import { getPublishedPostBySlug } from "@/lib/queries";
import { excerpt } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "သတင်း" };

  return {
    title: post.title_my,
    description: excerpt(post.body_my || post.body_en, 160),
    openGraph: {
      title: post.title_my,
      description: excerpt(post.body_my || post.body_en, 160),
      images: post.cover_url ? [post.cover_url] : undefined,
      type: "article"
    }
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();
  return <PostDetail post={post} />;
}
