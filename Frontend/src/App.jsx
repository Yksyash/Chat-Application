import React from 'react';
import { BrowserRouter as Router,Route, Routes, BrowserRouter} from 'react-router-dom';
import './App.css'
import LoginPage from './components/Login.jsx';
import SignupPage from './components/Signup.jsx';
import ChatApp from './components/ChatApp.jsx';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token is present
};

function App(){

  return (
    
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/chatApp/:username" element={!isLoggedIn()?<LoginPage />:<ChatApp />}></Route>
    </Routes>
  </BrowserRouter> 

  )

}

export default App;
