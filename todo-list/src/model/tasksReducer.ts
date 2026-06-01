import type { Tasks } from "../App";
import type { CreateTodolistAT, DeleteTodolistAT } from "./todolistsReducer";

type ActionType = CreateTodolistAT | DeleteTodolistAT;
// add 4 AT
const initialState: Tasks = {};

export const tasksReducer = (tasks: Tasks, action: ActionType): Tasks => {
  switch (action.type) {
    case "delete_todolist": {
      const copyTasksState = {...tasks};
      delete copyTasksState[action.payload.id];
      return copyTasksState;
    }
    case "create_todolist": {
      return { ...tasks, [action.payload.id]: [] };
    }
    // case "delete_task": {
      
    // }
    // case "create_task": {
      
    // }
    // case "": {}
    // case "": {}
    default:
      return tasks;
  }
};

// 4 action creators

type Actions = any;
