import { memo, useCallback, type FC } from "react";
import type { PriceLevel } from "../../types/price";
import { FlashingCell } from "./FlashingCell";

interface PriceRowProps {
  level: PriceLevel;
}

export const PriceRow: FC<PriceRowProps> = memo(({ level }) => {
  const handleBidClick = useCallback(() => {
    const msg = `Order placed: Buy Limit @ ${level.price}`;
    console.log(msg);
  }, [level.price]);

  const handleAskClick = useCallback(() => {
    const msg = `Order placed: Sell Limit @ ${level.price}`;
    console.log(msg);
  }, [level.price]);

  return (
    <tr>
      <td className="px-4 py-2 text-center">{level.price}</td>
      <FlashingCell value={level.bidSize} onClick={handleBidClick} />
      <FlashingCell value={level.askSize} onClick={handleAskClick} />
    </tr>
  );
});
