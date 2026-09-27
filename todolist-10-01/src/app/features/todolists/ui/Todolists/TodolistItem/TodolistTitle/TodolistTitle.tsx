import DeleteIcon from "@mui/icons-material/Delete";
import { Todolist } from "@/app/App";
import { IconButton } from "@mui/material";

import styles from "./TodolistTitle.module.css";
import { EditableSpan } from "@/app/common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "@/app/common/hooks/useAppDispatch";
import { deleteTodolistAC, changeTodolistTitleAC } from "@/app/features/todolists/model/todolists-reducer";

type Props = {
  todolist: Todolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist;

  const dispatch = useAppDispatch();

  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({ id }));
  };

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ id, title }));
  };
  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
