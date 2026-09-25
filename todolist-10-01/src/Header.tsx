import { AppBar, Toolbar, Container, IconButton, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "./NavButton";
import { containerSx } from "./TodolistItem.styles";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { changeThemeModeAC } from "./app/app-reducer";
import { useAppSelector } from "./common/hooks/useAppSelector";
import { selectThemeMode } from "./app/app-selectors";
import { getTheme } from "./common/theme/theme";

export const Header = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
