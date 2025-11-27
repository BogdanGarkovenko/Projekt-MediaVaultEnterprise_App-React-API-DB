import { useState } from "react";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    } else {
      setError("❌ Nieprawidłowy login lub hasło.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-900">
      
      <motion.form
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 flex flex-col gap-4"
      >
        
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center mb-2"
        >
          🔐 Panel Administratora
        </motion.h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          type="text"
          placeholder="Login"
          className="w-full p-3 rounded-xl bg-white/20 dark:bg-white/10 border border-white/20 focus:border-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          type="password"
          placeholder="Hasło"
          className="w-full p-3 rounded-xl bg-white/20 dark:bg-white/10 border border-white/20 focus:border-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-lg"
          type="submit"
        >
          Zaloguj
        </motion.button>
      </motion.form>
    </div>
  );
}