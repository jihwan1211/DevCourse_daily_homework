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
    id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY(id)
)