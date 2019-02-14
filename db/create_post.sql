INSERT INTO blog_posts (user_id, post, movie_title, movie_poster)
VALUES ($1, $2, $3, $4);

-- SELECT *
-- FROM blog_posts
-- JOIN users ON blog_posts.user_id = users.id
-- WHERE blog_posts.user_id = $1
-- ORDER BY blog_posts.id DESC;

SELECT blog_posts.id as post_id, post, user_id, user_name, movie_title, movie_poster
FROM blog_posts
JOIN users ON blog_posts.user_id = users.id
ORDER BY blog_posts.id DESC;
