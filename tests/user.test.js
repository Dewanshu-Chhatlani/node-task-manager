const request = require("supertest");
const app = require("../src/app");

const userOne = {
  name: "Jack",
  email: "jack.sparrow@gmail.com",
  password: "Mypass@123",
};

let authToken = "";

test("Should signup a new user", async () => {
  await request(app).post("/users/sign_up").send(userOne).expect(201);
});

test("Should login with valid credentials", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

  authToken = response.body.token;
});

test("Should not login with invalid credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({ email: "Mike", password: "hello" })
    .expect(400);
});

test("Should get user profile with valid token", async () => {
  await request(app)
    .get("/users/me")
    .set({ Authorization: `Bearer ${authToken}` })
    .send()
    .expect(200);
});

test("Should not get user profile without token", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete user with valid token", async () => {
  await request(app)
    .delete("/users")
    .set({ Authorization: `Bearer ${authToken}` })
    .send()
    .expect(200);
});

test("Should not delete user without token", async () => {
  await request(app).delete("/users").send().expect(401);
});
