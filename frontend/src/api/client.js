import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 7000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.params) {
    for (const k of Object.keys(config.params)) {
      const v = config.params[k];
      if (typeof v === "string") {
        config.params[k] = v
          .replace(/</g, "")
          .replace(/>/g, "")
          .replace(/script/gi, "")
          .replace(/onerror/gi, "")
          .replace(/onload/gi, "")
          .trim();
      }
    }
  }
  return config;
});

export default api;