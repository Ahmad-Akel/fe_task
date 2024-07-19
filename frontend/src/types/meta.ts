export type Meta = {
  offset: number;
  limit: number;
  searchText: string;
  sortBy: "name" | "createdAt";
  sortDir: "asc" | "desc";
  hasNextPage: boolean;
};
