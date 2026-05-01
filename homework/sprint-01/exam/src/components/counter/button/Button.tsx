type Props = {
  onClick: () => void;
  // className: string;
  children: string;
  disabled: boolean;
};

export const Button = ({ onClick,  children, disabled }: Props) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
