DO $$
BEGIN

INSERT INTO employees (eFirstName, eLastName, department_id, role_id)
VALUES ('Connie', 'Geldis', 2, 5),
       ('Deidra', 'Schwartz', 4, 6),
       ('Gary', 'Scott', 5, 4),
       ('Linda', 'Bayma', 1, 2),
       ('Marilyn', 'Phelps', 2, 1),
       ('Steve', 'Robb', 1, 2),
       ('Tim', 'Richards', 3, 3),
       ('Pat', 'Tonneman', 4, 5),
       ('Joellen', 'Gohr', 1, 5),
       ('John', 'Smith', 5, 5),
       ('Bruce', 'Johnson', 6, 7);

INSERT INTO departments (dName, manager_id)
VALUES ('Editorial', 9),
       ('ETM', 1),
       ('IT', 7),
       ('Production', 8),
       ('Sales', 10),
       ('Administration', 11);

INSERT INTO roles (rName, department_id, salary)
VALUES ('Digital Specialist', 2, 60000),
       ('Editor', 1, 64000),
       ('Engineer', 3, 40000),
       ('Inside Sales', 5, 98000),
       ('Manager', 2, 115000),
       ('Print Buyer', 4, 72000),
       ('CEO', 6, 200000);


EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        ROLLBACK;

END $$;