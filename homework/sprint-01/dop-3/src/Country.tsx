import { City } from "./City";
import { BanknotsType, MoneyType } from "./App";
import styled from "styled-components";
import { Button } from "./Button";

type CountryPropsType = {
  data: MoneyType[];
  setFilterValue: (filterValue: BanknotsType) => void;
  addMoney: (banknote: BanknotsType) => void;
  removeMoney: (banknote: BanknotsType) => void;
};

export const Country = ({
  data,
  setFilterValue,
  addMoney,
  removeMoney,
}: CountryPropsType) => {
  const setAll = () => {
    setFilterValue("All");
  };

  const setUSD = () => {
    setFilterValue("USD");
  };

  const setRUB = () => {
    setFilterValue("RUB");
  };

  const addMoneyHandler = (value: BanknotsType) => {
    addMoney(value);
  };

  const removeMoneyHandler = (value: BanknotsType) => {
    removeMoney(value);
  };

  return (
    <Terminal>
      <div>
        <Button onClick={setAll}>All</Button>
        <Button onClick={setUSD}>Dollars</Button>
        <Button onClick={setRUB}>Rubles</Button>
      </div>
      <div>
     
        <Button onClick={() => addMoneyHandler("USD")}>Положить 100$</Button>
        <Button onClick={() => addMoneyHandler("RUB")}>Положить 100р.</Button>
        <Button onClick={() => removeMoneyHandler("USD")}>Снять 100$</Button>
        <Button onClick={() => removeMoneyHandler("RUB")}>Снять 100р.</Button>
      </div>
      <City data={data} />
    </Terminal>
  );
};

const Terminal = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-size: 30px;
  background-color: #282c34;
`;
