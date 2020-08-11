var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getAllProducts,
  getProduct,
  updateProducts,
  getRecentViews,
  updateRecentViews,
} = require("../controllers/products");

/* GET home page. */
router.get("/", asyncErrorHandler(getAllProducts));
router.get("/:id", asyncErrorHandler(getProduct));
router.put("/", asyncErrorHandler(updateProducts));
router.get("/recentViews/:id", asyncErrorHandler(getRecentViews));
router.put("/recentViews/:id", asyncErrorHandler(updateRecentViews));
module.exports = router;
