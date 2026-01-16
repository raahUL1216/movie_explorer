import { useEffect, useState } from "react";
import { api } from "../api/client";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isMetadataReady, setIsMetadataReady] = useState(false);

  const fetchMovies = async (filters = {}) => {
    setIsLoadingMovies(true);
    try {
      const res = await api.get("/movies", { params: filters });
      setMovies(res.data);
    } finally {
      setIsLoadingMovies(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const showLoader = isLoadingMovies || !isMetadataReady;

  return (
    <div className="container">
      <h1>🎬 Movie Explorer</h1>
      
      <FilterBar 
        onFilter={fetchMovies} 
        onReady={() => setIsMetadataReady(true)} 
      />

      <hr style={{ margin: '20px 0', opacity: 0.2 }} />

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