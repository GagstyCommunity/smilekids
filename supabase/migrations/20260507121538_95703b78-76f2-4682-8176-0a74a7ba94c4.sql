create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null,
  name text not null,
  age int,
  avatar_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.child_profiles enable row level security;
create policy "Parent reads own children" on public.child_profiles for select using (auth.uid() = parent_id);
create policy "Parent inserts own children" on public.child_profiles for insert with check (auth.uid() = parent_id);
create policy "Parent updates own children" on public.child_profiles for update using (auth.uid() = parent_id);
create policy "Parent deletes own children" on public.child_profiles for delete using (auth.uid() = parent_id);
create index if not exists idx_child_profiles_parent on public.child_profiles(parent_id);