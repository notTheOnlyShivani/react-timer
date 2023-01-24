import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
 const [breakLength, setBreakLength] = useState(5);
 const [sessionLength, setSessionLength] = useState(25);
 const [timingType, setTimingType] = useState("SESSION");
 const [timeLeft, setTimeLeft] = useState(1500);
 const [play, setPlay] = useState(false);

const timeout = setTimeout(() => {
if (timeLeft && play) {
  setTimeLeft(timeLeft - 1)
}
}, 1000)

 const handleBreakIncrement = () => {
  if (breakLength < 60) {
    setBreakLength(breakLength + 1)
  }
 }

 const handleBreakDecrement = () => {
  if (breakLength > 1) {
    setBreakLength(breakLength - 1)
  }
 }

 const handleSessionIncrement = () => {
  if (sessionLength < 60) {
    setSessionLength(sessionLength + 1)
    setTimeLeft(timeLeft + 60);
  }
 }

 const handleSessionDecrement = () => {
  if (sessionLength > 1) {
    setSessionLength(sessionLength - 1)
    setTimeLeft(timeLeft - 60);
  }
 }

 const handleReset = () => {
  clearTimeout(timeout);
  setPlay(false);
  setTimeLeft(1500);
  setBreakLength(5);
  setSessionLength(25);
  setTimingType('SESSION')
  }

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
    }

    const resetTimer = () => {
      if (!timeLeft && timingType === "SESSION") {
        setTimeLeft(breakLength * 60);
        setTimingType("Break")
      }
      if (!timeLeft && timingType === "Break") {
        setTimeLeft(sessionLength * 60);
        setTimingType("SESSION")
      }
     }

     const clock = () => {
      if(play) {
        resetTimer ()
      } else {
        clearTimeout(timeout)
      }
     }

     useEffect(() => {
      clock()
     }, [play, timeLeft, timeout])

 const timeFormatter = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedMinutes}:${formattedSeconds}`;
 }

const title = timingType === "SESSION" ? "Session" : "Break";

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div id="break-label">
        <h2>Break Length</h2>
        <div id="break-container">
        <button id="break-increment" onClick={handleBreakIncrement}><i class="fa-solid fa-plus"></i></button>
        <div id="break-length">{breakLength}</div>
        <button id="break-decrement" onClick={handleBreakDecrement}><i className="fa-solid fa-minus"></i></button>
        </div>
      </div>
      <div id="session-label">
        <h2>Session Length</h2>
        <div id="session-container">
        <button id="session-increment" onClick={handleSessionIncrement}><i class="fa-solid fa-plus"></i></button>
        <div id="session-length">{sessionLength}</div>
        <button id="session-decrement" onClick={handleSessionDecrement}><i className="fa-solid fa-minus"></i></button>
        </div>
      </div>
      <div id="timer-label">
        <div className="timer-container">                                 
        <h2 id="title">{title}</h2>
        <p id="time-left">{timeFormatter()}</p>
        </div>
        <button id="start_stop" onClick={handlePlay}><i class="fa-solid fa-play"></i><i class="fa-solid fa-pause"></i></button>
        <button id="reset" onClick={handleReset}><i class="fa-solid fa-repeat"></i></button>
      </div>
    </div>
  );
}

export default App;
