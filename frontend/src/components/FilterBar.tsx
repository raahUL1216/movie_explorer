import { useEffect, useState } from "react";
import "../styles/filter.css";

export type FilterBarProps = {
  onFilter: (searchTerm?: string) => void;
  onReady?: () => void;
};

export default function FilterBar({ onFilter, onReady }: FilterBarProps) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onFilter(search.trim() || undefined);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search, onFilter]);

  const handleClear = () => {
    setSearch("");
    onFilter(undefined);
  };

  return (
    <div className="filters">
      <div className="search-wrapper search-input-wrapper">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="search-input-icon" tabIndex={0} data-testid="search-input-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
          </path>
        </svg>
        
        <input
          type="text"
          value={search}
          placeholder="Search by movie name, cast, director..."
          onChange={e => setSearch(e.target.value)}
          aria-label="Search movies"
          name="movieSearchText"
          className="search-input"
        />

        <svg onClick={handleClear}
          stroke="currentColor" 
          fill="currentColor" 
          strokeWidth="0" 
          viewBox="0 0 24 24" 
          className="clear-input-icon" 
          tabIndex={0} 
          aria-label="Clear search" 
          height="1em" 
          width="1em" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 10.243l6.364-6.364 1.768 1.768-6.364 6.364 6.364 6.364-1.768 1.768-6.364-6.364-6.364 6.364-1.768-1.768 6.364-6.364-6.364-6.364 1.768-1.768z">
            </path>
          </g>
        </svg>
      </div>
    </div>
  );
}
