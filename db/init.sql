DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
   id SERIAL PRIMARY KEY,
   email VARCHAR(64) NOT NULL,
   first_name VARCHAR(24),
   last_name VARCHAR(64),
   username VARCHAR(24) NOT NULL,
   hash text NOT NULL
);

CREATE TABLE routes
(
   id SERIAL PRIMARY KEY,
   strt_add TEXT NOT NULL,
   end_add TEXT NOT NULL,
   strt_lat FLOAT NOT NULL,
   strt_lng FLOAT NOT NULL,
   end_lat FLOAT NOT NULL,
   end_lng FLOAT NOT NULL,
   description TEXT,
   duration TEXT,
   distance TEXT,
   steps TEXT
   [],
   user_id INTEGER REFERENCES users
   (user_id)
);

