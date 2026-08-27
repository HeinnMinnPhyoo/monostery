export type Lang = "my" | "en";
export type Role = "superadmin" | "editor";
export type ContentStatus = "draft" | "published";

export type Profile = {
  id: string;
  email: string;
  role: Role;
  created_at: string;
};

export type Post = {
  id: string;
  slug: string;
  title_my: string;
  title_en: string;
  body_my: string;
  body_en: string;
  cover_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};

export type EventItem = {
  id: string;
  title_my: string;
  title_en: string;
  description_my: string;
  description_en: string;
  starts_at: string;
  ends_at: string | null;
  location_my: string;
  location_en: string;
  cover_url: string | null;
  status: ContentStatus;
  author_id: string | null;
  created_at: string;
  updated_at: string;
};
