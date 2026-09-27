import { Todolist } from "@/app/App";
import { useAppSelector } from "@/app/common/hooks/useAppSelector";
import { selectTasks } from "@/app/features/todolists/model/tasks-selectors";

import { List } from "@mui/material";
import { TaskItem } from "./TasksItem/TaskItem";

type Props = {
  todolist: Todolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;
  const tasks = useAppSelector(selectTasks);

  const todolistTasks = tasks[id];

  let filteredTasks = todolistTasks;

  if (filter === "active") {
    filteredTasks = todolistTasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    filteredTasks = todolistTasks.filter((task) => task.isDone);
  }
  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks.map((task) => {
            return <TaskItem key={task.id} task={task} todolistId={id} />;
          })}
        </List>
      )}
    </>
  );
};
