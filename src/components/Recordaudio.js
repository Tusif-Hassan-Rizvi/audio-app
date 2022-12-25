import React, { useState} from "react";
import { saveAs } from 'file-saver';


function Recordaudio() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recorde, setRecorde] = useState(null);
  const [isdownload, setIsdownload] = useState(false);
  const [audiolink, setAudiolink] = useState("");

  const handleStart = async () => {
    // request access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // start recordingnpm 
    let recorder = new MediaRecorder(stream);
    setRecorde(recorder);
    recorder.start();

    // store the recorded audio in a blob
    const chunks = [];
    recorder.addEventListener("dataavailable", (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener("stop", () => {
      setAudioBlob(new Blob(chunks));
      setAudiolink(URL.createObjectURL(new Blob(chunks)));
    });

    setRecording(true);
    setIsdownload(false);
  };

  const handleStop = () => {
    // stop the recording
    recorde.stop();
    setRecording(false);
    setIsdownload(true);
  };

  const handleSave = () => {
    let fileURL=URL.createObjectURL(audioBlob);
    let fileName="recording.mp3";
    saveAs(fileURL, fileName);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {!recording && <button onClick={handleStart}>Start Recording</button>}
      {recording ? <h1>recording.....</h1> : null}
      {recording && <button onClick={handleStop}>Stop Recording</button>}
      {isdownload ? (
        <>
          <h3>click on download button and get recorded file! </h3>
          <audio controls src={audiolink}>
          </audio>
        </>
      ) : null}
      {recording
        ? null
        : audioBlob && (
            <button onClick={handleSave}>Download Recording!</button>
          )}
    </div>
  );
}

export default Recordaudio;