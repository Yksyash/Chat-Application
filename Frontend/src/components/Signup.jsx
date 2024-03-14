import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container, Link, Grid } from '@mui/material';
import axios from 'axios';

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((msg) => alert(msg.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Paper elevation={3} style={{ padding: '2em', textAlign: 'center' }}>
          <Typography variant="h5">Sign Up</Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSignup} style={{ marginTop: '20px' }}>
            Sign Up
          </Button>
          <Typography style={{ marginTop: '1em' }}>
            Already have an account? <Link href='/' >Login</Link>
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
}

export default SignupPage;
