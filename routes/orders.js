var express = require("express");
var router = express.Router();
const { asyncErrorHandler, isAuthorizedUser } = require("../middleware");
const { postOrder } = require("../controllers/orders");

/* GET home page. */
router.post("/", asyncErrorHandler(postOrder));

module.exports = router;
