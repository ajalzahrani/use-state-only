import React, { useEffect, useState } from "react";

export const SetController = ({ addFreq }) => {
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [chkbox, setChkbox] = useState(false);

  const handleOnChangeSet = (e) => {
    setSets(e.target.value);
  };

  const handleOnChangeRep = (e) => {
    setReps(e.target.value);
  };

  function save() {
    let arry = [];
    for (let i = 0; i < sets; i++) {
      arry.push(reps);
    }
    addFreq(arry);
  }

  const handleChangeChk = () => {};

  //   useEffect(() => {
  //     save();
  //   }, [sets, reps]);

  return (
    <div>
      <div className="setcontroller">
        <input className="numberInput" onChange={handleOnChangeSet} />
        Sets
        <input
          type="checkbox"
          defaultChecked={chkbox}
          onChange={handleChangeChk}
        />
      </div>
      <div className="setcontroller">
        <input className="numberInput" onChange={handleOnChangeRep} />
        reps
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
};
