const express = require('express')
router = express.Router()
const WishList = require("../db/whishList")

// POST /api/wishlist/add
router.post("/add", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await WishList.findOne({ userId });

    if (!wishlist) {
      wishlist = new WishList({ userId, productsId: [productId] });
    } else {
      if (!wishlist.productsId.includes(productId)) {
        wishlist.productsId.push(productId);
      }
    }

    await wishlist.save();
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// GET /api/wishlist/:userId
router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await WishList.findOne({ userId: req.params.userId })
      .populate("productsId" ); // Get product details

    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.delete("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const wishlist = await WishList.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishlist.productsId = wishlist.productsId.filter(
      (id) => id.toString() !== productId
    );
    await wishlist.save();

    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router