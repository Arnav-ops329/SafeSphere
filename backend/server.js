require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json());

// AI Assistant route
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "OPENAI_API_KEY missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that gives safe, general menstrual health guidance. You never diagnose, never prescribe medications, and always remind the user to consult a doctor for serious or personal medical issues.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 250,
        temperature: 0.4,
      }),
    });

    const data = await response.json();
    const botText =
      data.choices?.[0]?.message?.content ||
      "I’m sorry, I couldn’t think of an answer. Please try again.";

    res.json({ reply: botText });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({
      error: "Something went wrong while contacting the AI service.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend listening on port", PORT);
});
