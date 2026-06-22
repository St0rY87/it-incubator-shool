import type { Tasks } from "../app/App";
import type { RootState } from "../app/store";

export const selectTasks = (state: RootState):Tasks => state.tasks;
