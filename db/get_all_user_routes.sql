select first_name, username, strt_add, end_add, strt_lat, strt_lng, end_lat, end_lng, steps, description, duration, distance
from users full join routes on routes.user_id = users.id;