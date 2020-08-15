const express = require("express");
var router = express.Router();
const { asyncErrorHandler, isAuthorizedUser } = require("../middleware");
const { createIntent } = require("../controllers/stripe");

router.post(
  "/create-intent",
  isAuthorizedUser,
  asyncErrorHandler(createIntent)
);

module.exports = router;
