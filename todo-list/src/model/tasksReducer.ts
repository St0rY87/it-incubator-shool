import { v1 } from "uuid";
import type { Tasks, TaskType, TodolistType } from "../App";
import type { CreateTodolistAT, DeleteTodolistAT } from "./todolistsReducer";

type ActionType = CreateTodolistAT | DeleteTodolistAT | CreateActionTaskAT;

// add 4 AT
export type CreateActionTaskAT = ReturnType<typeof createTaskAC>

const initialState: Tasks = {};

export const tasksReducer = (tasks: Tasks, action: ActionType): Tasks => {
  switch (action.type) {
    case "delete_todolist": {
      const copyTasksState = { ...tasks };
      delete copyTasksState[action.payload.id];
      return copyTasksState;
    }
    case "create_todolist": {
      return { ...tasks, [action.payload.id]: [] };
    }
    case "create_task":
      const {id, title} = action.payload
      
      const newTask = { id: v1(), title, isDone: false };
      return { ...tasks, [id]: [newTask, ...tasks[id]] }
    // case "create_task": {

    // }

    // case "delete_task": {

    // }

    // case "": {}
    // case "": {}
    default:
      return tasks;
  }
};

export const createTaskAC = (payload: {
  id: TodolistType["id"];
  title: TaskType["title"];
}) =>
  ({
    type: "create_task",
    payload,
  }) as const;

// 4 action creators

type Actions = any;
