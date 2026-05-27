import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { inputSx, wrapperInputSx } from "../../Todolist.styles";

type Props = {
  onCreateItem: (title: string) => void;
};

export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [valueInput, setValueInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateItem = () => {
    const trimmedTitle = valueInput.trim();
    if (!trimmedTitle) {
      setError("This field required");
      setValueInput("");
      return;
    }
    onCreateItem(trimmedTitle);
    setValueInput("");
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
    setError(null);
  };

  const handleCreateItemOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleCreateItem();
  };

  return (
    <Box className="wrapper-input" sx={wrapperInputSx}>
      <TextField
        size="small"
        value={valueInput}
        onChange={handleChangeTitle}
        onKeyDown={handleCreateItemOnEnter}
        error={error}
        helperText={error && "Enter valid title"}
        sx={inputSx}
      />

      <IconButton size="small" onClick={handleCreateItem}>
        <AddBoxIcon fontSize="medium" />
      </IconButton>

      {/* {error && error !== undefined ? <p className="error-message">{error}</p> : ""} */}
    </Box>
  );
};
