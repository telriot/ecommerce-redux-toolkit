const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  productId: String,
  quantity: Number,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

CartItemSchema.plugin(mongoosePaginate);
const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
