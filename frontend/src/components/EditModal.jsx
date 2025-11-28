import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EditModal({ movie = {}, onClose, onSave }) {
  const [form, setForm] = useState({
    title: movie.title ?? "",
    studio: movie.studio ?? "",
    cast: movie.cast ?? "",
    director: movie.director ?? "",
    genre: movie.genre ?? "",
    year: movie.year ?? "",
    rating: movie.rating ?? "",
    poster_url: movie.poster_url ?? "",
    description: movie.description ?? ""
  });

  const [posterOk, setPosterOk] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({
      title: movie.title ?? "",
      studio: movie.studio ?? "",
      cast: movie.cast ?? "",
      director: movie.director ?? "",
      genre: movie.genre ?? "",
      year: movie.year ?? "",
      rating: movie.rating ?? "",
      poster_url: movie.poster_url ?? "",
      description: movie.description ?? ""
    });
    setError("");
  }, [movie]);

  useEffect(() => {
    if (!form.poster_url) { setPosterOk(true); return; }
    let mounted = true;
    const img = new Image();
    img.onload = () => mounted && setPosterOk(true);
    img.onerror = () => mounted && setPosterOk(false);
    img.src = form.poster_url;
    return () => { mounted = false; };
  }, [form.poster_url]);

  function change(k, v) { setForm(prev => ({ ...prev, [k]: v })); }

  function validateAndBuildPayload() {
    setError("");
    if (!form.title.trim()) { setError("Tytuł jest wymagany"); return null; }
    if (!form.genre?.toString().trim()) { setError("Gatunek jest wymagany"); return null; }

    const yearNum = Number(form.year);
    if (!Number.isInteger(yearNum) || yearNum <= 1800) {
      setError("Rok jest wymagany i musi być poprawną liczbą (np. 1999)");
      return null;
    }

    const ratingNum = Number(form.rating);
    if (Number.isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
      setError("Ocena jest wymagana i powinna być liczbą 0–10 (np. 8.5)");
      return null;
    }

    const payload = {
      title: form.title.trim(),
      studio: form.studio?.trim() || null,
      cast: form.cast?.trim() || null,
      director: form.director?.trim() || null,
      genre: form.genre.trim(),
      year: yearNum,
      rating: ratingNum,
      poster_url: form.poster_url?.trim() || null,
      description: form.description?.trim() || null
    };

    return payload;
  }

  async function handleSaveClick() {
    const payload = validateAndBuildPayload();
    if (!payload) return; 

    try {
      await onSave(movie.id ?? null, payload);
    } catch (e) {
      setError("Błąd zapisu filmu — sprawdź konsolę");
      console.error("EditModal save error:", e);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div initial={{scale:0.98, opacity:0}} animate={{scale:1, opacity:1}} className="bg-neutral-900 w-full max-w-3xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{movie.id ? "Edytuj film" : "Dodaj film"}</h3>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 bg-white/6 rounded">Zamknij</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <input value={form.title} onChange={(e)=>change("title", e.target.value)} placeholder="Tytuł" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.studio} onChange={(e)=>change("studio", e.target.value)} placeholder="Studio" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.cast} onChange={(e)=>change("cast", e.target.value)} placeholder="Obsada (comma)" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.director} onChange={(e)=>change("director", e.target.value)} placeholder="Reżyser" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.genre} onChange={(e)=>change("genre", e.target.value)} placeholder="Gatunek" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.year} onChange={(e)=>change("year", e.target.value)} placeholder="Rok" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.rating} onChange={(e)=>change("rating", e.target.value)} placeholder="Ocena (0–10)" className="w-full px-3 py-2 rounded bg-white/5" />
            <input value={form.poster_url} onChange={(e)=>change("poster_url", e.target.value)} placeholder="URL plakatu" className="w-full px-3 py-2 rounded bg-white/5" />
            {!posterOk && <div className="text-red-400">Nie można załadować obrazu</div>}
          </div>

          <div>
            {form.poster_url ? (
              <img src={posterOk ? form.poster_url : "/assets/placeholder.png"} alt="preview" className="w-full h-64 object-cover rounded" />
            ) : (
              <div className="w-full h-64 bg-white/6 rounded flex items-center justify-center text-slate-400">Brak plakatu</div>
            )}
            <textarea value={form.description} onChange={(e)=>change("description", e.target.value)} placeholder="Opis" className="w-full mt-3 p-3 h-28 rounded bg-white/5"></textarea>
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-400">{error}</div>}

        <div className="flex items-center gap-3 mt-4">
          <button onClick={handleSaveClick} className="px-4 py-2 rounded bg-indigo-600 text-white">{movie.id ? "Zapisz" : "Dodaj"}</button>
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-600">Anuluj</button>
        </div>
      </motion.div>
    </div>
  );
}