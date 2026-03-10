import { useMockPriceFeed } from "../../hooks/useMockPriceFeed";
import { PriceRow } from "./PriceRow";

export const PriceGrid = () => {
  const priceLevels = useMockPriceFeed();
  return (
    <table>
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-center">Price</th>
          <th className="px-4 py-2 text-center">Bid Size</th>
          <th className="px-4 py-2 text-center">Ask Size</th>
        </tr>
      </thead>
      <tbody>
        {priceLevels.map((level) => (
          <PriceRow key={level.price} level={level} />
        ))}
      </tbody>
    </table>
  );
};
