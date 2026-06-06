// Import React hooks
import React, { useState,useEffect } from "react";
// Import axios for API requests
import axios from "axios";
// Import navigation hook
import { useNavigate } from "react-router-dom";
// Import components
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {
  // Used for route navigation
  const navigate = useNavigate();
  // Stores all notes fetched from database
  const [notes, setNotes] = useState([]);
  // Stores currently selected note for editing
  const [editingNote, setEditingNote] = useState(null);

  // =========================
  // FETCH NOTES
  // =========================

  // Fetch all notes belonging to logged-in user
  async function fetchNotes() {
    try {
      // GET request to backend
      const res = await axios.get("http://localhost:5000/notes",
          {
            // Required for session cookies
            withCredentials: true,
          }
        );
      // Store notes in state
      setNotes(res.data);
    } catch (err) {
      console.log(err);
      // Redirect to login if unauthorized
      navigate("/login");
    }
  }

  // Run once when component loads
  useEffect(() => {
    fetchNotes();
  }, [navigate]);

  // =========================
  // ADD NOTE
  // =========================

  async function addNote(newNote) {
    try {
      // Send new note to backend
      const res = await axios.post("http://localhost:5000/notes", newNote,
          {
            withCredentials: true,
          }
        );
      // Add newly created note to frontend state
      setNotes(prevNotes => {
        return [
          res.data,
          ...prevNotes
        ];
      });
    } catch (err) {
      console.log(err);
    }
  }

  // =========================
  // DELETE NOTE
  // =========================

  async function deleteNote(id) {
    try {
      // Delete note from database
      await axios.delete(`http://localhost:5000/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      // Remove deleted note from frontend state
      setNotes(prevNotes => {
        return prevNotes.filter(note => {
          return note.id !== id;
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  // =========================
  // EDIT NOTE
  // =========================

  // Stores selected note inside editing state
  async function handleEdit(note) {
    console.log(note);
    setEditingNote(note);
  }

  // =========================
  // LOGOUT
  // =========================

  async function handleLogout() {
    try {
      // Logout request to backend
      await axios.post("http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // Redirect user to home page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      {/* App Header */}
      <Header />
      <div className="app-buttons">
      {/* Logout Button */}
      <button className="app-button" onClick={handleLogout}><LogoutIcon/></button>
      {/* Navigate back to home */}
      <button className="app-button" onClick={() => navigate("/")}><HomeIcon/></button>
      {/* Create/Edit Note Component */}
      </div>
      <CreateArea
        // Function to add new note
        onAdd={addNote}
        // Currently selected note
        editingNote={editingNote}
        // Function to reset editing state
        setEditingNote={setEditingNote}
        // Refresh notes after editing
        fetchNotes={fetchNotes}
      />
      {/* Render all notes */}
      {notes.map(noteItem => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            // Pass full note object
            note={noteItem}
            // Delete handler
            onDelete={deleteNote}
            // Edit handler
            onEdit={handleEdit}
          />
        );
      })}
      {/* App Footer */}
      <Footer />
    </div>
  );
}

export default App;