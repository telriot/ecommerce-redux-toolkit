const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require("../models/Product");
const calculateOrderAmount = async (products) => {
  let amount = 0;
  for (let product of Object.values(products)) {
    const dbProduct = await Product.findById(product._id);
    amount +=
      parseFloat(dbProduct.price.slice(1, -1)).toFixed(2) * product.itemsInCart;
  }
  return amount * 100;
};
module.exports = {
  createIntent: async (req, res, next) => {
    const { products } = req.body;
    const currency = "usd";
    const amount = await calculateOrderAmount(products);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};
