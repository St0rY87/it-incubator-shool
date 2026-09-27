import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { CreateItemForm } from "@/CreateItemForm";
import { Container, Grid2, Paper } from "@mui/material";
import { Todolists } from "./Todolists";
import { createTodolistAC } from "@/model/todolists-reducer";

export type FilterValues = "all" | "active" | "completed";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolist = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  return (
    <Container maxWidth={"lg"}>
      <Grid2 container sx={{ mb: "30px" }}>
        <CreateItemForm onCreateItem={createTodolist} />
      </Grid2>
      <Grid2 container spacing={4}>
        <Todolists />
      </Grid2>
    </Container>
  );
};
