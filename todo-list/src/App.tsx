import { useState } from "react";
import "./App.css";
import { Todolist} from "./components/Todolist";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};
export type FilterValues = 'all' | 'active' | 'completed';

const initialState:Task[] =  [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactJS", isDone: false },
  { id: 4, title: "Redux", isDone: false },                            
  { id: 5, title: "Typescript", isDone: false },
  { id: 6, title: "RTK query", isDone: false },
]

export const App = () => {
  const [tasks, setTasks] = useState(initialState)
  // const [filter, setFilter] = useState<FilterValues>('all')

  const deleteTask = (taskId: Task['id']) => {
      const updateTasks = tasks.filter((task)=> task.id !== taskId);
      setTasks(updateTasks);
  }

   const handleFilterTasks = (filter: FilterValues) => {
    if(filter === 'active') return setTasks(initialState.filter((task)=> !task.isDone ))
    if(filter === 'completed') return setTasks(initialState.filter((task)=> task.isDone ))
    return setTasks(initialState)
  }
 


  return (
    <div className="app">
      <Todolist title="What to learn" tasks={tasks} deleteTask={deleteTask} handleFilterTasks={handleFilterTasks} />
    </div>
  );
};
