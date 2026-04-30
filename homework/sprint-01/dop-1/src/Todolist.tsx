import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType, TasksType } from "./App";
import { Button } from "./components/Button";

type PropsType = {
  id: number;
  title: string;
  tasks: Array<TasksType>;
  students: Array<string>;
  filter: FilterValuesType;

  removeTask: (taskId: string, todolistId: number) => void;
  changeFilter: (value: FilterValuesType, todolistId: number) => void;
  addTask: (title: string, todolistId: number) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void;
  removeTodolist: (id: number) => void;
  removeAllTodolists: () => void;
  removeAllTasksInOneTodo: (todolistId: number) => void;
};

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      // addTask();
    }
  };

  const handleRemoveTodolist = () => {
    props.removeTodolist(props.id);
  };

  const handleAddTask = () => {
    props.addTask(title, props.id);
  };

  const handleRemoveTask = (taskId: string) => {
    props.removeTask(taskId, props.id);
  };

  const handleChangeFIlter = (filterType: FilterValuesType) => {
    props.changeFilter(filterType, props.id);
  };

  const handleRemoveAllTodoLists = () => {
    props.removeAllTodolists();
  }
  const handleRemoveAllTasksinTodoList = () => {
        props.removeAllTasksInOneTodo( props.id)
  }

  return (
    <div>
      <h3>
        {props.title}
        {/* <button onClick={() => {ыва
                'removeTodolist'
            }}>x
            </button> */}
        <Button title="X" onClick={handleRemoveTodolist} />
        
        <Button title='handleRemoveAllTasksinTodoList' onClick={handleRemoveAllTasksinTodoList} />
        <Button title='remove All todo lists' onClick={handleRemoveAllTodoLists} />
      </h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        {/* <button onClick={()=>{props.addTask('NodeJS', props.id)}}>+</button> */}
        <Button title="+" onClick={handleAddTask} />

        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {props.tasks.map((t) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
          };

          return (
            <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <span>{t.title}</span>
              <button onClick={() => handleRemoveTask(t.taskId)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={()=>{}}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={()=>{}}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={()=>{}}>Completed
            </button> */}

        <Button
          title="All"
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={() => handleChangeFIlter("all")}
        />
        <Button
          title="Active"
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={() => handleChangeFIlter("active")}
        />
        <Button
          title="Completed"
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={() => handleChangeFIlter("completed")}
        />
      </div>
      <p></p>
      {props.students.map((el) => {
        return <div>{el}</div>;
      })}
    </div>
  );
}
