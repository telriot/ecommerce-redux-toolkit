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
    console.log("updated");
    for (let product of products) {
      const productToUpdate = await Product.findById(product._id);
      let updatedQuantity;
      if (action === "remove") {
        updatedQuantity = productToUpdate.quantity - product.quantity;
      }
      await productToUpdate.update({ quantity: updatedQuantity });
      await productToUpdate.save();
    }
    res.status(200).send("Items succesfully removed");
  },
};
