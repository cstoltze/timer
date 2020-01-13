VoiceLevel component example:

```jsx
const intervals = [
  { start: "11:55 am", end: "12:05 pm", canTalk: false, showTimer: true },
  { start: "12:05 pm", end: "12:25 pm", canTalk: true, showTimer: true },
  { start: "12:25 pm", end: "10:30 pm", canTalk: false, showTimer: true }
];
<VoiceLevel intervals={intervals} grade="First Grade" />;
```

```jsx
const intervals = [
  { start: "11:55 am", end: "12:05 pm", canTalk: false, showTimer: true },
  { start: "12:05 pm", end: "12:25 pm", canTalk: true, showTimer: true },
  { start: "12:25 pm", end: "10:30 pm", canTalk: true, showTimer: true }
];
<VoiceLevel intervals={intervals} grade="Kindergarten" />;
```
