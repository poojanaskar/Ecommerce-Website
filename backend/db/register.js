const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
   role: { type: String, enum: ["user", "admin"], default: "user" }
});

// The first argument is the collection name (singular, Mongoose will pluralize it automatically)
const Register = mongoose.model("Register", RegisterSchema);

module.exports = Register;
