export interface Entity {
  id: number;
  name: string;
}

export interface MovieSummary {
  id: number;
  title: string;
}

export interface ActorProfileData extends Entity {
  movies: MovieSummary[];
}

export interface DirectorProfileData extends Entity {
  movies: MovieSummary[];
}

export interface Movie {
  id: number;
  title: string;
  release_year: number;
  director: Entity;
  genres: Entity[];
  actors: Entity[];
  reviews: Review[];
}

export interface MovieFilters {
  genre_id: string;
  actor_id: string;
  director_id: string;
}

export interface FilterBarProps {
  onFilter: (filters: MovieFilters) => void;
  onReady?: () => void;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
} 