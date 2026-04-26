import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, Task } from "../App";
import { Button } from "./button/Button";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;

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
}: Props) => {
  // const [isDone, setIsDone] = useState(false);

  const [valueInput, setValueInput] = useState("");

  const handleCreateTask = () => {
    createTask(valueInput);
    setValueInput("");
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const handleCreateTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleCreateTask();
  };

  return (
    <>
      <h3>{title}</h3>
      <div>
        <input
          value={valueInput}
          onChange={handleChangeTitle}
          onKeyDown={handleCreateTaskOnEnter}
        />
        <Button onClick={handleCreateTask} title="+" />
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
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) =>
                    changeTaskStatus(task.id, e.currentTarget.checked)
                  }
                  // onChange={handleChecked}
                />

                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>X</button>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title="All" onClick={() => handleFilterTasks("all")} />
        <Button onClick={() => handleFilterTasks("active")} title="Active" />
        <Button
          onClick={() => handleFilterTasks("completed")}
          title="Completed"
        />
      </div>
    </>
  );
};
