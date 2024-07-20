import { Link as RouterLink, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
// import "@styles/styles.css";

interface NavButtonProps {
  to: string;
  label: string;
}

const NavButton = ({ to, label }: NavButtonProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      component={RouterLink}
      to={to}
      style={{
        fontWeight: isActive ? "bold" : "normal",
        borderBottom: isActive ? "1px solid white" : "none",
        color: "white",
      }}
    >
      {label}
    </Button>
  );
};

export default NavButton;
