import { motion } from "framer-motion";

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32 }}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-white/10 dark:bg-white/5 border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.45)]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/80 hover:text-white text-2xl">
          ✖
        </button>

        <div className="flex flex-col md:flex-row gap-6 p-6">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.35 }} className="w-full md:w-72 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(99,102,241,0.45)]">
            <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover" onError={(e)=> (e.currentTarget.src="/assets/placeholder.png")} />
          </motion.div>

          <div className="flex-1 text-white">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <div className="text-sm text-gray-300 space-y-1">
              <div>🎬 Reżyser: <span className="text-gray-200">{movie.director || "—"}</span></div>
              <div>⭐ Ocena: <span className="text-gray-200">{movie.rating ?? "—"}</span></div>
              <div>📅 Rok: <span className="text-gray-200">{movie.year ?? "—"}</span></div>
              <div>🏷️ Gatunek: <span className="text-gray-200">{movie.genre || "—"}</span></div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm text-gray-400">Obsada:</h4>
              <p className="text-gray-200 leading-relaxed">{movie.cast || "Brak danych"}</p>
            </div>

            <p className="mt-4 text-gray-200 leading-relaxed">{movie.description || "Brak opisu"}</p>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-40" />
      </motion.div>
    </div>
  );
}