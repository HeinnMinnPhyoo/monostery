import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getPostByIdForAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostByIdForAdmin(id);
  if (!post) notFound();

  return (
    <>
      <div className="admin-top">
        <h2>ပို့စ် ပြင်ဆင်ရန်</h2>
      </div>
      <PostForm post={post} />
    </>
  );
}
