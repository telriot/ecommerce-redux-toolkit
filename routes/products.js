var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getAllProducts,
  getProduct,
  updateProducts,
} = require("../controllers/products");

/* GET home page. */
router.get("/", asyncErrorHandler(getAllProducts));
router.get("/:id", asyncErrorHandler(getProduct));
router.put("/", asyncErrorHandler(updateProducts));
module.exports = router;
