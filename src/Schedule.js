import React, { useState, useEffect } from "react";

import Exercies from "./Exercies";

const scheduleData = [
  {
    day: "Sunday",
    workout: {
      id: 1,
      title: "pushup workout",
      exercises: [
        {
          id: 1,
          title: "pushups",
          freq: [15, 12, 12, 10],
        },
        {
          id: 2,
          title: "wide grip pushup",
          freq: [10, 10, 10],
        },
        {
          id: 3,
          title: "Diamond pushup",
          freq: [10, 10, 10, 10, 10],
        },
        {
          id: 4,
          title: "Reverse pushup",
          freq: [20, 20],
        },
      ],
    },
  },
  {
    day: "Monday",
  },
  {
    day: "Tuesday",
    workout: {
      id: 2,
      title: "Pullup workout",
      exercises: [
        {
          id: 1,
          title: "PullUps",
          freq: [15, 12, 12, 10],
        },
        {
          id: 2,
          title: "wide grip pullups",
          freq: [10, 10, 10],
        },
        {
          id: 3,
          title: "Close grip pullup",
          freq: [10, 10, 10, 10, 10],
        },
        {
          id: 4,
          title: "Chine up",
          freq: [20, 20],
        },
      ],
    },
  },
  {
    day: "Windesday",
  },
  {
    day: "Thuresday",
  },
  {
    day: "Friday",
  },
  {
    day: "Saturday",
  },
];

const GLOBAL_STORAGE_KEY = "PRO_SCHEDULE";

function getScheduleData(key) {
  const temp = JSON.parse(localStorage.getItem(key));
  return temp || [];
}

const Schedule = () => {
  const [today, setToday] = useState({});
  const [workoutTitle, setSetWorkoutTitle] = useState(today.workout?.title);
  const [titleUpdate, setTitleUpdate] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    handleWhichDay();
  }, []);

  const handleGlobalSave = () => {
    // Get previous image of the schedule
    const prev = getScheduleData(GLOBAL_STORAGE_KEY);

    console.log("before update: ", prev);
    console.log("Length before: ", prev.length);
    // Set up the new object
    const stageObject = [prev, ...today];

    console.log("after update: ", JSON.stringify(stageObject));
    console.log("Length after: ", JSON.stringify(stageObject).length);

    // Save the object to localStorage
    // localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(stageObject));
  };

  const handleSetToday = (ScheduleObj) => {
    console.log("nothing to save");
    // setToday((prev) => {
    //   return { ...prev, ScheduleObj };
    // });
    // handleGlobalSave();
  };

  const handleWhichDay = () => {
    // Get Today name
    var date = new Date();
    date.setDate(date.getDate() - 1); // add day
    const todayName = date.toLocaleDateString("en-us", { weekday: "long" }); // get day name

    // Get scheduleData from localStorage
    let scheduleData = getScheduleData(GLOBAL_STORAGE_KEY);

    console.log("HI", scheduleData);

    let todayObj = {};
    // // very efficant way to pick day instead of array fuck
    for (let i = 0; i < scheduleData.length; i++) {
      if (scheduleData[i].day === todayName) {
        todayObj = scheduleData[i];
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
      handleSetToday(workoutObj);
    }
  };

  return (
    <div>
      <h1>{today?.day}</h1>
      {/* <button
        onClick={() => {
          console.log(titleUpdate);
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
