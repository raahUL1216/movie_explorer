import { Link } from "react-router-dom";
import "../styles/card.css";

export default function MovieCard({ movie }: any) {
  return (
    <div className="card">
      <h3>{movie.title}</h3>
      <p className="muted">{movie.release_year}</p>
      <p className="muted">{movie.director.name}</p>
      <Link to={`/movies/${movie.id}`}>View details →</Link>
    </div>
  );
}
