import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { FilterValues, TaskType, TodolistType } from "../App";
import { CreateItemForm } from "./createItemForm/CreateItemForm";
import { EditableSpan } from "./editableSpan/EditableSpan";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { containerSx, getListItemSx } from "../Todolist.styles";

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
        <Typography align="center" variant="h5" sx={{ fontWeight: "500" }}>
          <EditableSpan
            title={title}
            handleChangeTitle={handleChangeTitleTodo}
          />
          <IconButton size="small" onClick={handleTodoList}>
            <HighlightOffIcon />
          </IconButton>
        </Typography>
        <CreateItemForm onCreateItem={handleCreateTask} />

        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <List>
            {tasks.map((task) => {
              const handleChangeTitleTask = (title: TodolistType["title"]) => {
                changeTaskTitle(id, task.id, title);
              };

              return (
                <ListItem disablePadding sx={containerSx} key={task.id}>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Checkbox
                      size="small"
                      checked={task.isDone}
                      onChange={(e) =>
                        handleTaskStatus(id, task.id, e.currentTarget.checked)
                      }
                    />
                    <Box sx={getListItemSx(task.isDone)}>
                      <EditableSpan
                        // className={task.isDone ? "is-done" : ""}
                        title={task.title}
                        handleChangeTitle={handleChangeTitleTask}
                      />
                    </Box>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => deleteTask(id, task.id)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
      <Box sx={containerSx}>
        <Button
          disableElevation
          variant="contained"
          size="small"
          color={filter === "all" ? "secondary" : "primary"}
          onClick={() => changeFilterHandler("all")}
        >
          All
        </Button>

        <Button
          disableElevation
          variant="contained"
          size="small"
          color={filter === "active" ? "secondary" : "primary"}
          onClick={() => changeFilterHandler("active")}
        >
          Active
        </Button>

        <Button
          disableElevation
          variant="contained"
          size="small"
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={() => changeFilterHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </>
  );
};
