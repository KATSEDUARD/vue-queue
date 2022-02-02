const { Router } = require("express");
const controllers = require("../controllers");

const router = new Router();
router.route("/all").get(controllers.user.getUsers);
router.route("/").get(controllers.user.getUser).post(controllers.user.postAddUser);

module.exports = router;
