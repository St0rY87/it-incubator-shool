import type { SxProps } from "@mui/material";

export const containerSx: SxProps = {
  display: "flex",
  justifyContent: "space-between",
};

export const getListItemSx = (isDone: boolean): SxProps => ({
  opacity: isDone ? "0.5" : "1",
  textDecoration: isDone ? "line-through" : "unset",
});

export const inputSx: SxProps = {
  "& input": {
    padding: "5px 10px",
  },
};

export const wrapperInputSx: SxProps = {
  display: 'flex',
  alignItems: 'flex-start'
}

// .wrapper-input {
//   display: flex;
//   align-items: flex-start;
// }