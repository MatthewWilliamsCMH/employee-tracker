// ---------- declarations ---------- //
const questions = [
    'What would you like to do?',
    'What is the name of the new employee?',
    'Which employee\'s role would you like to update?',
    'What role would you like to add?',
    'What department would you like to add?'
];

//offer user action options
function init () {
    inquirer
        .prompt ([
            {
                name: 'action', 
                message: questions[0],
                type: 'list'
                choices: [
                    'View All EMPLOYEES', 
                    'Add EMPLOYEE', 
                    'Update EMPLOYEE Role', 
                    'View All ROLES', 
                    'Add ROLE', 
                    'View All DEPARTMENTS', 
                    'Add DEPARTMENT', 
                    'QUIT'
                ]
            },
            //{ VIEW ALL EMPLOYEES
            //select all employees from employees table
            //},
            {
                name: 'addemployee',
                message: questions[1],
                type: 'input',
                when: (answers) => answers[action] = 'Add New EMPLOYEE'
            },
            {
                name: 'updaterole',
                message: questions[2],
                type: 'list',
                choices: ,//SELECT * FROM employees
                when: (answers) => answers[undaterole] = 'Update EMPLOYEE Role'
            },
            //{ VIEW ALL ROLLS
            //select all rolls from rolls table
            //},
            {
                name: 'newrole',
                message questions[3],
                type: 'input',
                when: (answers) => answers[action] = 'Add New ROLL'
            },
            //{ VIEW ALL DEPARTMENTS
            //select all departments from departments table
            //},
            {
                name: 'newdept',
                message question[4],
                type: 'input',
                when: (answers) => answers[action] = 'Add New DEPARTMENT'
            }
        ])
        .then ((responses) => {
        //if answer 1, SELECT * FROM employees
        //if answer 2, INSERT newemployee INTO employees
        //if answer 3, UPDATE role OF employee FROM employees
        //if answer 4, SELECT * FROM roles
        //if answer 5, INSERT newrole INTO roles
        //if answer 6, SELECT * FROM departments
        //if answer 7, INSERT newdept INTO departments
        //if answer 8, quit else restart prompt
        })
}