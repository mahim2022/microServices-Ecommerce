var router = require("express").Router();
var { getAllProducts, postNewProduct } = require("../controller/product.js");
var authMiddleware = require("../authMiddleWare");

router.get("/", getAllProducts);
router.post("/create", authMiddleware, postNewProduct);

module.exports = router;
