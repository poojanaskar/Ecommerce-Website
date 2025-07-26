const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productsId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "product" } // Array of product IDs
  ]
});

const WishList = mongoose.model("WishList", wishListSchema);
module.exports = WishList;
