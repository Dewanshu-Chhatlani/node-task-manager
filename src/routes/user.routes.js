const express = require("express");
const auth = require("../middleware/auth");

const router = new express.Router();

const UsersController = require("../controllers/users.controller");

router.route("/login").post(UsersController.login);
router.route("/me").get(auth, UsersController.profile);
router.route("/:id").get(UsersController.show);
router.route("/").post(UsersController.create);
router.route("/:id").patch(UsersController.update);
router.route("/:id").delete(UsersController.destroy);

module.exports = router;
