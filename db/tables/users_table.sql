CREATE TABLE users (
	id serial NOT NULL,
	password TEXT NOT NULL,
	user_name TEXT NOT NULL,
	user_bio TEXT,
	user_photo TEXT,
	CONSTRAINT users_pk PRIMARY KEY (id))