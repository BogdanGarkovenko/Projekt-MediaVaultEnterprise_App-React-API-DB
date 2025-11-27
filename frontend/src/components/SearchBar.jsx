import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  // debounce
  useEffect(() => {
    const t = setTimeout(() => onSearch(value), 300);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

      <input
        type="text"
        placeholder="Szukaj filmów..."
        className="input pl-12"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}