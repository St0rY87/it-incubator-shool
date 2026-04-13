import type { FilterValues, Task } from "../App";
import { Button } from "./button/Button";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
  deleteTask: (taskId:Task['id'])=> void;
  handleFilterTasks: (filter: FilterValues) => void
};


export const Todolist= ({ title, tasks, deleteTask, handleFilterTasks }: Props) => {
  return (
    <>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+" />
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
                <button onClick = {() => deleteTask(task.id)}>X</button>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title="All" onClick={() => handleFilterTasks('all')} />
        <Button onClick={()=> handleFilterTasks("active")} title="Active" />
        <Button onClick={() => handleFilterTasks("completed")} title="Completed" />
      </div>
    </>
  );
};



