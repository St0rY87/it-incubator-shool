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
  const [filter, setFilter] = useState<FilterValues>('all')

  const deleteTask = (taskId: Task["id"]) => {
    const updateTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updateTasks);
  };

  const getFilteredTasks = () => {
    if (filter === "active")
      return tasks.filter((task) => !task.isDone);
    if (filter === "completed")
      return tasks.filter((task) => task.isDone);
    return tasks;
  };

    const handleFilterTasks = (newFilter: FilterValues) => {
    setFilter(newFilter); 
  };

  const createTask = (title: Task["title"]) => {
    if (!title) return;
    const newTask = { id: v1(), title, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  const changeTaskStatus = (taskId: Task["id"], isDone: Task["isDone"]) => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <Todolist
        title="What to learn"
        tasks={getFilteredTasks()}
        deleteTask={deleteTask}
        createTask={createTask}
        handleFilterTasks={handleFilterTasks}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
};
