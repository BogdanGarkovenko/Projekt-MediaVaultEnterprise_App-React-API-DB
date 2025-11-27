// frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SkeletonMovie from "../components/SkeletonMovie";
import MovieModal from "../components/MovieModal";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { getMovies } from "../api/movies";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getMovies({});
        if (!mounted) return;
        setMovies(data || []);
        setFiltered(data || []);
      } catch (err) {
        console.error("getMovies error", err);
        setMovies([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let f = movies;
    if (search.trim() !== "") f = f.filter(m => (m.title || "").toLowerCase().includes(search.toLowerCase()));
    if (genre.trim() !== "") f = f.filter(m => (m.genre || "").toLowerCase().includes(genre.toLowerCase()));
    if (year.trim() !== "") f = f.filter(m => m.year && m.year.toString().includes(year));
    setFiltered(f);
  }, [search, genre, year, movies]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <motion.div className="glass p-4 rounded-xl mb-6 shadow-xl flex flex-col md:flex-row gap-4 md:items-center" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 w-full">
          <Search className="text-indigo-400" size={20} />
          <input className="input w-full" placeholder="Wyszukaj film..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex items-center gap-3 w-full">
          <Filter className="text-indigo-400" size={20} />
          <input className="input w-full" placeholder="Gatunek (np. Sci-Fi)" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>

        <input className="input w-full md:w-40" placeholder="Rok" value={year} onChange={(e) => setYear(e.target.value)} />
      </motion.div>

      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6" initial="hidden" animate="show">
        {loading ? Array.from({ length: 8 }).map((_, i) => <SkeletonMovie key={i} />) : filtered.map(movie => (
          <motion.div key={movie.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <MovieCard movie={movie} onSelect={setSelectedMovie} />
          </motion.div>
        ))}
      </motion.div>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}