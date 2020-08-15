const Order = require("../models/Order");
const User = require("../models/User");
module.exports = {
  postOrder: async (req, res, next) => {
    const { orderObj, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ message: "No authenticated user" });
    } else {
      const order = await new Order({
        ...orderObj,
        user,
        status: "processing",
      }).save();
      await user.orders.push(order);
      await user.save();
    }
    res.status(200).json({ message: "Order succesfully completed" });
  },
};
