import { useEffect, useState } from "react";
import type { PriceLevel } from "../types/price";
import { generateInitialLevels } from "../utils/price";

const MIN_UPDATES = 10;
const MAX_UPDATES = 20;
const MIN_INTERVAL = 100;
const MAX_INTERVAL = 250;
const MIN_SIZE_DELTA = -10;
const MAX_SIZE_DELTA = 10;

export const useMockPriceFeed = () => {
  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>(
    generateInitialLevels(),
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        setPriceLevels((prev) => {
          const updated = [...prev];

          const updates =
            Math.floor(Math.random() * (MAX_UPDATES - MIN_UPDATES + 1)) +
            MIN_UPDATES;

          for (let i = 0; i < updates; i++) {
            const index = Math.floor(Math.random() * updated.length);

            const level = updated[index];

            const bidDelta =
              Math.floor(
                Math.random() * (MAX_SIZE_DELTA - MIN_SIZE_DELTA + 1),
              ) + MIN_SIZE_DELTA;
            const askDelta =
              Math.floor(
                Math.random() * (MAX_SIZE_DELTA - MIN_SIZE_DELTA + 1),
              ) + MIN_SIZE_DELTA;

            updated[index] = {
              ...level,
              bidSize: Math.max(0, level.bidSize + bidDelta),
              askSize: Math.max(0, level.askSize + askDelta),
            };
          }
          return updated;
        });
      },
      Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1) + MIN_INTERVAL,
    );
    return () => clearInterval(interval);
  }, []);

  return priceLevels;
};
