const express = require("express")
const router = express.Router()
const User = require("../models/User")

//for hashing passwords
const bcrypt = require("bcrypt")
const saltRounds = 10

router.get("/login", (req, res) => {
    res.send("login")
})

router.get("/register", (req, res) => {
    res.send("register")
})

router.post("/register", (req, res) => {
    var { name, email, password, balance } = req.body

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
                console.log("Email already exists")
            } 

            else {
                //add the user to the db
                user.save((err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        // console.log('user successfully added: ', user)
                    }
                })
            }
        })
    })
})

module.exports = router
