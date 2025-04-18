-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;

-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name
FROM users;

-- Exercise 3: Sorting
SELECT id, first_name, last_name 
GROUP BY last_name 
FROM users;


-- Exercise 4: Filtering
SELECT id, image_url, user_id 
FROM users 
WHERE user_id = 26; 

-- Exercise 5: Filtering with logical operators
SELECT id, image_url, user_id 
FROM posts 
WHERE (user_id = 12) or (user_id = 26);

-- Exercise 6: Using functions in a select statement
SELECT * FROM posts 
COUNT(*);

-- Exercise 7: Aggregating data
SELECT * FROM posts 
GROUPBY user_id 
COUNT(*);

-- Exercise 8: Joining: two tables
SELECT posts.id, posts.image_url, user_id FROM posts
JOIN users ON user_id = posts.id
WHERE (posts.id = 26) or (posts.id = 12);

-- Exercise 9: More joining practice: two tables
SELECT posts.id, posts.pub_date FROM posts
JOIN following ON posts.user_id = following.following_id
WHERE following.user_id = 26;

-- Exercise 10: More joining practice: three tables (Optional)

-- Exercise 11: Inserting records
INSERT INTO bookmarks(user_id, post_id, timestamp)
VALUES (26, 219, now()), (26, 220, now()), (26, 221, now());

-- Exercise 12: Deleting records
DELETE FROM bookmarks
WHERE user_id = 26;

-- Exercise 13: Updating records
UPDATE users
SET users.email = 'knick2022@gmail.com'
WHERE users.user_id = 26;



-- Exercise 14: More Querying Practice (Optional)
