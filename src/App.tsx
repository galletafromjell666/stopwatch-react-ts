import React, { useState, useRef } from "react";
import TimeInput from "./components/TimeInput";

export interface Time {
  ms: number;
  s: number;
  m: number;
}

function App(): JSX.Element {
  const [time, setTime] = useState<Time>({ ms: 0, s: 0, m: 0 });
  const [alarm, setAlarm] = useState<Time | null>({ ms: 0, s: 0, m: 0 });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  function stopWatchCore(): void {
    setTime((prevState) => {
      let ms = prevState.ms + 1;
      let s = prevState.s;
      let m = prevState.m;
      if (ms === 100) {
        ms = 0;
        s = prevState.s + 1;
      }
      if (s === 60) {
        s = 0;
        m = prevState.m + 1;
      }
      return { ms, s, m };
    });
  }

  function stop(): void {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function pause(): void {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime((prevState) => ({
      ms: prevState.ms,
      s: prevState.s,
      m: prevState.m,
    }));
  }

  function resumeStart(): void {
    setIsRunning(true);
    intervalRef.current = setInterval(stopWatchCore, 10);
  }

  function reset(): void {
    setTime({ ms: 0, s: 0, m: 0 });
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  return (
    <div>
      <div>
        <h1>{`${time.m.toString().padStart(2, "0")}:${time.s
          .toString()
          .padStart(2, "0")}:${time.ms.toString().padStart(2, "0")}`}</h1>
      </div>
      {!isRunning ? (
        <button onClick={resumeStart}>Start</button>
      ) : (
        <>
          <button onClick={pause}>Pause</button>
          <button onClick={stop}>Stop</button>
        </>
      )}
      <button onClick={reset}>Reset</button>
      <TimeInput setAlarm={setAlarm} />
    </div>
  );
}

export default App;
