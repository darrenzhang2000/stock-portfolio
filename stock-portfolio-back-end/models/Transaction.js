var mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
  email: String,
  tickerSymb: String,
  qty: Number,
  cost: Number,
  time: {
      type: Date,
      default: Date.now
  },
  url: String
})

module.exports = mongoose.model("Transaction", transactionSchema)
