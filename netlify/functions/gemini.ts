import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body || "{}");

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing prompt" })
      };
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.0-pro",
      systemInstruction:
        "Answer in one short factual sentence. No explanations. No lists."
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const text =
      result.response.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        ?.join(" ")
        ?.trim() || "No response";

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch (err: any) {
    console.error("Gemini function error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || "Gemini backend error"
      })
    };
  }
};
