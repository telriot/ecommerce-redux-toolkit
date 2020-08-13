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
    await User.findByIdAndUpdate(req.params.id, { cart });
    const updatedUser = await User.findById(req.params.id);
    res.status(200).json(updatedUser.cart);
  },
  getOrders: async (req, res, next) => {
    const { status, text, time } = req.query;
    const filterOptions = {};
    const user = await User.findById(req.params.id).populate("orders").exec();
    let filteredOrders = user.orders;
    if (text) {
      const textRegex = RegExp(text, "i");
      filteredOrders = filteredOrders.filter((order) =>
        Object.values(order.products).some((product) =>
          textRegex.test(product.name)
        )
      );
    }
    res.status(200).json(filteredOrders.sort((a, b) => b.date - a.date));
  },
  getWishlistItems: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("wishlist").exec();
    res.status(200).json(user.wishlist);
  },
  updateWishlist: async (req, res, next) => {
    const { wishlist } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { wishlist });
    await user.save();
    res.status(200).json(user.wishlist);
  },
};
