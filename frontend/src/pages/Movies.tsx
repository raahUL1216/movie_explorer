import { useEffect, useState, useCallback } from "react";
import { api } from "../api/client";
import type { Movie, MovieFilters } from "../models/movie";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isMetadataReady, setIsMetadataReady] = useState(false);

  const fetchMovies = useCallback(async (filters: Partial<MovieFilters> = {}) => {
    setIsLoadingMovies(true);
    
    // Filter out empty strings from query params
    const updatedFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );

    try {
      const res = await api.get<Movie[]>("/movies", { params: updatedFilters });
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    } finally {
      setIsLoadingMovies(false);
    }
  }, []);

  const handleMetadataReady = useCallback(() => {
    setIsMetadataReady(true);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const showLoader = !isMetadataReady || isLoadingMovies;

  return (
    <div className="container">
      <FilterBar 
        onFilter={fetchMovies} 
        onReady={handleMetadataReady} 
      />
      <hr style={{ margin: '20px 0', opacity: 0.1 }} />
      {showLoader ? (
        <div className="loader-wrapper">
          <div className="spinner"></div>
          <p className="loader-text">Loading...</p>
        </div>
      ) : (
        <div className="grid">
          {movies.length > 0 ? (
            movies.map(m => <MovieCard key={m.id} movie={m} />)
          ) : (
            <p className="no-results">No movies found for your selection.</p>
          )}
        </div>
      )}
    </div>
  );
}