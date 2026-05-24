type Props = {
  className: string;
  value: number;
  isFocus: boolean;
  isError: boolean;
};

export const Display = ({ className, value, isFocus, isError }: Props) => {
 const currentMessage = isError
      ? "Incorrect value"
      : "enter values and press 'set'";
      console.log(currentMessage)
  return <div className={className}>{isFocus ? currentMessage : value}</div>;
};
