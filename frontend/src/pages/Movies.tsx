import { useEffect, useState } from "react";
import { api } from "../api/client";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);

  const fetchMovies = async (filters = {}) => {
    const res = await api.get("/movies", { params: filters });
    setMovies(res.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1>🎬 Movie Explorer</h1>
      <FilterBar onFilter={fetchMovies} />
      <div className="grid">
        {movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
