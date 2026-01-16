import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Entity, MovieCardProps } from "../models/movie";
import "../styles/card.css";

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="movie-card" 
      onClick={handleCardClick} 
      style={{ cursor: "pointer" }}
    >
      <h3 className="movie-title">
        {movie.title}
        <span className="movie-year"> ({movie.release_year})</span>
      </h3>

      <p className="movie-director">
        <strong>by </strong>
        <Link 
          to={`/directors/${movie.director?.id}`} 
          onClick={handleLinkClick}
        >
          {movie.director?.name}
        </Link>
      </p>

      <p className="movie-actor">
        <strong>Cast </strong>
        {movie.actors.map((a: Entity) => (
          <span key={a?.id}>
            <Link 
              to={`/actors/${a?.id}`} 
              onClick={handleLinkClick}
            >
              {a?.name}
            </Link>
          </span>
        ))}
      </p>

      <div className="movie-genres">
        {movie.genres.map((genre: Entity) => (
          <span key={genre.id} className="genre-badge">
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
}