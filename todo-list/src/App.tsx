import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValues = "all" | "active" | "completed";

const initialState: Task[] = [
  { id: v1(), title: "HTML&CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "ReactJS", isDone: false },
  { id: v1(), title: "Redux", isDone: false },
  { id: v1(), title: "Typescript", isDone: false },
  { id: v1(), title: "RTK query", isDone: false },
];

export const App = () => {
  const [tasks, setTasks] = useState(initialState);

  // const [filter, setFilter] = useState<FilterValues>('all')

  const deleteTask = (taskId: Task["id"]) => {
    const updateTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updateTasks);
  };

  const handleFilterTasks = (filter: FilterValues) => {
    if (filter === "active")
      return setTasks(initialState.filter((task) => !task.isDone));
    if (filter === "completed")
      return setTasks(initialState.filter((task) => task.isDone));
    return setTasks(initialState);
  };

  const createTask = (title: string) => {
    if (!title) return;
    const newTask = { id: v1(), title, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  return (
    <div className="app">
      <Todolist
        title="What to learn"
        tasks={tasks}
        deleteTask={deleteTask}
        createTask={createTask}
        handleFilterTasks={handleFilterTasks}
      />
    </div>
  );
};
