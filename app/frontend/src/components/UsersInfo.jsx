import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  RecordingsNum, UsersNum } from "../Redux/features/state";

const UsersInfo = (props) => {
  const [usersNum, setUsersNum] = useState(0);
  const [recsNum, setRecsNum] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [error, setError] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    // input validation
    if (usersNum && recsNum) {
      props.setCheckSub(true);
      console.log("state", state);
    } else {
      // if any field is empty
      setError("Please fill all the fields");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl m-12">Speaker Identification system</h1>
      <form onSubmit={formHandler}>
        <div className="flex flex-col gap-y-2 w-1/6 m-auto mb-6">
          <label htmlFor=""> Enter Number of users </label>
          <input
            className="border border-2"
            type="number"
            min={2}
            value={usersNum !== 0 ? usersNum : ""}
            onChange={(e) => {
              setUsersNum(e.target.value);
              dispatch(UsersNum(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2 w-1/6 m-auto mb-6">
          <label htmlFor=""> Enter Number of recordings per user </label>
          <input
            className="border border-2"
            type="number"
            value={recsNum !== 0 ? recsNum : ""}
            onChange={(e) => {
              setRecsNum(e.target.value);
              dispatch(RecordingsNum(e.target.value));
            }}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>} {/* error message */}
        <input
          type="submit"
          className=" border border-2 border-black px-2 py-1 rounded-lg"
        />
      </form>
    </div>
  );
};

export default UsersInfo;
