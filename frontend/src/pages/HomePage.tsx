import { Link as RouterLink } from "react-router-dom";
import { Typography, Container, Button } from "@mui/material";
// import "@styles/styles";
import "../styles/styles.css";

const HomePage = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h2" gutterBottom align="center">
          Welcome Home
        </Typography>
        <div className="home-button-container">
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/attributes"
          >
            Explore Attributes
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
