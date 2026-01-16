import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../models/movie";

// Typed mock for useNavigate
const mockNavigate = vi.fn() as Mock;
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockMovie: Movie = {
  id: 1,
  title: "Inception",
  release_year: 2010,
  director: { id: 10, name: "Christopher Nolan" },
  actors: [{ id: 101, name: "Leo DiCaprio" }],
  genres: [{ id: 5, name: "Sci-Fi" }],
	reviews: [
		{
			"id": 1,
			"rating": 4,
			"comment": "Automated review for The Inception."
		}
	]
};

describe("MovieCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie details correctly", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
  });

  it("navigates to movie detail on card click", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    
    const card = screen.getByText("Inception").closest(".movie-card");
    if (card) fireEvent.click(card);
    
    expect(mockNavigate).toHaveBeenCalledWith("/movies/1");
  });

  it("prevents propagation when clicking actor links", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    
    const actorLink = screen.getByText("Leo DiCaprio");
    fireEvent.click(actorLink);
    
    expect(mockNavigate).not.toHaveBeenCalledWith("/movies/1");
  });
});