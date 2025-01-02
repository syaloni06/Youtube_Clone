/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BiHappyBeaming } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";

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
        `http://localhost:5100/videos/deleteComments/${videoId.id}`,{
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
      <div className="flex py-2 px-4 w-full gap-x-4">
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

      <div className="px-4 py-2 w-full">
        {comments.length > 0 ? (
          comments.map((cmt) => (
            <div key={cmt.commentId} className="flex gap-x-4 py-2 w-full">
              <img
                src={cmt.userAvatar}
                alt={`${cmt.userName}'s avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col w-full">
                <div className="flex gap-1 justify-between items-center">
                  <div>
                    <span className="font-semibold text-sm">
                      @{cmt.userName}
                    </span>
                    <span className="text-sm self-center text-gray-500">
                      {new Date(cmt.timestamp).getDay()} days ago
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
                    {menuVisible[cmt.commentId] && (
                      <div className="absolute bg-white shadow-md right-0 z-10">
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => handleEdit(cmt.commentId, cmt.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => handleDelete(cmt.commentId)}
                        >
                          Delete
                        </button>
                      </div>
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
                    <div className="flex gap-2">
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
                        className="px-4 py-2 bg-gray-300 text-black rounded-full font-semibold"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm w-full">{cmt.text}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </>
  );
};

export default Comment;
