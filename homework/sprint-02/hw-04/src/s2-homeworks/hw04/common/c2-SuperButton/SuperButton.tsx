import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./SuperButton.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string;
};

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType = "default",
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
//   const isDefault = xType === "default" ? s.default : "";
//   const isRed = xType === "red" ? s.red : "";
//   const isSecondary = xType === "secondary" ? s.secondary : "";
//   const finalClassName = `${s.button} ${isDefault} ${isRed} ${isSecondary}`;

  const typeBtnClass = 
    xType === "default"
      ? s.default
      : xType === "red"
        ? s.red
        : xType === "secondary"
          ? s.secondary
          : ''
    const finalClassName = `${s.button} ${typeBtnClass}`
    
  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  );
};

export default SuperButton;
