const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: Object,
  itemTotal: Number,
  taxPercent: Number,
  shipping: Number,
  total: Number,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
