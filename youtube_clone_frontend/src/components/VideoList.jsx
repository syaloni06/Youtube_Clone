import { useContext, useEffect, useState } from "react";
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
import { LuDot } from "react-icons/lu";
import { formatSubscribers$Views, timeAgo } from "../utils/formater";
import CategoryList from "./CategoryList"; // Import the new component
import { clearUserInfo } from "../utils/userSlice";

const VideoList = () => {
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State for loading status
  const { drawerIsOpen } = useContext(DrawerContext); // Get drawer state from context
  const user = useSelector((state) => state.user.data); // Get user data from Redux store
  const videos = useSelector((state) => state.videos.data); // Get videos list from Redux store
  const navigate = useNavigate(); // Navigate hook to redirect users
  const dispatch = useDispatch(); // Dispatch function for Redux actions
  const { searchedVideoList, setSearchedVideoList } =
    useContext(VideoListContext); // Get searched videos and setter from context
  const { searchFlag } = useContext(SearchFlagContext); // Get the search flag to determine if a search is active
  const { searchTerm } = useContext(SearchContext); // Get the search term from context
  const [selectedCategory, setSelectedCategory] = useState("All"); // State to manage selected category

  const categories = [...new Set(videos.map((video) => video.category))]; // Get unique categories from the video list

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); // Set loading state to true when fetching data
      const token = user?.token; // Get the user's token for authorization
      try {
        if (token !== null) {
          // Fetch video data from the server if the user is authenticated
          const response = await axios.get("http://localhost:5100/videos", {
            headers: {
              Authorization: token, // Pass token in the Authorization header for security
            },
          });
          setSearchedVideoList(response.data); // Set the fetched videos in the context
          dispatch(setVideoList(response.data)); // Update the Redux store with the fetched videos
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        console.error(err);
        dispatch(clearUserInfo()); // If an error occurs, clear the user data from Redux store
        navigate("/"); // Redirect the user to the home page
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchVideos(); // Call the function to fetch videos when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchFlag, searchTerm.length === 0]); // Dependency array ensures this effect runs on specific changes

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`); // Navigate to the detailed view of the selected video
  };

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`); // Navigate to the selected channel's page
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected category in the state

    if (category === "All") {
      // Show all videos if 'All' category is selected
      setSearchedVideoList(videos);
    } else if (category === "Recent") {
      // Show videos uploaded within the last week
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Calculate date for 7 days ago
      const recentVideos = videos.filter((video) => {
        const uploadTime = new Date(video.uploadDate); // Convert uploadDate to a Date object
        return uploadTime > oneWeekAgo; // Return videos uploaded within the last week
      });
      setSearchedVideoList(recentVideos); // Update the video list with recent videos
    } else {
      // Filter videos by the selected category
      const filteredVideos = videos.filter(
        (video) => video.category === category
      );
      setSearchedVideoList(filteredVideos); // Set filtered videos based on the category
    }
  };

  return (
    <>
      {searchedVideoList.length !== 0 ? (
        <>
          <div
            className={`transition-all duration-300 ${
              drawerIsOpen ? "lg:ml-40 flex flex-shrink" : "ml-0"
            }`}
          >
            <div className="flex flex-col w-full">
              <div className={`${drawerIsOpen ? " lg:w-[86vw]" : "w-full"}`}>
                {user !== null && (
                  <CategoryList
                    categories={categories} // Pass the categories to CategoryList component
                    selectedCategory={selectedCategory} // Pass selected category to CategoryList component
                    handleCategoryClick={handleCategoryClick} // Pass category click handler
                  />
                )}
              </div>

              <div
                className={`container lg:ml-24 pt-3 mb-20 pb-6 ${
                  drawerIsOpen ? " lg:w-[80vw]" : "w-full"
                }`}
              >
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* Show error message if there is an error */}
                {loading ? (
                  <p className="text-center text-gray-500">Loading videos...</p> // Show loading text while data is being fetched
                ) : searchedVideoList.length > 0 ? (
                  <div
                    className={`flex overflow-hidden flex-wrap justify-evenly gap-y-10`}
                  >
                    {/* Display each video as a card */}
                    {searchedVideoList.map((video) => (
                      <div
                        key={video._id}
                        className={`bg-white overflow-hidden sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]`}
                      >
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-56 md:rounded-xl cursor-pointer"
                          onClick={() => handleVideoClick(video.videoId)} // Navigate to video detail on click
                        />
                        <div className="px-1 py-2">
                          <div className="flex gap-2 lg:gap-4">
                            <img
                              src={video.channelLogo}
                              alt={video.uploader}
                              className="w-7 lg:w-10 h-7 lg:h-10 my-1 rounded-full cursor-pointer"
                              onClick={
                                () => handleChannelClick(video.channelId) // Navigate to channel page on click
                              }
                            />
                            <div className="flex-1">
                              <div className="flex gap-1 justify-between">
                                <h3
                                  onClick={
                                    () => handleVideoClick(video.videoId) // Navigate to video detail on click
                                  }
                                  className="font-semibold w-5/6 text-lg line-clamp-2 cursor-pointer"
                                >
                                  {video.title}
                                </h3>
                                <div>
                                  <BsThreeDotsVertical className="cursor-pointer mt-2 self-start" />
                                </div>
                              </div>
                              <div className="flex lg:flex-col">
                                <span className="flex text-xs lg:text-sm text-gray-500">
                                  {video.uploader.length > 20
                                    ? `${video.uploader.substring(0, 22)}...`
                                    : video.uploader}
                                  <FaCheckCircle className="self-center hidden lg:flex ml-1 text-xs text-zinc-600" />
                                </span>

                                <LuDot className="flex lg:hidden" />
                                <div className="flex items-center text-xs lg:text-sm lg:gap-1 text-gray-500">
                                  <span>
                                    {formatSubscribers$Views(video.views)} views
                                  </span>
                                  <LuDot />
                                  <span>{timeAgo(video.uploadDate)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    No videos found for this category.
                  </p> // Show message if no videos are found
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">
                Sign In to watch videos
              </h1>
              <p className="text-gray-600 mt-2">
                Start watching videos to help us build a feed of videos
                you&apos;ll love.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideoList;
