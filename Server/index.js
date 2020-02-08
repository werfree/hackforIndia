/*
    SAyantan GHosh
    gsayantan01@gmail.com
    DriveSafe
*/

// Imports

var express = require("express");
var mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
var postRouter = require("./routes/post");

// Environment variables

require("dotenv/config");

// Middle Ware

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/post", postRouter);

// Routes

app.get("/", (req, res) => {
  res.send("We are on home");
  console.log(process.env.connect);
});

//Connect to DB

mongoose.connect(process.env.connect, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Unable to connect to Db");
    process.exit;
  } else {
    console.log("Connect to DB");
  }
});

// Listning

app.listen(3000);
