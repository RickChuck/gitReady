INSERT INTO blog_posts (user_id, post)
VALUES ($1, $2);

-- SELECT *
-- FROM blog_posts
-- JOIN users ON blog_posts.user_id = users.id
-- WHERE blog_posts.user_id = $1
-- ORDER BY blog_posts.id DESC;

SELECT *
FROM blog_posts
JOIN users ON blog_posts.user_id = users.id
ORDER BY blog_posts.id DESC;
