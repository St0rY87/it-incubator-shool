import { Button } from "./button/Button";
import { Display } from "./display/Display";

type Props = {
  value: number;
  minValue: number;
  maxValue: number;
  onIncrement: () => void;
  onReset: () => void;
  isFocus: boolean;
  isError: boolean;
};

export const Counter = ({
  value,
  minValue,
  maxValue,
  onIncrement,
  onReset,
  isFocus,
  isError,
}: Props) => {
  const valueClassName = `value${value >= maxValue ? " maxValue" : ""}`;
  const messageClassName = `value message${isFocus && isError ? " error" : ""}`;

  return (
    <div className="wrapper">
      {/* <Display className={valueClassName} value={value} /> */}
      <Display
        className={isFocus ? messageClassName : valueClassName}
        value={value}
        isFocus={isFocus}
        isError={isError}
      />

      <div className="wrapperButtons">
        <Button
          disabled={value >= maxValue}
          isFocus={isFocus}
          onClick={onIncrement}
        >
          inc
        </Button>

        <Button
          disabled={value === minValue}
          isFocus={isFocus}
          onClick={onReset}
        >
          reset
        </Button>
      </div>
    </div>
  );
};
