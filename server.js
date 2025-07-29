const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // ✅ correct model name

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`✅ Sky-Fi Gemini server running on http://localhost:${port}`);
});
