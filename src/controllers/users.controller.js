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

const list = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  const _id = req.params.id;

  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const user = await User.findById(_id);

      if (!user) {
        res.status(404).send({ error: "Resource Not Found" });
      } else {
        res.send(user);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(422).send({ error: "Invalid parameter id" });
  }
};

const create = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
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
      const user = await User.findById(req.params.id);

      updateParams.forEach(
        (updateParam) => (user[updateParam] = req.body[updateParam])
      );

      await user.save();

      if (!user) {
        return res.status(404).send({ error: "Resource Not Found" });
      }

      return res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  }
};

const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).send({ error: "Resource Not Found" });
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  login,
  list,
  show,
  create,
  update,
  destroy,
};
