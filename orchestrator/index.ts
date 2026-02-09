
import { GeminiService } from '../services/gemini';
import { BuilderAgent } from '../agents/builders';
import { EnergyAgent, CarbonAgent, WaterAgent } from '../agents/calculations';
import { AgentRole, AgentLogEntry, EcoMetrics, EcoMode } from '../types';
import { SYSTEM_BASE, ECO_CONSTANTS } from '../constants';

export class Orchestrator {
  private gemini: GeminiService;

  constructor() {
    this.gemini = new GeminiService();
  }

  private log(agent: AgentRole, status: string): AgentLogEntry {
    return { agent, status, timestamp: Date.now() };
  }

  async processRequest(
    prompt: string,
    activeWorker: AgentRole,
    history: any[] = []
  ): Promise<{ text: string; metrics: EcoMetrics; logs: AgentLogEntry[] }> {
    const logs: AgentLogEntry[] = [];

    // 1. Planning phase
    logs.push(this.log('ORCHESTRATOR', `Routing to ${activeWorker}...`));

    // 2. Builder phase
    const systemInstruction = `${SYSTEM_BASE}\n${BuilderAgent.getInstruction(activeWorker)}`;
    logs.push(this.log(activeWorker, 'Generating optimized output...'));
    
    const text = await this.gemini.generate(prompt, systemInstruction, history);

    // 3. Calculation phase - Token Math
    const actualTokens = Math.ceil(text.length / 4);
    const estNormal = Math.round(actualTokens * ECO_CONSTANTS.VERBOSE_MULTIPLIER);
    const tokensSaved = estNormal - actualTokens;

    logs.push(this.log('ENERGY_AGENT', 'Calculating energy savings...'));
    const energy = EnergyAgent.calculate(tokensSaved);

    logs.push(this.log('CARBON_AGENT', 'Evaluating CO2 displacement...'));
    const carbon = CarbonAgent.calculate(energy);

    logs.push(this.log('WATER_AGENT', 'Auditing water footprint...'));
    const water = WaterAgent.calculate(tokensSaved);

    logs.push(this.log('ORCHESTRATOR', 'Consolidating eco-audit report.'));

    return {
      text,
      logs,
      metrics: {
        tokensUsed: actualTokens,
        estimatedNormalTokens: estNormal,
        energySavedKWh: energy,
        waterSavedLitres: water,
        carbonSavedGrams: carbon
      }
    };
  }
}
