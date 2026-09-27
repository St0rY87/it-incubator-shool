import { Container, Grid2 } from "@mui/material";
import { CreateItemForm } from "./common/components/CreateItemForm/CreateItemForm";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { createTodolistAC } from "./features/todolists/model/todolists-reducer";
import { Todolists } from "./features/todolists/ui/Todolists/Todolists";


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
