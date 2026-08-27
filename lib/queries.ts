import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { EventItem, Post } from "@/lib/types";

export async function getPublishedPosts(limit?: number) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as Post[];

  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getPublishedPosts", error.message);
    return [];
  }
  return ((data ?? []) as Post[]).filter((post) => post.status === "published");
}

export async function getPublishedPostBySlug(slug: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPublishedPostBySlug", error.message);
    return null;
  }
  if (!data || data.status !== "published") return null;
  return data as Post;
}

export async function getAllPostsForAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as Post[];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("getAllPostsForAdmin", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPostByIdForAdmin(id: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("getPostByIdForAdmin", error.message);
    return null;
  }
  return (data as Post | null) ?? null;
}

export async function getPublishedEvents() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as EventItem[];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .order("starts_at", { ascending: true });

  if (error) {
    console.error("getPublishedEvents", error.message);
    return [];
  }
  return ((data ?? []) as EventItem[]).filter((event) => event.status === "published");
}

export function splitEvents(events: EventItem[]) {
  const now = Date.now();
  const upcoming: EventItem[] = [];
  const past: EventItem[] = [];

  for (const event of events) {
    const end = new Date(event.ends_at || event.starts_at).getTime();
    if (end >= now) upcoming.push(event);
    else past.push(event);
  }

  upcoming.sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
  past.sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
  return { upcoming, past };
}

export async function getPublishedEventById(id: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPublishedEventById", error.message);
    return null;
  }
  if (!data || data.status !== "published") return null;
  return data as EventItem;
}

export async function getAllEventsForAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [] as EventItem[];

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  if (error) {
    console.error("getAllEventsForAdmin", error.message);
    return [];
  }
  return (data ?? []) as EventItem[];
}

export async function getEventByIdForAdmin(id: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error) {
    console.error("getEventByIdForAdmin", error.message);
    return null;
  }
  return (data as EventItem | null) ?? null;
}
