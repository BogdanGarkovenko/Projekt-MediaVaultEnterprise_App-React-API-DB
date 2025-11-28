import { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { username, password }
      );

      localStorage.setItem("token", res.data.token);
      onLogin();
    } catch (err) {
      setError("Błędny login lub hasło");
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Panel administracyjny</h2>

        <input
          type="text"
          placeholder="Login"
          value={username}
          onChange={e => setU(e.target.value)}
        />

        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={e => setP(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}