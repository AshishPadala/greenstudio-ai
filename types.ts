// types.ts

export type AgentRole = 'user' | 'system' | 'assistant';

export interface EcoMetrics {
  tokensUsed: number;
  tokensSaved: number;        // <--- NEW
  estimatedNormalTokens?: number;
  energySavedKWh: number;
  waterSavedLitres: number;
  carbonSavedGrams: number;
}

export interface Message {
  id: string;
  role: AgentRole;
  text: string;
  timestamp: number;
  metrics?: EcoMetrics;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  messages: Message[];
  sessionTotals: EcoMetrics;
}

export interface GlobalStats {
  totalCarbonSaved: number;
  totalEnergySaved: number;
  totalWaterSaved: number;
  totalTokensSaved: number;   // <--- NEW
}