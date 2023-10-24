const Task = require("../models/task.model");

const list = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  const _id = req.params.id;

  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const task = await Task.findById(_id);

      if (!task) {
        res.status(404).send({ error: "Resource Not Found" });
      } else {
        res.send(task);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  } else {
    res.status(422).send({ error: "Invalid parameter: id" });
  }
};

const create = async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
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
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!task) {
        return res.status(404).send({ error: "Resource Not Found" });
      }

      return res.send(task);
    } catch (e) {
      res.status(400).send(e);
    }
  }
};

const destroy = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send({ error: "Resource Not Found" });
    } else {
      res.send(task);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  list,
  show,
  create,
  update,
  destroy,
};
