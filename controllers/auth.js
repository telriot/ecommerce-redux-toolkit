const User = require("../models/User");

module.exports = {
  CLIENT_HOME_PAGE_URL: "http://localhost:3000",
  getAuth: async (req, res, next) => {
    console.log("auth");
  },
  getLoginSuccess: async (req, res, next) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
      });
    } else {
      res.json({
        success: false,
        message: "no authenticated user",
        user: null,
      });
    }
  },
  getLoginFailed: async (req, res, next) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  },
  getLogout: async (req, res, next) => {
    req.logout();
    res.redirect(module.exports.CLIENT_HOME_PAGE_URL);
  },
  createUser: async (req, res, next) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(401).json({
        success: false,
        error: `The username '${username}' is already in use`,
      });
    } else {
      const newUser = await new User({
        firstName: "",
        lastName: "",
        username,
        password,
        email,
        cart: {
          products: {},
          count: 0,
          shipping: 0,
          itemTotal: 0,
          taxPercent: 0,
          total: 0,
        },
        orders: [],
        wishlist: [],
        recentViews: [],
      });
      newUser.save();
      res.status(200).json({
        success: true,
        message: "User succesfully registered",
        user: newUser,
      });
    }
  },
  loginUser(req, res, next) {
    const { username, _id } = req.user;
    const user = { username: username, _id: _id };
    res.send({ success: true, user });
  },
};
