DROP TABLE IF EXISTS blog_posts;
CREATE TABLE IF NOT EXISTS blog_posts (
	id serial PRIMARY KEY,
	post TEXT,
	user_id INT
);