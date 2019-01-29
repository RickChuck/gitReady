INSERT INTO users
(
    user_name, hash_value
)
VALUES($1, $2)
RETURNING * ;