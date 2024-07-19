import React from "react";
import { Link } from "react-router-dom";
import { Attribute } from "../types/attributes";

interface AttributesListProps {
  attributes: Attribute[];
}

const AttributesList = ({ attributes }: AttributesListProps) => {
  return (
    <div>
      <table className="attributes-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Labels</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attribute) => (
            <tr key={attribute.id}>
              <td>
                <Link to={`/attributes/${attribute.id}`}>{attribute.name}</Link>
              </td>
              <td>{attribute.labelIds.join(", ")}</td>
              <td>{new Date(attribute.createdAt).toLocaleDateString()}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttributesList;
