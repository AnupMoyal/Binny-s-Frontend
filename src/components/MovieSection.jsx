import { Box, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2} fontWeight={700}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, overflowX: "auto" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </Box>
  );
}
