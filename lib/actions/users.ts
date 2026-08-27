"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { requireSuperadmin } from "@/lib/auth";
import { createServiceSupabaseClient } from "@/lib/supabase/admin";
import type { Role } from "@/lib/types";

function generatePassword() {
  return randomBytes(9).toString("base64url");
}

export async function addAdmin(formData: FormData) {
  const { profile: actor } = await requireSuperadmin();
  const admin = createServiceSupabaseClient();
  if (!admin) return { error: "SUPABASE_SERVICE_ROLE_KEY ကို .env.local တွင် ထည့်ရန် လိုပါသည်။" };

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const role = (String(formData.get("role") || "editor") === "superadmin" ? "superadmin" : "editor") as Role;

  if (!email) return { error: "အီးမေးလ် ထည့်ပါ။" };
  if (email === actor.email) return { error: "ကိုယ့်အကောင့်ကို ထပ်ထည့်၍ မရပါ။" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const temporaryPassword = generatePassword();

  const invited = await admin.auth.admin.inviteUserByEmail(email, {
    data: { role },
    redirectTo: `${siteUrl}/admin/login`
  });

  let userId = invited.data.user?.id ?? null;
  let passwordToShow: string | null = null;

  if (invited.error || !userId) {
    const created = await admin.auth.admin.createUser({
      email,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: { role }
    });
    if (created.error || !created.data.user) {
      return { error: invited.error?.message || created.error?.message || "Admin ထည့်၍ မရပါ။" };
    }
    userId = created.data.user.id;
    passwordToShow = temporaryPassword;
  }

  const { error: profileError } = await admin.from("profiles").upsert({
    id: userId,
    email,
    role
  });
  if (profileError) return { error: profileError.message };

  revalidatePath("/admin/users");
  return {
    ok: true as const,
    password: passwordToShow,
    message: passwordToShow
      ? "Admin အကောင့် ဖန်တီးပြီးပါပြီ။ အောက်ပါ ယာယီစကားဝှက်ကို မျှဝေပါ။"
      : "ဖိတ်ကြားစာ ပို့ပြီးပါပြီ။ အီးမေးလ် စစ်ဆေးခိုင်းပါ။"
  };
}

export async function removeAdmin(formData: FormData): Promise<void> {
  const { profile: actor } = await requireSuperadmin();
  const admin = createServiceSupabaseClient();
  if (!admin) throw new Error("SUPABASE_SERVICE_ROLE_KEY ကို .env.local တွင် ထည့်ရန် လိုပါသည်။");

  const id = String(formData.get("id") || "");
  if (!id) return;
  if (id === actor.id) throw new Error("ကိုယ့်အကောင့်ကို ဖယ်၍ မရပါ။");

  const { data: target } = await admin.from("profiles").select("role").eq("id", id).maybeSingle();
  if (target?.role === "superadmin") {
    const { count } = await admin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "superadmin");
    if ((count ?? 0) <= 1) throw new Error("နောက်ဆုံး superadmin ကို ဖယ်၍ မရပါ။");
  }

  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}

export async function updateAdminRole(formData: FormData): Promise<void> {
  const { profile: actor } = await requireSuperadmin();
  const admin = createServiceSupabaseClient();
  if (!admin) throw new Error("SUPABASE_SERVICE_ROLE_KEY ကို .env.local တွင် ထည့်ရန် လိုပါသည်။");

  const id = String(formData.get("id") || "");
  const role = (String(formData.get("role") || "editor") === "superadmin" ? "superadmin" : "editor") as Role;
  if (!id) return;
  if (id === actor.id && role !== "superadmin") {
    throw new Error("ကိုယ့် superadmin အခွင့်အရေးကို လျှော့၍ မရပါ။");
  }

  const { error } = await admin.from("profiles").update({ role }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}
