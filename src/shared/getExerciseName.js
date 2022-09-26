import exercises from "../database/exercises";

const getExerciseName = (id) => {
  let exername = exercises.filter((element) => {
    return element.id === id;
  });
  return exername[0].title;
};

export default getExerciseName;
