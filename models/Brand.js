const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: String,
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

BrandSchema.plugin(mongoosePaginate);
const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
