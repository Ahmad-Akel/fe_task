import { Link as RouterLink } from "react-router-dom";
import { Typography, Container, Button } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h2" gutterBottom align="center">
          Welcome Home
        </Typography>
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
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
