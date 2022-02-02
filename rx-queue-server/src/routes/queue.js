const { Router } = require("express");
const controllers = require("../controllers");

const router = new Router();
router.route("/all").get(controllers.queue.getQueues);
router.route("/").get(controllers.queue.getQueue).post(controllers.queue.postAddQueue);
router.route("/user").post(controllers.queue.postAddUserToQueue).delete(controllers.queue.deleteUserFromQueue);


module.exports = router;
