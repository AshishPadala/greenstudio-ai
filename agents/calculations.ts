
import { ECO_CONSTANTS } from '../constants';

export class EnergyAgent {
  static calculate(tokensSaved: number): number {
    // Energy specialist logic: tracks kWh based on token delta
    return (tokensSaved / 1000) * ECO_CONSTANTS.KWH_PER_1K_TOKENS;
  }
}

export class CarbonAgent {
  static calculate(energyKWh: number): number {
    // Carbon specialist logic: converts power to CO2 grams
    return energyKWh * ECO_CONSTANTS.GRAMS_CO2_PER_KWH;
  }
}

export class WaterAgent {
  static calculate(tokensSaved: number): number {
    // Water auditor logic: lifecycle water usage in liters
    return (tokensSaved / 1000) * ECO_CONSTANTS.LITRES_WATER_PER_1K_TOKENS;
  }
}
