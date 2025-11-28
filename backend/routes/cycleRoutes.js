const express = require("express");
const router = express.Router();
const Cycle = require("../models/Cycle");

router.post("/", async (req, res) => {
  const { lastPeriod, cycleLength } = req.body;

  let data = await Cycle.findOne({ userId: "demoUser" });

  if (!data) {
    data = new Cycle({ lastPeriod, cycleLength });
  } else {
    data.lastPeriod = lastPeriod;
    data.cycleLength = cycleLength;
  }

  await data.save();
  res.json(data);
});

router.get("/", async (req, res) => {
  const data = await Cycle.findOne({ userId: "demoUser" });
  res.json(data || {});
});

module.exports = router;
