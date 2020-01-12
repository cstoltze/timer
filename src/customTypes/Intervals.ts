import moment from "moment";

// For example 3:15 AM to 4:10 AM. This interval repreats daily.
// This naive implementation doesn't behave well across midnight.
export class WallClockInterval {
  static timeFormat = "hh:mm a";
  private startTime: string;
  private endTime: string;

  constructor(interval: Interval) {
    this.startTime = interval.start;
    this.endTime = interval.end;
  }

  get start(): Date {
    return moment(this.startTime, WallClockInterval.timeFormat).toDate();
  }

  get end(): Date {
    return moment(this.endTime, WallClockInterval.timeFormat).toDate();
  }

  inInterval = (): boolean => moment().isBetween(this.start, this.end);
}

interface Interval {
  start: string;
  end: string;
}
export interface VoiceLevelIntervalInfo extends Interval {
  canTalk: boolean;
  showTimer: boolean;
}

export class VoiceLevelInterval extends WallClockInterval {
  canTalk: boolean;
  showTimer: boolean;

  constructor(vlii: VoiceLevelIntervalInfo) {
    super(vlii);
    this.canTalk = vlii.canTalk;
    this.showTimer = vlii.showTimer;
  }
}

export interface LunchScheduleInfo {
  grade: string;
  lunchTime: Interval;
  intervals: VoiceLevelIntervalInfo[];
}

export class LunchSchedule {
  grade: string;
  lunchTime: WallClockInterval;
  voiceLevelIntervals: VoiceLevelIntervalInfo[];

  constructor(
    info: LunchScheduleInfo
  ) {
    this.grade = info.grade;
    this.lunchTime = new WallClockInterval(info.lunchTime);
    this.voiceLevelIntervals = info.intervals;
  }
  atLunch: () => boolean = () =>
    !(this.lunchTime === undefined || !this.lunchTime.inInterval());
}
