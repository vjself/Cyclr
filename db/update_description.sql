UPDATE routes 
SET description
= $3
WHERE id=$1;

SELECT *
FROM routes
WHERE user_id = $2;