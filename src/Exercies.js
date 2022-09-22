import React, { useState } from "react";
import Customset from "./CustomSET";
import "./App.css";
import exercises from "./database/exercises";
import { SetController } from "./SetController";
import { useStore } from "./store";

const Exercise = ({ exercise }) => {
  const exerciseAddFreq = useStore((state) => state.exerciseAddFreq);

  /* HOW TO ADD FREQUANCY TO AN EXERCISE */
  const addFreq = (freq) => {
    exerciseAddFreq(exercise.id, freq);
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
      <li>{getExerciseName(exercise.id)}</li>

      <div className="settitle">
        <h5>{exercise.freq.length}- SETs</h5>
        <div className="setController">
          <SetController addFreq={addFreq} />
        </div>
      </div>

      <ul>
        {exercise.freq.map((set, index) => (
          <Customset key={index} set={set} exerId={exercise.id} index={index} />
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
