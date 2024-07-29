// ---------- declarations ---------- //
const inquirer = require('inquirer');
const { Pool } = require('pg');
let employeeNames = []
let roleNames = []
let departmentNames = []
let filteredManagers = []
let filteredDepartments = []
let filteredRoles = []
let answer = ''

const questions = [
    `What would you like to do?`,
    `What department would you like to add?`,
    `Who manages this department?`,
    `What role would you like to add?`,
    `What salary is this role paid?`,
    `What is the new employee's first name?`,
    `Last name?`,
    `Who is the new employee's manager?`,
    `What is the new employee's role?`,
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
                roles.id, roles.title, roles.salary, departments.department_name
            FROM 
                roles
            JOIN 
                departments ON roles.department_id = departments.id
            ;`
        );
        const roleNames = result.rows.map(row => ({
            role_id: row.id,
            title: row.title,
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
                e.id, 
                e.employee_first_name, 
                e.employee_last_name, 
                e.manager_id, 
                d.department_name, 
                r.title, 
                r.salary, 
                m.employee_first_name AS manager_first_name,
                m.employee_last_name AS manager_last_name
            FROM 
                employees e
            JOIN 
                roles r ON e.role_id = r.id
            JOIN 
                departments d ON r.department_id = d.id
            LEFT JOIN
                employees m ON e.manager_id = m.id
            ;`
            );
                employeeNames = result.rows.map(row => ({
                employee_id: row.id,
                first_name: row.employee_first_name,
                last_name: row.employee_last_name,
                department_name: row.department_name,
                title: row.title,
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
                role_id = 5
            ;`
        );

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
        VALUES 
            ($1, $2)
        `;
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

async function addRole(title, department_id, salary) {
    const sql = `
        INSERT INTO 
            roles (title, department_id, salary) 
        VALUES 
            ($1, $2, $3)
        `;
    try {
        const result = await pool.query(sql, [title, department_id, salary]);
        console.log(`**********\n${title} was succesfully added to the roles in employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

async function addEmployee(employee_first_name, employee_last_name, employee_manager_id, employee_role_id) {
    const insertion_sql = `
        INSERT INTO
            employees (
                employee_first_name,
                employee_last_name,
                manager_id,
                role_id
            )
        VALUES ($1, $2, $3, $4)
        ;`
    ;
    try {

        newResult = await pool.query(insertion_sql, [employee_first_name, employee_last_name, employee_manager_id, employee_role_id]);

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
        const update_sql = `
        UPDATE 
            employees
        SET 
            role_id = $1
        WHERE
            id = $2
        `;
        const update_result = await pool.query(update_sql, [role_id, employee_id]);
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
            filteredManagers = departmentManagers.map(manager => ({
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
            filteredDepartments = departmentNames.map(department => ({
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
                        choices: filteredDepartments
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
            departmentManagers = await getManagers();
            filteredManagers = departmentManagers.map(manager => ({
                name: manager.full_name,
                value: manager.employee_id
            }));
            roleNames = await getRoles();
            filteredRoles = roleNames.map(role => ({
                    name: role.title,
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
                        name: 'employeeManager', 
                        message: questions[7],
                        type: 'list',
                        choices: filteredManagers
                    },
                    {
                        name: 'employeeRole', 
                        message: questions[8],
                        type: 'list',
                        choices: filteredRoles
                    }
                ])
                .then ((response) => {
                    const {employeeFirstName, employeeLastName, employeeManager, employeeRole} = response;
                    addEmployee(employeeFirstName, employeeLastName, employeeManager, employeeRole);
                })
                break;
        case 'Update Employee Role':
            employeeNames = await getEmployees();
            const filteredEmployees = employeeNames.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.employee_id
            }));
            roleNames = await getRoles();
            filteredRoles =  roleNames.map(role => ({
                    name: role.title,
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
                        choices: filteredRoles
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