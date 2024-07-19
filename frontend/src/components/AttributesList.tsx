import React from "react";
import { Link } from "react-router-dom";
import { Attribute } from "../types/attributes";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface AttributesListProps {
  attributes: Attribute[];
  onDelete: (attribute: Attribute) => void; // Function to handle delete
}

const AttributesList = ({ attributes, onDelete }: AttributesListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Labels</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map((attribute) => (
            <TableRow key={attribute.id}>
              <TableCell>
                <Link to={`/attributes/${attribute.id}`}>{attribute.name}</Link>
              </TableCell>
              <TableCell>{attribute.labelIds.join(", ")}</TableCell>
              <TableCell>
                {new Date(attribute.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(attribute)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttributesList;
