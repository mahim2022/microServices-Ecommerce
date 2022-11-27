var router = require("express").Router();
var { register, login } = require("../controller/auth");
router.post("/login", login);
router.post("/register", register);

module.exports = router;
