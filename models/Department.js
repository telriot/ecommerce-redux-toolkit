const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: String,
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

DepartmentSchema.plugin(mongoosePaginate);
const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;
