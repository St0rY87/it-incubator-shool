import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "@/app/App";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import {
  deleteTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
} from "@/model/tasks-reducer";
import { ListItem, Checkbox, IconButton } from "@mui/material";
import { ChangeEvent } from "react";
import { getListItemSx } from "./Taskitem.styles";

type Props = {
  task: Task;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked;
    dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone }));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
  };
  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
