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
        navigate("/signin");
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
        navigate("/signin");
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
      navigate("/signin");
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
      navigate("/signin");
    }
  };

  return (
    <>
      {/* Channel Header */}
      <div className="channel-header ml-10 lg:ml-36 mt-20 lg:mt-16 mr-10 lg:mr-20 mb-3 overflow-hidden">
        {channelData ? (
          <div>
            {/* Banner */}
            <img
              className="channel-banner h-46 rounded-2xl w-full"
              src={channelData.channelBanner}
              alt="Channel Banner"
            />
            {/* Channel Info */}
            <div className="flex items-start mt-4 gap-4 p-4">
              <img
                src={channelData.channelLogo}
                alt={channelData.channelName}
                className="w-44 h-44 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="flex  gap-2 text-4xl font-bold">
                  {channelData.channelName}
                  <FaCheckCircle className="text-sm self-center" />
                </h2>
                <div className="flex font-medium mt-3 text-gray-500">
                  <span className="text-black">@{channelData.handle}</span>
                  <LuDot className="self-center" />
                  <span>
                    {formatSubscribers$Views(channelData.subscribers)}{" "}
                    subscribers
                  </span>
                  <LuDot className="self-center" />
                  <span>{channelVideos.length} videos</span>
                </div>
                <p className="mt-2 text-gray-700">{channelData.description}</p>
                <div className="flex gap-2 mt-3">
                  <button className="px-5 py-2 bg-black hover:bg-slate-800 text-white font-medium rounded-full shadow-sm transition">
                    <span>Subscribe</span>
                  </button>
                  <button className="gap-2 px-4 py-2 border border-gray-200  hover:bg-gray-100 text-black font-medium rounded-full">
                    <span>Join</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading channel information...</p>
        )}
      </div>
      {/* Navigation Bar */}
      <div className="channel-navigation sticky top-[60px] z-10 bg-white flex justify-start ml-10 lg:ml-20 mt-3 mb-6 text-gray-600 text-lg font-medium border-b-2 border-gray-200 mr-2">
        <button className="ml-16 px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Home
        </button>
        <button className="px-2 mx-2 pb-2 text-black border-b-2 border-black">
          Videos
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Shorts
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Courses
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Playlists
        </button>
        <button className="px-2 mx-2 pb-2 border-b-2 border-white hover:border-gray-400">
          Community
        </button>
        <button className="px-4 pb-2">
          <CiSearch className="text-3xl" />
        </button>
      </div>

      {/* Channel Videos */}
      <div className="flex flex-wrap ml-10 lg:ml-36 mr-10 lg:mr-16 justify-start mb-20 lg:mb-16 gap-5 lg:gap-10">
        {channelVideos?.map((video) => (
          <div
            key={video._id}
            className="bg-white overflow-hidden w-full sm:w-[calc(100%-0.75rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(32%-0.75rem)]"
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
                  className="w-10 h-10 my-1 rounded-full"
                />
                <div className="flex-1">
                  <h3
                    onClick={() => handleVideoClick(video.videoId)}
                    className="font-semibold text-lg line-clamp-2 cursor-pointer"
                  >
                    {video.title}
                  </h3>
                  <div className="flex mt-2 text-gray-600 text-sm">
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
