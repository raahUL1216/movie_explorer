import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Entity, MovieFilters, FilterBarProps } from "../models/movie";
import "../styles/filter.css";

export default function FilterBar({ onFilter, onReady }: FilterBarProps) {
  const [genres, setGenres] = useState<Entity[]>([]);
  const [actors, setActors] = useState<Entity[]>([]);
  const [directors, setDirectors] = useState<Entity[]>([]);
  
  const [filters, setFilters] = useState<MovieFilters>({
    genre_id: '',
    actor_id: '',
    director_id: ''
  });

  useEffect(() => {
    async function loadMetadata() {
      try {
        const [resG, resA, resD] = await Promise.all([
          api.get<Entity[]>("/genres"),
          api.get<Entity[]>("/actors"),
          api.get<Entity[]>("/directors")
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilter(filters);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters, onFilter]);

  const handleClear = () => {
    setFilters({ genre_id: '', actor_id: '', director_id: '' });
  };

  return (
    <div className="filters">
      <select 
        id='genre-filter'
        value={filters.genre_id} 
        onChange={e => setFilters({ ...filters, genre_id: e.target.value })}
      >
        <option value="">All Genres</option>
        {genres.map(g => <option key={g.id} value={g.id.toString()}>{g.name}</option>)}
      </select>

      <select 
        id='actor-filter'
        value={filters.actor_id} 
        onChange={e => setFilters({ ...filters, actor_id: e.target.value })}
      >
        <option value="">All Actors</option>
        {actors.map(a => <option key={a.id} value={a.id.toString()}>{a.name}</option>)}
      </select>

      <select 
        id='director-filter'
        value={filters.director_id} 
        onChange={e => setFilters({ ...filters, director_id: e.target.value })}
      >
        <option value="">All Directors</option>
        {directors.map(d => <option key={d.id} value={d.id.toString()}>{d.name}</option>)}
      </select>

      <button onClick={handleClear} className="reset-btn">
        Reset
      </button>
    </div>
  );
}