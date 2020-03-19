DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    auth0   TEXT UNIQUE
);

CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    author_user_id INT REFERENCES users (user_id) NOT NULL,
    title TEXT,
    content TEXT
);