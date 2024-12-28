import { Link, useLocation } from "react-router-dom"; // Importing Link and useLocation from react-router-dom for navigation and accessing the current route
import { FaYoutube } from "react-icons/fa"; // Importing Shopify icon
import { AiOutlineMenu } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6"; // Importing Cart icon
import { FaSearch } from "react-icons/fa"; // Importing Search icon
import { useContext } from "react"; // Importing useContext to access context data
import { SearchContext } from "../utils/SearchContext.jsx"; // Importing SearchContext for managing search term state
import { SearchFlagContext } from "../utils/SearchFlagContext.jsx"; // Importing SearchFlagContext to handle search visibility
import useFetch from "../utils/useFetch.js"; // Custom hook for fetching data

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // Accessing search term and its updater from context
  const { searchFlag, setSearchFlag } = useContext(SearchFlagContext); // Accessing search flag and its updater from context
  const { data } = useFetch("https://dummyjson.com/products?limit=50"); // Fetching product data using custom hook
  const location = useLocation(); // Getting current route location
  // Function to filter products based on the search term
  const searchProduct = () => {
    // eslint-disable-next-line no-unused-vars
    const searchedProduct = data.products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.title?.toLowerCase().includes(searchTerm.toLowerCase()) // Check if product title includes the search term
        : true; // If no search term, return all books
      return matchesSearch;
    });
    // setProductList(searchedProduct); // Update the product list with filtered products
  };
  return (
    <>
      <div className="flex justify-between bg-white top-0 fixed w-full z-50 h-16">
        {/* Logo and Home link */}
        <div className="flex items-center mx-7">
          {" "}
          {/* Removed `space-x-*` */}
          <AiOutlineMenu className="mt-1 self-center text-lg xl:text-2xl mr-1 font-bold" />{" "}
          {/* Added `mr-1` to reduce spacing */}
          <div className="flex items-center">
            <Link
              to="/"
              onClick={() => {
                setSearchFlag(!searchFlag); // Toggle search flag on logo click
                setSearchTerm(""); // Reset search term
              }}
              className="flex items-center text-xl lg:text-2xl mx-1" // Reduced `mx-1`
            >
              {/* Shopify icon */}
              <div className="flex items-center justify-center ml-1 pt-1 hover:text-gray-800">
                {" "}
                {/* Reduced `ml-1` */}
                <h2 className="flex gap-1 text-2xl text-black-500 font-semi-bolder tracking-tighter scale-y-110 scale-x-85">
                  <FaYoutube className="text-3xl xl:text-4xl text-youtube-red scale-y-90 scale-x-125" />
                  YouTube
                  <div className="text-gray-500 text-xs self-start p-1 scale-y-90">
                    IN
                  </div>
                </h2>
              </div>
            </Link>
          </div>
        </div>
        {/* Search bar for the home page */}
        {location.pathname === "/" && (
          <div className="relative w-auto md:w-3/6 self-center">
            {/* Input Field */}
            <input
              className="rounded-full p-3 h-10 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-full px-4 pr-12 shadow-sm"
              type="text"
              name="task"
              value={searchTerm}
              id="task"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Search Button */}
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100"
              onClick={searchProduct}
            >
              <FaSearch className="text-lg" />
            </button>
          </div>
        )}
        {/* Cart and other navigation links */}
        <div className="flex items-center space-x-4 sm:space-x-10 mr-4 lg:mr-8 ">
          {/* Cart link for small screens */}
          <Link to={"/cart"} className="flex sm:hidden text-lg">
            <FaCartShopping className="text-2xl" />
            {/* Cart icon */}
            {/* Display cart item count if items exist */}
            {/* {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            )} */}
          </Link>
          {/* Cart link for larger screens */}
          <div className="hidden sm:flex space-x-3 sm:space-x-6 relative">
            <Link to={"/cart"} className="text-lg sm:text-2xl hover:scale-110">
              <div className="cursor-pointer font-semibold flex items-center gap-1 relative">
                <p className="self-start">Cart</p>
                {/* Cart Icon */}
                <FaCartShopping className="self-center text-2xl" />

                {/* Cart Number */}
                {/* {cartItems.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )} */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
