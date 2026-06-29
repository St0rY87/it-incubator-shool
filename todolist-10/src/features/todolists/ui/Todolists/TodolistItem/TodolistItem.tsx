import type { Todolist } from "../../../../../app/App";
import { useAppDispatch } from "../../../../../common/hooks/useAppDispatch";
import { CreateItemForm } from "../../../../../common/components/CreateItemForm/CreateItemForm";
import { FilterButtons } from "./FilterButtons/FilterButtons";
import { createTaskAC } from "../../../../../model/tasks-reducer";
import { Tasks } from "./Tasks/Tasks";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";

type Props = {
  todolist: Todolist;
};

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }));
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};
