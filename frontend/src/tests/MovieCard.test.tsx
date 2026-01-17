import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../models/movie";

// Mocking useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MovieCard Component", () => {
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

  // Ensure mocks are reset before each test to prevent cross-test interference
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie details correctly", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText("(2010)")).toBeInTheDocument();
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
    expect(screen.getByText("Leo DiCaprio")).toBeInTheDocument();
    expect(screen.getByText("Sci-Fi")).toBeInTheDocument();
  });

  it("navigates to movie details when card is clicked", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const card = screen.getByText(/Inception/i).closest(".movie-card");
    if (card) fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/movies/1");
  });

  it("prevents navigation to movie details when a nested link is clicked", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const directorLink = screen.getByText("Christopher Nolan");
    fireEvent.click(directorLink);

    // mockNavigate (the card click handler) should NOT be called 
    // because of e.stopPropagation() in the component
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});