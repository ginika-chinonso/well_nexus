-- Your SQL goes here
CREATE TABLE messages (
    id INT PRIMARY KEY NOT NULL,
    from_user_id VARCHAR NOT NULL,
    to_user_id VARCHAR NOT NULL,
    message TEXT NOT NULL
);