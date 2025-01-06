/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"; // Import necessary hooks for context and state management

// Create a new context for managing the drawer state
export const DrawerContext = createContext();

// Create a provider component that will wrap around parts of the app that need access to the context
export const DrawerProvider = ({ children }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false); // State to manage whether the drawer is open (default is false)

  return (
    // The provider shares the drawer state and its setter function with any component that consumes this context
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen }}>
      {children} {/* Render the children components within the provider */}
    </DrawerContext.Provider>
  );
};
