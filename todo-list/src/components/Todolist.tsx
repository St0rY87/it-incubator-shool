import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, Task } from "../App";
import { Button } from "./button/Button";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  filter: FilterValues;

  deleteTask: (taskId: Task["id"]) => void;
  createTask: (title: Task["title"]) => void;
  handleFilterTasks: (filter: FilterValues) => void;
  changeTaskStatus: (taskId: Task["id"], isDone: Task["isDone"]) => void;
};

export const Todolist = ({
  title,
  tasks,
  deleteTask,
  handleFilterTasks,
  createTask,
  changeTaskStatus,
  filter,
}: Props) => {
  const [valueInput, setValueInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateTask = () => {
    const trimmedTitle = valueInput.trim();
    if (!trimmedTitle) {
      setError("This field required");
      setValueInput('');
      return;
    }

    createTask(trimmedTitle);
    setValueInput("");
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
    setError(null);
  };

  const handleCreateTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleCreateTask();
  };

 const handleTaskStatus = (TaskId:Task["id"], isDone: boolean) => {
    changeTaskStatus(TaskId, isDone)
  }

  //    const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
            //     changeTaskStatus(task.id, e.currentTarget.checked)
            // }

 
  return (
    <>
      <h3>{title}</h3>
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
            //    const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
            //     changeTaskStatus(task.id, e.currentTarget.checked)
            // }
            return (
              <li key={task.id} >
                <input
                  type="checkbox"
                  checked={task.isDone}
                  // onChange={(e) =>
                  //   changeTaskStatus(task.id, e.currentTarget.checked)
                  // }
                  onChange={(e) => handleTaskStatus(task.id, e.currentTarget.checked)}
                />

                <span className={task.isDone ? "is-done" : ""} >{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>X</button>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title="All"
          onClick={() => handleFilterTasks("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => handleFilterTasks("active")}
          title="Active"
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => handleFilterTasks("completed")}
          title="Completed"
        />
      </div>
    </>
  );
};
