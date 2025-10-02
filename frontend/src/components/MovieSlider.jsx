import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "./OptimizedImage";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    getContent();
  }, [contentType, category]);

  // Memoize formatted names to prevent unnecessary recalculations
  const { formattedCategoryName, formattedContentType } = useMemo(
    () => ({
      formattedCategoryName:
        category.replaceAll("_", " ")[0].toUpperCase() +
        category.replaceAll("_", " ").slice(1),
      formattedContentType: contentType === "movie" ? "Movies" : "TV Shows",
    }),
    [category, contentType]
  );

  // Memoize scroll functions to prevent unnecessary re-renders
  const scrollLeft = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, []);

  // Show loading skeleton while fetching data
  if (loading) {
    return (
      <div className="bg-black text-white relative px-5 md:px-20">
        <div className="h-8 w-64 bg-gray-800 rounded animate-pulse mb-4"></div>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="min-w-[250px]">
              <div className="h-40 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-800 rounded animate-pulse mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-black text-white relative px-5 md:px-20">
        <h2 className="mb-4 text-2xl font-bold">
          {formattedCategoryName} {formattedContentType}
        </h2>
        <div className="text-red-500">
          Failed to load content. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <OptimizedImage
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt={item.title || item.name || "Movie image"}
                className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-125"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
export default MovieSlider;
