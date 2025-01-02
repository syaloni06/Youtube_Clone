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
import useFetch from "../utils/useFetch.js";
import { useSelector } from "react-redux";
import SidebarDrawer from "./SidebarDrawer.jsx";
import MenuBar from "./Menubar.jsx";

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { searchFlag, setSearchFlag } = useContext(SearchFlagContext);
  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);
  const { data } = useFetch("https://dummyjson.com/products?limit=50");
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for user menu
  const user = useSelector((state) => state.user.data);
  console.log(user);

  const searchProduct = () => {
    const searchedProduct = data.products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.title?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesSearch;
    });
    console.log(searchedProduct);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setDrawerIsOpen(!drawerIsOpen);
  };

  const closeDrawer = (e) => {
    if (e.target.id === "drawer-overlay") {
      setIsDrawerOpen(false);
      setDrawerIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle user menu
  };

  const closeMenu = (e) => {
    if (e.target.id === "menu-overlay") {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between bg-white top-0 fixed w-full z-40 h-16">
        {/* Logo and Home link */}
        <div className="flex items-center w-1/3 mx-5">
          {/* Menu Button */}
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-full hover:bg-gray-200"
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
                  YouTube
                  <div className="text-gray-500 text-xs self-start p-1 scale-y-90">
                    IN
                  </div>
                </h2>
              </div>
            </Link>
          </div>
        </div>
        {/* Search bar for the home page */}
        <div className="flex w-4/5 justify-center gap-x-4 mx-10">
          <div className="flex items-center rounded-full shadow-sm w-full self-center">
            <input
              className="flex-grow rounded-l-full py-2 px-6 text-gray-700 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-10"
              type="text"
              name="task"
              value={searchTerm}
              id="task"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="bg-gray-50 p-3 rounded-r-full h-10 w-18 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
              onClick={searchProduct}
            >
              <CiSearch className="text-black text-2xl" />
            </button>
          </div>
          <div className="w-11 h-11 flex self-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
            <IoMdMic className="text-2xl self-center text-black" />
          </div>
        </div>
        <div className="flex w-1/3 justify-end">
          <div className="py-2 px-4 flex self-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full">
            <BsPlusLg className="text-2xl self-center text-black" />
            <span className="font-semibold">Create</span>
          </div>
          <div className="w-11 h-11 mr-3 ml-2 flex self-center justify-center hover:bg-gray-200 rounded-full">
            <GoBell className="text-2xl self-center text-black" />
          </div>
          <div className="mr-7 self-center">
            {user === null ? (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="flex w-full items-center border border-gray-300 rounded-full h-10 mr-7 self-center hover:bg-blue-100"
                >
                  <div className="flex p-2 gap-1">
                    <RiAccountCircleLine className="self-center text-blue-600 text-3xl" />
                    <span className="text-blue-600 self-center font-semibold text-lg">
                      Sign in
                    </span>
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* MenuBar Component */}
                <MenuBar
                  isMenuOpen={isMenuOpen}
                  toggleMenu={toggleMenu}
                  closeMenu={closeMenu}
                  user={user}
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
