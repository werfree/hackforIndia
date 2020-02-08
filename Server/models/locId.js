const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  _id: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("drivesafe", PostSchema, "diclocation");
