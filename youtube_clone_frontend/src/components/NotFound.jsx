import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
const NotFound = () => {
  const error = useRouteError(); // Get the error details using useRouteError hook
  console.log(error); // Log the error details to the console for debugging

  return (
    <>
      {/* Main container for the error page */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-center items-center min-h-screen lg:mx-28 mx-6">
        {/* Error message and description section */}
        <div className="self-center">
          <div className="flex flex-col items-center gap-4">
            {/* Display error status code */}
            <p className="text-6xl font-extrabold text-gray-400">
              {error.status}
            </p>
            {/* Display error message or status text */}
            <p className="text-3xl font-bold text-gray-400">
              Page {error.statusText}
            </p>
          </div>
          {/* Error description */}
          <div className="self-center m-5 italic text-gray-300 font-bold">
            Sorry, the page you are looking for does not exist.
          </div>
          {/* Link to navigate back to the home page */}
          <Link
            to="/"
            className="flex justify-self-center gap-1 text-lg font-semibold text-blue-700 hover:underline"
          >
            Go Back to Home {/* Link text */}
            <FaHome className="self-center" /> {/* Home icon */}
          </Link>
        </div>

        {/* Image section */}
        <div>
          <img
            // Error illustration image URL
            src={
              "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1731997237~exp=1732000837~hmac=032143a1e81006d27c49a26ef591f8dc7efaa3d40b2674b70bedbf6549dafbcb&w=740"
            }
            alt="Error_Image" // Alt text for the image
            className="h-96 w-96" // Image size using Tailwind classes
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;