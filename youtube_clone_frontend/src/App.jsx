import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import "./App.css"; // Import global CSS for the app's styles
import Header from "./components/Header"; // Import the Header component for the app
import Sidebar from "./components/Sidebar"; // Import the Sidebar component for navigation or menu
import userStore from "./utils/appStore"; // Import the Redux store configuration
import { Provider } from "react-redux"; // Import the Provider component to connect the Redux store to the app

// Define the main App component
function App() {
  return (
    <>
      {/* Wrap the application in the Redux Provider to give all components access to the Redux store */}
      <Provider store={userStore}>
        <Header />
        {/* Render the Header component, typically used for the app's title or navigation */}
        <Sidebar />
        {/* Render the Sidebar component, which might provide additional navigation options */}
        <Outlet /> {/* Render the content of the matched route dynamically */}
      </Provider>
    </>
  );
}

export default App; // Export the App component as the default export
