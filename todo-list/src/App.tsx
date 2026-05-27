import { useState } from "react";
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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type Tasks = {
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

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<Tasks>({
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

  const deleteTask = (
    todolistId: TodolistType["id"],
    taskId: TaskType["id"],
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
    });
  };

  const deleteTodoList = (todolistId: TodolistType["id"]) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));

    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const handleFilterTasks = (
    todolistId: TodolistType["id"],
    filter: FilterValues,
  ) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, filter } : todolist,
      ),
    );
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

  function createTodolist(title: TodolistType["title"]) {
    const newTodo: TodolistType = {
      id: v1(),
      title,
      filter: "all",
    };
    setTodolists([...todolists, newTodo]);
    setTasks({ ...tasks, [newTodo.id]: [] });
  }

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

  const changeTodolistTitle = (
    todolistId: TodolistType["id"],
    title: TodolistType["title"],
  ) => {
    setTodolists(
      todolists.map((todolist) =>
        todolist.id === todolistId ? { ...todolist, title } : todolist,
      ),
    );
  };

  const [isDark, setIsDark] = useState(false)

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: orange,
      mode: isDark ? 'dark' : 'light'
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
              <Switch onChange={()=>setIsDark(!isDark)}/>
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
                      handleFilterTasks={handleFilterTasks}
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
