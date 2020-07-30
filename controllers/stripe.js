const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
module.exports = {
  createIntent: async (req, res, next) => {
    const { amount, currency } = req.body;
    console.log("create intent controller");
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      //amount: calculateOrderAmount(items),
      amount,
      currency,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};
