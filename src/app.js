const express = require("express");

// Establish DB Connection
require("./db/mongoose");

// Import all routes
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT;

// Parse request body to JSON
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
