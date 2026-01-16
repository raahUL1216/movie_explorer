import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    api.get(`/movies/${id}`).then(r => setMovie(r.data));
  }, [id]);

  if (!movie) return null;

  return (
    <div className="container">
      <h1>{movie.title} ({movie.release_year})</h1>
      <p><b>Director:</b> 
        <Link to={`/directors/${movie.director?.id}`}>{movie.director?.name}
        </Link>
      </p>

      <p><b>Genres:</b> {movie.genres.map((g:any)=>g.name).join(", ")}</p>

      <h3>Cast</h3>
      <ul>
        {movie.actors.map((a: any) => (
          <li key={a.id}>
            <Link to={`/actors/${a?.id}`}>{a?.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Reviews</h3>
      {movie.reviews.map((r:any)=>(
        <p key={r.id}>⭐ {r.rating} — {r.comment}</p>
      ))}
    </div>
  );
}
