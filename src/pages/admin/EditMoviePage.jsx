import React, { useState, useEffect } from "react";
import { fetchMovies, editMovie, deleteMovie } from "../../services/api";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const EditMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadMovies = async () => {
    setLoading(true);
    try {
      const { data } = await fetchMovies();
      setMovies(data.movies);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
      setSuccess("Movie deleted successfully!");
      loadMovies();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleSave = async () => {
    try {
      await editMovie(selectedMovie._id, selectedMovie);
      setSuccess("Movie updated successfully!");
      setError("");
      setOpen(false);
      loadMovies();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "genre", headerName: "Genre", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button color="error" onClick={() => handleDelete(params.row._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Edit / Delete Movies
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={movies}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          {selectedMovie && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={selectedMovie.name}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Genre"
                value={selectedMovie.genre}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, genre: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Rating"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={selectedMovie.rating}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, rating: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Poster URL"
                value={selectedMovie.posterUrl}
                onChange={(e) => setSelectedMovie({ ...selectedMovie, posterUrl: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditMoviePage;
