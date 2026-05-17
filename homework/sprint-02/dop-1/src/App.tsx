import { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = { id: string; title: string };


export type TasksType = {
  [key: string]: {
    data: TaskType[];
    filter: FilterValuesType;
  };
};

export const App = () => {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn" },
    { id: todolistId2, title: "What to buy" },
  ]);

  let [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: {
      data: [
        { id: v1(), title: "HTML&CSS1111", isDone: false },
        { id: v1(), title: "JS1111", isDone: true },
      ],
      filter: "active",
    },
    [todolistId2]: {
      data: [
        { id: v1(), title: "HTML&CSS22222", isDone: true },
        { id: v1(), title: "JS2222", isDone: true },
      ],
      filter: "all",
    },
  });



  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistId));
    delete tasks[todolistId];
  };

  function removeTask(todolistId: string, taskId: string) {
    const currentData = tasks[todolistId];
    const currentTasks = tasks[todolistId].data;
    const updatedData = {
      ...tasks,
      [todolistId]: {
        ...currentData,
        data: currentTasks.filter((el: TaskType) => el.id !== taskId),
      },
    };
    setTasks(updatedData);
  }

  function addTask(todolistId: string, title: string) {
    let newTask: TaskType = { id: v1(), title, isDone: false };
    const currentData = tasks[todolistId];
    const currentTasks = tasks[todolistId].data;
    const updatedTasks = {
      ...tasks,
      [todolistId]: { ...currentData, data: [...currentTasks, newTask] },
    };
    setTasks(updatedTasks);
  }

  function changeStatus(
    todolistId: string,
    taskId: string,
    newIsDone: boolean,
  ) {

    const currentData = tasks[todolistId];
    const currentTasks = tasks[todolistId].data;
    const updatedTasks = {
      ...tasks,
      [todolistId]: {
        ...currentData,
        data: currentTasks.map((el: TaskType) =>
          el.id === taskId ? { ...el, isDone: newIsDone } : el,
        ),
      },
    };
    setTasks(updatedTasks);
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    const currentData = tasks[todolistId];
    const updatedFilter = {
      ...tasks,
      [todolistId]: { ...currentData, filter: value },
    };
    setTasks(updatedFilter);
  }

  return (
    <div className="App">
      {todolists.map((el) => {
        return (
          <Todolist
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tasks[el.id].filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
};
