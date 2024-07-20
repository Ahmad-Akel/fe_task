import React from "react";
import { Link } from "react-router-dom";
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
import { Attribute } from "../types/attributes";

interface TableHeaderProps {
  sortBy: string;
  sortDir: "asc" | "desc";
  onSort: (property: string) => void;
}

interface AttributeRowProps {
  attribute: Attribute;
  onDelete: (attribute: Attribute) => void;
}

interface AttributesListProps {
  attributes: Attribute[];
  onDelete: (attribute: Attribute) => void;
  sortBy: string;
  sortDir: "asc" | "desc";
  onSort: (property: string) => void;
}

const TableHeader = ({ sortBy, sortDir, onSort }: TableHeaderProps) => (
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
);

const AttributeRow = ({ attribute, onDelete }: AttributeRowProps) => (
  <TableRow key={attribute.id}>
    <TableCell>
      <Link to={`/attributes/${attribute.id}`}>{attribute.name}</Link>
    </TableCell>
    <TableCell>{attribute.labelIds.join(", ")}</TableCell>
    <TableCell>{new Date(attribute.createdAt).toLocaleDateString()}</TableCell>
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
);

const AttributesList = ({
  attributes,
  onDelete,
  sortBy,
  sortDir,
  onSort,
}: AttributesListProps) => {
  if (!attributes || attributes.length === 0) {
    return <p>No attributes found.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableHeader sortBy={sortBy} sortDir={sortDir} onSort={onSort} />
        </TableHead>
        <TableBody>
          {attributes.map((attribute) => (
            <AttributeRow
              key={attribute.id}
              attribute={attribute}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttributesList;
