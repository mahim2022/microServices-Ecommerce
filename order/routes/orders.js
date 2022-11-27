var router = require("express").Router();
var { buyNow } = require("../controller/orders");
var authMiddleware = require("../authMiddleWare");

router.post("/buynow", authMiddleware, buyNow);

module.exports = router;
