INSERT INTO routes
   ( strt_add, end_add, strt_lat, strt_lng, end_lat, end_lng, description, duration, distance, steps, user_id)
VALUES
   ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);