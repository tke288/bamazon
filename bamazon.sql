DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, price, quantity)
VALUES ("walkmans", 2.50, 100);

INSERT INTO products (product_name, price, quantity)
VALUES ("action figures", 3.10, 120);

INSERT INTO products (product_name, price, quantity)
VALUES ("confetti", 3.25, 75);

INSERT INTO products (product_name, price, quantity)
VALUES ("skates", 23.25, 15);

INSERT INTO products (product_name, price, quantity)
VALUES ("bags of marshmellows", 3.25, 50);

INSERT INTO products (product_name, price, quantity)
VALUES ("lazers", 1113.25, 2);

INSERT INTO products (product_name, price, quantity)
VALUES ("sharks", 3423.25, 4);

INSERT INTO products (product_name, price, quantity)
VALUES ("robots", 3323.25, 1);

INSERT INTO products (product_name, price, quantity)
VALUES ("forks", 1.25, 1175);

INSERT INTO products (product_name, price, quantity)
VALUES ("ping pong balls", .25, 175);