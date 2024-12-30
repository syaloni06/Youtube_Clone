import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import "./App.css"; // Import global CSS for the app's styles
import Header from "./components/Header"; // Import Header component
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header /> {/* Render the Header component */}
      <Sidebar />
      <Outlet /> {/* Render the content of the matched route */}
      
    </>
  );
}

export default App; // Export the App component as default
