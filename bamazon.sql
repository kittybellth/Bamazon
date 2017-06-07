CREATE database Bamazon;
USE Bamazon;

CREATE table products (
    item_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price DECIMAL(10,2) DEFAULT NULL,
    product_sales INT DEFAULT NULL,
    stock_quantity INT DEFAULT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("ABC Dash Cam", "Automotive", 149.99, 0, 15);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Baby Photofinish Foundation ", "Beauty", 34.89, 0, 100);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Nokya Mobile Phone", "Electronics", 599.00, 0, 89);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Bead By Dr.Bee Headphone", "Electronics", 159.99, 0, 2);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("How to fly", "Books", 19.99, 0, 1000);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Britney Spears album", "Music", 39.00, 0, 19);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Samsing 68 inches Television", "Electronics", 1999.99, 0, 4);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Orange yPad 64GB Wifi", "Electronics", 599.00, 0, 3);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("Olivia Dining Sets", "Home", 899.99, 0, 10);
INSERT INTO products (product_name, department_name, price, product_sales, stock_quantity) VALUE ("The lord of the shoes", "Movies", 79.99, 0, 16);

SELECT * FROM products;