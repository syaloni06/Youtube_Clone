/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"; // Importing necessary hooks to manage context and state

// Creating a context for managing the video list across the application
export const VideoListContext = createContext();

// Defining the provider component to wrap the parts of the app that need access to the video list
export const VideoListProvider = ({ children }) => {
  // Initializing the videoList state to hold an empty array by default
  const [searchedVideoList, setSearchedVideoList] = useState([]); 

  return (
    <VideoListContext.Provider value={{ searchedVideoList, setSearchedVideoList }}>
      {/* Passing the video list state and setter function to the children components */}
      {children}
    </VideoListContext.Provider>
  );
};