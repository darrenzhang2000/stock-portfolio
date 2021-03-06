const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const path = require('path')

// parse application/x-www-form-encoded and application/json
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//models
const User = require('./models/User')

//routes
const users = require('./routes/users')
const stocks = require('./routes/stocks')
const transactions = require('./routes/transactions')

//allow cors
var cors = require('cors')
app.use(cors())

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

app.get("/", (req, res) => {
    console.log(req)
    res.send("hello")
})

app.use('/users', users)
app.use('/stocks', stocks)
app.use('/transactions', transactions)

let staticServe = express.static(path.join(__dirname, '../stock-portfolio-frontend/build'))
app.use("/", staticServe)
app.use("*", staticServe)

app.listen(port, () => console.log("listening at port", port))
