/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import Comment from "./Comment";
import { formatSubscribers$Views } from "../utils/formater";
import { timeAgo } from "../utils/formater";
import { clearUserInfo } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { clearVideoList } from "../utils/videoSlice";
import { VideoListContext } from "../utils/VideoListContext";

const VideoDetail = () => {
  const videoId = useParams(); // Get the videoId from the URL parameters
  const [videoData, setVideoData] = useState(null); // State to store video data
  const [error, setError] = useState(null); // State to store errors
  const [loading, setLoading] = useState(true); // State to track the loading state
  const [filteredVideo, setFilteredVideo] = useState([]); // State to store filtered videos
  const user = useSelector((state) => state.user.data); // Get user data from Redux store
  const videos = useSelector((state) => state.videos.data); // Get videos data from Redux store
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Hook for dispatching actions
  const { setSearchedVideoList } = useContext(VideoListContext);
  const handleVideoClick = (videoId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true); // Set loading state to true
      const token = user?.token; // Get the user's token for authentication
      try {
        // Fetch video details from the server using the video ID
        const response = await axios.get(
          `http://localhost:5100/videos/${videoId.id}`,
          {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
          }
        );
        setVideoData(response.data); // Store the fetched video data
        // Filter out the current video from the list of videos
        const filtervideo = videos.filter(
          (video) => video.videoId !== videoId.id
        );
        setFilteredVideo(filtervideo); // Store the filtered list of videos
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError("Failed to fetch video details. Please try again later."); // Set the error state
        dispatch(clearUserInfo()); // Clear the user data from the Redux store in case of an error
        dispatch(clearVideoList()); // Clear the video list from the Redux store
        setSearchedVideoList([]); // Reset the searched video list to an empty array (local state)
        navigate("/"); // Redirect the user to the home page
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };
    fetchVideo();
  }, [user?.token, videoId, videos]); // Dependency array ensures the effect runs when user, videoId, or videos changes

  const handleChannelClick = (channelId) => {
    // Navigate to the selected channel's page
    navigate(`/channel/${channelId}`);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row my-16 md:my-24 mx-0 md:mx-10 lg:mx-24">
        <div className="flex flex-col w-full lg:w-8/12 lg:mr-6 rounded-lg">
          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Loading State */}
          {loading ? (
            <p className="text-center text-gray-500">
              Loading video details...
            </p>
          ) : videoData ? (
            <>
              {/* Video Player */}
              <div className="relative w-full mx-auto mb-2 md:mb-4 sm:mb-2">
                <ReactPlayer
                  url={videoData.videoUrl} // Assuming `videoUrl` is the direct link to the video file
                  controls={true}
                  playing={true}
                  width="100%"
                  height="auto" // Auto height for responsiveness
                  className="rounded-none md:rounded-2xl overflow-hidden aspect-video sm:h-[200px] lg:h-[420px]"
                />
              </div>

              {/* Video Info */}
              <h1 className="text-lg md:text-2xl font-bold mx-3 md:mx-0 mb-2">
                {videoData.title}
              </h1>
              <div className="flex flex-col md:flex-row gap-y-4 mb-6 w-full">
                <div className="flex mx-3 md:w-full md:mx-0">
                  <img
                    src={videoData.channelLogo}
                    alt={videoData.uploader}
                    className="w-11 h-11 self-center rounded-full cursor-pointer"
                    onClick={() => handleChannelClick(videoData.channelId)}
                  />
                  <div className="flex flex-col ml-4 w-auto">
                    <div className="flex gap-2">
                      <p className="font-semibold text-lg line-clamp-1">
                        {videoData.uploader}
                      </p>
                      <FaCheckCircle className="text-sm self-center text-zinc-600" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-400">
                      {formatSubscribers$Views(videoData.subscribers)}{" "}
                      subscribers
                    </p>
                  </div>
                  <button className="self-center ml-4 px-3 text-xs lg:text-base lg:px-5 py-2 bg-black hover:bg-slate-800 text-white font-medium rounded-full shadow-sm transition">
                    <span>Subscribe</span>
                  </button>
                </div>
                <div className="flex justify-evenly md:justify-end w-full gap-x-2">
                  <div className="flex">
                    <div className="flex items-center my-1 gap-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-l-full cursor-pointer shadow-sm">
                      <button className="flex items-center rounded-r-none gap-2">
                        <BiSolidLike className="text-2xl" />
                        <span className="font-medium">{videoData.likes}</span>
                      </button>
                    </div>
                    <div className="h-6 w-px self-center bg-gray-300"></div>
                    <div className="flex items-center my-1 gap-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-full cursor-pointer shadow-sm">
                      <button className="flex items-center cursor-pointer">
                        <BiDislike className="text-2xl" />
                      </button>
                    </div>
                  </div>
                  <button className="flex self-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-full shadow-sm transition">
                    <PiShareFatLight className="text-2xl self-center" />
                    <span>Share</span>
                  </button>
                  <button className="flex self-center p-2 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-full shadow-sm transition">
                    <BsThreeDots className="text-2xl text-gray-800" />
                  </button>
                </div>
              </div>
              {/* Description */}
              <div className="text-black bg-gray-100 p-3 mx-3 md:mx-0 rounded-xl mb-4">
                <div className="flex gap-x-2">
                  <div className="font-semibold">
                    {formatSubscribers$Views(videoData.views)} views
                  </div>
                  <div className="font-semibold">
                    {timeAgo(videoData.uploadDate)}
                  </div>
                </div>
                {videoData.description}
              </div>
              <Comment videoId={videoId} />
              <hr className="flex lg:hidden border border-gray-200 my-6" />
            </>
          ) : (
            <p className="text-center text-gray-500">No video details found.</p>
          )}
        </div>
        {/* Suggested Videos */}
        <div className="space-y-8 md:space-y-4 lg:mr-4 w-full lg:w-5/12">
          {filteredVideo.map((video) => (
            <div
              key={video.id}
              className="flex flex-col md:flex-row gap-1 md:gap-4 items-start cursor-pointer"
              onClick={() => handleVideoClick(video.videoId)}
            >
              {/* Video Thumbnail */}
              <div className="w-full md:w-auto">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className=" w-full md:w-48 h-56 md:h-28 md:rounded-lg"
                />
              </div>
              {/* Video Info */}
              <div className="flex-1 w-full md:w-4/5">
                <div className="flex justify-between mx-2 md:mx-0">
                  <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="mt-1">
                    <button className="text-xl">
                      <BsThreeDotsVertical />
                    </button>
                  </div>
                </div>
                <div className="flex md:flex-col gap-2 md:gap-0 mx-2 md:mx-0">
                  <div className="flex text-xs md:text-sm md:w-full text-gray-500 font-medium mt-1">
                    <span className="line-clamp-1">{video.uploader}</span>
                    <FaCheckCircle className="self-center ml-1 text-xs text-zinc-500" />
                  </div>
                  <div className="flex items-end text-gray-600 truncate text-xs md:text-sm">
                    <span>{formatSubscribers$Views(video.views)} views</span>
                    <LuDot className="self-center md:text-lg" />
                    <span>{timeAgo(video.uploadDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
