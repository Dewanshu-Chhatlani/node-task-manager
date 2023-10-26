const express = require("express");

const auth = require("../middleware/auth");

const router = new express.Router();

const TasksController = require("../controllers/tasks.controller");

router.route("/").get(auth, TasksController.list);
router.route("/:id").get(auth, TasksController.show);
router.route("/").post(auth, TasksController.create);
router.route("/:id").patch(auth, TasksController.update);
router.route("/:id").delete(auth, TasksController.destroy);

module.exports = router;
