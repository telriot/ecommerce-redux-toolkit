var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const { getAllProducts, updateProducts } = require("../controllers/products");

/* GET home page. */
router.get("/", asyncErrorHandler(getAllProducts));
router.put("/", asyncErrorHandler(updateProducts));
module.exports = router;
