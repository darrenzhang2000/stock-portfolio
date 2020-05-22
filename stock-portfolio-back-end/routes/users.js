const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.send('login')
})

router.get('/register', (req, res) => {
    res.send('register')
})

router.post('/register', (req, res) => {
    //create a user using the payload
    const { name, email, password, balance } = req.body
    const user = new User({
        name: name,
        email: email, 
        password: password,
        balance: balance
    })

    //add the user to the db
    user.save(err => {
        if(err){
            console.log(err)
        }else{
            console.log('user successfully added: ', user)
        }
    })
})

module.exports = router