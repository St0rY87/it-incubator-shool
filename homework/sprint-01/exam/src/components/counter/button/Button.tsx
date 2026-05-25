type Props = {
  onClick: () => void;
  // className: string;
  children: string;
  disabled?: boolean;
  isFocus?: boolean;
  isError?: boolean;
};

export const Button = ({ onClick, children, disabled, isFocus,isError }: Props) => {
  return (
    <button
      className="button"
      disabled={isFocus || isError ? true : disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
