DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_first_name VARCHAR(100) NOT NULL,
    employee_last_name VARCHAR(100) NOT NULL,
    department_id INT,
    role_id INT
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    manager_id INT
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    department_id INT,
    salary INT
);


INSERT INTO employees (employee_first_name, employee_last_name, department_id, role_id)
VALUES ('Connie', 'Geldis', 6, 5),
       ('Deidra', 'Schwartz', 4, 6),
       ('Gary', 'Scott', 5, 4),
       ('Linda', 'Bayma', 1, 2),
       ('Marilyn', 'Phelps', 2, 1),
       ('Steve', 'Robb', 1, 2),
       ('Tim', 'Richards', 6, 5),
       ('Pat', 'Tonneman', 6, 5),
       ('Joellen', 'Gohr', 6, 5),
       ('John', 'Smith', 6, 5),
       ('Bruce', 'Johnson', 6, 7);

INSERT INTO departments (department_name, manager_id)
VALUES ('Editorial', 9),
       ('ETM', 1),
       ('IT', 7),
       ('Production', 8),
       ('Sales', 10),
       ('Administration', 11);

INSERT INTO roles (title, department_id, salary)
VALUES ('Digital Specialist', 2, 60000),
       ('Editor', 1, 64000),
       ('Engineer', 3, 40000),
       ('Inside Sales', 5, 98000),
       ('Manager', 2, 115000),
       ('Print Buyer', 4, 72000),
       ('CEO', 6, 200000);



ALTER TABLE employees
    ADD CONSTRAINT fk_department
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ;

ALTER TABLE employees
    ADD CONSTRAINT fk_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ;

ALTER TABLE departments
    ADD CONSTRAINT fk_manager
    FOREIGN KEY (manager_id) REFERENCES employees(id)
    ;

ALTER TABLE roles
    ADD CONSTRAINT fk_department_roles
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ;
