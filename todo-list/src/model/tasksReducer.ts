import { v1 } from "uuid";
import type { Tasks, TaskType, TodolistType } from "../app/App";
import { createTodolistAC, deleteTodolistAC } from "./todolistsReducer";
import { createReducer } from "@reduxjs/toolkit";

type ActionType =
  | CreateTodolistAT
  | DeleteTodolistAT
  | CreateActionTaskAT
  | DeleteTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT;

// add 4 AT
export type CreateActionTaskAT = ReturnType<typeof createTaskAC>;
export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>;
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;



const initialState: Tasks = {};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    });
});

export const tasksReducer2 = (
  tasks: Tasks = initialState,
  action: ActionType,
): Tasks => {
  switch (action.type) {
    case "delete_todolist": {
      const copyTasksState = { ...tasks };
      delete copyTasksState[action.payload.id];
      return copyTasksState;
    }
    case "create_todolist": {
      return { ...tasks, [action.payload.id]: [] };
    }

    case "create_task": {
      const { id, title } = action.payload;

      const newTask = { id: v1(), title, isDone: false };
      return { ...tasks, [id]: [newTask, ...tasks[id]] };
    }

    case "delete_task": {
      const { todolistId, taskId } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
      };
    }

    case "change_task_status": {
      const { todolistId, taskId, isDone } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          task.id == taskId ? { ...task, isDone } : task,
        ),
      };
    }

    case "change_task_title": {
      const { todolistId, taskId, title } = action.payload;
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map((task) =>
          task.id == taskId ? { ...task, title } : task,
        ),
      };
    }

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

export const deleteTaskAC = (payload: {
  todolistId: TodolistType["id"];
  taskId: TaskType["id"];
}) =>
  ({
    type: "delete_task",
    payload,
  }) as const;

export const changeTaskStatusAC = (payload: {
  todolistId: TodolistType["id"];
  taskId: TaskType["id"];
  isDone: TaskType["isDone"];
}) =>
  ({
    type: "change_task_status",
    payload,
  }) as const;

export const changeTaskTitleAC = (payload: {
  todolistId: TodolistType["id"];
  taskId: TaskType["id"];
  title: TaskType["title"];
}) =>
  ({
    type: "change_task_title",
    payload,
  }) as const;

// 4 action creators
