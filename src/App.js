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


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
        <Route path="/notes/edit/:id" element={<NoteEdit/>} />
        <Route path="/notes/add" element={<AddNote />} />
      </Routes>
    </Router>
  );
}

export default App;
