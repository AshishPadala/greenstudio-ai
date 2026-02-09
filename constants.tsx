
import { AgentRole } from './types';

export const SYSTEM_BASE = `You are the GreenStudio Intelligence Core. 
Principle: Extreme Efficiency. 
Response Format: Keep outputs under 300 tokens if possible. Only provide code requested.`;

export const ECO_CONSTANTS = {
  KWH_PER_1K_TOKENS: 0.001,
  GRAMS_CO2_PER_KWH: 400,
  LITRES_WATER_PER_1K_TOKENS: 0.15,
  VERBOSE_MULTIPLIER: 3.2
};

export const AGENT_DESCRIPTIONS: Record<AgentRole, string> = {
  ORCHESTRATOR: 'Coordinates the builder and calculation lifecycle.',
  ARCHITECT: 'Designs folder structures and system logic.',
  FRONTEND: 'Generates minimalist React and Tailwind code.',
  BACKEND: 'Builds efficient APIs and data processing logic.',
  AUDITOR: 'Reviews files for token waste and redundancy.',
  ENERGY_AGENT: 'Specialist in data center power metrics.',
  CARBON_AGENT: 'Expert in carbon emission coefficients.',
  WATER_AGENT: 'Auditor for datacenter cooling water usage.'
};
