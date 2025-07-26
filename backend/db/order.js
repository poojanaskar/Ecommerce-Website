const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  date: Date,
  items: Array(any),
  status: Number,
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
