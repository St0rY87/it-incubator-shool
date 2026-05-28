import { useEffect, useState } from "react";
import "./App.css";
import { Counter } from "./components/counter/Counter";
import { CounterConfig } from "./components/counterConfig/CounterConfig";

const initialMaxValue = 5;
const initialMinValue = 0;

function handleGetDataLocalStorage(value: "getMaxValue" | "getMinValue") {
  const data = localStorage.getItem("counter");
  if (data) {
    const { minValue, maxValue } = JSON.parse(data);
    return value === "getMinValue" ? minValue : maxValue;
  }
  return value === "getMinValue" ? initialMinValue : initialMaxValue;
}

const saveToLocalStorage = (minValue: number, maxValue: number) => {
  localStorage.setItem("counter", JSON.stringify({ minValue, maxValue }));
};

export const App = () => {
  const [maxValue, setMaxValue] = useState<number>(
    handleGetDataLocalStorage("getMaxValue"),
  );

  const [minValue, setMinValue] = useState<number>(
    handleGetDataLocalStorage("getMinValue"),
  );

  const [value, setValue] = useState<number>(
    handleGetDataLocalStorage("getMinValue"),
  );

  const [isError, setIsError] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  useEffect(() => {
    handleGetDataFromLocalStorage();
  }, []);

  useEffect(() => {
    const isError: boolean =
      maxValue <= minValue || minValue < 0 || maxValue < 1;

    setIsError(isError);
  }, [minValue, maxValue]);

  const handleGetDataFromLocalStorage = () => {
    const data = localStorage.getItem("counter");
    if (data) {
      const { minValue, maxValue } = JSON.parse(data);
      setMaxValue(maxValue);
      setMinValue(minValue);
      setValue(minValue);
    }
  };

  const handleMinValue = (value: number) => {
    setMinValue(value);
  };
  const handleMaxValue = (value: number) => {
    setMaxValue(value);
  };

  const handleSetButton = () => {
    setValue(minValue);
    saveToLocalStorage(minValue, maxValue);

    setMaxValue(maxValue);
    setMinValue(minValue);
  };

  const onFocus = () => {
    setTimeout(() => {
      setIsFocus(true);
    }, 111);
  };
  const onBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 110);
  };

  const onIncrement = () => {
    if (value < maxValue) setValue((prev) => prev + 1);
  };

  const onReset = () => {
    setValue(minValue);
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
        onBlur={onBlur}
        isFocus={isFocus}
      />
      <Counter
        value={value}
        maxValue={maxValue}
        minValue={minValue}
        onIncrement={onIncrement}
        onReset={onReset}
        isFocus={isFocus}
        isError={isError}
      ></Counter>
    </div>
  );
};
