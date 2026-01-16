import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/profile.css";

export default function ActorProfile() {
  const { id } = useParams();
  const [actor, setActor] = useState<any>(null);

  useEffect(() => {
    api.get(`/actors/${id}`).then((r) => setActor(r.data));
  }, [id]);

  if (!actor) {
    return (
      <div className="container loading-state">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container actor-profile-wrapper">
      <header className="profile-header">
        <div className="avatar-placeholder">
          {actor.name.charAt(0)}
        </div>
        <h1>{actor.name}</h1>
        <p className="subtitle">Actor Filmography</p>
      </header>

      <section className="movie-list-section">
        <ul className="movie-grid">
          {actor.movies.map((m: any) => (
            <li key={m.id} className="movie-item">
              <Link to={`/movies/${m.id}`} className="movie-card-link">
                <span className="movie-bullet"></span>
                <span className="movie-title">{m.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}