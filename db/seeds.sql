DO $$
DECLARE

BEGIN
INSERT INTO movies (id, name)
VALUES (001, "Hitman"),
       (002, "The Hobbit"),
       (003, "Beetlejuice")

INSERT INTO reviews (id, movie_id, review)
VALUES (0001, "‘Hitman’ is a slick, action-packed thriller that will keep you on the edge of your seat. The fight scenes are intense, and the storyline is engaging with plenty of twists and turns. A must-watch for fans of the genre! — Max Steele, Action Hero Reviews"),
       (0002, "While ‘Hitman’ delivers some solid action and a few good plot twists, it falls into the trap of predictable storylines and one-dimensional characters. It’s entertaining, but don’t expect anything groundbreaking. — Samantha Blaze, Movie Buff Weekly"),
       (0003, "‘The Hobbit’ is a fantastical adventure that beautifully expands on Tolkien’s world. The visual effects are stunning, the story is captivating, and the characters are as charming as ever. An epic journey from start to finish! — Elena Willow, Fantasy Film Fanatics"),
       (0004, "‘The Hobbit’ is a decent film with impressive visuals and a strong cast, but it drags a bit in the middle. It’s enjoyable for fans of the Lord of the Rings series, though it doesn’t quite reach the same heights. — David Grim, Epic Film Reviews"),
       (0005, "‘Beetlejuice’ is a quirky and imaginative classic that blends dark comedy with supernatural fun. Michael Keaton’s performance is hysterical, and Tim Burton’s unique vision shines throughout. A must-see for fans of offbeat comedies! — Gwen Oddity, Cult Classic Chronicles"),
       (0006, "‘Beetlejuice’ is a fun film with a lot of creative ideas, but it sometimes feels like it’s trying too hard to be strange. It’s entertaining, but the humor is hit-or-miss for some viewers. — Jake Harper, Flicks and Tricks")
END $$

-- DO $$
--     DECLARE

--     BEGIN

-- -- Insert data into the movies table
--         INSERT INTO movies (id, movie_name) VALUES 
--         (1, 'The Shawshank Redemption'),
--         (2, 'The Godfather'),
--         (3, 'The Dark Knight'),
--         (4, 'Pulp Fiction'),
--         (5, 'Forrest Gump');

--         -- Insert data into the reviews table
--         INSERT INTO reviews (id, movie_id, review) VALUES 
--         (1, 1, 'A masterpiece of storytelling and character development.'),
--         (2, 1, 'Incredible performances and a deeply moving narrative.'),
--         (3, 2, 'A cinematic landmark with powerful acting and direction.'),
--         (4, 2, 'An epic tale of family, power, and betrayal.'),
--         (5, 3, 'A brilliant superhero film with a dark and complex plot.'),
--         (6, 3, 'Heath Ledgers performance as the Joker is unforgettable.'),
--         (7, 4, 'A stylish and captivating crime film with great dialogue.'),
--         (8, 4, 'Quentin Tarantinos best work, full of memorable moments.'),
--         (9, 5, 'An inspiring and heartwarming story with a fantastic performance by Tom Hanks.'),
--         (10, 5, 'A touching and beautifully crafted film.');



-- EXCEPTION
--     WHEN OTHERS THEN
--         RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
--         ROLLBACK; -- Explicitly roll back changes in case of error
-- END $$;