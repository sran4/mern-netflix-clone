import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useApiCache = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const {
    dependencies = [],
    cacheTime = CACHE_DURATION,
    enabled = true,
  } = options;

  useEffect(() => {
    if (!enabled || !url) {
      setLoading(false);
      return;
    }

    // Check cache first
    const cacheKey = `${url}_${JSON.stringify(dependencies)}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < cacheTime) {
      setData(cachedData.data);
      setLoading(false);
      setError(null);
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(url, {
          signal: abortControllerRef.current.signal,
          ...options.axiosConfig,
        });

        const responseData = response.data;

        // Cache the data
        cache.set(cacheKey, {
          data: responseData,
          timestamp: Date.now(),
        });

        setData(responseData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, ...dependencies, enabled, cacheTime]);

  // Clear cache function
  const clearCache = () => {
    cache.clear();
  };

  // Clear specific cache entry
  const clearCacheEntry = (cacheKey) => {
    cache.delete(cacheKey);
  };

  return { data, loading, error, clearCache, clearCacheEntry };
};

export default useApiCache;
