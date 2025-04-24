export const objectMatchesSearch = (obj, term) => {
    const lowerTerm = term.toLowerCase();
  
    return Object.values(obj).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return String(value).toLowerCase().includes(lowerTerm);
      }
  
      if (Array.isArray(value)) {
        return value.some((item) => {
          if (typeof item === "string" || typeof item === "number") {
            return String(item).toLowerCase().includes(lowerTerm);
          }
          if (typeof item === "object" && item !== null) {
            return objectMatchesSearch(item, term);
          }
          return false;
        });
      }
  
      if (typeof value === "object" && value !== null) {
        return objectMatchesSearch(value, term);
      }
  
      return false;
    });
  };