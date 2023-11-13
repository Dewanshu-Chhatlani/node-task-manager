const mongoose = require("../src/db/mongoose");

const User = require("../src/models/user.model");
const Task = require("../src/models/task.model");

beforeAll(async () => {
  console.log("Cleaning database before running tests...");
  await User.deleteMany();
  await Task.deleteMany();
});

afterAll(async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
});
