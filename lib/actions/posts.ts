"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { ContentStatus } from "@/lib/types";

function parseStatus(value: FormDataEntryValue | null): ContentStatus {
  return value === "published" ? "published" : "draft";
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  base: string,
  ignoreId?: string
) {
  let slug = base;
  let attempt = 1;

  while (true) {
    let query = supabase.from("posts").select("id").eq("slug", slug);
    if (ignoreId) query = query.neq("id", ignoreId);
    const { data } = await query.limit(1);
    if (!data?.length) return slug;
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
}

export async function savePost(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const titleMy = String(formData.get("title_my") || "").trim();
  const titleEn = String(formData.get("title_en") || "").trim();
  const bodyMy = String(formData.get("body_my") || "");
  const bodyEn = String(formData.get("body_en") || "");
  const coverUrl = String(formData.get("cover_url") || "").trim() || null;
  const status = parseStatus(formData.get("status"));

  if (!titleMy) {
    return { error: "မြန်မာခေါင်းစဉ် ထည့်ရန် လိုပါသည်။" };
  }

  const slug = await uniqueSlug(supabase, slugify(titleEn, titleMy), id || undefined);
  const payload = {
    slug,
    title_my: titleMy,
    title_en: titleEn,
    body_my: bodyMy,
    body_en: bodyEn,
    cover_url: coverUrl,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    author_id: user.id,
    updated_at: new Date().toISOString()
  };

  if (id) {
    const existing = await supabase.from("posts").select("published_at").eq("id", id).maybeSingle();
    if (status === "published" && existing.data?.published_at) {
      payload.published_at = existing.data.published_at;
    }
    const { error } = await supabase.from("posts").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase.from("posts").insert(payload);
    if (error) return { error: error.message };
  }

  revalidatePath("/", "layout");
  revalidatePath("/posts");
  revalidatePath(`/posts/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return { error: "Missing post id" };

  const { data } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/posts");
  if (data?.slug) revalidatePath(`/posts/${data.slug}`);
  revalidatePath("/admin");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}
