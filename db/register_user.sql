INSERT INTO users
   ( email, first_name, last_name, username, hash)
VALUES
   ($1, $2, $3, $4, $5)
RETURNING *;