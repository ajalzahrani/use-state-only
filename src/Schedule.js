import React, { useState, useEffect } from "react";

import Exercies from "./Exercies";

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

  useEffect(() => {
    // localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(scheduleData));

    handleWhichDay();
  }, []);

  const handleGlobalScheduleSave = (todayObj) => {
    setGlobalSchedule((prev) => {
      return { ...prev, todayObj };
    });
    console.log("Global Schedule after update a day: ", globalSchedule);

    // Global schedule to the local stoarge.
    localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(globalSchedule));
  };

  const handleSetToday = (ScheduleObj) => {
    // console.log("nothing to save");
    setToday((prev) => {
      return { ...prev, ScheduleObj };
    });
    console.log("todayObj after update workout: ", today);
    handleGlobalScheduleSave(today);
  };

  const handleWhichDay = () => {
    // Get Today name
    var date = new Date();
    date.setDate(date.getDate() - 4); // add day
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

  const handleEditingDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
      const workoutObj = today.workout;
      workoutObj.title = titleUpdate;
      console.log("workout object after edit: ", workoutObj);
      handleSetToday(workoutObj);
    }
  };

  return (
    <div>
      <h1>{today?.day}</h1>
      {/* <button
        onClick={() => {
          console.log(globalSchedule);
        }}
      >
        Save Edit
      </button> */}
      <div onDoubleClick={handleEditingStyle} style={viewMode}>
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
        {today.workout?.exercises.map((exercise) => (
          <Exercies
            key={exercise.id}
            exercise={exercise}
            handleSetToday={handleSetToday}
          />
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
