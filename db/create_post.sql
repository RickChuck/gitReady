INSERT INTO blog_posts (post, user_id)
VALUES ($1, $2)
RETURNING *;
