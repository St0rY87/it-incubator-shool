import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, TaskType, TodolistType } from "../App";
import { Button } from "./button/Button";
import { CreateItemForm } from "./createItemForm/CreateItemForm";
import { EditableSpan } from "./editableSpan/EditableSpan";

type Props = {
  todolist: TodolistType;
  tasks: TaskType[];
  date?: string;

  deleteTask: (todolistId: TodolistType["id"], taskId: TaskType["id"]) => void;
  createTask: (
    todolistId: TodolistType["id"],
    title: TaskType["title"],
  ) => void;
  handleFilterTasks: (
    todolistId: TodolistType["id"],
    newFilter: FilterValues,
  ) => void;
  changeTaskStatus: (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
  ) => void;
  deleteTodolist: (todolistId: TodolistType["id"]) => void;

  changeTodolistTitle: (
    todolistId: TodolistType["id"],
    title: TodolistType["title"],
  ) => void;

  changeTaskTitle: (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
    title: TaskType["title"],
  ) => void;
};

export const Todolist = ({
  todolist: { id, title, filter },
  tasks,
  deleteTask,
  handleFilterTasks,
  createTask,
  changeTaskStatus,
  deleteTodolist,
  changeTodolistTitle,
  changeTaskTitle,
}: Props) => {
  const handleTodoList = () => {
    deleteTodolist(id);
  };
  const handleTaskStatus = (
    id: string,
    TaskId: TaskType["id"],
    isDone: boolean,
  ) => {
    changeTaskStatus(id, TaskId, isDone);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    handleFilterTasks(id, filter);
  };

  const handleCreateTask = (title: TaskType["title"]) => {
    createTask(id, title);
  };

  const handleChangeTitleTodo = (title: TodolistType["title"]) => {
    changeTodolistTitle(id, title);
  };

  const handleChangeTitleTask = (
    title: TodolistType["title"],
    TaskId: TaskType["id"],
  ) => {
    changeTaskTitle(id, TaskId, title);
  };

  return (
    <>
      <div>
        <h3 className="container">
          <EditableSpan
            title={title}
            handleChangeTitle={handleChangeTitleTodo}
          />
          <Button title={"x"} onClick={handleTodoList} />
        </h3>
        <CreateItemForm onCreateItem={handleCreateTask} />

        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <ul>
            {tasks.map((task) => {
              
              const handleChangeTitleTask = (title: TodolistType["title"]) => {
                changeTaskTitle(id, task.id, title);
              };

              return (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(e) =>
                      handleTaskStatus(id, task.id, e.currentTarget.checked)
                    }
                  />
                  <EditableSpan
                    className={task.isDone ? "is-done" : ""}
                    title={task.title}
                    handleChangeTitle={handleChangeTitleTask}
                  />
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
