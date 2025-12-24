// src/pages/user/SearchPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { TextField, Grid, Box, Typography, Skeleton } from "@mui/material";
import MovieCard from "../../components/MovieCard";
import { searchMovies } from "../../services/api";
import debounce from "lodash.debounce";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    debounce(async (q) => {
      if (!q) return setMovies([]);
      setLoading(true);
      try {
        const { data } = await searchMovies(q);
        setMovies(data); 
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 500),
    []
  );

  useEffect(() => {
    handleSearch(query);
    return handleSearch.cancel;
  }, [query, handleSearch]);

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>

      <TextField
        fullWidth
        label="Search by name or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2}>
        {loading
          ? Array.from(new Array(8)).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))
          : movies.length > 0
          ? movies.map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Grid>
            ))
          : query && (
              <Typography variant="h6" mt={4}>
                No movies found for "{query}"
              </Typography>
            )}
      </Grid>
    </Box>
  );
};

export default SearchPage;
