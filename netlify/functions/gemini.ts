import { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt } = JSON.parse(event.body || "{}");

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction:
        "Answer in ONE short sentence. No explanations. No lists. No markdown. No refusal unless unsafe."
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text()?.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: text || "No response"
      })
    };
  } catch (err: any) {
    console.error("Gemini error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        text: "No response"
      })
    };
  }
};
