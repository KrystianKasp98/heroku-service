const mongoose = require("mongoose");

const newsSchema = {
  title: { type: String, required: [true, "please add title"] }, //this force that title is always required
  description: { type: String, required: [true, "please add description"] },
  created: { type: Date, default: Date.now },
};

module.exports = mongoose.model('News', newsSchema);