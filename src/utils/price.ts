import type { PriceLevel } from "../types/price";

const LEVELS_COUNT = 30;
const BASE_PRICE = 100;

export const generateInitialLevels = (): PriceLevel[] => {
  const levels: PriceLevel[] = [];

  for (let i = 0; i < LEVELS_COUNT; i++) {
    const price = BASE_PRICE + i;
    levels.push({
      price,
      bidSize: 0,
      askSize: 0,
    });
  }

  return levels;
};
