// const { model } = require("mongoose")
const  product = require("../db/product")



async function NewProductFind(){
 const productNewList = await product.find({
       isNewProduct: true
  })

   const finalList = productNewList.map((item) => item.toObject());

  return finalList;
}

module.exports = NewProductFind