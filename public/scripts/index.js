// ---------- declarations ---------- //
const inquirer = require('inquirer');
const { Pool } = require('pg');
let employeeNames = []
let roleNames = []
let departmentNames = []
let answer = ''
const questions = [
    `What would you like to do?`,
    `What department would you like to add?`,
    `Who manages this department?`,
    `What role would you like to add?`,
    `What salary is this role paid?`,
    `What is the new employee's first name?`,
    `Last name?`,
    `In what department will the new employee work?`,
    `What is the employee's role?`,
    `Which employee's role would you like to update?`,
    `What will be the employee's new role?`,
    `What department houses the new role?`
];

//connect to database
const pool = new Pool(
    {
      user: 'postgres',
      password: '2468013579',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(`\nConnected to the employees_db database.`)
  )
  
pool.connect();

// -------------------- sql calls --------------------- //
// ---------- get functions ---------- //
async function getDepartments() {  
    try {
        const result = await pool.query(`
            SELECT 
                id, department_name 
            FROM 
                departments;`);
        const departmentNames = result.rows.map(row => ({
            department_id: row.id,
            department_name: row.department_name
        }));
        return departmentNames;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

async function getRoles() {    
    try {
        const result = await pool.query(`
            SELECT 
                roles.id, roles.role_name, roles.salary, departments.department_name
            FROM 
                roles
            JOIN 
                departments ON roles.department_id = departments.id;`);
        const roleNames = result.rows.map(row => ({
            role_id: row.id,
            role_name: row.role_name,
            department_name: row.department_name,
            role_salary: row.salary
        }));
        return roleNames;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

async function getEmployees() {    
    try {
        const result = await pool.query(`
            SELECT 
                employees.id, employees.employee_first_name, employees.employee_last_name, departments.department_name, roles.role_name, roles.salary, m.id AS manager_id, m.employee_first_name AS manager_first_name, m.employee_last_name AS manager_last_name
            FROM 
                employees
            JOIN 
                departments ON employees.department_id = departments.id
            JOIN 
                roles ON employees.role_id = roles.id
            LEFT JOIN
                employees m ON departments.manager_id = m.id;`);
                employeeNames = result.rows.map(row => ({
                employee_id: row.id,
                first_name: row.employee_first_name,
                last_name: row.employee_last_name,
                deparment_name: row.department_name,
                role_name: row.role_name,
                role_salary: row.salary,
                manager_first_name: row.manager_first_name,
                manager_last_name: row.manager_last_name
            })
        );
        return employeeNames;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

async function getManagers() {
    try {
        const result = await pool.query(`
            SELECT
                id, employee_first_name || ' ' || employee_last_name AS full_name
            FROM 
                employees 
            WHERE 
                role_id = 5;`);

        departmentManagers = result.rows.map(row => ({
            full_name: row.full_name,
            employee_id: row.id
        }))
        return departmentManagers;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

// ---------- add functions ---------- //
async function addDepartment(department_name, manager_id) {
    const sql = `
        INSERT INTO 
            departments (department_name, manager_id) 
        VALUES ($1, $2)`;
    try {
        const result = await pool.query(sql, [department_name, manager_id]);
        console.log(`**********\n${department_name} was succesfully added to the departments in employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

async function addRole(role_name, department_id, salary) {
    const sql = `
        INSERT INTO 
            roles (role_name, department_id, salary) 
        VALUES ($1, $2, $3)`;
    try {
        const result = await pool.query(sql, [role_name, department_id, salary]);
        console.log(`**********\n${role_name} was succesfully added to the roles in employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

async function addEmployee(employee_first_name, employee_last_name, employee_department, employee_role) {
    const sql = `
    INSERT INTO
        employees (employee_first_name, employee_last_name, department_id, role_id)
    VALUES
        ($1, $2, $3, $4);`;
    try {
        const result = await pool.query(sql, [employee_first_name, employee_last_name, employee_department, employee_role]);
        console.log(`**********\n${employee_first_name} ${employee_last_name} succesfully added to employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

// ---------- update functions ---------- //
async function updateEmployeeRole(employee_id, role_id) {
    try {
        const department_sql = `
        SELECT 
            department_id
        FROM
            roles
        WHERE
            id = $1
        ;`

        const department_result = await pool.query(department_sql, [role_id]);
        const department_id = department_result.rows[0].department_id;
        
        const update_sql = `
        UPDATE 
            employees
        SET 
            role_id = $1,
            department_id = $2
        WHERE
            id = $3
        `;
        const update_result = await pool.query(update_sql, [role_id, department_id, employee_id]);
        // const result = await pool.query(update_sql, [employee_id, role_id]);
        console.log(`**********\nSuccesfully updated role in employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

// -------------------- receive and handle user input -------------------- //
function promptUser () {
    inquirer
        .prompt ([
            {
                name: 'action', 
                message: questions[0],
                type: 'list',
                choices: [
                    'View All Departments', 
                    'View All Roles', 
                    'View All Employees', 
                    'Add Department', 
                    'Add Role', 
                    'Add Employee', 
                    'Update Employee Role', 
                    'Quit'
                ]
            }
        ])
        .then ((response) => {
            answer = response.action;
            handleChoice(answer);
        })
}

async function handleChoice(answer) {
    switch (answer) {
        case 'View All Departments':
            departmentNames = await getDepartments();
            console.table(departmentNames);
            setTimeout(promptUser, 2000);
            break;
        case 'View All Roles':
            roleNames = await getRoles();
            console.table(roleNames);
            setTimeout(promptUser, 2000);
            break;
        case 'View All Employees':
            employeeNames = await getEmployees();
            console.table(employeeNames);
            setTimeout(promptUser, 2000);
            break;
        case 'Add Department':
            departmentManagers = await getManagers();
            const filteredManagers = departmentManagers.map(manager => ({
                name: manager.full_name,
                value: manager.employee_id
            }));
            inquirer
                .prompt ([
                    {
                        name: 'departmentName', 
                        message: questions[1],
                        type: 'input'
                    },
                    {
                        name: 'departmentManager',
                        message: questions[2],
                        type: 'list',
                        choices: filteredManagers
                    }
                ])
                .then ((response) => {
                    const {departmentName, departmentManager} = response;
                    addDepartment(departmentName, departmentManager);
                })
            break;
        case 'Add Role':
            departmentNames = await getDepartments();
            const filteredRoleDepartments = departmentNames.map(department => ({
                name: department.department_name,
                value: department.department_id
            }));
            inquirer
                .prompt ([
                    {
                        name: 'roleName', 
                        message: questions[3],
                        type: 'input'
                    },
                    {
                        name: 'roleDepartment',
                        message: questions[11],
                        type: 'list',
                        choices: filteredRoleDepartments
                    },
                    {
                        name: 'salary',
                        message: questions[4],
                        type: 'input'
                    }
                ])
                .then ((response) => {
                    const {roleName, roleDepartment, salary} = response;
                    addRole(roleName, roleDepartment, salary);
                })
            break;
        case 'Add Employee':
            departmentNames = await getDepartments();
            const filteredDepartments = departmentNames.map(department => ({
                name: department.department_name,
                value: department.department_id
            }));
            roleNames = await getRoles();
            const filteredRoles = roleNames.map(role => ({
                    name: role.role_name,
                    value: role.role_id
                }))
            inquirer
                .prompt ([
                    {
                        name: 'employeeFirstName', 
                        message: questions[5],
                        type: 'input'
                    },
                    {
                        name: 'employeeLastName', 
                        message: questions[6],
                        type: 'input'
                    },
                    {
                        name: 'employeeDepartment', 
                        message: questions[7],
                        type: 'list',
                        choices: filteredDepartments
                    },
                    {
                        name: 'employeeRole', 
                        message: questions[8],
                        type: 'list',
                        choices: filteredRoles
                    }
                ])
                .then ((response) => {
                    const {employeeFirstName, employeeLastName, employeeDepartment, employeeRole} = response;
                    addEmployee(employeeFirstName, employeeLastName, employeeDepartment, employeeRole);
                })
                break;
        case 'Update Employee Role':
            employeeNames = await getEmployees();
            const filteredEmployees = employeeNames.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.employee_id
            }));
            roleNames = await getRoles();
            const filteredUpdateRoles =  roleNames.map(role => ({
                    name: role.role_name,
                    value: role.role_id
                }))
            inquirer
                .prompt ([
                    {
                        name: 'employee', 
                        message: questions[9],
                        type: 'list',
                        choices: filteredEmployees
                    },
                    {
                        name: 'role',
                        message: questions[10],
                        type: 'list',
                        choices: filteredUpdateRoles
                    }
                ])
                .then ((response) => {
                    const {employee, role} = response;
                    console.log(employee)
                    updateEmployeeRole(employee, role);
                })
            break;
        case 'Quit':
            console.log('\n**********\nServer is shutting down....\n**********')
            setTimeout(() => process.exit(), 2000);
        break;
        default:
            console.log(`**********\nSorry. Something went wrong.\n**********`);
            break;
    }
}    

// run on launch
console.clear();
promptUser();

// ---------- to do ---------- //
// refactor code for effiency
// separate different sql actions into modules for easier maintenance //
// add color to prompts to make them easier to read in the console //