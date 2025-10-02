import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
      } catch (err) {
        console.error("Error fetching trending content:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent, loading, error };
};

export default useGetTrendingContent;
