SELECT * FROM books 
LEFT JOIN category
ON books.category_id = category.id
WHERE books.id = 1;

SELECT * FROM books 
WHERE pub_date 
BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();

SELECT * FROM books
WHERE category_id = 1
AND pub_date 
BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW();


SELECT * FROM books 
WHERE pub_date 
BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
LIMIT 0, 2;