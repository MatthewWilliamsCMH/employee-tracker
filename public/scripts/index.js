// ---------- declarations ---------- //
const inquirer = require('inquirer');
const { Pool } = require('pg'); //import pg and create pool
let employeeNames = ""
let roleNames = ""
let departmentNames = ""
let answer = ""

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

//offer user action options
function promptUser () {
    const questions = [
        'What would you like to do?',
        'What is the name of the new employee?',
        'What is his or her role?',
        'What department will the new employee work?',
        'Which employee\'s role would you like to update?',
        'What role would you like to add?',
        'What department would you like to add?',
        'What is the new employee\'s role?',
        'What is the new employee\'s department?'
    ];
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
            const employeeRole = getRoles(roleNames)
            console.log(roleNames)
            const employeeDepartment = getDepartments(departmentNames)
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
            /// rewrite this as a protected insertion
                .then (() => {
                    console.clear;
                    sql = `INSERT INTO employees (role, department, name) VALUES (${results.employeeName}, ${results.employeeRole}, ${results.employeeDepartment})`
                })
                .then (() => loadPrompts());
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
            break;
        default:
            console.log('Sorry. Something went wrong.');
            break;
    }
}    
// ---------- get functions ---------- //
// function getEmployees() {
//     pool.query(sql, (error, result) =>{
//         if (error) {
//             console.error("Error exectuing query.", error.stack);
//             return;
//         }
//         employeeNames = result.rows.map(row => row.employee)
//     })
//     loadPrompts()
// }

function getRoles() {
    pool.query("SELECT role FROM Roles;", (error, result) =>{
        if (error) {
            console.error("Error exectuing query.", error.stack);
            return;
        }
        const roleNames = result.rows.map(row => row.role)
        return roleNames;
    })
    handleChoice()
}

function getDepartments() {
    pool.query("SELECT department FROM departments;", (error, result) =>{
        if (error) {
            console.error("Error exectuing query.", error.stack);
            return;
        }
        const departmentNames = result.rows.map(row => row.department)
    })
    promptUser();
    handleChoice();
}



// app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;

//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });
  
            // db.findAllEmployees()
            //   .then(({ rows }) => {
            //     let employees = rows;
            //     console.log('\n');
            //     console.table(employees);
            //   })
            //   .then(() => loadPrompts());

        //   pool.query(
        //     "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        //   );




            // const getNotes = () =>
            // fetch('/api/notes', {
            //   method: 'GET',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
            // });
          

        // const getRoles = () => {
        //     fetch('api/roles', {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        // }

        // const getDepartments = () => {
        //     fetch('api/departments', {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        // }




        // .then((res) => fetch(`https://api.github.com/users/${res.username}`))
        // // promises are chained to parse the request for the json data
        // .then((res) => res.json())
        // // json data is accepted as user and logged to the console
        // .then((user) => console.log(user));
      










            // ,
            //{ VIEW ALL EMPLOYEES
            //select all employees from employees table
            //},
//             {
//                 name: 'addemployee',
//                 message: questions[1],
//                 type: 'input',
//                 when: (answers) => answers.action === 'Add New EMPLOYEE'
//             },
// //list of roles from db
//             {
//                 name: 'newemployeerole',
//                 message: questions[5],
//                 type: 'list',
//                 choices: [
//                     '1',
//                     '2',
//                     '3'
//                 ],
//                 when: (answers) => answers['addemployee']
//             },
// //list of departments from db,
//             {
//                 name: 'newemployeedepartment',
//                 message: questions[6],
//                 type: 'list',
//                 choices: [
//                     '1',
//                     '2',
//                     '3'
//                 ],
//                 when: (answers) => answers['newemployeerole']
//             },
// //SELECT * FROM employees
//             {
//                 name: 'updaterole',
//                 message: questions[2],
//                 type: 'list',
//                 choices: [
//                     '1',
//                     '2',
//                     '3'
//                 ],
//                 when: (answers) => answers[undaterole] = 'Update EMPLOYEE Role'
//             },
//             //{ VIEW ALL ROLLS
//             //select all rolls from rolls table
//             //},
//             {
//                 name: 'newrole',
//                 message: questions[3],
//                 type: 'input',
//                 when: (answers) => answers[action] = 'Add New ROLL'
//             },
//             //{ VIEW ALL DEPARTMENTS
//             //select all departments from departments table
//             //},
//             {
//                 name: 'newdept',
//                 message: questions[4],
//                 type: 'input',
//                 when: (answers) => answers[action] = 'Add New DEPARTMENT'
//             }
//         ])
//         .then ((responses) => {
//         //if answer 1, SELECT * FROM employees
//         //if answer 2, INSERT newemployee INTO employees
//         //if answer 3, UPDATE role OF employee FROM employees
//         //if answer 4, SELECT * FROM roles
//         //if answer 5, INSERT newrole INTO roles
//         //if answer 6, SELECT * FROM departments
//         //if answer 7, INSERT newdept INTO departments
//         //if answer 8, quit else restart prompt
//         })
// }

promptUser();