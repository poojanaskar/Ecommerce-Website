// const { model } = require("mongoose")
const  product = require("../db/product")



async function featuredProductFind(){
 const productNewList = await product.find({
       isFeature : true
  })

   const finalList = productNewList.map((item) => item.toObject());

  return finalList;
}

module.exports = featuredProductFind