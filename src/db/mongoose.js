const mongoose = require("mongoose");

const CONNECTION_URL = process.env.MONGODB_URL + process.env.DB_NAME;

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
