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
  getSelectedProducts: async (req, res, next) => {},
};
