import { describe, expect, it } from "bun:test";

import { checkIfTheNumberOfSpecificCubeColorIsLessThanTheAvailableNumber } from "./day2";

describe("day2", () => {
  it.skip("check if the number of specific cube color (red, blue, green) is less than the available number", () => {
    const { isRedLessThan12, isGreenLessThan13, isBlueLessThan14 } =
      checkIfTheNumberOfSpecificCubeColorIsLessThanTheAvailableNumber({
        redNumber: 11,
        greenNumber: 12,
        blueNumber: 13,
      });

    expect(isRedLessThan12).toEqual(true);
    expect(isGreenLessThan13).toEqual(true);
    expect(isBlueLessThan14).toEqual(true);
  });
});
