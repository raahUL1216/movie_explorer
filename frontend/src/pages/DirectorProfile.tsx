import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/profile.css";

export default function DirectorProfile() {
  const { id } = useParams();
  const [director, setDirector] = useState<any>(null);

  useEffect(() => {
    api.get(`/directors/${id}`).then((r) => setDirector(r.data));
  }, [id]);

  if (!director) {
    return (
      <div className="container loading-state">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container director-profile-wrapper">
      <header className="profile-header">
        <div className="avatar-placeholder">
          {director.name.charAt(0)}
        </div>
        <h1>{director.name}</h1>
        <p className="subtitle">Filmography</p>
      </header>

      <section className="movie-list-section">
        <ul className="movie-grid">
          {director.movies.map((m: any) => (
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