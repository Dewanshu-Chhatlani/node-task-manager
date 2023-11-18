const request = require("supertest");
const mailer = require("../src/utils/mailer");
const app = require("../src/app");
const User = require("../src/models/user.model");

const userOne = {
  name: "Jack",
  email: "jack.sparrow@gmail.com",
  age: 22,
  password: "Mypass@123",
};

let authToken = "";

test("Should signup a new user", async () => {
  const spy = jest.spyOn(mailer, "welcomeEmail");
  spy.mockReturnValue({});

  const response = await request(app)
    .post("/users/sign_up")
    .send(userOne)
    .expect(201);

  expect(response.body).toMatchObject({
    user: {
      name: userOne.name,
      email: userOne.email,
      age: userOne.age,
    },
  });
});

test("Should login with valid credentials", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: userOne.email, password: userOne.password })
    .expect(200);

  authToken = response.body.token;

  expect(response.body).toMatchObject({
    user: {
      name: userOne.name,
      email: userOne.email,
      age: userOne.age,
    },
  });
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

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set({ Authorization: `Bearer ${authToken}` })
    .attach("avatar", "tests/fixtures/profile.jpg")
    .expect(200);
});

test("Should delete user with valid token", async () => {
  const spy = jest.spyOn(mailer, "deletionEmail");
  spy.mockReturnValue({});

  const response = await request(app)
    .delete("/users")
    .set({ Authorization: `Bearer ${authToken}` })
    .send()
    .expect(200);

  const user = await User.findById(response.body._id);

  expect(user).toBeNull();
});

test("Should not delete user without token", async () => {
  await request(app).delete("/users").send().expect(401);
});
