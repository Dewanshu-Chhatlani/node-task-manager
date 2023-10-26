const Task = require("../models/task.model");

const list = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });

    res.send(tasks);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const show = async (req, res) => {
  const _id = req.params.id;

  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const task = await Task.findOne({ _id, owner: req.user._id });

      if (!task) {
        return res.status(404).send({ error: "Resource Not Found" });
      }

      res.send(task);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  } else {
    res.status(422).send({ error: "Invalid parameter: id" });
  }
};

const create = async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();

    res.status(201).send(task);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const update = async (req, res) => {
  const updateParams = Object.keys(req.body);
  const allowedParams = ["description"];
  const invalidParam = updateParams.find(
    (updateParam) => !allowedParams.includes(updateParam)
  );

  if (invalidParam) {
    return res.status(400).send({
      error: `Invalid param: '${invalidParam}'`,
    });
  } else {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        return res.status(404).send({ error: "Resource Not Found" });
      }

      updateParams.forEach(
        (updateParam) => (task[updateParam] = req.body[updateParam])
      );

      await task.save();

      return res.send(task);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
};

const destroy = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ error: "Resource Not Found" });
    }

    res.send(task);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  list,
  show,
  create,
  update,
  destroy,
};
