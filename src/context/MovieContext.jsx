import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addMovie = async (movie) => {
    await api.post("/movies", movie);
    fetchMovies();
  };

  const editMovie = async (id, updatedMovie) => {
    await api.put(`/movies/${id}`, updatedMovie);
    fetchMovies();
  };

  const deleteMovie = async (id) => {
    await api.delete(`/movies/${id}`);
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, loading, addMovie, editMovie, deleteMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};
