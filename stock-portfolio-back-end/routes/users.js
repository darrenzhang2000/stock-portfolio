const express = require("express")
const router = express.Router()
const User = require("../models/User")

//for hashing passwords
const bcrypt = require("bcrypt")
const saltRounds = 10

async function passMatch(user, password) {
  //compares inputted password with hashed password in db
  const match = await bcrypt.compare(password, user.password)
  return match
}

router.get("/login/email/:email/password/:password", (req, res) => {
  // console.log("email", req.params.email, req.params.password)

  //find user with given email in the database
  User.findOne({ email: req.params.email }, async (err, user) => {
    //no user in database has specified email
    if (!user) {
      res.send("User does not exist")
    } else {
      //email exists but incorrect password
      let match = await passMatch(user, req.params.password)
      if (!match) {
        console.log("email exists but incorrect password")
        res.send("email exists but incorrect password")
      } else {
        //email and passwords match
        console.log("Success: email and password match")
        res.send("Success: email and password match")
      }
    }
  })
})

router.get("/register", (req, res) => {
  res.send("register")
})

router.post("/register", (req, res) => {
  var { name, email, password, balance } = req.body.user

  //hash password
  bcrypt.hash(password, saltRounds, function (err, hash) {
    let hashedPassword = hash

    //create a user using the payload and hashed password
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      balance: balance,
    })

    User.find({ email: user.email }, (err, emails) => {
      //if user already exists in database
      if (emails.length) {
        res.send("Email already exists")
      } else {
        //add the user to the db
        user.save((err) => {
          if (err) {
            console.log(err)
          } else {
            console.log("user successfully added: ", user)
          }
        })
        res.send("User successfully added")
      }
    })
  })
})

//get user balance
router.get("/email/:email/balance", async (req, res) => {
  var { email } = req.params
  let doc = await User.findOne({ email: email }, (err, user) => {
    if (!user) {
      res.send({ error: "Email does not exist" })
    }
  })
  res.send({ balance: doc.balance })
})

//update user balance
router.post("/email/:email/balance/:balance", async (req, res) => {
  var { email, balance } = req.params
  let doc = await User.findOne({ email: email }, (err, user) => {
    if(err){
        res.send(err)
    }
    if (!user) {
      res.send({ error: "Email does not exist" })
    }
  })
  //set new balance
  doc.balance = balance
  doc.save()
  res.send({ sucess: true, msg: `Your new balance is ${balance}` })
})

module.exports = router
