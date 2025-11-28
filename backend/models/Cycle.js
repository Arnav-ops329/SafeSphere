const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema({
  lastPeriod: String,
  cycleLength: Number,
  userId: { type: String, default: "demoUser" }
});

module.exports = mongoose.model("Cycle", cycleSchema);
