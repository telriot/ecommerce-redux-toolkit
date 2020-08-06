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
    await user.save();
    const updatedUser = await User.findById(req.params.id);
    res.send(updatedUser);
  },
  getCart: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user.cart);
  },
  updateCart: async (req, res, next) => {
    const { cart } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { cart });
    await user.save();
    res.status(200).json(user.cart);
  },
  getOrders: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("orders").exec();
    res.status(200).json(user.orders);
  },
  getWishlistItems: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("wishlist").exec();
    res.status(200).json(user.wishlist);
  },
  updateWishlist: async (req, res, next) => {
    const { wishlist } = req.body;
    console.log(wishlist);
    const user = await User.findByIdAndUpdate(req.params.id, { wishlist });
    await user.save();
    res.status(200).json(user.wishlist);
  },
};
