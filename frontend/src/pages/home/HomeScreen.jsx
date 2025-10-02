import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import OptimizedImage from "../../components/OptimizedImage";
import { useState, useMemo } from "react";

const HomeScreen = () => {
  const { trendingContent, loading, error } = useGetTrendingContent();
  const { contentType } = useContentStore();

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => {
    return contentType === "movie" ? MOVIE_CATEGORIES : TV_CATEGORIES;
  }, [contentType]);

  // Memoize content details to prevent unnecessary recalculations
  const contentDetails = useMemo(() => {
    if (!trendingContent) return null;

    return {
      title: trendingContent?.title || trendingContent?.name,
      year:
        trendingContent?.release_date?.split("-")[0] ||
        trendingContent?.first_air_date?.split("-")[0],
      rating: trendingContent?.adult ? "18+" : "PG-13",
      overview:
        trendingContent?.overview?.length > 200
          ? trendingContent?.overview.slice(0, 200) + "..."
          : trendingContent?.overview,
    };
  }, [trendingContent]);

  if (loading || !trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 animate-pulse" />
      </div>
    );

  if (error)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Failed to load content</h2>
            <p className="text-red-500">Please try again later</p>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />

        <OptimizedImage
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt={`${contentDetails?.title} backdrop`}
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-40"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-30" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {contentDetails?.title}
            </h1>
            <p className="mt-2 text-lg">
              {contentDetails?.year} | {contentDetails?.rating}
            </p>
            <p className="mt-4 text-lg">{contentDetails?.overview}</p>
          </div>

          <div className="flex mt-8 gap-4">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded flex items-center transition-colors"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>

            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center transition-colors"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {categories.map((category) => (
          <MovieSlider key={category} category={category} />
        ))}
      </div>
    </>
  );
};
export default HomeScreen;
