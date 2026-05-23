import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "./button/Button";

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
    setValueInput(e.target.value);
    setError(null);
  };

  const handleCreateTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleCreateItem();
  };

  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={valueInput}
        onChange={handleChangeTitle}
        onKeyDown={handleCreateTaskOnEnter}
      />

      <Button onClick={handleCreateItem} title="+" />

      {error ? <p className="error-message">{error}</p> : ""}
    </div>
  );
};
