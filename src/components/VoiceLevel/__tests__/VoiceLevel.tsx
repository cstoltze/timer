import React from "react";
import { render } from "@testing-library/react";
import VoiceLevel from "../VoiceLevel";

describe("VoiceLevel", () => {
  it("renders", () => {
    const intervals = [
      {
        start: "10:00 AM",
        end: "11:00 AM",
        canTalk: false,
        showTimer: true
      }
    ];
    render(<VoiceLevel grade={"First"} intervals={intervals} />);
  });
});
