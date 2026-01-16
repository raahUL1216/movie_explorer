import { Link } from "react-router-dom";
import "../styles/card.css";

export default function MovieCard({ movie }: any) {
  return (
    <div className="movie-card">
      <h3 className="movie-title">
        {movie.title}
        <span className="movie-year">({movie.release_year})</span>
      </h3>

      <p className="movie-director">
        <strong>Director: </strong>
        <Link to={`/directors/${movie.director?.id}`}>
          {movie.director?.name}
        </Link>
      </p>

      <p className="movie-actor">
        <strong>Cast: </strong>
        {movie.actors.map((a: any, index: number) => (
          <span key={a?.id}>
            <Link to={`/actors/${a?.id}`}>
              {a?.name}
            </Link>
            {index < movie.actors.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>

      <div className="movie-genres">
        {movie.genres.map((genre: any) => (
          <span key={genre.id} className="genre-badge">
            {genre.name}
          </span>
        ))}
      </div>

      <Link to={`/movies/${movie.id}`}>View details →</Link>
    </div>
  );
}
