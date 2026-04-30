import {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

export const Todolist = (props: PropsType)=> {

  const inputRef = useRef<HTMLInputElement>(null);

  // let [title, setTitle] = useState("")

  const addNewTask = () => {
    let inputValue = inputRef.current?.value;
    if(inputValue) {
      props.addTask(inputValue);
      inputValue = '';
    }
    // setTitle("");
    // console.log(inputRef.current?.value)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // setTitle(e.currentTarget.value)
    
  }


  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  }

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input 
      // value={title}
            ref={inputRef}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
      />
      <button onClick={addNewTask}>+</button>
    </div>
    <ul>
      {
        props.tasks.map(t => {

          const onClickHandler = () => props.removeTask(t.id)

          return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={onAllClickHandler}>All</button>
      <button onClick={onActiveClickHandler}>Active</button>
      <button onClick={onCompletedClickHandler}>Completed</button>
    </div>
  </div>
}
