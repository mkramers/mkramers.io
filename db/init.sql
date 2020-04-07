DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    auth0   TEXT UNIQUE
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts
(
    id             SERIAL PRIMARY KEY,
    parent_id      INT REFERENCES posts (id),
    author_user_id INT REFERENCES users (user_id) NOT NULL,
    label          TEXT,
    secondaryLabel TEXT,
    icon           TEXT,
    content        TEXT
);

INSERT INTO posts (parent_id, author_user_id, label, secondaryLabel, icon,
                   content)
VALUES (NULL, 1, 'Blogs', NULL, 'document-open', 'Hello blogs');
INSERT INTO posts (parent_id, author_user_id, label, secondaryLabel, icon,
                   content)
VALUES (1, 1, 'Article 1', 'This is the post', 'document', 'Hello ltree');
INSERT INTO posts (parent_id, author_user_id, label, secondaryLabel, icon,
                   content)
VALUES (1, 1, 'Article 2', 'This is a different post', 'document', 'Hello ltree?');