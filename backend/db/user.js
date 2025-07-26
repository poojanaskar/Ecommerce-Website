const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
              name: String ,
              email: String,
              password: String,
              isAdming: Boolean
})
user = mongoose.model("user" , userSchema);
module.exports =user ;
  