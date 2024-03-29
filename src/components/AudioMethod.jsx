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
      Object.keys(recordObj).length !== 0 ? recordObj[name]?.length : 0; // number of recordings this person has added
    const usersNum = state.usersNum; // number of people that has added information
    if (
      // to check if all people has entered info, second cond (after &&) for last person
      Number(usercount) + 1 === Number(usersNum) &&
      Number(defRecordings) === Number(actRecordings)
    ) {
      setDone(true);
    } else {
      if (Number(defRecordings) !== Number(actRecordings)) {
        setError("Enter correct number of recordings per user");
      } else {
        clearInputs();
      }
    }
  };

  return done ? (
    <Test /> // conditional rendering -- if all conditions meet then render result page
  ) : (
    <div className="w-full flex flex-col items-center md:w-3/4">
      <div className="border-2 w-full">
        <div className="flex flex-col gap-y-2 m-auto mb-6">
          <label className="border-2 p-2 text-lg text-start bg-gray-200 md:text-2xl">
            Enter name of this user:
          </label>
          <input
            className="border-2 p-1 rounded-md my-1 mx-2  text-lg md:text-2xl md:mx-6 md:p-1 md:my-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h1 className="m-12 text-xl md:text-2xl">
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
          <label htmlFor="choose" className="text-lg cursor-pointer md:text-xl">Pick a file</label> <br />
          <input
            onChange={handleChoice}
            className="mr-2"
            name="file-type"
            value="record"
            checked={selectedOption === "record"}
            id="record"
            type="radio"
          />
          <label htmlFor="record" className="text-lg cursor-pointer md:text-xl">Record an audio</label> <br />
        </div>
      </div>
      {error !== "" && <div className="text-red-500 text-lg mt-2 md:text-xl"> {error} </div>}
      {/*file uploading methods */}
      {method === 1 && <ChooseFile name={name} />}
      {method === 2 && <Record name={name} />}
      <RemoveFile name={name} /> {/* to remove a file given the name of file*/}
      <button
        className="border-2 text-lg p-1 rounded-md text-white bg-blue-500 m-8 w-1/2 md:w-1/4 md:text-xl md:p-2"
        onClick={sendData}
      >
        Next User
      </button>
    </div>
  );
};

export default AudioMethod;
