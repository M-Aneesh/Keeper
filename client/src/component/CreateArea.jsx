// Import React hooks
import React,{ useState, useEffect }from "react";
// Import axios for backend requests
import axios from "axios";
// Import Material UI Add icon
import AddTaskIcon from "@mui/icons-material/AddTask";
// Floating action button component
import Fab from "@mui/material/Fab";
// Zoom animation component
import Zoom from "@mui/material/Zoom";

const API_URL = import.meta.env.VITE_API_URL;


function CreateArea(props) {
  // Controls whether note area is expanded
  const [isExpand, setExpand] = useState(false);
  // Stores note title and content
  const [note, setNote] = useState({
      title: "",
      content: "",
    });

  // =========================
  // LOAD NOTE INTO EDIT MODE
  // =========================

  // Runs whenever editingNote changes
  useEffect(() => {
    console.log(props.editingNote);
    // If a note is selected for editing
    if (props.editingNote) {
      // Populate form with existing note data
      setNote({
        title: props.editingNote.title,
        content: props.editingNote.content,
      });
      // Expand note area automatically
      setExpand(true);
    }
  }, [props.editingNote]);

  // =========================
  // HANDLE INPUT CHANGES
  // =========================

  function handleChange(event) {
    // Extract input name and value
    const { name, value } = event.target;
    // Update corresponding field
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // =========================
  // ADD OR EDIT NOTE
  // =========================

  async function submitNote(event) {
    // Prevent page refresh
    event.preventDefault();
    // Prevent empty notes
    if (
      !note.title.trim() ||
      !note.content.trim()
    ) {
      return;
    }
    try {
      // =====================
      // EDIT EXISTING NOTE
      // =====================

      // If editingNote exists,
      // user is editing an old note
      if (props.editingNote) {
        // Update note in backend
        await axios.put(`${API_URL}/notes/${props.editingNote.id}`, note,
          {
            withCredentials: true,
          }
        );
        // Refresh notes from database
        props.fetchNotes();
        // Exit edit mode
        props.setEditingNote(null);
      }
      // =====================
      // ADD NEW NOTE
      // =====================
      else {
        // Create new note
        props.onAdd(note);
      }
      // Clear input fields after submit
      setNote({title: "", content: "",});
    } catch (err) {
      console.log(err);
    }
  }

  // =========================
  // EXPAND NOTE AREA
  // =========================

  function expand() {
    setExpand(true);
  }
  return (
    <div>
      {/* Note Form */}
      <form className="create-note">
        {/* Show title input only after expanding */}
        {isExpand && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        {/* Main note content area */}
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpand ? "3" : "1"}
        />
        {/* Zoom animation for submit button */}
        <Zoom in={isExpand}>
          {/* Add / Save button */}
          <Fab onClick={submitNote}>
            {/* Icon inside button */}
            <AddTaskIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;