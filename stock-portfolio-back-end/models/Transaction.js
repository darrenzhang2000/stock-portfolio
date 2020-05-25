var mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
  email: String,
  tickerSymb: String,
  qty: Number,
  cost: Number,
  time: {
      type: Date,
      default: Date.now
  }
})

module.exports = mongoose.model("Transaction", transactionSchema)
