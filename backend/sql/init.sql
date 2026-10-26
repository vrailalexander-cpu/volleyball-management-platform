CREATE TABLE IF NOT EXISTS team_players (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  jersey_number INTEGER NOT NULL UNIQUE CHECK (jersey_number BETWEEN 1 AND 99),
  position VARCHAR(30) NOT NULL CHECK (position IN ('Setter','Outside hitter','Opposite','Middle blocker','Libero')),
  age INTEGER NOT NULL CHECK (age BETWEEN 14 AND 60),
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active','injured','inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS training_sessions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  session_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes BETWEEN 15 AND 300),
  focus VARCHAR(120) NOT NULL,
  location VARCHAR(160) NOT NULL DEFAULT 'Основний зал',
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS competitions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  opponent VARCHAR(120) NOT NULL,
  match_date TIMESTAMPTZ NOT NULL,
  venue VARCHAR(160) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','completed','cancelled')),
  team_score INTEGER,
  opponent_score INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((team_score IS NULL AND opponent_score IS NULL) OR (team_score >= 0 AND opponent_score >= 0))
);

INSERT INTO team_players (full_name, jersey_number, position, age, status) VALUES
('Андрій Коваленко', 7, 'Setter', 23, 'active'),
('Максим Бондар', 12, 'Outside hitter', 21, 'active'),
('Дмитро Мельник', 4, 'Middle blocker', 25, 'active'),
('Олег Шевченко', 9, 'Opposite', 22, 'active'),
('Іван Ткаченко',  16, 'Libero', 20, 'active')
ON CONFLICT (jersey_number) DO NOTHING;
