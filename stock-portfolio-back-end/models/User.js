var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number
})

module.exports = mongoose.model('User', userSchema)