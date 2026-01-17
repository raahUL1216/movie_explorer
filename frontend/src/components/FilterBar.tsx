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
      <input
        type="text"
        placeholder="Search by movie, actor, director or genre…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      <button onClick={handleClear} className="reset-btn">
        Reset
      </button>
    </div>
  );
}
