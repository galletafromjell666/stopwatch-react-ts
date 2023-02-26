import React, { Dispatch, SetStateAction, useState } from "react";
import { Alarm } from "../App";
import Button from "./Button";

interface Props {
  setAlarm: Dispatch<SetStateAction<Alarm>>;
}

function TimeInput({ setAlarm }: Props): JSX.Element {
  const [formState, setFormState] = useState<Alarm>({
    time: { ms: 0, s: 0, m: 0 },
    isAlarmSet: false,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      time: { ...prevState.time, [name]: value },
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAlarm({ ...formState, isAlarmSet: true });
    const { m, s, ms } = formState.time;
    alert(`Alarm set in: \n${m} minutes ${s} seconds ${ms} miliseconds`);
  }

  const inputClassName =
    "w-[4rem] sm:w-[10rem] text-center text-[2rem] sm:text-[5rem] md:text-[7rem] bg-slate-50";

  return (
    <div>
      <form
        className="flex flex-grow justify-around my-8 bg-slate-50 rounded-lg "
        onSubmit={handleSubmit}
      >
        <div className="flex items-center">
          <input
            className={inputClassName}
            type="number"
            name="m"
            min="00"
            max="99"
            step="1"
            value={formState.time.m}
            onChange={handleChange}
          />
          <label className="align-middle text-[2rem]" htmlFor="m">
            m
          </label>
        </div>
        <div className="flex items-center">
          <input
            className={inputClassName}
            type="number"
            name="s"
            min="00"
            max="59"
            step="1"
            value={formState.time.s}
            onChange={handleChange}
          />
          <label className="align-middle text-[2rem]" htmlFor="s">
            s
          </label>
        </div>
        <div className="flex items-center">
          <input
            className={inputClassName}
            type="number"
            name="ms"
            min="00"
            max="999"
            step="1"
            value={formState.time.ms}
            onChange={handleChange}
          />
          <label className="align-middle text-[2rem]" htmlFor="ms">
            ms
          </label>
        </div>
      </form>
      <div></div>
      <div className="flex flex-grow justify-center">
        <Button onClick={handleSubmit} text={"Set Alarm"} />
      </div>
    </div>
  );
}

export default TimeInput;
