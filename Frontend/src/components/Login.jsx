import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container, Grid, Link } from '@mui/material';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await fetch('http://localhost:3001/login', {
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
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate(`/chatApp/${username}`);
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
          <Typography variant="h5">Login</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="password"
                label="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '20px' }}>
            Join Chat
          </Button>
          <Typography style={{ marginTop: '10px' }}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
    </Container>
  );
}

export default LoginPage;
