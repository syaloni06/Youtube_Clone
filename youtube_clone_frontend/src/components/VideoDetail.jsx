/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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

const VideoDetail = () => {
  const videoId = useParams(); // Get the videoId from the URL
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredVideo, setFilteredVideo] = useState([]);
  const user = useSelector((state) => state.user.data);
  const videos = useSelector((state) => state.videos.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVideoClick = (videoId) => {
    // Navigate to the video detail page when a video is clicked
    navigate(`/video/${videoId}`);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/videos/${videoId.id}`,
          {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
          }
        );
        setVideoData(response.data); // Assuming the API returns a single video object
        const filtervideo = videos.filter(
          (video) => video.videoId !== videoId.id
        );
        setFilteredVideo(filtervideo);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        dispatch(clearUserInfo());
        navigate("/signin");
        setError("Failed to fetch video details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [user?.token, videoId, videos]);

  const handleChannelClick = (channelId) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row my-24 mx-5 md:mx-10 lg:mx-24">
        <div className="flex flex-col w-full lg:w-8/12 mr-6 rounded-lg">
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
              <div className="relative w-full mx-auto mb-4 sm:mb-2">
                <ReactPlayer
                  url={videoData.videoUrl} // Assuming `videoUrl` is the direct link to the video file
                  controls={true}
                  playing={true}
                  width="100%"
                  height="auto" // Auto height for responsiveness
                  className="rounded-2xl overflow-hidden aspect-video sm:h-[200px] lg:h-[420px]"
                />
              </div>

              {/* Video Info */}
              <h1 className="text-lg md:text-2xl font-bold mb-2">{videoData.title}</h1>
              <div className="flex flex-col md:flex-row gap-y-4 mb-6 w-full">
                <div className="flex">
                  <img
                    src={videoData.channelLogo}
                    alt={videoData.uploader}
                    className="w-11 h-11 self-center rounded-full cursor-pointer"
                    onClick={() => handleChannelClick(videoData.channelId)}
                  />
                  <div className="flex flex-col ml-4 w-2/3">
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
              <div className="text-black bg-gray-100 p-3 rounded-xl mb-4">
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
        <div className="space-y-4 lg:mr-4 w-full lg:w-5/12">
          {filteredVideo.map((video) => (
            <div
              key={video.id}
              className="flex gap-4 items-start cursor-pointer"
              onClick={() => handleVideoClick(video.videoId)}
            >
              {/* Video Thumbnail */}
              <div className="w-2/5 md:w-auto">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-48 h-20 md:h-28 rounded-lg"
                />
              </div>
              {/* Video Info */}
              <div className="flex-1 w-4/5">
                <h3 className="font-semibold text-sm md:text-base line-clamp-2">{video.title}</h3>
                <div className="flex text-sm w-full text-gray-500 font-medium mt-1">
                  <span className="line-clamp-1">{video.uploader}</span>
                  <FaCheckCircle className="self-center ml-1 text-xs text-zinc-500" />
                </div>
                <div className="flex text-gray-600 truncate text-xs md:text-sm">
                  <span>{formatSubscribers$Views(video.views)} views</span>
                  <LuDot className="self-center md:text-lg" />
                  <span>{timeAgo(video.uploadDate)}</span>
                </div>
              </div>
              {/* Options Icon */}
              <div className="mt-1">
                <button className="text-xl">
                  <BsThreeDotsVertical />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
