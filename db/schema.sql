DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role VARCHAR(100)
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    department VARCHAR(100)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    role_id INT,
    department_id INT,
    employee VARCHAR(100) NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);
