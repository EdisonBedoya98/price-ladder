import { memo, useEffect, useRef, useState, type FC } from "react";

interface FlashingCellProps {
  value: number;
  onClick?: () => void;
}

export const FlashingCell: FC<FlashingCellProps> = memo(
  ({ value, onClick }) => {
    const prevValueRef = useRef(value);
    const [flashClass, setFlashClass] = useState("");

    useEffect(() => {
      const prevValue = prevValueRef.current;
      if (value > prevValue) {
        setTimeout(() => setFlashClass("bg-green-500/40 transition-none"), 0);
      } else if (value < prevValue) {
        setTimeout(() => setFlashClass("bg-red-500/40 transition-none"), 0);
      }

      prevValueRef.current = value;

      const timer = setTimeout(() => {
        setFlashClass("transition-colors duration-500");
      }, 150);

      return () => clearTimeout(timer);
    }, [value]);

    return (
      <td
        className={`text-center cursor-pointer hover:bg-gray-100 ${flashClass}`}
        onClick={onClick}
      >
        {value}
      </td>
    );
  },
);
