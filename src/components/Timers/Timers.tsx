import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';
import {isEqual} from 'lodash';

export interface TimersProps {
  lunchTimes: LunchSchedule[];
}

// WallClockInterval represents the interval between two times
//
// For example 3:15 AM to 4:10 AM. This interval repreats daily.
// This naive implementation doesn't behave well across midnight.
class WallClockInterval {
  constructor(start: string, end: string) {
    this.startTime = start;
    this.endTime = end;
  }

  private startTime: string;
  get start(): Date {
    return moment(this.startTime, timeFormat).toDate();
  }

  private endTime: string;
  get end(): Date {
    return moment(this.endTime, timeFormat).toDate();
  }

  inInterval = (): boolean => moment().isBetween(this.start, this.end);
}

class LunchSchedule {
  grade: string;
  lunchTime?: WallClockInterval;
  voiceLevelIntervals: VoiceLevelInterval[];

  constructor(
    grade: string,
    lunchTime: WallClockInterval,
    voiceLevelIntervals: VoiceLevelInterval[],
  ) {
    this.grade = grade;
    this.lunchTime = lunchTime;
    this.voiceLevelIntervals = voiceLevelIntervals;
  }
  atLunch: () => boolean = () =>
    !(this.lunchTime === undefined || !this.lunchTime.inInterval());
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
const lunchTimes = [
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
  new LunchSchedule('Test', new WallClockInterval('11:55 am', '11:30 pm'), [
    new VoiceLevelInterval('11:55 am', '12:05 pm', false, true),
    new VoiceLevelInterval('12:05 pm', '12:25 pm', true, true),
    new VoiceLevelInterval('12:25 pm', '11:00 pm', false, false),
  ]),
];

const Timers = () => {
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

interface VoiceLevelProps {
  grade: string;
  intervals: VoiceLevelInterval[];
}

const VoiceLevel = ({grade, intervals}: VoiceLevelProps) => {
  const activeInterval = intervals.find(interval => interval.inInterval());

  if (!activeInterval) return <p>No activeInterval found for {grade}</p>;

  return (
    <div>
      <p>{grade}</p>
      <Countdown
        date={activeInterval.end}
        renderer={({minutes, seconds}) => (
          <p>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </p>
        )}
      />
    </div>
  );
};

export default Timers;
