
create extension if not exists "pgcrypto";


create table submissions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  title         text not null,
  url           text not null,
  status        text not null default 'submitted'
                  check (status in ('submitted','waiting','heard_back','accepted','rejected')),
  submitted_at  timestamptz not null default now(),
  created_at    timestamptz not null default now()
);

create table answers (
  id             uuid primary key default gen_random_uuid(),
  submission_id  uuid references submissions(id) on delete cascade not null,
  user_id        uuid references auth.users(id) on delete cascade not null,
  question       text not null,
  answer         text not null default '',
  created_at     timestamptz not null default now()
);



alter table submissions enable row level security;
alter table answers enable row level security;


create policy "Users see own submissions"
  on submissions for select
  using (auth.uid() = user_id);

create policy "Users insert own submissions"
  on submissions for insert
  with check (auth.uid() = user_id);

create policy "Users update own submissions"
  on submissions for update
  using (auth.uid() = user_id);

create policy "Users delete own submissions"
  on submissions for delete
  using (auth.uid() = user_id);

create policy "Users see own answers"
  on answers for select
  using (auth.uid() = user_id);

create policy "Users insert own answers"
  on answers for insert
  with check (auth.uid() = user_id);

create policy "Users delete own answers"
  on answers for delete
  using (auth.uid() = user_id);


create index on submissions (user_id, submitted_at desc);
create index on answers (user_id);
create index on answers (submission_id);
