import React, {useEffect, useState} from 'react';
import Countdown from "react-countdown";
import {VoiceLevelInterval, VoiceLevelIntervalInfo} from "../../customTypes/Intervals"
import {isEqual} from 'lodash'

interface VoiceLevelProps {
  grade: string;
  intervals: VoiceLevelIntervalInfo[];
}


const VoiceLevel = ({ grade, intervals }: VoiceLevelProps) => {

  const [activeInterval, setActiveInterval] = useState(getActiveInterval(intervals))

  useEffect(() => {
    const timerID = setInterval(() => {
      const newActiveInterval = getActiveInterval(intervals);
      if (!isEqual(activeInterval, newActiveInterval)) {
        setActiveInterval(newActiveInterval);
      }
    }, 1000);
    return () => clearInterval(timerID);
  });

  if (!activeInterval) return <p>No active interval found for {grade}</p>;
  return (
    <div>
      <h2>{grade}</h2>
      {activeInterval && <p>{activeInterval.canTalk.toString()}</p>}
      {activeInterval.showTimer && (
        <Countdown
          date={activeInterval.end}
          renderer={({ minutes, seconds }) => (
            <h3>
            {minutes}:{seconds.toString().padStart(2, "0")}
            </h3>
          )}
        />
      )}
    </div>
  );
};

export default VoiceLevel;

// helpers


const getActiveInterval = (intervals:VoiceLevelIntervalInfo[])  => intervals
    .map(i => new VoiceLevelInterval(i))
    .find(vli => vli.inInterval());
