const express = require('express');
const index = require("./public/scripts/index.js");

const PORT = process.env.PORT || 3001;
const app = express();

//middleware for handling urls and json in express and makes public available to all functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//return 404 if request made to unfound endpoint
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});