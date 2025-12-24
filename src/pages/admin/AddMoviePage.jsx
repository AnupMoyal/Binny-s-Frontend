import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { addMovie } from "../../services/api";

const AddMoviePage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    genre: "",
    rating: "",
    posterUrl: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMovie(form);
      setSuccess("Movie added successfully!");
      setError("");
      setForm({ name: "", description: "", genre: "", rating: "", posterUrl: "" });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess("");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Add New Movie
      </Typography>
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Movie Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Rating"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          type="number"
          inputProps={{ min: 0, max: 5, step: 0.1 }}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Poster URL"
          name="posterUrl"
          value={form.posterUrl}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Add Movie
        </Button>
      </form>
    </Box>
  );
};

export default AddMoviePage;
