import React, { useEffect, useCallback } from "react";
import "./App.css";
import { useStore } from "./store";
import getExerciseName from "./shared/getExerciseName";
import SessionCard from "./SessionCard";

function Session() {
  const today = useStore((state) => state.today);

  const printObj = useCallback(() => {
    console.log(today);
  });

  const time = new Date();
  time.setSeconds(time.getSeconds() + 5);

  return (
    <div className="sessionContainer">
      <div className="sessionInnerContainer">
        <button onClick={printObj}>START</button>

        <div>
          {today?.workout?.exercises?.map((exer) => {
            return (
              <SessionCard
                key={exer.id}
                title={getExerciseName(exer?.id)}
                expiryTimestamp={time}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Session;
