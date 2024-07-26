// ---------- declarations ---------- //
const inquirer = require('inquirer');
const { Pool } = require('pg'); //import pg and create pool
let employeeNames = ""
let roleNames = ""
let departmentNames = ""
let answer = ""
let newEmployee = []
const questions = [
    `What would you like to do?`,
    `What is the new employee's name?`,
    `What is his or her role?`,
    `What department will the new employee work?`,
    `Which employee's role would you like to update?`,
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
// ---------- get all entries from a field ---------- //
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

// ---------- add record ---------- //
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

// ---------- receive and handle user input ---------- //
function promptUser () {
    inquirer
        .prompt ([
            {
                name: 'action', 
                message: questions[0],
                type: 'list',
                choices: [
                    'View All EMPLOYEES', 
                    'Add EMPLOYEE', 
                    'Update EMPLOYEE Role', 
                    'View All ROLES', 
                    'Add ROLE', 
                    'View All DEPARTMENTS', 
                    'Add DEPARTMENT', 
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
        case 'View All EMPLOYEES':
            await getEmployees(employeeNames);
            console.table(employeeNames);
            setTimeout(promptUser, 2000);
            break;
        case 'Add EMPLOYEE':
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
            case 'Update EMPLOYEE Role':
            break;
        case 'View All ROLES':
                await getRoles(roleNames);
                console.table(roleNames);
                setTimeout(promptUser, 2000);
                break;
            case 'Add ROLE':
            break;
        case 'View All DEPARTMENTS':
            await getDepartments(departmentNames);
            console.table(departmentNames);
            setTimeout(promptUser, 2000);
            break;
        case 'Add DEPARTMENT':
            break;
        case 'Quit':
            console.clear();
            break;
        // default:
        //     console.log(`**********\nSorry. Something went wrong.\n**********`);
        //     break;
    }
}    

// run on launch
promptUser();
handleChoice();
