import { useEffect, useState } from "react";
import "./App.css";
import { Counter } from "./components/counter/Counter";
import { CounterConfig } from "./components/counterConfig/CounterConfig";

export const App = () => {
  

  let initialMaxValue = 5;
  let initialMinValue = 0;

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
    handleGetDataFromLocalStorage();
  }, []);

  useEffect(() => {
    const isError: boolean =
      minValue === maxValue ||
      maxValue < minValue ||
      minValue < 0 ||
      maxValue < 1;

    setIsError(isError);
  }, [minValue, maxValue, value]);

  const handleUpdateLocalStorage = () => {
    localStorage.setItem(
      "counter",
      JSON.stringify({
        minValue,
        maxValue,
      }),
    );
  };

  const handleGetDataFromLocalStorage = () => {
    const data = localStorage.getItem("counter");
    if (data) {
      const { minValue, maxValue } = JSON.parse(data);
      setMaxValue(maxValue);
      setMinValue(minValue);
      setValue(minValue);
      setMaxCounterValue(maxValue);
      setMinCounterValue(minValue);
    }
    return { minValue, maxValue };
  };

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
    handleUpdateLocalStorage();
  };

  const onFocus = () => {
    setTimeout(() => {
      setIsFocus(true);
    }, 111);
  };
  const offFocus = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 110);
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
