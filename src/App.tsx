import React from 'react';
import './App.css';
import Timers from './components/Timers';
import moment from 'moment';

const App: React.FC = () => {
  return (
    <div className="App">
      <Timers />
    </div>
  );
};

export default App;
