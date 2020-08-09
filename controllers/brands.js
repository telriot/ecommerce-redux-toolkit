const Brand = require("../models/Brand");

module.exports = {
  getAllBrands: async (req, res, next) => {
    const brands = await Brand.find();
    res.send(brands);
  },
  getBrandsList: async (req, res, next) => {
    const brands = await Brand.find();
    const resObj = brands.map((brand) => ({
      name: brand.name,
      productsNumber: brand.products.length,
    }));
    res.status(200).send(resObj);
  },
};
