const express = require("express");
const auth = require("../middleware/auth");

const router = new express.Router();

const UsersController = require("../controllers/users.controller");

router.route("/login").post(UsersController.login);
router.route("/sign_up").post(UsersController.create);
router.route("/logout").post(auth, UsersController.logout);
router.route("/logoutAll").post(auth, UsersController.logoutAll);
router.route("/me").get(auth, UsersController.profile);
router.route("/").patch(auth, UsersController.update);
router.route("/").delete(auth, UsersController.destroy);

module.exports = router;
