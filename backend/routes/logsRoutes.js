const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

router.post("/", async (req, res) => {
  const log = new Log(req.body);
  await log.save();
  res.json(log);
});

router.get("/", async (req, res) => {
  const logs = await Log.find({ userId: "demoUser" }).sort({ _id: -1 });
  res.json(logs);
});

module.exports = router;
