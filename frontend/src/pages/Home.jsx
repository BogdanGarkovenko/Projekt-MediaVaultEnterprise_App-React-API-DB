import { useEffect, useState } from "react";
import { getMovies } from "../api/movies";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getMovies({ search: search || undefined, sort_by: sortBy, order, limit: 50 });
      setMovies(data || []);
    } catch (err) {
      console.error("getMovies error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="fade-in">
      <div className="flex items-center gap-4 mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Szukaj filmu..." className="flex-1 input px-4 py-2 rounded-md" />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 rounded-md bg-white/5">
          <option value="title">Tytuł</option>
          <option value="year">Rok</option>
          <option value="rating">Ocena</option>
        </select>
        <select value={order} onChange={e => setOrder(e.target.value)} className="px-3 py-2 rounded-md bg-white/5">
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
        <button onClick={load} className="px-4 py-2 rounded-md bg-indigo-600">Szukaj</button>
      </div>

      {loading ? <p>Ładowanie...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </div>
  );
}