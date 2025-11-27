import api from "./client";

export const getMovies = (params = {}) =>
  api.get("/movies", { params }).then((r) => r.data);

export const createMovie = (movie) =>
  api.post("/movies", movie).then((r) => r.data);

export const updateMovie = (id, movie) =>
  api.put(`/movies/${id}`, movie).then((r) => r.data);

export const deleteMovie = (id) =>
  api.delete(`/movies/${id}`).then((r) => r.data);