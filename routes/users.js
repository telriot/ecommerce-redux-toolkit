var express = require("express");
var router = express.Router();
const {
  asyncErrorHandler,
  isAuthorizedUser,
  isProfileOwner,
} = require("../middleware");
const {
  getAllUsers,
  getUser,
  updateUser,
  getCart,
  updateCart,
  getOrders,
  getWishlistItems,
  updateWishlist,
  addNewAddress,
  removeAddress,
} = require("../controllers/users");
/* GET home page. */
router.get("/", asyncErrorHandler(getAllUsers));
router.get(
  "/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(getUser)
);
router.put(
  "/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(updateUser)
);
router.get(
  "/cart/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(getCart)
);
router.put(
  "/cart/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(updateCart)
);
router.get(
  "/orders/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(getOrders)
);
router.get(
  "/wishlist/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(getWishlistItems)
);
router.put(
  "/wishlist/:id",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(updateWishlist)
);
router.put(
  "/:id/new-address",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(addNewAddress)
);
router.delete(
  "/:id/remove-address",
  isAuthorizedUser,
  isProfileOwner,
  asyncErrorHandler(removeAddress)
);
module.exports = router;
