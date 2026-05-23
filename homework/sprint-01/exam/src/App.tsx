import { useState } from "react";
import "./App.css";
import { Counter } from "./components/counter/Counter";
import { CounterConfig } from "./components/counterConfig/CounterConfig";

export const App = () => {
  const maxValue: number = 5;
  const minValue: number = 0;
  const [value, setValue] = useState<number>(minValue);

  const onIncrement = () => {
    if (value < maxValue) setValue((prev) => prev + 1);
  };

  const onReset = () => {
    setValue(0);
  };

  return (
    <div className="App">
        <CounterConfig />
        <Counter
          value={value}
          maxValue={maxValue}
          minValue={minValue}
          onIncrement={onIncrement}
          onReset={onReset}
        ></Counter>
    </div>
  );
};
