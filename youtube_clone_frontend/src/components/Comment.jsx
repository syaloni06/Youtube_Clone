import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BiHappyBeaming } from "react-icons/bi";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Comment = ({ videoId }) => {
  const [comment, setComment] = useState(""); // State to hold the comment input
  const [isFocused, setIsFocused] = useState(false); // State to track if input is focused
  const user = useSelector((state) => state.user.data); // Redux user data
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
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
        setComments(response.data.comments); // Assuming the API returns a single video object
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
  }, [videoId, comment]);

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
        setComment(""); // Clear the input field
        setIsFocused(false); // Hide buttons
        
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <>
      <div className="flex py-2 px-4 w-full gap-x-4">
        {/* Profile Image */}
        <div>
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-12 h-11 rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          {/* Input Field */}
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

          {/* Action Buttons */}
          {isFocused && (
            <div className="flex w-full justify-between">
              <div className="self-center rounded-full hover:bg-gray-100">
                <BiHappyBeaming className="text-3xl m-2" />
              </div>
              <div>
                <button
                  className="self-end text-black hover:bg-gray-100 px-4 py-2 rounded-full font-semibold mr-4"
                  onClick={() => {
                    setComment(""); // Clear the input field
                    setIsFocused(false); // Hide buttons
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

      {/* Comments Section */}
      <div className="px-4 py-2">
        {comments.length > 0 ? (
          comments.map((cmt) => (
            <div key={cmt.commentId} className="flex gap-x-4 py-2">
              <img
                src={cmt.userAvatar}
                alt={`${cmt.userName}'s avatar`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{cmt.userName}</span>
                <span className="text-xs text-gray-500">
                  {new Date(cmt.timestamp).toLocaleString()}
                </span>
                <p className="text-sm">{cmt.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </>
  );
};

export default Comment;
