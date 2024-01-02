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
    <div className="w-3/4 flex flex-col content-center">
      <hr />
      <form onSubmit={formHandler} className="w-full border-2  ">
        <div className="flex flex-col gap-y-2 m-auto mb-6">
          <label className="border-2 p-2 text-2xl text-start bg-gray-200"> Enter the number of users: </label>
          <input
            className="border-2 p-2 rounded-md my-2 mx-6  text-2xl"
            type="number"
            min={2}
            value={usersNum !== 0 ? usersNum : ""}
            onChange={(e) => {
              setUsersNum(e.target.value);
              dispatch(UsersNum(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2 m-auto mb-6">
          <label className="border-2 p-2 text-2xl text-start bg-gray-200"> Enter the number of recordings per user: </label>
          <input
            className="border-2 p-2 rounded-md my-2 mx-6 text-2xl"
            type="number"
            value={recsNum !== 0 ? recsNum : ""}
            onChange={(e) => {
              setRecsNum(e.target.value);
              dispatch(RecordingsNum(e.target.value));
            }}
          />
        </div>
        <input
          type="submit"
          className="border-2 text-xl p-3 rounded-md text-white bg-blue-500 mb-4 cursor-pointer"
        />
      </form>
      {error && <p className="text-red-500 mt-6 text-2xl">{error}</p>} {/* error message */}
    </div>
  );
};

export default UsersInfo;
