import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUserInfo } from "../utils/userSlice"; 
import { Link } from "react-router-dom";
import { ChannelContext } from "../utils/ChannelContext";
const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
   const { setChannelHandle } = useContext(ChannelContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs (basic example)
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      // Send POST request with Axios
      const response = await axios.post(
        "http://localhost:5100/login",
        formData
      );

      if (response.status === 200) {
        setError(""); // Clear errors if successful

        // Save the token or other data to localStorage
        const { token, user } = response.data; // Assuming the response contains a token and use

        // Dispatch the user data to Redux store
        dispatch(setUserInfo({ token, ...user }));
        if(user.channelId !== undefined){
          const channelResponse = await axios.get(
            `http://localhost:5100/channels/${user.channelId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setChannelHandle(channelResponse.data.handle);
        }
        // Example: Redirect to dashboard
        navigate("/");
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link 
          to={"/signup"}
          className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
