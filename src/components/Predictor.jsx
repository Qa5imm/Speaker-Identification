import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
const Predictor = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const state = useSelector((state) => state.stateSlice);

  useEffect(() => {
    const recordingsObj = state.recordings;
    const usersNum = state.usersNum;
    const recordingsNum = state.recordingsNum;
    const allNames = Object.keys(recordingsObj);
    const allFilesNested = Object.values(recordingsObj);
    const allFiles = allFilesNested.flat(Infinity); // to flattern nested array of files
    // formData- to construct data in key-value pairs
    let formData = new FormData();
    // encoding all files
    allFiles.forEach((file) => {
      formData.append("file_uploads", file);
    });
    // encoding all names
    allNames.forEach((name) => {
      formData.append("names", name);
    });
    formData.append("usersNum", usersNum);
    formData.append("recordingsNum", recordingsNum);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(`${BASE_URL}/predict/`, formData, headers)
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          setResult(res.data.result);
        } else {
          setError(res.data.error);
        }
      });
  }, [state.recordings, state.usersNum, state.recordingsNum]);

  return loading ? (
    <div className="text-xl m-16 md:text-3xl">Files are being processed, please wait...</div>
  ) : (
    <div>
      {error !== "" ? ( // if there's an error in data provided
        <p className="text-red-500"> {error} </p>
      ) : (
        <p className="text-xl mt-16 mb-12 mx-16 md:text-2xl ">Recording belongs to {result}</p>
      )}
      <button className="border-2 text-lg p-2 rounded-md text-white bg-blue-500 m-12 md:p-2 md:text-lg" onClick={(e)=> window.location.reload(false)} >
        Start Again
      </button>


    </div>
  );
};

export default Predictor;
