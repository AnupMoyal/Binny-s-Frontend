import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Grid, Pagination, Skeleton, Typography, Box } from "@mui/material";
import MovieCard from "../../components/MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadMovies = async (page) => {
    setLoading(true);
    try {
      const res = await fetchMovies(page);
      setMovies(res.data.movies || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Movie fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Movies
      </Typography>

      <Grid container spacing={3}>
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
                <Skeleton height={320} />
              </Grid>
            ))
          : movies.map((movie) => (
              <Grid key={movie._id} size={{ xs: 12, sm: 6, md: 3 }}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default HomePage;
