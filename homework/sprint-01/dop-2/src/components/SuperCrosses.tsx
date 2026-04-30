import React, { ReactNode } from "react";

type Props = {
  crosses: Cross[];
  children: ReactNode;
};

type Cross = {
  id: number;
  model: string;
  size: string;
};

export const SuperCrosses = ({ crosses, children }: Props) => {
  return (
    <div>
      <ul>
        {crosses.map((el) => (
          <li key={el.id}>
            <span>{el.model} </span>
            <span>{el.size}</span>
          </li>
        ))}
      </ul>
      <hr/>
      {children}
    </div>
  );
};
