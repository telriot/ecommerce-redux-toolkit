const User = require("../models/User");

const timeOptions = [
  {
    start: new Date(Date.now() - 999999800000),
    end: new Date(Date.now() + 3600),
  },
  {
    start: new Date(Date.now() - 2629800000),
    end: new Date(Date.now() + 3600),
  },
  {
    start: new Date(Date.now() - 31557600000),
    end: new Date(Date.now() + 3600),
  },
  {
    start: new Date("2020-01-01"),
    end: new Date("2020-12-31T23:59:59"),
  },
  {
    start: new Date("2019-01-01"),
    end: new Date("2019-12-31T23:59:59"),
  },
];

module.exports = {
  getAllUsers: async (req, res, next) => {
    console.log("users");
  },
  getUser: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  },
  updateUser: async (req, res, next) => {
    const updateObj = { ...req.body };
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
    const user = await User.findById(req.params.id).populate("orders").exec();
    let filteredOrders = user.orders;

    const isTextMatch = (name, text) => {
      if (!text) return true;
      const regex = RegExp(text, "i");
      return regex.test(name);
    };
    const isTimeMatch = (date, time) => {
      if (!time) {
        return true;
      } else {
        let { start, end } = timeOptions[time];
        return Date.parse(date) > Date.parse(start) && date < Date.parse(end);
      }
    };
    const isStatusMatch = (orderStatus, status) => {
      if (!status) return true;
      return orderStatus === status;
    };
    const filterOrders = (orders) => {
      let filteredArr = [];
      for (let order of orders) {
        if (!isTimeMatch(order.date, time)) continue;
        if (!isStatusMatch(order.status, status)) continue;
        for (let product of Object.keys(order.products)) {
          if (isTextMatch(order.products[product].name, text))
            filteredArr.push(order);
          break;
        }
      }
      return filteredArr;
    };

    filteredOrders = filterOrders(filteredOrders);
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
  addNewAddress: async (req, res, next) => {
    const address = req.body;
    const user = await User.findById(req.params.id);
    await user.addressList.push(address);
    await user.save();
    res.status(200).json(user.addressList);
  },
  removeAddress: async (req, res, next) => {
    const { index } = req.query;
    const user = await User.findById(req.params.id);
    await user.addressList.splice(index, 1);
    await user.save();
    res.status(200).json(user.addressList);
  },
};
