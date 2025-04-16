-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;

-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name;
FROM users;

-- Exercise 3: Sorting
SELECT id, first_name, last_name ;
FROM users;
GROUP BY last_name;

-- Exercise 4: Filtering
SELECT id, image_url, user_id;
FROM users;
WHERE user_id = 26; 

-- Exercise 5: Filtering with logical operators
SELECT id, image_url, user_id;
FROM posts;
WHERE (user_id = 12) or (user_id = 26);

-- Exercise 6: Using functions in a select statement
SELECT * FROM posts;
COUNT

-- Exercise 7: Aggregating data
SELECT * FROM posts;
GROUP BY user_id;
COUNT;

-- Exercise 8: Joining: two tables
SELECT id, image_url, user_id FROM posts;
INNER JOIN users ON posts.user_id;
WHERE (posts.user_id = user_id = 26) or (posts.user_id = user_id = 12);

-- Exercise 9: More joining practice: two tables
SELECT id, pub_date FROM posts;
INNER JOIN posts ON following;
WHERE posts.user_id = following.following_id;
WHERE posts.user_id = 26;

-- Exercise 10: More joining practice: three tables (Optional)

-- Exercise 11: Inserting records
INSERT INTO bookmarks(user_id, post_id);
VALUES (26, 219), (26, 220), (26, 221);

-- Exercise 12: Deleting records




-- Exercise 13: Updating records




-- Exercise 14: More Querying Practice (Optional)
