import { Todolist } from "@/app/App";
import { CreateItemForm } from "@/app/common/components/CreateItemForm/CreateItemForm";
import { useAppDispatch } from "@/app/common/hooks/useAppDispatch";
import { createTaskAC } from "../../../model/tasks-reducer";
import { FilterButtons } from "./FilterButtons/FilterButtons";
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
