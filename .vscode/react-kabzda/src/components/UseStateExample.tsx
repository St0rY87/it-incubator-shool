import { useMemo, useState } from "react";

function generateData() {
  console.log("generateData")
  return 231237321;
}

export const UseStateExample1 = () => {
const initValue = useMemo(generateData, []);
  
  const [counter, setCounter] = useState(initValue);
  console.log(counter);
  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
};
