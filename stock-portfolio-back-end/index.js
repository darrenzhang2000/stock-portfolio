const express = require("express")
const app = express()

//connect to mongoose
var mongoose = require("mongoose")
mongoose.connect(
    "mongodb+srv://darren:test123@cluster0-evjbm.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true }
)

var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("connected to db")
})

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(3000, () => console.log("listening at port 3000"))
