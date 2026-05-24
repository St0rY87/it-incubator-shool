import { ChangeEvent } from "react";

type Props = {
  label: string;
  handleValue: (value: number) => void;
  initialValue?: number;
  isError?: boolean;
  onFocus: () => void;
  offFocus: () => void;
};

export const Input = ({
  label,
  handleValue,
  initialValue,
  isError,
  onFocus,
  offFocus,
}: Props) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue(Number(e.currentTarget.value));
  };

  return (
    <div className="input">
      <label>{label}</label>
      <input
        onFocus={onFocus}
        onBlur={offFocus}
        className={isError ? "error" : ""}
        type="number"
        value={initialValue}
        onChange={handleInput}
      />
    </div>
  );
};
