const mongoose = require("mongoose");

const driveSafe = require("../models/innerLoc");
const dicLoc = require("../models/locId");
var db = mongoose.connection;
//var db = db.c;
exports.updateId = (dic, post, inc, callback) => {
  console.log("Func updateId");
  dicLoc.collection.updateOne(
    { _id: dic._id },
    {
      $inc: { count: inc },
      $set: { time: post.id },
      $push: {
        post
      }
    }
  );
  callback();
};

exports.insertId = (id, callback) => {
  dicLoc.collection.insertOne(id, (err, docs) => {
    if (err) {
      callback(err, docs);
    }
    callback(err, docs);
  });
};

exports.findId = (id, callback) => {
  console.log(id);
  var a;
  dicLoc.collection.findOne({ _id: id }, (err, obj) => {
    if (err) {
      console.log(err.errmsg);
      a = { message: "Error" };
    } else if (obj == null) a = { message: null };
    else a = { message: { _id: obj._id, count: obj.count, time: obj.time } };
    callback(a);
  });
};
/*
exports.cor = (post, dic,callback) => {
  this.findId("cList",(msg)=>{
    if(msg.message=="Error" || msg.message==null){
      this.insertId("cList");
    }
  })

};
*/
