/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BiHappyBeaming } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSort } from "react-icons/md";
import { MdOutlineFlag } from "react-icons/md";
import { timeAgo } from "../utils/formater";

const Comment = ({ videoId }) => {
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const user = useSelector((state) => state.user.data);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [menuVisible, setMenuVisible] = useState({}); // Track visibility of menu for each comment
  const [editFlag, setEditFlag] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const token = user?.token;
      try {
        const response = await axios.get(
          `http://localhost:5100/videos/${videoId.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setComments(response.data.comments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, comment, editFlag]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.put(
        `http://localhost:5100/videos/addComments/${videoId.id}`,
        {
          userId: user.userId,
          userName: user.username,
          userAvatar: user.avatar,
          text: comment,
          timestamp: new Date().toISOString(),
        }
      );

      if (response.status === 200) {
        setComment("");
        setIsFocused(false);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleEdit = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
    setMenuVisible((prev) => ({ ...prev, [commentId]: false }));
  };

  const handleSaveEdit = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:5100/videos/updateComments/${videoId.id}`,
        {
          commentId: commentId,
          text: editingText,
          timestamp: new Date().toISOString(),
        }
      );
      if (response.status === 200) {
        setEditingCommentId(null);
        setEditingText("");
        setEditFlag(!editFlag);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:5100/videos/deleteComments/${videoId.id}`,
        {
          commentId: commentId,
        }
      );
      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.filter((cmt) => cmt.commentId !== commentId)
        );
        setMenuVisible((prev) => ({ ...prev, [commentId]: false }));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      <div className="flex items-center pb-2">
        <div className="px-2 text-2xl font-bold">
          {comments.length} Comments
        </div>
        <div className="flex items-center ml-8">
          <MdOutlineSort className="text-3xl" />
          <span className="text-sm font-semibold ml-2">Sort by</span>
        </div>
      </div>
      <div className="flex py-4 w-full gap-x-4">
        <div>
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-12 h-11 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <div className="relative group">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="w-full border-b border-gray-300 focus:outline-none text-sm py-1 focus:placeholder-opacity-50"
            />
            <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-500 transform scale-x-0 origin-center transition-transform duration-300 ease-in-out group-focus-within:scale-x-100"></span>
          </div>

          {isFocused && (
            <div className="flex w-full justify-between">
              <div className="self-center rounded-full hover:bg-gray-100">
                <BiHappyBeaming className="text-3xl m-2" />
              </div>
              <div>
                <button
                  className="self-end text-black hover:bg-gray-100 px-4 py-2 rounded-full font-semibold mr-4"
                  onClick={() => {
                    setComment("");
                    setIsFocused(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`self-center font-semibold px-4 py-2 rounded-full ${
                    comment.trim()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleCommentSubmit}
                  disabled={!comment.trim()}
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" py-2 w-full">
        {comments.length > 0 ? (
          comments.map((cmt) => (
            <div key={cmt.commentId} className="flex gap-x-4 py-2 w-full">
              <img
                src={cmt.userAvatar}
                alt={`${cmt.userName}'s avatar`}
                className="w-12 h-11 rounded-full"
              />
              <div className="flex flex-col w-full">
                <div className="flex gap-1 justify-between items-center">
                  <div>
                    <span className="font-semibold text-sm">
                      @{cmt.userName}
                    </span>
                    <span className="text-sm self-center px-2 text-gray-500">
                      {timeAgo(cmt.timestamp)}
                    </span>
                  </div>
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="cursor-pointer"
                      onClick={() =>
                        setMenuVisible((prev) => ({
                          ...prev,
                          [cmt.commentId]: !prev[cmt.commentId],
                        }))
                      }
                    />
                    {cmt.userId === user.userId ? (
                      <>
                        {menuVisible[cmt.commentId] && (
                          <div className="absolute shadow-lg rounded-lg right-0 z-50">
                            <button
                              className="flex items-center mt-2 gap-2 px-8 py-2 text-base hover:bg-gray-200 w-full"
                              onClick={() =>
                                handleEdit(cmt.commentId, cmt.text)
                              }
                            >
                              <MdOutlineModeEdit className="text-2xl" /> Edit
                            </button>
                            <button
                              className="flex items-center gap-2 px-8 py-2 mb-2 text-base hover:bg-gray-200 w-full"
                              onClick={() => handleDelete(cmt.commentId)}
                            >
                              <RiDeleteBin6Line className="text-2xl" /> Delete
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {menuVisible[cmt.commentId] && (
                          <div className="absolute shadow-lg rounded-lg right-0 z-50">
                            <button
                              className="flex items-center gap-2 px-8 py-2 mb-2 text-base hover:bg-gray-200 w-full"
                              onClick={() =>
                                setMenuVisible((prev) => ({
                                  ...prev,
                                  [cmt.commentId]: false,
                                }))
                              }
                            >
                              <MdOutlineFlag className="text-2xl" /> Report
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {editingCommentId === cmt.commentId ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="border-b border-gray-300 focus:outline-none text-sm py-1"
                    />
                    <div className="flex w-full justify-between">
                      <div className="self-center rounded-full hover:bg-gray-100">
                        <BiHappyBeaming className="text-3xl m-2" />
                      </div>
                      <div>
                        <button
                          className={`px-4 py-2 rounded-full font-semibold ${
                            editingText.trim() === cmt.text.trim()
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-600 text-white"
                          }`}
                          onClick={() => handleSaveEdit(cmt.commentId)}
                          disabled={editingText.trim() === cmt.text.trim()} // Disable button if texts are equal
                        >
                          Save
                        </button>
                        <button
                          className="self-end text-black hover:bg-gray-100 px-4 py-2 rounded-full font-semibold ml-4"
                          onClick={() => setEditingCommentId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm w-full">{cmt.text}</p>
                    {/* Buttons for Like, Dislike, and Reply */}
                    <div className="flex gap-x-2 mt-1">
                      <button className="rounded-full hover:bg-gray-200 flex items-center">
                        <BiLike className="text-2xl m-2" />
                      </button>
                      <button className="rounded-full hover:bg-gray-200 flex items-center">
                        <BiDislike className="text-2xl m-2" />
                      </button>
                      <button className="rounded-full hover:bg-gray-200 flex items-center text-sm font-medium px-3">
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </>
  );
};

export default Comment;
