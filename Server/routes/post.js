const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const driveSafe = require("../models/innerLoc");
const dicLoc = require("../models/dicLoc");

// Make connection

var db = mongoose.connection;
console.log(db.collection);

router.get("/", (req, res) => {
  res.send("We are on post");
});

router.post("/", (req, res) => {
  const post = [
    {
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
      phone: req.body.phone
    }
  ];

  const dic = { location: post[0].latitude + " " + post[0].longtitude };
  console.log(post[0].latitude + " " + post[0].longtitude);

  dicLoc.findOne(dic, (err, person) => {
    if (err) {
      res.json({ Error: "Error" });
    } else if (person) {
      res.send(person);
    } else {
      res.send("Not Present");
    }
  });
  /*dicLoc.collection.insertOne(dic, (err, docs) => {
    if (err) {
      res.json({ message: dic });
    } else {
      console.log("Inserted");
      res.json({ message: "Done" });
    }
  });*/
});

module.exports = router;
