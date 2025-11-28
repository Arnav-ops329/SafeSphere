const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  date: String,
  mood: String,
  symptoms: [String],
  userId: { type: String, default: "demoUser" }
});

module.exports = mongoose.model("Log", logSchema);
