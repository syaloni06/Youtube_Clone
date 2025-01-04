import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVideoList } from "../utils/videoSlice";
import { DrawerContext } from "../utils/DrawerContext";
import { VideoListContext } from "../utils/VideoListContext";
import { SearchFlagContext } from "../utils/SearchFlagContext";
import { SearchContext } from "../utils/SearchContext";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md"; // Left arrow icon
import { formatSubscribers } from "../utils/formater";
import { timeAgo } from "../utils/formater";
const VideoList = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const { drawerIsOpen } = useContext(DrawerContext);
  const user = useSelector((state) => state.user.data);
  const videos = useSelector((state) => state.videos.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchedVideoList, setSearchedVideoList } =
    useContext(VideoListContext);
  const { searchFlag } = useContext(SearchFlagContext);
  const { searchTerm } = useContext(SearchContext);
  // UseRef hook to control scroll behavior
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [...new Set(videos.map((video) => video.category))];
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        if (token !== null) {
          const response = await axios.get("http://localhost:5100/videos", {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
          });
          setSearchedVideoList(response.data);
          dispatch(setVideoList(response.data));
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchFlag, searchTerm.length === 0]);

  const handleVideoClick = (videoId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/video/${videoId}`);
  };
  const handleChannelClick = (channelId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/channel/${channelId}`);
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Check if the container is at the start or end
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const tolerance = 2; // Add a small tolerance to account for precision issues
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance);
    }
  };

  // Attach the scroll listener
  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const handleOnClick = (category) => {
    const filteredVideo = videos.filter((video) => video.category === category);
    setSearchedVideoList(filteredVideo);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSearchedVideoList(videos); // Handle "All" category separately
    } else {
      handleOnClick(category); // Handle other categories
    }
  };

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          drawerIsOpen ? "ml-40 flex flex-shrink" : "ml-0"
        }`}
      >
        {/* Categories section with scrolling functionality */}
        {user !== null && (
          <section className="p-6 sm:p-8 ml-16 mt-10 relative">
            {/* Left Arrow Button */}
            {!isAtStart && (
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 p-3 bg-white rounded-full hover:scale-110 focus:outline-none hover:bg-gray-100"
                onClick={scrollLeft}
              >
                <MdArrowBackIos className="text-xl text-gray-800" />
              </button>
            )}

            {/* List of categories with horizontal scrolling */}
            <ul
              ref={scrollRef}
              className="flex flex-nowrap gap-4 sm:gap-6 overflow-x-auto scrollbar-hide mx-6"
            >
              {/* "All" Category */}
              <li className="flex-shrink-0">
                <button
                  onClick={() => handleCategoryClick("All")}
                  className={`px-3 py-2  font-medium text-sm rounded-lg transition-transform ${
                    selectedCategory === "All"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  All
                </button>
              </li>
              {/* Other Categories */}
              {categories.map((category, index) => (
                <li key={index} className="flex-shrink-0">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`px-3 py-2 font-medium text-sm rounded-lg transition-transform ${
                      selectedCategory === category
                        ? "bg-black text-white"
                        : "bg-gray-100 text-black hover:bg-gray-200 hover:scale-105"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right Arrow Button */}
            {!isAtEnd && (
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-3 bg-white rounded-full hover:scale-110 focus:outline-none hover:bg-gray-100"
                onClick={scrollRight}
              >
                <MdOutlineArrowForwardIos className="text-xl text-gray-800" />
              </button>
            )}
          </section>
        )}

        <main className="container ml-24 pt-3 pb-6">
          {error && <p className="text-red-500">{error}</p>}

          {loading ? (
            <p className="text-center text-gray-500">Loading videos...</p>
          ) : searchedVideoList.length > 0 ? (
            <div className="flex flex-wrap justify-evenly gap-y-10">
              {searchedVideoList.map((video) => (
                <div
                  key={video._id}
                  className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]"
                  // Handle click event to navigate
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-56 rounded-xl cursor-pointer"
                    onClick={() => handleVideoClick(video.videoId)}
                  />
                  <div className="px-1 py-2">
                    <div className="flex gap-4">
                      <img
                        src={video.channelLogo}
                        alt={video.uploader}
                        className="w-10 h-10 my-1 rounded-full cursor-pointer"
                        onClick={() => handleChannelClick(video.channelId)}
                      />
                      <div className="flex-1">
                        <h3
                          onClick={() => handleVideoClick(video.videoId)}
                          className="font-semibold text-lg line-clamp-2 cursor-pointer"
                        >
                          {video.title}
                        </h3>
                        <span className="flex truncate text-gray-500">
                          {video.uploader}
                          <FaCheckCircle className="self-center ml-1 text-xs text-zinc-500" />
                        </span>
                        <div className="text-gray-600 text-sm">
                          {formatSubscribers(video.views)} views •{" "}
                          {timeAgo(video.uploadDate)}
                        </div>
                      </div>
                      <BsThreeDotsVertical className="ml-auto text-xl my-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No videos available.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default VideoList;
