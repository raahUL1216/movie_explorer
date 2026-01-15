import { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/filter.css";

export default function FilterBar({ onFilter }: any) {
  const [genres, setGenres] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [directors, setDirectors] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    api.get("/genres").then(r => setGenres(r.data));
    api.get("/actors").then(r => setActors(r.data));
    api.get("/directors").then(r => setDirectors(r.data));
  }, []);

  return (
    <div className="filters">
      <select onChange={e => setFilters({ ...filters, genre_id: e.target.value })}>
        <option value="">Genre</option>
        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>

      <select onChange={e => setFilters({ ...filters, actor_id: e.target.value })}>
        <option value="">Actor</option>
        {actors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <select onChange={e => setFilters({ ...filters, director_id: e.target.value })}>
        <option value="">Director</option>
        {directors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <button onClick={() => onFilter(filters)}>Apply</button>
    </div>
  );
}
