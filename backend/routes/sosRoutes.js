const express = require("express");
const router = express.Router();
const Sos = require("../models/Sos");

router.post("/", async (req, res) => {
  let data = await Sos.findOne({ userId: "demoUser" });

  if (!data) {
    data = new Sos(req.body);
  } else {
    data.contact1 = req.body.contact1;
    data.contact2 = req.body.contact2;
    data.contact3 = req.body.contact3;
  }

  await data.save();
  res.json(data);
});

router.get("/", async (req, res) => {
  const data = await Sos.findOne({ userId: "demoUser" });
  res.json(data || {});
});

module.exports = router;
