DELETE FROM blog_posts
WHERE id = $1;

SELECT *
FROM blog_posts
JOIN users ON blog_posts.user_id = users.id
-- WHERE blog_posts.user_id = $1
ORDER BY blog_posts.id DESC;