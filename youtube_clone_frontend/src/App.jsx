import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import "./App.css"; // Import global CSS for the app's styles
import Header from "./components/Header"; // Import Header component
import Sidebar from "./components/Sidebar";
import userStore from "./utils/userStore";
import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={userStore}>
        <Header /> {/* Render the Header component */}
        <Sidebar />
        <Outlet /> {/* Render the content of the matched route */}
      </Provider>
    </>
  );
}

export default App; // Export the App component as default
