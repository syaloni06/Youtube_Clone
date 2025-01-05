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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { drawerIsOpen } = useContext(DrawerContext);
  const user = useSelector((state) => state.user.data);
  const videos = useSelector((state) => state.videos.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchedVideoList, setSearchedVideoList } =
    useContext(VideoListContext);
  const { searchFlag } = useContext(SearchFlagContext);
  const { searchTerm } = useContext(SearchContext);
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
          setError(null);
        }
      } catch (err) {
        console.error(err);
        dispatch(clearUserInfo());
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, searchFlag, searchTerm.length === 0]);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSearchedVideoList(videos);
    } else {
      const filteredVideos = videos.filter(
        (video) => video.category === category
      );
      setSearchedVideoList(filteredVideos);
    }
  };

  return (
    <>
      <div
        className={`transition-all duration-300 ${
          drawerIsOpen ? "lg:ml-40 flex flex-shrink" : "ml-0"
        }`}
      >
        <div className="flex flex-col">
          <div className={`${
              drawerIsOpen ? " w-[86vw]" : "w-full"
            }`}>
          {user !== null && (
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          )}
          </div>
          
          <div
            className={`container lg:ml-24 pt-3 mb-20 pb-6 ${
              drawerIsOpen ? " w-[80vw]" : "w-full"
            }`}
          >
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <p className="text-center text-gray-500">Loading videos...</p>
            ) : searchedVideoList.length > 0 ? (
              <div
                className={`flex overflow-hidden flex-wrap justify-evenly gap-y-10`}
              >
                {searchedVideoList.map((video) => (
                  <div
                    key={video._id}
                    className={`bg-white overflow-hidden sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]`}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-56 md:rounded-xl cursor-pointer"
                      onClick={() => handleVideoClick(video.videoId)}
                    />
                    <div className="px-1 py-2">
                      <div className="flex gap-2 lg:gap-4">
                        <img
                          src={video.channelLogo}
                          alt={video.uploader}
                          className="w-7 lg:w-10 h-7 lg:h-10 my-1 rounded-full cursor-pointer"
                          onClick={() => handleChannelClick(video.channelId)}
                        />
                        <div className="flex-1">
                          <div className="flex gap-1 justify-between">
                            <h3
                              onClick={() => handleVideoClick(video.videoId)}
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
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoList;
