import { v1 } from "uuid";
import type { FilterValues, TodolistType } from "../App";
import { Todolist } from "../components/Todolist";
export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;

type ActionType =
  | DeleteTodolistAT
  | CreateTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodolistFilterAT;

export const todolistsReducer = (
  todolists: TodolistType[],
  action: ActionType,
): TodolistType[] => {
  switch (action.type) {
    case "delete_todolist": {
      const id = action.payload.id;
      return todolists.filter((todolist) => todolist.id !== id);
    }

    case "create_todolist": {

      const {id, title} = action.payload;
      const newTodo: TodolistType = {
        id,
        title,
        filter: "all",
      };
      return [...todolists, newTodo];
    }

    case "change_todolist_title": {
      const { id, title } = action.payload;
      return todolists.map((todolist) =>
        todolist.id === id ? { ...todolist, title } : todolist,
      );
    }

    case "change_todolist_filter": {
      const { id, filter } = action.payload;
      return todolists.map((todolist) =>
        todolist.id === id ? { ...todolist, filter } : todolist,
      );
    }
    default:
      return todolists;
  }
};

export const deleteTodolistAC = (id: TodolistType["id"]) =>
  ({
    type: "delete_todolist",
    payload: { id },
  }) as const;

export const createTodolistAC = (title: TodolistType["title"]) =>
  ({
    type: "create_todolist",
    payload: { title, id: v1() },
  }) as const;

export const changeTodolistTitleAC = (payload: {
  id: TodolistType["id"];
  title: TodolistType["title"];
}) =>
  ({
    type: "change_todolist_title",
    payload,
  }) as const;

export const changeTodolistFilterAC = (payload: {
  id: TodolistType["id"];
  filter: FilterValues;
}) =>
  ({
    type: "change_todolist_filter",
    payload,
  }) as const;
