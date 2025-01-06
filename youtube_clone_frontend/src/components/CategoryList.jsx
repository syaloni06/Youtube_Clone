/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

// CategoryList component: A horizontally scrollable list of categories with left and right navigation arrows
const CategoryList = ({
  categories, // Array of category names to display
  selectedCategory, // Currently selected category
  handleCategoryClick, // Callback function when a category is clicked
}) => {
  const scrollRef = useRef(null); // Ref for the scrollable container
  const [isAtStart, setIsAtStart] = useState(true); // State to track if the container is scrolled to the start
  const [isAtEnd, setIsAtEnd] = useState(false); // State to track if the container is scrolled to the end

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Function to check if the scrollable container is at the start or end
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const tolerance = 2; // Tolerance to handle floating-point precision issues
      setIsAtStart(scrollLeft <= 0); // True if scrolled to the start
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance); // True if scrolled to the end
    }
  };

  // Attach scroll listener to update `isAtStart` and `isAtEnd` when scrolling
  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Perform an initial check on mount
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", checkScrollPosition); // Cleanup listener on unmount
      }
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 lg:ml-16 mt-12 lg:mt-10 relative">
      {/* Left arrow button: Visible only if not at the start */}
      {!isAtStart && (
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full hover:scale-110 focus:outline-none hover:bg-gray-100"
          onClick={scrollLeft}
        >
          <MdArrowBackIos className="text-lg sm:text-xl text-gray-800" />
        </button>
      )}

      {/* Scrollable list of categories */}
      <ul
        ref={scrollRef}
        className="flex flex-nowrap gap-2 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide mx-4 sm:mx-6"
      >
        {/* "All" category: A special category for showing all items */}
        <li className="flex-shrink-0">
          <button
            onClick={() => handleCategoryClick("All")}
            className={`px-2 py-1 sm:px-3 sm:py-2 font-medium text-xs sm:text-sm rounded-lg transition-transform ${
              selectedCategory === "All"
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-gray-200 hover:scale-105"
            }`}
          >
            All
          </button>
        </li>
        {/* Render other categories dynamically */}
        {categories.map((category, index) => (
          <li key={index} className="flex-shrink-0">
            <button
              onClick={() => handleCategoryClick(category)}
              className={`px-2 py-1 sm:px-3 sm:py-2 font-medium text-xs sm:text-sm rounded-lg transition-transform ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200 hover:scale-105"
              }`}
            >
              {category}
            </button>
          </li>
        ))}
        {/* "Recently uploaded" category */}
        <li className="flex-shrink-0">
          <button
            onClick={() => handleCategoryClick("Recent")}
            className={`px-2 py-1 sm:px-3 sm:py-2 font-medium text-xs sm:text-sm rounded-lg transition-transform ${
              selectedCategory === "Recent"
                ? "bg-black text-white"
                : "bg-gray-100 text-black hover:bg-gray-200 hover:scale-105"
            }`}
          >
            Recently uploaded
          </button>
        </li>
      </ul>

      {/* Right arrow button: Visible only if not at the end */}
      {!isAtEnd && (
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full hover:scale-110 focus:outline-none hover:bg-gray-100"
          onClick={scrollRight}
        >
          <MdOutlineArrowForwardIos className="text-lg sm:text-xl text-gray-800" />
        </button>
      )}
    </div>
  );
};

export default CategoryList;
