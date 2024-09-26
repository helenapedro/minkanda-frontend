import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotesList from './pages/Notes/NotesList';
import NoteDetails from './pages/Notes/NoteDetails';
import NoteEdit from './components/notes/NoteEdit';
import AddNote from './components/notes/AddNote';
import PublicNotes from './pages/PublicNotes';
import LogoutButton from './components/LogoutButton'; 
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { authUser } from './services/auth';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await authUser(); 
        setIsAuthenticated(true); 
      } catch (error) {
        setIsAuthenticated(false); 
      }
    };

    authenticate();
  }, []);

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes/public" element={<PublicNotes />} />
        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/notes" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <NotesList />
          </ProtectedRoute>
        }>
          <Route path=":id" element={<NoteDetails />} />
          <Route path="edit/:id" element={<NoteEdit />} />
          <Route path="add" element={<AddNote />} />
        </Route>
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
}

export default App;
