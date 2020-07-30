var express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const { getAllUsers, getUser, updateUser } = require("../controllers/users");
/* GET home page. */
router.get("/", asyncErrorHandler(getAllUsers));
router.get("/:id", asyncErrorHandler(getUser));
router.put("/:id", asyncErrorHandler(updateUser));
module.exports = router;
