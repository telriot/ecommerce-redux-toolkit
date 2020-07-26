var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const { getAllProducts } = require("../controllers/products");

/* GET home page. */
router.get("/", asyncErrorHandler(getAllProducts));

module.exports = router;
