import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Recordings } from "../Redux/features/state";

const AudioRecorder = (props) => {
  const dispatch = useDispatch();

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState("");
  const [recordedAudioBlob, setRecordedAudioBlob] = useState("");

  // const beginRecording = async () =>{
  //   await startRecording()
  //   await stopRecording()
  //   await startRecording()

  // }

  const startRecording = () => {
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

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      audioChunksRef.current.push(event.data);
    }
  };

  const stopRec = async () => {
    await stopRecording();
    await startRecording();
    setTimeout(() => {
      stopRecording();
    }, 100);

    const elem1 = document.getElementById("startRecBtn");
    elem1.setAttribute("hidden", true);
    const elem2 = document.getElementById("stopRecBtn");
    elem2.setAttribute("hidden", true);

    const elem3 = document.getElementById("audioTag");
    elem3.hidden = false;
    const elem4 = document.getElementById("uploadBtn");
    elem4.hidden = false;
  };
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setRecordedAudioBlob(audioBlob);

      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordedAudioUrl(audioUrl);

      console.log(audioBlob);
      // console.log(audioUrl)

      // const audioFile = new File([audioBlob], "recorded_audio.wav", {
      //   type: "audio/wav",
      //   lastModified: new Date().getTime(),
      // });
    }
  };

  // const downloadRecording = () => {
  //   if (recordedAudioUrl) {
  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = recordedAudioUrl;
  //     downloadLink.download = "recorded_audio.wav";
  //     downloadLink.click();
  //   }
  // };

  const uploadRecording = () => {
    // console.log(audioBlob)
    //   // console.log(audioUrl)

    console.log(recordedAudioBlob);

    // dispatch(Recordings({ name: props.name, file: audioChunksRef.current })); // saving direct chunks in redux
    // dispatch(Recordings({ name: props.name, file: recordedAudioBlob })); // saving generated blob in redux

    const audioFile = new File([recordedAudioBlob], "recorded_audio.wav", {
      type: "audio/wav",
      lastModified: new Date().getTime(),
    });

    console.log(audioFile);

    dispatch(Recordings({ name: props.name, file: audioFile })); // saving file in redux

    resetState();
  };

  const resetState = () => {
    const elem1 = document.getElementById("startRecBtn");
    elem1.hidden = false;
    const elem2 = document.getElementById("stopRecBtn");
    elem2.hidden = false;

    const elem3 = document.getElementById("audioTag");
    elem3.hidden = true;
    const elem4 = document.getElementById("uploadBtn");
    elem4.hidden = true;

    setIsRecording(false);
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    audioElementRef.current = null;
    setRecordedAudioUrl("");
    setRecordedAudioBlob("");
  };

  return (
    <div>
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="border border-2 p-1 m-2"
        id="startRecBtn"
        hidden={false}
      >
        Start Recording
      </button>
      <button
        onClick={stopRec}
        disabled={!isRecording}
        className="border border-2 p-1 m-2"
        id="stopRecBtn"
        hidden={false}
      >
        Stop Recording
      </button>
      {/* <button onClick={downloadRecording} disabled={!recordedAudioUrl}>
        Download Recording
      </button> */}
      <audio
        ref={audioElementRef}
        src={recordedAudioUrl}
        id="audioTag"
        controls
        hidden={true}
      />
      <button onClick={uploadRecording}  className="border border-2 p-1 m-2" id="uploadBtn" hidden={true}>
        Upload Recording
      </button>
    </div>
  );
};

export default AudioRecorder;
