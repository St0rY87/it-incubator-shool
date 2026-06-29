import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "@/model/todolists-selectors";
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import { Grid2, Paper } from "@mui/material";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);

  return (
    <>
      {todolists.map((todolist) => (
        <Grid2 key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid2>
      ))}
    </>
  );
};
