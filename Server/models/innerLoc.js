const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  latitude: {
    type: String,
    required: true
  },
  longtitude: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    required: Date.now
  }
});

module.exports = mongoose.model("location", PostSchema, "diclocations");
