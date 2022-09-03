import { useEffect, useState, Button } from "react";
import React from "react";

const Customset = ({ index, set, freq, addFreq }) => {
  const [editing, setEditing] = useState(false);
  const [setUpdate, setSETUpdate] = useState(set);

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

  const handleEditingDone = (event, index) => {
    console.log("handleEditDone Called");
    if (event.key == "Enter") {
      setEditing(false);

      // search for the item in freq array by the index
      // Update the value with setUpdate prop
      // Call addFreq to make general update on the workout.
      let updatedFreq = freq;
      updatedFreq[index] = setUpdate;
      addFreq(updatedFreq);
    }
  };

  return (
    <div>
      <div onDoubleClick={handleEditingStyle} style={viewMode}>
        <li>{set}</li>
      </div>

      <input
        type="text"
        style={editMode}
        defaultValue={set}
        onChange={(e) => setSETUpdate(e.target.value)}
        onKeyDown={(e) => handleEditingDone(e, index)}
      />
    </div>
  );
};

export default Customset;
