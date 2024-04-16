ALTER TABLE books
ADD FOREIGN KEY (category_id) REFERENCES category(id);

ALTER TABLE category
CHANGE COLUMN name category_name VARCHAR(45);

ALTER TABLE category
RENAME COLUMN id TO category_id;