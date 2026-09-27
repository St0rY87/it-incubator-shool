import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { selectThemeMode } from "./app-selectors";

import { Main } from "./Main";
import styles from './App.module.css';
import { Header } from "./common/components/Header/Header";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { getTheme } from "./common/theme/theme";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export type TasksState = Record<string, Task[]>;

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
};
