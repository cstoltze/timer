import React, {useEffect, useState} from 'react';
import {isEqual} from 'lodash';
import {LunchSchedule, LunchScheduleInfo} from "../../customTypes/Intervals"
import VoiceLevel from "../VoiceLevel"
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export interface TimersProps {
  lunchTimes: LunchScheduleInfo[];
}

const Timers = ({lunchTimes}: TimersProps) => {
  const getGradesAtLunch = (lunchTimes: LunchScheduleInfo[]): Set<string> =>
    new Set(lunchTimes.map(t=> new LunchSchedule(t)).filter(t => t.atLunch()).map(t => t.grade));

  const [gradesAtLunch, setGradesAtLunch] = useState(
    getGradesAtLunch(lunchTimes),
  );

  useEffect(() => {
    const timerID = setInterval(() => {
      const newGradesAtLunch = getGradesAtLunch(lunchTimes);
      if (!isEqual(gradesAtLunch, newGradesAtLunch)) {
        setGradesAtLunch(newGradesAtLunch);
      }
    }, 1000);
    return () => clearInterval(timerID);
  });

  return (
    <Wrapper>
    {lunchTimes
      .filter(lunchTime => gradesAtLunch.has(lunchTime.grade))
      .map(t => (
        <VoiceLevel
        key={t.grade}
        grade={t.grade}
        intervals={t.intervals}
      />
      ))}
    </Wrapper>
  );
};

export default Timers;
