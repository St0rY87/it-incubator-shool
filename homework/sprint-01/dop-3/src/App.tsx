import { useState } from "react";
import "./App.css";
import { Country } from "./Country";

import { v1 } from "uuid";

export type BanknotsType = "USD" | "RUB" | "All"; // создадим типы для banknotes -он может быть 'DOLLARS', 'RUBLS' или 'All'

export type MoneyType = {
  banknote: BanknotsType;
  nominal: number;
  id: string;
};

const initialState: MoneyType[] = [
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
  { banknote: "USD", nominal: 100, id: v1() },
  { banknote: "RUB", nominal: 100, id: v1() },
];



export const App = () => {
  // убираем заглушки в типизации и вставляем в качестве инициализационного значения defaultMoney
  const [money, setMoney] = useState<MoneyType[]>(initialState);
  const [filter, setFilter] = useState<BanknotsType>("All"); // по умолчанию указываем все банкноты

  // а вот сейчас притормаживаем. И вдумчиво: константа filteredMoney получает результат функции moneyFilter
  // в функцию передаем деньги и фильтр, по которому ихбудем выдавать(ретёрнуть)
  // const filteredMoney = moneyFilter(грошы, фильтр)

  // const moneyFilter = (money: MoneyType[], filter: BanknotsType) => {
  const moneyFilter = () => {
    if (filter === "All") return money;
    return money.filter((el) => el.banknote === filter);
  };

  const addMoney = (banknote: BanknotsType) => {
    // Добавление денег сделаем в последнюю очередь, после настройки фильтров и отрисовки денег
     setMoney([{ banknote, nominal: 100, id: v1() }, ...money]);

  };

  const removeMoney = (banknote: BanknotsType) => {

    const index = money.findIndex((el) => el.banknote === banknote);
    if (index !== -1) {
      setMoney(money.filter((el, i) => i !== index));
    }
  };

  return (
    <div className="App">
      <Country
        data={moneyFilter()} 
        setFilterValue={setFilter} 
        addMoney={addMoney}
        removeMoney={removeMoney}
      />
    </div>
  );
};
