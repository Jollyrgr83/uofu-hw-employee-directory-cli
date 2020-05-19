
USE company_db;

INSERT INTO employee (id, first_name, last_name, role_id) VALUES 
(1, "George", "Washington", 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES 
(2, "John", "Adams", 2, 1), 
(3, "John", "Jay", 3, 1), 
(4, "Alexander", "Hamilton", 4, 1), 
(5, "Henry", "Knox", 5, 1), 
(6, "Edmund", "Randolph", 6, 1), 
(7, "Thomas", "Jefferson", 7, 3),
(8, "Timothy", "Pickering", 8, 7), 
(9, "Benjamin", "Franklin", 8, 7), 
(10, "Oliver", "Wolcott, Jr", 9, 4), 
(11, "James", "McHenry", 10, 5), 
(12, "William", "Bradford", 11, 6), 
(13, "Charles", "Lee", 12, 6);

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, "President", 25000, 1), 
(2, "Vice President", 20000, 1), 
(3, "Secretary of State", 15000, 2), 
(4, "Treasury Secretary", 15000, 3),
(5, "Secretary of War", 15000, 4), 
(6, "Attorney General", 15000, 5), 
(7, "Assistant Secretary of State", 10000, 2), 
(8, "Ambassador", 5000, 2), 
(9, "Assistant Treasury Secretary", 10000, 3), 
(10, "Assistant Secretary of War", 10000, 4), 
(11, "Assistant Attorney General", 10000, 5), 
(12, "United States Attorney", 5000, 5);

INSERT INTO department (id, name)
VALUES 
(1, "Executive"), 
(2, "State"), 
(3, "Treasury"), 
(4, "War"), 
(5, "Legal");
