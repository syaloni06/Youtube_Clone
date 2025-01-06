/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"; // Import necessary hooks for context and state management

// Create a new context for managing search term state
export const SearchContext = createContext();

// Create a provider component that will wrap around parts of the app that need access to the context
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State to manage the search term (initially empty string)

  return (
    // The provider shares the search term state and its setter function with any component that consumes this context
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children} {/* Render the children components within the provider */}
    </SearchContext.Provider>
  );
};
