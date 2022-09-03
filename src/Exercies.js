import React, { useState } from "react";
import Customset from "./CustomSET";
import "./App.css";
import exercises from "./database/exercises";
import { SetController } from "./SetController";

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

      /* HOW TO UPDATE EXERCISE TITLE */
      exercise.title = exerciseUpdate;
      handleSetToday(exercise);
    }
  };

  /* HOW TO ADD FREQUANCY TO AN EXERCISE */
  const addFreq = (freq) => {
    exercise.freq = freq;
    handleSetToday(exercise);
  };

  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = (id) => {
    let exername = exercises.filter((element) => {
      return element.id === id;
    });
    return exername[0].title;
  };

  return (
    <div>
      <div onDoubleClick={handleEditingStyle} style={viewMode}>
        <li>{getExerciseName(exercise.id)}</li>
      </div>
      <input
        type="text"
        style={editMode}
        defaultValue={exercise.title}
        onChange={(e) => setExerciseUpdate(e.target.value)}
        onKeyDown={handleEditingDone}
      />

      <div className="settitle">
        <h5 onDoubleClick={handleEditingStyle}>{exercise.freq.length}- SETs</h5>
        <div className="setController">
          <SetController addFreq={addFreq} />
        </div>
      </div>

      <ul>
        {exercise.freq.map((set, index) => (
          <Customset
            key={index}
            set={set}
            index={index}
            freq={exercise.freq}
            addFreq={addFreq}
          />
        ))}
      </ul>
    </div>
  );
};

export default Exercise;
{
  /* <Customset
          set={exercise.freq}
          handleSetToday={handleSetToday}
          key={exercise.id}
        /> */
}
