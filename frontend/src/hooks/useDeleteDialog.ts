import { useState } from "react";
import axios from "axios";
import { Attribute } from "../types/attributes";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useDeleteDialog = (
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>
) => {
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenDialog = (attribute: Attribute) => {
    setSelectedAttribute(attribute);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAttribute(null);
  };

  const handleDelete = async () => {
    if (!selectedAttribute) return;

    try {
      await axios.delete(`${API_BASE_URL}/attributes/${selectedAttribute.id}`);
      setAttributes((prevAttributes) =>
        prevAttributes.filter((attr) => attr.id !== selectedAttribute.id)
      );
      handleCloseDialog();
    } catch (err) {
      setError("Failed to delete attribute");
    }
  };

  return {
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
    handleDelete,
    selectedAttribute,
    error,
  };
};

export default useDeleteDialog;
