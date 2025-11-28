import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, createMovie, updateMovie, deleteMovie } from "../api/movies";
import EditModal from "../components/EditModal";
import Notification from "../components/Notification";
import MovieCard from "../components/MovieCard";

export default function Admin() {
  const nav = useNavigate();
  useEffect(() => { if (localStorage.getItem("isAdmin") !== "true") nav("/login"); }, []);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  // modal / edit
  const [editing, setEditing] = useState(null);

  // notifications
  const [notif, setNotif] = useState(null);
  const show = (type, text) => { setNotif({type,text}); setTimeout(()=>setNotif(null), 2600); };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMovies({ search: search || undefined, sort_by: sortBy, order, limit: 200 });
      setMovies(data || []);
    } catch (err) {
      console.error(err);
      show("error","Błąd pobierania filmów");
    } finally { setLoading(false); }
  }, [search, sortBy, order]);

  useEffect(()=>{ load(); }, [load]);

  const handleCreate = async (payload) => {
    try {
      await createMovie(payload);
      show("success","Dodano film");
      load();
    } catch (err) { console.error(err); show("error","Błąd dodawania"); }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await updateMovie(id, payload);
      show("success","Zapisano");
      load();
    } catch (err) { console.error(err); show("error","Błąd zapisu"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Na pewno usunąć?")) return;
    try {
      await deleteMovie(id);
      show("success","Usunięto");
      load();
    } catch (err) { console.error(err); show("error","Błąd usuwania"); }
  };

  return (
    <div>
      {notif && <Notification type={notif.type} text={notif.text} />}

      <div className="flex items-center gap-4 mb-6">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Szukaj..." className="flex-1 p-2 rounded bg-white/5" />
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="p-2 rounded bg-white/5">
          <option value="title">Tytuł</option>
          <option value="year">Rok</option>
          <option value="rating">Ocena</option>
        </select>
        <select value={order} onChange={e=>setOrder(e.target.value)} className="p-2 rounded bg-white/5">
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
        <button onClick={()=>load()} className="bg-indigo-600 px-4 py-2 rounded">Odśwież</button>
        <button onClick={()=>setEditing({})} className="bg-green-600 px-4 py-2 rounded">➕ Dodaj</button>
      </div>

      {loading ? <p>Ładowanie...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map(m => (
            <div key={m.id} className="relative">
              <MovieCard movie={m} />
              <div className="absolute top-3 right-3 flex gap-2">
                <button onClick={()=>setEditing(m)} className="px-2 py-1 rounded bg-indigo-600 text-sm">✏</button>
                <button onClick={()=>handleDelete(m.id)} className="px-2 py-1 rounded bg-red-600 text-sm">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && <EditModal movie={editing} onClose={()=>setEditing(null)} onSave={async (id,payload)=>{ if (id) await handleUpdate(id,payload); else await handleCreate(payload); setEditing(null);}} />}
    </div>
  );
}