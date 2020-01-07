import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';
import {isEqual} from 'lodash';

export interface TimersProps {
  lunchTimes: LunchSchedule[];
}

class LunchSchedule {
  constructor(
    grade: string,
    lunchTime: WallClockInterval,
    voiceLevelIntervals: VoiceLevelInterval[],
  ) {
    this.grade = grade;
    this.lunchTime = lunchTime;
    this.voiceLevelIntervals = voiceLevelIntervals;
  }
  grade: string;
  lunchTime: WallClockInterval;
  atLunch: () => boolean = this.lunchTime.inInterval;
  voiceLevelIntervals: VoiceLevelInterval[];
}

// WallClockInterval represents the interval between two times
//
// For example 3:15 AM to 4:10 AM. This interval repreats daily.
// This naive implementation doesn't behave well across midnight.
class WallClockInterval {
  constructor(start: string, end: string) {
    this._startTime = start;
    this._endTime = end;
  }

  private _startTime: string;
  get start(): Date {
    return moment(this._startTime, timeFormat).toDate();
  }

  private _endTime: string;
  get end(): Date {
    return moment(this._endTime, timeFormat).toDate();
  }

  inInterval = (): boolean => moment().isBetween(this.start, this.end);
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

const timeFormat = 'hh:mm a';
const lunchTimes: LunchSchedule[] = [
  new LunchSchedule(
    'Kindergarten',
    new WallClockInterval('10:55 am', '11:30 am'),
    [
      new VoiceLevelInterval('10:55 am', '11:05 am', false, true),
      new VoiceLevelInterval('11:05 am', '11:25 am', true, true),
      new VoiceLevelInterval('11:25 am', '11:30 am', false, false),
    ],
  ),
  new LunchSchedule('First', new WallClockInterval('11:35 am', '12:05 pm'), [
    new VoiceLevelInterval('11:35 am', '11:45 am', false, true),
    new VoiceLevelInterval('11:45 am', '12:00 pm', true, true),
    new VoiceLevelInterval('12:00 pm', '12:05 pm', false, false),
  ]),
  new LunchSchedule('Second', new WallClockInterval('12:35 pm', '01:05 pm'), [
    new VoiceLevelInterval('12:35 pm', '12:45 pm', false, true),
    new VoiceLevelInterval('12:45 pm', '01:00 pm', true, true),
    new VoiceLevelInterval('01:00 pm', '01:05 pm', false, false),
  ]),
  new LunchSchedule('Third', new WallClockInterval('11:25 am', '11:55 am'), [
    new VoiceLevelInterval('11:25 am', '11:35 am', false, true),
    new VoiceLevelInterval('11:35 am', '11:50 am', true, true),
    new VoiceLevelInterval('11:50 am', '11:55 am', false, false),
  ]),
  new LunchSchedule('Fourth', new WallClockInterval('12:20 pm', '12:50 pm'), [
    new VoiceLevelInterval('12:20 pm', '12:30 pm', false, true),
    new VoiceLevelInterval('12:30 pm', '12:45 pm', true, true),
    new VoiceLevelInterval('12:45 pm', '12:50 pm', false, false),
  ]),
  new LunchSchedule('Fifth', new WallClockInterval('11:55 am', '12:30 pm'), [
    new VoiceLevelInterval('11:55 am', '12:05 pm', false, true),
    new VoiceLevelInterval('12:05 pm', '12:25 pm', true, true),
    new VoiceLevelInterval('12:25 pm', '12:30 pm', false, false),
  ]),
];

const Timers = ({lunchTimes}: TimersProps) => {
  const getGradesAtLunch = (lunchTimes: LunchSchedule[]): Set<string> =>
    new Set(lunchTimes.filter(t => t.atLunch()).map(t => t.grade));

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
    <div>
      {lunchTimes
        .filter(lunchTime => gradesAtLunch.has(lunchTime.grade))
        .map(t => (
          <VoiceLevel
            key={t.grade}
            grade={t.grade}
            intervals={t.voiceLevelIntervals}
          />
        ))}
    </div>
  );
};

export default Timers;
