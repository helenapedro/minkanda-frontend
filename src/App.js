import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getCurrentUserAsync, logoutUser } from './redux/userSlice';
import './App.css';

import NavBar from './components/NavBar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AddNote from './components/notes/AddNote';
import PublicNotes from './pages/PublicNotes';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute'; 
import { Outlet } from 'react-router-dom';
import About from './components/About';
import Logout from './components/logout';
import PrivateNotes from './pages/PrivateNotes';
import NoteDetailsEdit from './components/notes/NoteDetailsEdit';

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
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/notes" element={<ProtectedRoute element={<NotesLayout />} />}>
            <Route path="" element={<PrivateNotes />} />
            <Route path=":id" element={<NoteDetailsEdit />} />
            <Route path="add" element={<AddNote />} />
            <Route path="public" element={<PublicNotes />} />
          </Route>
          <Route path="/profile" element={<ProtectedRoute element={<ProfileLayout />} />}>
            <Route index element={<UserProfile />} />
          </Route>
          <Route path="/logout" element={<ProtectedRoute element={<Logout />}/>} />
        </Routes>
      </Router> 
  );
};


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
