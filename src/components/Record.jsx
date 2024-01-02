import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Recordings } from "../Redux/features/state";
import Timer from "./Timer";

const AudioRecorder = (props) => {
  // redux state
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stateSlice);

  const recordObj = state.recordings;

  // states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComp, setRecordingComp] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioElementRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState("");
  const [recordedAudioBlob, setRecordedAudioBlob] = useState("");

  // Helper Functions
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      audioChunksRef.current.push(event.data);
    }
  };
  const resetState = () => {
    setIsRecording(false);
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    audioElementRef.current = null;
    setRecordedAudioUrl("");
    setRecordedAudioBlob("");
  };
  const startRecording = () => {
    resetState();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };
  const stopRecording = () => {
    console.log("stop");
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/ogg" });
      setRecordedAudioBlob(audioBlob);

      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordedAudioUrl(audioUrl);
      setRecordingComp(true);
      setIsRecording(false);
    }
  };

  const stopRec = async () => {
    stopRecording();
    startRecording();
    setTimeout(() => {
      stopRecording();
    }, 100);
  };

  const uploadRecording = () => {
    const audioFile = new File(
      [recordedAudioBlob],
      `${
        recordObj[props.name] !== undefined
          ? recordObj[props.name].length + 1
          : 1
      }_recorded.ogg`,
      {
        type: "audio/ogg",
        lastModified: new Date().getTime(),
      }
    );
    setRecordingComp(false)
    dispatch(Recordings({ name: props.name, file: audioFile })); // saving file in redux
    
  };

  return (
    <div>
      <button
        className="bg-orange-500 rounded m-4 border-2 px-2 py-1 text-white text-lg hover:bg-orange-200"
        disabled={isRecording}
        onClick={startRecording}
      >
        Start
      </button>
      <button
        className="bg-orange-500 rounded m-4 border-2 px-2 py-1 text-white text-lg hover:bg-orange-200"
        disabled={!isRecording}
        onClick={stopRec}
      >
        Stop
      </button>
      <button
        hidden={!recordingComp}
        onClick={uploadRecording}
        className="bg-orange-500 rounded m-4 border-2 px-2 py-1 text-white text-lg hover:bg-orange-200"
      >
        Upload
      </button>
      <audio
        hidden={!recordingComp}
        ref={audioElementRef}
        src={recordedAudioUrl}
        controls
      />
      {isRecording && <Timer />}
    </div>
  );
};

export default AudioRecorder;
