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
import { Outlet } from 'react-router-dom';
import UserDetails from './components/user/UserDetails';
import EditProfile from './components/user/EditProfile';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<ProtectedRoute element={<NotesLayout />} />}>
          <Route path="" element={<NotesList />} />
          <Route path=":id" element={<NoteDetails />} />
          <Route path="edit/:id" element={<NoteEdit />} />
          <Route path="add" element={<AddNote />} />
          <Route path="public" element={<PublicNotes />} />
        </Route>
        <Route path="/profile" element={<ProtectedRoute element={<ProfileLayout />} />}>
          <Route path="" element={<UserProfile />} />
          <Route path="view" element={<UserDetails />} />
          <Route path="edit/me" element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

/* The Outlet component renders the nested routes within the NotesLayout */
const NotesLayout = () => {
  return (
    <div>
      <h2>Notes</h2>
      <Outlet />
    </div>
  );
};

const ProfileLayout = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <Outlet />
    </div>
  );
};

export default App;
