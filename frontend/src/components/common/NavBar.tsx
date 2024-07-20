import { AppBar, Toolbar } from "@mui/material";
import NavButton from "./NavButton";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavButton to="/" label="Home" />
        <NavButton to="/attributes" label="Attributes" />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
