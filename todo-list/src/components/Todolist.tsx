import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, Task, TodoListType } from "../App";
import { Button } from "./button/Button";

type Props = {
  todolist: TodoListType;
  tasks: Task[];
  date?: string;

  deleteTask: (todolistId: string, taskId: Task["id"]) => void;
  createTask: (todolistId: string, title: Task["title"]) => void;
  handleFilterTasks: (todolistId: string, newFilter: FilterValues) => void;
  changeTaskStatus: (todolistId: string, taskId: Task["id"], isDone: Task["isDone"]) => void;
  deleteTodolist: (todolistId: string) => void;
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
  const [valueInput, setValueInput] = useState("");
  const [error, setError] = useState<string | null>(null);

 const handleTodoList = () => {
    deleteTodolist(id)
  }

  const handleCreateTask = () => {
    const trimmedTitle = valueInput.trim();
    if (!trimmedTitle) {
      setError("This field required");
      setValueInput("");
      return;
    }
    createTask(id, trimmedTitle);
    setValueInput("");
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    setError(null);
  };

  const handleCreateTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleCreateTask();
  };

  const handleTaskStatus = (id: string, TaskId: Task["id"], isDone: boolean) => {
    changeTaskStatus(id, TaskId, isDone);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    handleFilterTasks(id, filter);
  };


  return (
    <>
      <div>
        <div className="container">
        <h3>{title}</h3>
        <Button title={'x'} onClick={handleTodoList}/>
        </div>

        <div>
          <input
            className={error ? "error" : ""}
            value={valueInput}
            onChange={handleChangeTitle}
            onKeyDown={handleCreateTaskOnEnter}
          />

          <Button onClick={handleCreateTask} title="+" />

          {error ? <p className="error-message">{error}</p> : ""}
        </div>
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
                      handleTaskStatus(id,task.id, e.currentTarget.checked)
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




