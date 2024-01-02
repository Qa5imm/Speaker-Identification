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
          className="h-20 ml-12 mt-16 float-left align-baseline inline-block"
        />
        <img
          src={csalt}
          alt=""
          className="h-20 mr-12  mt-16 float-right bg-gray-300 p-2 align-baseline inline-block"
        />
        <h1 className="font-bold text-4xl mt-24 text-center align-baseline inline-block mx-0">
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
