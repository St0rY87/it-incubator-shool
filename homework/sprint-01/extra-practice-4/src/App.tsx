import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export const App = ()=> {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id != id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = [task, ...tasks];
    setTasks(newTasks);
  }

  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodolist = tasks;

 

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.isDone);
      case "completed":
        return tasks.filter((task) => task.isDone);
      default:
        return tasks;
    }
  };

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }



  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={getFilteredTasks()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask} />
    </div>
  );
}
