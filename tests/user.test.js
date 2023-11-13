const request = require("supertest");
const app = require("../src/app");

const userOne = {
  name: "Jack",
  email: "jack.sparrow@gmail.com",
  password: "Mypass@123",
};

test("Signup a new user", async () => {
  await request(app).post("/users/sign_up").send(userOne).expect(201);
});

test("Valid login credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);
});

test("Invalid login credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: "Mike", password: "hello" })
    .expect(400);
});
