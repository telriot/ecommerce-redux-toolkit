var express = require("express");
var router = express.Router();
const { asyncErrorHandler, isAuthorizedUser } = require("../middleware");
const {
  getAuth,
  getLoginSuccess,
  getLoginFailed,
  getLogout,
  createUser,
  loginUser,
  CLIENT_HOME_PAGE_URL,
} = require("../controllers/auth");
const {
  userSignupValidationRules,
  userLoginValidationRules,
  validate,
} = require("../validators");

const passport = require("../passport");

/* GET home page. */
router.get("/", asyncErrorHandler(getAuth));
router.get("/login/success", asyncErrorHandler(getLoginSuccess));
router.get("/login/failed", asyncErrorHandler(getLoginFailed));
router.get("/logout", isAuthorizedUser, asyncErrorHandler(getLogout));
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/api/auth/login/failed",
  })
);
router.post(
  "/signup",
  userSignupValidationRules(),
  validate,
  asyncErrorHandler(createUser)
);
router.post(
  "/login",
  userLoginValidationRules(),
  validate,
  passport.authenticate("local"),
  asyncErrorHandler(loginUser)
);

module.exports = router;
