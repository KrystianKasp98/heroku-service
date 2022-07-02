const mongoose = require("mongoose");

const quizSchema = {
  title: { type: String, required: true },
  vote: { type: Number, required: true, default: 0 },
};

module.exports = mongoose.model("Quiz", quizSchema);
