import React, { useState, useContext } from "react";
import { Box, Typography, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate("/login");
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8} p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2} textAlign="center">Register</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" margin="normal" required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" type="email" margin="normal" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>

      <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/login")}>Already have an account? Login</Button>
    </Box>
  );
};

export default RegisterPage;
