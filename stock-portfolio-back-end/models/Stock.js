var mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  userID: Number,
})

module.exports = mongoose.Model("Stock", stockSchema)
