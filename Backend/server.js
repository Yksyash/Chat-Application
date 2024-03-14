const express = require('express');
const http = require('http');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const session = require('express-session')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const url = require('url');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server,{cors:{origin:'*'}})
app.use(cors());
const jsonParser =bodyParser.json();
const secretkey = crypto.randomBytes(32).toString('hex');



//Configure session middleware
app.use(session({
  secret: secretkey,
  resave: false,
  saveUninitialized: true,
  name:'myCookie',
}));


const users = [];
const connections = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  // Verify the token before allowing the connection
  const token = socket.handshake.query.token;
  const username = socket.handshake.query.username;

  try {
    const decoded = jwt.verify(token, secretkey);

    // Token is valid, proceed with the connection
    console.log('User authenticated:', username);
    
    // Broadcast a welcome message to all clients
    io.emit('message', { username: 'Server', message: `Welcome, ${username}!` });
  } catch (error) {
    // Token verification failed, disconnect the socket
    console.error('Token verification failed:', error.message);
    socket.disconnect(true);
  }

  socket.on('message', (message) => {

    // Broadcast the message to all clients except the sender
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// signup route
app.post('/signup', jsonParser, (req, res) => {
  const { username,password } = req.body;

  // Check if the username is already taken
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(409).json({message: 'Username already exists' });
  } else {
    // Add the new user to the array
    users.push({ username,password });
    return res.status(201).json({ message: 'User registered successfully' });
  }
});


// login route
app.post('/login', jsonParser, (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the array
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign(user.username, secretkey)
    return res.status(200).json({token});
  } else {
    return res.status(401).json({message: 'Invalid username or password' });
  }
});


// logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err)=>{
    if(err){
      console.error('Error destroying session:', err);
      return res.status(500).json({message: 'Server error'});
    }else{
      return res.clearCookie('myCookie').status(200).json({message:'Logout Successful'});
    }
  })
});

const PORT = process.env.PORT || 3001;
const domain = 'localhost';

server.listen(PORT, domain,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
