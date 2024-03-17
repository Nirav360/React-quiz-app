import { useState } from "react";

function usePostQuestion(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (postData) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, postData };
}

export default usePostQuestion;
