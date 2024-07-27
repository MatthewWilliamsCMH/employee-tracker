// ---------- declarations ---------- //
const inquirer = require('inquirer');
const { Pool } = require('pg');
let employeeNames = ''
let roleNames = ''
let departmentNames = ''
let answer = ''
const questions = [
    `What would you like to do?`,
    `What is the new employee's name?`,
    `What is the new employee's role?`,
    `In what department will the new employee work?`,
    `Which employee's role would you like to update?`,
    `What is employee's new role?`,
    `What role would you like to add?`,
    `What department would you like to add?`,
    `What is the new employee's role?`,
    `What is the new employee's department?`
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
async function getEmployees() {    
    try {
        const result = await pool.query('SELECT employee FROM employees;');
        employeeNames = result.rows.map(row => row.employee);
        return employeeNames;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

async function getRoles() {    
    try {
        const result = await pool.query('SELECT role FROM roles;');
        roleNames = result.rows.map(row => row.role);
        return roleNames;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

async function getDepartments() {  
    try {
        const result = await pool.query('SELECT department FROM departments;');
        departmentNames = result.rows.map(row => row.department);
        return departmentNames;
    } catch (err) {
        console.error('Error querying the database.');
        throw err;
    }
}

// ---------- add functions ---------- //
async function addEmployee(name, role, department) {
    const sql = `INSERT INTO employees (employee, role_id, department_id) 
    SELECT 
        $1 AS employee,
        r.id AS role_id,
        d.id AS department_id 
    FROM 
        roles r
        JOIN departments d on d.department = $2
    WHERE
        r.role = $3`;
    try {
        const result = await pool.query(sql, [name, department, role]);
        console.log(`**********\n${name} succesfully added to employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

async function addRole(newRole) {
    const sql = `INSERT INTO roles (role) VALUES ($1)`;
    try {
        const result = await pool.query(sql, [newRole]);
        console.log(`**********\n${newRole} was succesfully added to the roles in employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

async function addDepartment(newDepartment) {
    console.log(newDepartment)
    const sql = `INSERT INTO departments (department) VALUES ($1)`;
    try {
        const result = await pool.query(sql, [newDepartment]);
        console.log(`**********\n${newDepartment} was succesfully added to the departments in employees_db.\n**********`);
        setTimeout(promptUser, 2000);
    } 
    catch (err) {
        console.error(`**********\nError querying the database.\n**********`);
        throw err;
    }
}

// ---------- update functions ---------- //
async function updateEmployeeRole(employeeName, newRole) {
    const sql = `UPDATE employees
    SET role_id = (
        SELECT 
            id
        FROM
            roles
        WHERE
            role = $1
        ) 
    WHERE
        employee = $2;`
    try {
        const result = await pool.query(sql, [newRole, employeeName]);
        console.log(`**********\nSuccesfully updated ${employeeName}'s role in employees_db.\n**********`);
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
                    'View All Employees', 
                    'Add Employee', 
                    'Update Employee Role', 
                    'View All Roles', 
                    'Add Role', 
                    'View All Departments', 
                    'Add Department', 
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
        case 'View All Employees':
            await getEmployees(employeeNames);
            console.table(employeeNames);
            setTimeout(promptUser, 2000);
            break;
        case 'Add Employee':
            await getRoles(roleNames)
            await getDepartments(departmentNames)
            inquirer
                .prompt ([
                    {
                        name: 'employeeName', 
                        message: questions[1],
                        type: 'input'
                    },
                    {
                        name: 'employeeRole', 
                        message: questions[2],
                        type: 'list',
                        choices: roleNames
                    },
                    {
                        name: 'employeeDepartment', 
                        message: questions[3],
                        type: 'list',
                        choices: departmentNames
                    }
                ])
                .then ((response) => {
                    const {employeeName, employeeRole, employeeDepartment } = response;
                    addEmployee(employeeName, employeeRole, employeeDepartment);
                })
                break;
            case 'Update Employee Role':
                await getEmployees(employeeNames)
                await getRoles(roleNames)
                inquirer
                    .prompt ([
                        {
                            name: 'employeeName', 
                            message: questions[4],
                            type: 'list',
                            choices: employeeNames
                        },
                        {
                            name: 'employeeRole', 
                            message: questions[5],
                            type: 'list',
                            choices: roleNames
                        }
                    ])
                    .then ((response) => {
                        const {employeeName, employeeRole} = response;
                        updateEmployeeRole(employeeName, employeeRole);
                    })
                break;
        case 'View All Roles':
            await getRoles(roleNames);
            console.table(roleNames);
            setTimeout(promptUser, 2000);
            break;
        case 'Add Role':
            inquirer
                .prompt ([
                    {
                        name: 'roleName', 
                        message: questions[6],
                        type: 'input'
                    }
                ])
                .then ((response) => {
                    console.log(response)
                    const {roleName} = response;
                    addRole(roleName);
                })
            break;
        case 'View All Departments':
            await getDepartments(departmentNames);
            console.table(departmentNames);
            setTimeout(promptUser, 2000);
            break;
        case 'Add Department':
            inquirer
                .prompt ([
                    {
                        name: 'departmentName', 
                        message: questions[7],
                        type: 'input'
                    }
                ])
                .then ((response) => {
                    console.log(response)
                    const {departmentName} = response;
                    addDepartment(departmentName);
                })
            break;
        case 'Quit':
            console.log("\n**********\nServer is shutting down....\n**********")
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
