# Chat Application

This is a simple chat application built with React, Node.js, Express, and Socket.IO.

## How to Setup and Run project.

## Please ensure Node.js is installed on your machine.

### Server

1. Clone this repository:
2. Navigate to the `backend` directory:
3. Install dependencies: npm install
4. Start the server:  npm start

The server will start listening on port 3001 by default.

### Client

1. Navigate to the `frontend` directory:
2. Install dependencies: npm install
3. Start the client application: npm run dev

The client application will be accessible at `http://localhost:5173` by default.

Note: 
1. If you have any broswer extensions installed, please open the client url in an incognito window or 
   disable the extensions, else the client may not work properly.
2. Database connectivity has not been implemented, if you stop the server you will need to signup again 
   to be able to login and enter the chatroom on server restart.   
      

## Architecture and Concurrency

The application follows a client-server architecture. The client is built with React and communicates with the server using Socket.IO for real-time communication. The server is built with Node.js and Express and handles incoming connections from clients. Concurrency is handled on the server using asynchronous programming techniques such as callbacks, promises, and async/await.

## Assumptions and Design Choices

1. **Socket.IO for Real-Time Communication**: Socket.IO was chosen for its simplicity and reliability in handling real-time communication between clients and the server.

2. **JSON Web Tokens (JWT) for Authentication**: JWT tokens are used for user authentication. This approach provides a stateless authentication mechanism and allows for easy scalability.

3. **Separation of Concerns**: The application separates the client-side code (frontend) from the server-side code (backend) to improve maintainability and scalability.

4. **Express for API Routing**: Express is used to define API routes on the server, providing a structured way to handle incoming requests.

5. **Modular Code Structure**: Both the frontend and backend codebases are organized into separate modules to promote code reusability and maintainability.










