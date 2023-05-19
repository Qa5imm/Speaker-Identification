import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChooseFile from "./ChooseFile";
import Record from "./Record";
import Predictor from "./Predictor";
import RemoveFile from "./RemoveFile";

const Test = () => {
  const state = useSelector((state) => state.stateSlice);
  const [method, setMethod] = useState(0);
  const [error, setError] = useState("");
  const [predict, setPredict] = useState(false);

  const handleChoice = (e) => {
    if (e.target.id === "choose") {
      setMethod(1);
    } else if (e.target.id === "record") {
      setMethod(2);
    }
  };

  const handleSubmission = () => {
    const testRecords = state.recordings["test"];
    if (testRecords !== undefined && testRecords.length === 1) {
      // only proceed if only one test file is uploaded
      setPredict(true);
    } else {
      setError("not enough recordings");
    }
  };

  return predict ? (
    <Predictor />
  ) : (
    <div>
      <h1 className="font-bold text-3xl m-12">Speaker Identification system</h1>
      <div>
        <h1 className="font-bold m-12 text-2xl">
          Recored an audio or upload a file
        </h1>
        <div>
          <input
            onChange={handleChoice}
            className="mr-2"
            name="file-type"
            id="choose"
            value="choose"
            type="radio"
          />
          <label htmlFor="choose">Pick a file</label> <br />
          <input
            onChange={handleChoice}
            className="mr-2"
            name="file-type"
            value="record"
            id="record"
            type="radio"
          />
          <label htmlFor="record">Record an audio</label> <br />
        </div>
      </div>
      {method === 1 && <ChooseFile name={"test"} />}
      {method === 2 && <Record name={"test"} />}
      <RemoveFile name={"test"} />{" "}
      {/* to remove a file given the name of file*/}
      <button
        className="border border-2 border-black m-4 p-2"
        onClick={handleSubmission}
      >
        Predict
      </button>
      {error !== "" && <div className="text-red-500"> {error} </div>}
    </div>
  );
};

export default Test;
