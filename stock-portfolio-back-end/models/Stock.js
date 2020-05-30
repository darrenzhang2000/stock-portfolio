var mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
  tickerSymb: String,
  qty: Number,
  email: String,
  url: String
})

module.exports = mongoose.model("Stock", stockSchema)
