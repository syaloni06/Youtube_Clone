/* eslint-disable no-unused-vars */ 
/* eslint-disable react-refresh/only-export-components */ 

import React, { lazy, StrictMode, Suspense } from "react"; // Import necessary React components and utilities
import { createRoot } from "react-dom/client"; // Import for creating the React root element
import "./index.css"; // Import the global CSS styles
import App from "./App.jsx"; // Import the main App component
import { createBrowserRouter } from "react-router-dom"; // Import for creating browser-based routing
import SignIn from "./components/SignIn.jsx"; // Component for user sign-in functionality
import NotFound from "./components/NotFound.jsx"; // Component for handling 404 errors
import { RouterProvider } from "react-router-dom"; // Import RouterProvider to manage routing in the app
import { SearchProvider } from "./utils/SearchContext.jsx"; // Context provider for search functionality
import { SearchFlagProvider } from "./utils/SearchFlagContext.jsx"; // Context provider for search flags
import { DrawerProvider } from "./utils/DrawerContext.jsx"; // Context provider for drawer state management
import { VideoListProvider } from "./utils/VideoListContext.jsx"; // Context provider for video list state management
import { ChannelProvider } from "./utils/ChannelContext.jsx"; // Context provider for channel-related state
import SignUp from "./components/SignUp.jsx"; // Component for user sign-up functionality


// Lazy load the VideoDetail, VideoList and Channel components for improved performance
const VideoDetail = lazy(() => import("./components/VideoDetail.jsx"));
const Channel = lazy(() => import("./components/Channel.jsx"));
const VideoList = lazy(() => import("./components/VideoList.jsx"));

// Define the app's router with different routes and lazy-loaded components
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app component
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoList /> {/* Lazy load VideoList component */}
          </Suspense>
        ),
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoDetail /> {/* Lazy load VideoDetail component */}
          </Suspense>
        ),
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Channel /> {/* Lazy load Channel component */}
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />, // Route for Signin page
      },
      {
        path: "signup",
        element: <SignUp /> // Route for Signup page
      },
    ],
    errorElement: <NotFound />, // Component to render when no route matches (404 page)
  },
]);

// Render the root of the React application
createRoot(document.getElementById("root")).render(
  <StrictMode> {/* Enables React's strict mode for identifying potential issues */}
  <ChannelProvider> {/* Context provider for channel-related state */}
    <VideoListProvider> {/* Context provider for video list state */}
      <SearchProvider> {/* Context provider for search-related state */}
        <SearchFlagProvider> {/* Context provider for search flags */}
          <DrawerProvider> {/* Context provider for drawer state */}
            <RouterProvider router={appRouter} /> {/* Provide the app's router to the app */}
          </DrawerProvider>
        </SearchFlagProvider>
      </SearchProvider>
    </VideoListProvider>
    </ChannelProvider>
  </StrictMode>
);