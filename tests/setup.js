const mongoose = require("../src/db/mongoose");

// Close mongoose connection after all the test cases are run
afterAll(() => mongoose.connection.close());
