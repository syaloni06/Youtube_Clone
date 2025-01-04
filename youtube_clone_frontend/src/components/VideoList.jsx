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
import { FaArrowCircleLeft } from "react-icons/fa"; // Left arrow icon
import { FaArrowCircleRight } from "react-icons/fa"; // Right arrow icon

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

  const categories = [...new Set(videos.map((video) => video.category))];
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        console.log(token, "syaloni");
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
  // UseRef hook to control scroll behavior
  const scrollRef = useRef(null);

  // Scrolls the categories list to the left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300, // Scroll left by 300px
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Scrolls the categories list to the right
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300, // Scroll right by 300px
      behavior: "smooth", // Smooth scrolling
    });
  };

  const handleOnClick = (category) => {
    const filteredVideo = videos.filter((video) => video.category === category);
    setSearchedVideoList(filteredVideo);
  };
  const formatSubscribers = (subscribers) => {
    if (subscribers < 1000) {
      return `${subscribers}`;
    } else if (subscribers >= 1000 && subscribers < 1000000) {
      return `${(subscribers / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    } else if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
  };

  return (
    <>
      {/* Categories section with scrolling functionality */}
      <section className="p-6 sm:p-8 mt-8 relative">
        {/* Left Arrow Button for scrolling */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 hover:scale-110"
          onClick={scrollLeft}
        >
          <FaArrowCircleLeft className="text-2xl sm:text-3xl text-purple-800" />
        </button>

        {/* List of categories with horizontal scrolling */}
        <ul
          ref={scrollRef}
          className="flex flex-nowrap gap-4 sm:gap-6 overflow-x-auto scrollbar-hide mx-2 sm:mx-4"
        >
          <li className="flex-shrink-0">
            <button
              onClick={() => setSearchedVideoList(videos)} // Navigate to the selected category
              className="px-3 sm:px-4 py-1 sm:py-2 bg-white font-bold text-purple-800 border border-purple-800 rounded-lg shadow-md hover:bg-purple-200 focus:outline-none hover:scale-110 m-2"
            >
              All
            </button>
          </li>
          {categories.map((category, index) => (
            <li key={index} className="flex-shrink-0">
              <button
                onClick={() => handleOnClick(category)} // Navigate to the selected category
                className="px-3 sm:px-4 py-1 sm:py-2 bg-white font-bold text-purple-800 border border-purple-800 rounded-lg shadow-md hover:bg-purple-200 focus:outline-none hover:scale-110 m-2"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Arrow Button for scrolling */}
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 hover:scale-110"
          onClick={scrollRight}
        >
          <FaArrowCircleRight className="text-2xl sm:text-3xl text-purple-800" />
        </button>
      </section>

      <div
        className={`transition-all duration-300 ${
          drawerIsOpen ? "ml-40 flex flex-shrink" : "ml-0"
        }`}
      >
        <main className="container ml-24 mt-12 py-6">
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
                        <h3 onClick={() => handleVideoClick(video.videoId)} className="font-semibold text-lg line-clamp-2 cursor-pointer">
                          {video.title}
                        </h3>
                        <span className="flex truncate text-gray-500">
                          {video.uploader}
                          <FaCheckCircle className="self-center ml-1 text-xs text-zinc-500" />
                        </span>
                        <div className="text-gray-600 text-sm">
                          {formatSubscribers(video.views)} views •{" "}
                          {new Date(video.uploadDate).getDay()} days ago
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
