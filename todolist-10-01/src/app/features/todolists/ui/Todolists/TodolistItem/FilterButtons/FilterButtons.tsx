import { Todolist, FilterValues } from "@/app/App";
import { useAppDispatch } from "@/app/common/hooks/useAppDispatch";
import { containerSx } from "@/app/common/styles/container.styles";
import { changeTodolistFilterAC } from "@/app/features/todolists/model/todolists-reducer";

import { Box, Button } from "@mui/material";

type Props = {
  todolist: Todolist;
};

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const dispatch = useAppDispatch();

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }));
  };
  return (
    <Box sx={containerSx}>
      <Button variant={filter === "all" ? "outlined" : "text"} color={"inherit"} onClick={() => changeFilter("all")}>
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  );
};
