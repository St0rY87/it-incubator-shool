import { TextField } from "@mui/material";
import { useState, type ChangeEvent } from "react";

type Props = {
  title: string;
  handleChangeTitle: (title: string) => void;
  className?: string;
  taskId?: string
};

export const EditableSpan = ({
  title,
  handleChangeTitle,
  className,
}: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [valueInput, setValueInput] = useState(title);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const onEditMode = () => setEditMode(true);

  const offEditMode = () => {
    handleChangeTitle(valueInput);
    setEditMode(false);
  };

  return editMode ? (
    <TextField
    variant="standard"
      autoFocus
      onBlur={offEditMode}
      value={valueInput}
      onChange={handleChangeInput}
    />
  ) : (
    <span className={className} onDoubleClick={onEditMode}>
      {valueInput}
    </span>
  );
};
