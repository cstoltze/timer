import React from 'react';
import logo from './logo.svg';
import './App.css';
import Timers from './components/timers';
import moment from 'moment';

const App: React.FC = () => {
  return (
    <div className="App">
      <Timers />
    </div>
  );
};

export default App;
