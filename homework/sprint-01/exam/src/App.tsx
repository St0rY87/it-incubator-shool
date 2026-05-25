import { useEffect, useState } from "react";
import "./App.css";
import { Counter } from "./components/counter/Counter";
import { CounterConfig } from "./components/counterConfig/CounterConfig";

export const App = () => {
  console.log("hello");
  const initialMaxValue = 5;
  const initialMinValue = 0;

  const [maxValue, setMaxValue] = useState<number>(initialMaxValue);
  const [minValue, setMinValue] = useState<number>(initialMinValue);
  const [value, setValue] = useState<number>(minValue);

  const [maxCounterValue, setMaxCounterValue] =
    useState<number>(initialMaxValue);
  const [minCounterValue, setMinCounterValue] =
    useState<number>(initialMinValue);

  const [isError, setIsError] = useState(false);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    const isError: boolean =
      minValue === maxValue ||
      maxValue < minValue ||
      minValue < 0 ||
      maxValue < 1;

    setIsError(isError);
  }, [minValue, maxValue, value]);

  const handleMinValue = (value: number) => {
    setMinValue(value);
  };
  const handleMaxValue = (value: number) => {
    setMaxValue(value);
  };

  const handleSetButton = () => {
    setValue(minValue);
    setMaxCounterValue(maxValue);
    setMinCounterValue(minValue);
  };

  const onFocus = () => {
    setIsFocus(true);
  };
  const offFocus = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 100);
  };

  const onIncrement = () => {
    if (value < maxValue) setValue((prev) => prev + 1);
  };

  const onReset = () => {
    setValue(minCounterValue);
  };

  return (
    <div className="App">
      <CounterConfig
        handleMinValue={handleMinValue}
        minValue={minValue}
        handleMaxValue={handleMaxValue}
        maxValue={maxValue}
        handleSetButton={handleSetButton}
        isError={isError}
        onFocus={onFocus}
        offFocus={offFocus}
        isFocus={isFocus}
      />
      <Counter
        value={value}
        maxValue={maxCounterValue}
        minValue={minCounterValue}
        onIncrement={onIncrement}
        onReset={onReset}
        isFocus={isFocus}
        isError={isError}
      ></Counter>
    </div>
  );
};
