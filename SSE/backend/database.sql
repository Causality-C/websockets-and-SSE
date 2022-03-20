CREATE DATABASE feed_database;

--\c into feed_database

CREATE TABLE feed(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    name VARCHAR(255),
    time_stamp TIMESTAMP
);