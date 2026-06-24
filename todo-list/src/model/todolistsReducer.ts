import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";
import type { FilterValues, TodolistType } from "../app/App";

export const deleteTodolistAC = createAction<{ id: string }>(
  "todolists/deleteTodolist",
);

export const createTodolistAC = createAction(
  "todolists/createTodolist",
  (title: string) => {
    return { payload: { title, id: nanoid() } };
  },
);

export const changeTodolistTitleAC = createAction<{
  title: string;
  id: string;
}>("todolists/changeTodolistTitle");

export const changeTodolistFilterAC = createAction<{
  id: string;
  filter: FilterValues;
}>("todolists/changeTodolistFilter");

const initialState: TodolistType[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].title = action.payload.title;
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state[index].filter = action.payload.filter;
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      });
    });
});
