import React from "react";
import "./App.css";
import Timers from "./components/Timers";
import { lunchTimes } from "./config";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
`;

const TimerDiv = styled.div`
  flex-grow: 1;
`;

const App: React.FC = () => {
  return (
    <Wrapper className="App">
      <h1>North Ridge Lunch Schedule</h1>
      <TimerDiv>
        <Timers lunchTimes={lunchTimes} />
      </TimerDiv>
    </Wrapper>
  );
};

export default App;
