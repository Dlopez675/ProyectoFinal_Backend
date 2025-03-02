CREATE TABLE USERS (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE CATEGORIES (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE PRODUCTS (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    img VARCHAR(255),
    category_id INT,
    user_id INT,
    price DECIMAL(10, 2),
    stock INT,
    FOREIGN KEY (category_id) REFERENCES CATEGORIES(id),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);
CREATE TABLE ORDERS (
    id SERIAL PRIMARY KEY,
    user_id INT,
    status VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);
CREATE TABLE ORDER_ITEMS (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES ORDERS(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);
CREATE TABLE FAVORITES (
    id SERIAL PRIMARY KEY,
    user_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES USERS(id),
    FOREIGN KEY (product_id) REFERENCES PRODUCTS(id)
);