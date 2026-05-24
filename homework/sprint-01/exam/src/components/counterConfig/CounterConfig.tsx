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
};

export const CounterConfig = ({
  handleMinValue,
  minValue,
  handleMaxValue,
  maxValue,
  handleSetButton,
  isError,
  onFocus,
  offFocus
}: Props) => {
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
        <Button disabled={isError} onClick={handleSetButton} >
          Set
        </Button>
      </div>
    </div>
  );
};
