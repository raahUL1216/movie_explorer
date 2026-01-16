import { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/filter.css";

export default function FilterBar({ onFilter, onReady }: any) {
  const [genres, setGenres] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [directors, setDirectors] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

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
        console.error("Metadata load failed", err);
      } finally {
        onReady();
      }
    }
    loadMetadata();
  }, [onReady]);

  return (
    <div className="filters">
      <select onChange={e => setFilters({ ...filters, genre_id: e.target.value })}>
        <option value="">Select Genre</option>
        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>

      <select onChange={e => setFilters({ ...filters, actor_id: e.target.value })}>
        <option value="">Select Actor</option>
        {actors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <select onChange={e => setFilters({ ...filters, director_id: e.target.value })}>
        <option value="">Select Director</option>
        {directors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <button onClick={() => onFilter(filters)}>Apply</button>
    </div>
  );
}