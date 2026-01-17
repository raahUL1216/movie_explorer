import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { api } from "../api/client";
import type { Movie } from "../models/movie";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isMetadataReady, setIsMetadataReady] = useState(false);
  
  // Ref to track the current request's AbortController
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchMovies = useCallback(async (searchTerm?: string) => {
    // Cancel the previous request if it's still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new controller for this specific request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoadingMovies(true);

    try {
      const res = await api.get<Movie[]>("/movies", {
        params: searchTerm ? { searchTerm } : undefined,
        signal: controller.signal
      });
      
      setMovies(res.data);
    } catch (err: unknown) {
      // ESLint friendly: check if it's an Axios cancel error
      if (axios.isCancel(err)) {
        return; 
      }
      // Log other actual errors
      console.error("Failed to fetch movies", err);
    } finally {
      // Only hide loader if this request is still the "latest" one
      if (abortControllerRef.current === controller) {
        setIsLoadingMovies(false);
      }
    }
  }, []);

  const handleMetadataReady = useCallback(() => {
    setIsMetadataReady(true);
  }, []);

  useEffect(() => {
    fetchMovies();
    // Cleanup on unmount
    return () => abortControllerRef.current?.abort();
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
            movies.map((m) => <MovieCard key={m.id} movie={m} />)
          ) : (
            <p className="no-results">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}