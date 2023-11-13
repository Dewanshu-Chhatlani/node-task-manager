const request = require("supertest");
const app = require("../src/app");

test("Should signup a new user", async () => {
  await request(app)
    .post("/users/sign_up")
    .send({
      name: "Jack",
      email: "jack.sparrow@gmail.com",
      password: "Mypass@123",
    })
    .expect(201);
});
