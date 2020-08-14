const Product = require("../models/Product");
const User = require("../models/User");
module.exports = {
  getAllProducts: async (req, res, next) => {
    const {
      page,
      limit,
      textFilter,
      brandFilter,
      departmentFilter,
      minPriceFilter,
      maxPriceFilter,
      sortOrder,
    } = req.query;
    const options = {
      page,
      limit,
      sort: sortOrder,
    };
    const textSearchRegex = new RegExp(textFilter);

    const filterOptions = {
      name: { $regex: textSearchRegex, $options: "gi" },
      department: departmentFilter
        ? departmentFilter
        : { $regex: "", $options: "gi" },
      brand:
        brandFilter && brandFilter.length
          ? { $in: brandFilter }
          : { $regex: "", $options: "gi" },
      price:
        minPriceFilter && maxPriceFilter
          ? { $gte: minPriceFilter, $lte: maxPriceFilter }
          : minPriceFilter
          ? { $gte: minPriceFilter }
          : maxPriceFilter
          ? { $lte: maxPriceFilter }
          : { $gte: 0 },
    };

    const products = await Product.paginate(filterOptions, options);
    res.send(products);
  },
  getProduct: async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  },
  updateProducts: async (req, res, next) => {
    const { products, action } = req.body;
    for (let product of products) {
      const productToUpdate = await Product.findById(product._id);
      let updatedAvailability;
      if (action === "remove") {
        updatedAvailability = productToUpdate.availability - product.quantity;
      }
      await productToUpdate.update({ availability: updatedAvailability });
      await productToUpdate.save();
    }
    res.status(200).send("Items succesfully removed");
  },
  getRecentViews: async (req, res, next) => {
    const user = await User.findById(req.params.id)
      .populate("recentViews")
      .exec();
    res.status(200).json(user.recentViews);
  },
  updateRecentViews: async (req, res, next) => {
    const { recentViews } = req.body;
    await User.findByIdAndUpdate(req.params.id, { recentViews });
    const updatedUser = await User.findById(req.params.id)
      .populate("recentViews")
      .exec();
    res.status(200).json(updatedUser.recentViews);
  },
};
