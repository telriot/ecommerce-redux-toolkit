var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getAllUsers,
  getUser,
  updateUser,
  getCart,
  updateCart,
  getOrders,
} = require("../controllers/users");
/* GET home page. */
router.get("/", asyncErrorHandler(getAllUsers));
router.get("/:id", asyncErrorHandler(getUser));
router.put("/:id", asyncErrorHandler(updateUser));
router.get("/cart/:id", asyncErrorHandler(getCart));
router.put("/cart/:id", asyncErrorHandler(updateCart));
router.get("/orders/:id", asyncErrorHandler(getOrders));
module.exports = router;
