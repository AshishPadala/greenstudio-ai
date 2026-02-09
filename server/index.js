import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview"
});

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    //const result = await model.generateContent(prompt);
    const result = await model.generateContent({
  contents: [
    {
      role: "system",
      parts: [
        {
          text: `
You are GreenGemini, an eco-optimized AI assistant.

Rules:
- Give the shortest correct answer possible
- Avoid explanations unless explicitly asked
- Prefer single-sentence answers
- Do NOT list multiple interpretations
- Do NOT add extra context
- Do NOT use bullet points unless required
- Optimize for minimal token usage
- Assume the user wants the most direct answer

If a question has a clear factual answer, give ONLY that answer.
`
        }
      ]
    },
    {
      role: "user",
      parts: [{ text: prompt }]
    }
  ]
});

    const text = result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error("Empty Gemini response");
    }

    res.json({ text });
  } catch (err) {
    console.error("❌ Gemini backend error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(5174, () => {
  console.log("✅ Gemini AI Studio proxy running on http://localhost:5174");
});
