const User = require("../models/User");
module.exports = {
  getAllUsers: async (req, res, next) => {
    console.log("users");
  },
  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  },
  updateUser: async (req, res, next) => {
    const { firstName, lastName, email, address, phone } = req.body;
    const updateObj = { firstName, lastName, email, address, phone };
    const user = await User.findByIdAndUpdate(req.params.id, updateObj);
    const updatedUser = await User.findByIdAndUpdate(req.params.id);
    res.send(updatedUser);
  },
};
