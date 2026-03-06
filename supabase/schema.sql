create table words (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  pronunciation text not null,
  part_of_speech text not null,
  definition text not null,
  difficulty text check (difficulty in ('EASY', 'MEDIUM', 'HARD')) not null,
  created_at timestamp default now()
);

create table questions (
  id uuid primary key default gen_random_uuid(),
  word_id uuid references words(id) on delete cascade,
  option_1 text not null,
  option_2 text not null,
  option_3 text not null,
  option_4 text not null,
  correct_index int check (correct_index between 0 and 3) not null,
  created_at timestamp default now()
);

create table users (
  id uuid primary key  references auth.users(id) on delete cascade,
  username text not null,
  country text,
  points int default 0 not null,
  created_at timestamp default now()
)

create table user_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  word_id uuid references words(id) on delete cascade,
  completed_at timestamp default now(),
  unique(user_id, word_id)
);