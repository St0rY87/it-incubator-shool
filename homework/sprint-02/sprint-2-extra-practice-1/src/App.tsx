import { useRef, useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const App = () => {
  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);

  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "completed" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(taskId:string, todolistId: string) {
    let filteredTasks = tasks[todolistId].filter((t) => t.id != taskId);
    setTasks({ ...tasks, [todolistId]: filteredTasks });
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let newTasks = { ...tasks, [todolistId]: [task, ...tasks[todolistId]] };
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const newTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone } : task,
      ),
    };

    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const updatedTodolist = todolists.map(todolist => todolist.id === todolistId ?  {...todolist, filter: value} : todolist)
    setTodolists(updatedTodolist);
  }

  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="App">
      {todolists.map((todolist) => {
        let tasksForTodolist = tasks[todolist.id];
        if (todolist.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
        }
        if (todolist.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
        }
        return (
          <Todolist
            key={todolist.id}
            todolistId={todolist.id}
            title={todolist.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={todolist.filter}
          />
        );
      })}
      <div>
        <input ref={inputRef}  type="text" /> 
        {/* <button onClick={()=> setValue(inputRef.current.value)}>show text</button> */}
         <button onClick={() => setValue(inputRef.current?.value || '')}>show text</button>
        {value}
      </div>
    </div>
  );
};
