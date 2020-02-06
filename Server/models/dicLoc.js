const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  dicLocation: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("drivesafe", PostSchema, "dicLocation");
