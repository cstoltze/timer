import React, {useEffect, useState} from 'react';
import Countdown from "react-countdown";
import {VoiceLevelInterval, VoiceLevelIntervalInfo} from "../../customTypes/Intervals"
import {isEqual} from 'lodash'
import styled from 'styled-components'

interface WrapperProps {
  canTalk: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color:  ${props => props.canTalk ? " #99ff99" : "#ffb3b3"};
  padding: 3em;
`

const Header = styled.h1`
  font-size: 100px;
  margin: 1em;
  padding: 0;
`

const Clock = styled.p`
  font-size: 100px;
  margin: 1em;
  padding: 0;
`

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

  if (!activeInterval) return null;
  return (
    <Wrapper canTalk={activeInterval.canTalk} >
      <Header>{grade}</Header>
      {activeInterval.showTimer && (
        <Countdown
          date={activeInterval.end}
          renderer={({ minutes, seconds }) => (
            <Clock>
            {minutes}:{seconds.toString().padStart(2, "0")}
            </Clock>
          )}
          />
      )}
    </Wrapper>
  );
};

export default VoiceLevel;

// helpers


const getActiveInterval = (intervals:VoiceLevelIntervalInfo[])  => intervals
    .map(i => new VoiceLevelInterval(i))
    .find(vli => vli.inInterval());
