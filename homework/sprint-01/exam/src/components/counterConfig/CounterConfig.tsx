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
  offFocus: () => void;
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
  offFocus,
  isFocus
}: Props) => {
  const isDisabledButton = !isFocus && !isError || isError;
  return (
    <div className="wrapper">
      <div className="inputs">
        <Input
          label="max value:"
          handleValue={handleMaxValue}
          initialValue={maxValue}
          isError={isError}
          onFocus={onFocus} offFocus={offFocus}
        />
        <Input
          label="start value:"
          handleValue={handleMinValue}
          initialValue={minValue}
          isError={isError}
          onFocus={onFocus} offFocus={offFocus}
        />
      </div>
      <div className="wrapperButtons">
        <Button disabled={isDisabledButton} onClick={handleSetButton} >
          Set
        </Button>
      </div>
    </div>
  );
};
