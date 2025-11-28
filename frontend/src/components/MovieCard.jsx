import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const nav = useNavigate();
  if (!movie) return null;

  return (
    <motion.div
      onClick={() => nav(`/movie/${movie.id}`)}
      className="relative cursor-pointer group rounded-2xl overflow-hidden bg-black/10 dark:bg-white/5 shadow-xl card-smooth"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.img
        src={movie.poster_url || "/assets/placeholder.png"}
        alt={movie.title}
        onError={(e) => (e.currentTarget.src = "/assets/placeholder.png")}
        className="w-full h-80 object-cover rounded-2xl transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
      />

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          boxShadow:
            "0 0 40px rgba(99,102,241,0.45), 0 0 60px rgba(168,85,247,0.35)",
        }}
      />

      <div className="absolute left-0 bottom-0 w-full p-4 bg-gradient-to-t from-black/85 to-transparent">
        <h3 className="text-lg font-bold text-white drop-shadow-md">{movie.title}</h3>
        <p className="text-sm text-gray-300">
          {movie.director || "—"} • {movie.year || "—"}
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-500" />
    </motion.div>
  );
}