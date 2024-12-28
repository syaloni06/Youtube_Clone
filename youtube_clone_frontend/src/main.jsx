/* eslint-disable no-unused-vars */ 
/* eslint-disable react-refresh/only-export-components */ 

import React, { lazy, StrictMode, Suspense } from "react"; // Import necessary React components and utilities
import { createRoot } from "react-dom/client"; // Import for creating the React root element
import "./index.css"; // Import the global CSS styles
import App from "./App.jsx"; // Import the main App component
import { createBrowserRouter } from "react-router-dom"; // Import for creating browser-based routing
import Home from "./components/Home.jsx";
import NotFound from "./components/NotFound.jsx"; // Import the NotFound component (for handling 404s)
import { RouterProvider } from "react-router-dom"; // Import RouterProvider to manage routing in the app
import { SearchProvider } from "./utils/SearchContext.jsx";
import { SearchFlagProvider } from "./utils/SearchFlagContext.jsx";

// Lazy load the product detail, cart, and checkout components for better performance
const Video = lazy(() => import("./components/Video.jsx"));
const Channel = lazy(() => import("./components/Channel.jsx"));

// Define the app's router with different routes and lazy-loaded components
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app component
    children: [
      {
        path: "/",
        element: <Home />, // Route for the product list
      },
      {
        path: "/video/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Video /> {/* Lazy load ProductDetail component */}
          </Suspense>
        ),
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Channel /> {/* Lazy load Cart component */}
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />, // 404 route if an undefined route is accessed
  },
]);

// Render the root of the React app
createRoot(document.getElementById("root")).render(
  <StrictMode> {/* Enables strict mode for additional warnings and checks */}
      <SearchProvider> {/* Wrap the app in the search context provider */}
        <SearchFlagProvider> {/* Wrap the app in the search flag context provider */}
          <RouterProvider router={appRouter} /> {/* Provide the app's routing */}
        </SearchFlagProvider>
      </SearchProvider>
  </StrictMode>
);