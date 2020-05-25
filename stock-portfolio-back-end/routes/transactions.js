const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")

//retrieve all of the user's transactions from the database
router.get("/email/:email", (req, res) => {
  var { email } = req.params

  Transaction.find({ email: email }, (err, transactionHistory) => {
    if (err) {
      res.send({ success: false, transactionHistory })
    } else {
      res.send({ success: true, transactionHistory })
    }
  })
})

// http://localhost:5000/transactions/email/:email/stock/:tickerSymb/qty/:qty/cost/:cost
//add a user's transaction into the db
router.post(
  "/email/:email/stock/:tickerSymb/qty/:qty/cost/:cost",
  async (req, res) => {
    var { email, tickerSymb, qty, cost } = req.params

    //create transaction
    const transaction = new Transaction({
      email,
      tickerSymb,
      qty,
      cost,
    })

    //save transaction into database
    transaction.save((err) => {
      if (err) {
        res.send({
          success: false,
          error: err,
        })
      } else {
        res.send({ success: true, msg: "Transaction succesfully saved" })
      }
    })
  }
)

module.exports = router
