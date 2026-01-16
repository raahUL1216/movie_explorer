import { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/filter.css";

export default function FilterBar({ onFilter, onReady }: any) {
  const [genres, setGenres] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [directors, setDirectors] = useState<any[]>([]);
  
  const [filters, setFilters] = useState({
    genre_id: '',
    actor_id: '',
    director_id: ''
  });

  // Load Metadata once
  useEffect(() => {
    async function loadMetadata() {
      try {
        const [resG, resA, resD] = await Promise.all([
          api.get("/genres"),
          api.get("/actors"),
          api.get("/directors")
        ]);
        setGenres(resG.data);
        setActors(resA.data);
        setDirectors(resD.data);
      } catch (err) {
        console.error("Failed to load filters", err);
      } finally {
        if (onReady) onReady();
      }
    }
    loadMetadata();
  }, [onReady]);

  // Debounced Filter Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilter(filters);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters, onFilter]); // onFilter is now stable from the parent

  const handleClear = () => {
    setFilters({ genre_id: '', actor_id: '', director_id: '' });
  };

  return (
    <div className="filters">
      <select 
        value={filters.genre_id} 
        onChange={e => setFilters({ ...filters, genre_id: e.target.value })}
      >
        <option value="">All Genres</option>
        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>

      <select 
        value={filters.actor_id} 
        onChange={e => setFilters({ ...filters, actor_id: e.target.value })}
      >
        <option value="">All Actors</option>
        {actors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <select 
        value={filters.director_id} 
        onChange={e => setFilters({ ...filters, director_id: e.target.value })}
      >
        <option value="">All Directors</option>
        {directors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <button onClick={handleClear} className="reset-btn">
        Reset
      </button>
    </div>
  );
}