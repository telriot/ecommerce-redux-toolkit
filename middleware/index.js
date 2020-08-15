const User = require("../models/User");
module.exports = {
  asyncErrorHandler: (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },
  isAuthorizedUser: async (req, res, next) => {
    if (!req.user) {
      let err = new Error("You are not autorized to access this route");
      err.status = 401;
      return next(err);
    }
    try {
      const user = await User.findById(req.user._id);
      if (user === null) {
        let err = new Error("You are not autorized to access this route");
        err.status = 401;
        return next(err);
      } else {
        return next();
      }
    } catch (error) {
      return next(error);
    }
  },
  isProfileOwner: async (req, res, next) => {
    if (req.params.id != req.user._id) {
      let err = new Error("You are not autorized to access this route");
      err.status = 401;
      return next(err);
    }
    return next();
  },
};
