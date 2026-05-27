import { ChangeEvent } from "react";

type Props = {
  label: string;
  handleValue: (value: number) => void;
  initialValue?: number;
  isError?: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

export const Input = ({
  label,
  handleValue,
  initialValue,
  isError,
  onFocus,
  onBlur,
}: Props) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleValue(Number(e.currentTarget.value));
  };

  return (
    <div className="input">
      <label>{label}</label>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        className={isError ? "error" : ""}
        type="number"
        value={initialValue}
        onChange={handleInput}
      />
    </div>
  );
};
