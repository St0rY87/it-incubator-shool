import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import type { TasksType, TodolistType } from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: TasksType
    removeTask: (todolistId: TodolistType['id'], taskId: TaskType['id']) => void
    changeFilter: (todolistId: TodolistType['id'], value: FilterValuesType) => void
    addTask: (todolistId: TodolistType['id'], title: TaskType['title']) => void
    changeTaskStatus: (todolistId: TodolistType['id'], taskId: TaskType['id'], isDone: TaskType['isDone']) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: TodolistType['id']) => void
}

export const Todolist = (props: PropsType)=> {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistId, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const currentTasks = props.tasks[props.todolistId];
    let tasksForTodolist = currentTasks.data;

        if (currentTasks.filter === "active") {
          tasksForTodolist = currentTasks.data.filter(
            (t: TaskType) => t.isDone === false,
          );
        }
        if (currentTasks.filter === "completed") {
          tasksForTodolist = currentTasks.data.filter((t:TaskType) => t.isDone === true);
        }

    return <div>
        <h3>
            {props.title}
            <button onClick={removeTodolistHandler}>X</button>

        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasksForTodolist.map((t: TaskType) => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
