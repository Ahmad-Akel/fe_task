import { useEffect, useState } from "react";
import AttributesList from "../components/AttributesList";
import { Attribute, AttributesResponse } from "../types/attributes";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AttributesListPage = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get<AttributesResponse>(
          `${API_BASE_URL}/attributes`
        );
        setAttributes(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch attributes");
        setLoading(false);
      }
    };

    fetchAttributes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <AttributesList attributes={attributes} />;
};

export default AttributesListPage;
