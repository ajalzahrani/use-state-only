import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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
  const [titleUpdate, setTitleUpdate] = useState("");
  const [editing, setEditing] = useState(false);
  const [newWorkout, setNewWorkout] = useState("");

  const handleGlobalScheduleSave = (todayObj) => {
    setGlobalSchedule((prevStat) => {
      return prevStat.map((aDay) => {
        if (aDay == today.day) {
          return {
            ...aDay,
            today,
          };
        }
        return aDay;
      });
    });

    // console.log("Global Schedule after update a day: ", globalSchedule);

    // Global schedule to the local stoarge.
    localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(globalSchedule));
  };

  /* HOW TO UPDATE CURRENT DAY WORKOUT PARAMETERS (MAIN METHOD) */
  const handleSetToday = (ScheduleObj) => {
    // console.log("nothing to save");
    setToday((prev) => {
      return { ...prev, ScheduleObj };
    });
    console.log("todayObj after update workout: ", today);
    handleGlobalScheduleSave(today);
  };

  /* HOW TO ADD NEW WORKOUT */
  const handleAddnewWorkout = (event) => {
    if (event.key === "Enter") {
      const workoutObj = {
        workout: {
          id: uuidv4(),
          title: newWorkout,
          exercises: [],
        },
      };
      let updatedDay = Object.assign(today, workoutObj);
      console.log(updatedDay);
      handleSetToday(updatedDay);
    }
  };

  /* HOW TO ASSIGN EXERCISES TO WORKOUT */
  const assignExercise = (id, workoutObj) => {
    const exerciseObj = {
      id: id,
      freq: [],
    };

    workoutObj.exercises?.push(exerciseObj);
    handleSetToday(workoutObj);
    console.log("todayObj after adding exercise: ", workoutObj);
  };

  const handleEditingDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);

      /* HOW TO EDIT WORKOUT TITLE */
      const workoutObj = today.workout;
      workoutObj.title = titleUpdate;
      console.log("workout object after edit: ", workoutObj);
      handleSetToday(workoutObj);
    }
  };

  /* HOW TO SELECT CURRENT DAY OBJECT FROM STORAGE */
  const handleWhichDay = () => {
    // Get Today name
    var date = new Date();
    date.setDate(date.getDate() - 0); // add day
    const todayName = date.toLocaleDateString("en-us", { weekday: "long" }); // get day name

    // Get scheduleData from localStorage
    // let scheduleData = getScheduleData(GLOBAL_STORAGE_KEY);

    // console.log("HI old", scheduleData);
    // console.log("HI new", globalSchedule);

    let todayObj = {};
    // // very efficant way to pick day instead of array fuck
    // for (let i = 0; i < scheduleData.length; i++) {
    //   if (scheduleData[i].day === todayName) {
    //     todayObj = scheduleData[i];
    //   }
    // }
    for (let i = 0; i < globalSchedule.length; i++) {
      if (globalSchedule[i].day === todayName) {
        todayObj = globalSchedule[i];
      }
    }

    setToday(todayObj);
  };

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

  useEffect(() => {
    handleWhichDay();
    // localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(scheduleData)); // rest the storage value
  }, [globalSchedule]);

  return (
    <div className="container">
      <div>
        <h1>{today?.day}</h1>
        <button
          onClick={() => {
            console.log(globalSchedule);
          }}
        >
          Save Edit
        </button>
        <div onDoubleClick={handleEditingStyle} style={viewMode}>
          {/* HOW TO GET WORKOUT TITLE FROM WORKOUT OBJECT */}
          <h3>{today.workout?.title}</h3>
        </div>
        <input
          type="text"
          style={editMode}
          defaultValue={today.workout?.title}
          onChange={(e) => setTitleUpdate(e.target.value)}
          onKeyDown={handleEditingDone}
        />
        <ul>
          {/* HOW TO RENDER PARTICUAL WORKOUT EXERCISES */}
          {today.workout?.exercises.map((exercise) => (
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
                    assignExercise(exer.id, today.workout);
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
