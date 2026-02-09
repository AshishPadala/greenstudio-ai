import { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

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

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction:
          "Answer in one short factual sentence. No explanations. No lists.",
        temperature: 0.1,
        maxOutputTokens: 40
      }
    });

    const text = response.text || "No response";

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch (err: any) {
    console.error("Gemini function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
