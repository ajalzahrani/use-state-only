import create from "zustand";
import { produce } from "immer";
const GLOBAL_STORAGE_KEY = "PRO_SCHEDULE";

function getScheduleData(key) {
  const temp = JSON.parse(localStorage.getItem(key));
  return temp || [];
}

const globalSchedule = getScheduleData(GLOBAL_STORAGE_KEY);

export const useStore = create((set) => ({
  today: {},
  workoutName: "",
  exercises: [],
  addNewWorkout: (workoutObj) =>
    set(
      produce((draft) => {
        draft.today.workout = workoutObj;
      })
    ),
  addDrama: (payload) =>
    set(
      produce((draft) => {
        draft.kdramas.push({
          id: Math.floor(Math.random() * 100),
          name: payload,
        });
      })
    ),
  deleteWorkout: () =>
    set(
      produce((draft) => {
        delete draft["workout"];
      })
    ),
}));

/* HOW TO SELECT CURRENT DAY OBJECT FROM STORAGE */
const handleWhichDay = () => {
  // Get Today name
  var date = new Date();
  date.setDate(date.getDate() + 0); // add day
  const todayName = date.toLocaleDateString("en-us", { weekday: "long" }); // get day name

  let todayObj = {};
  // very efficant way to pick day instead of array fuck
  for (let i = 0; i < globalSchedule.length; i++) {
    if (globalSchedule[i].day === todayName) {
      todayObj = globalSchedule[i];
      break;
    }
  }
  return todayObj;
};

useStore.setState(() => ({ today: handleWhichDay() }));
