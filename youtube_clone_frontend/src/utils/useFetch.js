import { useEffect, useState } from "react"; // Import hooks for managing state and side effects

const useFetch = (url) => {
  const [data, setData] = useState(null); // State to store the fetched data
  const [error, setError] = useState(null); // State to store any error encountered during fetch
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Side effect for fetching data
    const fetchData = async () => {
      try {
        const response = await fetch(url); // Make the API request
        const result = await response.json(); // Parse the JSON response
        setData(result); // Update data state with the fetched result
      } catch (err) {
        setError(err); // Set error state if the fetch fails
      } finally {
        setLoading(false); // Set loading state to false once fetch is completed
      }
    };
    fetchData(); // Call the fetchData function
  }, [url]); // Dependency array: re-fetch when the URL changes

  return { data, error, loading }; // Return the states for data, error, and loading status
};

export default useFetch; // Export the custom hook