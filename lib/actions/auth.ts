"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export async function loginAdmin(formData: FormData) {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase ကို .env.local တွင် ပြင်ဆင်ရန် လိုပါသည်။" };
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (!email || !password) {
    return { error: "အီးမေးလ်နှင့် စကားဝှက် ထည့်ပါ။" };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase client မဖန်တီးနိုင်ပါ။" };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "အီးမေးလ် သို့မဟုတ် စကားဝှက် မမှန်ပါ။" };

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAdmin() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/admin");
  redirect("/admin/login");
}
