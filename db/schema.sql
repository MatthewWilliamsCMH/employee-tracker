DROP DATABASE IF EXISTS moviereviews_db;
CREATE DATABASE moviereviews_db;

\c moviereviews_db;

CREATE TABLE movies (
    id INT PRIMARY KEY,
    movie_name VARCHAR(100)
);

CREATE TABLE reviews (
    id INT PRIMARY KEY,
    movie_id INT,
    review TEXT,
    FOREIGN KEY (movie_id)
    REFERENCE movies(id)
    ON DELETE SET NULL
);


-- DROP DATABASE IF EXISTS movies;
-- CREATE DATABASE movies;

-- \c movies;

-- -- Create a students table
-- CREATE TABLE movies (
--     id INTEGER PRIMARY KEY,
--     movie_name VARCHAR(100)
-- );


-- -- Create an enrollments table
-- CREATE TABLE reviews (
--     id INTEGER PRIMARY KEY,
--     movie_id INTEGER,
--     review TEXT,
--     FOREIGN KEY (movie_id) REFERENCES movies(id)
-- );