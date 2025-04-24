import { objectMatchesSearch } from "../utils/objectMatchesSearch";

export const useSearchFilter = (data, searchTerm) => {
  if (!data) return [];
  if (!searchTerm.trim()) return data;

  return data.filter((item) => objectMatchesSearch(item, searchTerm));
};