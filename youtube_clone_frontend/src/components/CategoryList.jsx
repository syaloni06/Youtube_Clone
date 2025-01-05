/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";

const CategoryList = ({
  categories,
  selectedCategory,
  handleCategoryClick,
}) => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

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

  // Check if the container is at the start or end
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const tolerance = 2; // Add a small tolerance to account for precision issues
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - tolerance);
    }
  };

  // Attach the scroll listener
  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 ml-4 sm:ml-8 lg:ml-16 mt-6 sm:mt-8 lg:mt-10 relative">
      {/* Left Arrow Button */}
      {!isAtStart && (
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 sm:p-3 bg-white rounded-full hover:scale-110 focus:outline-none hover:bg-gray-100"
          onClick={scrollLeft}
        >
          <MdArrowBackIos className="text-lg sm:text-xl text-gray-800" />
        </button>
      )}

      {/* List of categories with horizontal scrolling */}
      <ul
        ref={scrollRef}
        className="flex flex-nowrap gap-2 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide mx-4 sm:mx-6"
      >
        {/* "All" Category */}
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
        {/* Other Categories */}
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
      </ul>

      {/* Right Arrow Button */}
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
