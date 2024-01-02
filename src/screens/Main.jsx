import React, { useState } from "react";
import UsersInfo from "../components/UsersInfo";
import AudioMethod from "../components/AudioMethod";
import hec from "../assets/hec.png";
import csalt from "../assets/csalt.png";

const Main = () => {
  const [checkSub, setCheckSub] = useState(false);
  return (
    <div className="font-serif">
      <div className="">
        <img
          src={hec}
          alt=""
          className="h-24 ml-16 mt-16 float-left align-baseline inline-block"
        />
        <img
          src={csalt}
          alt=""
          className="h-24 mr-16  mt-16 float-right bg-gray-300 p-2 align-baseline inline-block"
        />
        <h1 className="font-bold text-5xl mt-24 text-center align-baseline inline-block">
          Speaker Identification System
        </h1>
      </div>

      <div className="flex justify-center mt-36">
        {checkSub ? <AudioMethod /> : <UsersInfo setCheckSub={setCheckSub} />}
      </div>
    </div>
  );
};

export default Main;
