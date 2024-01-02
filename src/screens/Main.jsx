import React, { useState } from "react";
import UsersInfo from "../components/UsersInfo";
import AudioMethod from "../components/AudioMethod";
import hec from "../assets/hec.png";
import csalt from "../assets/csalt.png";

const Main = () => {
  const [checkSub, setCheckSub] = useState(false);
  return (
    <div className="font-serif mx-4">
      <div className="flex justify-between items-center gap-x-2 mt-16 md:justify-around">
        <img src={hec} alt="" className="h-12 md:h-20" />
        <div>
          <h1 className="font-bold text-center text-lg md:text-4xl">
            Speaker Identification System
          </h1>
        </div>
        <img
          src={csalt}
          alt=""
          className="h-12  bg-gray-300 p-2 md:h-20 "
        />
      </div>

      <div className="flex justify-center mt-36">
        {checkSub ? <AudioMethod /> : <UsersInfo setCheckSub={setCheckSub} />}
      </div>
    </div>
  );
};

export default Main;
