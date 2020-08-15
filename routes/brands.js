var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const { getAllBrands, getBrandsList } = require("../controllers/brands");

router.get("/", asyncErrorHandler(getAllBrands));
router.get("/list", asyncErrorHandler(getBrandsList));
module.exports = router;
