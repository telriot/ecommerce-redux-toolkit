var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const { getAllOrders, postOrder } = require("../controllers/orders");

/* GET home page. */
router.get("/", asyncErrorHandler(getAllOrders));
router.post("/", asyncErrorHandler(postOrder));

module.exports = router;
