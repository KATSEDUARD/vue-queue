const { Router } = require("express");

const queue = require("./queue");
const user = require("./user");

const router = new Router();

router.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    return next();
});

router.use("/user", user);
router.use("/queue", queue);

module.exports = router;
