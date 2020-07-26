const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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

ProductSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
