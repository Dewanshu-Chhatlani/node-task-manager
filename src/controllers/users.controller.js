const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send({ message: "Logged out!" });
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send({ message: "Logged out!" });
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const profile = async (req, res) => {
  res.send({ user: req.user });
};

const create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const update = async (req, res) => {
  const updateParams = Object.keys(req.body);
  const allowedParams = ["name", "email", "password", "age"];
  const invalidParam = updateParams.find(
    (updateParam) => !allowedParams.includes(updateParam)
  );

  if (invalidParam) {
    return res.status(400).send({
      error: `Invalid param: '${invalidParam}'`,
    });
  } else {
    try {
      updateParams.forEach(
        (updateParam) => (req.user[updateParam] = req.body[updateParam])
      );

      await req.user.save();

      return res.send(req.user);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
};

const destroy = async (req, res) => {
  try {
    await req.user.deleteOne();

    res.send(req.user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  login,
  logout,
  logoutAll,
  profile,
  create,
  update,
  destroy,
};
