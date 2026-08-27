"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import type { ContentStatus } from "@/lib/types";

function parseStatus(value: FormDataEntryValue | null): ContentStatus {
  return value === "published" ? "published" : "draft";
}

export async function saveEvent(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const id = String(formData.get("id") || "");
  const titleMy = String(formData.get("title_my") || "").trim();
  const titleEn = String(formData.get("title_en") || "").trim();
  const descriptionMy = String(formData.get("description_my") || "");
  const descriptionEn = String(formData.get("description_en") || "");
  const locationMy = String(formData.get("location_my") || "").trim();
  const locationEn = String(formData.get("location_en") || "").trim();
  const startsAt = String(formData.get("starts_at") || "");
  const endsAt = String(formData.get("ends_at") || "");
  const coverUrl = String(formData.get("cover_url") || "").trim() || null;
  const status = parseStatus(formData.get("status"));

  if (!titleMy) return { error: "မြန်မာခေါင်းစဉ် ထည့်ရန် လိုပါသည်။" };
  if (!startsAt) return { error: "စတင်မည့် ရက်စွဲ ထည့်ရန် လိုပါသည်။" };

  const payload = {
    title_my: titleMy,
    title_en: titleEn,
    description_my: descriptionMy,
    description_en: descriptionEn,
    location_my: locationMy,
    location_en: locationEn,
    starts_at: new Date(startsAt).toISOString(),
    ends_at: endsAt ? new Date(endsAt).toISOString() : null,
    cover_url: coverUrl,
    status,
    author_id: user.id,
    updated_at: new Date().toISOString()
  };

  if (id) {
    const { error } = await supabase.from("events").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { data, error } = await supabase.from("events").insert(payload).select("id").maybeSingle();
    if (error) return { error: error.message };
    revalidatePath("/", "layout");
    revalidatePath("/events");
    if (data?.id) revalidatePath(`/events/${data.id}`);
    revalidatePath("/admin");
    revalidatePath("/admin/events");
    redirect("/admin/events");
  }

  revalidatePath("/", "layout");
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return { error: "Missing event id" };

  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/events");
  redirect("/admin/events");
}
