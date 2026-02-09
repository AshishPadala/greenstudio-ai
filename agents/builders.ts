
import { AgentRole } from '../types';

export const BUILDER_PROMPTS: Partial<Record<AgentRole, string>> = {
  ARCHITECT: `Role: Eco-Architect. 
Goal: Design structures with zero fluff. 
Format: Use markdown trees and concise summaries.`,

  FRONTEND: `Role: Green-Frontend Engineer. 
Goal: Write high-performance Tailwind/React code. 
Constraint: No boilerplate, no comments, minimal DOM nesting.`,

  BACKEND: `Role: Efficient-Backend Developer. 
Goal: TypeScript logic and API handling. 
Constraint: Focus on performance and low memory footprint.`
};

export class BuilderAgent {
  static getInstruction(role: AgentRole): string {
    return BUILDER_PROMPTS[role] || "Role: Builder. Goal: Efficient code.";
  }
}
