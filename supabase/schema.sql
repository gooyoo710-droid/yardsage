-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  subscription_status text not null default 'free' check (subscription_status in ('free', 'pro', 'cancelled')),
  subscription_id text,
  stripe_customer_id text unique,
  designs_used_this_month integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Gardens table
create table public.gardens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  original_image_url text,
  generated_image_url text,
  state text not null,
  style text not null,
  prompt text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz not null default now()
);

-- Subscriptions table
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  stripe_subscription_id text unique not null,
  status text not null check (status in ('active', 'canceled', 'past_due', 'unpaid')),
  plan text not null check (plan in ('monthly', 'yearly')),
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.gardens enable row level security;
alter table public.subscriptions enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Gardens policies
create policy "Users can view own gardens" on public.gardens
  for select using (auth.uid() = user_id);
create policy "Users can insert own gardens" on public.gardens
  for insert with check (auth.uid() = user_id);
create policy "Users can update own gardens" on public.gardens
  for update using (auth.uid() = user_id);
create policy "Users can delete own gardens" on public.gardens
  for delete using (auth.uid() = user_id);

-- Subscriptions policies
create policy "Users can view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Storage: garden-images bucket
-- Run this in the Supabase dashboard under Storage → New bucket:
--   Name: garden-images, Public: true
-- Then add RLS policies for storage:
insert into storage.buckets (id, name, public) values ('garden-images', 'garden-images', true)
  on conflict (id) do nothing;

create policy "Users can upload their own garden images" on storage.objects
  for insert with check (bucket_id = 'garden-images' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Garden images are publicly accessible" on storage.objects
  for select using (bucket_id = 'garden-images');

-- Reset monthly design count on 1st of each month
create or replace function public.reset_monthly_designs()
returns void language plpgsql security definer
as $$
begin
  update public.profiles set designs_used_this_month = 0;
end;
$$;
