import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Attribute } from "../types/attributes";
import NotFoundPage from "./NotFoundPage";
import DeleteDialog from "../components/common/DeleteDialog";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AttributeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [attribute, setAttribute] = useState<Attribute | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchAttribute = async () => {
      try {
        const response = await axios.get<{ data: Attribute }>(
          `${API_BASE_URL}/attributes/${id}`
        );
        setAttribute(response.data.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response && err.response.status === 404) {
            setNotFound(true);
          } else {
            setError("Failed to fetch attribute details");
          }
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };

    fetchAttribute();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/attributes/${id}`);
      navigate("/attributes");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError("Failed to delete attribute");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setOpenDialog(false);
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  if (loading) return <p>Loading...</p>;
  if (notFound) return <NotFoundPage />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Button color="primary" onClick={() => navigate("/attributes")}>
        <ArrowBackIcon />
        BACK
      </Button>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Card sx={{ minWidth: 275, boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="div">
                {attribute?.name || "Attribute Name"}
              </Typography>
              <IconButton
                color="error"
                aria-label="delete"
                component="span"
                onClick={handleDialogOpen}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Labels:
            </Typography>
            <List>
              {(attribute?.labelIds || []).map((labelId) => (
                <ListItem key={labelId}>
                  <ListItemText primary={`Label ${labelId}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        <DeleteDialog
          openDialog={openDialog}
          handleCloseDialog={handleDialogClose}
          handleDelete={handleDelete}
        />
      </Container>
    </div>
  );
};

export default AttributeDetailPage;
