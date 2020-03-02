Timers component example:

```jsx
const lunchTimes = [
  {
    grade: "Kindergarten",
    lunchTime: { start: "10:55 am", end: "11:30 am" },
    intervals: [
      { start: "10:55 am", end: "11:05 am", canTalk: false, showTimer: true },
      { start: "11:05 am", end: "11:20 am", canTalk: true, showTimer: true },
      { start: "11:20 am", end: "11:30 am", canTalk: false, showTimer: false }
    ]
  },
  {
    grade: "First Grade",
    lunchTime: { start: "11:35 am", end: "12:05 pm" },
    intervals: [
      { start: "11:35 am", end: "11:45 am", canTalk: false, showTimer: true },
      { start: "11:45 am", end: "11:58 am", canTalk: true, showTimer: true },
      { start: "11:58 am", end: "12:05 pm", canTalk: false, showTimer: false }
    ]
  },
  {
    grade: "TEST 1",
    lunchTime: { start: "11:35 am", end: "11:55 pm" },
    intervals: [
      { start: "11:35 am", end: "11:45 am", canTalk: false, showTimer: true },
      { start: "11:45 am", end: "11:58 am", canTalk: true, showTimer: true },
      { start: "11:58 am", end: "11:55 pm", canTalk: false, showTimer: true }
    ]
  },
  {
    grade: "TEST 2",
    lunchTime: { start: "11:35 am", end: "11:55 pm" },
    intervals: [
      { start: "11:35 am", end: "11:45 am", canTalk: false, showTimer: true },
      { start: "11:45 am", end: "11:58 am", canTalk: true, showTimer: true },
      { start: "11:58 am", end: "11:32 pm", canTalk: true, showTimer: true }
    ]
  }
];
return <Timers lunchTimes={lunchTimes} />;
```
