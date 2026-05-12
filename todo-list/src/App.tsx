import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type Tasks = {
  [todolistId: string]: Task[];
};

export type FilterValues = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValues;
};

// const initialState: Task[] = [
//   { id: v1(), title: "HTML&CSS", isDone: true },
//   { id: v1(), title: "JS", isDone: true },
//   { id: v1(), title: "ReactJS", isDone: false },
//   { id: v1(), title: "Redux", isDone: false },
//   { id: v1(), title: "Typescript", isDone: false },
//   { id: v1(), title: "RTK query", isDone: false },
// ];

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodoListType[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<Tasks>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  // const [tasks, setTasks] = useState(initialState);
  // // const [filter, setFilter] = useState<FilterValues>("all");
  // const [todolists, setTodolists] = useState<TodoListType[]>([
  //   { id: v1(), title: "What to learn", filter: "all" },
  //   { id: v1(), title: "What to buy", filter: "all" },
  // ]);


  
  // const deleteTask = (taskId: Task["id"]) => {
  //   const updateTasks = tasks.filter((task) => task.id !== taskId);
  //   setTasks(updateTasks);
  // };

  const deleteTask = (todolistId: string, taskId: string) => {
    const newTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId),
    };
    setTasks(newTasks);

    // const tasksForHandling = tasks[todolistId];
    // const updatedTasks =  tasksForHandling.filter(el => el.id != taskId);
    // setTasks({...tasks, [todolistId]: updatedTasks})
  };

  const deleteTodoList = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const handleFilterTasks = (todolistId: string, filter: FilterValues) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist,
      ),
    );
  };

  // const createTask = (title: Task["title"]) => {
  //   const newTask = { id: v1(), title, isDone: false };
  //   setTasks([newTask, ...tasks]);
  // };

  // const createTask = (todolistId: string, title: string) => {
  //   /** Формируем новую таску: */
  //   const newTask = {id: v1(), title, isDone: false}
  //   /** Берем таски тудулиста по его `id`: */
  //   const todolistTasks = tasks[todolistId]
  //   /** Перезаписываем массив тасок нужного тудулиста, добавляя в начало новую таску: */
  //   tasks[todolistId] = [newTask, ...todolistTasks]
  //   /** Устанавливаем в state копию объекта, чтобы React отреагировал перерисовкой: */
  //   setTasks({ ...tasks })
  // }

  // const createTask = (todolistId: string, title: string) => {
  //   const newTask = {id: v1(), title, isDone: false}
  //   const newTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] }
  //   setTasks(newTasks)
  // }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };

    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  // const changeTaskStatus = (taskId: Task["id"], isDone: Task["isDone"]) => {
  //   const updatedTasks: Task[] = tasks.map((task) =>
  //     task.id === taskId ? { ...task, isDone } : task,
  //   );
  //   setTasks(updatedTasks);
  // };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean,
  ) => {
    const newTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id == taskId ? { ...task, isDone } : task,
      ),
    };
    setTasks(newTasks);
  };

  return (
    <div className="app">
      {todolists.map((todolist) => {
        return (
          <Todolist
            key={todolist.id}
            todolist={todolist}
            tasks={getFilteredTasks(tasks[todolist.id], todolist.filter)}
            deleteTask={deleteTask}
            deleteTodolist={deleteTodoList}
            handleFilterTasks={handleFilterTasks}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
          />
        );
      })}
    </div>
  );
};
