import { useState, useCallback } from "react";
import axios from "axios";
import { Attribute, AttributesResponse } from "../types/attributes";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useAttributes = (
  initialSortBy: string,
  initialSortDir: "asc" | "desc"
) => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortDir, setSortDir] = useState<"asc" | "desc">(initialSortDir);
  const [searchText, setSearchText] = useState<string>("");

  const fetchAttributes = useCallback(
    async (reset = false) => {
      if (loading) return;
      setLoading(true);

      try {
        const response = await axios.get<AttributesResponse>(
          `${API_BASE_URL}/attributes`,
          {
            params: {
              offset: reset ? 0 : offset,
              limit: 10,
              sortBy,
              sortDir,
              searchText,
            },
          }
        );

        const newAttributes = response.data.data;
        setAttributes((prevAttributes) => {
          if (reset) {
            return newAttributes;
          }
          const allAttributes = [...prevAttributes, ...newAttributes];
          const uniqueAttributes = allAttributes.filter(
            (attr, index, self) =>
              index === self.findIndex((a) => a.id === attr.id)
          );
          return uniqueAttributes;
        });
        setHasMore(response.data.meta.hasNextPage);
        setOffset((prevOffset) => (reset ? 10 : prevOffset + 10));
      } catch (err) {
        console.error("Error fetching attributes:", err);
        setError("Failed to fetch attributes");
      } finally {
        setLoading(false);
      }
    },
    [loading, offset, sortBy, sortDir, searchText]
  );

  return {
    attributes,
    hasMore,
    loading,
    error,
    fetchAttributes,
    sortBy,
    sortDir,
    setSortBy,
    setSortDir,
    searchText,
    setAttributes,
    setSearchText,
  };
};

export default useAttributes;
