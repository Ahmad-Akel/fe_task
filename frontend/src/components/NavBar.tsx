import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/attributes">
          Attributes
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
