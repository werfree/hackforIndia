const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const driveSafe = require("../models/innerLoc");
const dicLoc = require("../models/locId");
const api = require("../modules/api");
var ObjectID = mongoose.ObjectID;
var fun = require("../modules/modules");

// Make connection
var db = mongoose.connection;

// Date
/*
 a.push({ status: "OK" });
        a.push({ result: {} });
        for (var i = 0; i < results.length; i++) {
          k = results[i]._id;
          c = results[i].count;
          console.log(k, c);
        }
        */
var d = new Date();

router.get("/", (req, res) => {
  var a = {};
  db.collection("diclocation")
    .find({})
    .toArray(function(err, results) {
      if (err) a = Object.assign({ status: err });
      else {
        a = Object.assign({ status: "OK", result: [] });

        for (var i = 0; i < results.length; i++) {
          k = results[i]._id;
          c = results[i].count;
          a.result.push({ _id: k, count: c });
          console.log(a, c);
          /*l = a[0];
          l.results[0].push({ k: c });*/
        }
        res.send(a);
      }
    });
});

router.post("/", (req, res) => {
  //api.policeAPI("20", "80");
  const post = {
    id: Date.now(),
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    phone: req.body.phone
  };
  const dic = {
    _id: post.latitude.slice(0, 7) + " " + post.longtitude.slice(0, 7),
    count: 1,
    time: Date.now(),
    police: {
      len: 1,
      1: 100
    }
  };
  //console.log(post[0].latitude + " " + post[0].longtitude);

  fun.findId(dic._id, data => {
    if (data.message == "Error") res.send("Error");
    else if (data.message == null) {
      console.log("Not Present");

      fun.insertId(dic, (err, data) => {
        if (err) {
          console.log("Error");
          req.statusCode(400);
          req.send({ message: "error" });
        } else {
          console.log(data.ops);
          fun.updateId(dic, post, 0, err => {
            if (err) {
              console.log("Error");
              req.statusCode(200);
              req.send({ message: "error" });
            } else {
              console.log("updateId Done");
            }
          });
        }
      });
    } else {
      console.log(data.message);
      inc = 0;
      const time = (post.id - data.message.time) / 1000;
      if (time > 5) {
        inc = 1;
      }
      console.log(inc, time);
      fun.updateId(dic, post, inc, err => {
        if (err) {
          console.log("Error");
        } else {
          console.log("updateId Done");
        }
      });
    }
  });
  res.send("400");
});

module.exports = router;
