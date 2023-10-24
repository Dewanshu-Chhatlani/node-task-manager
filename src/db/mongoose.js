const mongoose = require("mongoose");

const CONNECTION_URL = "mongodb://127.0.0.1:27017/node-task-manager";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Database connection successful!"))
  .catch((err) =>
    console.log("An error occurred while connecting to database:", err)
  );

module.exports = mongoose;
