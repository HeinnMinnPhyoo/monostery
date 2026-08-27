-- Aung Thukha monastery CMS schema
-- Run this in the Supabase SQL editor (or via supabase db push).
-- After running: Storage > create is handled below; first Auth user becomes superadmin.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('superadmin', 'editor');
  end if;
  if not exists (select 1 from pg_type where typname = 'content_status') then
    create type public.content_status as enum ('draft', 'published');
  end if;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role public.user_role not null default 'editor',
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_my text not null,
  title_en text not null default '',
  body_my text not null default '',
  body_en text not null default '',
  cover_url text,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title_my text not null,
  title_en text not null default '',
  description_my text not null default '',
  description_en text not null default '',
  starts_at timestamptz not null,
  ends_at timestamptz,
  location_my text not null default '',
  location_en text not null default '',
  cover_url text,
  status public.content_status not null default 'draft',
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute procedure public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  assigned_role public.user_role;
begin
  assigned_role := coalesce(nullif(new.raw_user_meta_data->>'role', '')::public.user_role, 'editor');

  if not exists (select 1 from public.profiles) then
    assigned_role := 'superadmin';
  end if;

  insert into public.profiles (id, email, role)
  values (new.id, coalesce(new.email, ''), assigned_role)
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

create or replace function public.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'superadmin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.events enable row level security;

drop policy if exists "admins read profiles" on public.profiles;
create policy "admins read profiles"
  on public.profiles for select
  using (public.is_admin());

drop policy if exists "superadmin update profiles" on public.profiles;
create policy "superadmin update profiles"
  on public.profiles for update
  using (public.is_superadmin())
  with check (public.is_superadmin());

drop policy if exists "superadmin delete profiles" on public.profiles;
create policy "superadmin delete profiles"
  on public.profiles for delete
  using (public.is_superadmin());

drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts"
  on public.posts for select
  using (status = 'published');

drop policy if exists "admins read all posts" on public.posts;
create policy "admins read all posts"
  on public.posts for select
  using (public.is_admin());

drop policy if exists "admins insert posts" on public.posts;
create policy "admins insert posts"
  on public.posts for insert
  with check (public.is_admin());

drop policy if exists "admins update posts" on public.posts;
create policy "admins update posts"
  on public.posts for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete posts" on public.posts;
create policy "admins delete posts"
  on public.posts for delete
  using (public.is_admin());

drop policy if exists "public read published events" on public.events;
create policy "public read published events"
  on public.events for select
  using (status = 'published');

drop policy if exists "admins read all events" on public.events;
create policy "admins read all events"
  on public.events for select
  using (public.is_admin());

drop policy if exists "admins insert events" on public.events;
create policy "admins insert events"
  on public.events for insert
  with check (public.is_admin());

drop policy if exists "admins update events" on public.events;
create policy "admins update events"
  on public.events for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins delete events" on public.events;
create policy "admins delete events"
  on public.events for delete
  using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read media" on storage.objects;
create policy "public read media"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "admins upload media" on storage.objects;
create policy "admins upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admins update media" on storage.objects;
create policy "admins update media"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admins delete media" on storage.objects;
create policy "admins delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());
