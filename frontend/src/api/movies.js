import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const client = axios.create({ baseURL: API, timeout: 15000 });

export async function getMovies({ search, genre, sort_by, order, page = 1, limit = 40 } = {}) {
  const params = {};
  if (search) params.search = search;
  if (genre) params.genre = genre;
  if (sort_by) params.sort_by = sort_by;
  if (order) params.order = order;
  params.page = page;
  params.limit = limit;
  const res = await client.get("/movies", { params });
  return res.data;
}

export async function getMovieById(id) {
  const res = await client.get(`/movies/${id}`);
  return res.data;
}

export async function createMovie(payload) {
  const r = await client.post("/movies", payload);
  return r.data;
}

export async function updateMovie(id, payload) {
  const r = await client.put(`/movies/${id}`, payload);
  return r.data;
}

export async function deleteMovie(id) {
  const r = await client.delete(`/movies/${id}`);
  return r.data;
}