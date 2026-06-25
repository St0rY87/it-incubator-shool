import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Switch,
  ThemeProvider,
  Toolbar
} from "@mui/material";
import { orange, teal } from "@mui/material/colors";
import { useState } from "react";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { CreateItemForm } from "../components/createItemForm/CreateItemForm";
import { Todolist } from "../components/Todolist";
import { selectTasks } from "../model/tasks-selectors";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTaskAC
} from "../model/tasksReducer";
import { selectTodolists } from "../model/todolists-selectors";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC
} from "../model/todolistsReducer";
import { NavButton } from "../NavButton";
import { containerSx } from "../Todolist.styles";
import "./App.css";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

// export type Tasks = {
//   [todolistId: string]: TaskType[];
// };

export type Tasks = Record<string, TaskType[]>;

export type FilterValues = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
};

type ThemeMode = "dark" | "light";



export const App = () => {
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);

  const dispatch = useAppDispatch()

  // tasks
  const deleteTask = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
  ) => {
    dispatch(deleteTaskAC({ todolistId, taskId }));
  };

  const createTask = (
    todolistId: TodolistType["id"],
    title: TaskType["title"],
  ) => {
    dispatch(createTaskAC({ id: todolistId, title }));
  };

  const changeTaskStatus = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
  ) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };
  const changeTaskTitle = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
    title: TaskType["title"],
  ) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };

  const getFilteredTasks = (tasks: TaskType[], filter: FilterValues) => {
    let filteredTasks = tasks;

    if (filter === "active") {
      return (filteredTasks = tasks.filter((task) => !task.isDone));
    }
    if (filter === "completed") {
      return (filteredTasks = tasks.filter((task) => task.isDone));
    }
    return filteredTasks;
  };

  //todolists
  const changeTodolistFilter = (
    todolistId: TodolistType["id"],
    filter: FilterValues,
  ) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };
  const deleteTodoList = (todolistId: TodolistType["id"]) => {
    dispatch(deleteTodolistAC({id: todolistId}));
  };
  const createTodolist = (title: TodolistType["title"]) => {
    dispatch(createTodolistAC(title));
  };
  const changeTodolistTitle = (
    todolistId: TodolistType["id"],
    title: TodolistType["title"],
  ) => {
    dispatch(changeTodolistTitleAC({ id: todolistId, title }));
  };

  const [isDark, setIsDark] = useState<ThemeMode>("light");

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: orange,
      mode: isDark === "light" ? "dark" : "light" ,
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <Switch onChange={() => setIsDark(isDark === "light" ? "dark" : "light")} />
              <NavButton background="tomato">Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton>FAQ</NavButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container max-width="lg">
          <Grid container sx={{ p: "15px 0" }}>
            <CreateItemForm onCreateItem={createTodolist} />
          </Grid>

          <Grid container spacing={5}>
            {todolists.map((todolist) => {
              return (
                <Grid key={todolist.id}>
                  <Paper elevation={6} sx={{ p: "15px" }}>
                    <Todolist
                      todolist={todolist}
                      tasks={getFilteredTasks(
                        tasks[todolist.id],
                        todolist.filter,
                      )}
                      deleteTask={deleteTask}
                      deleteTodolist={deleteTodoList}
                      changeTodolistFilter={changeTodolistFilter}
                      createTask={createTask}
                      changeTaskStatus={changeTaskStatus}
                      changeTodolistTitle={changeTodolistTitle}
                      changeTaskTitle={changeTaskTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};
