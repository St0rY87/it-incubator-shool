type Props = {
  onClick: () => void;
  // className: string;
  children: string;
  disabled?: boolean;
  isFocus?: boolean;
};

export const Button = ({ onClick, children, disabled, isFocus }: Props) => {
  return (
    <button
      className="button"
      disabled={isFocus ? true : disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
