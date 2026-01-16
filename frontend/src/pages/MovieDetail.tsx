import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/movie-detail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    api.get(`/movies/${id}`).then((r) => setMovie(r.data));
  }, [id]);

  if (!movie) {
    return (
      <div className="container loading-state">
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <div className="container movie-detail-wrapper">
      <header className="movie-header">
        <div className="movie-header-container">
          <h1>{movie.title}</h1>
          <div className="movie-badge">{movie.release_year}</div>
        </div>
        
        <div className="movie-meta">
          <p>
            <strong>Director: </strong>
            <Link className="director-link" to={`/directors/${movie.director?.id}`}>
              {movie.director?.name}
            </Link>
          </p>
          <div className="genre-tags">
            {movie.genres.map((g: any) => (
              <span key={g.id} className="genre-tag">{g.name}</span>
            ))}
          </div>
        </div>
      </header>

      <section className="detail-section">
        <h3>Cast</h3>
        <ul className="movie-grid-container">
          {movie.actors.map((a: any) => (
            <li key={a.id} className="movie-item">
              <Link to={`/actors/${a?.id}`} className="movie-card-link">
                <span className="movie-bullet"></span>
                <span className="movie-title">{a?.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h3>Reviews</h3>
        <div className="reviews-list">
          {movie.reviews.map((r: any) => (
            <div key={r.id} className="review-card">
              <div className="review-rating">
                {"⭐".repeat(r.rating)} <span className="rating-number">{r.rating}/5</span>
              </div>
              <p className="review-comment">"{r.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}