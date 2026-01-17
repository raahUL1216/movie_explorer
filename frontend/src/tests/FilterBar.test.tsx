import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import FilterBar from "../components/FilterBar";

describe("FilterBar", () => {
  const mockOnFilter = vi.fn() as Mock;
  const mockOnReady = vi.fn() as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers(); // Needed to handle the 500ms debounce precisely
  });

  it("calls onReady on mount", () => {
    render(<FilterBar onFilter={mockOnFilter} onReady={mockOnReady} />);
    expect(mockOnReady).toHaveBeenCalledTimes(1);
  });

  it("updates search value and triggers onFilter after debounce", async () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    const input = screen.getByPlaceholderText(/Search by movie name/i) as HTMLInputElement;
    
    // Simulate typing
    fireEvent.change(input, { target: { value: "Inception" } });
    expect(input.value).toBe("Inception");

    // Fast-forward time by 500ms
    vi.advanceTimersByTime(500);

    expect(mockOnFilter).toHaveBeenCalledWith("Inception");
  });

  it("clears search text and calls onFilter when clear icon is clicked", () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    const input = screen.getByPlaceholderText(/Search by movie name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Tenet" } });
    
    // Find the clear icon by its aria-label
    // Note: Since it's an SVG, we target via aria-label provided in your HTML
    const clearBtn = screen.getByLabelText("Clear search");
    
    fireEvent.click(clearBtn);

    expect(input.value).toBe("");
    expect(mockOnFilter).toHaveBeenCalledWith(undefined);
  });

  it("trims whitespace from search term", () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    
    const input = screen.getByPlaceholderText(/Search by movie name/i);
    fireEvent.change(input, { target: { value: "  Batman  " } });

    vi.advanceTimersByTime(500);

    expect(mockOnFilter).toHaveBeenCalledWith("Batman");
  });
});