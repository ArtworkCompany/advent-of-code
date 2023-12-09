import { readFile } from "../readFile";

const RED_CUBES_NUMBER = 12;
const GREEN_CUBES_NUMBER = 13;
const BLUE_CUBES_NUMBER = 14;

interface ColorCubeNumber {
  redNumber?: number;
  greenNumber?: number;
  blueNumber?: number;
}

const consolidateColorCubeNumbers = (
  colorCubeNumbersLine: string
): ColorCubeNumber[] => {
  const colorCubeNumbersSet = colorCubeNumbersLine.split("; ");

  return colorCubeNumbersSet.map((colorCubeNumberSet) =>
    colorCubeNumberSet.split(", ").reduce((acc, colorCubeNumber) => {
      const [number, color] = colorCubeNumber.split(" ");

      return {
        ...acc,
        [`${color}Number`]: Number(number),
      };
    }, {} as ColorCubeNumber)
  );
};

const retrieveGameInformation = (game: string) => {
  const pattern = /Game (\d+): (.*)/;
  const matches = game.match(pattern);
  const [, gameId, cubeNumbers] = matches!;

  const colorCubeNumbers = consolidateColorCubeNumbers(cubeNumbers);

  return {
    gameId: Number(gameId),
    colorCubeNumbers,
  };
};

const retrieveBiggestCubeNumberByColor = (
  colorCubeNumbers: ColorCubeNumber[]
) => {
  const biggestCubeNumberByColor = colorCubeNumbers.reduce(
    (acc, colorCubeNumber) => {
      const { redNumber, greenNumber, blueNumber } = colorCubeNumber;

      return {
        redNumber: Math.max(acc.redNumber!, redNumber ?? 0),
        greenNumber: Math.max(acc.greenNumber!, greenNumber ?? 0),
        blueNumber: Math.max(acc.blueNumber!, blueNumber ?? 0),
      };
    },
    {
      redNumber: 0,
      greenNumber: 0,
      blueNumber: 0,
    } as ColorCubeNumber
  );

  return biggestCubeNumberByColor;
};

const multiplyCubeNumberValue = (colorCubeNumber: ColorCubeNumber) => {
  const { redNumber, greenNumber, blueNumber } = colorCubeNumber;

  return redNumber! * greenNumber! * blueNumber!;
};

export const checkIfTheNumberOfSpecificCubeColorIsLessThanTheAvailableNumber =
  ({
    redNumber,
    greenNumber,
    blueNumber,
  }: ColorCubeNumber): {
    isRedLessThan12: boolean;
    isGreenLessThan13: boolean;
    isBlueLessThan14: boolean;
  } => {
    return {
      isRedLessThan12:
        redNumber !== undefined ? redNumber <= RED_CUBES_NUMBER : true,
      isGreenLessThan13:
        greenNumber !== undefined ? greenNumber <= GREEN_CUBES_NUMBER : true,
      isBlueLessThan14:
        blueNumber !== undefined ? blueNumber <= BLUE_CUBES_NUMBER : true,
    };
  };

const lines = await readFile("day2/day2.txt");
const games = lines.map(retrieveGameInformation);

const validGames = games.filter((game) => {
  const isColorCubeNumbersValid = game.colorCubeNumbers.every(
    (colorCubeNumber) => {
      const { isRedLessThan12, isGreenLessThan13, isBlueLessThan14 } =
        checkIfTheNumberOfSpecificCubeColorIsLessThanTheAvailableNumber(
          colorCubeNumber
        );

      return isRedLessThan12 && isGreenLessThan13 && isBlueLessThan14;
    }
  );

  return isColorCubeNumbersValid;
});
const validGamesId = validGames.map((game) => game.gameId);
const sumOfValidGamesId = validGamesId.reduce((acc, gameId) => acc + gameId, 0);

const cubeNumbersMultiplied = games.map((game) => {
  const biggestCubeNumberByColor = retrieveBiggestCubeNumberByColor(
    game.colorCubeNumbers
  );
  const cubeNumbersMultiplied = multiplyCubeNumberValue(
    biggestCubeNumberByColor
  );

  return cubeNumbersMultiplied;
});

const sumOfCubeNumbersMultiplied = cubeNumbersMultiplied.reduce(
  (acc, cubeNumberMultiplied) => acc + cubeNumberMultiplied,
  0
);

console.log(sumOfValidGamesId, sumOfCubeNumbersMultiplied);
