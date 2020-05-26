DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  manager_status BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_status) VALUES 
(1, "George", "Washington", 1, TRUE);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id, manager_status) VALUES 
(2, "John", "Adams", 2, 1, FALSE), 
(3, "John", "Jay", 3, 1, TRUE), 
(4, "Alexander", "Hamilton", 4, 1, TRUE), 
(5, "Henry", "Knox", 5, 1, TRUE), 
(6, "Edmund", "Randolph", 6, 1, TRUE), 
(7, "Thomas", "Jefferson", 7, 3, TRUE),
(8, "Timothy", "Pickering", 8, 7, FALSE), 
(9, "Benjamin", "Franklin", 8, 7, FALSE), 
(10, "Oliver", "Wolcott, Jr", 9, 4, FALSE), 
(11, "James", "McHenry", 10, 5, FALSE), 
(12, "William", "Bradford", 11, 6, FALSE), 
(13, "Charles", "Lee", 12, 6, FALSE);

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "CEO", 25000, 1), 
(2, "Accounting Manager", 20000, 2), 
(3, "Marketing Manager", 15000, 3), 
(4, "Development Manager", 15000, 4),
(5, "Accountant III", 15000, 2), 
(6, "Acccountant II", 15000, 2), 
(7, "Account Manager", 10000, 3), 
(8, "Sales Representative", 5000, 3), 
(9, "Developer III", 10000, 4), 
(10, "Developer II", 10000, 4), 
(11, "Developer I", 10000, 4), 
(12, "Development Intern", 5000, 4);

INSERT INTO department (id, department)
VALUES 
(1, "Executive"), 
(2, "Accounting"), 
(3, "Marketing"), 
(4, "Development");
