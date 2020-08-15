var express = require("express");
var router = express.Router();
const {
  asyncErrorHandler,
  isAuthorizedUser,
  isProfileOwner,
} = require("../middleware");
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
router.put("/", isAuthorizedUser, asyncErrorHandler(updateProducts));
router.get(
  "/recentViews/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(getRecentViews)
);
router.put(
  "/recentViews/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(updateRecentViews)
);
module.exports = router;
