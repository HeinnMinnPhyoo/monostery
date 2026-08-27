"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createServiceSupabaseClient } from "@/lib/supabase/admin";

export async function listMedia() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.storage.from("media").list("", {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" }
  });
  if (error) return { files: [], error: error.message };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const files = (data ?? [])
    .filter((file) => file.name && file.metadata && !file.name.startsWith("."))
    .map((file) => ({
      name: file.name,
      url: `${url}/storage/v1/object/public/media/${file.name}`,
      createdAt: file.created_at
    }));

  return { files };
}

export async function deleteMedia(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = String(formData.get("name") || "");
  if (!name) return;

  const admin = createServiceSupabaseClient();
  const client = admin ?? (await requireAdmin()).supabase;
  const { error } = await client.storage.from("media").remove([name]);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/media");
}
