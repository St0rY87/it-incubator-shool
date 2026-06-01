import { useReducer, useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist";
import { v1 } from "uuid";
import { CreateItemForm } from "./components/createItemForm/CreateItemForm";
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Switch,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "./NavButton";
import { containerSx } from "./Todolist.styles";
import { blue, orange, pink, teal } from "@mui/material/colors";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  todolistsReducer,
} from "./model/todolistsReducer";
import { tasksReducer } from "./model/tasksReducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type Tasks = {
  [todolistId: string]: TaskType[];
};

export type FilterValues = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export const App = () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const initialState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const [todolists, dispatchToTodolists] = useReducer(
    todolistsReducer,
    initialState,
  );

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  // const [tasks, setTasks] = useState<Tasks>({
  //   [todolistId1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistId2]: [
  //     { id: v1(), title: "Rest API", isDone: true },
  //     { id: v1(), title: "GraphQL", isDone: false },
  //   ],
  // });

  // tasks
  const deleteTask = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
    });
  };
  const createTask = (
    todolistId: TodolistType["id"],
    title: TaskType["title"],
  ) => {
    const newTask = { id: v1(), title, isDone: false };

    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };
  const changeTaskStatus = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
    isDone: TaskType["isDone"],
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id == taskId ? { ...task, isDone } : task,
      ),
    });
  };
  const changeTaskTitle = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
    title: TaskType["title"],
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((task) =>
        task.id == taskId ? { ...task, title } : task,
      ),
    });
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
    dispatchToTodolists(changeTodolistFilterAC({ id: todolistId, filter }));
  };
  const deleteTodoList = (todolistId: TodolistType["id"]) => {
    const action = deleteTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const createTodolist = (title: TodolistType["title"]) => {
    const action = createTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const changeTodolistTitle = (
    todolistId: TodolistType["id"],
    title: TodolistType["title"],
  ) => {
    dispatchToTodolists(changeTodolistTitleAC({ id: todolistId, title }));
  };

  const [isDark, setIsDark] = useState(false);

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: orange,
      mode: isDark ? "dark" : "light",
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
              <Switch onChange={() => setIsDark(!isDark)} />
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
