// Import React
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  return (
    // Individual note container
    <div className="note">
      {/* Note title */}
      <h1>{props.title}</h1>
      {/* Note content/body */}
      <p>{props.content}</p>
      {/* Delete button */}
      <button onClick={() => {
          // Send note id to delete function
          props.onDelete(props.id);
        }}> <DeleteIcon/> </button>
      {/* Edit button */}
      <button
        onClick={() => {
          // Send complete note object
          // to edit function
          props.onEdit(props.note);
        }}> <EditIcon/> </button>
    </div>
  );
}

export default Note;