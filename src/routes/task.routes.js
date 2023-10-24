const express = require("express");

const router = new express.Router();

const TasksController = require("../controllers/tasks.controller");

router.route("/").get(TasksController.list);
router.route("/:id").get(TasksController.show);
router.route("/").post(TasksController.create);
router.route("/:id").patch(TasksController.update);
router.route("/:id").delete(TasksController.destroy);

module.exports = router;
