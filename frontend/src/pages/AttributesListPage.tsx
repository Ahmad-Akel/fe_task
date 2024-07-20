import { useEffect, useState, useRef, useCallback } from "react";
import AttributesList from "../components/AttributesList";
import { Attribute, AttributesResponse } from "../types/attributes";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AttributesListPage = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [searchText, setSearchText] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const fetchAttributes = useCallback(
    async (searchText = "", reset = false) => {
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
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attributes:", err);
        setError("Failed to fetch attributes");
        setLoading(false);
      }
    },
    [loading, offset, sortBy, sortDir]
  );

  const debouncedFetchAttributes = useCallback(
    debounce((searchText) => fetchAttributes(searchText, true), 500),
    [fetchAttributes]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    debouncedFetchAttributes(value);
  };

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

  const handleSort = (property: string) => {
    const isAscending = sortBy === property && sortDir === "asc";
    setSortBy(property);
    setSortDir(isAscending ? "desc" : "asc");
  };

  useEffect(() => {
    fetchAttributes(searchText, true);
  }, [searchText]);

  useEffect(() => {
    fetchAttributes(searchText, true);
  }, [sortBy, sortDir]);

  if (loading && attributes.length === 0) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "start", mb: 3, mt: 3, ml: 1 }}
      >
        <TextField
          label="Search Attributes"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          inputRef={searchInputRef}
          placeholder="Search for Attributes"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <InfiniteScroll
        dataLength={attributes.length}
        next={() => fetchAttributes(searchText)}
        hasMore={hasMore}
        loader={<p>Loading more attributes...</p>}
        endMessage={<p>No more attributes to load</p>}
      >
        <AttributesList
          attributes={attributes}
          onDelete={handleOpenDialog}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </InfiniteScroll>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this attribute?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AttributesListPage;
