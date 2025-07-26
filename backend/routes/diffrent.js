const express = require("express");
const router = express.Router();
const getProductName = require("../handler/diffrent");

router.get("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const products = await getProductName(name);

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
