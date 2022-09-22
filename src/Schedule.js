import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useImmer } from "use-immer";
import { produce } from "immer";
import { useStore } from "./store";

import Exercies from "./Exercies";
import exercises from "./database/exercises";

const Schedule = () => {
  const [editing, setEditing] = useState(false);
  const [workoutTitle, setWorkoutTitle] = useState("");

  const today = useStore((state) => state.today);
  const addNewWorkout = useStore((state) => state.addNewWorkout);
  const addExercise = useStore((state) => state.addExercise);
  const deleteWorkout = useStore((state) => state.deleteWorkout);
  const updateWorkout = useStore((state) => state.updateWorkout);
  const saveGlobalStore = useStore((state) => state.saveGlobalStore);

  const handleAddnewWorkout = (event) => {
    if (event.key === "Enter") {
      const workout = {
        id: uuidv4(),
        title: workoutTitle,
        exercises: [],
      };

      console.log(workout);
      addNewWorkout(workout);
    }
  };

  /* HOW TO ASSIGN EXERCISES TO WORKOUT */
  const assignExercise = (id) => {
    const exerciseObj = {
      id: id,
      freq: [],
    };
    addExercise(exerciseObj);
  };

  const handleEditingDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);

      console.log(workoutTitle);
      // /* HOW TO EDIT WORKOUT TITLE */
      updateWorkout(workoutTitle);
    }
  };

  const handleDeleteWorkout = useCallback(() => {
    deleteWorkout();
  });

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

  return (
    <div className="container">
      <div>
        <h1>{today?.day}</h1>
        <button
          onClick={() => {
            saveGlobalStore();
          }}
        >
          Save Edit
        </button>
        <div onDoubleClick={handleEditingStyle} style={viewMode}>
          {/* HOW TO GET WORKOUT TITLE FROM WORKOUT OBJECT */}
          <h3>{today?.workout?.title}</h3>
        </div>
        <input
          type="text"
          style={editMode}
          defaultValue={today?.workout?.title}
          onChange={(e) => setWorkoutTitle(e.target.value)}
          onKeyDown={handleEditingDone}
        />
        <ul>
          {/* HOW TO RENDER PARTICUAL WORKOUT EXERCISES */}

          {today?.workout?.exercises.map((exercise) => (
            <Exercies
              key={exercise.id}
              exercise={exercise}
              // handleSetToday={handleSetToday}
            />
          ))}
        </ul>
      </div>
      <div className="insert">
        <label>Add new workout</label>
        <input
          type="text"
          placeholder="Enter new workout"
          onChange={(e) => setWorkoutTitle(e.target.value)}
          onKeyDown={handleAddnewWorkout}
          defaultValue={workoutTitle}
        />
        <button onClick={handleDeleteWorkout}>Delete workout</button>
        <ul>
          {/* HOW TO RENDER A LIST OF EXERCISES */}
          {exercises.map((exer) => {
            return (
              <div key={exer.id} className="exerlist">
                {exer.id}- {exer.title} _
                <button
                  onClick={() => {
                    assignExercise(exer.id);
                  }}
                >
                  add
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
