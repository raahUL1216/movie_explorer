import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FilterBar from "../components/FilterBar";

describe("FilterBar Component", () => {
  const mockOnFilter = vi.fn();
  const mockOnReady = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("calls onReady when the component mounts", () => {
    render(<FilterBar onFilter={mockOnFilter} onReady={mockOnReady} />);
    expect(mockOnReady).toHaveBeenCalledTimes(1);
  });

  it("updates input value on change and debounces the onFilter call", () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    const input = screen.getByLabelText(/search movies/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Inception" } });
    expect(input.value).toBe("Inception");

    // Should not be called immediately due to 500ms debounce
    expect(mockOnFilter).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockOnFilter).toHaveBeenCalledWith("Inception");
  });

  it("shows the clear icon only when search is not empty and clears input on click", () => {
    render(<FilterBar onFilter={mockOnFilter} />);
    const input = screen.getByLabelText(/search movies/i);

    expect(screen.queryByLabelText(/clear search/i)).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Interstellar" } });
    
    const clearBtn = screen.getByLabelText(/clear search/i);
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect((input as HTMLInputElement).value).toBe("");
  });
});