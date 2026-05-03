
-- Enums
create type public.app_role as enum ('user', 'dentist', 'admin');
create type public.audience_type as enum ('kids', 'adults', 'pregnant', 'general');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  audience audience_type default 'general',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles for select using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Admins manage roles" on public.user_roles for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Auto-create profile + default role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)), new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  insert into public.user_roles (user_id, role) values (new.id, 'user') on conflict do nothing;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- Dentist profiles
create table public.dentist_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text not null,
  license_number text,
  specialty text,
  bio text,
  city text,
  country text,
  clinic_name text,
  website text,
  verified boolean not null default false,
  subscription_active boolean not null default false,
  avg_rating numeric(3,2) default 0,
  reviews_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.dentist_profiles enable row level security;
create policy "Dentist profiles public" on public.dentist_profiles for select using (true);
create policy "Dentist self insert" on public.dentist_profiles for insert with check (auth.uid() = user_id);
create policy "Dentist self update" on public.dentist_profiles for update using (auth.uid() = user_id or public.has_role(auth.uid(),'admin'));
create policy "Admin delete dentist" on public.dentist_profiles for delete using (public.has_role(auth.uid(),'admin'));

-- Learning modules
create table public.learning_modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  content text,
  audience audience_type not null default 'general',
  level text default 'beginner',
  cover_image text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.learning_modules enable row level security;
create policy "Learning public read" on public.learning_modules for select using (published or public.has_role(auth.uid(),'admin'));
create policy "Admin manage learning" on public.learning_modules for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Blog
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image text,
  author_id uuid references auth.users(id) on delete set null,
  published boolean not null default true,
  published_at timestamptz default now(),
  created_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
create policy "Blog public read" on public.blog_posts for select using (published or public.has_role(auth.uid(),'admin'));
create policy "Admin manage blog" on public.blog_posts for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Forums
create table public.forum_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  audience audience_type not null default 'general'
);
alter table public.forum_categories enable row level security;
create policy "Categories public read" on public.forum_categories for select using (true);
create policy "Admin manage categories" on public.forum_categories for all using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.forum_categories(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.forum_posts enable row level security;
create policy "Posts public read" on public.forum_posts for select using (true);
create policy "Auth users can post" on public.forum_posts for insert with check (auth.uid() = author_id);
create policy "Author can update post" on public.forum_posts for update using (auth.uid() = author_id);
create policy "Author or admin delete" on public.forum_posts for delete using (auth.uid() = author_id or public.has_role(auth.uid(),'admin'));

create table public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.forum_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.forum_comments enable row level security;
create policy "Comments public read" on public.forum_comments for select using (true);
create policy "Auth users can comment" on public.forum_comments for insert with check (auth.uid() = author_id);
create policy "Author update comment" on public.forum_comments for update using (auth.uid() = author_id);
create policy "Author or admin delete comment" on public.forum_comments for delete using (auth.uid() = author_id or public.has_role(auth.uid(),'admin'));

-- Live sessions
create table public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  dentist_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  scheduled_at timestamptz not null,
  duration_minutes int default 60,
  external_link text not null,
  audience audience_type default 'general',
  created_at timestamptz not null default now()
);
alter table public.live_sessions enable row level security;
create policy "Sessions public read" on public.live_sessions for select using (true);
create policy "Verified dentists create" on public.live_sessions for insert with check (auth.uid() = dentist_id and public.has_role(auth.uid(),'dentist'));
create policy "Dentist update own session" on public.live_sessions for update using (auth.uid() = dentist_id);
create policy "Dentist or admin delete" on public.live_sessions for delete using (auth.uid() = dentist_id or public.has_role(auth.uid(),'admin'));

create table public.session_rsvps (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined boolean not null default false,
  created_at timestamptz not null default now(),
  unique (session_id, user_id)
);
alter table public.session_rsvps enable row level security;
create policy "User reads own rsvps" on public.session_rsvps for select using (auth.uid() = user_id);
create policy "User insert rsvp" on public.session_rsvps for insert with check (auth.uid() = user_id);
create policy "User update rsvp" on public.session_rsvps for update using (auth.uid() = user_id);

create table public.session_reviews (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  review text,
  created_at timestamptz not null default now(),
  unique (session_id, user_id)
);
alter table public.session_reviews enable row level security;
create policy "Reviews public read" on public.session_reviews for select using (true);
create policy "User insert review" on public.session_reviews for insert with check (auth.uid() = user_id);
create policy "User update own review" on public.session_reviews for update using (auth.uid() = user_id);

-- Recompute dentist average rating
create or replace function public.recompute_dentist_rating()
returns trigger language plpgsql security definer set search_path = public as $$
declare _dentist uuid;
begin
  select dentist_id into _dentist from public.live_sessions where id = coalesce(new.session_id, old.session_id);
  update public.dentist_profiles d
    set avg_rating = coalesce((select avg(r.rating)::numeric(3,2) from public.session_reviews r join public.live_sessions s on s.id = r.session_id where s.dentist_id = _dentist), 0),
        reviews_count = coalesce((select count(*) from public.session_reviews r join public.live_sessions s on s.id = r.session_id where s.dentist_id = _dentist), 0)
  where d.user_id = _dentist;
  return null;
end; $$;

create trigger trg_review_rating
after insert or update or delete on public.session_reviews
for each row execute function public.recompute_dentist_rating();

-- Brand partnership inquiries
create table public.brand_inquiries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  email text not null,
  phone text,
  budget text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.brand_inquiries enable row level security;
create policy "Anyone can submit inquiry" on public.brand_inquiries for insert with check (true);
create policy "Admin read inquiries" on public.brand_inquiries for select using (public.has_role(auth.uid(),'admin'));

-- Seed forum categories
insert into public.forum_categories (slug, name, description, audience) values
  ('kids', 'Kids Corner', 'Questions about kids dental care', 'kids'),
  ('adults', 'Adults', 'General adult oral health questions', 'adults'),
  ('pregnancy', 'Pregnancy', 'Oral health during pregnancy', 'pregnant'),
  ('general', 'General', 'Anything oral health', 'general')
on conflict (slug) do nothing;
