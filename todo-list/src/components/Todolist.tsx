import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, Task, TodolistType } from "../App";
import { Button } from "./button/Button";
import { CreateItemForm } from "./createItemForm/CreateItemForm";

type Props = {
  todolist: TodolistType;
  tasks: Task[];
  date?: string;

  deleteTask: (todolistId: TodolistType["id"], taskId: Task["id"]) => void;
  createTask: (todolistId: TodolistType["id"], title: Task["title"]) => void;
  handleFilterTasks: (
    todolistId: TodolistType["id"],
    newFilter: FilterValues,
  ) => void;
  changeTaskStatus: (
    todolistId: TodolistType["id"],
    taskId: Task["id"],
    isDone: Task["isDone"],
  ) => void;
  deleteTodolist: (todolistId: TodolistType["id"]) => void;
};

export const Todolist = ({
  todolist: { id, title, filter },
  tasks,
  deleteTask,
  handleFilterTasks,
  createTask,
  changeTaskStatus,
  deleteTodolist,
}: Props) => {
  const handleTodoList = () => {
    deleteTodolist(id);
  };
  const handleTaskStatus = (
    id: string,
    TaskId: Task["id"],
    isDone: boolean,
  ) => {
    changeTaskStatus(id, TaskId, isDone);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    handleFilterTasks(id, filter);
  };

  const handleCreateTask = (title: string) => {
    createTask(id, title);
  };

  return (
    <>
      <div>
        <div className="container">
          <h3>{title}</h3>
          <Button title={"x"} onClick={handleTodoList} />
        </div>
        <CreateItemForm onCreateItem={handleCreateTask} />

        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) =>
                      handleTaskStatus(id, task.id, e.currentTarget.checked)
                    }
                  />
                  <span className={task.isDone ? "is-done" : ""}>
                    {task.title}
                  </span>
                  <button onClick={() => deleteTask(id, task.id)}>X</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title="All"
          onClick={() => changeFilterHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => changeFilterHandler("active")}
          title="Active"
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => changeFilterHandler("completed")}
          title="Completed"
        />
      </div>
    </>
  );
};
