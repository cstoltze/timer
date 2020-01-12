import React from "react";
import moment from "moment";
import Countdown from "react-countdown";

export interface TimersProps {
  lunchTimes: LunchSchedule[];
}
// For example 3:15 AM to 4:10 AM. This interval repreats daily.
// This naive implementation doesn't behave well across midnight.
class WallClockInterval {
  static timeFormat = "hh:mm a";
  private startTime: string;
  private endTime: string;

  constructor(start: string, end: string) {
    this.startTime = start;
    this.endTime = end;
  }

  get start(): Date {
    return moment(this.startTime, WallClockInterval.timeFormat).toDate();
  }

  get end(): Date {
    return moment(this.endTime, WallClockInterval.timeFormat).toDate();
  }

  inInterval = (): boolean => moment().isBetween(this.start, this.end);
}

class VoiceLevelInterval extends WallClockInterval {
  canTalk: boolean;
  showTimer: boolean;

  constructor({ start, end, canTalk, showTimer }: VoiceLevelIntervalInfo) {
    super(start, end);
    this.canTalk = canTalk;
    this.showTimer = showTimer;
  }
}

interface Interval {
  start: string;
  end: string;
}

interface VoiceLevelProps {
  grade: string;
  intervals: VoiceLevelIntervalInfo[];
}

interface VoiceLevelIntervalInfo extends Interval {
  canTalk: boolean;
  showTimer: boolean;
}

export interface LunchSchedule extends VoiceLevelIntervalInfo {
  lunchTime: Interval;
}

const VoiceLevel = ({ grade, intervals }: VoiceLevelProps) => {
  const activeInterval = intervals
    .map(i => new VoiceLevelInterval(i))
    .find(vli => vli.inInterval());

  if (!activeInterval) return <p>No active interval found for {grade}</p>;

  return (
    <div>
      <p>{grade}</p>
      {activeInterval.showTimer && (
        <Countdown
          date={activeInterval.end}
          renderer={({ minutes, seconds }) => (
            <p>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          )}
        />
      )}
    </div>
  );
};

export default VoiceLevel;
