import React, { useState } from "react";
import Customset from "./CustomSET";
import "./App.css";

const Exercise = ({ exercise, handleSetToday }) => {
  const [editing, setEditing] = useState(false);
  const [exerciseUpdate, setExerciseUpdate] = useState();

  const handleEditingStyle = () => {
    setEditing(true);
  };

  let editMode = {};
  let viewMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const handleEditingDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
      exercise.title = exerciseUpdate;
      handleSetToday(exercise);
    }
  };
  return (
    <div>
      <div onDoubleClick={handleEditingStyle} style={viewMode}>
        <li>{exercise.title}</li>
      </div>
      <input
        type="text"
        style={editMode}
        defaultValue={exercise.title}
        onChange={(e) => setExerciseUpdate(e.target.value)}
        onKeyDown={handleEditingDone}
      />

      <h5>{exercise.freq.length}- SETs</h5>
      <ul>
        <Customset key={exercise.id} set={exercise.freq} />
      </ul>
    </div>
  );
};

export default Exercise;
