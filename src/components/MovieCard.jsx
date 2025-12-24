
import React from "react";
import { Card, CardMedia, CardContent, Typography, Rating, Box } from "@mui/material";

const MovieCard = ({ movie }) => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardMedia
      component="img"
      height="200"
      image={movie.poster} 
      alt={movie.name}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {movie.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {movie.description?.slice(0, 60)}...
      </Typography>
      <Box display="flex" alignItems="center">
        <Rating value={movie.rating || 0} readOnly precision={0.1} size="small" />
        <Typography variant="body2" ml={1}>
          {movie.rating?.toFixed(1)}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default MovieCard;
