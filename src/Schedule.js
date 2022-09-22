import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useImmer } from "use-immer";
import { produce } from "immer";
import { useStore } from "./store";

import Exercies from "./Exercies";

import scheduleData from "./database/ScheduleObject";
import exercises from "./database/exercises";

const GLOBAL_STORAGE_KEY = "PRO_SCHEDULE";

function getScheduleData(key) {
  const temp = JSON.parse(localStorage.getItem(key));
  return temp || [];
}

const Schedule = () => {
  const [globalSchedule, setGlobalSchedule] = useState(
    getScheduleData(GLOBAL_STORAGE_KEY)
  );
  const [today, setToday] = useState({});
  // const [today, setToday] = useImmer({});
  const [titleUpdate, setTitleUpdate] = useState("");
  const [editing, setEditing] = useState(false);
  const [newWorkout, setNewWorkout] = useState("");

  const todays = useStore((state) => state.today);
  const addNewWorkout = useStore((state) => state.addNewWorkout);
  const deleteWorkout = useStore((state) => state.deleteWorkout);

  const handleGlobalScheduleSave = () => {
    console.log("hi", today);
    setGlobalSchedule(
      produce(globalSchedule, (draft) => {
        const index = draft.findIndex((day) => day.day === today.day);
        if (index !== -1) draft[index] = today;
      })
    );

    // Global schedule to the local stoarge.
    localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(globalSchedule));
  };

  /* HOW TO UPATE CURRENT DAY WORKOUT PARAMETERS USING PRODECE */
  const handleSetToday = (workout) => {
    setToday(
      produce(today, (draft) => {
        draft["workout"] = workout;
      })
    );

    handleGlobalScheduleSave();
  };

  /* HOW TO ADD NEW WORKOUT */
  const handleAddnewWorkout = (event) => {
    if (event.key === "Enter") {
      // const workout = {
      //   id: uuidv4(),
      //   title: newWorkout,
      //   exercises: [],
      // };
      // handleSetToday(workout)
      addNewWorkout({
        id: uuidv4(),
        title: newWorkout,
        exercises: [],
      });
      console.log("handleAddWorkout: ", todays);
    }
  };

  /* HOW TO ASSIGN EXERCISES TO WORKOUT */
  const assignExercise = (id) => {
    const exerciseObj = {
      id: id,
      freq: [],
    };

    setToday(
      produce((draft) => {
        draft.workout.exercises.push(exerciseObj);
      })
    );
  };

  const handleEditingDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);

      /* HOW TO EDIT WORKOUT TITLE */
      setToday(
        produce((draft) => {
          draft.workout.title = titleUpdate;
        })
      );
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

  /* HOW TO SELECT CURRENT DAY OBJECT FROM STORAGE */
  const handleWhichDay = () => {
    // Get Today name
    var date = new Date();
    date.setDate(date.getDate() + 1); // add day
    const todayName = date.toLocaleDateString("en-us", { weekday: "long" }); // get day name

    let todayObj = {};
    // very efficant way to pick day instead of array fuck
    for (let i = 0; i < globalSchedule.length; i++) {
      if (globalSchedule[i].day === todayName) {
        todayObj = globalSchedule[i];
        break;
      }
    }
    setToday(todayObj);
  };

  useEffect(() => {
    handleWhichDay();
  }, [globalSchedule]);

  return (
    <div className="container">
      <div>
        <h1>{today?.day}</h1>
        <button
          onClick={() => {
            console.log(todays);
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
          onChange={(e) => setTitleUpdate(e.target.value)}
          onKeyDown={handleEditingDone}
        />
        <ul>
          {/* HOW TO RENDER PARTICUAL WORKOUT EXERCISES */}

          {today?.workout?.exercises.map((exercise) => (
            <Exercies
              key={exercise.id}
              exercise={exercise}
              handleSetToday={handleSetToday}
            />
          ))}
        </ul>
      </div>
      <div className="insert">
        <label>Add new workout</label>
        <input
          type="text"
          placeholder="Enter new workout"
          onChange={(e) => setNewWorkout(e.target.value)}
          onKeyDown={handleAddnewWorkout}
          defaultValue={newWorkout}
        />
        <button onClick={handleDeleteWorkout}>Delete workout</button>
        <ul>
          {/* HOW TO RENDER A LIST OF EXERCISES */}
          {exercises.map((exer) => {
            return (
              <div key={exer.id} className="exerlist">
                <li>
                  {exer.id}
                  {exer.title}
                </li>
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
