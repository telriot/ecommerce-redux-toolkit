var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
  getAllDepartments,
  getDepartmentsList,
} = require("../controllers/departments");

/* GET home page. */
router.get("/", asyncErrorHandler(getAllDepartments));
router.get("/list", asyncErrorHandler(getDepartmentsList));
module.exports = router;
