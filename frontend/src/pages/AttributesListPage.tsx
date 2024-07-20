import { useEffect, useRef, useCallback } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import AttributesList from "../components/AttributesList";
import DeleteDialog from "../components/common/DeleteDialog";
import useAttributes from "../hooks/useAttributes";
import useDeleteDialog from "../hooks/useDeleteDialog";

const AttributesListPage = () => {
  const {
    attributes,
    setAttributes,
    hasMore,
    loading,
    error,
    fetchAttributes,
    sortBy,
    sortDir,
    setSortBy,
    setSortDir,
    searchText,
    setSearchText,
  } = useAttributes("name", "asc");

  const { openDialog, handleOpenDialog, handleCloseDialog, handleDelete } =
    useDeleteDialog(setAttributes);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedFetchAttributes = useCallback(
    debounce(() => fetchAttributes(true), 500),
    [fetchAttributes]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
    debouncedFetchAttributes();
  };

  const handleSort = (property: string) => {
    const isAscending = sortBy === property && sortDir === "asc";
    setSortBy(property);
    setSortDir(isAscending ? "desc" : "asc");
  };

  useEffect(() => {
    fetchAttributes(true);
  }, [sortBy, sortDir]);

  if (loading && attributes.length === 0) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "start", mb: 3, mt: 3, ml: 1 }}
      >
        <TextField
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
        next={() => fetchAttributes()}
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

      <DeleteDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AttributesListPage;
