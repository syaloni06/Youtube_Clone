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
import { API_URL } from "../utils/API_URL";

const Comment = ({ videoId }) => {
  const [comment, setComment] = useState(""); // State to manage the input for a new comment
  const [isFocused, setIsFocused] = useState(false); // State to determine if the input is focused
  const user = useSelector((state) => state.user.data); // Get user data from Redux store
  const [comments, setComments] = useState([]); // State to store the list of comments fetched from the server
  const [editingCommentId, setEditingCommentId] = useState(null); // State to track which comment is being edited
  const [editingText, setEditingText] = useState(""); // State to hold the text of the comment being edited
  const [menuVisible, setMenuVisible] = useState({}); // State to manage visibility of action menus for each comment
  const [editFlag, setEditFlag] = useState(true); // State to trigger re-fetching of comments when changes occur

  // Fetch comments whenever videoId, comment, or editFlag changes
  useEffect(() => {
    const fetchVideo = async () => {
      const token = user?.token; // Retrieve user token from Redux store
      try {
        // API call to fetch comments for the given video
        const response = await axios.get(
          `${API_URL}/videos/${videoId.id}`,
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

  // Function to handle submitting a new comment
  const handleCommentSubmit = async () => {
    if (!comment.trim()) return; // Prevent empty comments from being submitted

    try {
      // API call to add a new comment
      const response = await axios.put(
        `${API_URL}/videos/addComments/${videoId.id}`,
        {
          userId: user.userId, // User ID of the commenter
          userName: user.username, // User name of the commenter
          userAvatar: user.avatar, // Avatar of the commenter
          text: comment, // Text of the new comment
          timestamp: new Date().toISOString(), // Current timestamp
        }
      );

      if (response.status === 200) {
        setComment(""); // Clear the input field
        setIsFocused(false); // Reset focus state
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  // Function to handle initiating the editing of a comment
  const handleEdit = (commentId, text) => {
    setEditingCommentId(commentId); // Set the ID of the comment being edited
    setEditingText(text); // Set the current text of the comment to the editing state
    setMenuVisible((prev) => ({ ...prev, [commentId]: false })); // Hide the action menu
  };

  // Function to save the edited comment
  const handleSaveEdit = async (commentId) => {
    try {
      // API call to update the comment
      const response = await axios.put(
        `${API_URL}/videos/updateComments/${videoId.id}`,
        {
          commentId: commentId, // ID of the comment being updated
          text: editingText, // Updated text of the comment
          timestamp: new Date().toISOString(), // Current timestamp
        }
      );
      if (response.status === 200) {
        setEditingCommentId(null); // Clear the editing state
        setEditingText(""); // Reset the editing text
        setEditFlag(!editFlag); // Trigger re-fetching of comments
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Function to handle deleting a comment
  const handleDelete = async (commentId) => {
    try {
      // API call to delete the comment
      const response = await axios.put(
        `${API_URL}/videos/deleteComments/${videoId.id}`,
        {
          commentId: commentId, // ID of the comment to be deleted
        }
      );
      if (response.status === 200) {
        // Remove the deleted comment from the list
        setComments((prevComments) =>
          prevComments.filter((cmt) => cmt.commentId !== commentId)
        );
        setMenuVisible((prev) => ({ ...prev, [commentId]: false })); // Hide the action menu
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <>
      {/* Comments Header */}
      <div className="flex items-center mx-3 md:mx-0 pb-2">
        <div className="px-2 text-2xl font-bold">
          {comments.length} Comments {/* Display total number of comments */}
        </div>
        <div className="flex items-center ml-8">
          <MdOutlineSort className="text-3xl" />
          <span className="text-sm font-semibold ml-2">Sort by</span>
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="flex py-4 md:w-full ml-3 mr-2 md:mx-0 gap-x-2 md:gap-x-4">
        <div>
          <img
            src={user.avatar} // Display the user's avatar
            alt="User Avatar"
            className="w-12 h-11 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col mr-2 md:mr-0 gap-y-2">
          <div className="relative group">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="w-full border-b border-gray-300 focus:outline-none text-sm py-1 focus:placeholder-opacity-50"
            />
            {/* Underline effect for the input when focused */}
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
                    setComment(""); // Clear the comment input
                    setIsFocused(false); // Close the input section
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`self-center font-semibold px-4 py-2 rounded-full ${
                    comment.trim()
                      ? "bg-blue-600 text-white" // Enable button if input is valid
                      : "bg-gray-300 text-gray-500 cursor-not-allowed" // Disable button if input is empty
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
      {/* Comments List */}
      <div className=" py-2w-full ">
        {comments.length > 0 ? (
          comments.map((cmt) => (
            <div
              key={cmt.commentId} // Unique key for each comment
              className="flex gap-x-4 ml-3 md:ml-0 py-2 md:w-full"
            >
              {/* Display user avatar */}
              <img
                src={cmt.userAvatar}
                alt={`${cmt.userName}'s avatar`}
                className="w-12 h-11 rounded-full"
              />
              <div className="flex flex-col w-full">
                {/* Header containing user name, timestamp, and menu options */}
                <div className="flex gap-1 justify-between items-center">
                  <div>
                    {/* Display user name */}
                    <span className="font-semibold text-sm">
                      @{cmt.userName}
                    </span>
                    {/* Display time ago for the comment */}
                    <span className="text-sm self-center px-2 text-gray-500">
                      {timeAgo(cmt.timestamp)}
                    </span>
                  </div>
                  {/* Menu for actions like edit, delete, or report */}
                  <div className="relative">
                    <BsThreeDotsVertical
                      className="cursor-pointer mx-3 md:mx-0"
                      onClick={() =>
                        setMenuVisible((prev) => ({
                          ...prev,
                          [cmt.commentId]: !prev[cmt.commentId],
                        }))
                      }
                    />
                    {/* Menu options for the owner of the comment */}
                    {cmt.userId === user.userId ? (
                      <>
                        {menuVisible[cmt.commentId] && (
                          <div className="absolute shadow-lg rounded-lg right-0 bg-white z-50">
                            {/* Edit button */}
                            <button
                              className="flex items-center mt-2 gap-2 px-8 py-2 text-base hover:bg-gray-200 w-full"
                              onClick={() =>
                                handleEdit(cmt.commentId, cmt.text)
                              }
                            >
                              <MdOutlineModeEdit className="text-2xl" /> Edit
                            </button>
                            {/* Delete button */}
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
                        {/* Menu option for reporting a comment */}
                        {menuVisible[cmt.commentId] && (
                          <div className="absolute shadow-lg rounded-lg right-0 bg-white z-50">
                            <button
                              className="flex items-center gap-2 px-8 py-2 mb-2 text-base hover:bg-gray-200 w-full"
                              onClick={() =>
                                setMenuVisible((prev) => ({
                                  ...prev,
                                  [cmt.commentId]: false,
                                }))
                              }
                            >
                              <MdOutlineFlag className="text-2xl" />
                              Report
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* If the comment is being edited */}
                {editingCommentId === cmt.commentId ? (
                  <div className="flex flex-col gap-2 mr-6 md:mr-0">
                    {/* Input for editing the comment */}
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
                        {/* Save button for editing */}
                        <button
                          className={`px-4 py-2 rounded-full font-semibold ${
                            editingText.trim() === cmt.text.trim()
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-blue-600 text-white"
                          }`}
                          onClick={() => handleSaveEdit(cmt.commentId)}
                          disabled={editingText.trim() === cmt.text.trim()} // Disable button if no changes
                        >
                          Save
                        </button>
                        {/* Cancel button for editing */}
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
                    {/* Display the comment text */}
                    <p className="text-xs md:text-sm break-words max-w-full text-justify mr-8">
                      {cmt.text}
                    </p>
                    {/* Buttons for Like, Dislike, and Reply */}
                    <div className="flex gap-x-2 mt-1">
                      <button className="rounded-full hover:bg-gray-200 flex items-center">
                        <BiLike className="text-xl lg:text-2xl m-2" />
                      </button>
                      <button className="rounded-full hover:bg-gray-200 flex items-center">
                        <BiDislike className="text-xl lg:text-2xl m-2" />
                      </button>
                      <button className="rounded-full hover:bg-gray-200 flex items-center text-xs lg:text-sm font-medium px-1 lg:px-3">
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          // Message when no comments exist
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </>
  );
};

export default Comment;
