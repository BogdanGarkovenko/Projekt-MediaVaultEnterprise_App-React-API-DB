import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import MoviePage from "./pages/MoviePage";   // <-- DODANE!
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 text-slate-100">
      <Header theme={theme} setTheme={setTheme} />
      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/movie/:id" element={<MoviePage />} />
        </Routes>
      </main>
    </div>
  );
}

function Header({ theme, setTheme }) {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/admin", label: "Admin" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/6">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-extrabold text-white"
          >
            MediaVault
          </motion.div>

          <nav className="flex items-center gap-3">
            {navItems.map(n => (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-1 rounded-md ${
                  location.pathname === n.to
                    ? "bg-white/6 text-indigo-300"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
            className="px-3 py-2 rounded-md bg-white/6 text-sm"
          >
            {theme === "dark" ? "☀ Jasny" : "🌙 Ciemny"}
          </button>
        </div>
      </div>
    </header>
  );
}