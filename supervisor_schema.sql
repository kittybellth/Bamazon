USE Bamazon;

CREATE table products (
    department_id INT(2) ZEROFILL NOT NULL AUTO_INCREMENT,
    dapartment_name VARCHAR(255) NOT NULL,
    over_head_costs VARCHAR(255),
    total_sales DECIMAL(12,2) DEFAULT NULL,
    PRIMARY KEY(department_id)
);