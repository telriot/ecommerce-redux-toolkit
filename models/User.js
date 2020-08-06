const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Order = require("../models/Order");

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    name: String,
    screenName: String,
    twitterId: String,
    profileImageUrl: String,
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    phone: String,
    cart: {
      products: Object,
      count: Number,
      shipping: Number,
      itemTotal: Number,
      taxPercent: Number,
      total: Number,
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
