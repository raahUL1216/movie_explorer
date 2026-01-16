import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { DirectorProfileData, MovieSummary } from "../models/movie";
import "../styles/profile.css";

export default function DirectorProfile() {
  // Explicitly type the params ID
  const { id } = useParams<{ id: string }>();
  
  // Replace 'any' with the specific interface or null
  const [director, setDirector] = useState<DirectorProfileData | null>(null);

  useEffect(() => {
    // Provide the type to the API client for response validation
    api.get<DirectorProfileData>(`/directors/${id}`)
      .then((r) => setDirector(r.data))
      .catch((err) => console.error("Failed to load director", err));
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
          {director.movies.map((m: MovieSummary) => (
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