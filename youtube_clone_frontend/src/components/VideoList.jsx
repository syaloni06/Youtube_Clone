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

const VideoList = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const { drawerIsOpen } = useContext(DrawerContext);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchedVideoList, setSearchedVideoList } = useContext(VideoListContext);
  const { searchFlag } = useContext(SearchFlagContext);
  const { searchTerm } = useContext(SearchContext);

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
  return (
    <>
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
                  className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)] cursor-pointer"
                  onClick={() => handleVideoClick(video.videoId)} // Handle click event to navigate
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-56 rounded-xl cursor-pointer"
                  />
                  <div className="px-1 py-2">
                    <div className="flex gap-4">
                      <img
                        src={video.channelLogo}
                        alt={video.uploader}
                        className="w-10 h-10 my-1 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg line-clamp-2">
                          {video.title}
                        </h3>
                        <span className="flex truncate text-gray-500">
                          {video.uploader}
                          <FaCheckCircle className="self-center ml-1 text-xs text-zinc-500" />
                        </span>
                        <div className="text-gray-600 text-sm">
                          {video.views.toLocaleString()} views •{" "}
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
