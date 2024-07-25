DO $$
BEGIN

INSERT INTO roles (role)
VALUES ('Digital Specialist'),
       ('Print Buyer'),
       ('Manager'),
       ('Engineer'),
       ('Inside Sales'),
       ('Editor');

INSERT INTO departments (department)
VALUES ('ETM'),
       ('Editorial'),
       ('IT'),
       ('Production'),
       ('Sales');

INSERT INTO employees (employee, role_id, department_id)
VALUES ('Marilyn Phelps', 1, 1),
       ('Connie Geldis', 3, 1),
       ('Deidra Schwartz', 2, 4),
       ('Mary Castor', 6, 2),
       ('Linda Bayma', 6, 2),
       ('Tim Richards', 4, 3),
       ('Gary Scott', 5, 5),
       ('Pat Tonneman', 2, 4);

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        ROLLBACK;

END $$;