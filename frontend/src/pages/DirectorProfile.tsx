import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function DirectorProfile() {
  const { id } = useParams();
  const [director, setDirector] = useState<any>(null);

  useEffect(() => {
    api.get(`/directors/${id}`).then(r => setDirector(r.data));
  }, [id]);

  if (!director) return null;

  return (
    <div className="container">
      <h1>{director.name}</h1>
      <ul>{director.movies.map((m:any)=><li key={m.id}>{m.title}</li>)}</ul>
    </div>
  );
}
