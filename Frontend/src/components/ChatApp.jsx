// ChatApp.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, List, ListItem, Link } from '@mui/material';
import { io } from 'socket.io-client';


function ChatApp() {
  const navigate = useNavigate();
  const {username} =  useParams();
  const usernameForUrl = username.replace(/ /g, ' ');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token is present, redirect to the login page
      navigate('/');
      return;
    }

    const socket = io('http://localhost:3001', {
      query: {
        token,
        username,
      },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
      setSocket(socket);
    });

    socket.on('message', (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setSocket(null);

      // Redirect to login if WebSocket connection closes
      navigate('/');
    });

    return () => {
      // Clean up WebSocket on component unmount
      socket.close();
    };
  }, [navigate, usernameForUrl]);

  const handleSendMessage = () => {
    if (socket && message.trim() !== '') {
      const newMessage = {
        username: username, 
        message: message.trim(),
      };

      // Send the message to the server
      socket.emit('message', newMessage);

      // Update the local state to display the message immediately
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the input field
      setMessage('');
    }
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5">Chat Room</Typography>
        <List style={{ maxHeight: '300px', overflow: 'auto' }}>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <strong>{msg.username}:</strong> {msg.message}
            </ListItem>
          ))}
        </List>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="message"
          label="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
          Send Message
        </Button>
        <Typography style={{ marginTop: '10px' }}>
        <Button variant="contained" color="primary"style={{ marginTop: '10px' }}
          onClick={async (e)=>{ await fetch('http://localhost:3001/logout',{
                method:'POST',
                })
                .then(res=>res.json())
                .then(data=>{if(data.message==='Logout Successful'){
                            localStorage.removeItem('token');
                            // localStorage.removeItem('email')
                            navigate('/');
                            
                            }
                          alert(data.message)
                        })
          
                }}>Logout</Button>
        </Typography>
      </Paper>
    </Container>
  );
}

export default ChatApp;
