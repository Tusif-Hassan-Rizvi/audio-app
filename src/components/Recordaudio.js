import React, { useState, useEffect } from 'react';

function Recordaudio() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recorde, setRecorder]=useState(null);
  const [isdownload, setIsdownload]=useState(false);
  

  const handleStart = async () => {
    // request access to the user's microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // start recording
    let recorder = new MediaRecorder(stream);
    setRecorder(recorder)
    recorder.start();

    // store the recorded audio in a blob
    const chunks = [];
    recorder.addEventListener('dataavailable', event => {
      chunks.push(event.data);
    });

    recorder.addEventListener('stop', () => {
      setAudioBlob(new Blob(chunks));
    });

    setRecording(true);
    setIsdownload(false)
  };

  const handleStop = () => {
    // stop the recording
    console.log(recorde)
    recorde.stop();
    setRecording(false);
    setIsdownload(true)
  };

  const handleSave = () => {
    // prompt the user to select a location to save the file
    const a = document.createElement('a');
    a.href = URL.createObjectURL(audioBlob);
    a.download = 'recording.mp3';
    document.body.appendChild(a);
    a.click();
  };

  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      {!recording && <button onClick={handleStart}>Start Recording</button>}
      {recording?<h1>recording.....</h1>:null}
      {recording && <button onClick={handleStop}>Stop Recording</button>}
      {isdownload?<h3>click on download button and get recorded file! </h3>:null}
      {recording?null:audioBlob && <button onClick={handleSave}>Download Recording!</button>}
    </div>
  );
  }

export default Recordaudio;
