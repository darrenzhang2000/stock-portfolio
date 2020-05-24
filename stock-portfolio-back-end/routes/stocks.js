const express = require("express")
const router = express.Router()
const Stock = require("../models/Stock")

router.post("/email/:email/stock/:tickerSymb/qty/:qty", async (req, res) => {
  console.log(req.params.email, req.params.stock)

  var { email, tickerSymb, qty } = req.params

  Stock.findOne(
    { email: email, tickerSymb: tickerSymb },
    async (err, stock) => {
      if (stock) {
        //if user already has shares of this stock, update stock count
        let doc = await Stock.findOne({ email: email, tickerSymb: tickerSymb })
        console.log("s", doc.qty)
        doc.qty += parseInt(qty)
        await doc.save()
      } else {
        //otherwise create stock and store stock into the db
        const stock = new Stock({
          tickerSymb: tickerSymb,
          email: email,
          qty: qty,
        })
        stock.save((err) => {
          if (err) {
            console.log(err)
          } else {
            console.log("Stock added to db")
          }
        })
      }
    }
  )
})

module.exports = router
