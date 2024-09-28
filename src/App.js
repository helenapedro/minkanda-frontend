import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getCurrentUserAsync, logoutUser } from './redux/userSlice';
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
import About from './components/About';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUserAsync()).unwrap().catch(() => {
        dispatch(logoutUser());
      });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
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
            <Route index element={<UserProfile />} />
            <Route path="view" element={<UserDetails />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Routes>
      </Router> 
    </div>
  );
};

/* The Outlet component renders the nested routes within the NotesLayout */
const NotesLayout = () => {
  return (
      <Outlet />
  );
};

const ProfileLayout = () => {
  return (
      <Outlet />
  );
};

export default App;
