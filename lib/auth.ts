import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export async function getSessionUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { supabase: null, user: null, profile: null as Profile | null };

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, profile: null as Profile | null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return { supabase, user, profile: profile as Profile | null };
}

export async function requireAdmin() {
  const session = await getSessionUser();
  if (!session.supabase || !session.user || !session.profile) {
    redirect("/admin/login");
  }
  return {
    supabase: session.supabase,
    user: session.user,
    profile: session.profile
  };
}

export async function requireSuperadmin() {
  const session = await requireAdmin();
  if (session.profile.role !== "superadmin") {
    redirect("/admin");
  }
  return session;
}
