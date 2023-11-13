const express = require("express");

// Establish DB Connection
require("./db/mongoose");

// Import all routes
const routes = require("./routes/index");

const app = express();

// Parse request body to JSON
app.use(express.json());

app.use(routes);

module.exports = app;
