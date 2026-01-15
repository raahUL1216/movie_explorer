import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function ActorProfile() {
  const { id } = useParams();
  const [actor, setActor] = useState<any>(null);

  useEffect(() => {
    api.get(`/actors/${id}`).then(r => setActor(r.data));
  }, [id]);

  if (!actor) return null;

  return (
    <div className="container">
      <h1>{actor.name}</h1>
      <h3>Movies</h3>
      <ul>{actor.movies.map((m:any)=><li key={m.id}>{m.title}</li>)}</ul>
    </div>
  );
}
