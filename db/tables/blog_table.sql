-- DROP TABLE IF EXISTS blog_posts;
-- CREATE TABLE IF NOT EXISTS blog_posts (
-- 	id serial PRIMARY KEY,
-- 	post TEXT,
-- 	user_id INT
-- );

DROP TABLE IF EXISTS blog_posts;
CREATE TABLE IF NOT EXISTS blog_posts (
	id serial PRIMARY KEY,
	post TEXT,
	movie_title TEXT,
	movie_poster TEXT,
	user_id INT
);