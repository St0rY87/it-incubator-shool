import { Button } from "../counter/button/Button";
import { Input } from "./input/Input";

type Props = {
  handleMinValue: (value: number) => void;
  handleMaxValue: (value: number) => void;
  minValue: number;
  maxValue: number;
  handleSetButton: () => void;
  isError: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isFocus: boolean;
};

export const CounterConfig = ({
  handleMinValue,
  minValue,
  handleMaxValue,
  maxValue,
  handleSetButton,
  isError,
  onFocus,
  onBlur,
  isFocus,
}: Props) => {
  const isDisabledButton = (!isFocus && !isError) || isError;
  return (
    <div className="wrapper">
      <div className="inputs">
        <Input
          label="max value:"
          handleValue={handleMaxValue}
          initialValue={maxValue}
          isError={isError}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Input
          label="start value:"
          handleValue={handleMinValue}
          initialValue={minValue}
          isError={isError}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className="wrapperButtons">
        <Button disabled={isDisabledButton} onClick={handleSetButton}>
          Set
        </Button>
      </div>
    </div>
  );
};
