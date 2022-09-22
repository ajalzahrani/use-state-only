import { useState } from "react";
import React from "react";
import { useStore } from "./store";

const Customset = ({ index, set, exerId }) => {
  const [editing, setEditing] = useState(false);
  const [setUpdate, setSETUpdate] = useState(set);

  const exerciseUpdateFreq = useStore((state) => state.exerciseUpdateFreq);

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
      exerciseUpdateFreq(exerId, index, setUpdate);
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
