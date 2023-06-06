import React, { useState } from "react";
import { useSelector } from "react-redux";
import Record from "./Record";
import ChooseFile from "./ChooseFile";
import Test from "./Test";
import RemoveFile from "./RemoveFile";
const AudioMethod = () => {
  // states
  const [method, setMethod] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [usercount, setUsercount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [done, setDone] = useState(false);
  // Redux state
  const state = useSelector((state) => state.stateSlice);
  // to handle conditional reddering of components
  const handleChoice = (e) => {
    if (e.target.id === "choose") {
      setMethod(1);
      setSelectedOption(e.target.value);
    } else if (e.target.id === "record") {
      setMethod(2);
      setSelectedOption(e.target.value);
    }
  };
  const clearInputs = () => {
    // to clear all inputs fields of the page, to get info of the next person
    setName("");
    setMethod(0);
    setSelectedOption("");
    setError("");
    setUsercount((current) => current + 1);
  };

  const sendData = async (e) => {
    const defRecordings = state.recordingsNum;
    console.log(state.recordings);
    const recordObj = state.recordings;
    const actRecordings =
      Object.keys(recordObj).length !== 0 ? recordObj[name].length : 0; // number of recordings this person has added
    const usersNum = state.usersNum; // number of people that has added information
    if (
      // to check if all people has entered info, second cond (after &&) for last person
      Number(usercount) + 1 === Number(usersNum) &&
      Number(defRecordings) === Number(actRecordings)
    ) {
      setDone(true);
    } else {
      if (Number(defRecordings) !== Number(actRecordings)) {
        setError("Enter correct number of recordings");
      } else {
        clearInputs();
      }
    }
  };

  return done ? (
    <Test /> // conditional rendering -- if all conditions meet then render result page
  ) : (
    <div className="w-3/4 flex flex-col items-center">
      <div className="border-2 w-full">
        <div className="flex flex-col gap-y-2 m-auto mb-6">
          <label className="border-2 p-2 text-3xl text-start bg-gray-200">
            Enter name of this user:
          </label>
          <input
            className="border-2 p-2 rounded-md my-2 mx-6 text-2xl"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h1 className="m-12 text-3xl">
          Recored or Upload an audio
        </h1>
        <div>
          <input
            onChange={handleChoice}
            className="mr-2"
            name="file-type"
            id="choose"
            value="choose"
            checked={selectedOption === "choose"}
            type="radio"
          />
          <label htmlFor="choose" className="text-2xl">Pick a file</label> <br />
          <input
            onChange={handleChoice}
            className="mr-2"
            name="file-type"
            value="record"
            checked={selectedOption === "record"}
            id="record"
            type="radio"
          />
          <label htmlFor="record" className="text-2xl">Record an audio</label> <br />
        </div>
      </div>
      {/*file uploading methods */}
      {method === 1 && <ChooseFile name={name} />}
      {method === 2 && <Record name={name} />}
      <RemoveFile name={name} /> {/* to remove a file given the name of file*/}
      <button
        className="border-2 text-2xl p-3 rounded-md text-white bg-blue-500 m-12 w-1/3 "
        onClick={sendData}
      >
        Next User
      </button>
      {error !== "" && <div className="text-red-500 text-xl"> {error} </div>}
    </div>
  );
};

export default AudioMethod;
