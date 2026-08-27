import type { Lang } from "@/lib/types";

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function pickLocale(
  lang: Lang,
  myValue: string | null | undefined,
  enValue: string | null | undefined
) {
  if (lang === "en" && enValue?.trim()) return enValue;
  return myValue?.trim() || enValue?.trim() || "";
}

export function slugify(titleEn: string, titleMy: string) {
  const source = titleEn.trim() || titleMy.trim();
  const slug = source
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);

  return slug || `post-${Date.now()}`;
}

export function formatDate(value: string, lang: Lang) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "my-MM", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export function excerpt(text: string, length = 140) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= length) return compact;
  return `${compact.slice(0, length).trim()}…`;
}

export function toDatetimeLocal(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
