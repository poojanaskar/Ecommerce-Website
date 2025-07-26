const mongoose = require("mongoose");
const categories = require("./categorie");
const Schema = mongoose.Schema;
const productSchema =mongoose.Schema({
              name: String,
              description: String,
              discount: Number,
              Price:Number ,
              shortDescription: String,
              images : Array(String),
              categoryID: {type:Schema.Types.ObjectId , ref: 'categories'},
              BrandID: {type:Schema.Types.ObjectId , ref: 'brand'},
                isNewProduct :Boolean ,
      isFeature : Boolean
})

const product = mongoose.model("product" , productSchema);
module.exports= product;