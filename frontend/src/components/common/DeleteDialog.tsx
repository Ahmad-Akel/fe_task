import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DeleteDialogProps {
  openDialog: boolean;
  handleCloseDialog: () => void;
  handleDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  openDialog,
  handleCloseDialog,
  handleDelete,
}) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Delete Attribute</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this attribute?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
