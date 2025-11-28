const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const cycleRoutes = require("./routes/cycleRoutes");
const logRoutes = require("./routes/logsRoutes");
const sosRoutes = require("./routes/sosRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/women_health")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/cycle", cycleRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/sos", sosRoutes);

app.get("/", (req, res) => {
  res.send("Women Health Backend Running");
});

app.listen(3000, () => console.log("Server running on port 3000"));
