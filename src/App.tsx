import { useState, useRef } from "react";
import Button from "./components/Button";
import TimeInput from "./components/TimeInput";
import "./index.css";
interface Time {
  ms: number;
  s: number;
  m: number;
}

export interface Alarm {
  time: Time;
  isAlarmSet: boolean;
}

function App(): JSX.Element {
  const [time, setTime] = useState<Time>({ ms: 0, s: 0, m: 0 });
  const [alarm, setAlarm] = useState<Alarm>({
    time: { ms: 0, s: 0, m: 0 },
    isAlarmSet: false,
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showAlarm, setShowAlarm] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const alertRef = useRef<HTMLDivElement>(null);

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
      if (
        alarm.isAlarmSet &&
        !showAlarm &&
        m >= alarm.time.m &&
        s >= alarm.time.s &&
        ms >= alarm.time.ms
      ) {
        setShowAlarm(true);
        alertRef.current?.classList.remove("hidden");
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
    setShowAlarm(false);
    alertRef.current?.classList.remove("hidden");
  }

  return (
    <div
      className={`${
        showAlarm ? "bg-rose-700" : "bg-gray-200"
      } container mx-auto rounded-xl shadow border p-8 m-10`}
    >
      <div className="hidden h-[2rem] my-4" ref={alertRef}>
        {showAlarm && <h1 className="text-3xl text-center ">🚨 TIMEOUT 🚨</h1>}
      </div>
      <div className="text-center text-[4rem] sm:text-[7rem] md:text-[10rem]">
        <h1 className="text-xl">Minutes : seconds : milliseconds</h1>
        <h1>{`${time.m.toString().padStart(2, "0")}:${time.s
          .toString()
          .padStart(2, "0")}:${time.ms.toString().padStart(2, "0")}`}</h1>
      </div>

      <div className="flex flex-grow justify-around my-6">
        {!isRunning ? (
          <Button onClick={resumeStart} text={"Start"} />
        ) : (
          <>
            <Button onClick={pause} text={"Pause"} />
            <Button onClick={stop} text={"Stop"} />
          </>
        )}
        <Button onClick={reset} text={"Reset"} />
      </div>
      <TimeInput setAlarm={setAlarm} />
    </div>
  );
}

export default App;
