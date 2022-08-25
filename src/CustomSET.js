import { useEffect, useState, Button } from "react";
import React from "react";

const Customset = ({ set }) => {
  return (
    <div>
      {set?.map((set) => (
        <li>{set}</li>
      ))}
    </div>
  );
};

export default Customset;
