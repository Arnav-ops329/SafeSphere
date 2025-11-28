const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  contact1: String,
  contact2: String,
  contact3: String,
  userId: { type: String, default: "demoUser" }
});

module.exports = mongoose.model("Sos", sosSchema);
