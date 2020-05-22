const express = require("express")
const app = express()

//models
const User = require('./models/User')

//routes
const users = require('./routes/users')

//connect to mongoose
const mongoose = require("mongoose")
mongoose.connect(
    "mongodb+srv://darren:test123@cluster0-evjbm.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("connected to db")
})

// const darren = new User({
//     name: "Darren",
//     email: "123@gmail.com",
//     password: "test123",
//     balance: 5000
// })

// darren.save((err) => {
//     if(err){
//         console.log(err)
//     }
// })


app.get("/", (req, res) => {
    res.send("hello")
})

app.use('/users', users)

app.listen(5000, () => console.log("listening at port 5000"))
