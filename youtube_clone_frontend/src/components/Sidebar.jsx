import  { useState } from "react";
import { FaHome, FaFire, FaRegCompass, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
    <div
      className={`${
        isExpanded ? "w-64" : "w-16"
      } h-screen bg-gray-800 text-white transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`${isExpanded ? "block" : "hidden"} text-lg font-bold`}>
          Sidebar
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-gray-700"
        >
          <FaBars />
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <FaHome />
            <span className={`${isExpanded ? "ml-4" : "hidden"}`}>Home</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <FaFire />
            <span className={`${isExpanded ? "ml-4" : "hidden"}`}>Trending</span>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
            <FaRegCompass />
            <span className={`${isExpanded ? "ml-4" : "hidden"}`}>Explore</span>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default Sidebar;