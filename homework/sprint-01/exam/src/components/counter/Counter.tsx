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
  const errorClassName = "value message error";
  const hintClassName = "value message";

  const currentClassName = isError
    ? errorClassName
    : !isError && !isFocus
      ? valueClassName
      : hintClassName;

  return (
    <div className="wrapper">
      <Display
        className={currentClassName}
        value={value}
        isFocus={isFocus}
        isError={isError}
      />

      <div className="wrapperButtons">
        <Button
          disabled={value >= maxValue}
          isFocus={isFocus}
          onClick={onIncrement}
          isError={isError}
        >
          inc
        </Button>

        <Button
          disabled={value === minValue}
          isFocus={isFocus}
          onClick={onReset}
          isError={isError}
        >
          reset
        </Button>
      </div>
    </div>
  );
};
