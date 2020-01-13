import React, { useEffect, useState } from "react";
import moment from "moment";
import Countdown from "react-countdown";

export interface TimerProps {
  expiration: moment.Moment;
}

function getTimeLeft(expiration: moment.Moment): moment.Duration {
  return moment.duration(
    expiration.diff(moment().diff(moment().startOf("day")))
  );
}

const Timer = ({ expiration }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiration));

  useEffect(() => {
    var timerID = setInterval(() => {
      setTimeLeft(getTimeLeft(expiration));
    }, 1000);
    return () => clearInterval(timerID);
  }, [expiration]);

  return (
    <div>
      {timeLeft.hours()}:{timeLeft.minutes()}:{timeLeft.seconds()}
    </div>
  );
};

export default Timer;
