const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  brand: String,
  description: String,
  quantity: Number,
  price: String,
  weight: Number,

  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
