import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../utils/userSlice";
import { ChannelContext } from "../utils/ChannelContext";
import { API_URL } from "../utils/API_URL";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" }); // State to hold form data
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const navigate = useNavigate(); // Hook to navigate to different pages
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
  const { setChannelHandle } = useContext(ChannelContext); // Access ChannelContext to set channel handle

  // Handles input field changes and performs real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data state

    // Real-time validation for each field
    validateField(name, value);
  };

  // Validates each individual field (email and password)
  const validateField = (name, value) => {
    const fieldErrors = { ...errors }; // Clone existing errors to prevent mutation
    // Validation logic for email and password
    switch (name) {
      case "email":
        fieldErrors.email = value.includes("@") ? "" : "Invalid email address.";
        break;
      case "password":
        fieldErrors.password =
          value.length < 6
            ? "Password must be at least 6 characters long."
            : "";
        break;
      default:
        break;
    }

    setErrors(fieldErrors); // Update the error state with any validation errors
  };

  // Validates the whole form before submission
  const validateForm = () => {
    const fieldErrors = {};
    if (!formData.email.includes("@"))
      fieldErrors.email = "Invalid email address."; // Check if email is valid
    if (formData.password.length < 6)
      fieldErrors.password = "Password must be at least 6 characters long."; // Check password length

    setErrors(fieldErrors); // Update errors state with validation results
    return Object.keys(fieldErrors).length === 0; // Returns true if no errors are found
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return; // If form is invalid, stop submission

    try {
      // Make a POST request to the backend with the form data (email and password)
      const response = await axios.post(
        `${API_URL}/login`, // Backend URL for login
        formData
      );

      if (response.status === 200) {
        setErrors({}); // Clear any previous errors
        // Extract token and user data from the response
        const { token, user } = response.data;

        // Save user info to Redux store
        dispatch(setUserInfo({ token, ...user }));

        // If user has a channelId, fetch channel data and set the channel handle
        if (user.channelId !== undefined) {
          const channelResponse = await axios.get(
            `${API_URL}/channels/${user.channelId}`, // Fetch channel details
            {
              headers: { Authorization: token }, // Include token in request header
            }
          );
          setChannelHandle(channelResponse.data.handle); // Set the channel handle in context
        }

        // Navigate to the homepage/dashboard
        navigate("/");
      } else {
        setErrors({ form: "Unexpected response from the server." }); // If response status is not 200, show error
      }
    } catch (err) {
      console.error("Error:", err); // Log error to console
      setErrors({ form: "Failed to sign in. Please try again." }); // Display error message to user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Center the form on the page */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Form container */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        {/* Display form-level errors if any */}
        {errors.form && (
          <p className="text-red-500 text-sm text-center mb-4">{errors.form}</p>
        )}
        {/* Form for sign-in */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Email input field */}
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter your email"
            />
            {/* Display email validation error if exists */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            {/* Password input field */}
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
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-400 focus:border-blue-400"
              }`}
              placeholder="Enter your password"
            />
            {/* Display password validation error if exists */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
        {/* Sign-up link */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
