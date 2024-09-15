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
        <Route path="/notes" >
          <Route index element={<NotesList />} />
          <Route path=":id" element={<NoteDetails />} />
          <Route path="edit/:id" element={<NoteEdit />} />
          <Route path="add" element={<AddNote />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
