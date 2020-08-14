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
    const { status, text, time, page, ordersPerPage } = req.query;
    const filterOptions = {};
    const user = await User.findById(req.params.id).populate("orders").exec();
    let filteredOrders = user.orders;

    const isTextMatch = (name, text) => {
      if (!text) return true;
      const regex = RegExp(text, "i");
      return regex.test(name);
    };
    const isTimeMatch = (date, time) => {
      if (!time) return true;
      let parsedTimeObj = JSON.parse(time);
      console.log(parsedTimeObj);
      return (
        Date.parse(date) > Date.parse(parsedTimeObj.start) &&
        date < Date.parse(parsedTimeObj.end)
      );
    };
    const filterByValueText = (orders, regex) => {
      let filteredArr = [];
      for (let order of orders) {
        if (!isTimeMatch(order.date, time)) continue;
        for (let product of Object.keys(order.products)) {
          if (isTextMatch(order.products[product].name, text))
            filteredArr.push(order);
          break;
        }
      }
      return filteredArr;
    };

    if (text) {
      const textRegex = RegExp(text, "i");

      filteredOrders = filterByValueText(filteredOrders, textRegex);
    }
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    res.status(200).json({
      orders: filteredOrders
        .sort((a, b) => b.date - a.date)
        .slice(Math.floor((page - 1) * ordersPerPage), page * ordersPerPage),
      totalPages,
    });
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
