import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, Task } from "../App";
import { Button } from "./button/Button";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId: Task["id"]) => void;
  handleFilterTasks: (filter: FilterValues) => void;
  createTask: (title: string) => void;
};

export const Todolist = ({
  title,
  tasks,
  deleteTask,
  handleFilterTasks,
  createTask,
}: Props) => {
  // const [isDone, setIsDone] = useState(false);
  const [valueInput, setValueInput] = useState("");

  const handleAddTask = () => {
    createTask(valueInput);
    setValueInput("");
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
  }

  const handleCreateTaskOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
     e.key === 'Enter' && handleAddTask()
  }

  return (
    <>
      <h3>{title}</h3>
      <div>
        <input
          value={valueInput}
          onChange={handleChangeTitle}
          onKeyDown={handleCreateTaskOnEnter}
        />
        <Button onClick={handleAddTask} title="+" />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />

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
