import { Link, useLocation } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdHome } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { CgPlayList } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { HiFire } from "react-icons/hi";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { PiFilmSlate } from "react-icons/pi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { MdOutlineNewspaper } from "react-icons/md";
import { GoTrophy } from "react-icons/go";
import { PiGraduationCapLight } from "react-icons/pi";
import { GiHanger } from "react-icons/gi";
import { MdPodcasts } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { IoSettingsOutline } from "react-icons/io5";
import { RiFlagLine } from "react-icons/ri";
import { IoHelpCircleOutline } from "react-icons/io5";
import { MdOutlineFeedback } from "react-icons/md";
import { MdCopyright } from "react-icons/md";
import { useContext, useState } from "react";
import { SearchContext } from "../utils/SearchContext.jsx";
import { SearchFlagContext } from "../utils/SearchFlagContext.jsx";
import useFetch from "../utils/useFetch.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { searchFlag, setSearchFlag } = useContext(SearchFlagContext);
  const { data } = useFetch("https://dummyjson.com/products?limit=50");
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  };

  const closeDrawer = (e) => {
    if (e.target.id === "drawer-overlay") {
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between bg-white top-0 fixed w-full z-40 h-16">
        {/* Logo and Home link */}
        <div className="flex items-center mx-5">
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
        {location.pathname === "/" && (
          <div className="flex items-center rounded-full shadow-sm w-auto md:w-3/6 self-center">
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
              className="bg-gray-50 p-2 rounded-r-full h-10 w-16 border border-gray-300 flex items-center justify-center hover:bg-gray-200"
              onClick={searchProduct}
            >
              <CiSearch className="text-black text-2xl" />
            </button>
          </div>
        )}
        { user === null ? (<><button
          onClick={() => navigate("/signin")}
          className="flex items-center border border-gray-300 rounded-full h-10 mr-7 self-center hover:bg-blue-100"
        >
          <div className="flex p-2 gap-1">
            <RiAccountCircleLine className="self-center text-blue-600 text-3xl" />
            <div className="text-blue-600 self-center font-semibold text-lg">
              Sign in
            </div>
          </div>
        </button></>) : (<><button className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src={user.avatar}
                  />
                </button></>)}
      </div>

      {/* Drawer Overlay */}
      <div
        id="drawer-overlay"
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={closeDrawer}
      ></div>

      {/* Animated Sidebar */}
      <div
        className={`fixed top-0 left-0 w-66 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center mx-5 h-16">
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
        {/* Drawer Items */}
        {/* Home Section */}
        <div className="overflow-y-auto scrollbar-hide h-screen">
          <div className="mb-20">
            <div className="my-4">
              <ul className="mx-4">
                <li className="flex items-center text-black font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg">
                  <MdHome className="text-3xl text-black" />
                  <span className="ml-6">Home</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <SiYoutubeshorts className="text-xl text-white stroke-black stroke-2" />
                  <span className="ml-7">Shorts</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <MdOutlineSubscriptions className="text-2xl text-black" />
                  <span className="ml-6">Subscriptions</span>
                </li>
              </ul>
            </div>
            <hr className="mx-4" />
            {/* You Section */}
            <div className="m-4">
              <h2 className="flex items-center text-black font-semibold hover:bg-gray-100 px-4 py-2 rounded-lg text-lg">
                You
                <IoIosArrowForward className="text-xl text-gray-600 ml-2 self-center" />
              </h2>
              <ul>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <GoHistory className="text-2xl text-black" />
                  <span className="ml-6">History</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-1 rounded-lg">
                  <CgPlayList className="text-4xl text-black" />
                  <span className="ml-4">Playlists</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <GoVideo className="text-2xl text-black" />
                  <span className="ml-6">Your videos</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <MdOutlineWatchLater className="text-3xl text-black" />
                  <span className="ml-5">Watch Later</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <AiOutlineLike className="text-3xl text-black" />
                  <span className="ml-5">Liked videos</span>
                </li>
              </ul>
            </div>
            <hr className="mx-4" />
            <div className="mx-4 my-2">
              <h2 className="flex items-center text-black font-semibold  px-4 py-2 rounded-lg text-lg">
                Subscriptions
              </h2>
              <ul>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.ggpht.com/ytc/AIdro_nGWnCX1SjSnapRzWjpOQCG-k_v-aSZtYfjFhJzjxqSbKA=s88-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5">Samay Raina</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.ggpht.com/ytc/AIdro_kcOOmIW7xVRIyEyDfZNLz2N2QF4h2shl3NL04oS365WvA=s88-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5">Triggered Insaan</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.googleusercontent.com/XE7Iq8jvJ07ptMc-HxZR_V-2XgXCb0i06i4E_dypl7xSR655WXaQeglfqNuEeuwH3oM9RKVodQ=s160-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5">T-Series</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.googleusercontent.com/HNFsrAAIbaiUOOCuymuLCeXvJfJEkw_N_DCsl-RPMhykgwaVPgf7-Qce04IjtzqOO8O-5LYuOQ=s160-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5">Internshala</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.googleusercontent.com/EXprkFw6nOZgxD2Qf3mPCO3StHkyfdp6Jc8WTPQiZJl13lOmRAgH4FuhTYItT36Pw6-6IEAtnA=s160-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5 line-clamp-1">
                    Programming with Mosh
                  </span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.googleusercontent.com/00yIYVKjmFvR7sFZXmP5aMq1u0P7ZcLfnDW27A7zRD1hTqcWLwYn0-o_5rGkK2eKfCf43ueE7Q=s160-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5">Apna College</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <img
                    className="rounded-full w-7 h-7"
                    src="https://yt3.googleusercontent.com/VLOvpKYxd_ZTrjrorHo5VkqaO0lM1Zs2Zbe-Nrfx7UkWnUGKNbpgEcDxhSjDWS4UONdtyKddLQ=s160-c-k-c0x00ffffff-no-rj"
                  />
                  <span className="ml-5 line-clamp-1">Hitesh Choudhary</span>
                </li>
                <h2 className="flex items-center text-black hover:bg-gray-100 px-3 py-2 rounded-lg">
                  <IoIosArrowDown className="text-2xl text-gray-700" />
                  <span className="ml-6">See More</span>
                </h2>
              </ul>
            </div>
            <hr className="mx-4" />
            <div className="mx-4 my-2">
              <h2 className="flex items-center text-black font-semibold  px-4 py-2 rounded-lg text-lg">
                Explore
              </h2>
              <ul>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <HiFire className="text-3xl text-black" />
                  <span className="ml-5">Trending</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <RiShoppingBag4Line className="text-3xl text-black" />
                  <span className="ml-5">Shopping</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-3 rounded-lg">
                  <IoMusicalNotesOutline className="text-2xl text-black" />
                  <span className="ml-6">Music</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <PiFilmSlate className="text-3xl text-black" />
                  <span className="ml-5">Films</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <HiOutlineStatusOnline className="text-2xl text-black" />
                  <span className="ml-6">Live</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <SiYoutubegaming className="text-2xl text-white stroke-black stroke-2" />
                  <span className="ml-6">Gaming</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <MdOutlineNewspaper className="text-2xl text-black" />
                  <span className="ml-6">News</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <GoTrophy className="text-2xl text-black" />
                  <span className="ml-6">Sport</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <PiGraduationCapLight className="text-2xl text-black" />
                  <span className="ml-6">Courses</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <GiHanger className="text-2xl text-black" />
                  <span className="ml-6">Fashion & beauty</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <MdPodcasts className="text-2xl text-black" />
                  <span className="ml-6">Podcasts</span>
                </li>
              </ul>
            </div>
            <hr className="mx-4" />
            <div className="mx-4 my-2">
              <h2 className="flex items-center text-black font-semibold  px-3 py-2 rounded-lg text-lg">
                More from YouTube
              </h2>
              <ul>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <FaYoutube className="text-2xl text-youtube-red" />
                  <span className="ml-6">Youtube Premium</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <SiYoutubestudio className="text-2xl text-youtube-red" />
                  <span className="ml-6">Youtube Studio</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <SiYoutubemusic className="text-2xl text-youtube-red" />
                  <span className="ml-6">Youtube Music</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <SiYoutubekids className="text-2xl text-youtube-red" />
                  <span className="ml-6">Youtube Kids</span>
                </li>
              </ul>
            </div>
            <hr className="mx-4" />
            <div className="mx-4 my-2">
              <ul>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <IoSettingsOutline className="text-2xl text-black" />
                  <span className="ml-6">Settings</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <RiFlagLine className="text-2xl text-black" />
                  <span className="ml-6">Report History</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <IoHelpCircleOutline className="text-2xl text-black" />
                  <span className="ml-6">Help</span>
                </li>
                <li className="flex items-center text-black hover:bg-gray-100 px-4 py-2 rounded-lg">
                  <MdOutlineFeedback className="text-2xl text-black" />
                  <span className="ml-6">Send Feedback</span>
                </li>
              </ul>
            </div>
            <hr className="mx-4" />
            <div className="mx-4 my-2">
              <p className="py-2 px-4 text-sm font-semibold text-neutral-600">About Press Copyright Contactus Creator Advertise Developers</p>
              <p className="py-2 px-4 text-sm font-semibold text-neutral-600">Terms Privacy Policy&Safety How YouTube worksTest new features</p>
              <p className="flex text-sm text-neutral-400 py-2 px-4 gap-1"><MdCopyright className="self-center"/>2024 Google LLC</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
