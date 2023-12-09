import { describe, expect, it } from "bun:test";

import { retrieveFirstAndLastDigitWrittenInLetterInTheLine } from "./day1";

describe("day1", () => {
  it("should retrieve the first and last digit available whatever if it's written in letter or not", () => {
    const line = "two1nine";
    const line2 = "1two9";

    const digitLine = retrieveFirstAndLastDigitWrittenInLetterInTheLine(line);
    const digitLine2 = retrieveFirstAndLastDigitWrittenInLetterInTheLine(line2);

    expect(digitLine.firstDigit).toEqual("2");
    expect(digitLine.lastDigit).toEqual("9");
    expect(digitLine2.firstDigit).toEqual("1");
    expect(digitLine2.lastDigit).toEqual("9");
  });
});
