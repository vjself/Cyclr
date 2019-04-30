DELETE FROM routes WHERE id = $1;
SELECT *
FROM routes
WHERE user_id = $2;