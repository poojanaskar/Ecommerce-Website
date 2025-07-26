const mongoose = require("mongoose")
const categorieSchema = mongoose.Schema({

              name: String
})

const categories =mongoose.model("categories" , categorieSchema  ) ;
module.exports= categories