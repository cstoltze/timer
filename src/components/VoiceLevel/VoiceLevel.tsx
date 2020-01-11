import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';
import {isEqual} from 'lodash';

export interface TimersProps {
  lunchTimes: LunchSchedule[];
}
// For example 3:15 AM to 4:10 AM. This interval repreats daily.
// This naive implementation doesn't behave well across midnight.
class WallClockInterval {
  constructor(start: string, end: string) {
    this.startTime = start;
    this.endTime = end;
  }

  static timeFormat = 'hh:mm a';
  private startTime: string;
  get start(): Date {
    return moment(this.startTime, WallClockInterval.timeFormat).toDate();
  }

  private endTime: string;
  get end(): Date {
    return moment(this.endTime, WallClockInterval.timeFormat).toDate();
  }

  inInterval = (): boolean => moment().isBetween(this.start, this.end);
}

interface WallClockIntervalInterface {
  start: string;
  end: string;
}

export interface LunchSchedule {
  grade: string;
  lunchTime: WallClockIntervalInterface;
  voiceLevelIntervals: VoiceLevelIntervalInfo[];
}

class VoiceLevelInterval extends WallClockInterval {
  constructor(
    start: string,
    end: string,
    canTalk: boolean,
    showTimer: boolean,
  ) {
    super(start, end);
    this.canTalk = canTalk;
    this.showTimer = showTimer;
  }
  canTalk: boolean;
  showTimer: boolean;
}

interface VoiceLevelProps {
  grade: string;
  intervals: VoiceLevelIntervalInfo[];
}

interface VoiceLevelIntervalInfo {
  start: string;
  end: string;
  canTalk: boolean;
  showTimer: boolean;
}

const VoiceLevel = ({grade, intervals}: VoiceLevelProps) => {
  const activeInterval = intervals
    .map(i => new VoiceLevelInterval(i.start, i.end, i.canTalk, i.showTimer))
    .find(vli => vli.inInterval());

  if (!activeInterval) return <p>No active interval found for {grade}</p>;

  return (
    <div>
      <p>{grade}</p>
      {activeInterval.showTimer && (
        <Countdown
          date={activeInterval.end}
          renderer={({minutes, seconds}) => (
            <p>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          )}
        />
      )}
    </div>
  );
};

export default VoiceLevel;
