const { check, validationResult } = require("express-validator");

const checkString = (target, min, max) =>
  check(target)
    .isString()
    .isLength({ min })
    .withMessage(`at least ${min} characters long`)
    .isLength({ max })
    .withMessage(`at most ${max} characters long`);

const username = checkString("username", 2, 30);
const firstName = checkString("firstName", 2, 30);
const lastName = checkString("lastName", 2, 30);
const street = checkString("street", 2, 60);
const city = checkString("city", 2, 60);
const country = checkString("country", 2, 2);
const state = checkString("state", 2, 30);
const postcode = check("postcode").isPostalCode("any");
const phone = check("phone")
  .isNumeric()
  .withMessage("Not a valid number")
  .isLength({ min: 6 })
  .withMessage("at least 8 characters long")
  .isLength({ max: 20 })
  .withMessage("at most 15 characters long");
const email = check("email").isEmail().withMessage("invalid email address");
const password = checkString("password", 6, 30);

module.exports = {
  userSignupValidationRules: () => {
    return [username, email, password];
  },
  userLoginValidationRules: () => {
    return [username, password];
  },
  userEditValidationRules: () => {
    return [
      firstName,
      lastName,
      city,
      country,
      state,
      street,
      email,
      phone,
      postcode,
    ];
  },

  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
      errors: extractedErrors,
    });
  },
};
