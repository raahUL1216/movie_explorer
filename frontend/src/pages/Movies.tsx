import { useEffect, useState, useCallback } from "react";
import { api } from "../api/client";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isMetadataReady, setIsMetadataReady] = useState(false);

  // Use useCallback to prevent the function from being recreated every render
  const fetchMovies = useCallback(async (filters = {}) => {
    setIsLoadingMovies(true);
    const updatedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );

    try {
      const res = await api.get("/movies", { params: updatedFilters });
      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch movies", err);
    } finally {
      setIsLoadingMovies(false);
    }
  }, []); // Empty array because api is static

  const handleMetadataReady = useCallback(() => {
    setIsMetadataReady(true);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // Now safe to include in dependencies

  const showLoader = !isMetadataReady || isLoadingMovies;

  return (
    <div className="container">
      <h1>🎬 Movie Explorer</h1>
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