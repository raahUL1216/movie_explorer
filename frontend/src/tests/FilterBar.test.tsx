import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import FilterBar from "../components/FilterBar";
import { api } from "../api/client";
import type { Entity } from "../models/movie";

// Mock the API client
vi.mock("../api/client", () => ({
  api: { get: vi.fn() }
}));

describe("FilterBar", () => {
  const mockOnFilter = vi.fn();
  const mockData: Entity[] = [{ id: 1, name: "Test Item" }];

  beforeEach(() => {
    vi.clearAllMocks();
    // Use the Mock type imported from vitest
    (api.get as Mock).mockResolvedValue({ data: mockData });
  });

  it("fetches metadata on mount", async () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/genres");
      expect(api.get).toHaveBeenCalledWith("/actors");
      expect(api.get).toHaveBeenCalledWith("/directors");
    });
  });

  it("triggers onFilter after debounce when selection changes", async () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    const select = await screen.findByDisplayValue("All Genres");
    fireEvent.change(select, { target: { value: "1" } });

    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalledWith(expect.objectContaining({ 
        genre_id: "1" 
      }));
    }, { timeout: 1000 });
  });

  it("resets filters when Reset is clicked", async () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    const button = screen.getByRole("button", { name: /reset/i });
    
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockOnFilter).toHaveBeenCalledWith({ 
        genre_id: '', 
        actor_id: '', 
        director_id: '' 
      });
    });
  });
});