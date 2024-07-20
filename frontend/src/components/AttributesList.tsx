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
  TableSortLabel,
} from "@mui/material";
import NotFoundPage from "../pages/NotFoundPage";

interface AttributesListProps {
  attributes: Attribute[];
  onDelete: (attribute: Attribute) => void;
  sortBy: string;
  sortDir: "asc" | "desc";
  onSort: (property: string) => void;
}

const AttributesList = ({
  attributes,
  onDelete,
  sortBy,
  sortDir,
  onSort,
}: AttributesListProps) => {
  if (!attributes) {
    return <NotFoundPage />;
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === "name"}
                direction={sortDir}
                onClick={() => onSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>Labels</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "createdAt"}
                direction={sortDir}
                onClick={() => onSort("createdAt")}
              >
                Created At
              </TableSortLabel>
            </TableCell>
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
