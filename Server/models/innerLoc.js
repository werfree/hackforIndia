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
  }
});

module.exports = mongoose.model("drivedafe", PostSchema, "geodatas");
