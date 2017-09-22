drop database if exists bamazon;
create database bamazon;
use bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10 , 2 ) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Note7", "Explosives", 999, 10), ("Yacht", "Essentials", 99, 10), ("Lama", "Home Pets", 199, 20), ("Panda", "Home Pets", 299, 100), ("Snake", "Tasty Food", 9, 100);









