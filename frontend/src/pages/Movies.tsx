import { useEffect, useState, useCallback } from "react";
import { api } from "../api/client";
import type { Movie } from "../models/movie";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isMetadataReady, setIsMetadataReady] = useState(false);

  const fetchMovies = useCallback(async (searchTerm?: string) => {
    setIsLoadingMovies(true);

    try {
      const res = await api.get<Movie[]>("/movies", {
        params: searchTerm ? { searchTerm } : undefined
      });
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
            <p className="no-results">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}