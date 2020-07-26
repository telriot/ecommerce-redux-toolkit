const Product = require("../models/Product");

module.exports = {
  getAllProducts: async (req, res, next) => {
    const { page, limit } = req.query;
    const options = {
      page,
      limit,
    };
    const products = await Product.paginate({}, options);
    res.send(products);
  },
};
