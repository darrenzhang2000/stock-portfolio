const express = require("express")
const router = express.Router()
const Stock = require("../models/Stock")

//get the number of user's stocks
router.get("/email/:email/stock/:tickerSymb", async (req, res) => {
  var { email, tickerSymb} = req.params
  let doc = await Stock.findOne({ email: email, tickerSymb: tickerSymb }, (err, stock) => {
    if(!stock){
      res.send({ stockCount: 0 })
    }
  })
  //need to handle if user does not have stock
  res.send({ stockCount: doc.qty })
})

//update user's stock count
router.post("/email/:email/stock/:tickerSymb/qty/:qty", async (req, res) => {
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
        res.send("Successfully updated stock count")
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
            res.send("Added stock to db")
          }
        })
      }
    }
  )
})

//get all stocks belonging to the user
router.get("/email/:email/stock", async (req, res) => {
  var { email } = req.params
  let doc = await Stock.find({ email: email }, (err, user) => {
    if(err){
      res.send(err)
    }
    if (!user) {
      res.send({ error: "Email does not exist" })
    }
  })
  res.send(doc)
})
module.exports = router
