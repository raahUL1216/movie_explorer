import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../models/movie";

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
      id: 1,
      rating: 4,
      comment: "Automated review for The Inception."
    }
  ]
};

describe("MovieCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie title, year, and director link", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText("(2010)")).toBeInTheDocument();
    
    const directorLink = screen.getByText("Christopher Nolan");
    expect(directorLink.closest("a")).toHaveAttribute("href", "/directors/10");
  });

  it("renders all genre badges", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    const genreBadge = screen.getByText("Sci-Fi");
    expect(genreBadge).toHaveClass("genre-badge");
  });

  it("navigates to movie details when the card is clicked", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    const card = screen.getByText("Inception").closest(".movie-card");
    if (card) fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/movies/1");
  });

  it("stops propagation when clicking on a director or actor link", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    const actorLink = screen.getByText("Leo DiCaprio");
    fireEvent.click(actorLink);

    // The Link navigate happens via React Router, 
    // but the card's 'navigate' function should NOT be called.
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});