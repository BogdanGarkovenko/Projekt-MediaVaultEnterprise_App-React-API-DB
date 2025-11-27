import Home from "./pages/Home";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logoDark from "./assets/logo-dark.png";
import logoLight from "./assets/logo-light.png";
import { motion } from "framer-motion";

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logo = theme === "dark" ? logoDark : logoLight;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/10 dark:border-white/5 shadow-[0_8px_20px_rgba(120,80,255,0.08)]">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.img src={logo} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="h-14 w-auto drop-shadow-[0_0_12px_rgba(140,110,255,0.35)] transition-all" />
            <nav className="flex items-center gap-4 text-sm font-medium relative">
              <NavItem to="/" label="Home" active={location.pathname === "/"} />
              <NavItem to="/admin" label="Admin" active={location.pathname === "/admin"} />
            </nav>
          </div>

          <motion.button whileTap={{ scale: 0.92 }} onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")} className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_0_18px_rgba(140,110,255,0.4)] hover:shadow-[0_0_28px_rgba(160,120,255,0.6)] transition-all">
            {theme === "dark" ? "☀ Jasny" : "🌙 Ciemny"}
          </motion.button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto fade-in">
        <Home />
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, label, active }) {
  return (
    <Link to={to} className={`relative px-3 py-1.5 transition ${active ? "text-indigo-400" : "text-gray-400 hover:text-indigo-300"}`}>
      {label}
      {active && (
        <motion.div layoutId="nav-underline" className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent-strong)))", boxShadow: "0 0 12px rgba(var(--glow), 0.55)" }} />
      )}
    </Link>
  );
}