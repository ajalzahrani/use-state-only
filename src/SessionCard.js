import React, { useCallback, useState } from "react";
import { useStore } from "./store";
import { useTimer } from "react-timer-hook";
import TimeComp from "./TimeComp";

const SessionCard = ({ title }) => {
  const [isPress, setIsPress] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState({});

  const startTimer = useCallback(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 5);
    setExpiryTimestamp(time);
    setIsPress(!isPress);
  }, [isPress]);
  return (
    <div className="sessoinCardContainer">
      <div className="cardTitle">
        <button onClick={startTimer}>Done</button>
        <div>{title}</div>
      </div>
      {isPress && <TimeComp expiryTimestamp={expiryTimestamp} />}
    </div>
  );
};

export default SessionCard;
