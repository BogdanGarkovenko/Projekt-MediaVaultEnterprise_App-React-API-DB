import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../api/movies";
import { motion } from "framer-motion";

export default function MoviePage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <p>Ładowanie…</p>;
  if (!movie) return <p>Nie znaleziono filmu</p>;

  return (
    <motion.div
      className="relative text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => nav(-1)}
        className="mb-6 px-4 py-2 bg-white/10 rounded hover:bg-white/20"
      >
        ⬅ Powrót
      </button>

      {/* POSTER + INFO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full rounded-2xl shadow-xl object-cover"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="md:col-span-2 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4">{movie.title}</h1>

          <p className="text-lg mb-2">
            <span className="font-bold">Reżyser:</span> {movie.director}
          </p>

          <p className="text-lg mb-2">
            <span className="font-bold">Rok:</span> {movie.year}
          </p>

          <p className="text-lg mb-6">
            <span className="font-bold">Ocena:</span> ⭐ {movie.rating}
          </p>

          <p className="text-slate-300 leading-relaxed">
            {movie.description || "Brak opisu."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}