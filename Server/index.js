/*
    SAyantan GHosh
    gsayantan01@gmail.com
    DriveSafe
*/

// Imports

var express = require("express");
var mongoose = require("mongoose");
const app = express();
var postRouter = require("./routes/post");

// Environment variables

require("dotenv/config");

// Middle Ware

app.use("/post", postRouter);

// Routes

app.get("/", (req, res) => {
  res.send("We are on home");
  console.log(process.env.connect);
});

//Connect to DB

mongoose.connect(process.env.connect, { useNewUrlParser: true }, () => {
  console.log("Connect to DB");
});

// Listning

app.listen(3000);
