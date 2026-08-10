import { useSelector } from "react-redux";
import { Todolist } from "../app/App";
import { RootState } from "../app/store";

export const selectTodolists = (state: RootState):Todolist[] => state.todolists;

