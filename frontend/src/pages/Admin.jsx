import { useEffect, useState, useCallback } from "react";
import { getMovies, createMovie, updateMovie, deleteMovie } from "../api/movies";
import { motion } from "framer-motion";
import { sanitize } from "../utils/sanitize";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [search, setSearch] = useState("");

  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

  const emptyForm = {
    id: null,
    title: "",
    director: "",
    year: "",
    genre: "",
    rating: "",
    cast: "",
    description: "",
    poster_url: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [posterValid, setPosterValid] = useState(true);

  // Poster validation
  useEffect(() => {
    if (!form.poster_url) {
      setPosterValid(true);
      return;
    }
    const img = new Image();
    img.onload = () => setPosterValid(true);
    img.onerror = () => setPosterValid(false);
    img.src = form.poster_url;
  }, [form.poster_url]);

  // LOAD MOVIES
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMovies({});
      setMovies(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) refresh();
  }, [authorized, refresh]);

  // SANITIZE FIX
  function sanitizeForm(obj) {
    return {
      ...obj,
      id: obj.id,
      title: sanitize(obj.title),
      director: sanitize(obj.director),
      genre: sanitize(obj.genre),
      cast: sanitize(obj.cast),
      description: sanitize(obj.description),
      poster_url: sanitize(obj.poster_url),
      year: Number(obj.year) || null,
      rating: Number(obj.rating) || null
    };
  }

  // ACTIONS
  function openEdit(m) {
    setForm({ ...m });
    setEditing(true);
  }

  function openAdd() {
    setForm(emptyForm);
    setAdding(true);
  }

  async function saveEdit() {
    const safe = sanitizeForm(form);
    await updateMovie(safe.id, safe);
    setEditing(false);
    refresh();
  }

  async function saveAdd() {
    const safe = sanitizeForm(form);
    await createMovie(safe);
    setAdding(false);
    refresh();
  }

  async function remove(id) {
    if (confirm("Na pewno usunąć film?")) {
      await deleteMovie(id);
      refresh();
    }
  }

  const filtered = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  // LOGOUT
  function logout() {
    setAuthorized(false);
    setPassword("");
    setForm(emptyForm);
    window.history.replaceState({}, document.title, "/admin");
  }

  // MODAL — NO FORM TAGS, NO ENTER SUBMIT
  function Modal({ title, onSave, onClose }) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center z-50 p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 p-6 border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl shadow-indigo-600/30"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4 text-indigo-300">{title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <input className="input" placeholder="Tytuł"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input className="input" placeholder="Reżyser"
                value={form.director}
                onChange={(e) => setForm({ ...form, director: e.target.value })}
              />
              <input className="input" placeholder="Rok"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
              <input className="input" placeholder="Ocena"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
              <input className="input" placeholder="Gatunek"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
              />
              <input className="input" placeholder="Obsada"
                value={form.cast}
                onChange={(e) => setForm({ ...form, cast: e.target.value })}
              />
              <input className="input" placeholder="URL plakatu"
                value={form.poster_url}
                onChange={(e) =>
                  setForm({ ...form, poster_url: e.target.value })
                }
              />
              {!posterValid && (
                <p className="text-red-400 text-sm">❌ Ten link nie działa</p>
              )}
            </div>

            <div className="flex items-center justify-center">
              {form.poster_url ? (
                <img
                  src={posterValid ? form.poster_url : "/error.png"}
                  className="w-48 rounded-xl shadow-lg object-cover"
                />
              ) : (
                <div className="w-48 h-72 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-gray-400">
                  Brak plakatu
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <textarea
                className="input min-h-[120px]"
                placeholder="Opis"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              disabled={!posterValid}
              onClick={onSave}
              className="btn flex-1 disabled:opacity-40"
            >
              Zapisz
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gray-600 text-white hover:scale-[1.02]"
            >
              Anuluj
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!authorized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-sm shadow-2xl shadow-indigo-600/30">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-300">
            🔐 Admin Panel
          </h2>

          <input
            type="password"
            className="input w-full text-center"
            placeholder="Hasło administratora"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="btn w-full mt-4"
            onClick={() => {
              if (password === ADMIN_PASS) setAuthorized(true);
              else alert("❌ Nieprawidłowe hasło");
            }}
          >
            Wejdź
          </button>
        </div>
      </div>
    );
  }

  // ADMIN MAIN PAGE
  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-400">
          Panel Administratora
        </h1>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              setViewMode(viewMode === "list" ? "table" : "list")
            }
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20"
          >
            {viewMode === "list" ? "📊 Tryb tabeli" : "📚 Tryb listy"}
          </button>

          <button
            type="button"
            onClick={openAdd}
            className="btn px-4 py-2"
          >
            ➕ Dodaj Film
          </button>

          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700"
          >
            🚪 Wyloguj
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        className="input w-full mb-4"
        placeholder="🔍 Szukaj filmu…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE VIEW */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl shadow-xl">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-white/10 text-indigo-300 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-3">Plakat</th>
                <th className="p-3">Tytuł</th>
                <th className="p-3">Reżyser</th>
                <th className="p-3">Rok</th>
                <th className="p-3">Ocena</th>
                <th className="p-3">Gatunek</th>
                <th className="p-3 text-center">Akcje</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => (
                <tr
                  key={m.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3">
                    <img
                      src={m.poster_url}
                      className="w-12 h-16 object-cover rounded-md shadow"
                    />
                  </td>

                  <td className="p-3 font-semibold text-gray-200">
                    {m.title}
                  </td>

                  <td className="p-3 text-gray-300">{m.director}</td>
                  <td className="p-3 text-gray-400">{m.year}</td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded-lg bg-indigo-500/30 text-indigo-300 font-bold">
                      {m.rating}
                    </span>
                  </td>

                  <td className="p-3 text-gray-300">{m.genre}</td>

                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      type="button"
                      onClick={() => openEdit(m)}
                      className="px-3 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      ✏
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(m.id)}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // LIST VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          {loading && <p className="text-gray-400">Ładowanie…</p>}

          {!loading &&
            filtered.map((m) => (
              <div
                key={m.id}
                className="p-4 bg-black/20 border border-white/10 rounded-xl flex gap-4 items-center"
              >
                <img
                  src={m.poster_url}
                  className="w-20 rounded-lg shadow"
                />

                <div className="flex-1">
                  <p className="text-lg font-semibold">{m.title}</p>
                  <p className="text-gray-400 text-sm">
                    {m.year} • {m.director}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(m)}
                    className="px-3 py-1 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    ✏
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(m.id)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {editing && (
        <Modal
          title="Edytuj Film"
          onSave={saveEdit}
          onClose={() => setEditing(false)}
        />
      )}
      {adding && (
        <Modal
          title="Dodaj Nowy Film"
          onSave={saveAdd}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  );
}