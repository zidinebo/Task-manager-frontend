import { useEffect, useState } from "react";

// This is custom hook to fetch data from a provided URL inside a container called baseURL in app.jsx
export const useFetch = (url) => {
  const [data, setData] = useState(null); // State to show the fetched data, initially null.

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect hok to perform side effects (data fetching in this case)
  useEffect(() => {
    const getData = async () => {
      // Async function to fetch data
      const response = await fetch(url); // Fetch data from the provided URL
      const jData = await response.json(); // Parse response JSON data and keep inside jData

      setData(jData.tasks ? jData.tasks : jData.task); // Update the [data] state that was formally null with setData..... Updating data with fetched data.
      setLoading(false);
      console.log(jData);
    };

    setTimeout(async () => {
      try {
        await getData(); // Envoke the getData function
      } catch (error) {
        console.log(error);
        setError("Ooops Something Went Wrong");
        setLoading(false);
      }
    }, 3000);
  }, []);

  return { data, setData, loading, error }; // Return an object containing data
};
