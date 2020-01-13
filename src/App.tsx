import React from 'react';
import './App.css';
import Timers from './components/Timers';
import {lunchTimes} from './config';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>North Ridge Lunch Schedule</h1>
      <Timers lunchTimes={lunchTimes}/>
    </div>
  );
};

export default App;
