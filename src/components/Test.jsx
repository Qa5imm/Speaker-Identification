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
      setError("Exactly one test recording needed");
    }
  };

  return predict ? (
    <Predictor />
  ) : (
    <div>
      <div>
        <h1 className="mb-6 text-xl md:text-2xl">
          Please enter the test file
        </h1>
        <div>
          <input
            onChange={handleChoice}
            className="mr-2 text-lg md:text-xl"
            name="file-type"
            id="choose"
            value="choose"
            type="radio"
          />
          <label htmlFor="choose"  className="text-lg md:text-xl cursor-pointer">Pick a file</label> <br />
          <input
            onChange={handleChoice}
            className="mr-2"
            name="file-type"
            value="record"
            id="record"
            type="radio"
          />
          <label htmlFor="record" className="text-lg cursor-pointer md:text-xl">Record an audio</label> <br />
        </div>
      </div>
      
      {method === 1 && <ChooseFile name={"test"} />}
      {method === 2 && <Record name={"test"} />}
      
      <RemoveFile name={"test"} />{" "}
      {/* to remove a file given the name of file*/}
      {error !== "" && <div className="text-red-500 text-md mt-2 md:text-lg"> {error} </div>}

      <button
        className="border-2 text-lg p-1 rounded-md text-white bg-blue-500 m-12 w-1/3 cursor-pointer md:text-lg md:p-2"
        onClick={handleSubmission}
      >
        Predict
      </button>
    </div>
  );
};

export default Test;
