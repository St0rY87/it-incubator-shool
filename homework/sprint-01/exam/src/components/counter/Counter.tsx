import { Button } from "./button/Button";
import { Display } from "./display/Display";

type Props = {
  value: number;
  minValue: number;
  maxValue: number;
  onIncrement: () => void;
  onReset: () => void;
};

export const Counter = ({
  value,
  minValue,
  maxValue,
  onIncrement,
  onReset,
}: Props) => {
  
  const valueClassName = `value${value >= maxValue ? " maxValue" : ""}`;

  return (
    <div className="wrapper">
      <Display className={valueClassName} value={value} />

      <div className="wrapperButtons">
        <Button disabled={value >= maxValue} onClick={onIncrement}>
          inc
        </Button>

        <Button disabled={value === minValue} onClick={onReset}>
          reset
        </Button>
      </div>
    </div>
  );
};
