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
WHERE user_id is 26; 

-- Exercise 5: Filtering with logical operators
SELECT id, image_url, user_id;
FROM posts;
WHERE (user_id is 12) or (user_id is 26);

-- Exercise 6: Using functions in a select statement
SELECT * FROM posts;
COUNT

-- Exercise 7: Aggregating data
SELECT * FROM posts;
GROUP BY user_id;
COUNT;

-- Exercise 8: Joining: two tables




-- Exercise 9: More joining practice: two tables




-- Exercise 10: More joining practice: three tables (Optional)




-- Exercise 11: Inserting records




-- Exercise 12: Deleting records




-- Exercise 13: Updating records




-- Exercise 14: More Querying Practice (Optional)
