import { v1 } from "uuid";
import type { Tasks, TaskType, TodolistType } from "../app/App";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

type ActionType =
  | CreateActionTaskAT
  | DeleteTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT;

// add 4 AT
export type CreateActionTaskAT = ReturnType<typeof createTaskAC>;
export type DeleteTaskAT = ReturnType<typeof deleteTaskAC>;
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;

export const createTaskAC = createAction<{
  todolistId: TodolistType["id"];
  title: TaskType["title"];
}>("tasks/createTask");

export const deleteTaskAC = createAction<{
  todolistId: TodolistType["id"];
  taskId: TaskType["id"];
}>("tasks/deleteTask");

export const changeTaskStatusAC = createAction<{
  todolistId: TodolistType["id"];
  taskId: TaskType["id"];
  isDone: TaskType["isDone"];
}>("tasks/changeTaskStatus");

export const changeTaskTitleAC = createAction<{
  todolistId: TodolistType["id"];
  taskId: TaskType["id"];
  title: TaskType["title"];
}>("tasks/changeTaskTitle");

const initialState: Tasks = {};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(createTaskAC, (state, action) => {
      const newTask = {
        id: nanoid(),
        title: action.payload.title,
        isDone: false,
      };
      state[action.payload.todolistId].push(newTask);
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index !== -1) state[action.payload.todolistId].splice(index, 1);
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(
        (task) => task.id === action.payload.taskId,
      );
      if (index !== -1)
        state[action.payload.todolistId][index].isDone = action.payload.isDone;
    });
});

// export const tasksReducer2 = (
//   tasks: Tasks = initialState,
//   action: ActionType,
// ): Tasks => {
//   switch (action.type) {
//     case "delete_todolist": {
//       const copyTasksState = { ...tasks };
//       delete copyTasksState[action.payload.id];
//       return copyTasksState;
//     }
//     case "create_todolist": {
//       return { ...tasks, [action.payload.id]: [] };
//     }

//     case "create_task": {
//       const { id, title } = action.payload;

//       const newTask = { id: v1(), title, isDone: false };
//       return { ...tasks, [id]: [newTask, ...tasks[id]] };
//     }

//     case "delete_task": {
//       const { todolistId, taskId } = action.payload;
//       return {
//         ...tasks,
//         [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
//       };
//     }

//     case "change_task_status": {
//       const { todolistId, taskId, isDone } = action.payload;
//       return {
//         ...tasks,
//         [todolistId]: tasks[todolistId].map((task) =>
//           task.id == taskId ? { ...task, isDone } : task,
//         ),
//       };
//     }

//     case "change_task_title": {
//       const { todolistId, taskId, title } = action.payload;
//       return {
//         ...tasks,
//         [todolistId]: tasks[todolistId].map((task) =>
//           task.id == taskId ? { ...task, title } : task,
//         ),
//       };
//     }

//     default:
//       return tasks;
//   }
// };

// 4 action creators
