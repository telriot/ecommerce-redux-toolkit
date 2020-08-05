const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const e = require("express");
module.exports = {
  getAllOrders: async (req, res, next) => {
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
    };
    const orders = await Order.paginate({}, options);
    res.send(orders);
  },
  postOrder: async (req, res, next) => {
    const { orderObj, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ message: "No authenticated user" });
    } else {
      const order = await new Order({ ...orderObj, user }).save();
      await user.orders.push(order);
      await user.save();
    }
    res.status(200).json({ message: "Order succesfully stored" });
  },
};
