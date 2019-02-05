DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id serial PRIMARY KEY,
	hash_value TEXT NOT NULL,
	user_name TEXT NOT NULL,
	user_bio TEXT,
	user_photo TEXT
);