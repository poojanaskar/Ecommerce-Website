const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({

        "name": String      
})
const brand = mongoose.model("brand" , brandSchema);
module.exports = brand