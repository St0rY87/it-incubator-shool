import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { CreateItemForm } from "@/CreateItemForm";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC } from "@/model/tasks-reducer";
import { selectTasks } from "@/model/tasks-selectors";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from "@/model/todolists-reducer";
import { selectTodolists } from "@/model/todolists-selectors";
import { TodolistItem } from "@/TodolistItem";
import { Container, Grid, Paper } from "@mui/material";

export type FilterValues = "all" | "active" | "completed";

export const Main = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);
  
  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  const deleteTask = (todolistId: string, taskId: string) => {
    dispatch(deleteTaskAC({ todolistId, taskId }));
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const createTask = (todolistId: string, title: string) => {
    dispatch(createTaskAC({ todolistId, title }));
  };

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({ id: todolistId }));
  };

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }));
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        {todolists.map((todolist) => {
          const todolistTasks = tasks[todolist.id];
          let filteredTasks = todolistTasks;
          if (todolist.filter === "active") {
            filteredTasks = todolistTasks.filter((task) => !task.isDone);
          }
          if (todolist.filter === "completed") {
            filteredTasks = todolistTasks.filter((task) => task.isDone);
          }

          return (
            <Grid key={todolist.id}>
              <Paper sx={{ p: "0 20px 20px 20px" }}>
                <TodolistItem
                  todolist={todolist}
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  changeFilter={changeFilter}
                  createTask={createTask}
                  changeTaskStatus={changeTaskStatus}
                  deleteTodolist={deleteTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
