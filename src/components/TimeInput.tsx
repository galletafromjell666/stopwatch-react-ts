import React, { Dispatch, SetStateAction, useState } from "react";
import { Time } from "../App";

interface Props{
  setAlarm: Dispatch<SetStateAction<Time | null>>
}

function TimeInput({setAlarm}: Props): JSX.Element {
  const [time, setTime] = useState<Time>({
    m: 0,
    s: 0,
    ms: 0,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTime((prevState) => ({ ...prevState, [name]: value }));
    console.log(time);
  }

  return (
    <div>
      <input
        type="number"
        name="m"
        min="0"
        step="1"
        value={time.m}
        onChange={handleChange}
      />
      <label htmlFor="minutes">minutes</label>
      <input
        type="number"
        name="s"
        min="0"
        max="59"
        step="1"
        value={time.s}
        onChange={handleChange}
      />
      <label htmlFor="seconds">seconds</label>
      <input
        type="number"
        name="ms"
        min="0"
        max="999"
        step="1"
        value={time.ms}
        onChange={handleChange}
      />
      <label htmlFor="milliseconds">milliseconds</label>
    </div>
  );
}

export default TimeInput;
