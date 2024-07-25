const express = require('express');
// const { Pool } = require('pg'); //import pg and create pool
const index = require("./public/scripts/index.js");

const PORT = process.env.PORT || 3001;
const app = express();

//middleware for handling urls and json in express and makes public available to all functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use("/api", api);

// //connect to database
// const pool = new Pool(
//   {
//     user: 'postgres',
//     password: '2468013579',
//     host: 'localhost',
//     database: 'employees_db'
//   },
//   console.log(`\nConnected to the employees_db database.`)
// )

// pool.connect();

//get employees
//get roles
//get departments
//post employee
//post department
//append employees

//get routes
// app.get('/api/employees', (req, res) => {
//   const sql = `SELECT employee FROM employees`;

//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// app.get('/api/roles', (req, res) => {
//   const sql = `SELECT id, role_name AS role FROM roles`;

//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// app.get('/api/departments', (req, res) => {
//   const sql = `SELECT id, dept_name AS department FROM departments`;

//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

//post routes
// app.post('/api/new-employee', ({ body }, res) => {
//   //need also to post role and department
//   const sql = `INSERT INTO employees (employee, role, department) VALUES ($1), ($2), ($3)`;
//   const params = [body.employee, body.role, body.department];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// app.post('/api/new-roles', ({ body }, res) => {
//   const sql = `INSERT INTO roles (role_name) VALUES ($1)`;
//   const params = [body.role_name];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// app.post('/api/new-department', ({ body }, res) => {
//   const sql = `INSERT INTO departments (dept_name) VALUES ($1)`;
//   const params = [body.dept_name];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });


// //joins
// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   pool.query(sql, (err, { rows }) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // update employee role

//return 404 if request made to unfound endpoint
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports = { pool };