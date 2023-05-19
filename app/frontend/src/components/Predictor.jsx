import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Predictor = () => {
  const state = useSelector((state) => state.stateSlice);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

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
    console.log(allFiles, allNames, usersNum, recordingsNum);
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(`http://localhost:8000/predict`, formData, headers)
      .then((res) => {
        setLoading(false);
        if (res.data.result) {
          setResult(res.data.result);
        } else {
          setError(res.data.error);
        }
      });
  }, []);

  return loading ? (
    <div>Files are being processed, please wait</div>
  ) : (
    <div>
      {error !== "" ? ( // if there's an error in data provided
        <p className="text-red-500"> {error} </p>
      ) : (
        <p className="font-bold m-16">Recording belongs to {result}</p>
      )}
    </div>
  );
};

export default Predictor;
