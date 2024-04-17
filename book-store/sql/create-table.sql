CREATE TABLE users (
    id INT NOT NULL UNIQUE AUTO_INCREMENT, 
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(45) NOT NULL, 
    password VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
);


--  mariadb에서 index는 이미 있는 단어라 백틱으로 감싸서 입력해야함.
CREATE TABLE books (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    img INT,
    category_id INT NOT NULL,
    form VARCHAR(45) NOT NULL,
    isbn VARCHAR(45) NOT NULL UNIQUE,
    summary VARCHAR(500),
    detail LONGTEXT,
    author VARCHAR(45),
    pages INT NOT NULL,
    contents LONGTEXT,
    price INT NOT NULL,
    pub_date DATE,
    PRIMARY KEY(id)
);

CREATE TABLE category (
    category_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE likes (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(book_id) REFERENCES books(id)
);

CREATE TABLE cartItems (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    book_id INT NOT NULL, 
    quantity INT NOT NULL DEFAULT 1,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(book_id) REFERENCES books(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE delivery (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_address VARCHAR(500) NOT NULL,
    username VARCHAR(50) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE orders (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    user_id INT NOT NULL,
    delivery_id INT NOT NULL,
    book_title VARCHAR(100) NOT NULL,
    total_price INT NOT NULL,
    total_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(delivery_id) REFERENCES delivery(id)
);

CREATE TABLE orderedBook (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(book_id) REFERENCES books(id)
);