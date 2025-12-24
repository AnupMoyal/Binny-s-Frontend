import axios from "axios";


const API = axios.create({
  baseURL: "https://binny-s-backend.onrender.com",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ------------------- Movie APIs -------------------
export const fetchMovies = (page = 1) => API.get(`/movies?page=${page}`);
export const searchMovies = (query) => API.get(`/movies/search?q=${query}`);
export const sortMovies = (sortBy = "name") => API.get(`/movies/sorted?sort=${sortBy}`);

// Admin-only APIs
export const addMovie = (movie) => API.post("/movies", movie);
export const editMovie = (id, movie) => API.put(`/movies/${id}`, movie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);

// ------------------- Auth APIs -------------------
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export default API;
