import React, { useState } from "react";
import { useStore } from "./store";
import { useTimer } from "react-timer-hook";

const TimeComp = ({ expiryTimestamp }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ fontSize: "50px" }}>
      <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
      <span>{seconds}</span>
    </div>
  );
};

export default TimeComp;
