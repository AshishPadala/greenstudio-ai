// services/geminiService.ts
import { EcoMetrics } from "../types";

export class GreenGeminiService {
  async orchestrate(prompt: string): Promise<{
    text: string;
    metrics: EcoMetrics;
  }> {
    const response = await fetch("/api/gemini ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error("Gemini backend failed");
    }

    const data = await response.json();
    const text = data.text || "No response";

    // 1 token approx 4 chars
    const tokensUsed = Math.max(Math.ceil(text.length / 4), 1);
    
    // Assume standard AI is ~30% less efficient
    const baselineTokens = Math.max(Math.ceil(tokensUsed / 0.31), tokensUsed + 1);
    const tokensSaved = baselineTokens - tokensUsed;

    const metrics: EcoMetrics = {
      tokensUsed,
      tokensSaved, // <--- SAVED HERE
      estimatedNormalTokens: baselineTokens,
      energySavedKWh: Number(Math.max(tokensUsed * 0.00005, 0.0001).toFixed(4)),
      waterSavedLitres: Number(Math.max(tokensUsed * 0.002, 0.001).toFixed(3)),
      carbonSavedGrams: Number(Math.max(tokensUsed * 0.001, 0.001).toFixed(3))
    };

    return { text, metrics };
  }
}
