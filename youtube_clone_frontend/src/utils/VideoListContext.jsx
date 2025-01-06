/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"; // Importing necessary hooks to manage context and state

// Creating a context for managing the video list across the application
export const VideoListContext = createContext();

// Defining the provider component to wrap the parts of the app that need access to the video list
export const VideoListProvider = ({ children }) => {
  // Initializing the `searchedVideoList` state to hold an array of videos (default is an empty array)
  const [searchedVideoList, setSearchedVideoList] = useState([]);

  return (
    // The context provider shares the `searchedVideoList` state and the `setSearchedVideoList` function
    // with all child components that consume this context
    <VideoListContext.Provider
      value={{ searchedVideoList, setSearchedVideoList }}
    >
      {/* Render the children components inside the provider */}
      {children}
    </VideoListContext.Provider>
  );
};
