const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction")

router.get('/hello', (req, res) => res.send('hi'))

//add a user's transaction into the db
router.post(
  "/email/:email/stock/:tickerSymb/qty/:qty/cost/:cost",
  async (req, res) => {
    var { email, tickerSymb, qty, cost } = req.params
    console.log(req.params)
    //create transaction
    const transaction = new Transaction({
      email: email,
      tickerSymb: tickerSymb,
      qty: qty,
      cost: cost,
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
