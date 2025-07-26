const product = require("../db/product");
const category = require("../db/categorie");

async function getProductName(categoryName) {
  const Category = await category.findOne({ name: categoryName });
  if (!Category) {
    return []; // Category not found
  }

  const Products = await product.find({ categoryID: Category._id })
    .populate("categoryID", "name")
    .populate("BrandID", "name");

  return Products.map((doc) => doc.toObject());
}

module.exports = getProductName;
