import create from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
const GLOBAL_STORAGE_KEY = "PRO_Schedule";

const globalSchedule =
  JSON.parse(localStorage.getItem(GLOBAL_STORAGE_KEY)) || [];

let store = (set, get) => ({
  today: {},
  addNewWorkout: (workoutObj) =>
    set(
      produce((draft) => {
        draft.today.workout = workoutObj;
      })
    ),

  updateWorkout: (workoutName) =>
    set(
      produce((draft) => {
        draft.today.workout.title = workoutName;
      })
    ),
  deleteWorkout: () =>
    set(
      produce((draft) => {
        delete draft.today["workout"];
      })
    ),
  addExercise: (exerciseObj) =>
    set(
      produce((draft) => {
        let exercises = draft.today.workout.exercises;

        let isFound = false;
        for (let i = 0; i < exercises.length; i++) {
          if (exercises[i].id === exerciseObj.id) {
            isFound = true;
          }
        }

        if (!isFound) {
          exercises.push(exerciseObj);
        }

        draft.today.workout.exercises = exercises;
      })
    ),
  updateExercise: (exerId, exerciseObj) =>
    set(
      produce((draft) => {
        const index = draft.today.workout.exercises.findIndex(
          (exercise) => exercise.id === exerId
        );

        if (index !== -1) {
          draft.today.workout.exercises[index] = exerciseObj;
        }
      })
    ),
  exerciseAddFreq: (exerId, freq) =>
    set(
      produce((draft) => {
        const index = draft.today.workout.exercises.findIndex(
          (exercise) => exercise.id === exerId
        );

        if (index !== -1) {
          draft.today.workout.exercises[index].freq = freq;
        }
      })
    ),
  exerciseUpdateFreq: (exerId, freqIndex, updateValue) =>
    set(
      produce((draft) => {
        const exerciseIndex = draft.today.workout.exercises.findIndex(
          (exercise) => exercise.id === exerId
        );
        if (exerciseIndex !== -1) {
          draft.today.workout.exercises[exerciseIndex].freq[freqIndex] =
            updateValue;
        }
      })
    ),
  saveGlobalStore: () => {
    handleGlobalScheduleSave(get().today);
  },
});

export const useStore = create(store);

const handleGlobalScheduleSave = (today) => {
  for (let i = 0; i < globalSchedule.length; i++) {
    if (globalSchedule[i].day === today.day) {
      globalSchedule[i] = today;
    }
  }
  // Global schedule to the local stoarge.
  localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(globalSchedule));
};

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
