/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import EditVideo from "./EditVideo";
import { formatSubscribers$Views } from "../utils/formater";
import { timeAgo } from "../utils/formater";
import { MdOutlineFlag, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { clearUserInfo } from "../utils/userSlice";

const Channel = () => {
  const channelId = useParams();
  const user = useSelector((state) => state.user.data);
  const [channelVideos, setChannelVideos] = useState([]);
  const [visibleDropdown, setVisibleDropdown] = useState(null); // State to track which dropdown is visible
  const [channelData, setChannelData] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideo = async () => {
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/videos/channel/${channelId.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setChannelVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        dispatch(clearUserInfo());
        navigate("/");
      }
    };

    const fetchChannel = async () => {
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/channels/${channelId.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setChannelData(response.data);
      } catch (err) {
        console.error("Error fetching channel data:", err);
        dispatch(clearUserInfo());
        navigate("/");
      }
    };

    if (user?.token && channelId.id) {
      fetchVideo();
      fetchChannel();
    }
  }, [user?.token, channelId, updateFlag]);

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  const handleSaveEdit = async () => {
    const token = user?.token;
    try {
      const response = await axios.put(
        `http://localhost:5100/videos/${editVideo.videoId}`,
        editVideo,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      setShowEditDialog(false);
      setUpdateFlag(!updateFlag);
    } catch (err) {
      console.error("Error updating video:", err);
      dispatch(clearUserInfo());
      navigate("/");
    }
  };

  const toggleDropdown = (videoId) => {
    setVisibleDropdown((prev) => (prev === videoId ? null : videoId));
  };

  const handleEditClick = (video) => {
    setVisibleDropdown(null); // Close dropdown when editing
    setEditVideo(video);
    setShowEditDialog(true);
  };

  const handleDelete = async (videoId) => {
    setVisibleDropdown(null); // Close dropdown when deleting
    const token = user?.token;
    try {
      await axios.delete(`http://localhost:5100/videos/${videoId}`, {
        headers: {
          Authorization: token,
        },
      });
      setUpdateFlag(!updateFlag);
    } catch (err) {
      console.error("Error deleting video:", err);
      dispatch(clearUserInfo());
      navigate("/");
    }
  };

  return (
    <>
      {/* Channel Header */}
      <div className="channel-header m-2 md:ml-10 lg:ml-36 mt-16 md:mt-20 lg:mt-16 md:mr-10 lg:mr-20 mb-3 overflow-hidden">
        {channelData ? (
          <div>
            {/* Banner */}
            <img
              className="channel-banner h-20 md:h-auto rounded-lg md:rounded-2xl w-full"
              src={channelData.channelBanner}
              alt="Channel Banner"
            />
            {/* Channel Info */}
            <div className="flex items-start mt-2 md:mt-4 gap-2 md:gap-4 md:p-4">
              <img
                src={channelData.channelLogo}
                alt={channelData.channelName}
                className="w-20 h-20 md:w-44 md:h-44 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="flex gap-2 text-xl md:text-4xl font-bold">
                  {channelData.channelName}
                  <FaCheckCircle className="text-xs md:text-sm self-center" />
                </h2>
                <div className="flex flex-col md:flex-row font-medium mt-1 md:mt-3 text-gray-500">
                  <span className="text-black">@{channelData.handle}</span>
                  <LuDot className="self-center hidden md:flex" />
                  <div className="flex">
                    <span>
                      {formatSubscribers$Views(channelData.subscribers)}{" "}
                      subscribers
                    </span>
                    <LuDot className="self-center" />
                    <span>{channelVideos.length} videos</span>
                  </div>
                </div>
                <p className="mt-2 hidden md:flex text-justify text-gray-700">
                  {channelData.description}
                </p>
                <div className="hidden md:flex gap-2 mt-3">
                  <button className="px-5 py-2 bg-black hover:bg-slate-800 text-white font-medium rounded-full shadow-sm transition">
                    <span>Subscribe</span>
                  </button>
                  <button className="gap-2 px-4 py-2 border border-gray-200  hover:bg-gray-100 text-black font-medium rounded-full">
                    <span>Join</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 md:hidden text-xs mx-3 text-justify text-gray-700">
              {channelData.description}
            </div>
            <button className="px-5 py-2 w-full bg-black text-lg mt-2 hover:bg-slate-800 text-white font-medium rounded-full shadow-sm transition flex justify-center md:hidden">
              <span>Subscribe</span>
            </button>
          </div>
        ) : (
          <p>Loading channel information...</p>
        )}
      </div>
      {/* Navigation Bar */}
      <div className="channel-navigation sticky top-[60px] md:top-[65px] lg:top-[60px] z-10 bg-white flex justify-start ml-2 md:ml-10 lg:ml-20 mt-3 mb-6 text-gray-600 text-lg font-medium border-b-2 border-gray-200">
        <button className="md:ml-8 lg:ml-16 px-2 mx-1 md:mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Home
        </button>
        <button className="px-2 mx-1 md:mx-2 pb-2 text-black border-b-2 border-black">
          Videos
        </button>
        <button className="px-2 mx-1 md:mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Shorts
        </button>
        <button className="px-2 mx-2 hidden md:flex pb-2 border-b-2 border-white hover:border-gray-400">
          Courses
        </button>
        <button className="px-2 mx-2 hidden md:flex pb-2 border-b-2 border-white hover:border-gray-400">
          Playlists
        </button>
        <button className="px-2 mx-1 md:mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Community
        </button>
        <button className="px-4 pb-2 hidden md:flex">
          <CiSearch className="text-3xl" />
        </button>
      </div>

      {/* Channel Videos */}
      <div className="flex flex-wrap m-2 md:ml-10 lg:ml-36 md:mr-10 lg:mr-16 justify-start mb-20 lg:mb-16 gap-3 md:gap-5 lg:gap-10">
        {channelVideos?.map((video) => (
          <div
            key={video._id}
            className="bg-white flex md:flex-col w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]"
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="md:w-full w-40 h-24  md:h-56 rounded-xl cursor-pointer"
              onClick={() => handleVideoClick(video.videoId)}
            />
            <div className="px-2 md:px-1 py-2">
              <div className="flex gap-4">
                <img
                  src={video.channelLogo}
                  alt={video.uploader}
                  className="w-10 h-10 my-1 hidden md:flex rounded-full"
                />
                <div className="flex-1">
                  <h3
                    onClick={() => handleVideoClick(video.videoId)}
                    className="font-semibold text-base md:text-lg line-clamp-2 cursor-pointer"
                  >
                    {video.title}
                  </h3>
                  <div className="flex mt-2 text-gray-600 text-xs md:text-sm">
                    <span>{formatSubscribers$Views(video.views)} views</span>
                    <LuDot className="self-center" />
                    <span>{timeAgo(video.uploadDate)}</span>
                  </div>
                </div>
                <div className="relative">
                  <BsThreeDotsVertical
                    className="ml-auto text-xl my-2 cursor-pointer"
                    onClick={() => toggleDropdown(video._id)} // Toggle dropdown visibility
                  />
                  {user.channelId === channelId.id ? (
                    <>
                      {visibleDropdown === video._id && (
                        <div className="absolute right-4 top-2 bg-white shadow-lg border border-gray-300 rounded-lg z-50">
                          <button
                            className="flex gap-2 items-center px-6 py-2 hover:bg-gray-200 w-full text-left"
                            onClick={() => handleEditClick(video)}
                          >
                            <MdOutlineModeEdit className="text-2xl" />
                            <span>Edit</span>
                          </button>
                          <button
                            className="flex gap-2 items-center px-6 py-2 hover:bg-gray-200 w-full text-left"
                            onClick={() => handleDelete(video.videoId)}
                          >
                            <RiDeleteBin6Line className="text-2xl" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {visibleDropdown === video._id && (
                        <div className="absolute right-4 top-2 bg-white shadow-md rounded-lg z-10">
                          <button className="flex gap-2 items-center px-6 py-2 hover:bg-gray-200 w-full text-left">
                            <MdOutlineFlag className="text-2xl" />
                            <span>Report</span>
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditVideo
        showEditDialog={showEditDialog}
        editVideo={editVideo}
        setEditVideo={setEditVideo}
        setShowEditDialog={setShowEditDialog}
        handleSaveEdit={handleSaveEdit}
      />
    </>
  );
};

export default Channel;
