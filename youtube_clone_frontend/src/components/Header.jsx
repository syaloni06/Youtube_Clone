import { Link, useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { useContext, useState } from "react";
import { DrawerContext } from "../utils/DrawerContext.jsx";
import { SearchContext } from "../utils/SearchContext.jsx";
import { SearchFlagContext } from "../utils/SearchFlagContext.jsx";
import { useSelector } from "react-redux";
import SidebarDrawer from "./SidebarDrawer.jsx";
import MenuBar from "./Menubar.jsx";
import { VideoListContext } from "../utils/VideoListContext.jsx";

const Header = () => {
  // Extract values from contexts
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { searchFlag, setSearchFlag } = useContext(SearchFlagContext);
  const { setSearchedVideoList } = useContext(VideoListContext);
  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);
  const navigate = useNavigate();
  // State variables for drawer and menu toggles
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for user menu
  // Access user and videos from Redux store
  const user = useSelector((state) => state.user.data);
  const videos = useSelector((state) => state.videos.data);
  // Toggle the state of the drawer (sidebar)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setDrawerIsOpen(!drawerIsOpen);
  };
  // Close the drawer if overlay is clicked
  const closeDrawer = (e) => {
    if (e.target.id === "drawer-overlay") {
      setIsDrawerOpen(false);
      setDrawerIsOpen(false);
    }
  };
  // Toggle the state of the user menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle user menu
  };
  // Close the user menu if overlay is clicked
  const closeMenu = (e) => {
    if (e.target.id === "menu-overlay") {
      setIsMenuOpen(false);
    }
  };
  // Function to search for videos based on search term
  const searchVideos = () => {
    const searchedVideo = videos.filter((video) => {
      if (!searchTerm || searchTerm.trim() === "") return true; // If no search term, return all videos

      // Split the search term into individual words
      const searchWords = searchTerm
        .toLowerCase()
        .split(" ")
        .filter((word) => word.trim() !== "");

      // Check if any word matches either the title, description, or uploader
      const matchesSearch = searchWords.some(
        (word) =>
          video.title?.toLowerCase().includes(word) ||
          video.description?.toLowerCase().includes(word) ||
          video.uploader?.toLowerCase().includes(word)
      );

      return matchesSearch;
    });

    // Update the video list with filtered videos
    setSearchedVideoList(searchedVideo);
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <div className="flex lg:justify-between bg-white top-0 fixed w-full z-50 h-16">
        {/* Logo and Home link */}
        <div className="flex items-center lg:w-1/3 ml-3 mr-1 md:mx-5">
          {/* Menu Button */}
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-full hover:bg-gray-200 sm:flex hidden"
          >
            <AiOutlineMenu className="mt-1 self-center text-lg xl:text-2xl font-bold" />
          </button>
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => {
                setSearchFlag(!searchFlag);
                setSearchTerm("");
              }}
              className="flex items-center text-xl lg:text-2xl mx-1"
            >
              <div className="flex items-center justify-center ml-1 pt-1 hover:text-gray-800">
                <h2 className="flex gap-1 text-2xl text-black-500 font-semi-bolder tracking-tighter scale-y-110 scale-x-85">
                  <FaYoutube className="text-3xl xl:text-4xl text-youtube-red scale-y-90 scale-x-125" />
                  <div className="md:flex hidden">YouTube</div>
                  <div className="md:flex hidden text-gray-500 text-xs self-start p-1 scale-y-90">
                    IN
                  </div>
                </h2>
              </div>
            </Link>
          </div>
        </div>
        {/* Search bar for the home page */}
        <div className="flex w-auto md:w-4/5 md:justify-center md:gap-x-4 mx-2 md:mx-10">
          <div className="flex items-center rounded-full shadow-sm lg:w-full self-center">
            <input
              className=" md:flex-grow rounded-l-full py-2  px-3 md:px-6 text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-8 lg:h-10"
              type="text"
              name="task"
              value={searchTerm}
              id="task"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-gray-50 md:p-3 rounded-r-full h-8 lg:h-10  w-8 md:w-18 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
              onClick={searchVideos}
            >
              <CiSearch className="text-black text-base lg:text-2xl" />
            </button>
          </div>
          <div className="w-9 lg:w-12 h-9 lg:h-11 md:flex hidden self-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
            <IoMdMic className="text-2xl self-center text-black" />
          </div>
        </div>
        <div className="flex w-1/3 justify-end">
          <div
            className="py-2 px-4 lg:flex self-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full 
              hidden "
          >
            {" "}
            {/* Hides on devices >= 768px */} {/* Create Button */}
            <BsPlusLg className="text-2xl self-center text-black" />
            <span className="font-semibold">Create</span>
          </div>
          <div
            className="w-11 h-11 mr-3 ml-2 lg:flex self-center justify-center hover:bg-gray-200 rounded-full 
              hidden"
          >
            {" "}
            {/* Hides on devices >= 768px */} {/* Notification Bell */}
            <GoBell className="text-2xl self-center text-black" />
          </div>
          {/* User Menu or Sign in Button */}
          <div className="mr-3 md:mr-7 self-center">
            {user === null ? (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="flex w-full items-center md:border border-gray-300 rounded-full h-10 mr-7 self-center md:hover:bg-blue-100"
                >
                  <div className="flex p-2 gap-1">
                    <RiAccountCircleLine className="self-center text-blue-600 text-2xl md:text-xl lg:text-3xl" />
                    <span className="text-blue-600 hidden md:flex self-center font-semibold lg:text-lg">
                      Sign in
                    </span>
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* MenuBar Component for signed-in users */}
                <MenuBar
                  isMenuOpen={isMenuOpen}
                  toggleMenu={toggleMenu}
                  closeMenu={closeMenu}
                  user={user}
                  setIsMenuOpen={setIsMenuOpen}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/* Sidebar Drawer */}
      <SidebarDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        closeDrawer={closeDrawer}
      />
    </>
  );
};

export default Header;
