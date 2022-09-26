import "./App.css";
import Schedule from "./Schedule";
import Session from "./Session";
import ScheduleObject from "./database/ScheduleObject";

function App() {
  // localStorage.setItem("PRO_Schedule", JSON.stringify(ScheduleObject));
  return (
    <div className="App">
      <Schedule />
      <Session />
    </div>
  );
}

export default App;
