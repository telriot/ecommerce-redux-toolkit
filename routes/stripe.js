const express = require("express");
var router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const { createIntent } = require("../controllers/stripe");

router.post("/create-intent", asyncErrorHandler(createIntent));

module.exports = router;
