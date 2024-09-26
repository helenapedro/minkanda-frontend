import React from 'react';
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
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/notes" element={<ProtectedRoute element={<NotesList />} />}>
          <Route path=":id" element={<ProtectedRoute element={<NoteDetails />} />} />
          <Route path="edit/:id" element={<ProtectedRoute element={<NoteEdit />} />} />
          <Route path="add" element={<ProtectedRoute element={<AddNote />} />} />
        </Route>
        <Route path="/notes/public" element={<PublicNotes />} />
      </Routes>
    </Router>
  );
};

export default App;
